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
#include <sys/time.h>
#endif
#if defined(__TANDEM) && defined(HAVE_TANDEM_SPT)
#include <ktdmtyp.h>
#include <spthread.h>
#endif

#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <time.h>
#ifdef _WIN32
#include <winsock2.h>
#include <sys/timeb.h>
#define strcasecmp stricmp
#else
#include <unistd.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <signal.h>
#include <sys/time.h>
#if defined(__TANDEM)
#include <strings.h>
#endif
#endif
#include "replgetopt.h"
#include "lbm/lbm.h"

#include "srs_monitor_info_msg.h"

#if defined(_WIN32)
#   define SLEEP_SEC(x) Sleep(x*1000)
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

const char purpose[] = "Purpose: receive SRS monitor info messages on the specified topic.";
const char usage[] =
"Usage: srs_monitor_info_receiver [options] topic\n"
"Available options:\n"
"  -c, --config=FILE    Use LBM configuration file filename.\n"
"                       Multiple config files are allowed.\n"
"                       Example:  '-c file1.cfg -c file2.cfg'\n"
"  -E, --exit           exit upon EOS reception\n"
"  -h, --help           help\n"
"  -L, --linger         linger for linger seconds before closing context\n"
;

const char * option_string = "c:EhL:";
const struct option option_table[] = {
    { "config", required_argument, NULL, 'c' },
    { "exit", no_argument, NULL, 'E' },
    { "help", no_argument, NULL, 'h' },
    { "linger", required_argument, NULL, 'L' },
    { NULL, 0, NULL, 0 }
};

struct Options {
    int exit_on_eos;
    char *topic;
    int linger_seconds;
} options;

int exit_on_eos = 0;
lbm_context_t *ctx;

int lbm_log_msg(int level, const char *message, void *clientd) {
    printf("LOG Level %d: %s\n", level, message);
    return 0;
}
 
int rcv_handle_msg(lbm_rcv_t *rcv, lbm_msg_t *msg, void *clientd) {
    void *decoder_state;
    struct Options *opts = &options;
    
    if (exit_on_eos) {
        return 0;
    }
    
    switch (msg->type) {
        case LBM_MSG_DATA:
            handle_srs_monitor_info_message(UJDecode(msg->data, msg->len, NULL, &decoder_state));
            UJFree(decoder_state);
            break;
        case LBM_MSG_BOS:
            printf("[%s][%s], Beginning of Transport Session\n", msg->topic_name, msg->source);
            break;
        case LBM_MSG_EOS:
            printf("[%s][%s], End of Transport Session\n", msg->topic_name, msg->source);
        
            if (opts->exit_on_eos) {
                exit_on_eos = 1;
            }
            break;
        default:
            printf( "Unhandled receiver event [%d] from source [%s] with topic [%s]. Refer to https://ultramessaging.github.io/currdoc/doc/example/index.html#unhandledcevents for a detailed description.\n", msg->type, msg->source, msg->topic_name);
            break;
    }
   
    return 0;
}

void process_cmdline(int argc, char **argv, struct Options *opts) {
    int c, errflag = 0;
    
    memset(opts, 0, sizeof(*opts));
    
    while ((c = getopt_long(argc, argv, option_string, option_table, NULL)) != EOF) {
        switch (c) {
            case 'c':
                if (lbm_config(optarg) == LBM_FAILURE) {
                    fprintf(stderr, "lbm_config: %s\n", lbm_errmsg());
                    exit(1);
                }
                break;
            case 'E':
                opts->exit_on_eos = 1;
                break;
            case 'h':
                fprintf(stderr, "%s\n%s\n%s\n%s",
                        argv[0], lbm_version(), purpose, usage);
                exit(0);
                break;
            case 'L':
                opts->linger_seconds = atoi(optarg);
                break;
            default:
                errflag++;
            break;
        }
    }
    
    if (errflag || (optind == argc)) {
        /* An error occurred processing the command line; dump the LBM version, usage and exit */
        fprintf(stderr, "%s\n%s\n%s", argv[0], lbm_version(), usage);
        exit(1);
    }
    
    opts->topic = argv[optind];
}

int main(int argc, char **argv) {
    struct Options *opts = &options;
    lbm_context_attr_t * ctx_attr;
    lbm_topic_t *topic;
    lbm_rcv_t *rcv;
    
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
     /* Ignore SIGPIPE on UNIXes which can occur when writing to a socket with only one open end point */
    signal(SIGPIPE, SIG_IGN);
#endif /* _WIN32 */
    
    /* Process command line arguments */
    process_cmdline(argc, argv, opts);
    
    /* Initialize logging callback */
    if (lbm_log(lbm_log_msg, NULL) == LBM_FAILURE) {
        fprintf(stderr, "lbm_log: %s\n", lbm_errmsg());
        exit(1);
    }
    
    if (lbm_context_attr_create(&ctx_attr) == LBM_FAILURE) {
        fprintf(stderr, "lbm_context_attr_create: %s\n", lbm_errmsg());
        exit(1);
    }
    
    if (lbm_context_create(&ctx, ctx_attr, NULL, NULL) == LBM_FAILURE) {
        fprintf(stderr, "lbm_context_create: %s\n", lbm_errmsg());
        exit(1);
    }
    lbm_context_attr_delete(ctx_attr);
    
    if (lbm_rcv_topic_lookup(&topic, ctx, opts->topic, NULL) == LBM_FAILURE) {
        fprintf(stderr, "lbm_rcv_topic_lookup: %s\n", lbm_errmsg());
        exit(1);
    }
    
    if (lbm_rcv_create(&rcv, ctx, topic, rcv_handle_msg, NULL, NULL) == LBM_FAILURE) {
        fprintf(stderr, "lbm_rcv_create: %s\n", lbm_errmsg());
        exit(1);
    }
    
    while (exit_on_eos == 0) {
        /* Sleep for a second; LBM event processing is done on a separate thread */
        SLEEP_SEC(1);
    }
    
    if (opts->linger_seconds > 0) {
        fprintf(stdout, "Lingering for %d second(s)...", opts->linger_seconds);
        SLEEP_SEC(opts->linger_seconds);
    }
    
    lbm_rcv_delete(rcv);
    lbm_context_delete(ctx);
    return 0;
}


