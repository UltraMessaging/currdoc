/*
  All of the documentation and software included in this and any
  other Informatica Corporation Ultra Messaging Releases
  Copyright (C) Informatica Corporation. All rights reserved.

  Redistribution and use in source and binary forms, with or without
  modification, are permitted only as covered by the terms of a
  valid software license agreement with Informatica Corporation.

  Copyright (C) 2004-2019, Informatica Corporation. All Rights Reserved.

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

/*
 * lbmlatpong.c
 *
 *  Created on: Aug 20, 2012
 *      Author: ebowden
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>
#include <limits.h>
#include <float.h>

#if defined(_MSC_VER)
    /* Windows-only includes */
    #include <windows.h>
    #include <winsock2.h>
    typedef unsigned long socklen_t;
    #define ERRNO GetLastError()
    #define CLOSESOCKET closesocket
    #define TLONGLONG signed __int64
#else
    #include <pthread.h>
    #include <unistd.h>
#endif

#include <lbm/lbm.h>
#include "cycle.h"
#include "stats.h"

#if defined(_WIN32)
    #include <sys/timeb.h>
    #define WIN32_HIGHRES_TIME
    #define SLEEP_SEC(x) Sleep((x)*1000)
    #define SLEEP_MSEC(x) Sleep(x)
#else
    #define SLEEP_SEC(x) sleep(x)
    #define SLEEP_MSEC(x) \
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

#define TRY(x) \
    do { \
        if ((x) < 0) { \
            /* Ignore wouldblocks. */ \
            if (lbm_errnum() != LBM_EWOULDBLOCK) { \
                fprintf(stderr, #x " failed (%s) at %s:%d\n", lbm_errmsg(), __FILE__, __LINE__); \
                exit(1); \
            } \
        } \
    } while(0)

/* get opt externs */
extern int optind;
extern char *optarg;
int getopt(int, char *const *, const char *);

/* Lines starting with double quote are extracted for UM documentation. */

const char purpose[] = "Purpose: "
"application to measure round-trip latency of SMX.  Use with lbmlatping."
;

char usage[] =
"Usage: lbmlatpong [-h] [-c filename] \n"
"       -c filename = Use LBM configuration file filename.\n"
"                     Multiple config files are allowed.\n"
"                     Example:  '-c file1.cfg -c file2.cfg'\n"
"       -h = help\n"
;

const char * OptionString = "hc:";

lbm_rcv_t *ping_rcv;

int found_pinger;

// Pre-acquire buffers -- since this is the ponger, we have to handle the case if 
// the pinger changes the size
void *current_acquired_buff = NULL;
int current_acquired_buff_size = 16;

int ping_rcv_handle_msg(lbm_rcv_t *rcv, lbm_msg_t *msg, void *clientd) {
    if (msg->type == LBM_MSG_DATA) {
        // readjust buffer size, if pinger changes it
        if (current_acquired_buff_size != msg->len) {
            lbm_src_buffs_cancel((lbm_src_t *)clientd);
            current_acquired_buff_size = msg->len;
            lbm_src_buff_acquire((lbm_src_t *)clientd,
                &current_acquired_buff, msg->len, 0);
        }
        memcpy(current_acquired_buff, msg->data, msg->len);
        lbm_src_buffs_complete_and_acquire((lbm_src_t *)clientd,
            &current_acquired_buff, current_acquired_buff_size, 0); 
    }
    return 0;
}

void * handle_new_src(const char *source_name, void *clientd) {
    found_pinger = 1;
    return NULL;
}

int handle_src_delete(const char *source_name, void *clientd, void *source_clientd) {
    return 0;
}

int main(int argc, char **argv) {
    lbm_context_t *ctx;
    lbm_context_attr_t *ctx_attr;

    lbm_topic_t *pong_src_topic;
    lbm_src_topic_attr_t *pong_src_topic_attr;
    lbm_src_t *pong_src;

    lbm_topic_t *ping_rcv_topic;
    lbm_rcv_topic_attr_t *ping_rcv_topic_attr;

    lbm_rcv_src_notification_func_t src_notify_func;
    // configurations
    int c;
    int errflag = 0;
#if defined(_WIN32)
    {
        WSADATA wsadata;
        int status;

        /* Windows socket setup code */
        if ((status = WSAStartup(MAKEWORD(2,2),&wsadata)) != 0) {
            fprintf(stderr,"%s: WSA startup error - %d\n",argv[0],status);
            exit(1);
        }
    }
#endif
    src_notify_func.clientd = NULL;
    src_notify_func.create_func = handle_new_src;
    src_notify_func.delete_func = handle_src_delete;

    /* handle command line */
    while ((c = getopt(argc, argv, OptionString)) != EOF) {
        switch (c) {
            case 'c':
                /* Initialize configuration parameters from a file. */
                if (lbm_config(optarg) == LBM_FAILURE) {
                    fprintf(stderr, "lbm_config: %s\n", lbm_errmsg());
                    exit(1);
                }
                break;
            default:
                errflag++;
                break;
        }
    }
    if (errflag) {
	fprintf(stderr, "%s\n%s\n%s\n%s",
		argv[0], lbm_version(), purpose, usage);
        exit(1);
    }

    /* Create the context. */
    TRY(lbm_context_attr_create(&ctx_attr));
    TRY(lbm_context_attr_str_setopt(ctx_attr, "resolver_cache", "0"));
    TRY(lbm_context_attr_str_setopt(ctx_attr, "operational_mode", "sequential"));
    TRY(lbm_context_attr_str_setopt(ctx_attr, "request_tcp_port_high", "50000"));
#if !defined(_WIN32)
    TRY(lbm_context_attr_str_setopt(ctx_attr, "request_tcp_reuseaddr", "1"));
#endif
    TRY(lbm_context_create(&ctx, ctx_attr, NULL, NULL));
    TRY(lbm_context_attr_delete(ctx_attr));

    /* Create the pong source. */
    TRY(lbm_src_topic_attr_create(&pong_src_topic_attr));
    TRY(lbm_src_topic_attr_str_setopt(pong_src_topic_attr, "resolver_advertisement_sustain_interval", "0"));
    TRY(lbm_src_topic_attr_str_setopt(pong_src_topic_attr, "transport", "lbtsmx"));
    TRY(lbm_src_topic_alloc(&pong_src_topic, ctx, "lbmlat-pong", pong_src_topic_attr));
    TRY(lbm_src_topic_attr_delete(pong_src_topic_attr));
    TRY(lbm_src_create(&pong_src, ctx, pong_src_topic, NULL, NULL, NULL));

    /* Create the ping receiver. */
    TRY(lbm_rcv_topic_attr_create(&ping_rcv_topic_attr));
    TRY(lbm_rcv_topic_attr_setopt(ping_rcv_topic_attr, "source_notification_function", &src_notify_func, sizeof(src_notify_func)));
    TRY(lbm_rcv_topic_lookup(&ping_rcv_topic, ctx, "lbmlat-ping", ping_rcv_topic_attr));
    TRY(lbm_rcv_topic_attr_delete(ping_rcv_topic_attr));
    TRY(lbm_rcv_create(&ping_rcv, ctx, ping_rcv_topic, ping_rcv_handle_msg, (void *)pong_src, NULL));

    /* Wait a bit for the IPC thread to start up. */
    SLEEP_SEC(1);

    /* Note: no configuration validation will be done -- assume that the pinger sends a valid size message */

    /* Run the context until we've discovered the pinger's source. */
    while (1) {
        lbm_context_process_events(ctx, 1000);
        if (found_pinger) break;
    }

    /* Send in a dummy pong message to kick things off. */
    {
        lbm_src_buff_acquire(pong_src, &current_acquired_buff, 16, 0);
        current_acquired_buff_size = 16;
        memcpy(current_acquired_buff, "0123456789ABCDEF", 16);
        lbm_src_buffs_complete_and_acquire(pong_src,
            &current_acquired_buff, current_acquired_buff_size, 0); 
    }

    while (1) {
        SLEEP_SEC(10000);
    }
    return 0;
}

