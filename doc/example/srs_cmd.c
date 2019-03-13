
/*
 Copyright (c) 2005-2019 Informatica Corporation  Permission is granted to licensees to use
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
#include "replgetopt.h"

#include "srs_cmd_msg.h"

#define MAX_TARGET_LEN 256
#define DEFAULT_LINGER 1
#define RESPONSE_TIMEOUT 5000

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
"Purpose: send unicast immediate command messages to an SRS daemon.";

char usage[] =
"Usage: srs_cmd [options] [command_string]\n"
"Available options:\n"
"  -c filename = Use LBM configuration file filename.\n"
"                Multiple config files are allowed.\n"
"                Example:  '-c file1.cfg -c file2.cfg'\n"
"  -h = help\n"
"  -L linger = linger for linger seconds before closing context\n"
"  -T target = target for unicast immediate messages (required)\n"
;

const char * OptionString = "c:hL:T:";
const struct option OptionTable[] = {
    { "config", required_argument, NULL, 'c' },
    { "help", no_argument, NULL, 'h' },
    { "linger", required_argument, NULL, 'L' },
    { "target", required_argument, NULL, 'T' },
    { NULL, 0, NULL, 0 }
};

char help_msg[] =
"***********************************************************************************\n"
"*        help (print this message): h                                             *\n"
"*          quit (exit application): q                                             *\n"
"*               report SRS version: version                                       *\n"
"* set category publishing interval: srs_stats 0 | 200-N                           *\n"
"*                                   um_client_stats 0 | 200-N                     *\n"
"*                                   connection_events 0 | 200-N                   *\n"
"*                                   srs_error_stats 0 | 200-N                     *\n"
"*                                   um_client_error_stats 0 | 200-N               *\n"
"*                                   config_opts 0 | 200-N                         *\n"
"*                                   internal_config_opts 0 | 200-N                *\n"
"*     set all publishing intervals: interval 0 | 200-N                            *\n"
"*                snapshot category: snap srs_stats | um_client_stats |            *\n"
"*                                   connection_events | srs_error_stats |         *\n"
"*                                   um_client_error_stats | config_opts |         *\n"
"*                                   internal_config_opts                          *\n"
"*          snapshot all categories: snap                                          *\n"
"***********************************************************************************\n"
;

/* Logging callback function (given as an argument to lbm_log()) */
int lbm_log_msg(int level, const char *message, void *clientd)
{
    printf("LOG Level %d: %s\n", level, message);
    return 0;
}

void print_help_exit(char **argv, int exit_value){
    fprintf(stderr, "%s\n%s\n%s\n%s\ncommand_string:\n\n%s",
            argv[0], lbm_version(), purpose, usage, help_msg);
    exit(exit_value);
}

int handle_response(lbm_request_t *req, lbm_msg_t *msg, void *clientd) {
    lbm_req_info_t *req_info = (lbm_req_info_t *)clientd;
    
    char text[256] = "";
    if (msg->len <= 255) {
        strncpy(text, msg->data, msg->len);
        text[msg->len] = '\0';
    }
    
    switch (msg->type) {
        case LBM_MSG_RESPONSE:
            printf("Response received [%s] from [%s][%u], %lu bytes\n", text, msg->source, msg->sequence_number, (unsigned long)msg->len);
            break;
        default:
            printf("Unknown (unsupported) lbm_msg_t type 0x%x [%s]\n", msg->type, msg->source);
        break;
    }
    lbm_cancel_timer(req_info->ctx, req_info->timer_id, NULL);
    lbm_request_delete(req_info->req);
    free(req_info);
    return 0;
}

int handle_timer(lbm_context_t *ctx, const void *clientd) {
    lbm_req_info_t *req_info = (lbm_req_info_t *)clientd;
    
    fprintf(stderr, "Command [%s] timed out. Make sure your target is valid.\n", req_info->req_msg);
    fflush(stderr);
    lbm_request_delete(req_info->req);
    free(req_info);
    return 0;
}

void print_help() {
    fprintf(stdout, "%s", help_msg);
}

void send_request(lbm_context_t *ctx, char *target, char *command, char *command_message) {
    lbm_req_info_t *req_info = malloc(sizeof(lbm_req_info_t));
    memset(req_info, 0, sizeof(lbm_req_info_t));
    memcpy(req_info->req_msg, command, strlen(command));
    req_info->ctx = ctx;
    
    if ((req_info->timer_id = lbm_schedule_timer(ctx, handle_timer, req_info, NULL, RESPONSE_TIMEOUT)) == -1) {
        fprintf(stderr, "lbm_schedule_timer: %s\n", lbm_errmsg());
        fflush(stderr);
        exit(1);
    }
    
    if (lbm_unicast_immediate_request(&(req_info->req), ctx, target, NULL, command_message, strlen(command_message),
                                      handle_response, req_info, NULL, 0) == LBM_FAILURE) {
        fprintf(stderr, "lbm_unicast_immediate_request: %s\n", lbm_errmsg());
        fflush(stderr);
        exit(1);
    }
}

int main(int argc, char **argv) {
    lbm_context_t *ctx;
    lbm_context_attr_t * cattr;
    char command_string[MAX_CMD_LEN];
    char *command = NULL;
    char target_opt[MAX_TARGET_LEN] = "";
    char *target = NULL;
    int c, errflag = 0;
    int linger = DEFAULT_LINGER;
    
    while ((c = getopt_long(argc, argv, OptionString, OptionTable, NULL)) != EOF) {
        switch (c) {
            case 'c':
                if (lbm_config(optarg) == LBM_FAILURE) {
                    fprintf(stderr, "lbm_config: %s\n", lbm_errmsg());
                    exit(1);
                }
                break;
            case 'h':
                print_help_exit(argv, 0);
                break;
            case 'L':
                linger = atoi(optarg);
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
    
    if (errflag != 0) {
        print_help_exit(argv, 1);
    }
    
    if (argc > optind) {
        memset(command_string, 0, MAX_CMD_LEN);
        strncpy(command_string, argv[optind], sizeof(command_string));
        command = command_string;
    }
    
    if (target == NULL) {
        fprintf(stderr, "Command line error: the '-T target_string' option is mandatory\n");
        print_help_exit(argv, 1);
    }
    
    if (lbm_log(lbm_log_msg, NULL) == LBM_FAILURE) {
        fprintf(stderr, "lbm_log: %s\n", lbm_errmsg());
        exit(1);
    }
    
    if (lbm_context_attr_create(&cattr) == LBM_FAILURE) {
        fprintf(stderr, "lbm_context_attr_create: %s\n", lbm_errmsg());
        exit(1);
    }
    
    if (lbm_context_create(&ctx, cattr, NULL, NULL) == LBM_FAILURE) {
        fprintf(stderr, "lbm_context_create: %s\n", lbm_errmsg());
        exit(1);
    }
    lbm_context_attr_delete(cattr);
    
    fprintf(stdout, "Sending unicast immediate messages to target: <%s>\n", target);
    fflush(stdout);
    
    if (command != NULL) {
        char *command_message = get_command_message(command_string);
        if (command_message != NULL) {
            send_request(ctx, target, command_string, command_message);
            free(command_message); /* get_command_message mallocs a new string */
        }
    } else {
		int done_sending = 0;
		char *command_message;
        print_help();
        while (done_sending != 1) {
            if (fgets(command_string, MAX_CMD_LEN - 1, stdin) == NULL) {
                done_sending = 1;
            } else if (command_string[0] == 'q') {
                done_sending = 1;
            } else if (command_string[0] == 'h') {
                print_help();
            } else {
                char *new_line_char = strchr(command_string, '\n');
                if (new_line_char != NULL) {
                    *new_line_char = '\0';
                }

                command_message = get_command_message(command_string);
                if (command_message != NULL) {
                    send_request(ctx, target, command_string, command_message);
                    free(command_message); /* get_command_message mallocs a new string */
                }
            }
        }
    }
    
    printf("Lingering for %d second(s)...\n", linger);
    fflush(stdout);
    SLEEP_SEC(linger);
    
    lbm_context_delete(ctx);
    ctx = NULL;
    return 0;
}

