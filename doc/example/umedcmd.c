/*
(C) Copyright 2005,2022 Informatica Inc.  Permission is granted to licensees to use
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
#include <sys/time.h>
#endif
#if defined(__TANDEM) && defined(HAVE_TANDEM_SPT)
#include <ktdmtyp.h>
#include <spthread.h>
#endif

#ifdef _WIN32
#if (_MSC_VER < 1900)
#define snprintf _snprintf
#endif
#endif


#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <time.h>
#ifdef _WIN32
#include <winsock2.h>
#include <sys/timeb.h>
#else
#include <unistd.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <sys/time.h>
#include <signal.h>
#endif
#include <lbm/lbm.h>
#include <lbm/lbmmon.h>
#include "replgetopt.h"
#include "lbm-example-util.h"

#define MAX_CMDLEN 256
#define MAX_MODELEN 11
#define MAX_REGIDLEN 16
#define MAX_TARGETLEN 256
#define MAX_IPV4_ADDRLEN 16
#define DEFAULT_DELAY_B4CLOSE 1
#define RESPONSE_TIMEOUT 5000

/* Solaris doesn't define INADDR_NONE */
#ifndef INADDR_NONE
#define INADDR_NONE 0xffffffff
#endif

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
	char req_msg[MAX_CMDLEN];
} lbm_req_info_t;

typedef enum {
	NO_MODE = 0,			/* no specified mode */
	PUBLISH_MODE = 1,		/* publish statistics mode */
	MARK_MODE = 2,			/* mark message mode */
	DEREGISTER_MODE = 3,	/* deregister receiver mode */
	ELECT_MODE = 4			/* Restart a Proxy Source Election */
} daemon_mode_t;

typedef struct daemon_command_options_stct {
	struct in_addr store_interface;
	char target_string[MAX_TARGETLEN];
	char command_string[MAX_CMDLEN];
	char *command;
	char store_interface_string[MAX_IPV4_ADDRLEN];
	lbm_uint32_t store_port;
	lbm_uint32_t src_regid;
	lbm_uint32_t rcvr_regid;
	daemon_mode_t mode;
	int mode_set;
	int store_interface_set;
	int src_regid_set;
	int rcvr_regid_set;
	int sqn_set;
	int linger;
} daemon_command_options_t;

typedef struct list_stct {
	lbm_uint32_t *sequence;
	int list_idx;
	int count;
} list_t;

unsigned long resolve_ipv4_address(char *optarg);
int check_sqn_string(char *sqn_string, list_t *sqn_list);
int check_regid_string(char *sqn_string, list_t *rcvr_regid_list);

char purpose[] = "Purpose: "
"multi-mode application sends unicast immediate messages to umestore\n"
"         daemon to publish statistics, mark message unusable, deregister\n"
"         receivers, or restart a failed proxy source election."
;
char general_usage[] =
"*******************************************************************************\n"
"Usage: umedcmd -h -m mode\n"
"Available options:\n"
"  -h, --help         display mode-specific usage help message and exit\n"
"  -m, --mode=TYPE    set command mode to TYPE 'publish', 'mark', 'deregister' or 'elect'\n"
"                     [required]\n"
"*******************************************************************************\n"
;

char publish_usage[] =
"*******************************************************************************\n"
"Usage: umedcmd -m publish -c config_file -T target_string [-L linger]\n"
"       [command_string]\n"
"Available options:\n"
"  -c, --config=FILE       Use LBM configuration file FILE.\n"
"                             Multiple config files are allowed.\n"
"                             Example: '-c file1.cfg -c file2.cfg'\n"
"  -h, --help              display this help and exit\n"
"  -L, --linger=NUM        linger for NUM seconds before closing context\n"
"  -m, --mode=TYPE         set the command mode to TYPE 'publish' [required]\n"
"  -T, --target=TARGET     TARGET string for unicast immediate messages\n"
"                          [required]\n"
"*******************************************************************************\n"
;

char mark_usage[] =
"*******************************************************************************\n"
"Usage: umedcmd -m mark -c config_file -i store_interface -p store_port\n"
"       -s src_regid -T target_string [-L linger] [-S sqn_string]\n"
"Available options:\n"
"  -c, --config=FILE     Use LBM configuration file FILE.\n"
"                           Multiple config files are allowed.\n"
"                           Example: '-c file1.cfg -c file2.cfg'\n"
"  -h, --help            display this help and exit\n"
"  -i, --store_interface store interface IPv4 address [required]\n"
"  -p, --store_port      store port [required]\n"
"  -L, --linger=NUM      linger for NUM seconds before closing context\n"
"  -m, --mode=TYPE       set the command mode to TYPE 'mark' [required]\n"
"  -s, --src_regid=ID    source registration ID associated with the store\n"
"                        repository [required]\n"
"  -S, --sqn_string=LIST LIST of one or more message sequence number(s) or\n"
"                        ranges to drop], e.g.:\n"
"                          '-S 54'       drop a single message\n"
"                          '-S 312-315'  drops a range of messages\n"
"                          '-S 2,5,7-9' drops two single and a range of messages\n"
"  -T, --target=TARGET   TARGET string for unicast immediate messages\n"
"                        [required]\n"
"*******************************************************************************\n"
;

char elect_usage[] =
"*******************************************************************************\n"
"Usage: umedcmd -m elect [-c config_file] -i store_interface -p store_port\n"
"       -s src_regid -T target_string [-L linger] [-h]\n"
"Available options:\n"
"  -c, --config=FILE     Use LBM configuration file FILE.\n"
"                           Multiple config files are allowed.\n"
"                           Example: '-c file1.cfg -c file2.cfg'\n"
"  -h, --help            display this help and exit\n"
"  -i, --store_interface store interface IPv4 address [required]\n"
"  -p, --store_port      store port [required]\n"
"  -L, --linger=NUM      linger for NUM seconds before closing context\n"
"  -m, --mode=TYPE       set the command mode to TYPE 'elect' [required]\n"
"  -s, --src_regid=ID    source registration ID associated with the store\n"
"                        repository [required]\n"
"  -T, --target=TARGET   TARGET string for unicast immediate messages\n"
"                        [required]\n"
"*******************************************************************************\n"
;

char deregister_usage[] =
"*******************************************************************************\n"
"Usage: umedcmd  -m deregister-c config_file -i store_interface -p store_port\n"
"       -s src_regid -T target_string [-r rcvr_regid] [-L linger]\n"
"Available options:\n"
"  -c, --config=FILE       Use LBM configuration file FILE.\n"
"                             Multiple config files are allowed.\n"
"                             Example: '-c file1.cfg -c file2.cfg'\n"
"  -h, --help              display this help and exit\n"
"  -i, --store_interface   store interface IPv4 address [required]\n"
"  -p, --store_port        store port [required]\n"
"  -L, --linger=NUM        linger for NUM seconds before closing context\n"
"  -m, --mode=TYPE         set the command mode to TYPE 'deregister' [required]\n"
"  -r, --rcvr_regid=LIST   LIST of one or more receiver registration IDs\n"
"                          with store repository, e.g.:\n"
"                           '-r 127025171'            deregister single receiver\n"
"                           '-r 127025171, 127025162' deregister two receivers\n"
"  -s, --src_regid=ID      source registration ID associated with the\n"
"                          store repository [required]\n"
"  -T, --target=TARGET     TARGET string for unicast immediate messages\n"
"                          [required]\n"
"*******************************************************************************\n"
;

const char * OptionString = "c:hi:p:L:m:r:s:S:T:";
const struct option OptionTable[] = {
	{ "config", required_argument, NULL, 'c' },
	{ "help", no_argument, NULL, 'h' },
	{ "store_interface", required_argument, NULL, 'i' },
	{ "store_port", required_argument, NULL, 'p' },
	{ "linger", required_argument, NULL, 'L' },
	{ "mode", required_argument, NULL, 'm' },
	{ "rcvr_regid", required_argument, NULL, 'r' },
	{ "src_regid", required_argument, NULL, 's' },
	{ "sqn_string", required_argument, NULL, 'S' },
	{ "target", required_argument, NULL, 'T' },
	{ NULL, 0, NULL, 0 }
};

char my_request_port_str[256] = "";
size_t port_str_sz = sizeof(my_request_port_str);

char publish_help_msg[] =
"***********************************************************************************\n"
"* Publish Mode                                                                    *\n"
"* help (print this message): h                                                    *\n"
"*   quit (exit application): q                                                    *\n"
"* report store dmon version: version                                              *\n"
"*   set publishing interval: memory 0-N                                           *\n"
"*                            [\"store name\"] src 0-N                               *\n"
"*                            [\"store name\"] rcv 0-N                               *\n"
"*                            [\"store name\"] disk 0-N                              *\n"
"*                            [\"store name\"] store 0-N                             *\n"
"*                            [\"store name\"] config 0-N                            *\n"
"*       snapshot all groups: [\"store name\"] snap memory|src|rcv|disk|store|config *\n"
"***********************************************************************************\n"
;

char mark_help_msg[] =
"***********************************************************************************\n"
"* Mark Mode                                                                       *\n"
"* help (print this message): h                                                    *\n"
"*   quit (exit application): q                                                    *\n"
"*              mark message: 0-N                                                  *\n"
"*         mark message list: N, N, N...                                           *\n"
"*        mark message range: N-M                                                  *\n"
"* mark message list w/range: N, N, N-M, N...                                      *\n"
"***********************************************************************************\n"
;

char deregister_help_msg[] =
"***********************************************************************************\n"
"* Deregister Mode                                                                 *\n"
"* help (print this message): h                                                    *\n"
"*   quit (exit application): q                                                    *\n"
"*       deregister receiver: 0-N                                                  *\n"
"*  deregister receiver list: N, N, N...                                           *\n"
"***********************************************************************************\n"
;

int wait_4_response = 0;

/* Logging callback function (given as an argument to lbm_log()) */
int lbm_log_msg(int level, const char *message, void *clientd) {
	printf("LOG Level %d: %s\n", level, message);
	return 0;
}

void print_help(daemon_command_options_t *opts) {
	if (opts->mode == PUBLISH_MODE) {
		fprintf(stdout, "%s", publish_help_msg);
	}
	else if (opts->mode == MARK_MODE) {
		fprintf(stdout, "%s", mark_help_msg);
	}
	else  {
		fprintf(stdout, "%s", deregister_help_msg);
	}
}

void print_help_exit(char **argv, int exit_value, daemon_command_options_t *opts) {
	if (opts->mode == PUBLISH_MODE) {
		fprintf(stderr, "%s\n%s\n%s\n%s", argv[0], lbm_version(), purpose, publish_usage);
	}
	else if (opts->mode == MARK_MODE) {
		fprintf(stderr, "%s\n%s\n%s\n%s", argv[0], lbm_version(), purpose, mark_usage);
	}
	else if (opts->mode == ELECT_MODE) {
		fprintf(stderr, "%s\n%s\n%s\n%s", argv[0], lbm_version(), purpose, elect_usage);
	}
	else if (opts->mode == DEREGISTER_MODE) {
		fprintf(stderr, "%s\n%s\n%s\n%s", argv[0], lbm_version(), purpose, deregister_usage);
	}
	else {
		fprintf(stderr, "%s\n%s\n%s\n%s", argv[0], lbm_version(), purpose, general_usage);
	}
	exit(exit_value);
}
void process_cmdline(int argc, char **argv, daemon_command_options_t *opts, list_t *sqn_list, list_t *rcvr_regid_list) {
	char mode_string[MAX_CMDLEN] = "";
	int c, errflag = 0;
	int print_help_and_exit = 0;

	opts->store_interface.s_addr = INADDR_NONE;
	opts->linger = DEFAULT_DELAY_B4CLOSE;
	opts->command_string[0] = 0;
	opts->command = NULL;
	opts->target_string[0] = 0;
	opts->mode = NO_MODE;
	opts->mode_set = 0;
	opts->sqn_set = 0;
	opts->src_regid_set = 0;
	opts->rcvr_regid_set = 0;
	opts->store_interface_set = 0;

	memset(opts->command_string, 0, MAX_CMDLEN);
	while ((c = getopt_long(argc, argv, OptionString, OptionTable, NULL)) != EOF) {
		switch (c) {
		case 'c':
			/* Initialize configuration parameters from a file. */
			if (lbm_config(optarg) == LBM_FAILURE) {
				fprintf(stderr, "lbm_config: %s\n", lbm_errmsg());
				exit(1);
			}
			break;
		case 'h':
			print_help_and_exit = 1;
		case 'i':
			if (optarg != NULL) {
				opts->store_interface.s_addr = resolve_ipv4_address(optarg);
				if (opts->store_interface.s_addr != INADDR_NONE) {
					strncpy(opts->store_interface_string, optarg, sizeof(opts->store_interface_string));
					opts->store_interface_set = 1;
					break;
				}
			}
			++errflag;
			break;
		case 'p':
			opts->store_port = atoi(optarg);
			break;
		case 'L':
			opts->linger = atoi(optarg);
			break;
		case 'm':
			strncpy(mode_string, optarg, sizeof(mode_string));
			opts->mode_set = 1;
			break;
		case 'r':
			strncpy(opts->command_string, optarg, sizeof(opts->command_string));
			if (check_regid_string(opts->command_string, rcvr_regid_list) < 0) {
				fprintf(stderr, "Command line error: receiver registration id list is corrupt\n");
				exit(1);
			}
			opts->rcvr_regid_set = 1;
			break;
		case 's':
			opts->src_regid = atoi(optarg);
			if (opts->src_regid == 0) {
				fprintf(stderr, "Command line error: source registration id is illegal\n");
				exit(1);
			}
			opts->src_regid_set = 1;
			break;
		case 'S':
			strncpy(opts->command_string, optarg, sizeof(opts->command_string));
			if (check_sqn_string(opts->command_string, sqn_list) < 0) {
				fprintf(stderr, "Command line error: sequence number list is corrupt\n");
				exit(1);
			}
			opts->sqn_set = 1;
			break;
		case 'T':
			strncpy(opts->target_string, optarg, sizeof(opts->target_string));
			break;
		default:
			errflag++;
			break;
		}
	}

	if (opts->mode_set) {
		if (strncmp(mode_string, "publish", MAX_MODELEN) == 0) {
			opts->mode = PUBLISH_MODE;
		}
		else if (strncmp(mode_string, "mark", MAX_MODELEN) == 0) {
			opts->mode = MARK_MODE;
		}
		else if (strncmp(mode_string, "elect", MAX_MODELEN) == 0) {
			opts->mode = ELECT_MODE;
		}
		else if (strncmp(mode_string, "deregister", MAX_MODELEN) == 0) {
			opts->mode = DEREGISTER_MODE;
		}
		else {
			fprintf(stderr, "Command line error: -m mode [%s] is invalid\n", mode_string);
			print_help_exit(argv, 1, opts);
			exit(1);
		}
	}
	else {
		fprintf(stderr, "Command line error: -m mode is required\n");
		print_help_exit(argv, 0, opts);
		exit(1);
	}
	if (errflag != 0) {
		print_help_exit(argv, 0, opts);
	}
	if (print_help_and_exit) {
		print_help_exit(argv, 1, opts);
	}
	if (argc > optind) {
		memset(opts->command_string, 0, MAX_CMDLEN);
		strncpy(opts->command_string, argv[optind], sizeof(opts->command_string));
		opts->command = opts->command_string;
		printf("command_string: %s\n", opts->command_string);
	}
	if (strlen(opts->target_string) == 0) {
		fprintf(stderr, "Command line error: the '-T target' option is required\n");
		print_help_exit(argv, 1, opts);
	}
	if (opts->mode == PUBLISH_MODE) {
		if (opts->sqn_set) {
			fprintf(stderr, "Command line warning: the '-S sqn_string' option is unused in publish mode\n");
		}
		if (opts->store_interface_set) {
			fprintf(stderr, "Command line warning: the '-i store_interface' option is unused in publish mode\n");
		}
		if (opts->store_port != 0) {
			fprintf(stderr, "Command line warning: the '-p store_port' option is unused in publish mode\n");
		}
		if (opts->rcvr_regid_set) {
			fprintf(stderr, "Command line warning: the '-r rcvr_regid' option is unused in publish mode\n");
		}
		if (opts->src_regid_set) {
			fprintf(stderr, "Command line warning: the '-s src_regid' option is unused in publish mode\n");
		}
	}
	if ((opts->mode == MARK_MODE) || (opts->mode == DEREGISTER_MODE) || (opts->mode == ELECT_MODE)) {
		if (!opts->src_regid_set) {
			fprintf(stderr, "Command line error: the '-s src_regid' option is required\n");
			print_help_exit(argv, 1, opts);
		}
		if (opts->store_port == 0) {
			fprintf(stderr, "Command line error: the '-p port' option with a valid port number is required\n");
			print_help_exit(argv, 1, opts);
		}
		if (!opts->store_interface_set) {
			fprintf(stderr, "Command line error: the '-i store_interface' option with a valid IPv4 address is required\n");
			print_help_exit(argv, 1, opts);
		}
	}
	if (opts->mode == MARK_MODE) {
		if (opts->rcvr_regid_set) {
			fprintf(stderr, "Command line warning: the '-r rvcr_regid' option is unused in mark mode\n");
		}
	}
	if (opts->mode == DEREGISTER_MODE) {
		if (opts->sqn_set) {
			fprintf(stderr, "Command line warning: the '-S sqn_string' option is unused in deregister mode\n");
		}
	}
}

int handle_response(lbm_request_t *req, lbm_msg_t *msg, void *clientd) {
	lbm_req_info_t *req_info = (lbm_req_info_t *)clientd;

	char text[256] = "";
	if (msg->len <= 255) {
		strncpy(text, msg->data, msg->len);
		text[msg->len] = '\0';
	}

	wait_4_response = 0;

	switch (msg->type) {
	case LBM_MSG_RESPONSE:
		printf("Response received [%s] from [%s][%u], %lu bytes\n", text, msg->source, msg->sequence_number, (unsigned long)msg->len);
		break;
	default:
		printf( "Unhandled receiver event [%d] from source [%s]. Refer to https://ultramessaging.github.io/currdoc/doc/example/index.html#unhandledcevents for a detailed description.\n", msg->type, msg->source);
		break;
	}
	lbm_cancel_timer(req_info->ctx, req_info->timer_id, NULL);
	lbm_request_delete(req_info->req);
	free(req_info);
	return 0;
}

int handle_timer(lbm_context_t *ctx, const void *clientd) {
	lbm_req_info_t *req_info = (lbm_req_info_t *)clientd;

	printf("Command timed out! check store IP:port numbers and try again.\n");
	lbm_request_delete(req_info->req);
	free(req_info);
	wait_4_response = 0;
	return 0;
}

void send_request(lbm_context_t *ctx, char *target_string, char *command) {
	lbm_req_info_t *req_info = malloc(sizeof(lbm_req_info_t));
	memset(req_info, 0, sizeof(lbm_req_info_t));
	memcpy(req_info->req_msg, command, strlen(command));
	req_info->ctx = ctx;
	if ((req_info->timer_id = lbm_schedule_timer(ctx, handle_timer, req_info, NULL, RESPONSE_TIMEOUT)) == -1) {
		fprintf(stderr, "lbm_schedule_timer: %s\n", lbm_errmsg());
		exit(1);
	}
	wait_4_response = 1;
	if (lbm_unicast_immediate_request(&(req_info->req), ctx, target_string, NULL, command, strlen(command), handle_response, req_info, NULL, 0) == LBM_FAILURE) {
		fprintf(stderr, "lbm_unicast_immediate_request: %s\n", lbm_errmsg());
		exit(1);
	}
}

int check_sqn_string(char *sqn_string, list_t *sqn_list) {
	const char delim[3] = " ,";
	char *token;
	lbm_uint32_t n, m;
	char sqn_string_copy[MAX_CMDLEN];

	strncpy(sqn_string_copy, sqn_string, MAX_CMDLEN);
	sqn_list->count = 0;
	/* pass 1 - count up sequence numbers; reject malformed lists in toto */
	token = strtok(sqn_string, delim);
	while (token != NULL) {
		if (sscanf(token, "%u-%u", &n, &m) == 2) {
			if (n <= m) {
				sqn_list->count += (m - n + 1);
			} else {
				return -1;
			}
		} else if (sscanf(token, "%u", &n) == 1) {
			sqn_list->count++;
		} else {
			return -1;
		}
		token = strtok(NULL, delim);
	}
	/* pass 2 - populate list of sequence numbers */
	sqn_list->sequence = malloc(sizeof(lbm_uint32_t) * sqn_list->count);
	sqn_list->list_idx = 0;
	token = strtok(sqn_string_copy, delim);
	while (token != NULL) {
		int arg_cnt;
		arg_cnt = sscanf(token, "%u-%u", &n, &m);
		if (arg_cnt == 1) {
			sqn_list->sequence[sqn_list->list_idx++] = n;
		}
		else {
			int snum = n;
			int i;
			for (i = 0; i < (m - n + 1); ++i) {
				sqn_list->sequence[sqn_list->list_idx++] = snum++;
			}
		}
		token = strtok(NULL, delim);
	}
	sqn_list->list_idx = 0;
	return 0;
}

int check_regid_string(char *regid_string, list_t *rcvr_regid_list) {
	const char delim[3] = " ,";
	char *token;
	lbm_uint32_t regid;
	char regid_string_copy[MAX_CMDLEN];

	strncpy(regid_string_copy, regid_string, MAX_CMDLEN);
	rcvr_regid_list->count = 0;
	/* pass 1 - count up registration ids; reject malformed lists in toto */
	token = strtok(regid_string, delim);
	while (token != NULL) {
		if (sscanf(token, "%u", &regid) == 1) {
			if (regid == 0) {
				fprintf(stderr, "Command line error: receiver registration id of 0 is invalid\n");
				return -1;
			}
			rcvr_regid_list->count++;
		}
		else {
			return -1;
		}
		token = strtok(NULL, delim);
	}
	/* pass 2 - populate list of registration ids */
	rcvr_regid_list->sequence = malloc(sizeof(lbm_uint32_t) * rcvr_regid_list->count);
	rcvr_regid_list->list_idx = 0;
	token = strtok(regid_string_copy, delim);
	while (token != NULL) {
		sscanf(token, "%u", &regid);
		rcvr_regid_list->sequence[rcvr_regid_list->list_idx++] = regid;
		token = strtok(NULL, delim);
	}
	rcvr_regid_list->list_idx = 0;
	return 0;
}

int get_next(lbm_uint32_t *item, list_t *list) {
	if (list->list_idx >= list->count) {
		free(list->sequence);
		return -1;
	}
	*item = list->sequence[list->list_idx++];
	return 0;
}

unsigned long resolve_ipv4_address(char *optarg) {
	unsigned d[4], addr;

	if (sscanf(optarg, "%3u.%3u.%3u.%3u", &d[0], &d[1], &d[2], &d[3]) == 4) {
		addr = inet_addr(optarg);
	} else {
		return (INADDR_NONE);
	}
	return (addr);
}

/* meter requests by waiting for an outstanding request response */
void wait_4_outstanding_request(int sleep_interval) {
	while (wait_4_response) {
		SLEEP_MSEC(sleep_interval);
	}
}

void handle_publish_mode_requests(lbm_context_t *ctx, daemon_command_options_t *opts) {
	if (opts->command != NULL) {
		send_request(ctx, opts->target_string, opts->command_string);
	}
	else {
		print_help(opts);
		while (1) {
			wait_4_outstanding_request(100);
			fprintf(stdout, "Enter publish command: ");
			fflush(stdout);
			if (fgets(opts->command_string, MAX_CMDLEN - 1, stdin) == NULL)
				break;
			if (opts->command_string[0] == 'q')
				break;
			if (opts->command_string[0] == 'h') {
				print_help(opts);
			}
			else {
				if (strlen(opts->command_string) == 1) continue;
				opts->command_string[strlen(opts->command_string) - 1] = 0;
				send_request(ctx, opts->target_string, opts->command_string);
			}
		}
	}
}

void handle_mark_mode_requests(lbm_context_t *ctx, daemon_command_options_t *opts, list_t *sqn_list) {
	char request_string[sizeof("mark ") + MAX_IPV4_ADDRLEN + 1 + sizeof(opts->store_port) + 1 + MAX_REGIDLEN + 1 + MAX_CMDLEN + 1];
	lbm_uint32_t sqn;

	if (opts->sqn_set) {
		while (get_next(&sqn, sqn_list) >= 0) {
			wait_4_outstanding_request(1);
			snprintf(request_string, sizeof(request_string), "mark %s %u %u %u", opts->store_interface_string, opts->store_port, opts->src_regid, sqn);
			send_request(ctx, opts->target_string, request_string);
			fprintf(stdout, "Sent mark sequence number string [%s] to target [%s]\n", request_string, opts->target_string);
		}
	}
	else {
		print_help(opts);
		while (1) {
			wait_4_outstanding_request(100);
			fprintf(stdout, "Enter mark command: ");
			fflush(stdout);
			if (fgets(opts->command_string, MAX_CMDLEN - 1, stdin) == NULL)
				break;
			if (opts->command_string[0] == 'q')
				break;
			if (opts->command_string[0] == 'h')
				print_help(opts);
			else {
				if (strlen(opts->command_string) == 1) continue;
				opts->command_string[strlen(opts->command_string) - 1] = 0;
				if (check_sqn_string(opts->command_string, sqn_list) < 0) {
					fprintf(stderr, "sequence number list is corrupt - try again\n");
				}
				else {
					while (get_next(&sqn, sqn_list) >= 0) {
						wait_4_outstanding_request(1);
						snprintf(request_string, sizeof(request_string), "mark %s %u %u %u", opts->store_interface_string, opts->store_port, opts->src_regid, sqn);
						send_request(ctx, opts->target_string, request_string);
						fprintf(stdout, "Sent mark sequence number string [%s] to target [%s]\n", request_string, opts->target_string);
					}
				}
			}
		}
	}
}

void handle_elect_mode_requests(lbm_context_t *ctx, daemon_command_options_t *opts, list_t *sqn_list) {
	char request_string[sizeof("elect ") + MAX_IPV4_ADDRLEN + 1 + sizeof(opts->store_port) + 1 + MAX_REGIDLEN + 1 + MAX_CMDLEN /* future expansion */ + 1];

	wait_4_outstanding_request(1);

	snprintf(request_string, sizeof(request_string), "elect %s %u %u", opts->store_interface_string, opts->store_port, opts->src_regid);

	send_request(ctx, opts->target_string, request_string);
	fprintf(stdout, "Sent proxy source election string [%s] to target [%s]\n", request_string, opts->target_string);
}

void handle_deregister_mode_requests(lbm_context_t *ctx, daemon_command_options_t *opts, list_t *rcvr_regid_list) {
	char request_string[sizeof("deregister ") + MAX_IPV4_ADDRLEN + 1 + sizeof(opts->store_port) + 1 + (MAX_REGIDLEN * 2) + 2 + MAX_CMDLEN + 1];
	lbm_uint32_t rcvr_regid;

	if (opts->rcvr_regid_set) {
		while (get_next(&rcvr_regid, rcvr_regid_list) >= 0) {
			snprintf(request_string, sizeof(request_string), "deregister %s %u %u %u", opts->store_interface_string, opts->store_port, opts->src_regid, rcvr_regid);
			send_request(ctx, opts->target_string, request_string);
			fprintf(stdout, "Sent deregister string [%s] to target [%s]\n", request_string, opts->target_string);
		}
	}
	else {
		print_help(opts);
		while (1) {
			wait_4_outstanding_request(100);
			fprintf(stdout, "Enter deregister command: ");
			fflush(stdout);
			if (fgets(opts->command_string, MAX_CMDLEN - 1, stdin) == NULL)
				break;
			if (opts->command_string[0] == 'q')
				break;
			if (opts->command_string[0] == 'h')
				print_help(opts);
			else {
				if (strlen(opts->command_string) == 1) continue;
				opts->command_string[strlen(opts->command_string) - 1] = 0;
				if (check_regid_string(opts->command_string, rcvr_regid_list) < 0) {
					fprintf(stderr, "receiver registration ID list is corrupt - try again\n");
				}
				else {
					while (get_next(&rcvr_regid, rcvr_regid_list) >= 0) {
						snprintf(request_string, sizeof(request_string), "deregister %s %u %u %u", opts->store_interface_string, opts->store_port, opts->src_regid, rcvr_regid);
						send_request(ctx, opts->target_string, request_string);
						fprintf(stdout, "Sent deregister string [%s] to target [%s]\n", request_string, opts->target_string);
					}
				}
			}
		}
	}
}

int main(int argc, char **argv) {
	daemon_command_options_t opts;
	list_t sqn_list;
	list_t rcvr_regid_list;
	lbm_context_t *ctx;
	lbm_context_attr_t * cattr;

#if defined(_WIN32)
	{
		WSADATA wsadata;
		int status;

		/* Code to initialize socket interface on Windows */
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
	wait_4_response = 0;
	process_cmdline(argc, argv, &opts, &sqn_list, &rcvr_regid_list);

	/* Initialize logging callback */
	if (lbm_log(lbm_log_msg, NULL) == LBM_FAILURE) {
		fprintf(stderr, "lbm_log: %s\n", lbm_errmsg());
		exit(1);
	}
	/* Retrieve current context settings */
	if (lbm_context_attr_create(&cattr) == LBM_FAILURE) {
		fprintf(stderr, "lbm_context_attr_create: %s\n", lbm_errmsg());
		exit(1);
	}
	/* Create LBM context passing in any new context level attributes */
	if (lbm_context_create(&ctx, cattr, NULL, NULL) == LBM_FAILURE) {
		fprintf(stderr, "lbm_context_create: %s\n", lbm_errmsg());
		exit(1);
	}
	lbm_context_attr_delete(cattr);
	fprintf(stdout, "Sending unicast immediate messages to target: <%s>\n", opts.target_string);
	{
		size_t optlen = sizeof(my_request_port_str);
		if (lbm_context_str_getopt(ctx, "request_tcp_port", my_request_port_str, &optlen) == LBM_FAILURE) {
			fprintf(stderr, "lbm_context_str_getopt(request_tcp_port): %s\n", lbm_errmsg());
			exit(1);
		}
	}
	/* handle mode requests */
	if (opts.mode == PUBLISH_MODE) {
		handle_publish_mode_requests(ctx, &opts);
	}
	else if (opts.mode == MARK_MODE) {
		handle_mark_mode_requests(ctx, &opts, &sqn_list);
	}
	else if (opts.mode == ELECT_MODE) {
		handle_elect_mode_requests(ctx, &opts, &sqn_list);
	}
	else {
		handle_deregister_mode_requests(ctx, &opts, &rcvr_regid_list);
	}

	printf("Lingering for %d seconds...\n", opts.linger);
	fflush(stdout);
	SLEEP_SEC(opts.linger);
	printf("\n");

	lbm_context_delete(ctx);
	ctx = NULL;
	return 0;
}
