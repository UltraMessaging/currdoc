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
	#define strcasecmp stricmp
	#define snprintf _snprintf
#else
#endif

#define MIN_ALLOC_MSGLEN 25
#define DEFAULT_NUM_REQUESTS 10000000
#define DEFAULT_PAUSE_SEC 5

#if defined(_WIN32)
extern int optind;
extern char *optarg;
int getopt(int, char *const *, const char *);
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

char purpose[] = "Purpose: "
"application that sends requests on a single topic and waits for\n"
"    responses."
;

char usage[] =
"Usage: lbmssrcreq [options] topic\n"
"Available options:\n"
"  -a, --available-data-space  print the length of available data space\n"
"  -b, --user-supplied-buffer  send messages using a user-supplied buffer\n"
"  -c filename = Use LBM configuration file filename.\n"
"                Multiple config files are allowed.\n"
"                Example:  '-c file1.cfg -c file2.cfg'\n"
"  -d sec = delay sending for delay seconds after source creation\n"
"  -h = help\n"
"  -l len = send messages of len bytes\n"
"  -L linger = linger for linger seconds before closing context\n"
"  -P sec = pause sec seconds after sending request for responses to arrive\n"
"  -r [UM]DATA/RETR = Set transport type to LBT-R[UM], set data rate limit to\n"
"                     DATA bits per second, and set retransmit rate limit to\n"
"                     RETR bits per second.  For both limits, the optional\n"
"                     k, m, and g suffixes may be used.  For example,\n"
"                     '-r 1m/500k' is the same as '-r 1000000/500000'\n"
"  -R requests = send requests number of requests\n"
"  -v = be verbose (-v -v = be even more verbose)\n"
;

/* Utility to print out contents of buffer in hex/ASCII format */
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

/* Logging callback function (passed into lbm_log()) */
int lbm_log_msg(int level, const char *message, void *clientd)
{
	printf("LOG Level %d: %s\n", level, message);
	return 0;
}

/* Source event handler callback (passed into lbm_src_create()) */
int handle_ssrc_event(lbm_ssrc_t *ssrc, int event, void *ed, void *cd)
{
	switch (event) {
	case LBM_SRC_EVENT_CONNECT:
		{
			const char *clientname = (const char *)ed;
			
			printf("Receiver connect [%s]\n",clientname);
		}
		break;
	case LBM_SRC_EVENT_DISCONNECT:
		{
			const char *clientname = (const char *)ed;
			
			printf("Receiver disconnect [%s]\n",clientname);
		}
		break;
	default:
		printf("Unknown source event %d\n", event);
		break;
	}
	return 0;
}

size_t response_byte_count = 0;
int response_count = 0;
int verbose = 0;

/* Response handler callback (passed into lbm_ssrc_send_request_ex()) */
int handle_response(lbm_request_t *req, lbm_msg_t *msg, void *clientd)
{
	switch (msg->type) {
	case LBM_MSG_RESPONSE:
		response_count++;
		response_byte_count += msg->len;
		if (verbose) {
			printf("Response [%s][%u], %lu bytes\n", msg->source, msg->sequence_number, (unsigned long) msg->len);
			if (verbose > 1)
				dump(msg->data, msg->len);
		}
		break;
	default:
		printf("Unknown lbm_msg_t type %x [%s]\n", msg->type, msg->source);
		break;
	}
	/* LBM automatically deletes the lbm_msg_t object unless we retain it. */
	return 0;
}

int main(int argc, char **argv)
{
	lbm_context_t *ctx;
	lbm_topic_t *topic;
	lbm_ssrc_t *ssrc;
	lbm_src_topic_attr_t * tattr;
	lbm_request_t *req;
	lbm_context_attr_t * ctx_attr;
	int requests = DEFAULT_NUM_REQUESTS, count = 0;
	int linger = 5;
	char portstr[256] = "14392";
	char tmpstr[256] = "";
	char *message = NULL;
	int c, errflag = 0, pause_sec = DEFAULT_PAUSE_SEC,
		delay = 1;
	size_t msglen = MIN_ALLOC_MSGLEN, tmpstrsz = sizeof(tmpstr);
	lbm_uint64_t rm_rate = 0, rm_retrans = 0;
	char rm_protocol = 'M';
	int transport;
	size_t transize = 4;
	int available_data_space = 0;
	int is_user_supplied_buffer = 0;
	char *user_supplied_buffer = NULL;
	lbm_ssrc_send_ex_info_t info;
	info.flags = 0;

#if defined(_WIN32)
	{
		WSADATA wsadata;
		int status;
		
		/* Windows socket startup code */
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

	while ((c = getopt(argc, argv, "c:d:hl:L:P:p:r:R:vab")) != EOF) {
		switch (c) {
		case 'a':
			available_data_space = 1;
			break;
		case 'b':
			is_user_supplied_buffer = 1;
			break;
		case 'c':
			/* Initialize configuration parameters from a file. */
			if (lbm_config(optarg) == LBM_FAILURE) {
				fprintf(stderr, "lbm_config: %s\n", lbm_errmsg());
				exit(1);
			}
			break;
		case 'd':
			delay = atoi(optarg);
			break;
		case 'l':
			msglen = atoi(optarg);
			break;
		case 'L':
			linger = atoi(optarg);
			break;
		case 'P':
			pause_sec = atoi(optarg);
			break;
		case 'p':
			strncpy(portstr, optarg, sizeof(portstr));
			break;
		case 'r':
			errflag += parse_rate(optarg, &rm_protocol, &rm_rate, &rm_retrans);
 			break;
		case 'R':
			requests = atoi(optarg);
			break;
		case 'h':
			fprintf(stderr, "%s\n%s\n%s\n%s",
				argv[0], lbm_version(), purpose, usage);
			exit(0);
		case 'v':
			verbose++;
			break;
		default:
			errflag++;
			break;
		}
	}
	if (errflag || (optind == argc)) {
 		fprintf(stderr, "%s\n%s\n%s", argv[0], lbm_version(), usage);
		exit(1);
	}
	/* Establish logging callback */
	if (lbm_log(lbm_log_msg, NULL) == LBM_FAILURE) {
		fprintf(stderr, "lbm_log: %s\n", lbm_errmsg());
		exit(1);
	}
	
	/* Retrieve current context settings */
	if (lbm_context_attr_create(&ctx_attr) == LBM_FAILURE) {
		fprintf(stderr, "lbm_context_attr_create: %s\n", lbm_errmsg());
		exit(1);
	}
	/* Retrieve current source topic settings */
	if (lbm_src_topic_attr_create(&tattr) == LBM_FAILURE) {
 		fprintf(stderr, "lbm_src_topic_attr_create: %s\n", lbm_errmsg());
 		exit(1);
 	}
 	if (rm_rate != 0) {
 		printf("Sending with LBT-R%c data rate limit %" PRIu64 ", retransmission rate limit %" PRIu64 "\n", 
			rm_protocol,rm_rate, rm_retrans);
		/* Set transport attribute to LBT-RM */
		switch(rm_protocol) {
		case 'M':
 			if (lbm_src_topic_attr_str_setopt(tattr, "transport", "LBTRM") != 0) {
 				fprintf(stderr, "lbm_src_topic_str_setopt:transport: %s\n", lbm_errmsg());
 				exit(1);
 			}
			/* Set LBT-RM data rate attribute */
 			if (lbm_context_attr_setopt(ctx_attr, "transport_lbtrm_data_rate_limit", &rm_rate, sizeof(rm_rate)) != 0) {
 				fprintf(stderr, "lbm_context_attr_setopt:transport_lbtrm_data_rate_limit: %s\n", lbm_errmsg());
 				exit(1);
 			}
			/* Set LBT-RM retransmission rate attribute */
 			if (lbm_context_attr_setopt(ctx_attr, "transport_lbtrm_retransmit_rate_limit", &rm_retrans, sizeof(rm_retrans)) != 0) {
 				fprintf(stderr, "lbm_context_attr_setopt:transport_lbtrm_retransmit_rate_limit: %s\n", lbm_errmsg());
 				exit(1);
 			}
			break;
		case 'U':
 			if (lbm_src_topic_attr_str_setopt(tattr, "transport", "LBTRU") != 0) {
 				fprintf(stderr, "lbm_src_topic_str_setopt:transport: %s\n", lbm_errmsg());
 				exit(1);
 			}
			/* Set LBT-RU data rate attribute */
 			if (lbm_context_attr_setopt(ctx_attr, "transport_lbtru_data_rate_limit", &rm_rate, sizeof(rm_rate)) != 0) {
 				fprintf(stderr, "lbm_context_attr_setopt:transport_lbtru_data_rate_limit: %s\n", lbm_errmsg());
 				exit(1);
 			}
			/* Set LBT-RU retransmission rate attribute */
 			if (lbm_context_attr_setopt(ctx_attr, "transport_lbtru_retransmit_rate_limit", &rm_retrans, sizeof(rm_retrans)) != 0) {
 				fprintf(stderr, "lbm_context_attr_setopt:transport_lbtru_retransmit_rate_limit: %s\n", lbm_errmsg());
 				exit(1);
 			}
			break;
		}
 	}
	/* Create LBM context (passing in context attributes) */
	if (lbm_context_create(&ctx, ctx_attr, NULL, NULL) == LBM_FAILURE) {
		fprintf(stderr, "lbm_context_create: %s\n", lbm_errmsg());
		exit(1);
	}
	lbm_context_attr_delete(ctx_attr);

	/* Only LBT-RM and LBT-RU supported for Smart Source right now */
	if (lbm_src_topic_attr_getopt(tattr, "transport", &transport, &transize) == LBM_FAILURE) {
		fprintf(stderr, "lbm_src_topic_attr_getopt: %s\n", lbm_errmsg());
		exit(1);
	}
	if (!(transport == LBM_SRC_TOPIC_ATTR_TRANSPORT_LBTRM || transport == LBM_SRC_TOPIC_ATTR_TRANSPORT_LBTRU)) {
		fprintf(stderr, "WARNING: only LBT-RM and LBT-RU are supported at this time. Changing to LBT-RM.\n");
		if (lbm_src_topic_attr_str_setopt(tattr, "transport", "LBTRM") != 0) {
			fprintf(stderr, "lbm_src_topic_attr_str_setopt: %s\n", lbm_errmsg());
			exit(1);
		}
	}
	
	tmpstrsz = sizeof(tmpstr);
	/*
	 * Retrieve TCP request port setting (this isn't strictly necessary here
	 * since we just set this attribute above).
	 */
	if (lbm_context_str_getopt(ctx, "request_tcp_port", tmpstr, &tmpstrsz) == LBM_FAILURE) {
		fprintf(stderr, "lbm_context_str_getopt(request_tcp_port): %s\n", lbm_errmsg());
		exit(1);
	}
	printf("Using TCP port %s for responses\n", tmpstr);


	/* Allocate desired topic */
	if (lbm_src_topic_alloc(&topic, ctx, argv[optind], tattr) == LBM_FAILURE) {
		fprintf(stderr, "lbm_src_topic_alloc: %s\n", lbm_errmsg());
		exit(1);
	}
	lbm_src_topic_attr_delete(tattr);
	/*
	 * Create source object with associated topic info (from above) and
	 * source event handler callback.
	 * Note that even when using an event queue for the receiving responses, the event queue does 
	 * have to get specified here.  Specifying it here only forces the events that are caught by handle_src_event
	 * to get handled via the event queue.
	 */
	if (lbm_ssrc_create(&ssrc, ctx, topic, handle_ssrc_event, NULL, NULL) == LBM_FAILURE) {
		fprintf(stderr, "lbm_ssrc_create: %s\n", lbm_errmsg());
		exit(1);
	}

	if (available_data_space) {
		int length = 0;
		if (lbm_ssrc_get_available_data_space(ssrc, &length) == LBM_FAILURE) {
			fprintf(stderr, "lbm_ssrc_get_available_data_space: %s\n", lbm_errmsg());
			exit(1);
		}
		printf("The length of available data space: %d.\n", length);
	}

	if (is_user_supplied_buffer) {
		info.flags |= LBM_SSRC_SEND_EX_FLAG_USER_SUPPLIED_BUFFER;
		if (msglen > 0) {
			user_supplied_buffer = (char *)malloc(msglen);
			memset(user_supplied_buffer, 0, msglen);
			info.usr_supplied_buffer = user_supplied_buffer;
			snprintf(user_supplied_buffer, msglen, "User supplied buffer message... ");
		} else {
			info.usr_supplied_buffer = (char *)(&user_supplied_buffer);	/* initializing to a non-null address for zero-length message case */
		}
	}

	if (lbm_ssrc_buff_get(ssrc, &message, 0) == LBM_FAILURE) {
		fprintf(stderr, "lbm_ssrc_buff_get: %s\n", lbm_errmsg());
		exit(1);
	}
	
	if (delay > 0) {
		printf("Delaying requests for %d second%s...\n", delay, (delay > 1 ? "s" : ""));
		SLEEP_SEC(delay);
	}
	
	if (requests > 0) 
		printf("Will send %d request%s\n", requests, (requests == 1 ? "" : "s"));

	for (count = 0; count < requests; count++) {
		sprintf(message, "request data %u", count);
		printf("Sending request %u\n", count);
		/* Send request noting the callback to handle the response. */
		if (lbm_ssrc_send_request_ex(&req, ssrc, message, msglen, handle_response, NULL, NULL, 0, &info) == LBM_FAILURE) {
			fprintf(stderr, "lbm_ssrc_send_request_ex: %s\n", lbm_errmsg());
			exit(1);
		}
		if (verbose)
			printf("Sent request %d.  ", count ); 

		SLEEP_SEC(pause_sec);
		
		/* Delete request */
		lbm_request_delete(req);
		printf("Done waiting for responses. %d response%s (%lu total bytes) received. Deleting request.\n\n",
			   response_count, (response_count == 1 ? "" : "s"), (unsigned long) response_byte_count);
		response_count = 0;
		response_byte_count = 0;
	}

	if (lbm_ssrc_buff_put(ssrc, message) == LBM_FAILURE) {
		fprintf(stderr, "lbm_ssrc_buff_put: %s\n", lbm_errmsg());
		exit(1);
	}
	
	if (linger > 0) {
		printf("Lingering for %d second%s...\n", linger, (linger > 1 ? "s" : ""));
		SLEEP_SEC(linger);
	}
	
	printf("Quitting...\n");
	if (is_user_supplied_buffer && (msglen > 0)) {
		free(user_supplied_buffer);
	}
	
	/* Delete allocated source and LBM context */
	lbm_ssrc_delete(ssrc);
	ssrc = NULL;
	
	lbm_context_delete(ctx);
	ctx = NULL;
	return 0;
}


