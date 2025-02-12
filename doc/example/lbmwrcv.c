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
#include "replgetopt.h"
#include <lbm/lbm.h>
#include <lbm/lbmmon.h>
#include "monmodopts.h"
#include "lbm-example-util.h"

#if defined(_WIN32)
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

/* Lines starting with double quote are extracted for UM documentation. */

const char purpose[] = "Purpose: "
"application that receives messages from a wildcard receiver."
;

const char usage[] =
"Usage: lbmwrcv [options] pattern\n"
"Available options:\n"
"  -c, --config=FILE     Use LBM configuration file FILE.\n"
"                        Multiple config files are allowed.\n"
"                        Example:  '-c file1.cfg -c file2.cfg'\n"
"  -D, --deregister      Send Deregistration after receiving 1000 messages\n"
"  -E, --exit            exit after source ends\n"
"  -h, --help            display this help and exit\n"
"  -q                    Use event queue\n"
"  -r NUM                delete receiver after NUM messages\n"
"  -N, --channel=NUM     subscribe to channel NUM\n"
"  -s, --statistics      print statistics along with bandwidth\n"
"  -v, --verbose         be verbose about incoming messages (-v -v = be even more verbose)\n"
MONOPTS_COMMON
MONMODULEOPTS_SENDER;

const char * OptionString = "c:DEhqr:N:sv";
#define OPTION_MONITOR_CTX 1
#define OPTION_MONITOR_TRANSPORT 2
#define OPTION_MONITOR_TRANSPORT_OPTS 3
#define OPTION_MONITOR_FORMAT 4
#define OPTION_MONITOR_FORMAT_OPTS 5
#define OPTION_MONITOR_APPID 6
const struct option OptionTable[] =
{
	{ "config", required_argument, NULL, 'c' },
	{ "deregister", no_argument, NULL, 'D' },
	{ "exit", no_argument, NULL, 'E' },
	{ "help", no_argument, NULL, 'h' },
	{ "statistics", no_argument, NULL, 's' },
	{ "verbose", no_argument, NULL, 'v' },
	{ "channel", required_argument, NULL, 'N' },
	{ "monitor-ctx", required_argument, NULL, OPTION_MONITOR_CTX },
	{ "monitor-transport", required_argument, NULL, OPTION_MONITOR_TRANSPORT },
	{ "monitor-transport-opts", required_argument, NULL, OPTION_MONITOR_TRANSPORT_OPTS },
	{ "monitor-format", required_argument, NULL, OPTION_MONITOR_FORMAT },
	{ "monitor-format-opts", required_argument, NULL, OPTION_MONITOR_FORMAT_OPTS },
	{ "monitor-appid", required_argument, NULL, OPTION_MONITOR_APPID },
	{ NULL, 0, NULL, 0 }
};

#define DEFAULT_MAX_NUM_SRCS 10000
#define DEFAULT_NUM_SRCS 10

	lbm_wildcard_rcv_t *wrcv;
int msg_count = 0;
int rx_msg_count = 0;
int otr_msg_count = 0;
int total_msg_count = 0;
int subtotal_msg_count = 0;
int byte_count = 0;
int unrec_count = 0;
int total_unrec_count = 0;
int burst_loss = 0;
int total_burst_loss = 0;
int verbose = 0;
int pstats = 0;
int reap_msgs = 0;
int end_on_end = 0;
int close_recv = 0;
lbm_ulong_t lost = 0, last_lost = 0;
int nstats = DEFAULT_NUM_SRCS;
int dereg = 0;

/*
 * For the elapsed time, calculate and print the msgs/sec, bits/sec, and
 * loss stats
 */
void print_bw(FILE *fp, struct timeval *tv, unsigned int msgs, unsigned int bytes, int unrec, lbm_ulong_t lost, int rx_msgs, int otr_msgs)
{
	char scale[] = {' ', 'K', 'M', 'G'};
	int msg_scale_index = 0, bit_scale_index = 0;
	double sec = 0.0, mps = 0.0, bps = 0.0;
	double kscale = 1000.0;
	
	if (tv->tv_sec == 0 && tv->tv_usec == 0) return;/* avoid div by 0 */
	sec = (double)tv->tv_sec + (double)tv->tv_usec / 1000000.0;
	mps = (double)msgs/sec;
	bps = (double)bytes*8/sec;
	
	while (mps >= kscale) {
		mps /= kscale;
		msg_scale_index++;
	}
	
	while (bps >= kscale) {
		bps /= kscale;
		bit_scale_index++;
	}

	if ((rx_msgs != 0) || (otr_msgs != 0)){
		fprintf(fp, "%-6.4g secs.  %-5.4g %cmsgs/sec.  %-5.4g %cbps [RX: %d][OTR: %d]", sec, mps, scale[msg_scale_index], bps, scale[bit_scale_index], rx_msgs, otr_msgs);
	}
	else{ 
		fprintf(fp, "%-5.4g secs.  %-5.4g %cmsgs/sec.  %-5.4g %cbps", sec, mps, scale[msg_scale_index], bps, scale[bit_scale_index]);
	}
		
	if (lost != 0 || unrec != 0 || burst_loss != 0) {
		fprintf(fp, " [%lu pkts lost, %u msgs unrecovered, %d loss bursts]", lost, unrec, burst_loss);
		burst_loss = 0;
	}
	fprintf(fp, "\n");
	fflush(fp);
}

/* Print transport statistics */
void print_stats(FILE *fp, lbm_rcv_transport_stats_t stats)
{
	switch (stats.type) {
		case LBM_TRANSPORT_STAT_TCP:
			fprintf(fp, " [%s], received %lu, LBM %lu/%lu/%lu\n",stats.source,stats.transport.tcp.bytes_rcved,
					stats.transport.tcp.lbm_msgs_rcved,
					stats.transport.tcp.lbm_msgs_no_topic_rcved,
					stats.transport.tcp.lbm_reqs_rcved);
			break;
		case LBM_TRANSPORT_STAT_LBTRM:
			{
				char stmstr[256] = "", txstr[256] = "";

				if (stats.transport.lbtrm.nak_tx_max > 0) {
					/* we usually don't use sprintf, but should be OK here for the moment. */
					sprintf(stmstr, ", nak stm %lu/%lu/%lu",
							stats.transport.lbtrm.nak_stm_min, stats.transport.lbtrm.nak_stm_mean,
							stats.transport.lbtrm.nak_stm_max);
					sprintf(txstr, ", nak tx %lu/%lu/%lu",
							stats.transport.lbtrm.nak_tx_min, stats.transport.lbtrm.nak_tx_mean,
							stats.transport.lbtrm.nak_tx_max);
				}
				fprintf(fp, " [%s], received %lu/%lu, dups %lu, loss %lu, naks %lu/%lu, ncfs %lu-%lu-%lu-%lu, unrec %lu/%lu%s%s\n",
						stats.source,
						stats.transport.lbtrm.msgs_rcved, stats.transport.lbtrm.bytes_rcved,
						stats.transport.lbtrm.duplicate_data,
						stats.transport.lbtrm.lost,
						stats.transport.lbtrm.naks_sent, stats.transport.lbtrm.nak_pckts_sent,
						stats.transport.lbtrm.ncfs_ignored, stats.transport.lbtrm.ncfs_shed,
						stats.transport.lbtrm.ncfs_rx_delay, stats.transport.lbtrm.ncfs_unknown,
						stats.transport.lbtrm.unrecovered_txw,
						stats.transport.lbtrm.unrecovered_tmo,
						stmstr, txstr);
			}
			break;
		case LBM_TRANSPORT_STAT_LBTRU:
			{
				char stmstr[256] = "", txstr[256] = "";

				if (stats.transport.lbtru.nak_tx_max > 0) {
					/* we usually don't use sprintf, but should be OK here for the moment. */
					sprintf(stmstr, ", nak stm %lu/%lu/%lu",
							stats.transport.lbtru.nak_stm_min, stats.transport.lbtru.nak_stm_mean,
							stats.transport.lbtru.nak_stm_max);
					sprintf(txstr, ", nak tx %lu/%lu/%lu",
							stats.transport.lbtru.nak_tx_min, stats.transport.lbtru.nak_tx_mean,
							stats.transport.lbtru.nak_tx_max);
				}
				fprintf(fp, " [%s], LBM %lu/%lu/%lu, received %lu/%lu, dups %lu, loss %lu, naks %lu/%lu, ncfs %lu-%lu-%lu-%lu, unrec %lu/%lu%s%s\n",
						stats.source,
						stats.transport.lbtru.lbm_msgs_rcved,
						stats.transport.lbtru.lbm_msgs_no_topic_rcved,
						stats.transport.lbtru.lbm_reqs_rcved,
						stats.transport.lbtru.msgs_rcved, stats.transport.lbtru.bytes_rcved,
						stats.transport.lbtru.duplicate_data,
						stats.transport.lbtru.lost,
						stats.transport.lbtru.naks_sent, stats.transport.lbtru.nak_pckts_sent,
						stats.transport.lbtru.ncfs_ignored, stats.transport.lbtru.ncfs_shed,
						stats.transport.lbtru.ncfs_rx_delay, stats.transport.lbtru.ncfs_unknown,
						stats.transport.lbtru.unrecovered_txw,
						stats.transport.lbtru.unrecovered_tmo,
						stmstr, txstr);
			}
			break;
		case LBM_TRANSPORT_STAT_LBTIPC:
			{
				fprintf(fp, " [%s] Received %lu msgs/%lu bytes. "
						"%lu LBM msgs, %lu no topics, %lu requests.\n",
						stats.source,
						stats.transport.lbtipc.msgs_rcved,
						stats.transport.lbtipc.bytes_rcved,
						stats.transport.lbtipc.lbm_msgs_rcved,
						stats.transport.lbtipc.lbm_msgs_no_topic_rcved,
						stats.transport.lbtipc.lbm_reqs_rcved);
			}
			break;
		case LBM_TRANSPORT_STAT_LBTSMX:
			{
				fprintf(fp, " [%s] Received %lu msgs/%lu bytes. "
						"%lu LBM msgs, %lu no topics.\n",
						stats.source,
						stats.transport.lbtsmx.msgs_rcved,
						stats.transport.lbtsmx.bytes_rcved,
						stats.transport.lbtsmx.lbm_msgs_rcved,
						stats.transport.lbtsmx.lbm_msgs_no_topic_rcved);
			}
			break;
		case LBM_TRANSPORT_STAT_LBTRDMA:
			{
				fprintf(fp, " [%s] Received %lu msgs/%lu bytes. "
						"%lu LBM msgs, %lu no topics, %lu requests.\n",
						stats.source,
						stats.transport.lbtrdma.msgs_rcved,
						stats.transport.lbtrdma.bytes_rcved,
						stats.transport.lbtrdma.lbm_msgs_rcved,
						stats.transport.lbtrdma.lbm_msgs_no_topic_rcved,
						stats.transport.lbtrdma.lbm_reqs_rcved);
			}
			break;
		default:
			break;
	}
	fflush(fp);
}

/* Utility to print the contents of a buffer in hex/ASCII format */
void dump(const char *buffer, int size)
{
	int i,j;
	unsigned char c;
	char textver[20];

	for (i=0;i<(size >> 4);i++) {
		for (j=0;j<16;j++) {
			c = buffer[(i << 4)+j];
			printf("%02x ",c);
			textver[j] = ((c<0x20)||(c>0x7e))?'.':c;
		}
		textver[j] = 0;
		printf("\t%s\n",textver);
	}
	for (i=0;i<size%16;i++) {
		c = buffer[size-size%16+i];
		printf("%02x ",c);
		textver[i] = ((c<0x20)||(c>0x7e))?'.':c;
	}
	for (i=size%16;i<16;i++) {
		printf("   ");
		textver[i] = ' ';
	}
	textver[i] = 0;
	printf("\t%s\n",textver);
}

/* Logging handler passed into lbm_log() */
int lbm_log_msg(int level, const char *message, void *clientd)
{
	printf("LOG Level %d: %s\n", level, message);
	return 0;
}

/*
 * Handler for immediate messages directed to NULL topic
 * (passed into lbm_context_rcv_immediate_msgs()
 */
int rcv_handle_immediate_msg(lbm_context_t *ctx, lbm_msg_t *msg, void *clientd)
{
	switch (msg->type) {
	case LBM_MSG_DATA:
		/* Data message received */
		msg_count++;
		total_msg_count++;
		subtotal_msg_count++;
		byte_count += msg->len;
		if (verbose) {
			printf("IM [%s][%u], %u bytes\n",
				   msg->source, (unsigned) msg->sequence_number, (unsigned) msg->len);
			if (verbose > 1)
				dump(msg->data, msg->len);
		}
		break;
	case LBM_MSG_REQUEST:
		/* Request message received (no response processed here) */
		msg_count++;
		total_msg_count++;
		subtotal_msg_count++;
		byte_count += msg->len;
		if (verbose) {
			printf("IM Request [%s][%u], %u bytes\n",
				   msg->source, (unsigned) msg->sequence_number, (unsigned) msg->len);
			if (verbose > 1)
				dump(msg->data, msg->len);
		}
		break;
	default:
		printf( "Unhandled receiver event [%d] for immediate_msg from source [%s]. Refer to https://ultramessaging.github.io/currdoc/doc/example/index.html#unhandledcevents for a detailed description.\n", msg->type, msg->source);
		break;
	}
	/* LBM automatically deletes the lbm_msg_t object unless we retain it. */
	return 0;
}

/* Received message handler (passed into lbm_wildcard_rcv_create()) */
int rcv_handle_msg(lbm_rcv_t *rcv, lbm_msg_t *msg, void *clientd)
{
	/* sqn is large enough to hold a regular sequence number or any HF sequence number */
	lbm_uint64_t sqn = (lbm_uint64_t)msg->sequence_number; 
	/* If the message has a hot failover sequence number, save it */
	if (msg->flags & LBM_MSG_FLAG_HF_64) {
		sqn = msg->hf_sequence_number.u64;
	}
	else if (msg->flags & LBM_MSG_FLAG_HF_32) {
		sqn = (lbm_uint64_t)msg->hf_sequence_number.u32;
	}

	switch (msg->type) {
	case LBM_MSG_DATA:
		/* Data message received */
		msg_count++;
		total_msg_count++;
		subtotal_msg_count++;
		byte_count += msg->len;

		if (msg->flags & LBM_MSG_FLAG_RETRANSMIT)
		{
			rx_msg_count++;
		}
		if (msg->flags & LBM_MSG_FLAG_OTR)
		{
			otr_msg_count++;
		}
		if ( dereg == 1)
		{
			if (total_msg_count == 1000) 
			{
				lbm_wrcv_ume_deregister(wrcv);
				dereg = 0;
			}
		}

		if (verbose) {
			if(msg->channel_info != NULL) {
				printf("[%s:%d][%s][%"PRIu64"], %u bytes\n",
					   msg->topic_name, msg->channel_info->channel_number,
					   msg->source, sqn, (unsigned) msg->len);
			} else {
				fprintf(stdout, "[%s][%s][%"PRIu64"]%s%s%s%s%s%s%s, %lu bytes\n",
					   msg->topic_name, msg->source, sqn, 
					   ((msg->flags & LBM_MSG_FLAG_RETRANSMIT) ? "-RX" : ""),
					   ((msg->flags & LBM_MSG_FLAG_OTR) ? "-OTR" : ""),
					   ((msg->flags & LBM_MSG_FLAG_HF_64) ? "-HF64" : ""),
					   ((msg->flags & LBM_MSG_FLAG_HF_32) ? "-HF32" : ""),
					   ((msg->flags & LBM_MSG_FLAG_HF_DUPLICATE) ? "-HFDUP" : ""),
					   ((msg->flags & LBM_MSG_FLAG_HF_PASS_THROUGH) ? "-PASS" : ""),
					   ((msg->flags & LBM_MSG_FLAG_HF_OPTIONAL) ? "-HFOPT" : ""),
					   (unsigned long) msg->len);
			}
			if (verbose > 1)
				dump(msg->data, msg->len);
		}
		break;
	case LBM_MSG_UNRECOVERABLE_LOSS:
		unrec_count++;
		total_unrec_count++;
		if (verbose) {
			printf("[%s][%s][%u], LOST\n",
				   msg->topic_name, msg->source, msg->sequence_number);
		}
		break;
	case LBM_MSG_UNRECOVERABLE_LOSS_BURST:
		burst_loss++;
		total_burst_loss++;
		if (verbose) {
			printf("[%s][%s][%u], LOST BURST\n",
				   msg->topic_name, msg->source, msg->sequence_number);
		}
		break;
	case LBM_MSG_REQUEST:
		/* Request message received (no response processed here) */
		msg_count++;
		total_msg_count++;
		subtotal_msg_count++;
		byte_count += msg->len;
		if (verbose) {
			printf("[%s][%s][%u], Request\n",
				   msg->topic_name, msg->source, msg->sequence_number);
		}
		break;
	case LBM_MSG_BOS:
		if (verbose) {
			printf("[%s][%s], Beginning of Transport Session\n", msg->topic_name, msg->source);
		}
		break;
	case LBM_MSG_EOS:
		if (verbose) {
			printf("[%s][%s], End of Transport Session\n", msg->topic_name, msg->source);
		}
		subtotal_msg_count = 0;
		if (end_on_end)
			close_recv = 1;
		break;
	case LBM_MSG_NO_SOURCE_NOTIFICATION:
		printf("[%s], no sources found for topic\n", msg->topic_name);
		break;
	case LBM_MSG_HF_RESET:
		if (verbose) {
			fprintf(stdout, "[%s][%s][%"PRIu64"]%s%s%s%s-RESET\n", msg->topic_name, msg->source, sqn,
					((msg->flags & LBM_MSG_FLAG_RETRANSMIT) ? "-RX" : ""),
					((msg->flags & LBM_MSG_FLAG_OTR) ? "-OTR" : ""),
					((msg->flags & LBM_MSG_FLAG_HF_64) ? "-HF64" : ""),
					((msg->flags & LBM_MSG_FLAG_HF_32) ? "-HF32" : ""));
		}
		break;
	case LBM_MSG_UME_DEREGISTRATION_SUCCESS_EX:
		 printf("Received LBM_MSG_UME_DEREGISTRATION_SUCCESS_EX\n");
		break;

	case LBM_MSG_UME_DEREGISTRATION_COMPLETE_EX:
		{
			printf("[%s][%s] UME deregistration complete.\n",
                    msg->topic_name, msg->source);
		}
		break;
	case LBM_MSG_UME_REGISTRATION_SUCCESS_EX:
		 printf("Received LBM_MSG_UME_REGISTRATION_SUCCESS_EX\n");
		break;

	case LBM_MSG_UME_REGISTRATION_COMPLETE_EX:
		{
			printf("[%s][%s] UME REGISTRATION complete.\n",
                    msg->topic_name, msg->source);
		}
		break;

	
	default:
		printf( "Unhandled receiver event [%d] from source [%s] with topic [%s]. Refer to https://ultramessaging.github.io/currdoc/doc/example/index.html#unhandledcevents for a detailed description.\n", msg->type, msg->source, msg->topic_name);
		break;
	}
	fflush(stdout);
	/* LBM automatically deletes the lbm_msg_t object unless we retain it. */
	return 0;
}

int rcv_handle_src_notify(const char *topic_str, const char *src_str, void *clientd)
{
	if (verbose) {
		printf("new topic [%s], source [%s]\n", topic_str, src_str);
	}
	return 0;
}

int rcv_pattern_compare_asterisk_func(const char *topic_str, void *clientd)
{
	/* pattern was "*", so just return 0 for match each time */
	return 0;
}

#if !defined(_WIN32)
static int LossRate = 0;

static
void
SigHupHandler(int signo)
{
	if (LossRate >= 100)
	{
		return;
	}
	LossRate += 5;
	if (LossRate > 100)
	{
		LossRate = 100;
	}
	lbm_set_lbtrm_loss_rate(LossRate);
	lbm_set_lbtru_loss_rate(LossRate);
}

static
void
SigUsr1Handler(int signo)
{
	if (LossRate >= 100)
	{
		return;
	}
	LossRate += 10;
	if (LossRate > 100)
	{
		LossRate = 100;
	}
	lbm_set_lbtrm_loss_rate(LossRate);
	lbm_set_lbtru_loss_rate(LossRate);
}

static
void
SigUsr2Handler(int signo)
{
	LossRate = 0;
	lbm_set_lbtrm_loss_rate(LossRate);
	lbm_set_lbtru_loss_rate(LossRate);
}
#endif

int main(int argc, char **argv)
{
	lbm_context_t *ctx;
	int channel_number = -1;
	int c, errflag = 0, pattern_type = 0;
	lbm_context_attr_t * ctx_attr;
	lbm_wildcard_rcv_attr_t * wrcv_attr;
	unsigned short int request_port;
	int request_port_bound;
	size_t optlen;
	lbm_ipv4_address_mask_t unicast_target_iface;
	struct in_addr inaddr;
	lbm_src_notify_func_t src_notify;
	lbm_rcv_transport_stats_t * stats;
	lbmmon_sctl_t * monctl;
	int monitor_context = 0;
	int monitor_context_ivl = 0;
	char * transport_options = NULL;
	char transport_options_string[1024];
	char * format_options = NULL;
	char format_options_string[1024];
	char * application_id = NULL;
	char application_id_string[1024];
	const lbmmon_transport_func_t * transport = lbmmon_transport_lbm_module();
	const lbmmon_format_func_t * format = lbmmon_format_csv_module();
	lbm_event_queue_t *evq = NULL;
	int eventq = 0;
	int nstat;
	int have_stats, set_nstats;
	lbm_ulong_t lost_tmp;

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
#else
	/*
	 * Ignore SIGPIPE on UNIXes which can occur when writing to a socket
	 * with only one open end point.
	 */
	signal(SIGPIPE, SIG_IGN);
#endif /* _WIN32 */

	memset((void *) transport_options_string, 0, sizeof(transport_options_string));
	memset((void *) format_options_string, 0, sizeof(format_options_string));
	memset((void *) application_id_string, 0, sizeof(application_id_string));
	while ((c = getopt_long(argc, argv, OptionString, OptionTable, NULL)) != EOF)
	{
		switch (c)
		{
			case 'c':
				/* Initialize configuration parameters from a file. */
				if (lbm_config(optarg) == LBM_FAILURE) {
					fprintf(stderr, "lbm_config: %s\n", lbm_errmsg());
					exit(1);
				}
				break;
			case 'D':
				dereg = 1;
				break;
			case 'E':
				end_on_end++;
				break;
			case 'h':
				fprintf(stderr, "%s\n%s\n%s\n%s",
					argv[0], lbm_version(), purpose, usage);
				exit(0);
			case 'r':
				reap_msgs = atoi(optarg);
				break;
			case 'N':
				channel_number = atoi(optarg);
				break;
			case 'q':
				eventq = 1;
				break;
			case 's':
				pstats++;
				break;
			case 'v':
				verbose++;
				break;
			case OPTION_MONITOR_CTX:
				monitor_context = 1;
				monitor_context_ivl = atoi(optarg);
				break;
			case OPTION_MONITOR_TRANSPORT:
				if (optarg != NULL)
				{
					if (strcasecmp(optarg, "lbm") == 0)
					{
						transport = lbmmon_transport_lbm_module();
					}
					else if (strcasecmp(optarg, "udp") == 0)
					{
						transport = lbmmon_transport_udp_module();
					}
					else if (strcasecmp(optarg, "lbmsnmp") == 0)
					{
						transport = lbmmon_transport_lbmsnmp_module();
					}
					else
					{
						++errflag;
					}
				}
				else
				{
					++errflag;
				}
				break;
			case OPTION_MONITOR_TRANSPORT_OPTS:
				if (optarg != NULL)
				{
					strncpy(transport_options_string, optarg, sizeof(transport_options_string));
				}
				else
				{
					++errflag;
				}
				break;
			case OPTION_MONITOR_FORMAT:
				if (optarg != NULL)
				{
					if (strcasecmp(optarg, "csv") == 0)
					{
						format = lbmmon_format_csv_module();
					}
					else if (strcasecmp(optarg, "pb") == 0)
					{
						format = lbmmon_format_pb_module();
					}
					else
					{
						++errflag;
					}
				}
				else
				{
					++errflag;
				}
				break;
			case OPTION_MONITOR_FORMAT_OPTS:
				if (optarg != NULL)
				{
					strncpy(format_options_string, optarg, sizeof(format_options_string));
				}
				else
				{
					++errflag;
				}
				break;
			case OPTION_MONITOR_APPID:
				if (optarg != NULL)
				{
					strncpy(application_id_string, optarg, sizeof(application_id_string));
				}
				else
				{
					++errflag;
				}
				break;
			default:
				errflag++;
				break;
		}
	}
	if ((errflag != 0) || (optind == argc))
	{
		fprintf(stderr, "%s\n%s\n%s",
			argv[0], lbm_version(), usage);
		exit(1);
	}

	stats = (lbm_rcv_transport_stats_t *)malloc(nstats * sizeof(lbm_rcv_transport_stats_t));
	if (stats == NULL)
	{
		fprintf(stderr, "can't allocate statistics array\n");
		exit(1);
	}

	/* Initialize logging callback */
	if (lbm_log(lbm_log_msg, NULL) == LBM_FAILURE) {
		fprintf(stderr, "lbm_log: %s\n", lbm_errmsg());
		exit(1);
	}

	if(eventq) {
		printf("Using Event Queue\n");
		if (lbm_event_queue_create(&evq, NULL, NULL, NULL) == LBM_FAILURE) {
			fprintf(stderr, "lbm_event_queue_create: %s\n", lbm_errmsg());
			exit(1);
		}
	}
	/* Retrieve current context settings */
	if (lbm_context_attr_create(&ctx_attr) == LBM_FAILURE) {
		fprintf(stderr, "lbm_context_attr_create: %s\n", lbm_errmsg());
		exit(1);
	}

	/* Set the callback for new source notification */
	src_notify.clientd = NULL;
	src_notify.notifyfunc = rcv_handle_src_notify;
	if (lbm_context_attr_setopt(ctx_attr, "resolver_source_notification_function", &src_notify,
								sizeof(src_notify)) == LBM_FAILURE) {
		fprintf(stderr, "lbm_context_attr_setopt: %s\n", lbm_errmsg());
		exit(1);
	}

	/* Create LBM context */
	if (lbm_context_create(&ctx, ctx_attr, NULL, NULL) == LBM_FAILURE) {
		fprintf(stderr, "lbm_context_create: %s\n", lbm_errmsg());
		exit(1);
	}
	lbm_context_attr_delete(ctx_attr);

	/*
	 * Check settings to determine the TCP target for immediate messages.
	 * It might be appropriate to communicate this back to the source
	 * as a message.
	 */
	optlen = sizeof(request_port_bound);
	if (lbm_context_getopt(ctx,
				"request_tcp_bind_request_port",
				&request_port_bound,
				&optlen) == LBM_FAILURE)
	{
		fprintf(stderr, "lbm_context_getopt(request_tcp_bind_request_port): %s\n",
				lbm_errmsg());
		exit(1);
	}
	if (request_port_bound == 1) {
		optlen = sizeof(request_port);
		if (lbm_context_getopt(ctx,
				       "request_tcp_port",
				       &request_port,
				       &optlen) == LBM_FAILURE) {
			fprintf(stderr, "lbm_context_getopt(request_tcp_port): %s\n",
					lbm_errmsg());
			exit(1);
		}
		optlen = sizeof(unicast_target_iface);
		if (lbm_context_getopt(ctx,
				       "request_tcp_interface",
				       &unicast_target_iface,
				       &optlen) == LBM_FAILURE) {
			fprintf(stderr, "lbm_context_getopt(request_tcp_interface): %s\n",
					lbm_errmsg());
			exit(1);
		}
		/* if the request_tcp_interface is INADDR_ANY, get one we know is good. */
		if(unicast_target_iface.addr == INADDR_ANY) {
			if (lbm_context_getopt(ctx,
					       "resolver_multicast_interface",
					       &unicast_target_iface,
					       &optlen) == LBM_FAILURE) {
				fprintf(stderr, "lbm_context_getopt(resolver_multicast_interface): %s\n",
						lbm_errmsg());
				exit(1);
			}
		}
		inaddr.s_addr = unicast_target_iface.addr;
		printf("Immediate messaging target: TCP:%s:%d\n", inet_ntoa(inaddr),
			   ntohs(request_port));
	} else {
		printf("Request port binding disabled, no immediate messaging target.\n");
	}
	/* Initialize immediate message handler (for topicless immediate sends) */
	if (lbm_context_rcv_immediate_msgs(ctx, rcv_handle_immediate_msg, NULL, NULL) == LBM_FAILURE) {
		fprintf(stderr, "lbm_context_rcv_immediate_msgs: %s\n", lbm_errmsg());
		exit(1);
	}

	/* Retrieve the current wildcard receiver attributes */
	if (lbm_wildcard_rcv_attr_create(&wrcv_attr) == LBM_FAILURE) {
		fprintf(stderr, "lbm_wildcard_rcv_attr_create: %s\n", lbm_errmsg());
		exit(1);
	}

#if !defined(_WIN32)
	signal(SIGHUP, SigHupHandler);
	signal(SIGUSR1, SigUsr1Handler);
	signal(SIGUSR2, SigUsr2Handler);
#endif

	/*
	 * if the pattern type is PCRE or regex, then check pattern. "*" is not a regular expression, so
	 * we make a special application handler for it that acts as you would expect it to.
	 *
	 * NOTE: This only applies to just "*". Something like ".*" is not changed, etc.
	 */
	optlen = sizeof(pattern_type);
	if (lbm_wildcard_rcv_attr_getopt(wrcv_attr,
									 "pattern_type",
									 &pattern_type,
									 &optlen) == LBM_FAILURE) {
		fprintf(stderr, "lbm_wildcard_rcv_attr_getopt(pattern_type): %s\n",
				lbm_errmsg());
		exit(1);
	}
	if ((pattern_type == LBM_WILDCARD_RCV_PATTERN_TYPE_PCRE ||
		 pattern_type == LBM_WILDCARD_RCV_PATTERN_TYPE_REGEX) &&
		strcmp(argv[optind], "*") == 0) {
		/* Create the wildcard receiver using an application callback pattern */
		lbm_wildcard_rcv_compare_func_t compfunc;

		pattern_type = LBM_WILDCARD_RCV_PATTERN_TYPE_APP_CB;

		if (lbm_wildcard_rcv_attr_setopt(wrcv_attr, "pattern_type", &pattern_type,
										 sizeof(pattern_type)) == LBM_FAILURE) {
			fprintf(stderr, "lbm_wildcard_rcv_attr_setopt(pattern_type): %s\n", lbm_errmsg());
			exit(1);
		}

		compfunc.compfunc = rcv_pattern_compare_asterisk_func;
		compfunc.clientd = NULL;

		if (lbm_wildcard_rcv_attr_setopt(wrcv_attr, "pattern_callback", &compfunc,
										 sizeof(compfunc)) == LBM_FAILURE) {
			fprintf(stderr, "lbm_wildcard_rcv_attr_setopt(pattern_callback): %s\n", lbm_errmsg());
			exit(1);
		}
		printf("Creating wildcard receiver for pattern [%s] - using callback\n", argv[optind]);
	} else {
		/* Create the wildcard receiver normally */
		char pattern_type_str[80];
		size_t pattern_type_str_len = sizeof(pattern_type_str);

		if (lbm_wildcard_rcv_attr_str_getopt(wrcv_attr, "pattern_type",
											 pattern_type_str, &pattern_type_str_len) == LBM_FAILURE) {
			fprintf(stderr, "lbm_wildcard_rcv_attr_str_getopt(pattern_type): %s\n", lbm_errmsg());
			exit(1);
		}
		printf("Creating wildcard receiver for pattern [%s] - using %s\n", argv[optind], pattern_type_str);
	}

	if (monitor_context)
	{
		if (strlen(transport_options_string) > 0)
		{
			transport_options = transport_options_string;
		}
		if (strlen(format_options_string) > 0)
		{
			format_options = format_options_string;
		}
		if (strlen(application_id_string) > 0)
		{
			application_id = application_id_string;
		}
		if (lbmmon_sctl_create(&monctl, format, format_options, transport, transport_options) == -1)
		{
			fprintf(stderr, "lbmmon_sctl_create() failed, %s\n", lbmmon_errmsg());
			exit(1);
		}
		if (lbmmon_context_monitor(monctl, ctx, application_id, monitor_context_ivl) == -1)
		{
			fprintf(stderr, "lbmmon_context_monitor() failed, %s\n", lbmmon_errmsg());
			exit(1);
		}
	}

	/* Create the wildcard receiver using the default (or configed) pattern type */
	if (lbm_wildcard_rcv_create(&wrcv, ctx, argv[optind], NULL, wrcv_attr,
								rcv_handle_msg, evq, NULL) == LBM_FAILURE) {
		fprintf(stderr, "lbm_wildcard_rcv_create: %s\n", lbm_errmsg());
		exit(1);
	}

	if(channel_number != -1)
		lbm_wildcard_rcv_subscribe_channel(wrcv, channel_number, NULL, NULL);
	lbm_wildcard_rcv_attr_delete(wrcv_attr);

	while (1) {
		struct timeval starttv, endtv;
		current_tv(&starttv);
		/*
		 * Just sleep for 1 second. LBM processing is
		 * done in its own thread.
		 */
		SLEEP_SEC(1);

		/* Retrieve receiver stats */
		have_stats = 0;
		while (!have_stats){
			set_nstats = nstats;
			if (lbm_context_retrieve_rcv_transport_stats(ctx, &set_nstats, stats) == LBM_FAILURE){
				/* Double the number of stats passed to the API to be retrieved */
				/* Do so until we retrieve stats successfully or hit the max limit */
				nstats *= 2;
				if (nstats > DEFAULT_MAX_NUM_SRCS){
					fprintf(stderr, "Cannot retrieve all stats (%s).  Maximum number of sources = %d.\n",
							lbm_errmsg(), DEFAULT_MAX_NUM_SRCS);
					exit(1);
				}
				stats = (lbm_rcv_transport_stats_t *)realloc(stats,  nstats * sizeof(lbm_rcv_transport_stats_t));
				if (stats == NULL){
					fprintf(stderr, "Cannot reallocate statistics array\n");
					exit(1);
				}
			}
			else{
				have_stats = 1;
			}
		}

		/* Get transport level loss */
		lost = 0;
		for (nstat = 0; nstat < set_nstats; nstat++)
		{
			switch (stats[nstat].type) {
			case LBM_TRANSPORT_STAT_LBTRM:
				lost += stats[nstat].transport.lbtrm.lost;
				break;
			case LBM_TRANSPORT_STAT_LBTRU:
				lost += stats[nstat].transport.lbtru.lost;
				break;
			}
		}
		lost_tmp = lost;
		if (last_lost <= lost){
			lost -= last_lost;
		}
		else{
			lost = 0;
		}
		last_lost = lost_tmp;

		current_tv(&endtv);
		endtv.tv_sec -= starttv.tv_sec;
		endtv.tv_usec -= starttv.tv_usec;
		normalize_tv(&endtv);

		print_bw(stdout, &endtv, msg_count, byte_count, unrec_count, lost, rx_msg_count, otr_msg_count);

		if (pstats){
			/* Display transport level statistics */
			for (nstat = 0; nstat < set_nstats; nstat++) {
				fprintf(stdout, "stats %u/%u:", nstat+1, set_nstats);
				print_stats(stdout, stats[nstat]);
			}
		}

		if ((reap_msgs > 0 && total_msg_count >= reap_msgs) || close_recv) {
			/*
			 * Get rid of wildcard receiver if we've received all we we
			 * wanted or if the sender has already gone away, etc.
			 */
			lbm_wildcard_rcv_delete(wrcv);
			wrcv = NULL;
		}
		msg_count = 0;
		rx_msg_count = 0;
		otr_msg_count = 0;
		byte_count = 0;
		unrec_count = 0;

		if (wrcv == NULL)
			break;
	}
	printf("Quitting.... received %u messages", total_msg_count);
	if (total_unrec_count > 0 || total_burst_loss > 0) {
		printf(", %u msgs unrecovered, %u loss bursts", total_unrec_count, total_burst_loss);
	}
	printf("\n");
	SLEEP_SEC(5);

	if (monitor_context)
	{
		if (lbmmon_context_unmonitor(monctl, ctx) == -1)
		{
			fprintf(stderr, "lbmmon_context_unmonitor() failed, %s\n", lbmmon_errmsg());
			exit(1);
		}
		if (lbmmon_sctl_destroy(monctl) == -1)
		{
			fprintf(stderr, "lbmmon_sctl_destoy() failed(), %s\n", lbmmon_errmsg());
			exit(1);
		}
	}

	/* Delete LBM context (not strictly necessary in this example) */
	lbm_context_delete(ctx);

	free(stats);

	return 0;
}

