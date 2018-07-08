/*
"minrcv.c: minimal application that receives messages from a given topic.
 *
 * Copyright (c) 2005-2018 Informatica Corporation. All Rights Reserved.
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

/*
 * A global variable is used to communicate from the receiver callback to
 * the main application thread.
 */
int msgs_rcvd = 0;

int app_rcv_callback(lbm_rcv_t *rcv, lbm_msg_t *msg, void *clientd)  /* See Note #1 */
{
  /* There are several different events that can cause the receiver callback
   * to be called.  Decode the event that caused this.  */
  switch (msg->type)
  {
  case LBM_MSG_DATA:    /* a received message */
    printf("Received %d bytes on topic %s: '%.*s'\n",  /* See note #2 */
           msg->len, msg->topic_name, msg->len, msg->data);

    /* Tell main thread that we've received our message. */
    ++ msgs_rcvd;
    break;

  case LBM_MSG_BOS:
    printf("[%s][%s], Beginning of Transport Session\n", msg->topic_name, msg->source);
    break;

  case LBM_MSG_EOS:
    printf("[%s][%s], End of Transport Session\n", msg->topic_name, msg->source);
    break;

  default:    /* unexpected receiver event */
    printf("Received lbm_msg_t type %x [%s][%s]\n", msg->type, msg->topic_name, msg->source);
    break;
  }  /* switch msg->type */

  return 0;
}  /* app_rcv_callback */


main()
{
  lbm_context_t *ctx;    /* pointer to context object */
  lbm_topic_t *topic;    /* pointer to topic object */
  lbm_rcv_t *rcv;        /* pointer to receiver object */
  int err;               /* return status of lbm functions (non-zero=error) */

#if defined(_MSC_VER)
  /* windows-specific code */
  WSADATA wsadata;
  int wsStat = WSAStartup(MAKEWORD(2,2), &wsadata);
  if (wsStat != 0) {
    printf("line %d: wsStat=%d\n",__LINE__,wsStat); exit(1);
  }
#endif

  err = lbm_context_create(&ctx, NULL, NULL, NULL);  /* See note #3 */
  if (err) {
    printf("line %d: %s\n", __LINE__, lbm_errmsg()); exit(1);
  }

  err = lbm_rcv_topic_lookup(&topic, ctx, "Greeting", NULL);  /* See note #4 */
  if (err) {
    printf("line %d: %s\n", __LINE__, lbm_errmsg()); exit(1);
  }

  err = lbm_rcv_create(&rcv, ctx, topic, app_rcv_callback, NULL, NULL);  /* See note #5 */
  if (err) {
    printf("line %d: %s\n", __LINE__, lbm_errmsg()); exit(1);
  }

  while (msgs_rcvd == 0) {
    SLEEP(1);
  }

  /* Finished all receiving from this topic, delete the receiver object. */
  err = lbm_rcv_delete(rcv);
  if (err) {
    printf("line %d: %s\n", __LINE__, lbm_errmsg()); exit(1);
  }

  /* Do not need to delete the topic object - LBM keeps track of topic
   * objects and deletes them as-needed.  */

  /* Finished with all LBM functions, delete the context object. */
  err = lbm_context_delete(ctx);
  if (err) {
    printf("line %d: %s\n", __LINE__, lbm_errmsg()); exit(1);
  }

#if defined(_MSC_VER)
  WSACleanup();
#endif
}  /* main */
