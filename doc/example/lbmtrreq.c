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
#include "replgetopt.h"
#include <lbm/lbm.h>
#include <lbm/lbmmon.h>
#include "monmodopts.h"
#include "verifymsg.h"
#include "lbm-example-util.h"

#define TIME_NOT_SET ((lbm_ulong_t)-1)

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
"application that invokes the Topic Resolution Request API."
;

const char usage[] =
"Usage: lbmtrreq [options]\n"
"Available options:\n"
"  -c, --config=FILE     Use LBM configuration file FILE.\n"
"                        Multiple config files are allowed.\n"
"                        Example:  '-c file1.cfg -c file2.cfg'\n"
"  -a, --adverts         Request Advertisements\n"
"  -q, --queries         Request Queries\n"
"  -w, --wildcard        Request Wildcard Queries\n"
"  -A, --ctx-ads         Request Context Advertisements\n"
"  -Q, --ctx-queries     Request Context Queries\n"
"  -I, --gw-interest     Request Gateway Interest\n"
"  -i, --interval=NUM    Interval between request\n"
"  -d, --duration=NUM    Minimum duration of requests\n"
"  -L, --linger=NUM      Linger for NUM seconds before closing context\n"
;

const char * OptionString = "c:i:d:aqwAQIL:";

const struct option OptionTable[] =
{
	{ "config", required_argument, NULL, 'c' },
	{ "interval", required_argument, NULL, 'i' },
	{ "duration", required_argument, NULL, 'd' },
	{ "linger", required_argument, NULL, 'L' },
	{ "adverts", no_argument, NULL, 'a' },
	{ "queries", no_argument, NULL, 'q' },
	{ "wildcard", no_argument, NULL, 'w' },
	{ "ctx-ads", no_argument, NULL, 'A' },
	{ "ctx-queries", no_argument, NULL, 'Q' },
	{ "gw-interest", no_argument, NULL, 'I' },
	{ NULL, 0, NULL, 0 }
};

struct Options {
	lbm_ushort_t flags;
	lbm_ulong_t interval;
	lbm_ulong_t duration;
	lbm_ulong_t linger;
};

void process_cmdline(int argc, char **argv, struct Options *opts)
{
	int c, errflag = 0;

	/* Set default option values */
	memset(opts, 0, sizeof(*opts));
	opts->flags = 0;
	opts->interval = TIME_NOT_SET;
	opts->duration = TIME_NOT_SET;
	opts->linger = TIME_NOT_SET;

	/* Process the command line options, setting local variables with values */
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
			case 'i':
				opts->interval = atoi(optarg);
				break;
			case 'd':
				opts->duration = atoi(optarg);
				break;
			case 'L':
				opts->linger = atoi(optarg);
				break;
			case 'a':
				opts->flags |= LBM_TOPIC_RES_REQUEST_ADVERTISEMENT;
				break;
			case 'q':
				opts->flags |= LBM_TOPIC_RES_REQUEST_QUERY;
				break;
			case 'w':
				opts->flags |= LBM_TOPIC_RES_REQUEST_WILDCARD_QUERY;
				break;
			case 'A':
				opts->flags |= LBM_TOPIC_RES_REQUEST_CONTEXT_ADVERTISEMENT;
				break;
			case 'Q':
				opts->flags |= LBM_TOPIC_RES_REQUEST_CONTEXT_QUERY;
				break;
			case 'I':
				opts->flags |= LBM_TOPIC_RES_REQUEST_GW_REMOTE_INTEREST;
				break;
			default:
				errflag++;
				break;
		}
	}
	if (errflag != 0)
	{
		/* An error occurred processing the command line - dump the LBM version, usage and exit */
		fprintf(stderr, "%s\n%s\n%s\n%s",
			argv[0], lbm_version(), purpose, usage);
		exit(1);
	}
}

/* Logging callback */
int lbm_log_msg(int level, const char *message, void *clientd)
{
	printf("LOG Level %d: %s\n", level, message);
	return 0;
}

int main(int argc, char **argv)
{
	struct Options options,*opts = &options;
	lbm_context_t *ctx;
	lbm_context_attr_t *cattr;

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

	/* Process the different options set by the command line processing */
	process_cmdline(argc,argv,opts);

	if (opts->flags == 0) {
		fprintf(stderr, "No Requests were given. At least one request is required.\n");
		exit(1);
	}

	if (opts->interval == TIME_NOT_SET) {
		printf("No interval given. Using 1000 milliseconds.\n");
		opts->interval = 1000;
	}

	if (opts->duration == TIME_NOT_SET) {
		printf("No duration given. Using 10 seconds.\n");
		opts->duration = 10;
	}

	if (opts->linger == TIME_NOT_SET) {
		printf("No linger given. Using 10 seconds.\n");
		opts->linger = 10;
	}

	if (opts->linger < opts->duration) {
		printf("Linger is less than duration. Context will be deleted before duration expires.\n");
	}

	/* Setup logging callback */
	if (lbm_log(lbm_log_msg, NULL) == LBM_FAILURE) {
		fprintf(stderr, "lbm_log: %s\n", lbm_errmsg());
		exit(1);
	}

	/* Retrieve current context settings */
	if (lbm_context_attr_create(&cattr) == LBM_FAILURE) {
 		fprintf(stderr, "lbm_context_attr_create: %s\n", lbm_errmsg());
 		exit(1);
 	}

	/* Create LBM context (passing in context attributes) */
	if (lbm_context_create(&ctx, cattr, NULL, NULL) == LBM_FAILURE) {
		fprintf(stderr, "lbm_context_create: %s\n", lbm_errmsg());
		exit(1);
	}

	lbm_context_attr_delete(cattr);

	lbm_context_topic_resolution_request(ctx, opts->flags, opts->interval, opts->duration);

	if (opts->linger > 0) {
		printf("Lingering for %lu seconds...\n", opts->linger);
		SLEEP_SEC(opts->linger);
	}

	printf("Deleting context\n");
	lbm_context_delete(ctx);
	ctx = NULL;

	return 0;
}

