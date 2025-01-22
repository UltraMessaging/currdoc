/*
(C) Copyright 2005,2025 Informatica Inc.  Permission is granted to licensees to use
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
#include <lbm/lbm.h>
#include <lbm/lbmmon.h>
#include "monmodopts.h"
#include "verifymsg.h"
#include "replgetopt.h"
#include "lbm-example-util.h"
#include <lbm/lbm.h>
#include <lbm/umedmonmsgs.h>

#ifdef  _WIN64
#define offsetof(s,m)   (size_t)( (ptrdiff_t)&(((s *)0)->m) )
#elif !defined(_AIX)
#define offsetof(s,m)   (size_t)&(((s *)0)->m)
#endif

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

lbm_uint16_t byte_swap16(lbm_uint16_t n16) {
	lbm_uint16_t h16 = 0;
	int i = 0;
	for (; i<2; ++i) {
		h16 <<= 8;
		h16 |= (n16 & 0xff);
		n16 >>= 8;
	}
	return h16;
}

lbm_uint32_t byte_swap32(lbm_uint32_t n32) {
	lbm_uint32_t h32 = 0;
	int i = 0;
	for (; i<4; ++i) {
		h32 <<= 8;
		h32 |= (n32 & 0xff);
		n32 >>= 8;
	}
	return h32;
}

lbm_uint64_t byte_swap64(lbm_uint64_t n64) {
	lbm_uint64_t h64 = 0;
	int i = 0;
	for (; i<8; ++i) {
		h64 <<= 8;
		h64 |= (n64 & 0xff);
		n64 >>= 8;
	}
	return h64;
}

#define COND_SWAP16(_bs,_n) ((_bs)? byte_swap16(_n) : _n)
#define COND_SWAP32(_bs,_n) ((_bs)? byte_swap32(_n) : _n)
#define COND_SWAP64(_bs,_n) ((_bs)? byte_swap64(_n) : _n)

/* Lines starting with double quote are extracted for UM documentation. */

const char purpose[] = "Purpose: "
"application that receives umestore daemon messages on the specified publishing topic."
;

const char usage[] =
"Usage: umedmon [-Ehv] [-c filename] publishing_topic\n"
"Available options:\n"
"  -c, --config=FILE    Use LBM configuration file FILE.\n"
"                       Multiple config files are allowed.\n"
"                       Example:  '-c file1.cfg -c file2.cfg'\n"
"  -E, --exit           exit when source stops sending\n"
"  -h, --help           display this help and exit\n"
"  -v, --verbose        be verbose about incoming messages (-v -v = be even more verbose)\n"
;

const char * OptionString = "c:Ehv";
const struct option OptionTable[] = {
	{ "config", required_argument, NULL, 'c' },
	{ "exit", no_argument, NULL, 'E' },
	{ "help", no_argument, NULL, 'h' },
	{ "verbose", no_argument, NULL, 'v' },
	{ NULL, 0, NULL, 0 }
};

struct Options {
	int end_on_end;  /* Flag to end program when source stops sending */
	int verbose;     /* Flag to control program verbosity */
	char *topic;     /* The topic on which to receive messages */
} options;

int close_recv = 0;
int opmode;							/* operational mode of LBM: sequential or embedded */
lbm_context_t *ctx;					/* ptr to context object */
int verbose = 0;

size_t format_timeval(struct timeval *tv, char *buf, size_t sz)
{
	size_t written = -1;
	time_t tt = tv->tv_sec;
	struct tm *gm = gmtime(&tt);
	if (gm) {
		written = (size_t)strftime(buf, sz, "%Y-%m-%d %H:%M:%S GMT", gm);
	}
	return written;
}

/*
* For the elapsed time, calculate and print the msgs/sec, bits/sec, and
* loss stats
*/
void print_bw(FILE *fp, struct timeval *tv, unsigned int msgs, unsigned int bytes, int unrec, lbm_ulong_t lost, int rx_msgs, int otr_msgs)
{
	char scale[] = { ' ', 'K', 'M', 'G' };
	int msg_scale_index = 0, bit_scale_index = 0;
	double sec = 0.0, mps = 0.0, bps = 0.0;
	double kscale = 1000.0;

	if (tv->tv_sec == 0 && tv->tv_usec == 0) return;/* avoid div by 0 */
	sec = (double)tv->tv_sec + (double)tv->tv_usec / 1000000.0;
	mps = (double)msgs / sec;
	bps = (double)bytes * 8 / sec;

	while (mps >= kscale) {
		mps /= kscale;
		msg_scale_index++;
	}

	while (bps >= kscale) {
		bps /= kscale;
		bit_scale_index++;
	}

	if ((rx_msgs != 0) || (otr_msgs != 0))
		fprintf(fp, "%-6.4g secs.  %-5.4g %cmsgs/sec.  %-5.4g %cbps [RX: %d][OTR: %d]",
		sec, mps, scale[msg_scale_index], bps, scale[bit_scale_index], rx_msgs, otr_msgs);
	else
		fprintf(fp, "%-6.4g secs.  %-5.4g %cmsgs/sec.  %-5.4g %cbps",
		sec, mps, scale[msg_scale_index], bps, scale[bit_scale_index]);
	fprintf(fp, "\n");
	fflush(fp);
}

/* Utility to print the contents of a buffer in hex/ASCII format */
void dump(const char *buffer, int size)
{
	int i, j;
	unsigned char c;
	char textver[20];

	for (i = 0; i<(size >> 4); i++) {
		for (j = 0; j<16; j++) {
			c = buffer[(i << 4) + j];
			printf("%02x ", c);
			textver[j] = ((c<0x20) || (c>0x7e)) ? '.' : c;
		}
		textver[j] = 0;
		printf("\t%s\n", textver);
	}
	for (i = 0; i<size % 16; i++) {
		c = buffer[size - size % 16 + i];
		printf("%02x ", c);
		textver[i] = ((c<0x20) || (c>0x7e)) ? '.' : c;
	}
	for (i = size % 16; i<16; i++) {
		printf("   ");
		textver[i] = ' ';
	}
	textver[i] = 0;
	printf("\t%s\n", textver);
}

/* Logging handler passed into lbm_log() */
int lbm_log_msg(int level, const char *message, void *clientd)
{
	printf("LOG Level %d: %s\n", level, message);
	return 0;
}

#ifdef  _WIN64
#define offsetof(s,m)   (size_t)( (ptrdiff_t)&(((s *)0)->m) )
#elif !defined(_AIX)
#define offsetof(s,m)   (size_t)&(((s *)0)->m)
#endif

void dmon_msg_handler(const char *msg_buffer, int msg_size)
{
	int msg_swap;				/* 1 means byte swap message */
	lbm_uint16_t msg_type;		/* swabbed message type */
	lbm_uint16_t msg_length;	/* swabbed message length */
	lbm_uint16_t msg_version;	/* swabbed message version */
	lbm_uint32_t msg_tv_sec;	/* swabbed message timeval seconds */
	lbm_uint32_t msg_tv_usec;	/* swabbed message timeval microseconds */
	char time_buff_sent[100];
	char time_buff_rcvd[100];
	struct timeval sent_tv;
	time_t now = time(0);
	umestore_dmon_msg_hdr_t *msg_hdr;
	char *aligned_msg_buffer = malloc(msg_size + 16);
	memcpy(aligned_msg_buffer, msg_buffer, msg_size);
	msg_hdr = (umestore_dmon_msg_hdr_t *)aligned_msg_buffer;
	strftime(time_buff_rcvd, 100, "%Y-%m-%d %H:%M:%S", localtime(&now));
	printf("%s Received ", time_buff_rcvd);
	if (msg_size < UMESTORE_DMON_MSG_HDR_T_SZ) {
		printf("undersized message: %d\n!", msg_size);
		free(aligned_msg_buffer);
		return;
	}
	if (msg_hdr->magic != LBM_UMESTORE_DMON_MAGIC && msg_hdr->magic != LBM_UMESTORE_DMON_ANTIMAGIC) {
		printf("message with bad magic: 0x%x\n!", msg_hdr->magic);
		free(aligned_msg_buffer);
		return;
	}
	msg_swap = (msg_hdr->magic != LBM_UMESTORE_DMON_MAGIC);
	msg_type = COND_SWAP16(msg_swap, msg_hdr->type);
	msg_length = COND_SWAP16(msg_swap, msg_hdr->length);
	msg_version = COND_SWAP16(msg_swap, msg_hdr->version);
	msg_tv_sec = COND_SWAP32(msg_swap, msg_hdr->tv_sec);
	msg_tv_usec = COND_SWAP32(msg_swap, msg_hdr->tv_usec);
	sent_tv.tv_sec = msg_tv_sec;
	sent_tv.tv_usec = msg_tv_usec;
	if (format_timeval(&sent_tv, time_buff_sent, sizeof(time_buff_sent)) <= 0) {
		strcpy(time_buff_sent, "unknown");
	}

	switch (msg_type) {
	case LBM_UMESTORE_DMON_MPG_SMART_HEAP_STATS:
	{
		umestore_smart_heap_dmon_stat_msg_t *msg = (umestore_smart_heap_dmon_stat_msg_t *)aligned_msg_buffer;
		if (msg_length < UMESTORE_SMART_HEAP_DMON_STAT_MSG_T_MIN_SZ) {
			printf("undersized LBM_UMESTORE_DMON_MPG_SMART_HEAP_STATS message: %d\n", msg_size);
		} else {
			printf("LBM_UMESTORE_DMON_MPG_SMART_HEAP_STATS Version: %d, Sent: %s\n", msg_version, time_buff_sent);
			printf("                      Store daemon version: %s\n", msg->umestored_version_buffer);
			printf("                         SmartHeap version: %d.%d.%d\n", COND_SWAP16(msg_swap, msg->mem_major_version), COND_SWAP16(msg_swap, msg->mem_minor_version), COND_SWAP16(msg_swap, msg->mem_update_version));
			printf("                      Memory usage (bytes): 0x%016"PRIx64"\n", COND_SWAP64(msg_swap, msg->poolsize));
			printf("                   Active allocation count: 0x%016"PRIx64"\n", COND_SWAP64(msg_swap, msg->poolcount));
			printf("                  Small block size (bytes): 0x%08X\n", COND_SWAP32(msg_swap, msg->smallBlockSize));
			printf("                         Page size (bytes): 0x%08X\n\n", COND_SWAP32(msg_swap, msg->pageSize));
		}
		break;
	}
	case LBM_UMESTORE_DMON_MPG_STORE_STATS:
	{
		umestore_store_dmon_stat_msg_t *msg = (umestore_store_dmon_stat_msg_t *)aligned_msg_buffer;
		if (msg_length < UMESTORE_STORE_DMON_STAT_MSG_T_SZ) {
			printf("undersized LBM_UMESTORE_DMON_MPG_STORE_STATS message: %d\n", msg_size);
		} else {
			printf("LBM_UMESTORE_DMON_MPG_STORE_STATS Version: %d, Sent: %s\n", msg_version, time_buff_sent);
			printf("                               Store index: 0x%04X\n", COND_SWAP16(msg_swap, msg->store_idx));
			printf("  UME retransmission request receive count: 0x%08X\n", COND_SWAP32(msg_swap, msg->ume_retx_req_rcv_count));
			printf(" UME retransmission request serviced count: 0x%08X\n", COND_SWAP32(msg_swap, msg->ume_retx_req_serviced_count));
			printf("     UME retransmission request drop count: 0x%08X\n", COND_SWAP32(msg_swap, msg->ume_retx_req_drop_count));
			printf("    UME retransmission statistics interval: 0x%08X\n", COND_SWAP32(msg_swap, msg->ume_retx_stat_interval));
			printf("  UME retransmission request total dropped: 0x%08X\n\n", COND_SWAP32(msg_swap, msg->ume_retx_req_total_dropped));
		}
		break;
	}
	case LBM_UMESTORE_DMON_MPG_REPO_STATS:
	{
		umestore_repo_dmon_stat_msg_t *msg = (umestore_repo_dmon_stat_msg_t *)aligned_msg_buffer;
		if (msg_length < UMESTORE_REPO_DMON_STAT_MSG_T_SZ) {
			printf("undersized LBM_UMESTORE_DMON_MPG_REPO_STATS message: %d\n", msg_size);
		} else {
			printf("LBM_UMESTORE_DMON_MPG_REPO_STATS Version %d, Sent: %s\n", msg_version, time_buff_sent);
			printf("                               Store index: 0x%04X\n", COND_SWAP16(msg_swap, msg->store_idx));
			printf("                       Monitor topic index: 0x%08X\n", COND_SWAP32(msg_swap, msg->dmon_topic_idx));
			printf("                           Registration ID: 0x%08X\n", COND_SWAP32(msg_swap, msg->regid));
			printf("                                Repo flags: 0x%02X\n", msg->flags);
			printf("                          Message map size: 0x%08X\n", COND_SWAP32(msg_swap, msg->message_map_sz));
			printf("                               Memory size: 0x%08X\n", COND_SWAP32(msg_swap, msg->memory_sz));
			printf("                           RPP Memory size: 0x%08X\n", COND_SWAP32(msg_swap, msg->rpp_memory_sz));
			printf("                      Lead sequence number: 0x%08X\n", COND_SWAP32(msg_swap, msg->lead_sqn));
			printf("                      Sync sequence number: 0x%08X\n", COND_SWAP32(msg_swap, msg->sync_sqn));
			printf("             Sync complete sequence number: 0x%08X\n", COND_SWAP32(msg_swap, msg->sync_complete_sqn));
			printf("                     Trail sequence number: 0x%08X\n", COND_SWAP32(msg_swap, msg->trail_sqn));
			printf("              Memory trail sequence number: 0x%08X\n", COND_SWAP32(msg_swap, msg->mem_trail_sqn));
			printf("                Contiguous sequence number: 0x%08X\n", COND_SWAP32(msg_swap, msg->contig_sqn));
			printf("                  High ULB sequence number: 0x%08X\n", COND_SWAP32(msg_swap, msg->high_ulb_sqn));
			printf("                     Map intentional drops: 0x%08X\n", COND_SWAP32(msg_swap, msg->map_intentional_drops));
			printf("                        Unrecoverable loss: 0x%08X\n", COND_SWAP32(msg_swap, msg->uls));
			printf("                 Unrecoverable loss bursts: 0x%08X\n", COND_SWAP32(msg_swap, msg->ulbs));
			printf("                          Size limit drops: 0x%08X\n\n", COND_SWAP32(msg_swap, msg->sz_limit_drops));
		}
		break;
	}
	case LBM_UMESTORE_DMON_MPG_DISK_STATS:
	{
		umestore_disk_dmon_stat_msg_t *msg = (umestore_disk_dmon_stat_msg_t *)aligned_msg_buffer;
		if (msg_length < UMESTORE_DISK_DMON_STAT_MSG_T_SZ) {
			printf("undersized LBM_UMESTORE_DMON_MPG_DISK_STATS message: %d\n", msg_size);
		} else {
			printf("LBM_UMESTORE_DMON_MPG_DISK_STATS Version %d, Sent: %s\n", msg_version, time_buff_sent);
			printf("                               Store index: 0x%04X\n", COND_SWAP16(msg_swap, msg->store_idx));
			printf("                       Monitor topic index: 0x%08X\n", COND_SWAP32(msg_swap, msg->dmon_topic_idx));
			printf("                           Registration ID: 0x%08X\n", COND_SWAP32(msg_swap, msg->regid));
			printf("                                Max offset: 0x%016"PRIx64"\n", COND_SWAP64(msg_swap, msg->max_offset));
			printf("                    Number of I/Os pending: 0x%016"PRIx64"\n", COND_SWAP64(msg_swap, msg->num_ios_pending));
			printf("               Number of read I/Os pending: 0x%016"PRIx64"\n", COND_SWAP64(msg_swap, msg->num_read_ios_pending));
			printf("                                    Offset: 0x%016"PRIx64"\n", COND_SWAP64(msg_swap, msg->offset));
			printf("                              Start offset: 0x%016"PRIx64"\n\n", COND_SWAP64(msg_swap, msg->start_offset));
		}
		break;
	}
	case LBM_UMESTORE_DMON_MPG_RCV_STATS:
	{
		umestore_rcv_dmon_stat_msg_t *msg = (umestore_rcv_dmon_stat_msg_t *)aligned_msg_buffer;
		if (msg_length < UMESTORE_RCV_DMON_STAT_MSG_T_SZ) {
			printf("undersized LBM_UMESTORE_DMON_MPG_RCV_STATS message: %d\n", msg_size);
		} else {
			printf("LBM_UMESTORE_DMON_MPG_RCV_STATS Version %d, Sent: %s\n", msg_version, time_buff_sent);
			printf("                               Store index: 0x%04X\n", COND_SWAP16(msg_swap, msg->store_idx));
			printf("                       Monitor topic index: 0x%08X\n", COND_SWAP32(msg_swap, msg->dmon_topic_idx));
			printf("                           Registration ID: 0x%08X\n", COND_SWAP32(msg_swap, msg->regid));
			printf("                                     Flags: 0x%04X\n", COND_SWAP16(msg_swap, msg->flags));
			printf("                  High ack sequence number: 0x%08X\n\n", COND_SWAP32(msg_swap, msg->high_ack_sqn));
		}
		break;
	}
	case LBM_UMESTORE_DMON_MPG_STORE_CONFIG:
	{
		umestore_store_dmon_config_msg_t *msg = (umestore_store_dmon_config_msg_t *)aligned_msg_buffer;
		char *msg_p = (char *)msg;
		struct in_addr in;
		if (msg_length < UMESTORE_STORE_DMON_CONFIG_MSG_T_MIN_SZ) {
			printf("undersized LBM_UMESTORE_DMON_MPG_STORE_CONFIG message: %d\n", msg_size);
		} else {
			in.s_addr = msg->store_iface;
			printf("LBM_UMESTORE_DMON_MPG_STORE_CONFIG Version %d, Sent: %s\n", msg_version, time_buff_sent);
			printf("                               Store index: 0x%04X\n", COND_SWAP16(msg_swap, msg->store_idx));
			printf("                   Store IP address / port: %s / %d\n", inet_ntoa(in), COND_SWAP16(msg_swap, msg->store_port));
			printf("                                Store name: %s\n", msg_p + COND_SWAP16(msg_swap, msg->store_name_offset));
			printf("                      Disk cache directory: %s\n", msg_p + COND_SWAP16(msg_swap, msg->disk_cache_dir_offset));
			printf("                      Disk state directory: %s\n", msg_p + COND_SWAP16(msg_swap, msg->disk_state_dir_offset)); 
			printf("      Store retransmission processing rate: 0x%08X\n\n", COND_SWAP32(msg_swap, msg->store_max_retransmission_processing_rate));
		}
		break;
	}
	case LBM_UMESTORE_DMON_MPG_STORE_PATTERN_CONFIG:
	{
		umestore_store_pattern_dmon_config_msg_t *msg = (umestore_store_pattern_dmon_config_msg_t *)aligned_msg_buffer;
		char buf[256];
		char *msg_p = (char *)msg->pattern_buffer;
		int buf_idx, msg_cnt;
		if (msg_length < UMESTORE_STORE_PATTERN_DMON_CONFIG_MSG_T_MIN_SZ) {
			printf("undersized LBM_UMESTORE_DMON_MPG_STORE_PATTERN_CONFIG message: %d\n", msg_size);
		} else {
			msg_cnt = msg_length - offsetof(umestore_store_pattern_dmon_config_msg_t, pattern_buffer);
			for (buf_idx = 0; buf_idx < msg_cnt; buf_idx++) {
				buf[buf_idx] = msg_p[buf_idx];
			}
			buf[buf_idx] = 0;
			printf("LBM_UMESTORE_DMON_MPG_STORE_PATTERN_CONFIG Version %d, Sent: %s\n", msg_version, time_buff_sent);
			printf("                               Store index: 0x%04X\n", COND_SWAP16(msg_swap, msg->store_idx));
			printf("                              Pattern type: 0x%04X\n", COND_SWAP16(msg_swap, msg->type));
			printf("                            Pattern string: %s\n\n", buf);
		}
		break;
	}
	case LBM_UMESTORE_DMON_MPG_STORE_TOPIC_CONFIG:
	{
		umestore_topic_dmon_config_msg_t *msg = (umestore_topic_dmon_config_msg_t *)aligned_msg_buffer;
		char buf[256];
		char *msg_p = (char *)msg->topic_name;
		int buf_idx, msg_cnt;
		if (msg_length < UMESTORE_TOPIC_DMON_CONFIG_MSG_T_MIN_SZ) {
			printf("undersized LBM_UMESTORE_DMON_MPG_STORE_TOPIC_CONFIG message: %d\n", msg_size);
		} else {
			msg_cnt = msg_length - offsetof(umestore_topic_dmon_config_msg_t, topic_name);
			for (buf_idx = 0; buf_idx < msg_cnt; buf_idx++) {
				buf[buf_idx] = msg_p[buf_idx];
			}
			buf[buf_idx] = 0;
			printf("LBM_UMESTORE_DMON_MPG_STORE_TOPIC_CONFIG Version %d, Sent: %s\n", msg_version, time_buff_sent);
			printf("                               Store index: 0x%04X\n", COND_SWAP16(msg_swap, msg->store_idx));
			printf("                       Monitor topic index: 0x%08X\n", COND_SWAP32(msg_swap, msg->dmon_topic_idx));
			printf("                                Topic name: %s\n\n", buf);
		}
		break;
	}
	case LBM_UMESTORE_DMON_MPG_REPO_CONFIG:
	{
		umestore_repo_dmon_config_msg_t *msg = (umestore_repo_dmon_config_msg_t *)aligned_msg_buffer;
		if (msg_length < UMESTORE_REPO_DMON_CONFIG_MSG_T_SZ) {
			printf("undersized LBM_UMESTORE_DMON_MPG_REPO_CONFIG message: %d\n", msg_size);
		}
		else {
			printf("LBM_UMESTORE_DMON_MPG_REPO_CONFIG Version %d, Sent: %s\n", msg_version, time_buff_sent);
			printf("                               Store index: 0x%04X\n", COND_SWAP16(msg_swap, msg->store_idx));
			printf("                       Monitor topic index: 0x%08X\n", COND_SWAP32(msg_swap, msg->dmon_topic_idx));
			printf("                           Registration ID: 0x%08X\n", COND_SWAP32(msg_swap, msg->regid));
			printf("                                Session ID: 0x%016"PRIx64"\n", COND_SWAP64(msg_swap, msg->sid));
			printf("                                Store type: 0x%02X\n", msg->type);
			printf("                            Size threshold: 0x%08X\n", COND_SWAP32(msg_swap, msg->sz_threshold));
			printf("                                Size limit: 0x%08X\n", COND_SWAP32(msg_swap, msg->sz_limit));
			printf("                             Age threshold: 0x%08X\n", COND_SWAP32(msg_swap, msg->age_threshold));
			printf("                     Disk max write AIOCBS: 0x%08X\n", COND_SWAP32(msg_swap, msg->disk_max_write_aiocbs));
			printf("                      Disk max read AIOCBS: 0x%08X\n", COND_SWAP32(msg_swap, msg->disk_max_read_aiocbs));
			printf("                           Disk size limit: 0x%016"PRIx64"\n", COND_SWAP64(msg_swap, msg->disk_sz_limit));
			printf("                    DISK AIO buffer length: 0x%08X\n", COND_SWAP32(msg_swap, msg->disk_aio_buffer_len));
			printf("                    Allow ack on reception: 0x%02X\n", msg->allow_ack_on_reception);
			printf("                               Write delay: 0x%08X\n", COND_SWAP32(msg_swap, msg->write_delay));
			printf("                  Source flight size bytes: 0x%016"PRIx64"\n\n", COND_SWAP64(msg_swap, msg->src_flightsz_bytes));
		}
		break;
	}
	case LBM_UMESTORE_DMON_MPG_RCV_CONFIG:
	{
		umestore_rcv_dmon_config_msg_t *msg = (umestore_rcv_dmon_config_msg_t *)aligned_msg_buffer;
		struct in_addr in;
		if (msg_length < UMESTORE_RCV_DMON_CONFIG_MSG_T_SZ) {
			printf("undersized LBM_UMESTORE_DMON_MPG_RCV_CONFIG message: %d\n", msg_size);
		} else {
			in.s_addr = msg->sin_addr;
			printf("LBM_UMESTORE_DMON_MPG_RCV_CONFIG Version %d, Sent: %s\n", msg_version, time_buff_sent);
			printf("                               Store index: 0x%04X\n", COND_SWAP16(msg_swap, msg->store_idx));
			printf("                       Monitor topic index: 0x%08X\n", COND_SWAP32(msg_swap, msg->dmon_topic_idx));
			printf("                           Registration ID: 0x%08X\n", COND_SWAP32(msg_swap, msg->regid));
			printf("                                Session ID: 0x%016"PRIx64"\n", COND_SWAP64(msg_swap, msg->sid));
			printf("                                 Domain ID: 0x%08X\n", COND_SWAP32(msg_swap, msg->domain_id));
			printf("                           Transport index: 0x%08X\n", COND_SWAP32(msg_swap, msg->transport_idx));
			printf("                               Topic index: 0x%08X\n", COND_SWAP32(msg_swap, msg->topic_idx));
			printf("                         IP address / port: %s / %d\n\n", inet_ntoa(in), COND_SWAP16(msg_swap, msg->sin_port));
		}
		break;
	}
	default:
		printf("unknown message type 0x%x\n", msg_hdr->type);
		break;
	}
	free(aligned_msg_buffer);
}

/* Received message handler (passed into lbm_rcv_create()) */
int rcv_handle_msg(lbm_rcv_t *rcv, lbm_msg_t *msg, void *clientd)
{
	struct Options *opts = &options;

	if (close_recv)
		return 0; /* skip any new messages if we're just waiting to exit */

	switch (msg->type) {
	case LBM_MSG_DATA:
		dmon_msg_handler(msg->data, msg->len);
		if (opts->verbose)
		{
			if (msg->hr_timestamp.tv_sec != 0) {
				printf("HR[@%ld.%09ld]", (long int)msg->hr_timestamp.tv_sec, (long int)msg->hr_timestamp.tv_nsec);
			}
			else {
				printf("[@%ld.%06ld]", (long int)msg->tsp.tv_sec, (long int)msg->tsp.tv_usec);
			}
			printf("[%s][%s][%u]%s%s%s%s, %lu bytes\n",
				msg->topic_name, msg->source, msg->sequence_number,
				((msg->flags & LBM_MSG_FLAG_RETRANSMIT) ? "-RX-" : ""),
				((msg->flags & LBM_MSG_FLAG_HF_DUPLICATE) ? "-HFDUP-" : ""),
				((msg->flags & LBM_MSG_FLAG_HF_PASS_THROUGH) ? "-PASS-" : ""),
				((msg->flags & LBM_MSG_FLAG_OTR) ? "-OTR-" : ""),
				(unsigned long)msg->len);

			if (opts->verbose > 1)
				dump(msg->data, msg->len);
		}
		break;
	case LBM_MSG_UNRECOVERABLE_LOSS:
		if (opts->verbose) {
			printf("[%s][%s][%u], LOST\n",
				msg->topic_name, msg->source, msg->sequence_number);
		}
		break;
	case LBM_MSG_UNRECOVERABLE_LOSS_BURST:
		if (opts->verbose) {
			printf("[%s][%s][%u], LOSS BURST\n",
				msg->topic_name, msg->source, msg->sequence_number);
		}
		break;
	case LBM_MSG_REQUEST:
		/* Request message received (no response processed here) */
		if (opts->verbose) {
			printf("[%s][%s][%u], Request\n",
				msg->topic_name, msg->source, msg->sequence_number);
		}
		break;
	case LBM_MSG_BOS:
		printf("[%s][%s], Beginning of Transport Session\n", msg->topic_name, msg->source);
		break;
	case LBM_MSG_EOS:
		printf("[%s][%s], End of Transport Session\n", msg->topic_name, msg->source);
		/* When verifying sequence numbers, multiple sources or EOS and new sources will cause
		* the verification to fail as we don't track the numbers on a per source basis.
		*/
		if (opts->end_on_end)
			close_recv = 1;
		break;
	case LBM_MSG_NO_SOURCE_NOTIFICATION:
		printf("[%s], no sources found for topic\n", msg->topic_name);
		break;
	default:
		printf( "Unhandled receiver event [%d] from source [%s] with topic [%s]. Refer to https://ultramessaging.github.io/currdoc/doc/example/index.html#unhandledcevents for a detailed description.\n", msg->type, msg->source, msg->topic_name);
		break;
	}
	/* LBM automatically deletes the lbm_msg_t object unless we retain it. */
	return 0;
}

void process_cmdline(int argc, char **argv, struct Options *opts)
{
	int c, errflag = 0;

	memset(opts, 0, sizeof(*opts));

	while ((c = getopt_long(argc, argv, OptionString, OptionTable, NULL)) != EOF) {
		switch (c) {
		case 'c':
			/* Initialize configuration parameters from a file. */
			if (lbm_config(optarg) == LBM_FAILURE) {
				fprintf(stderr, "lbm_config: %s\n", lbm_errmsg());
				exit(1);
			}
			break;
		case 'E':
			opts->end_on_end = 1;
			break;
		case 'h':
			fprintf(stderr, "%s\n%s\n%s\n%s",
				argv[0], lbm_version(), purpose, usage);
			exit(0);
		case 'v':
			opts->verbose++;
			verbose = 1;
			break;
		default:
			errflag++;
			break;
		}
	}

	if (errflag || (optind == argc)) {
		/* An error occurred processing the command line - dump the LBM version, usage and exit */
		fprintf(stderr, "%s\n%s\n%s", argv[0], lbm_version(), usage);
		exit(1);
	}

	opts->topic = argv[optind];
}

int main(int argc, char **argv)
{
	struct Options *opts = &options;
	lbm_context_attr_t * ctx_attr;	/* ptr to attributes for creating context */
	lbm_topic_t *topic;				/* ptr to topic info structure for creating receiver */
	lbm_rcv_t *rcv;					/* ptr to a LBM receiver object */
	size_t optlen;					/* to be set to length of retrieved data in LBM getopt calls */

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

	/* Process command line options */
	process_cmdline(argc, argv, opts);

	/* Initialize logging callback */
	if (lbm_log(lbm_log_msg, NULL) == LBM_FAILURE) {
		fprintf(stderr, "lbm_log: %s\n", lbm_errmsg());
		exit(1);
	}

	/* Retrieve default / configuration-modified context settings */
	if (lbm_context_attr_create(&ctx_attr) == LBM_FAILURE) {
		fprintf(stderr, "lbm_context_attr_create: %s\n", lbm_errmsg());
		exit(1);
	}
	{
		/*
		* Since we are manually validating attributes, retrieve any XML configuration
		* attributes set for this context.
		*/
		char ctx_name[256];
		size_t ctx_name_len = sizeof(ctx_name);
		if (lbm_context_attr_str_getopt(ctx_attr, "context_name", ctx_name, &ctx_name_len) == LBM_FAILURE) {
			fprintf(stderr, "lbm_context_attr_str_getopt - context_name: %s\n", lbm_errmsg());
			exit(1);
		}
		if (lbm_context_attr_set_from_xml(ctx_attr, ctx_name) == LBM_FAILURE) {
			fprintf(stderr, "lbm_context_attr_set_from_xml - context_name: %s\n", lbm_errmsg());
			exit(1);
		}
	}
	/*
	* Check if operational mode is set to "sequential" meaning that all
	* LBM processing will be done on this thread rather than on a separate
	* thread (see while loop below).
	*/
	optlen = sizeof(opmode);
	if (lbm_context_attr_getopt(ctx_attr, "operational_mode", &opmode, &optlen) == LBM_FAILURE) {
		fprintf(stderr, "lbm_context_attr_getopt - operational mode: %s\n", lbm_errmsg());
		exit(1);
	}

	/* Create LBM context according to given attribute structure */
	if (lbm_context_create(&ctx, ctx_attr, NULL, NULL) == LBM_FAILURE) {
		fprintf(stderr, "lbm_context_create: %s\n", lbm_errmsg());
		exit(1);
	}
	lbm_context_attr_delete(ctx_attr); /* attributes can be discarded after context creation */

	/* Look up desired topic */
	if (lbm_rcv_topic_lookup(&topic, ctx, opts->topic, NULL) == LBM_FAILURE) {
		fprintf(stderr, "lbm_rcv_topic_lookup: %s\n", lbm_errmsg());
		exit(1);
	}

	/* Create receiver */
	if (lbm_rcv_create(&rcv, ctx, topic, rcv_handle_msg, NULL, NULL) == LBM_FAILURE) {
		fprintf(stderr, "lbm_rcv_create: %s\n", lbm_errmsg());
		exit(1);
	}

	while (1) {
		/*
		* Just sleep for 1 second. LBM processing is
		* done in its own thread.
		*/
		SLEEP_SEC(1);
		/* Check if we should exit */
		if (close_recv) {
			break;
		}
	}

	SLEEP_SEC(5);

	/* Clean up LBM objects */
	lbm_rcv_delete(rcv);
	lbm_context_delete(ctx);
	return 0;
}

