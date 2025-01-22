/*
"minsrc.c: minimal application that sends to a given topic.
 *
 * (C) Copyright 2005,2025 Informatica Inc. All Rights Reserved.
 * Permission is granted to licensees to use
 * or alter this software for any purpose, including commercial applications,
 * according to the terms laid out in the Software License Agreement.
 *
 * This source code example is provided by Informatica for educational
 * and evaluation purposes only.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND INFORMATICA DISCLAIMS ALL WARRANTIES
 * EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION, ANY IMPLIED WARRANTIES OF
 * NON-INFRINGEMENT, MERCHANTABILITY OR FITNESS FOR A PARTICULAR
 * PURPOSE.  INFORMATICA DOES NOT WARRANT THAT USE OF THE SOFTWARE WILL BE
 * UNINTERRUPTED OR ERROR-FREE.  INFORMATICA SHALL NOT, UNDER ANY CIRCUMSTANCES, BE
 * LIABLE TO LICENSEE FOR LOST PROFITS, CONSEQUENTIAL, INCIDENTAL, SPECIAL OR
 * INDIRECT DAMAGES ARISING OUT OF OR RELATED TO THIS AGREEMENT OR THE
 * TRANSACTIONS CONTEMPLATED HEREUNDER, EVEN IF INFORMATICA HAS BEEN APPRISED OF
 * THE LIKELIHOOD OF SUCH DAMAGES.
 */

/* Explanatory notes referenced in this file are in the Quick Start guide. */

#include <stdio.h>

#if defined(_MSC_VER)
/* Windows-only includes */
#include <winsock2.h>
#define SLEEP(s) Sleep((s)*1000)
#else
/* Unix-only includes */
#include <stdlib.h>
#include <unistd.h>
#define SLEEP(s) sleep(s)
#endif

#include <lbm/lbm.h>

main()
{
  lbm_context_t *ctx;    /* pointer to context object */
  lbm_topic_t *topic;    /* pointer to topic object */
  lbm_src_t *src;        /* pointer to source (sender) object */
  int err;               /* return status of lbm functions (true=error) */

#if defined(_MSC_VER)
  /* windows-specific code */
  WSADATA wsadata;
  int wsStat = WSAStartup(MAKEWORD(2,2), &wsadata);
  if (wsStat != 0) {
    printf("line %d: wsStat=%d\n",__LINE__,wsStat); exit(1);
  }
#endif

  err = lbm_context_create(&ctx, NULL, NULL, NULL);  /* See Note #1 */
  if (err) {
    printf("line %d: %s\n", __LINE__, lbm_errmsg()); exit(1);
  }

  err = lbm_src_topic_alloc(&topic, ctx, "Greeting", NULL);  /* See Note #2 */
  if (err) {
    printf("line %d: %s\n", __LINE__, lbm_errmsg()); exit(1);
  }

  err = lbm_src_create(&src, ctx, topic, NULL, NULL, NULL);  /* See Note #3 */
  if (err) {
    printf("line %d: %s\n", __LINE__, lbm_errmsg()); exit(1);
  }

  SLEEP(1);  /* See Note #4 */

  err = lbm_src_send(src, "Hello!", 6, LBM_MSG_FLUSH | LBM_SRC_BLOCK);  /* See Note #5 */
  if (err) {
    printf("line %d: %s\n", __LINE__, lbm_errmsg()); exit(1);
  }

  SLEEP(2);  /* See Note #6 */

  /* Finished all sending to this topic, delete the source object. */

  err = lbm_src_delete(src);

  /* Do not need to delete the topic object - LBM keeps track of topic
   * objects and deletes them as-needed.  */

  /* Finished with all LBM functions, delete the context object. */
  err = lbm_context_delete(ctx);

#if defined(_MSC_VER)
  WSACleanup();
#endif
}  /* main */
