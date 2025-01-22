/*
"ume-example-rcv.c: - Persistent example receiver program.
"See Persistence Guide document.

 * (C) Copyright 2005,2025 Informatica Inc. All Rights Reserved.
 * Permission is granted to licensees to use
 * or alter this software for any purpose, including commercial applications,
 * according to the terms laid out in the Software License Agreement.
 -
 - This source code example is provided by Informatica for educational
 - and evaluation purposes only.
 -
 - THE SOFTWARE IS PROVIDED "AS IS" AND INFORMATICA DISCLAIMS ALL WARRANTIES
 - EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION, ANY IMPLIED WARRANTIES OF
 - NON-INFRINGEMENT, MERCHANTABILITY OR FITNESS FOR A PARTICULAR
 - PURPOSE.  INFORMATICA DOES NOT WARRANT THAT USE OF THE SOFTWARE WILL BE
 - UNINTERRUPTED OR ERROR-FREE.  INFORMATICA SHALL NOT, UNDER ANY CIRCUMSTANCES, BE
 - LIABLE TO LICENSEE FOR LOST PROFITS, CONSEQUENTIAL, INCIDENTAL, SPECIAL OR
 - INDIRECT DAMAGES ARISING OUT OF OR RELATED TO THIS AGREEMENT OR THE
 - TRANSACTIONS CONTEMPLATED HEREUNDER, EVEN IF INFORMATICA HAS BEEN APPRISED OF
 - THE LIKELIHOOD OF SUCH DAMAGES.
 */

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

/*callout: callback
 * LBM passes received messages to the application by means of a callback.
 * I.e. the LBM context thread reads the network socket, performs its
 * higher-level protocol functions, and then calls an application-level
 * function that was set up during initialization.  This callback function
 * has some severe limitations placed upon it.  It must execute very quickly;
 * any potentially blocking calls it might make will interfere with the proper
 * execution of the LBM context thread.  One common desire is for the receive
 * function to send an LBM message (via lbm_src_send), however this has the
 * potential to produce a deadlock condition.  If it is desired for the
 * receive callback function to call LBM or other potentially blocking
 * functions, it is strongly advised to make use of an event queue, which
 * causes the callback to be executed from an application thread.  See the
 * example tool lbmrcvq.c for an example of using a receiver event queue.
 */
int app_rcv_callback(lbm_rcv_t *rcv, lbm_msg_t *msg, void *clientd)
{
    /* There are several different events that can cause the receiver callback
     * to be called.  Decode the event that caused this.  */
    switch (msg->type)
    {
    case LBM_MSG_DATA:    /* a received message */
        /*callout: printf
         * Note - printf can block, which is normally a bad idea for a
         * callback (unless an event queue is being used).  However, for
         * this minimal application, only a few messages are expected.
         */
        printf("Received %d bytes on topic %s: '%.*s'\n",
               msg->len, msg->topic_name, msg->len, msg->data);

        /* Tell main thread that we've received our message. */
        ++ msgs_rcvd;
        break;

    default:    /* unexpected receiver event */
        printf( "Unhandled receiver event [%d] from source [%s] with topic [%s]. Refer to https://ultramessaging.github.io/currdoc/doc/example/index.html#unhandledcevents for a detailed description.\n", msg->type, msg->source, msg->topic_name);
        break;
    }  /* switch msg->type */

    return 0;
}  /* app_rcv_callback */


main()
{
    lbm_context_t *ctx;    /* pointer to context object */
    lbm_topic_t *topic;    /* pointer to topic object */
    lbm_rcv_t *rcv;        /* pointer to receiver object */
    int err;               /* return status of lbm functions (true=error) */

#if defined(_MSC_VER)
    /* windows-specific code */
    WSADATA wsadata;
    int wsStat = WSAStartup(MAKEWORD(2,2), &wsadata);
    if (wsStat != 0)
    {
        printf("line %d: wsStat=%d\n",__LINE__,wsStat);
        exit(1);
    }
#endif

    /*callout: context
     * Create a context object.  A context is an environment in which LBM
     * functions.  Note that the first parameter is a pointer to a pointer
     * variable; lbm_context_create writes the pointer to the context
     * object into "ctx".  Also, by passing NULL to the context attribute
     * parameter, the default option values are used. For most applications
     * only a single context is required regardless of how many sources and
     * receivers are created.
     */
    err = lbm_context_create(&ctx, NULL, NULL, NULL);
    if (err)
    {
        printf("line %d: %s\n", __LINE__, lbm_errmsg());
        exit(1);
    }

    /*callout: topic
     * Lookup a topic object.  A topic object is little more than a string
     * (the topic name).  During operation, LBM keeps some state information
     * in the topic object as well.  The topic is bound to the containing
     * context, and will also be bound to a receiver object.  Note that the
     * first parameter is a pointer to a pointer variable; lbm_rcv_topic_lookup
     * writes the pointer to the topic object into "topic".  Also, by passing
     * NULL to the source topic attribute, the default option values are used.
     * The string "UME Example" is the topic string.
     */
    err = lbm_rcv_topic_lookup(&topic, ctx, "UME Example", NULL);
    if (err)
    {
        printf("line %d: %s\n", __LINE__, lbm_errmsg());
        exit(1);
    }

    /*callout: rcv
     * Create the receiver object and bind it to a topic.  Note that the first
     * parameter is a pointer to a pointer variable; lbm_rcv_create writes the
     * pointer to the source object to into "rcv".  The second and third
     * parameters are the function and application data pointers.  When a
     * message is received, the function is called with the data pointer passed
     * in as its last parameter.  The last parameter is an optional event
     * queue (not used in this example).
     */
    err = lbm_rcv_create(&rcv, ctx, topic, app_rcv_callback, NULL, NULL);
    if (err)
    {
        printf("line %d: %s\n", __LINE__, lbm_errmsg());
        exit(1);
    }

    /* Wait until we have received 20 messages, then continue */
    while (msgs_rcvd < 20)
        SLEEP(1);

    /* Finished all receiving from this topic, delete the receiver object. */
    lbm_rcv_delete(rcv);

    /* Do not need to delete the topic object - LBM keeps track of topic
     * objects and deletes them as-needed.  */

    /* Finished with all LBM functions, delete the context object. */
    lbm_context_delete(ctx);

#if defined(_MSC_VER)
    WSACleanup();
#endif
}  /* main */
