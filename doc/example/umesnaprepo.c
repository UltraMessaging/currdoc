/*
  Copyright (c) 2005-2020 Informatica Corporation  Permission is granted to licensees to use
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

#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <time.h>
#ifdef _WIN32
	#include <winsock2.h>
#else
	#include <errno.h>
	#include <sys/socket.h>
	#include <netinet/in.h>
	#include <arpa/inet.h>
#endif
#include "replgetopt.h"
#include <lbm/lbm.h>
#include <lbm/lbmmon.h>
#include <lbm/umeprofile.h>
#include "lbm-example-util.h"

const char profile_repo_purpose[] = "Purpose: "
"application presents store repository state and cache file contents."
;

const char profile_repo_usage[] =
"Usage: umesnaprepo -s state_dir [options]\n"
"Available options:\n"
"  -c, --cache-dir=PATH     cache file search PATH\n"
"  -h, --help               display this help and exit\n"
"  -n, --no-checksum        disable cache checksum checking\n"
"  -p, --parse              enable LBM header parsing\n"
"  -s, --state-dir=NUM      state file search PATH [required]\n"
"  -t, --truncate=NUM       limit cache message displays to NUM bytes\n"
"  -T, --terse              summarize cache and skip cache message displays\n"
;

const char * OptionString = "c:hnps:t:T";
const struct option OptionTable[] =
{
	{ "cache-dir", required_argument, NULL, 'c' },
	{ "help", no_argument, NULL, 'h' },
	{ "no-checksum", no_argument, NULL, 'n' },
	{ "parse", no_argument, NULL, 'p' },
	{ "state-dir", required_argument, NULL, 's' },
	{ "truncate", required_argument, NULL, 't' },
	{ "terse", no_argument, NULL, 'T' },
	{ NULL, 0, NULL, 0 }
};

struct Options {
	char cache_file_search_path[1024];	/* search path to repository cache files */
	char state_file_search_path[1024];	/* search path to repository state files */
	int truncate_length;				/* truncate length of displayed message body */
	int truncate;						/* flag to control displayed message body length */
	int check_checksum;					/* flag to control cache checksum checking */
	int parse;							/* flag to control LBM header parsing */
	int skip_cache;						/* flag to control cache file searches */
	int terse;							/* flag to control cache displays */
} profile_repo_options;

#define TRUNCATE_MSG_LENGTH_DEFAULT 64

#define MIN(a,b) (((a) < (b)) ? (a) : (b))

static const char *hexdump(const char *buffer, int size)
{
	int i, j;
	unsigned char c;
	static char hexout[256];
	char *ph = hexout;
	size = MIN(size, ((sizeof(hexout) / 2) - 1));

	for (i = 0; i < (size >> 4); i++) {
		for (j = 0; j < 16; j++) {
			c = buffer[(i << 4) + j];
			sprintf(ph, "%02x", c);
			ph += 2;
		}
	}
	for (i = 0; i < size % 16; i++) {
		c = buffer[size - size % 16 + i];
		sprintf(ph, "%02x", c);
		ph += 2;
	}
	return hexout;
}

void process_cmdline(int argc, char **argv, struct Options *opts)
{
	int c, errflag = 0;
	int state_path = 0;

	memset(opts, 0, sizeof(*opts));
	opts->cache_file_search_path[0] = '\0';
	opts->state_file_search_path[0] = '\0';
	opts->truncate = 0;										/* truncation disabled by default */
	opts->check_checksum = 1;								/* checksum checking enabled by default */
	opts->skip_cache = 1;									/* skip cache files by default */
	opts->truncate_length = TRUNCATE_MSG_LENGTH_DEFAULT;

	while ((c = getopt_long(argc, argv, OptionString, OptionTable, NULL)) != EOF)
	{
		switch (c)
		{
		case 'c':
			strncpy(opts->cache_file_search_path, optarg, sizeof(opts->cache_file_search_path));
			opts->skip_cache = 0;
			break;
		case 's':
			strncpy(opts->state_file_search_path, optarg, sizeof(opts->state_file_search_path));
			state_path = 1;
			break;
		case 'h':
			fprintf(stderr, "%s\n%s\n%s\n%s", argv[0], lbm_version(), profile_repo_purpose, profile_repo_usage);
			exit(0);
		case 'n':
			opts->check_checksum = 0;
			break;
		case 'p':
			opts->parse = 1;
			break;
		case 't':
			opts->truncate_length = atoi(optarg);
			opts->truncate = 1;
			break;
		case 'T':
			opts->terse = 1;
			break;
		default:
			errflag++;
			break;
		}
	}
	if ((errflag != 0) || !state_path) {
		fprintf(stderr, "%s\n%s\n%s", argv[0], lbm_version(), profile_repo_usage);
		exit(1);
	}
	if (opts->skip_cache) {
		if (opts->truncate) {
			fprintf(stderr, "Notice: Skipping cache files; -t option ignored\n");
		}
		if (opts->terse) {
			fprintf(stderr, "Notice: Skipping cache files; -T option ignored\n");
		}
	}
	else {
		if (opts->terse && opts->truncate) {
			fprintf(stderr, "Notice: -T option overrides truncation; -t option ignored\n");
		}
	}
}

void display_msg(char *buffer, int buffer_len, int truncate_length)
{
	int i, j, resize_len;
	unsigned char c;
	char textver[20];

	resize_len = (buffer_len > truncate_length) ? truncate_length : buffer_len;	/* Truncate long messages */
	buffer[resize_len] = 0;
	for (i = 0; i < (resize_len >> 4); i++) {
		for (j = 0; j < 16; j++) {
			c = buffer[(i << 4) + j];
			printf("%02x ", c);
			textver[j] = ((c < 0x20) || (c>0x7e)) ? '.' : c;
		}
		textver[j] = 0;
		printf("\t%s\n", textver);
	}
	for (i = 0; i < resize_len % 16; i++) {
		c = buffer[resize_len - resize_len % 16 + i];
		printf("%02x ", c);
		textver[i] = ((c < 0x20) || (c>0x7e)) ? '.' : c;
	}
	for (i = resize_len % 16; i < 16; i++) {
		printf("   ");
		textver[i] = ' ';
	}
	textver[i] = 0;
	printf("\t%s\n", textver);
	if (buffer_len > truncate_length) {
		int i = buffer_len - truncate_length;
		printf(" ...%d message byte%s truncated...\n\n", i, (i == 1)? "" : "s");
	}
}

static void print_repo_state(lbm_srp_repo_t *srp_repo, int parse, int skip_cache, int truncate_length, int terse) {
	printf("state_filename: %s\n", srp_repo->state_filename);
	printf("cache_filename: %s\n", srp_repo->cache_filename);
	printf("repo_status: %d\n", srp_repo->repo_status);
	if (srp_repo->repo_status != LBM_SRP_REPO_VALID) {
		printf("error_info: 0x%08x\n", srp_repo->error_info);
	}
	else {
		int i;
		struct in_addr sin_addr;
		unsigned d[4] = { 0, 0, 0, 0 };
		lbm_uint32_t ume_stored_version = 0;

		ume_stored_version = srp_repo->ume_stored_version;
		for (i = 0; i < 4; ++i) {
			d[i] = ume_stored_version & 0xff;
			ume_stored_version >>= 8;
		}
		printf("ume_stored_version: %d.%d.%d.%d\n", d[0], d[1], d[2], d[3]);
		printf("topicname [%s]\n", srp_repo->topicname);
		printf("transport_idx: %u\n", srp_repo->transport_idx);
		printf("topic_idx: %u\n", srp_repo->topic_idx);
		sin_addr.s_addr = srp_repo->src_addr;
		printf("src_addr: %s\n", inet_ntoa(sin_addr));
		printf("src_port: %u\n", ntohs(srp_repo->src_port));
		printf("store_id: %u\n", srp_repo->store_id);
		printf("num_rcvs: %u\n", srp_repo->num_rcvs);
		printf("num_stores: %u\n", srp_repo->num_stores);
		printf("num_grps: %u\n", srp_repo->num_grps);
		printf("sid: %lu\n", srp_repo->sid);
		printf("otid: %s\n", hexdump((char *)srp_repo->otid, LBM_OTID_BLOCK_SZ));
		printf("ctxinst: %s\n", hexdump((char *)srp_repo->ctxinst, LBM_CONTEXT_INSTANCE_BLOCK_SZ));
		printf("rpp_mode: %u\n", srp_repo->rpp_mode);
		printf("repo_type: %u\n", srp_repo->repo_type);
		printf("considered_src_activity_tmo: %lu\n", srp_repo->considered_src_activity_tmo);
		printf("considered_src_state_lifetime: %lu\n", srp_repo->considered_src_state_lifetime);
		printf("sz_threshold: %lu\n", srp_repo->sz_threshold);
		printf("sz_limit: %lu\n", srp_repo->sz_limit);
		printf("disk_sz_limit: %lu\n", srp_repo->disk_sz_limit);
		printf("write_delay: %u\n", srp_repo->write_delay);
		printf("src_flightsz_bytes: %lu\n", srp_repo->src_flightsz_bytes);
		printf("src_domain_id: %u\n", srp_repo->src_domain_id);
		printf("allow_ack_on_reception: %u\n", srp_repo->allow_ack_on_reception);
		printf("use_proxy: %u\n", srp_repo->use_proxy);
		if (!skip_cache) {
			printf("Repository cache:\n");
			printf("    number of messages: %d\n", srp_repo->num_msgs);
			printf("    number of duplicate messages: %d\n", srp_repo->num_msg_duplicates);
			printf("    lowest message sequence number: %d\n", srp_repo->low_sqn);
			printf("    highest message sequence number: %d\n", srp_repo->high_sqn);
			printf("    disk byte offset of the lowest sequence number: %ld\n", srp_repo->start_offset);
			printf("    disk byte offset of the highest sequence number: %ld\n", srp_repo->end_offset);
		}
		for (i = 0; i < srp_repo->num_rcvs; ++i) {
			printf("Receiver %d\n", i);
			printf("    regid: %u\n", srp_repo->rcvs[i]->regid);
			printf("    sqn: %u\n", srp_repo->rcvs[i]->sqn);
			printf("    store_id: %u\n", srp_repo->rcvs[i]->store_id);
			printf("    rcv_port: %u\n", ntohs(srp_repo->rcvs[i]->rcv_port));
			sin_addr.s_addr = srp_repo->rcvs[i]->rcv_addr;
			printf("    rcv_addr: %s\n", inet_ntoa(sin_addr));
			printf("    transport_idx: %u\n", srp_repo->rcvs[i]->transport_idx);
			printf("    topic_idx: %u\n", srp_repo->rcvs[i]->topic_idx);
			printf("    sid: %lu\n", srp_repo->rcvs[i]->sid);
			printf("    flags: 0x%02X\n", srp_repo->rcvs[i]->flags);
			printf("    otid: %s\n", hexdump((char *)srp_repo->rcvs[i]->otid, LBM_OTID_BLOCK_SZ));
			printf("    ctxinst: %s\n", hexdump((char *)srp_repo->rcvs[i]->ctxinst, LBM_CONTEXT_INSTANCE_BLOCK_SZ));
			printf("    rcv_domain_id: %u\n", srp_repo->rcvs[i]->rcv_domain_id);
			printf("    considered_activity_tmo: %lu\n", srp_repo->rcvs[i]->considered_activity_tmo);
			printf("    considered_state_lifetime: %lu\n", srp_repo->rcvs[i]->considered_state_lifetime);
		}
		if (!skip_cache && (srp_repo->num_msgs > 0) && !terse) {
			char msg_buffer[LBM_SRP_DISK_MAX_CKSUM_MSG_LEN];
			int result, sqn;
			lbm_srp_repo_msg_t repo_msg;

			repo_msg.buff = msg_buffer;
			for (sqn = srp_repo->low_sqn; sqn <= srp_repo->high_sqn; ++sqn) {
				result = lbm_srp_get_repo_message(srp_repo, sqn, &repo_msg);
				if (result < 0) {
					printf("Message sqn [%u] read failed; error code [%d] error info [%d]\n", sqn, srp_repo->repo_status, srp_repo->error_info);
				}
				else if (result == 0) {
					printf("Message sqn: %u was unrecoverably lost.\n", sqn);
				}
				else {
					printf("Message sqn [%u]:\n", repo_msg.sqn);
					printf("   tsp: %ld.%ld\n", repo_msg.tsp.tv_sec, repo_msg.tsp.tv_usec);
					printf("   disk_len: %lu\n", repo_msg.disk_len);
					printf("   disk_offset: %lu\n", repo_msg.disk_offset);
					printf("   flags: 0x%02x\n", repo_msg.flags);
					if (repo_msg.disk_len == 0) {
						printf("Message body: ...empty\n");
					}
					else {
						if (parse == 0) {
							printf("Message body:\n");
							display_msg(msg_buffer, repo_msg.disk_len, truncate_length);
						}
						else {
							printf("LBMC header:\n");
							printf("   ver_type: 0x%02X\n", repo_msg.lbmc_ver_type);
							printf("   next_hdr: %u\n", repo_msg.lbmc_next_hdr);
							printf("   msglen: %u\n", repo_msg.lbmc_msglen);
							printf("   tidx: %u\n", repo_msg.lbmc_tidx);
							printf("   sqn: %u\n", repo_msg.lbmc_sqn);
							if (repo_msg.fragment) {				/* this message is a fragment */
								printf("   Fragment header:\n");
								printf("      next_hdr: %u\n", repo_msg.frag_next_hdr);
								printf("      hdr_len: %u\n", repo_msg.frag_hdr_len);
								printf("      flags: 0x%04X\n", repo_msg.frag_flags);
								printf("      first_sqn: %u\n", repo_msg.frag_first_sqn);
								printf("      offset: %u\n", repo_msg.frag_offset);
								printf("      len: %u\n", ntohl(repo_msg.frag_len));
							}
							printf("Message body:\n");
							display_msg(msg_buffer + repo_msg.lbmc_msg_offset, repo_msg.disk_len - repo_msg.lbmc_msg_offset, truncate_length);
						}
					}
				}
			}
		}
		else if (skip_cache) {
			printf("***cache skipped\n");
		} else {
			if (terse) {
				printf("***cache messages skipped\n");
			}
			else {
				printf("***cache empty\n");
			}
		}
		printf("\n");
	}
}

int main(int argc, char **argv)
{
	struct Options *opts = &profile_repo_options;
	const lbm_srp_t *srp_handle;
	lbm_srp_repo_t *srp_repo;
	int rc, repo_idx, num_repos = 0;
	char *cache_file_search_path;

	process_cmdline(argc, argv, opts);

	cache_file_search_path = (opts->skip_cache) ? NULL : opts->cache_file_search_path;
	if ((num_repos = lbm_srp_create(opts->state_file_search_path, cache_file_search_path, opts->check_checksum, &srp_handle)) < 0) {
		exit(1);
	}

	for (repo_idx = 0; repo_idx < num_repos; ++repo_idx) {
		printf("Examining repository at index: %d\n", repo_idx);
		rc = lbm_srp_get_repo_state(&srp_handle, repo_idx, &srp_repo);
		switch (rc) {
		case 1:
			print_repo_state(srp_repo, opts->parse, opts->skip_cache, opts->truncate_length, opts->terse);
			if (lbm_srp_free_repo_state(srp_repo) < 0) {
				exit(1);
			}
			break;
		case 0:
			printf("***repository skipped\n\n");
			break;
		default:	/* error condition */
			exit(1);
		}
	}

	if (lbm_srp_delete(&srp_handle) < 0) {
		exit(1);
	}

	exit(0);
}

