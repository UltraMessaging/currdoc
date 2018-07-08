/*
Copyright (c) 2005-2018 Informatica Corporation  Permission is granted to licensees to use
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
#include "lbm/tnwgdmonmsgs.h"
#include <lbm/lbm.h>

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
"application that receives DRO daemon messages on the specified publishing topic."
;

const char usage[] =
"Usage: tnwgdmon [-Ehv] [-c filename] publishing_topic\n"
"Available options:\n"
"  -c, --config=FILE    Use LBM configuration file FILE.\n"
"                       Multiple config files are allowed.\n"
"                       Example:  '-c file1.cfg -c file2.cfg'\n"
"  -E, --exit           exit when source stops sending\n"
"  -h, --help           display this help and exit\n"
"  -v, --verbose        be verbose about incoming messages (-v -v = be even more verbose)\n"
;

const char * OptionString = "Ac:Ehs:v";
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
	char scale[] = { '\0', 'K', 'M', 'G' };
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

void tnwg_dmon_msg_handler(const char *buffer, int size)
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

	tnwg_dstat_msg_hdr_t *msg_hdr;
	char *aligned_msg_buffer = malloc(size + 16);
	memcpy(aligned_msg_buffer, buffer, size);
	msg_hdr = (tnwg_dstat_msg_hdr_t *)aligned_msg_buffer;

	strftime(time_buff_rcvd, 100, "%Y-%m-%d %H:%M:%S", localtime(&now));
	printf("\n%s Received ", time_buff_rcvd);
	if (size < sizeof(tnwg_dstat_msg_hdr_t)) {
		printf("undersized message: %d\n!", size);
		return;
	}
	if (msg_hdr->magic != LBM_TNWG_DAEMON_MAGIC && msg_hdr->magic != LBM_TNWG_DAEMON_ANTIMAGIC) {
		printf("message with bad magic: 0x%x\n!", msg_hdr->magic);
		return;
	}
	msg_swap = (msg_hdr->magic != LBM_TNWG_DAEMON_MAGIC);
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
	case TNWG_DSTATTYPE_MALLINFO:
	{
		tnwg_dstat_mallinfo_msg_t *mallinfo_msg;
		tnwg_mallinfo_stat_grp_record_t *record;

		mallinfo_msg = (tnwg_dstat_mallinfo_msg_t *)aligned_msg_buffer;

		record = &mallinfo_msg->record;
		if (msg_length < sizeof(tnwg_dstat_mallinfo_msg_t)) {
			printf("undersized TNWG_DSTATTYPE_MALLINFO message: %d\n", size);
			return;
		}
		printf("\n==============Malloc Info (Version: %d)==============\n%s Sent\n", msg_version, time_buff_sent);
		printf("         arena: %d\n", COND_SWAP32(msg_swap, record->arena));
		printf("       ordblks: %d\n", COND_SWAP32(msg_swap, record->ordblks));
		printf("         hblks: %d\n", COND_SWAP32(msg_swap, record->hblks));
		printf("        hblkhd: %d\n", COND_SWAP32(msg_swap, record->hblkhd));
		printf("      uordblks: %d\n", COND_SWAP32(msg_swap, record->uordblks));
		printf("      fordblks: %d\n\n", COND_SWAP32(msg_swap, record->fordblks));
		break;
	}

	case TNWG_DSTATTYPE_GATEWAYCFG:
		{
			char * cfgstart;
			cfgstart = (char *) aligned_msg_buffer+sizeof(tnwg_dstat_msg_hdr_t);
			printf("\n======TNWG_DSTATTYPE_GATEWAYCFG Version: %d======\n%s Sent\n", msg_version, time_buff_sent);
			printf("%s\n\n", cfgstart);
		}
		break;
	case TNWG_DSTATTYPE_PORTCFG:
		{
			tnwg_pcfg_stat_grp_msg_t *pcfg_msg_p;
			int num_options, numpads;
			int i,j;
			char *dptr;
			pcfg_msg_p = (tnwg_pcfg_stat_grp_msg_t *) aligned_msg_buffer;
			dptr = &pcfg_msg_p->data;

			num_options = COND_SWAP32(msg_swap, pcfg_msg_p->rechdr.num_options);
			printf("\n============%s Configuration(Version: %d)============\n%s Sent\n", pcfg_msg_p->rechdr.portal_name, msg_version, time_buff_sent);
			printf("=====================%s=====================\n", pcfg_msg_p->rechdr.attr_type);

			for(i = 0; i < num_options; i++){
				numpads = (strlen((const char*) dptr) > 50) ? 0 : (50 - strlen((const char*) dptr));
				for(j=0;j<numpads;j++) printf(" ");
				printf("%s", dptr);
				printf(": ");
				dptr += strlen((const char*) dptr) + 1;
				printf("%s\n", dptr);
				dptr += strlen((const char*) dptr) + 1;
			}
		}
		break;
	case TNWG_DSTATTYPE_RM_LOCAL:
		{
			tnwg_rm_stat_grp_msg_t * msg;
			tnwg_rm_stat_grp_local_info_t *p;
			msg = (tnwg_rm_stat_grp_msg_t *) aligned_msg_buffer;
			p = &msg->msgtype.local;
			printf("\n=================Gateway Topology Info(Version: %d)=================\n%s Sent\n", msg_version, time_buff_sent);
			printf("    Local Gateway Name: %s\n", p->gateway_name);
			printf("    Local Gateway ID: %"PRIu64"\n", COND_SWAP64(msg_swap, p->gateway_id));
			printf("    Self Version: %d\n", COND_SWAP16(msg_swap, p->self_version));
			printf("    Topology Signature: 0x%08x\n", COND_SWAP32(msg_swap, p->topology_signature));
			printf("    Last recalc duration: %u.%06u seconds\n", COND_SWAP32(msg_swap, p->recalc_duration_sec), COND_SWAP32(msg_swap, p->recalc_duration_usec));
			printf("    Graph Version: %d\n", COND_SWAP32(msg_swap, p->graph_version));
			printf("    Gateway Count: %d\n", COND_SWAP16(msg_swap, p->gateway_count));
			printf("    Topic Resolution Domain Count: %d\n", COND_SWAP16(msg_swap, p->trd_count));

		}
		break;
	case TNWG_DSTATTYPE_RM_PORTAL:
		{
			tnwg_rm_stat_grp_msg_t * msg;
			tnwg_rm_stat_grp_portal_info_t * p;
			uint32_t ptype;
			uint32_t pindex;
			msg = (tnwg_rm_stat_grp_msg_t *) aligned_msg_buffer;
			p = &msg->msgtype.portal;

			pindex = COND_SWAP32(msg_swap, p->index);
			ptype = COND_SWAP32(msg_swap, p->type);

			printf("\n....................Portal %d (%s)(Version: %d)....................\n%s Sent\n", pindex, (ptype == TNWG_DSTAT_Portal_Type_Peer) ? "Peer" : "Endpoint",msg_version,time_buff_sent);
			printf("    Portal name: %s\n", p->portal_name);
			printf("    Adjacent ID: %"PRIu64"\n", COND_SWAP64(msg_swap, p->node_or_adjacent_id));
			printf("    Cost: %d\n", COND_SWAP32(msg_swap, p->ingress_cost));
			printf("    Last interest recalc duration: %d.%06u seconds\n", COND_SWAP32(msg_swap, p->recalc_duration_sec), COND_SWAP32(msg_swap, p->recalc_duration_usec));
			printf("    Last proxy receiver recalc duration: %d.%06u seconds\n", COND_SWAP32(msg_swap, p->proxy_rec_recalc_duration_sec), COND_SWAP32(msg_swap, p->proxy_rec_recalc_duration_usec));
		}
		break;
	case TNWG_DSTATTYPE_RM_OTHERGW:
		{
			tnwg_rm_stat_grp_msg_t * msg;
			tnwg_rm_stat_grp_othergw_info_t *p;
			msg = (tnwg_rm_stat_grp_msg_t *) aligned_msg_buffer;
			p = &msg->msgtype.othergw;

			printf("\n................Other Gateway(Version: %d)...............\n%s Sent\n", msg_version, time_buff_sent);
			printf("    Gateway Name: %s\n", p->gateway_name);
			printf("    Gateway ID: %"PRIu64"\n", COND_SWAP64(msg_swap, p->gateway_id));
			printf("    Version: %d\n", COND_SWAP16(msg_swap, p->version));
			printf("    Topology Signature: 0x%08x\n", COND_SWAP32(msg_swap, p->topology));
			printf("    Last Activity %d.%06u seconds ago\n", COND_SWAP32(msg_swap, p->last_activity_sec), COND_SWAP32(msg_swap, p->last_activity_usec));

		}
		break;
	case TNWG_DSTATTYPE_RM_OTHERGW_NBR:
		{
			tnwg_rm_stat_grp_msg_t * msg;
			tnwg_rm_stat_grp_othergw_neighbor_t *p;
			char * d_or_g;
			uint64_t id;
			uint32_t cost;

			msg = (tnwg_rm_stat_grp_msg_t *) aligned_msg_buffer;

			p = &msg->msgtype.neighbor;
			id = COND_SWAP64(msg_swap, p->node_id);
			cost = COND_SWAP32(msg_swap, p->ingress_cost);
			d_or_g = (COND_SWAP32(msg_swap,p->domain_or_gateway) == TNWG_DSTAT_Domain_Type) ? "Domain" : "Gateway";
			printf("\n------------Adjacent %s ID: %"PRIu64"  (Cost: %d) (Version: %d)------------\n%s Sent\n", d_or_g, id, cost, msg_version, time_buff_sent);
		}
		break;	
	case TNWG_DSTATTYPE_PORTSTAT:
		{
			tnwg_dstat_portalstats_msg_t *msg_p;
			uint32_t portal_type;
			msg_p = (tnwg_dstat_portalstats_msg_t *) aligned_msg_buffer;
			portal_type = COND_SWAP32(msg_swap, msg_p->rechdr.portal_type);
			printf("\n============Portal Statistics for Portal %s(Version: %d)============\n%s Sent\n", msg_p->rechdr.portal_name, msg_version, time_buff_sent);
				if(portal_type == TNWG_DSTAT_Portal_Type_Peer){
					printf("..............................Portal Entry Stats for Type = Peer..............................\n");
					printf("                                                          ingress_cost: %"PRIu64"\n", COND_SWAP64(msg_swap,msg_p->record.ptype.peer.ingress_cost));
					printf("                                                 local_interest_topics: %"PRIu64"\n", COND_SWAP64(msg_swap,msg_p->record.ptype.peer.local_interest_topics));
					printf("                                          local_interest_pcre_patterns: %"PRIu64"\n", COND_SWAP64(msg_swap,msg_p->record.ptype.peer.local_interest_pcre_patterns));
					printf("                                         local_interest_regex_patterns: %"PRIu64"\n", COND_SWAP64(msg_swap,msg_p->record.ptype.peer.local_interest_regex_patterns));
					printf("                                                remote_interest_topics: %"PRIu64"\n", COND_SWAP64(msg_swap,msg_p->record.ptype.peer.remote_interest_topics));
					printf("                                         remote_interest_pcre_patterns: %"PRIu64"\n", COND_SWAP64(msg_swap,msg_p->record.ptype.peer.remote_interest_pcre_patterns));
					printf("                                        remote_interest_regex_patterns: %"PRIu64"\n", COND_SWAP64(msg_swap,msg_p->record.ptype.peer.remote_interest_regex_patterns));
					printf("                                                       proxy_receivers: %"PRIu64"\n", COND_SWAP64(msg_swap,msg_p->record.ptype.peer.proxy_receivers));
					printf("                                                       receiver_topics: %"PRIu64"\n", COND_SWAP64(msg_swap,msg_p->record.ptype.peer.receiver_topics));
					printf("                                                receiver_pcre_patterns: %"PRIu64"\n", COND_SWAP64(msg_swap,msg_p->record.ptype.peer.receiver_pcre_patterns));
					printf("                                               receiver_regex_patterns: %"PRIu64"\n", COND_SWAP64(msg_swap,msg_p->record.ptype.peer.receiver_regex_patterns));
					printf("                                                         proxy_sources: %"PRIu64"\n", COND_SWAP64(msg_swap,msg_p->record.ptype.peer.proxy_sources));

					{
						tnwg_dstat_peer_receive_stats_t * p;
						p = &msg_p->record.ptype.peer.receive_stats;
						printf("..............................Receive Statistics for Type = Peer..............................\n");
						printf("                                                 Data messages received: %"PRIu64"\n", COND_SWAP64(msg_swap,p->data_msgs_rcvd));
						printf("                                                    Data bytes received: %"PRIu64"\n", COND_SWAP64(msg_swap,p->data_msg_bytes_rcvd));
						printf("                      Transport topic fragment data messages received  : %"PRIu64"\n", COND_SWAP64(msg_swap,p->transport_topic_fragment_data_msgs_rcvd));
						printf("                  Transport topic fragment data messages received bytes: %"PRIu64"\n", COND_SWAP64(msg_swap,p->transport_topic_fragment_data_msg_bytes_rcvd));
						printf("    Transport topic fragment data messages received with unknown source: %"PRIu64"\n", COND_SWAP64(msg_swap,p->transport_topic_fragment_data_msgs_rcvd_unknown_source));
						printf("       Transport topic fragment data bytes received with unknown source: %"PRIu64"\n", COND_SWAP64(msg_swap,p->transport_topic_fragment_data_msg_bytes_rcvd_unknown_source));
						printf("                Transport topic request fragment data messages received: %"PRIu64"\n", COND_SWAP64(msg_swap,p->transport_topic_req_fragment_data_msgs_rcvd));
						printf("                   Transport topic request fragment data bytes received: %"PRIu64"\n", COND_SWAP64(msg_swap,p->transport_topic_req_fragment_data_msg_bytes_rcvd));
						printf("   Transport topic req frag. data messages received with unknown source: %"PRIu64"\n", COND_SWAP64(msg_swap,p->transport_topic_req_fragment_data_msgs_rcvd_unknown_source));
						printf("      Transport topic req frag. data bytes received with unknown source: %"PRIu64"\n", COND_SWAP64(msg_swap,p->transport_topic_req_fragment_data_msg_bytes_rcvd_unknown_source));
						printf("                              Transport topic control messages received: %"PRIu64"\n", COND_SWAP64(msg_swap,p->transport_topic_control_msgs_rcvd));
						printf("                                 Transport topic control bytes received: %"PRIu64"\n", COND_SWAP64(msg_swap,p->transport_topic_control_msg_bytes_rcvd));
						printf("          Transport topic control messages received with unknown source: %"PRIu64"\n", COND_SWAP64(msg_swap,p->transport_topic_control_msgs_rcvd_unknown_source));
						printf("             Transport topic control bytes received with unknown source: %"PRIu64"\n", COND_SWAP64(msg_swap,p->transport_topic_control_msg_bytes_rcvd_unknown_source));
						printf("                        Immediate topic fragment data messages received: %"PRIu64"\n", COND_SWAP64(msg_swap,p->immediate_topic_fragment_data_msgs_rcvd));
						printf("                           Immediate topic fragment data bytes received: %"PRIu64"\n", COND_SWAP64(msg_swap,p->immediate_topic_fragment_data_msg_bytes_rcvd));
						printf("                Immediate topic request fragment data messages received: %"PRIu64"\n", COND_SWAP64(msg_swap,p->immediate_topic_req_fragment_data_msgs_rcvd));
						printf("                   Immediate topic request fragment data bytes received: %"PRIu64"\n", COND_SWAP64(msg_swap,p->immediate_topic_req_fragment_data_msg_bytes_rcvd));
						printf("                    Immediate topicless fragment data messages received: %"PRIu64"\n", COND_SWAP64(msg_swap,p->immediate_topicless_fragment_data_msgs_rcvd));
						printf("                       Immediate topicless fragment data bytes received: %"PRIu64"\n", COND_SWAP64(msg_swap,p->immediate_topicless_fragment_data_msg_bytes_rcvd));
						printf("            Immediate topicless request fragment data messages received: %"PRIu64"\n", COND_SWAP64(msg_swap,p->immediate_topicless_req_fragment_data_msgs_rcvd));
						printf("               Immediate topicless request fragment data bytes received: %"PRIu64"\n", COND_SWAP64(msg_swap,p->immediate_topicless_req_fragment_data_msg_bytes_rcvd));
						printf("                                         Unicast data messages received: %"PRIu64"\n", COND_SWAP64(msg_swap,p->unicast_data_msgs_rcvd));
						printf("                                            Unicast data bytes received: %"PRIu64"\n", COND_SWAP64(msg_swap,p->unicast_data_msg_bytes_rcvd));
						printf("          Unicast data messages received with no forwarding information: %"PRIu64"\n", COND_SWAP64(msg_swap,p->unicast_data_msgs_rcvd_no_fwd));
						printf("     Unicast data message bytes received with no forwarding information: %"PRIu64"\n", COND_SWAP64(msg_swap,p->unicast_data_msg_bytes_rcvd_no_fwd));
						printf("     Unicast data messages received with unknown forwarding information: %"PRIu64"\n", COND_SWAP64(msg_swap,p->unicast_data_msgs_rcvd_unknown_fwd));
						printf("Unicast data message bytes received with unknown forwarding information: %"PRIu64"\n", COND_SWAP64(msg_swap,p->unicast_data_msg_bytes_rcvd_unknown_fwd));
						printf("        Unicast data messages/bytes received with no stream information: %"PRIu64"\n", COND_SWAP64(msg_swap,p->unicast_data_msgs_rcvd_no_stream));
						printf("        Unicast data messages/bytes received with no stream information: %"PRIu64"\n", COND_SWAP64(msg_swap,p->unicast_data_msg_bytes_rcvd_no_stream));
						printf("                                 Unicast data messages dropped no route: %"PRIu64"\n", COND_SWAP64(msg_swap,p->unicast_data_msgs_dropped_no_route));
						printf("                            Unicast data message bytes dropped no route: %"PRIu64"\n", COND_SWAP64(msg_swap,p->unicast_data_msg_bytes_dropped_no_route));
						printf("                                        Control messages/bytes received: %"PRIu64"\n", COND_SWAP64(msg_swap,p->cntl_msgs_rcvd));
						printf("                                        Control messages/bytes received: %"PRIu64"\n", COND_SWAP64(msg_swap,p->cntl_msg_bytes_rcvd));
						printf("                                Unicast control messages/bytes received: %"PRIu64"\n", COND_SWAP64(msg_swap,p->unicast_cntl_msgs_rcvd));
						printf("                                Unicast control messages/bytes received: %"PRIu64"\n", COND_SWAP64(msg_swap,p->unicast_cntl_msg_bytes_rcvd));
						printf("                       Unicast Control retransmission requests received: %"PRIu64"\n", COND_SWAP64(msg_swap,p->unicast_cntl_rxreq_msgs_rcvd));
						printf("                          Unicast Control retransmission bytes received: %"PRIu64"\n", COND_SWAP64(msg_swap,p->unicast_cntl_rxreq_msg_bytes_rcvd));
						printf("                        Unicast control messages received but unhandled: %"PRIu64"\n", COND_SWAP64(msg_swap,p->unicast_cntl_msgs_rcvd_unhandled));
						printf("                   Unicast control message bytes received but unhandled: %"PRIu64"\n", COND_SWAP64(msg_swap,p->unicast_cntl_msg_bytes_rcvd_unhandled));
						printf("           Unicast control messages received with no stream information: %"PRIu64"\n", COND_SWAP64(msg_swap,p->unicast_cntl_msgs_rcvd_no_stream));
						printf("      Unicast control message bytes received with no stream information: %"PRIu64"\n", COND_SWAP64(msg_swap,p->unicast_cntl_msg_bytes_rcvd_no_stream));
						printf("                              Unicast control messages dropped no route: %"PRIu64"\n", COND_SWAP64(msg_swap,p->unicast_cntl_msgs_dropped_no_route));
						printf("                         Unicast control message bytes dropped no route: %"PRIu64"\n", COND_SWAP64(msg_swap,p->unicast_cntl_msg_bytes_dropped_no_route));
						printf("                                      Gateway control messages received: %"PRIu64"\n", COND_SWAP64(msg_swap,p->gateway_cntl_msgs_rcvd));
						printf("                                 Gateway control message bytes received: %"PRIu64"\n", COND_SWAP64(msg_swap,p->gateway_cntl_msg_bytes_rcvd));
					}
		
					{
						tnwg_dstat_peer_send_stats_t * p;
						p = &msg_p->record.ptype.peer.send_stats;
						printf("..............................Send Statistics for Type = Peer.................................\n");
						printf("                                  Data fragments forwarded to this portal: %"PRIu64"\n", COND_SWAP64(msg_swap,p->data_fragments_forwarded));
						printf("                             Data fragment bytes forwarded to this portal: %"PRIu64"\n", COND_SWAP64(msg_swap,p->data_fragment_bytes_forwarded));
						printf("                                                      Data fragments sent: %"PRIu64"\n", COND_SWAP64(msg_swap,p->data_fragments_sent));
						printf("                                                 Data fragment bytes sent: %"PRIu64"\n", COND_SWAP64(msg_swap,p->data_fragment_bytes_sent));
						printf("                                         Duplicate data fragments dropped: %"PRIu64"\n", COND_SWAP64(msg_swap,p->data_fragments_dropped_dup));
						printf("                                    Duplicate data fragment bytes dropped: %"PRIu64"\n", COND_SWAP64(msg_swap,p->data_fragment_bytes_dropped_dup));
						printf("                                Data fragments dropped due to EWOULDBLOCK: %"PRIu64"\n", COND_SWAP64(msg_swap,p->data_fragments_dropped_would_block));
						printf("                           Data fragment bytes dropped due to EWOULDBLOCK: %"PRIu64"\n", COND_SWAP64(msg_swap,p->data_fragment_bytes_dropped_would_block));
						printf("               Data fragments dropped due to portal not being operational: %"PRIu64"\n", COND_SWAP64(msg_swap,p->data_fragments_dropped_not_operational));
						printf("          Data fragment bytes dropped due to portal not being operational: %"PRIu64"\n", COND_SWAP64(msg_swap,p->data_fragment_bytes_dropped_not_operational));
						printf("                           Data fragments dropped due to queueing failure: %"PRIu64"\n", COND_SWAP64(msg_swap,p->data_fragments_dropped_queue_failure));
						printf("                      Data fragment bytes dropped due to queueing failure: %"PRIu64"\n", COND_SWAP64(msg_swap,p->data_fragment_bytes_dropped_queue_failure));
						printf("                                Unicast messages forwarded to this portal: %"PRIu64"\n", COND_SWAP64(msg_swap,p->unicast_msgs_forwarded));
						printf("                           Unicast message bytes forwarded to this portal: %"PRIu64"\n", COND_SWAP64(msg_swap,p->unicast_msg_bytes_forwarded));
						printf("                                                    Unicast messages sent: %"PRIu64"\n", COND_SWAP64(msg_swap,p->unicast_msgs_sent));
						printf("                                               Unicast message bytes sent: %"PRIu64"\n", COND_SWAP64(msg_swap,p->unicast_msg_bytes_sent));
						printf("                              Unicast messages dropped due to EWOULDBLOCK: %"PRIu64"\n", COND_SWAP64(msg_swap,p->unicast_msgs_dropped_would_block));
						printf("                         Unicast message bytes dropped due to EWOULDBLOCK: %"PRIu64"\n", COND_SWAP64(msg_swap,p->unicast_msg_bytes_dropped_would_block));
						printf("             Unicast messages dropped due to portal not being operational: %"PRIu64"\n", COND_SWAP64(msg_swap,p->unicast_msgs_dropped_not_operational));
						printf("        Unicast message bytes dropped due to portal not being operational: %"PRIu64"\n", COND_SWAP64(msg_swap,p->unicast_msg_bytes_dropped_not_operational));
						printf("                         Unicast messages dropped due to queueing failure: %"PRIu64"\n", COND_SWAP64(msg_swap,p->unicast_msgs_dropped_queue_failure));
						printf("                    Unicast message bytes dropped due to queueing failure: %"PRIu64"\n", COND_SWAP64(msg_swap,p->unicast_msg_bytes_dropped_queue_failure));
						printf("                                                 Gateway control messages: %"PRIu64"\n", COND_SWAP64(msg_swap,p->gateway_cntl_msgs));
						printf("                                            Gateway control message bytes: %"PRIu64"\n", COND_SWAP64(msg_swap,p->gateway_cntl_msg_bytes));
						printf("                                            Gateway control messages sent: %"PRIu64"\n", COND_SWAP64(msg_swap,p->gateway_cntl_msgs_sent));
						printf("                                       Gateway control message bytes sent: %"PRIu64"\n", COND_SWAP64(msg_swap,p->gateway_cntl_msg_bytes_sent));
						printf("                      Gateway control messages dropped due to EWOULDBLOCK: %"PRIu64"\n", COND_SWAP64(msg_swap,p->gateway_cntl_msgs_dropped_would_block));
						printf("                 Gateway control message bytes dropped due to EWOULDBLOCK: %"PRIu64"\n", COND_SWAP64(msg_swap,p->gateway_cntl_msg_bytes_dropped_would_block));
						printf("     Gateway control messages dropped due to portal not being operational: %"PRIu64"\n", COND_SWAP64(msg_swap,p->gateway_cntl_msgs_dropped_not_operational));
						printf("Gateway control message bytes dropped due to portal not being operational: %"PRIu64"\n", COND_SWAP64(msg_swap,p->gateway_cntl_msg_bytes_dropped_not_operational));
						printf("                 Gateway control messages dropped due to queueing failure: %"PRIu64"\n", COND_SWAP64(msg_swap,p->gateway_cntl_msgs_dropped_queue_failure));
						printf("            Gateway control message bytes dropped due to queueing failure: %"PRIu64"\n", COND_SWAP64(msg_swap,p->gateway_cntl_msg_bytes_dropped_queue_failure));
						printf("                                                Number of message batches: %"PRIu64"\n", COND_SWAP64(msg_swap,p->batches));
						printf("                                     Minimum number of messages per batch: %"PRIu64"\n", COND_SWAP64(msg_swap,p->batch_msgs_min));
						printf("                                        Mean number of messages per batch: %"PRIu64"\n", COND_SWAP64(msg_swap,p->batch_msgs_mean)); 
						printf("                                     Maximum number of messages per batch: %"PRIu64"\n", COND_SWAP64(msg_swap,p->batch_msgs_max));
						printf("                                        Minimum number of bytes per batch: %"PRIu64"\n", COND_SWAP64(msg_swap,p->batch_bytes_min));
						printf("                                           Mean number of bytes per batch: %"PRIu64"\n", COND_SWAP64(msg_swap,p->batch_bytes_mean));
						printf("                                        Maximum number of bytes per batch: %"PRIu64"\n", COND_SWAP64(msg_swap,p->batch_bytes_max));
						printf("                                   Current data bytes enqueued internally: %"PRIu64"\n", COND_SWAP64(msg_swap,p->data_bytes_enqueued));
						printf("                                   Maximum data bytes enqueued internally: %"PRIu64"\n", COND_SWAP64(msg_swap,p->data_bytes_enqueued_max));
						printf("                          Configured maximum data bytes allowed in queued: %"PRIu64"\n", COND_SWAP64(msg_swap,p->data_bytes_enqueued_limit));
						printf("                                                        Total RTT samples: %"PRIu64"\n", COND_SWAP64(msg_swap,p->rtt_samples));
						{
							uint64_t rtt_samples;
							rtt_samples = COND_SWAP64(msg_swap,p->rtt_samples);
							if(rtt_samples == 0){
								printf("                                                 Minimum RTT to companion: N/A\n");
								printf("                                                    Mean RTT to companion: N/A\n");
								printf("                                                 Maximum RTT to companion: N/A\n");
							} else {
								printf("                                   Minimum RTT to companion(microseconds): %"PRId64"\n", COND_SWAP64(msg_swap,p->rtt_min));
								printf("                                      Mean RTT to companion(microseconds): %"PRIu64"\n", COND_SWAP64(msg_swap,p->rtt_mean));
								printf("                                   Maximum RTT to companion(microseconds): %"PRIu64"\n", COND_SWAP64(msg_swap,p->rtt_max));
							}
						}
						{
							time_t last_ka_time;
							char timestring[64];
							size_t sz;
							last_ka_time = COND_SWAP64(msg_swap,p->last_ka_time);

							if(last_ka_time == 0){
								printf("                                              Last keepalive responded to: None\n");
							} else {
								struct tm *gm = gmtime(&last_ka_time);
								if(gm){
									sz = (size_t)strftime(timestring, sizeof(timestring), "%Y-%m-%d %H:%M:%S GMT", gm);
									if(sz){
										printf("                                              Last keepalive responded to: %s\n", timestring);
									}else{
										printf("                                              Last keepalive responded to: unknown\n");
									}
								} else {									
										printf("                                              Last keepalive responded to: unknown\n");
								}								
							}
						}
					}
			} else {	/* Else type = Endpoint */	
					printf("...............Portal Entry Stats for Type = EndPoint...............\n");
					printf("                      domain_id: %"PRIu64"\n", COND_SWAP64(msg_swap,msg_p->record.ptype.endpt.domain_id));	
					printf("                   ingress_cost: %"PRIu64"\n", COND_SWAP64(msg_swap,msg_p->record.ptype.endpt.ingress_cost));
					printf("          local_interest_topics: %"PRIu64"\n", COND_SWAP64(msg_swap,msg_p->record.ptype.endpt.local_interest_topics));
					printf("   local_interest_pcre_patterns: %"PRIu64"\n", COND_SWAP64(msg_swap,msg_p->record.ptype.endpt.local_interest_pcre_patterns));
					printf("  local_interest_regex_patterns: %"PRIu64"\n", COND_SWAP64(msg_swap,msg_p->record.ptype.endpt.local_interest_regex_patterns));
					printf("         remote_interest_topics: %"PRIu64"\n", COND_SWAP64(msg_swap,msg_p->record.ptype.endpt.remote_interest_topics));
					printf("  remote_interest_pcre_patterns: %"PRIu64"\n", COND_SWAP64(msg_swap,msg_p->record.ptype.endpt.remote_interest_pcre_patterns));
					printf(" remote_interest_regex_patterns: %"PRIu64"\n", COND_SWAP64(msg_swap,msg_p->record.ptype.endpt.remote_interest_regex_patterns));
					printf("                proxy_receivers: %"PRIu64"\n", COND_SWAP64(msg_swap,msg_p->record.ptype.endpt.proxy_receivers));
					printf("                receiver_topics: %"PRIu64"\n", COND_SWAP64(msg_swap,msg_p->record.ptype.endpt.receiver_topics));
					printf("         receiver_pcre_patterns: %"PRIu64"\n", COND_SWAP64(msg_swap,msg_p->record.ptype.endpt.receiver_pcre_patterns));
					printf("        receiver_regex_patterns: %"PRIu64"\n", COND_SWAP64(msg_swap,msg_p->record.ptype.endpt.receiver_regex_patterns));
					printf("                  proxy_sources: %"PRIu64"\n", COND_SWAP64(msg_swap,msg_p->record.ptype.endpt.proxy_sources));
					printf("\n...............Receive Statistics for Type = EndPoint...............\n");
					{
						tnwg_dstat_endpoint_receive_stats_t * p;
						p = &msg_p->record.ptype.endpt.receive_stats;
						printf("                            Transport topic message fragments received: %"PRIu64"\n", COND_SWAP64(msg_swap,p->transport_topic_fragments_rcvd));
						printf("                       Transport topic message fragment bytes received: %"PRIu64"\n", COND_SWAP64(msg_swap,p->transport_topic_fragment_bytes_rcvd));
						printf("                    Transport topic message request fragments received: %"PRIu64"\n", COND_SWAP64(msg_swap,p->transport_topic_req_fragments_rcvd));
						printf("               Transport topic message request fragment bytes received: %"PRIu64"\n", COND_SWAP64(msg_swap,p->transport_topic_req_fragment_bytes_rcvd));
						printf("                              Transport topic control message received: %"PRIu64"\n", COND_SWAP64(msg_swap,p->transport_topic_control_rcvd));
						printf("                        Transport topic control message bytes received: %"PRIu64"\n", COND_SWAP64(msg_swap,p->transport_topic_control_bytes_rcvd));
						printf("                            Immediate topic message fragments received: %"PRIu64"\n", COND_SWAP64(msg_swap,p->immediate_topic_fragments_rcvd));
						printf("                       Immediate topic message fragment bytes received: %"PRIu64"\n", COND_SWAP64(msg_swap,p->immediate_topic_fragment_bytes_rcvd));
						printf("                    Immediate topic message request fragments received: %"PRIu64"\n", COND_SWAP64(msg_swap,p->immediate_topic_req_fragments_rcvd));
						printf("               Immediate topic message request fragment bytes received: %"PRIu64"\n", COND_SWAP64(msg_swap,p->immediate_topic_req_fragment_bytes_rcvd));
						printf("                        Immediate topicless message fragments received: %"PRIu64"\n", COND_SWAP64(msg_swap,p->immediate_topicless_fragments_rcvd));
						printf("                   Immediate topicless message fragment bytes received: %"PRIu64"\n", COND_SWAP64(msg_swap,p->immediate_topicless_fragment_bytes_rcvd));
						printf("                Immediate topicless message request fragments received: %"PRIu64"\n", COND_SWAP64(msg_swap,p->immediate_topicless_req_fragments_rcvd));
						printf("           Immediate topicless message request fragment bytes received: %"PRIu64"\n", COND_SWAP64(msg_swap,p->immediate_topicless_req_fragment_bytes_rcvd));
						printf("                                        Unicast data messages received: %"PRIu64"\n", COND_SWAP64(msg_swap,p->unicast_data_msgs_rcvd));
						printf("                                   Unicast data message bytes received: %"PRIu64"\n", COND_SWAP64(msg_swap,p->unicast_data_msg_bytes_rcvd));
						printf("          Unicast data messages received with no stream identification: %"PRIu64"\n", COND_SWAP64(msg_swap,p->unicast_data_msgs_rcvd_no_stream));
						printf("     Unicast data message bytes received with no stream identification: %"PRIu64"\n", COND_SWAP64(msg_swap,p->unicast_data_msg_bytes_rcvd_no_stream));
						printf("                           Unicast data messages dropped as duplicates: %"PRIu64"\n", COND_SWAP64(msg_swap,p->unicast_data_msgs_dropped_dup));
						printf("                      Unicast data message bytes dropped as duplicates: %"PRIu64"\n", COND_SWAP64(msg_swap,p->unicast_data_msg_bytes_dropped_dup));
						printf("                                Unicast data messages dropped no route: %"PRIu64"\n", COND_SWAP64(msg_swap,p->unicast_data_msgs_dropped_no_route));
						printf("                           Unicast data message bytes dropped no route: %"PRIu64"\n", COND_SWAP64(msg_swap,p->unicast_data_msg_bytes_dropped_no_route));
						printf("                                     Unicast control messages received: %"PRIu64"\n", COND_SWAP64(msg_swap,p->unicast_cntl_msgs_rcvd));
						printf("                                Unicast control message bytes received: %"PRIu64"\n", COND_SWAP64(msg_swap,p->unicast_cntl_msg_bytes_rcvd));
						printf("       Unicast control messages received with no stream identification: %"PRIu64"\n", COND_SWAP64(msg_swap,p->unicast_cntl_msgs_rcvd_no_stream));
						printf("  Unicast control message bytes received with no stream identification: %"PRIu64"\n", COND_SWAP64(msg_swap,p->unicast_cntl_msg_bytes_rcvd_no_stream));
						printf("                        Unicast control messages dropped as duplicates: %"PRIu64"\n", COND_SWAP64(msg_swap,p->unicast_cntl_msgs_dropped_dup));
						printf("                   Unicast control message bytes dropped as duplicates: %"PRIu64"\n", COND_SWAP64(msg_swap,p->unicast_cntl_msg_bytes_dropped_dup));
						printf("                             Unicast control messages dropped no route: %"PRIu64"\n", COND_SWAP64(msg_swap,p->unicast_cntl_msgs_dropped_no_route));
						printf("                        Unicast control message bytes dropped no route: %"PRIu64"\n", COND_SWAP64(msg_swap,p->unicast_cntl_msg_bytes_dropped_no_route));
					}
					{
						tnwg_dstat_endpoint_send_stats_t * p;
						p = &msg_p->record.ptype.endpt.send_stats;
						printf("\n...............Send Statistics for Type = EndPoint..................\n");
						printf("                       Transport topic fragments forwarded to this portal: %"PRIu64"\n", COND_SWAP64(msg_swap,p->transport_topic_fragments_forwarded));
						printf("                  Transport topic fragment bytes forwarded to this portal: %"PRIu64"\n", COND_SWAP64(msg_swap,p->transport_topic_fragment_bytes_forwarded));
						printf("                                           Transport topic fragments sent: %"PRIu64"\n", COND_SWAP64(msg_swap,p->transport_topic_fragments_sent));
						printf("                                      Transport topic fragment bytes sent: %"PRIu64"\n", COND_SWAP64(msg_swap,p->transport_topic_fragment_bytes_sent));
						printf("                                   Transport topic request fragments sent: %"PRIu64"\n", COND_SWAP64(msg_swap,p->transport_topic_req_fragments_sent));
						printf("                              Transport topic request fragment bytes sent: %"PRIu64"\n", COND_SWAP64(msg_swap,p->transport_topic_req_fragment_bytes_sent));
						printf("                              Duplicate transport topic fragments dropped: %"PRIu64"\n", COND_SWAP64(msg_swap,p->transport_topic_fragments_dropped_dup));
						printf("                         Duplicate transport topic fragment bytes dropped: %"PRIu64"\n", COND_SWAP64(msg_swap,p->transport_topic_fragment_bytes_dropped_dup));
						printf("                     Transport topic fragments dropped due to EWOULDBLOCK: %"PRIu64"\n", COND_SWAP64(msg_swap,p->transport_topic_fragments_dropped_would_block));
						printf("                Transport topic fragment bytes dropped due to EWOULDBLOCK: %"PRIu64"\n", COND_SWAP64(msg_swap,p->transport_topic_fragment_bytes_dropped_would_block));
						printf("                           Transport topic fragments dropped due to error: %"PRIu64"\n", COND_SWAP64(msg_swap,p->transport_topic_fragments_dropped_error));
						printf("                      Transport topic fragment bytes dropped due to error: %"PRIu64"\n", COND_SWAP64(msg_swap,p->transport_topic_fragment_bytes_dropped_error));
						printf("             Transport topic fragments dropped due to fragment size error: %"PRIu64"\n", COND_SWAP64(msg_swap,p->transport_topic_fragments_dropped_size_error));
						printf("              Transport topic fragment dropped due to fragment size error: %"PRIu64"\n", COND_SWAP64(msg_swap,p->transport_topic_fragment_bytes_dropped_size_error));
						printf("                                      Immediate topic fragments forwarded: %"PRIu64"\n", COND_SWAP64(msg_swap,p->immediate_topic_fragments_forwarded));
						printf("                                 Immediate topic fragment bytes forwarded: %"PRIu64"\n", COND_SWAP64(msg_swap,p->immediate_topic_fragment_bytes_forwarded));
						printf("                                           Immediate topic fragments sent: %"PRIu64"\n", COND_SWAP64(msg_swap,p->immediate_topic_fragments_sent));
						printf("                                      Immediate topic fragment bytes sent: %"PRIu64"\n", COND_SWAP64(msg_swap,p->immediate_topic_fragment_bytes_sent));
						printf("                                   Immediate topic request fragments sent: %"PRIu64"\n", COND_SWAP64(msg_swap,p->immediate_topic_req_fragments_sent));
						printf("                              Immediate topic request fragment bytes sent: %"PRIu64"\n", COND_SWAP64(msg_swap,p->immediate_topic_req_fragment_bytes_sent));
						printf("                     Immediate topic fragments dropped due to EWOULDBLOCK: %"PRIu64"\n", COND_SWAP64(msg_swap,p->immediate_topic_fragments_dropped_would_block));
						printf("                Immediate topic fragment bytes dropped due to EWOULDBLOCK: %"PRIu64"\n", COND_SWAP64(msg_swap,p->immediate_topic_fragment_bytes_dropped_would_block));
						printf("                           Immediate topic fragments dropped due to error: %"PRIu64"\n", COND_SWAP64(msg_swap,p->immediate_topic_fragments_dropped_error));
						printf("                      Immediate topic fragment bytes dropped due to error: %"PRIu64"\n", COND_SWAP64(msg_swap,p->immediate_topic_fragment_bytes_dropped_error));
						printf("             Immediate topic fragments dropped due to fragment size error: %"PRIu64"\n", COND_SWAP64(msg_swap,p->immediate_topic_fragments_dropped_size_error));
						printf("        Immediate topic fragment bytes dropped due to fragment size error: %"PRIu64"\n", COND_SWAP64(msg_swap,p->immediate_topic_fragment_bytes_dropped_size_error));
						printf("                                  Immediate topicless fragments forwarded: %"PRIu64"\n", COND_SWAP64(msg_swap,p->immediate_topicless_fragments_forwarded));
						printf("                             Immediate topicless fragment bytes forwarded: %"PRIu64"\n", COND_SWAP64(msg_swap,p->immediate_topicless_fragment_bytes_forwarded));
						printf("                                       Immediate topicless fragments sent: %"PRIu64"\n", COND_SWAP64(msg_swap,p->immediate_topicless_fragments_sent));
						printf("                                  Immediate topicless fragment bytes sent: %"PRIu64"\n", COND_SWAP64(msg_swap,p->immediate_topicless_fragment_bytes_sent));
						printf("                               Immediate topicless request fragments sent: %"PRIu64"\n", COND_SWAP64(msg_swap,p->immediate_topicless_req_fragments_sent));
						printf("                          Immediate topicless request fragment bytes sent: %"PRIu64"\n", COND_SWAP64(msg_swap,p->immediate_topicless_req_fragment_bytes_sent));
						printf("                 Immediate topicless fragments dropped due to EWOULDBLOCK: %"PRIu64"\n", COND_SWAP64(msg_swap,p->immediate_topicless_fragments_dropped_would_block));
						printf("            Immediate topicless fragment bytes dropped due to EWOULDBLOCK: %"PRIu64"\n", COND_SWAP64(msg_swap,p->immediate_topicless_fragment_bytes_dropped_would_block));
						printf("                       Immediate topicless fragments dropped due to error: %"PRIu64"\n", COND_SWAP64(msg_swap,p->immediate_topicless_fragments_dropped_error));
						printf("                  Immediate topicless fragment bytes dropped due to error: %"PRIu64"\n", COND_SWAP64(msg_swap,p->immediate_topicless_fragment_bytes_dropped_error));
						printf("         Immediate topicless fragments dropped due to fragment size error: %"PRIu64"\n", COND_SWAP64(msg_swap,p->immediate_topicless_fragments_dropped_size_error));
						printf("    Immediate topicless fragment bytes dropped due to fragment size error: %"PRIu64"\n", COND_SWAP64(msg_swap,p->immediate_topicless_fragment_bytes_dropped_size_error));
						printf("                                               Unicast messages forwarded: %"PRIu64"\n", COND_SWAP64(msg_swap,p->unicast_msgs_forwarded));
						printf("                                          Unicast message bytes forwarded: %"PRIu64"\n", COND_SWAP64(msg_swap,p->unicast_msg_bytes_forwarded));
						printf("                                                    Unicast messages sent: %"PRIu64"\n", COND_SWAP64(msg_swap,p->unicast_msgs_sent));
						printf("                                               Unicast message bytes sent: %"PRIu64"\n", COND_SWAP64(msg_swap,p->unicast_msg_bytes_sent));
						printf("                                    Unicast messages dropped due to error: %"PRIu64"\n", COND_SWAP64(msg_swap,p->unicast_msgs_dropped_error));
						printf("                               Unicast message bytes dropped due to error: %"PRIu64"\n", COND_SWAP64(msg_swap,p->unicast_msg_bytes_dropped_error));
						printf("                                   Current data bytes enqueued internally: %"PRIu64"\n", COND_SWAP64(msg_swap,p->data_bytes_enqueued));
						printf("                                   Maximum data bytes enqueued internally: %"PRIu64"\n", COND_SWAP64(msg_swap,p->data_bytes_enqueued_max));
						printf("                          Configured maximum data bytes allowed in queued: %"PRIu64"\n", COND_SWAP64(msg_swap,p->data_bytes_enqueued_limit));
				}

			} /* End of Else type = Endpoint */
			break;
		}
	default:
		printf("unknown message type 0x%x\n", msg_hdr->type);
		return;
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
		tnwg_dmon_msg_handler(msg->data, msg->len);
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
		printf("Unknown lbm_msg_t type %x [%s][%s]\n", msg->type, msg->topic_name, msg->source);
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
	printf("Receiving on topic %s\n", opts->topic);
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

