#include "monmodopts.h"
/*
 Copyright (C) 2005-2021, Informatica Corporation  Permission is granted to licensees to use
 or alter this software for any purpose, including commercial applications,
 according to the terms laid out in the Software License Agreement.
 
 This source code example is provided by Informatica for educational
 and evaluation purposes only.
 
 THE SOFTWARE IS PROVIDED "AS IS" AND INFORMATICA DISCLAIMS ALL WARRANTIES
 EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION, ANY IMPLIED WARRANTIES OF
 NON-INFRINGEMENT, MERCHANTABILITY OR FITNESS FOR A PARTICULAR
 PURPOSE.  INFORMATICA DOES NOT WARRANT THAT USE OF THE SOFTWARE WILL BE
 UNINTERRUPTED OR ERROR-FREE.  INFORMATICA SHALL NOT, UNDER ANY CIRCUMSTANCES, BE
 LIABLE TO LICENSEE FOR LOST PROFITS, CONSEQUENTIAL, INCIDENTAL, SPECIAL OR
 INDIRECT DAMAGES ARISING OUT OF OR RELATED TO THIS AGREEMENT OR THE
 TRANSACTIONS CONTEMPLATED HEREUNDER, EVEN IF INFORMATICA HAS BEEN APPRISED OF
 THE LIKELIHOOD OF SUCH DAMAGES.
 */


#ifdef __VOS__
#define _POSIX_C_SOURCE 200112L
#endif
#if defined(__TANDEM) && defined(HAVE_TANDEM_SPT)
#endif

#ifdef _WIN32
#else
#endif

#define MAX_TARGET_LEN 256
#define DEFAULT_LINGER 1
#define DEFAULT_PAUSE_SEC 5
#define MAX_CMD_LEN 256
#define MAX_RSP_LEN 2048
#define MAX_PKT_LEN 1024000

#if defined(_WIN32)
extern int optind;
extern char *optarg;
#   define SLEEP_SEC(x) Sleep((x)*1000)
#   define SLEEP_MSEC(x) Sleep(x)
#else
#   define SLEEP_SEC(x) sleep(x)
#   define SLEEP_MSEC(x) \
do{ \
if ((x) >= 1000){ \
sleep((x) / 1000); \
usleep((x) % 1000 * 1000); \
} \
else{ \
usleep((x)*1000); \
} \
}while (0)
#endif /* _WIN32 */

typedef struct lbm_req_info_t_stct {
    lbm_request_t *req;
    lbm_context_t *ctx;
    int timer_id;
    char req_msg[MAX_CMD_LEN];
} lbm_req_info_t;

char purpose[] =
"\nPurpose: send unicast immediate control requests to an LBMMON publisher.";

char usage[] =
"Usage: lbmmon_cmd -T target_string -C command [options]\n"
;
char options[] =
"Available options:\n"
"  -c filename = Use LBM configuration file filename.\n"
"                Multiple config files are allowed.\n"
"                Example:  '-c file1.cfg -c file2.cfg'\n"
"  -C command  = command to send [required]\n"
"  -d          = dump default filter options to stdout\n"
"  -D data     = data for command (either -D or -F, not both)\n"
"                Example: '-C SET_INTERVAL -D 30' \n"
"  -F filename = filename for command (either -D or -F, not both) \n"
"                Example: '-C SET_FILTER_OPTIONS -F filter.cfg' \n"
"  -h          = help\n"
"  -I id       = Application ID of node for command \n"
"                Example: '-C SNAP -N UMESTORE -I storeName' \n"
"  -L linger   = linger for linger seconds before closing context\n"
"  -N node     = node type for command\n"
"                Example: '-C SNAP -N CONTEXT' \n"
"  -P sec      = pause for sec seconds after sending request to wait for response\n"
"  -T target   = target string for unicast immediate requests [required]\n"
;

const char *OptionString = "c:C:dD:F:hI:L:N:P:T:";
const struct option OptionTable[] = {
    { "config", required_argument, NULL, 'c' },
	{ "command", required_argument, NULL, 'C' },
	{ "data", required_argument, NULL, 'D' },
	{ "filename", required_argument, NULL, 'F' },
	{ "help", no_argument, NULL, 'h' },
	{ "id", required_argument, NULL, 'I' },
	{ "linger", required_argument, NULL, 'L' },
	{ "node", required_argument, NULL, 'N' },
	{ "pause", required_argument, NULL, 'P' },
	{ "target", required_argument, NULL, 'T' },
    { NULL, 0, NULL, 0 }
};

/* Logging callback function (given as an argument to lbm_log()) */
int lbm_log_msg(int level, const char *message, void *clientd) {
    printf("LOG Level %d: %s\n", level, message);
    return 0;
}

void print_help_exit(char **argv, char *error, int exit_value) {
    fprintf(stderr, "\n%s\n%s\n%s\n%s\n%s\n%s\n",
		argv[0], lbm_version(), purpose, usage, options, error);
    exit(exit_value);
}

int wait_for_response = 0;
int handle_response(lbm_request_t *req, lbm_msg_t *msg, void *clientd) {
    lbm_req_info_t *req_info = (lbm_req_info_t *)clientd;
    
	char response_msg[MAX_RSP_LEN] = "";
	char truncate_msg[] = "... WARNING: response message truncated\n";
	if (msg->len <= MAX_RSP_LEN - 1) {
		strncpy(response_msg, msg->data, msg->len);
		response_msg[msg->len] = '\0';
	} else {
		strncpy(response_msg, msg->data, (MAX_RSP_LEN - strlen(truncate_msg) - 1));
		strcat(response_msg, truncate_msg);
	}
    
    switch (msg->type) {
        case LBM_MSG_RESPONSE:
			fprintf(stdout, "Response received [%s] from [%s][%u], %lu bytes\n\n", response_msg, msg->source, msg->sequence_number, (unsigned long)msg->len);
			fflush(stdout);
			break;
        default:
            fprintf(stderr, "Unknown (unsupported) lbm_msg_t type 0x%x [%s]\n\n", msg->type, msg->source);
        break;
    }
    lbm_cancel_timer(req_info->ctx, req_info->timer_id, NULL);
    lbm_request_delete(req_info->req);
    free(req_info);
	wait_for_response = 0;
    return 0;
}

int handle_timer(lbm_context_t *ctx, const void *clientd) {
    lbm_req_info_t *req_info = (lbm_req_info_t *)clientd;
    
    fprintf(stderr, "Command [%s] timed out. Make sure your target is valid.\n", req_info->req_msg);
    lbm_request_delete(req_info->req);
    free(req_info);
	wait_for_response = 0;
	return 0;
}

void send_request(lbm_context_t *ctx, char *target, char *command, char *packet, size_t packet_len, int pause_sec) {
    lbm_req_info_t *req_info = malloc(sizeof(lbm_req_info_t));

    memset(req_info, 0, sizeof(lbm_req_info_t));
    memcpy(req_info->req_msg, command, strlen(command));
    req_info->ctx = ctx;
    
	if ((req_info->timer_id = lbm_schedule_timer(ctx, handle_timer, req_info, NULL, pause_sec * 1000)) == LBM_FAILURE) {
		fprintf(stderr, "lbm_schedule_timer: %s\n", lbm_errmsg());
		exit(1);
	}
	fprintf(stdout, "Sending command [%s] to %s\n\n", command, target);
	fflush(stdout);
	if (lbm_unicast_immediate_request(&(req_info->req), ctx, target, NULL, packet, packet_len,
                                      handle_response, req_info, NULL, 0) == LBM_FAILURE) {
        fprintf(stderr, "lbm_unicast_immediate_request: %s\n", lbm_errmsg());
        exit(1);
    }
}

void remove_trailing_whitespace(char *line)
{
	char *tail;
	if (strlen(line) > 2) {
		tail = (char *)(line + strlen(line));
		while (isspace(*(tail - 1))) { tail--; }
		*tail = '\0';
	}
}

int validate_command(char *command_string) {
	int valid_command = 0;
	int command = 0;

	if (command_string[0] == '\0') {
		fprintf(stderr, "\nCommand is required.\n\n");
	}

	while (valid_command != 1) {
		if (command_string[0] == '\0') {
			fprintf(stderr, "%s\nEnter command (q to quit): ", lbmmon_control_valid_commands());
			if (fgets(command_string, MAX_CMD_LEN - 1, stdin) == NULL) {
				continue;
			} else if (command_string[0] == 'q') {
				return LBM_FAILURE;
			}
			remove_trailing_whitespace(command_string);
		}
		command = lbmmon_control_index_for_command(command_string);
		if (command != LBM_FAILURE) {
			valid_command = 1;
		} else {
			command_string[0] = '\0';
		}
	}
	return command;
}

int validate_node_type(char *node_type_string) {
	int valid_node_type = 0;
	int node_type = 0;

	while (valid_node_type != 1) {
		node_type = lbmmon_control_index_for_node_type(node_type_string);
		if (node_type != LBM_FAILURE) {
			valid_node_type = 1;
		} else {
			fprintf(stderr, "%s\nEnter node type (q to quit): ", lbmmon_control_valid_node_types());
			if (fgets(node_type_string, MAX_CMD_LEN - 1, stdin) == NULL) {
				continue;
			} else if (node_type_string[0] == 'q') {
				return LBM_FAILURE;
			}
			remove_trailing_whitespace(node_type_string);
		}
	}
	return node_type;
}

int validate_data_for_command(char *data, int command, char *command_string) {
	int valid_data = 0;

	while (valid_data != 1) {
		switch (command) {
		case LBMMON__UMMON_CONTROL_MSG__COMMAND__SET_INTERVAL:
			if (atol(data) == 0) {
				fprintf(stderr, "\nInvalid interval %s for \"%s\" command.\n", data, command_string);
			} else {
				valid_data = 1;
			}
			break;
		case LBMMON__UMMON_CONTROL_MSG__COMMAND__SET_FILTER_OPTIONS:
		case LBMMON__UMMON_CONTROL_MSG__COMMAND__SET_DEBUG_INFO:
			if (data[0] == '\0') {
				fprintf(stderr, "\nData required for \"%s\" command.\n", command_string);
			} else {
				valid_data = 1;
			}
			break;
		default:
			if (data[0] != '\0') {
				data[0] = '\0';
				fprintf(stderr, "No data expected with \"%s\" command.\nData has been cleared.\n", command_string);
			}
			valid_data = 1;
			break;
		}
		if (valid_data != 1) {
			fprintf(stderr, "Enter data (q to quit): ");
			if (fgets(data, MAX_CMD_LEN - 1, stdin) == NULL) {
				continue;
			} else if (data[0] == 'q') {
				return LBM_FAILURE;
			}
			remove_trailing_whitespace(data);
		}
	}
	return 0;
}

int load_data_from_filename(char *filename, char **data, int command, char *command_string) {
	switch (command) {
	case LBMMON__UMMON_CONTROL_MSG__COMMAND__SET_FILTER_OPTIONS:
	case LBMMON__UMMON_CONTROL_MSG__COMMAND__SET_DEBUG_INFO:
		if (lbmmon_control_load_data_from_filename(filename, data) == LBM_FAILURE) {
			fprintf(stderr, "lbmmon_control_load_data_from_filename: %s\n", lbmmon_control_errmsg());
			return LBM_FAILURE;
		}
		break;
	default:
		if (filename[0] != '\0') {
			fprintf(stderr, "No filename expected with \"%s\" command.\n", command_string);
			return LBM_FAILURE;
		}
		break;
	}
	return 0;
}

int main(int argc, char **argv) {
    lbm_context_t *ctx;
    lbm_context_attr_t *cattr;
    char command_string[MAX_CMD_LEN];
	char command_data[MAX_CMD_LEN];
	char command_filename[MAX_CMD_LEN];
	char *filename = NULL;
	char app_id[MAX_CMD_LEN];
	char node_type_string[MAX_CMD_LEN];
	char target_opt[MAX_TARGET_LEN] = "";
    char *target = NULL;
    int c, errflag = 0;
    int linger = DEFAULT_LINGER;
	int pause_sec = DEFAULT_PAUSE_SEC;
	char *packet;
	size_t packet_len = MAX_PKT_LEN;
	int command = 0;
	int node_type = 0;
	char *data_for_command = NULL;
	int rc;

#if defined(_WIN32)
	{
		WSADATA wsadata;
		int status;

		/* Windows socket setup code */
		if ((status = WSAStartup(MAKEWORD(2, 2), &wsadata)) != 0) {
			fprintf(stderr, "%s: WSA startup error - %d\n", argv[0], status);
			exit(1);
		}
	}
#else
	/*
	* Ignore SIGPIPE on UNIXes which can occur when writing to a socket
	* with only one open end point.
	*/
	signal(SIGPIPE, SIG_IGN);
#endif /* _WIN32 */

	memset(command_string, 0, MAX_CMD_LEN);
	memset(command_data, 0, MAX_CMD_LEN);
	memset(command_filename, 0, MAX_CMD_LEN);
	memset(app_id, 0, MAX_CMD_LEN);
	memset(node_type_string, 0, MAX_CMD_LEN);
	while ((c = getopt_long(argc, argv, OptionString, OptionTable, NULL)) != EOF) {
        switch (c) {
            case 'c':
                if (lbm_config(optarg) == LBM_FAILURE) {
                    fprintf(stderr, "lbm_config: %s\n", lbm_errmsg());
                    exit(1);
                }
                break;
			case 'C':
				strncpy(command_string, optarg, sizeof(command_string));
				break;
			case 'd':
				if (lbmmon_control_dump_default_filter_options() == LBM_FAILURE) {
					fprintf(stderr, "lbmmon_control_dump_default_filter_options: %s\n", lbmmon_control_errmsg());
				}
				exit(0);
				break;
			case 'D':
				strncpy(command_data, optarg, sizeof(command_data));
				break;
			case 'F':
				strncpy(command_filename, optarg, sizeof(command_filename));
				filename = command_filename;
				break;
			case 'h':
                print_help_exit(argv, "", 0);
                break;
			case 'I':
				strncpy(app_id, optarg, sizeof(app_id));
				break;
			case 'L':
                linger = atoi(optarg);
                break;
			case 'N':
				strncpy(node_type_string, optarg, sizeof(node_type_string));
				break;
			case 'P':
				pause_sec = atoi(optarg);
				if (pause_sec == 0) {
					fprintf(stderr, "-P cannot be set to 0.\n");
					exit(1);
				}
				break;
			case 'T':
                strncpy(target_opt, optarg, sizeof(target_opt));
                target = target_opt;
                break;
            default:
                errflag++;
                break;
        }
    }
    
	if ((errflag != 0) || (argc > optind)) {
        print_help_exit(argv, "", 1);
    }
    
    if (target == NULL) {
 		print_help_exit(argv, "Target '-T target_string' is mandatory.", 1);
    }
	if ((command_data[0] != '\0') && (filename != NULL)) {
		print_help_exit(argv, "Parameters -D data or -F filename can be used but not both", 1);
	}
    
	if ((command = validate_command(command_string)) == LBM_FAILURE) {
		exit(1);
	}
	if ((node_type = validate_node_type(node_type_string)) == LBM_FAILURE) {
		exit(1);
	}
	if (filename != NULL) {
		if (load_data_from_filename(command_filename, &data_for_command, command, command_string) == LBM_FAILURE) {
			exit(1);
		}
	} else {
		if (validate_data_for_command(command_data, command, command_string) == LBM_FAILURE) {
			exit(1);
		}
		data_for_command = command_data;
	}

	if (lbm_log(lbm_log_msg, NULL) == LBM_FAILURE) {
        fprintf(stderr, "lbm_log: %s\n", lbm_errmsg());
		if (filename != NULL) {
			free(data_for_command);
		}
		exit(1);
    }
    
    if (lbm_context_attr_create(&cattr) == LBM_FAILURE) {
        fprintf(stderr, "lbm_context_attr_create: %s\n", lbm_errmsg());
		if (filename != NULL) {
			free(data_for_command);
		}
		exit(1);
    }
    
	/* Disable monitoring of this context. */
	rc = lbm_context_attr_str_setopt(cattr, "monitor_interval", "0");
	/* Force embedded mode for simplicity. */
	rc |= lbm_context_attr_str_setopt(cattr, "operational_mode", "embedded");
	/* We don't need MIM, so disable MIM receiver. */
	rc |= lbm_context_attr_str_setopt(cattr, "mim_incoming_address", "0.0.0.0");
	if (rc > 0){
		fprintf(stderr, "WARNING: context attributes could not be set: %s\n", lbm_errmsg());
	}

	if (lbm_context_create(&ctx, cattr, NULL, NULL) == LBM_FAILURE) {
        fprintf(stderr, "lbm_context_create: %s\n", lbm_errmsg());
		if (filename != NULL) {
			free(data_for_command);
		}
		exit(1);
    }
    lbm_context_attr_delete(cattr);
    
	packet = malloc(packet_len);

	rc = lbmmon_control_serialize(packet, &packet_len, command, data_for_command, node_type, app_id);
	if (rc == LBM_FAILURE) {
		fprintf(stderr, "lbmmon_control_serialize: %s\n", lbmmon_control_errmsg());
		exit(1);
	}
    
	send_request(ctx, target, command_string, packet, packet_len, pause_sec);
	wait_for_response = 1;
	fprintf(stdout, "Waiting for response...\n\n");
	fflush(stdout);
	while (wait_for_response != 0){
		SLEEP_SEC(1);
	}
	if (filename != NULL) {
		free(data_for_command);
	}
	free(packet);
	if (linger > 0) {
		fprintf(stdout, "Lingering for %d second(s)...\n", linger);
		fflush(stdout);
		SLEEP_SEC(linger);
	}
    
    lbm_context_delete(ctx);
    ctx = NULL;
    return 0;
}

