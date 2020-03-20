/*
  All of the documentation and software included in this and any
  other Informatica Corporation Ultra Messaging Releases
  Copyright (C) Informatica Corporation. All rights reserved.

  Redistribution and use in source and binary forms, with or without
  modification, are permitted only as covered by the terms of a
  valid software license agreement with Informatica Corporation.

  Copyright (C) 2004-2020, Informatica Corporation. All Rights Reserved.

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
 * lbmlatping.c
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
    #include <sys/time.h>
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

#define ALLOW_MSG_NUM_CONFIG 0

/* get opt externs */
extern int optind;
extern char *optarg;
int getopt(int, char *const *, const char *);

/* Lines starting with double quote are extracted for UM documentation. */

const char purpose[] = "Purpose: "
"application to measure round-trip latency of SMX.  Use with lbmlatpong."
;

char usage[] =
"Usage: lbmlatping [-h] [-c filename] [-l len] [-P msec] \n"
"       -c filename = Use LBM configuration file filename.\n"
"                     Multiple config files are allowed.\n"
"                     Example:  '-c file1.cfg -c file2.cfg'\n"
"       -h = help\n"
#if ALLOW_MSG_NUM_CONFIG
"       -i msgs = send and ignore msgs messages to warm up\n"
#endif
"       -l len = use len length messages\n"
#if ALLOW_MSG_NUM_CONFIG
"       -M msgs = send additional msgs messages (after ignore)\n"
#endif
"       -P usec = pause after each send usec microseconds\n"
"                 (only accurate to milliseconds on windows)\n"
;

const char * OptionString = "hc:l:P:i:M:";

/* Ignore the results for the first 100000 messages (things still getting set up). */
#define NUM_MSGS_IGNORED 100000
#if ALLOW_MSG_NUM_CONFIG
int num_msgs_ignored = NUM_MSGS_IGNORED;
#else
#define num_msgs_ignored NUM_MSGS_IGNORED
#endif

/* Total messages sent. */
#define NUM_MSGS 1000000
#if ALLOW_MSG_NUM_CONFIG
int num_msgs = NUM_MSGS;
#else
#define num_msgs (NUM_MSGS + NUM_MSGS_IGNORED)
#endif

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

typedef ticks rtt_timestamp_t;

lbm_rcv_t *pong_rcv;

// Pre-acquire buffers -- the pinger is tracking size, just in case, we want
// to change it on the fly later.
void *current_acquired_buff = NULL;
int current_acquired_buff_size = 16;

//
long get_time_in_millis()
{
#if defined(_WIN32)
    struct timeb tb;
    long ret;

    ftime(&tb);
    ret = (long)((tb.time * 1000) + tb.millitm);
#else
    struct timeval tv;
    long ret;

    gettimeofday(&tv, NULL);
    ret = (tv.tv_sec * 1000) + (tv.tv_usec / 1000);
#endif
    return ret;
}

double static processor_frequency = -1.0;
double static picoseconds_per_tick = -1.0;
double get_processor_frequency()
{
    int iterations = 100;
    int msecs = 5;
    int i;
    uint64_t tot_rdtsc_samples = 0;		// in ticks
    uint64_t tot_time_samples = 0;		// in millis

    if (processor_frequency > 0.0) return processor_frequency;

    /* take several samples, take the average and store the ticks/msec */
    for (i = 0; i < iterations; i++)
    {
        uint64_t start = 0;
        uint64_t end = 0;
        long start_time;
        long end_time;
        long diff_time;

        start_time = get_time_in_millis();
        start = getticks();
        SLEEP_MSEC(msecs);
        end = getticks();
        end_time = get_time_in_millis();

        diff_time = end_time - start_time;
        tot_rdtsc_samples += end - start;
        tot_time_samples += diff_time;
    }
    processor_frequency = (double) tot_rdtsc_samples / (double) tot_time_samples * 1000.0;
    picoseconds_per_tick = (1000.0 * 1000.0 * 1000.0 * 1000.0) / processor_frequency;
    return processor_frequency;
}

// warning: assumes that the frequency has already been calculated
long get_ticktime_in_nanos()
{
    return (long) (getticks() * picoseconds_per_tick / 1000L);
}

void spin_wait_in_micros(long micros)
{
    long endtime = get_ticktime_in_nanos() + (micros * 1000);

    while (get_ticktime_in_nanos() < endtime);
}

/* Create the payload prior to execution. This is so that
 * payload generation is not part of the benchmark.
 */
long usecpause = 0;
char *payloadcomponent = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
size_t payloadlen = 16;
char *payloadmsg = NULL;
int createpayload() {
    int i;
    if (payloadmsg != NULL) free(payloadmsg);
    if (payloadlen < 16) payloadlen = 16;			// Minimum of 16 bytes

    payloadmsg = (char *) malloc(payloadlen+1);

    if (payloadmsg == NULL) {
        fprintf(stderr, "Memory Allocation Failure\n");
        exit(1);
    }
    for (i = 0; i < payloadlen; i++)
        payloadmsg[i] = payloadcomponent[i & 0x1f];
    payloadmsg[payloadlen] = '\0';
    return 0;
}

typedef struct rcv_clientd_t_stct {
    lbm_src_t *ping_src;
    rtt_timestamp_t *ts;
} rcv_clientd_t;

int pong_rcv_handle_msg_summary(lbm_rcv_t *rcv, lbm_msg_t *msg, void *clientd) {
    rcv_clientd_t * const rcv_clientd = (rcv_clientd_t *)clientd;
    static int rcvd_msgs = 0; /* First msg we get is a dummy msg to start. */
    static ticks start_ticks;

    if (msg->type == LBM_MSG_DATA) {
//		if (usecpause > 0) spin_wait_in_micros(usecpause);

        /* One timestamp indicates both when this msg was rcvd and
           when the next was sent (as next line is sending). */
        if (rcvd_msgs == num_msgs_ignored)
            start_ticks = getticks();
        if (current_acquired_buff == NULL) {
            lbm_src_buff_acquire(rcv_clientd->ping_src,
                &current_acquired_buff, payloadlen, 0);
            current_acquired_buff_size = payloadlen;	// should not change
        }
        memcpy(current_acquired_buff, payloadmsg, payloadlen);
        lbm_src_buffs_complete_and_acquire(rcv_clientd->ping_src,
                        &current_acquired_buff, current_acquired_buff_size, 0); 
        if (rcvd_msgs != num_msgs) {
            rcvd_msgs++;
        }
        else {
            ticks end_ticks = getticks();
            printf("Successfully sent & received %d total %d-byte messages, ignoring the first %d messages.\n", num_msgs, (int) payloadlen, num_msgs_ignored);
            printf("Average per-message round-trip latency:  %.0f nanoseconds.\n", elapsed(end_ticks, start_ticks) / (num_msgs - num_msgs_ignored));
            exit(0);
        }
    }
    return 0;
}

int pong_rcv_handle_msg(lbm_rcv_t *rcv, lbm_msg_t *msg, void *clientd) {
    
    rcv_clientd_t * const rcv_clientd = (rcv_clientd_t *)clientd;
    static int rcvd_msgs = 0; /* First msg we get is a dummy msg to start. */

    if (msg->type == LBM_MSG_DATA) {
        if (usecpause > 0) spin_wait_in_micros (usecpause);

        rcv_clientd->ts[rcvd_msgs] = getticks();
        if (current_acquired_buff == NULL) {
            lbm_src_buff_acquire(rcv_clientd->ping_src,
                &current_acquired_buff, payloadlen, 0);
            current_acquired_buff_size = payloadlen;	// should not change
        }
        /* One timestamp indicates both when this msg was rcvd and
           when the next was sent (as next line is sending). */
        memcpy(current_acquired_buff, payloadmsg, payloadlen);
        lbm_src_buffs_complete_and_acquire(rcv_clientd->ping_src,
            &current_acquired_buff, current_acquired_buff_size, 0); 
        if (rcvd_msgs == num_msgs) {
            int i;
            double min = 999999999, max = 0, stddev;
            double rdtsc_frequency_ghz = (double) get_processor_frequency() / 1000000000.0;
            struct summary_stats stats;
            double *elapsed_ts = (double *) malloc(sizeof(double) * num_msgs);

            printf("Successfully sent & received %d total %d-byte messages, ignoring the first %d messages.\n", num_msgs, (int) payloadlen, num_msgs_ignored);
            printf("Round-trip times in nanoseconds, assuming a %f GHz clock:\n", rdtsc_frequency_ghz);
            for (i = num_msgs_ignored; i < num_msgs; i++) {
                /* Convert to nanoseconds. */
                elapsed_ts[i] = elapsed(rcv_clientd->ts[i + 1], rcv_clientd->ts[i]) / rdtsc_frequency_ghz;
                if (usecpause > 0)						// TODO: need to improve, but need separate start/end first
                    elapsed_ts[i] -= (usecpause * 1000.0);
                /* Elapsed time for each is diff between each timestamp. */
                if (elapsed_ts[i] < min)
                    min = elapsed_ts[i];
                else if (elapsed_ts[i] > max) {
                    max = elapsed_ts[i];
                }
            }

            /* Now calculate some summary statistics. */
            qsort(&(elapsed_ts[num_msgs_ignored]), num_msgs - num_msgs_ignored, sizeof(elapsed_ts[0]), compare_double);
            calc_summary_stats(&(elapsed_ts[num_msgs_ignored]), num_msgs - num_msgs_ignored, &stats);
            stddev = stats.sample_sd;
            printf("Min: %.0f, Max %.0f\n", min, max);
            printf("Mean: %.0f, Median: %.0f, Standard Dev: %.0f\n", stats.mean,
                stats.data[stats.nr_items / 2],
                stddev);
            printf("99.9%%: %.0f, 99%%: %.0f, 95%%: %.0f, 90%%: %.0f, 80%%: %.0f\n",
                stats.data[(stats.nr_items * 999) / 1000],
                stats.data[(stats.nr_items * 99) / 100],
                stats.data[(stats.nr_items * 95) / 100],
                stats.data[(stats.nr_items * 9) / 10],
                stats.data[(stats.nr_items * 8) / 10]);

            exit(0);
        }
        rcvd_msgs++;
    }

    return 0;
}

int main(int argc, char **argv) {
    lbm_context_t *ctx;
    lbm_context_attr_t *ctx_attr;

    lbm_topic_t *ping_src_topic;
    lbm_src_topic_attr_t *ping_src_topic_attr;

    lbm_topic_t *pong_rcv_topic;
    lbm_rcv_topic_attr_t *pong_rcv_topic_attr;

    rcv_clientd_t rcv_clientd;

    // configurations
    int c, errflag = 0;
	int smx_datagram_size = -1;
	size_t smxdgssize = 4;
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
    createpayload();
    get_processor_frequency();
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
                case 'h':
                        errflag++;
                        break;
                case 'i':
#if ALLOW_MSG_NUM_CONFIG
                        num_msgs_ignored = atoi(optarg);
#else
                        fprintf(stderr, "Note: this program was compiled with -i option disabled\n");
#endif	
                        break;
                case 'l':
                        payloadlen = atoi(optarg);
                        createpayload();
                        break;
                case 'M':
#if ALLOW_MSG_NUM_CONFIG
                        num_msgs = atoi(optarg);
#else
                        fprintf(stderr, "Note: this program was compiled with -M option disabled\n");
#endif	
                        break;
                case 'P':
                        usecpause = atoi(optarg);
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
#if ALLOW_MSG_NUM_CONFIG
    num_msgs += num_msgs_ignored;
#endif

    /* Round trip times in ticks. Plus one slot to account for the initial dummy msg we receive
     * from the ponger to start things. */
    rcv_clientd.ts = (rtt_timestamp_t *) malloc(sizeof(rtt_timestamp_t) * (num_msgs + 1));
    memset(rcv_clientd.ts, 0, sizeof(rtt_timestamp_t) * (num_msgs + 1));

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

    /* Create the pong receiver. */
    TRY(lbm_rcv_topic_attr_create(&pong_rcv_topic_attr));
    TRY(lbm_rcv_topic_lookup(&pong_rcv_topic, ctx, "lbmlat-pong", pong_rcv_topic_attr));
    TRY(lbm_rcv_topic_attr_delete(pong_rcv_topic_attr));
    TRY(lbm_rcv_create(&pong_rcv, ctx, pong_rcv_topic, pong_rcv_handle_msg, (void*)(&rcv_clientd), NULL));

    /* Give the thread a moment to start up. */
    SLEEP_SEC(1);

    /* Create the ping source. */
    TRY(lbm_src_topic_attr_create(&ping_src_topic_attr));
    TRY(lbm_src_topic_attr_str_setopt(ping_src_topic_attr, "resolver_advertisement_sustain_interval", "0"));
    TRY(lbm_src_topic_attr_str_setopt(ping_src_topic_attr, "transport", "lbtsmx"));
	TRY(lbm_src_topic_attr_getopt(ping_src_topic_attr, "transport_lbtsmx_datagram_max_size", &smx_datagram_size, &smxdgssize));
    TRY(lbm_src_topic_alloc(&ping_src_topic, ctx, "lbmlat-ping", ping_src_topic_attr));
    TRY(lbm_src_topic_attr_delete(ping_src_topic_attr));
    TRY(lbm_src_create(&(rcv_clientd.ping_src), ctx, ping_src_topic, NULL, NULL, NULL));

	/* perform configuration validation */
	{
	    const int smx_header_size = 16;
		int max_payload_size = smx_datagram_size + smx_header_size;

        if (payloadlen > max_payload_size) {
            /* The SMX transport doesn't fragment, so payload must be within maximum size limits */
			fprintf(stderr, "Error: Message size requested is larger than configured SMX datagram size.\n");
            exit(1);
        }
	}

    /* Run the context just long enough to advertise. */
    lbm_context_process_events(ctx, 100);

    /* The ponger kicks things off as soon as he's discovered our ping source. */
    while (1)
        SLEEP_SEC(10000);

    return 0;
}

