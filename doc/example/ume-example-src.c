/*
"ume-example-src.c: - Persistent example receiver program.
"See Persistence Guide document.

 * (C) Copyright 2005,2023 Informatica Inc. All Rights Reserved.
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

main()
{
    lbm_context_t *ctx;         /* pointer to context object */
    lbm_topic_t *topic;         /* pointer to topic object */
    lbm_src_t *src;             /* pointer to source (sender) object */
    int err;                    /* return status of lbm functions (true=error) */
    int i;                      /* counter to be used when sending data */
    char message[64];           /* buffer to hold message that will be sent */
    lbm_src_topic_attr_t * attr;    /* attribute structure for the source */

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

    /*callout: attribute init
     * Initialize the attribute structure to the default values.
     */
    err = lbm_src_topic_attr_create(&attr);
    if (err)
    {
        printf("line %d: %s\n", __LINE__, lbm_errmsg());
        exit(1);
    }

    /*callout: attribute setopt (string)
     * Set the ume_store attribute to use the UME store at 127.0.0.1 on port 14567.
     */
    err = lbm_src_topic_attr_str_setopt(attr, "ume_store", "127.0.0.1:14567");
    if (err)
    {
        printf("line %d: %s\n", __LINE__, lbm_errmsg());
        exit(1);
    }

    /*callout: topic
     * Allocate a topic object.  A topic object is little more than a string
     * (the topic name).  During operation, LBM keeps some state information
     * in the topic object as well.  The topic is bound to the containing
     * context, and will also be bound to a source object.  Note that the
     * first parameter is a pointer to a pointer variable; lbm_src_topic_alloc
     * writes the pointer to the topic object into "topic".  Also, by passing
     * in an attribute structure, it will set the attributes to what is passed.
     * The string "UME Example" is the topic string.
     */
    err = lbm_src_topic_alloc(&topic, ctx, "UME Example", attr);
    if (err)
    {
        printf("line %d: %s\n", __LINE__, lbm_errmsg());
        exit(1);
    }

    /*callout: src
     * Create the source object.  A source object is used to send messages.
     * It must be bound to a topic.  Note that the first parameter is a pointer
     * to a pointer variable; lbm_src_create writes the pointer to the source
     * object to into "src".  Use of the third and fourth parameters is
     * optional but recommended in a production program - some source events
     * can be important to the application.  The last parameter is an optional
     * event queue (not used in this example).
     */
    err = lbm_src_create(&src, ctx, topic, NULL, NULL, NULL);
    if (err)
    {
        printf("line %d: %s\n", __LINE__, lbm_errmsg());
        exit(1);
    }

    /*callout: sleep1
     * Need to wait for receivers to find us.  See https://communities.informatica.com/infakb/faq/5/Pages/80061.aspx
     * for details.
     */
    SLEEP(3);

    /* Send 20 messages with a 1 second pause between them */
    for (i = 1; i <= 20; i++)
    {
        /* Create a unique message for this iteration */
        sprintf(message, "UME Message %02d", i);

        /*callout: send
         * Send a message to the "UME Example" topic.  The flags make sure the
         * call to lbm_src_send doesn't return until the message is sent.
         */
        err = lbm_src_send(src, message, 15, LBM_MSG_FLUSH | LBM_SRC_BLOCK);
        if (err)
        {
            printf("line %d: %s\n", __LINE__, lbm_errmsg());
            exit(1);
        }

        /*callout: sleep2
         * Wait 1 second before sending next message.
         */
        SLEEP(1);
    }

    /*callout: sleep2
     * Even though the message is sent, some transports may need a bit of
     * time to request re-transmission.  If the above lbm_src_send call
     * didn't include the flags, some time might also be needed to empty
     * the batching buffer.
     */
    SLEEP(2);

    /* Finished all sending to this topic, delete the source object. */
    lbm_src_delete(src);

    /* Do not need to delete the topic object - LBM keeps track of topic
     * objects and deletes them as-needed.  */

    /* Finished with all LBM functions, delete the context object. */
    lbm_context_delete(ctx);

#if defined(_MSC_VER)
    WSACleanup();
#endif
}  /* main */
