import com.latencybusters.lbm.*;

import java.text.NumberFormat;
import java.util.Iterator;

import gnu.getopt.Getopt;
import gnu.getopt.LongOpt;

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

class umqrcv {
	private static final int DEFAULT_MAX_NUM_SRCS = 10000;
	private static int nstats = 10;
	private static int reap_msgs = 0;
	private static int stat_secs = 0;
	private static boolean eventq = false;
	private static boolean sequential = true;
	private static int verbose = 0;
	private static boolean end_on_eos = false;
	private static boolean summary = false;
	private static String broker = null;
	private static String purpose = "Purpose: Receive messages on a single topic.";

	private static String usage =
"Usage: umqrcv [options] topic\n"+ 
"Available options:\n"+ 
"  -B broker = use broker given by address.\n"+ 
"  -c filename = read config file filename\n"+ 
"  -D = deregister upon exit\n"+ 
"  -E = exit after source ends\n"+ 
"  -e = use LBM embedded mode\n"+ 
"  -X num_msgs = send an eXplicit ACK every num_msgs messages\n"+ 
"  -i offset = use offset to calculate Registration ID\n"+ 
"              (as source registration ID + offset)\n"+ 
"              offset of 0 forces creation of regid by store\n"+ 
"  -I ID = set Receiver Type ID to ID\n"+ 
"  -N seqnum_offset = display recovery sequence number info and set low seqnum to low+seqnum_offset\n"+ 
"  -S = exit after source ends, print throughput summary\n"+ 
"  -s num_secs = print statistics every num_secs along with bandwidth\n"+ 
"  -h = help\n"+ 
"  -q = use an LBM event queue\n"+ 
"  -r msgs = delete receiver after msgs messages\n"+ 
"  -v = be verbose about each message\n"+ 
"\nMonitoring options:\n"+ 
"  --monitor-ctx NUM = monitor context every NUM seconds\n"+ 
"  --monitor-rcv NUM = monitor receiver every NUM seconds\n"+ 
"  --monitor-transport TRANS = use monitor transport module TRANS\n"+ 
"                              TRANS may be `lbm', `udp', or `lbmsnmp', default is `lbm'\n"+ 
"  --monitor-transport-opts OPTS = use OPTS as transport module options\n"+ 
"  --monitor-format FMT = use monitor format module FMT\n"+ 
"                         FMT may be `csv' or `pb', default is `csv'\n"+ 
"  --monitor-format-opts OPTS = use OPTS as format module options\n"+ 
"  --monitor-appid ID = use ID as application ID string\n"
;

	private static LBMContextThread ctxthread = null;

	public static void main(String[] args) {
		int monitor_context_ivl = 0;
		boolean monitor_context = false;
		int monitor_receiver_ivl = 0;
		boolean monitor_receiver = false;
		int mon_transport = LBMMonitor.TRANSPORT_LBM;
		int mon_format = LBMMonitor.FORMAT_CSV;
		String mon_format_options = "";
		String mon_transport_options = "";
		String application_id = null;
		long rcv_type_id = 0;
		boolean dereg = false;
		LBMObjectRecycler objRec = new LBMObjectRecycler();
		
		LBM lbm = null;
		try {
			lbm = new LBM();
		} catch (LBMException ex) {
			System.err.println("Error initializing LBM: " + ex.toString());
			System.exit(1);
		}

		// Set up a logger here. Without setting a logger, UM defaults to printing logs to standard out.
		// Most users have their own logging infrastructure they integrate with.
		// Some users include log4j. Here's an example of setting it up:
		// org.apache.log4j.Logger logger;
		// logger = org.apache.log4j.Logger.getLogger("lbmhfxrcv");
		// org.apache.log4j.BasicConfigurator.configure();
		// log4jLogger lbmlogger = new log4jLogger(logger);
		// lbm.setLogger(lbmlogger);

		LongOpt[] longopts = new LongOpt[7];
		final int OPTION_MONITOR_CTX = 2;
		final int OPTION_MONITOR_RCV = 3;
		final int OPTION_MONITOR_TRANSPORT = 4;
		final int OPTION_MONITOR_TRANSPORT_OPTS = 5;
		final int OPTION_MONITOR_FORMAT = 6;
		final int OPTION_MONITOR_FORMAT_OPTS = 7;
		final int OPTION_MONITOR_APPID = 8;

		longopts[0] = new LongOpt("monitor-ctx", LongOpt.REQUIRED_ARGUMENT,
				null, OPTION_MONITOR_CTX);
		longopts[1] = new LongOpt("monitor-rcv", LongOpt.REQUIRED_ARGUMENT,
				null, OPTION_MONITOR_RCV);
		longopts[2] = new LongOpt("monitor-transport",
				LongOpt.REQUIRED_ARGUMENT, null, OPTION_MONITOR_TRANSPORT);
		longopts[3] = new LongOpt("monitor-transport-opts",
				LongOpt.REQUIRED_ARGUMENT, null, OPTION_MONITOR_TRANSPORT_OPTS);
		longopts[4] = new LongOpt("monitor-format", LongOpt.REQUIRED_ARGUMENT,
				null, OPTION_MONITOR_FORMAT);
		longopts[5] = new LongOpt("monitor-format-opts",
				LongOpt.REQUIRED_ARGUMENT, null, OPTION_MONITOR_FORMAT_OPTS);
		longopts[6] = new LongOpt("monitor-appid", LongOpt.REQUIRED_ARGUMENT,
				null, OPTION_MONITOR_APPID);

		Getopt gopt = new Getopt("umqrcv", args, "+B:c:DeEi:I:r:R:s:ShqvX:N:", longopts);
		int c = -1;
		boolean error = false;
		while ((c = gopt.getopt()) != -1) {
			try {
				switch (c) {
					case OPTION_MONITOR_APPID:
						application_id = gopt.getOptarg();
						break;
					case OPTION_MONITOR_CTX:
						monitor_context = true;
						monitor_context_ivl = Integer.parseInt(gopt.getOptarg());
						break;
					case OPTION_MONITOR_RCV:
						monitor_receiver = true;
						monitor_receiver_ivl = Integer.parseInt(gopt.getOptarg());
						break;
					case OPTION_MONITOR_TRANSPORT:
						if (gopt.getOptarg().compareToIgnoreCase("lbm") == 0)
						{
							mon_transport = LBMMonitor.TRANSPORT_LBM;
						}
						else
						{
							if (gopt.getOptarg().compareToIgnoreCase("udp") == 0)
							{
								mon_transport = LBMMonitor.TRANSPORT_UDP;
							}
							else
							{
								if (gopt.getOptarg().compareToIgnoreCase("lbmsnmp") == 0)
								{
									mon_transport = LBMMonitor.TRANSPORT_LBMSNMP;
								}
								else
								{
									error = true;
								}
							}
						}
						break;
					case OPTION_MONITOR_TRANSPORT_OPTS:
						mon_transport_options += gopt.getOptarg();
						break;
					case OPTION_MONITOR_FORMAT:
						if (gopt.getOptarg().compareToIgnoreCase("csv") == 0)
							mon_format = LBMMonitor.FORMAT_CSV;
						else if (gopt.getOptarg().compareToIgnoreCase("pb") == 0)
							mon_format = LBMMonitor.FORMAT_PB;
						else
							error = true;
						break;
					case OPTION_MONITOR_FORMAT_OPTS:
						mon_format_options += gopt.getOptarg();
						break;
					case 'B':
						broker = gopt.getOptarg();
						break;
					case 'c':
						try {
							LBM.setConfiguration(gopt.getOptarg());
						} catch (LBMException ex) {
							System.err.println("Error setting LBM configuration: "
									+ ex.toString());
							System.exit(1);
						}
						break;
					case 'D':
						dereg = true;
						break;
					case 'E':
						end_on_eos = true;
						break;
					case 'e':
						sequential = false;
						break;
					case 'S':
						end_on_eos = true;
						summary = true;
						break;
					case 's':
						stat_secs = Integer.parseInt(gopt.getOptarg());
						break;
					case 'h':
						print_help_exit(0);
					case 'I':
						rcv_type_id = Long.parseLong(gopt.getOptarg());
						if(rcv_type_id < 0)
						  error = true;
						break;
					case 'q':
						eventq = true;
						break;
					case 'r':
						reap_msgs = Integer.parseInt(gopt.getOptarg());
						break;
					case 'v':
						verbose++;
						break;
					default:
						error = true;
				}
				if (error)
					break;
			} catch (Exception e) {
				/* type conversion exception */
				System.err.println("umqrcv: error\n" + e);
				print_help_exit(1);
			}
		}
		if (error || gopt.getOptind() >= args.length) {
			/* An error occurred processing the command line - print help and exit */
			print_help_exit(1);
		}
		LBMContextAttributes ctx_attr = null;
		try {
			ctx_attr = new LBMContextAttributes();
			ctx_attr.setObjectRecycler(objRec, null);
		} catch (LBMException ex) {
			System.err.println("Error creating context attributes: "
					+ ex.toString());
			System.exit(1);
		}
		try {
			if (sequential) {
				ctx_attr.setProperty("operational_mode", "sequential");
			} else {
				// The default for operational_mode is embedded, but set it
				// explicitly in case a configuration file was specified with
				// a different value.
				ctx_attr.setProperty("operational_mode", "embedded");
			}
		} catch (LBMRuntimeException ex) {
			System.err.println("Error setting operational mode: "
					+ ex.toString());
			System.exit(1);
		}
		
		UMQRcvCtxCB ctxcb = new UMQRcvCtxCB(verbose);
		ctx_attr.setContextEventCallback(ctxcb);
		
		if (broker != null) {
			ctx_attr.setProperty("broker", broker);
		}
		
		LBMContext ctx = null;
		try {
			ctx = new LBMContext(ctx_attr);
		} catch (LBMException ex) {
			System.err.println("Error creating context: " + ex.toString());
			System.exit(1);
		}
		LBMReceiverAttributes rcv_attr = null;
		try
		{
			rcv_attr = new LBMReceiverAttributes();
			rcv_attr.setObjectRecycler(objRec, null);
		}
		catch (LBMException ex)
		{
			System.err.println("Error creating receiver attributes: "
					+ ex.toString());
			System.exit(1);
		}

		if (rcv_type_id > 0) {
			try {
			    rcv_attr.setValue("umq_receiver_type_id", Long.toString(rcv_type_id));
			} 
			catch (LBMException e)
			{
			    System.err.println("Error setting umq_receiver_type_id="+rcv_type_id + e.toString());
			    System.exit(1);
			} 
		}

		LBMTopic topic = null;
		try {
			topic = ctx.lookupTopic(args[gopt.getOptind()], rcv_attr);
		} catch (LBMException ex) {
			System.err.println("Error looking up topic: " + ex.toString());
			System.exit(1);
		}
		UMQRcvEventQueue evq = null;
		UMQRcvReceiver rcv = new UMQRcvReceiver(verbose, end_on_eos, summary);
		LBMReceiver lbmrcv = null;
		try {
			if (eventq) {
				if (sequential) {
					System.err.println("Sequential mode with event queue in use");
				} else {
					System.err.println("Embedded mode with event queue in use");
				}
				try {
					evq = new UMQRcvEventQueue();
				} catch (LBMException ex) {
					System.err.println("Error creating event queue: "
							+ ex.toString());
					System.exit(1);
				}
				lbmrcv = new LBMReceiver(ctx, topic, rcv, null, evq);
				ctx.enableImmediateMessageReceiver(evq);
			} else if (sequential) {
				System.err.println("No event queue, sequential mode");
				lbmrcv = new LBMReceiver(ctx, topic, rcv, null);
				ctx.enableImmediateMessageReceiver();
			} else {
				System.err.println("No event queue, embedded mode");
				lbmrcv = new LBMReceiver(ctx, topic, rcv, null);
				ctx.enableImmediateMessageReceiver();
			}
		} catch (LBMException ex) {
			System.err.println("Error creating receiver: " + ex.toString());
			System.exit(1);
		}

		// This immediate-mode receiver is *only* used for topicless
		// immediate-mode sends. Immediate sends that use a topic
		// are received with normal receiver objects.
		ctx.addImmediateMessageReceiver(rcv);

		long start_time;
		long end_time;
		long last_lost = 0, lost_tmp = 0, lost = 0;
		if (sequential) {
			// create thread to handle event processing
			ctxthread = new LBMContextThread(ctx);
			ctxthread.start();
		}
		LBMMonitorSource lbmmonsrc = null;
		if (monitor_context || monitor_receiver) {
			try {
				lbmmonsrc = new LBMMonitorSource(mon_format,
						mon_format_options, mon_transport,
						mon_transport_options);
			} catch (LBMException ex) {
				System.err.println("Error creating monitor source: "
						+ ex.toString());
				System.exit(1);
			}
			try {
				if (monitor_context)
					lbmmonsrc.start(ctx, application_id, monitor_context_ivl);
				else
					lbmmonsrc.start(lbmrcv, application_id,
							monitor_receiver_ivl);
			} catch (LBMException ex) {
				System.err.println("Error enabling monitoring: "
						+ ex.toString());
				System.exit(1);
			}
		}
		LBMReceiverStatistics stats = null;
		boolean have_stats;
		long stat_millis = stat_secs * 1000;
		long stat_time = System.currentTimeMillis() + stat_millis;
		while (true) {
			start_time = System.currentTimeMillis();
			if (eventq) {
				evq.run(1000);
			} else {
				try {
					Thread.sleep(1000);
				} catch (InterruptedException e) { }
			}
			end_time = System.currentTimeMillis();
			
			have_stats = false;
			while (!have_stats){
				try{
					stats = lbmrcv.getStatistics(nstats);
					have_stats = true;
				}
				catch (LBMException ex){
					/* Double the number of stats passed to the API to be retrieved */
					/* Do so until we retrieve stats successfully or hit the max limit */
					nstats *= 2;
					if (nstats > DEFAULT_MAX_NUM_SRCS){
						System.err.println("Error getting receiver statistics: " + ex.toString());
						System.exit(1);
					}
					/* have_stats is still false */
				}
			}
			
			/* If we get here, we have the stats */
			try{
				lost = 0;
				for (int i = 0; i < stats.size(); i++){
					lost += stats.lost(i);
				}
				/* Account for loss in previous iteration */
				lost_tmp = lost;
				if (last_lost <= lost){
					lost -= last_lost;
				}
				else{
					lost = 0;
				}
				last_lost = lost_tmp;
				
				print_bw(end_time - start_time, rcv.msg_count, rcv.byte_count,
						rcv.unrec_count, lost, rcv.burst_loss, rcv.rx_msgs, rcv.otr_msgs);
				rcv.msg_count = 0;
				rcv.byte_count = 0;
				rcv.unrec_count = 0;
				rcv.burst_loss = 0;
				rcv.rx_msgs = 0;
				rcv.otr_msgs = 0;
				
				if (stat_secs != 0 && stat_time <= end_time){
					stat_time = System.currentTimeMillis() + stat_millis;
					print_stats(stats, evq);
				}
				objRec.doneWithReceiverStatistics(stats);
			}
			catch(LBMException ex){
				System.err.println("Error manipulating receiver statistics: " + ex.toString());
				System.exit(1);
			}
			
			if (reap_msgs != 0 && rcv.total_msg_count >= reap_msgs){
				if(dereg){
				    try{
						lbmrcv.deregister();
				    }
				    catch (LBMException ex){
						System.err.println("Error deregistering from queues: " + ex.toString());
						System.exit(1);
				    }
				}
				else{
				    rcv.rcv_done = true;
				}	
			}

			if(rcv.rcv_done)
			  break;
		}
		if (ctxthread != null) {
			ctxthread.terminate();
		}
		if (lbmmonsrc != null) {
			try
			{
				lbmmonsrc.close();
			}
			catch (LBMException ex)
			{
				System.err.println("Error closing monitor source: " + ex.toString());
			}
		}
		System.err.println("Quitting.... received " + rcv.total_msg_count
				+ " messages");
		
		objRec.close();
		try
		{
			lbmrcv.close();
		}
		catch (LBMException ex)
		{
			System.err.println("Error closing receiver: " + ex.toString());
		}
		ctx.close();
	}
	
	private static void print_help_exit(int exit_value)
	{
		System.err.println(LBM.version());
		System.err.println(purpose);
		System.err.println(usage);
		System.exit(exit_value);
	}

	private static void print_bw(long msec, long msgs, long bytes, long unrec,
			long lost, long burst_loss, long rx_msgs, long otr_msgs) {
		double sec;
		double mps = 0.0, bps = 0.0;
		double kscale = 1000.0, mscale = 1000000.0;
		char mgscale = 'K', bscale = 'K';

		sec = msec / 1000.;
		if (sec == 0) return; /* avoid division by zero */

		mps = ((double) msgs) / sec;
		bps = ((double) bytes * 8) / sec;
		if (mps <= mscale) {
			mgscale = 'K';
			mps /= kscale;
		} else {
			mgscale = 'M';
			mps /= mscale;
		}
		if (bps <= mscale) {
			bscale = 'K';
			bps /= kscale;
		} else {
			bscale = 'M';
			bps /= mscale;
		}
		NumberFormat nf = NumberFormat.getInstance();
		nf.setMaximumFractionDigits(3);
					
		if ((rx_msgs > 0) || (otr_msgs > 0)){
			System.err.print(sec + " secs. " + nf.format(mps) + " " + mgscale
				+ "msgs/sec. " + nf.format(bps) + " " + bscale + "bps" + " [RX: " + rx_msgs + "][OTR: " + otr_msgs + "]");
		}
		else{
			System.err.print(sec + " secs. " + nf.format(mps) + " " + mgscale
				+ "msgs/sec. " + nf.format(bps) + " " + bscale + "bps");
		}		
				
		if (lost != 0 || unrec != 0 || burst_loss != 0) {
			System.err.print(" [" + lost + " pkts lost, " + unrec
					+ " msgs unrecovered, " + burst_loss + " bursts]");
		}
		System.err.println();
	}

	private static void print_stats(LBMReceiverStatistics stats, LBMEventQueue evq) {
		
		try {
			if (evq != null){
				if ( Integer.parseInt(evq.getAttributeValue("queue_size_warning")) > 0)	{
					System.err.println("Event queue size: " + evq.queueSize());
				}
			}
			for (int i = 0; i < stats.size(); i++)
			{
				switch(stats.type(i))
				{
					case LBM.TRANSPORT_STAT_TCP:
						System.out.println("TCP, source " + stats.source(i)
													 + ", received "
													 + stats.messagesReceived(i)
													 + "/"
													 + stats.bytesReceived(i)
													 + ", no topics "
													 + stats.noTopicMessagesReceived(i)
													 + ", requests "
													 + stats.lbmRequestsReceived(i));
						break;
					case LBM.TRANSPORT_STAT_LBTRU:
					case LBM.TRANSPORT_STAT_LBTRM:
						if (stats.type() == LBM.TRANSPORT_STAT_LBTRU)
							System.out.println("LBT-RU");
						else
							System.out.println("LBT-RM");
						System.out.println(", source " + stats.source(i)
													 + ", received "
													 + stats.messagesReceived(i)
													 + "/"
													 + stats.bytesReceived(i)
													 + ", naks "
													 + stats.nakPacketsSent(i)
													 + "/"
													 + stats.naksSent(i)
													 + ", lost "
													 + stats.lost(i)
													 + ", ncfs "
													 + stats.ncfsIgnored(i)
													 + "/"
													 + stats.ncfsShed(i)
													 + "/"
													 + stats.ncfsRetransmissionDelay(i)
													 + "/"
													 + stats.ncfsUnknown(i)
													 + ", recovery "
													 + stats.minimumRecoveryTime(i)
													 + "/"
													 + stats.meanRecoveryTime(i)
													 + "/"
													 + stats.maximumRecoveryTime(i)
													 + ", nak tx "
													 + stats.minimumNakTransmissions(i)
													 + "/"
													 + stats.minimumNakTransmissions(i)
													 + "/"
													 + stats.maximumNakTransmissions(i)
													 + ", dup "
													 + stats.duplicateMessages(i)
													 + ", unrecovered "
													 + stats.unrecoveredMessagesWindowAdvance(i)
													 + "/"
													 + stats.unrecoveredMessagesNakGenerationTimeout(i)
													 + ", LBM msgs " + stats.lbmMessagesReceived(i)
													 + ", no topics "
													 + stats.noTopicMessagesReceived(i)
													 + ", requests "
													 + stats.lbmRequestsReceived(i));
						break;
					case LBM.TRANSPORT_STAT_LBTIPC:
						System.out.print("LBT-IPC, source "
									+ stats.source(i)
									+ ", received "
									+ stats.messagesReceived(i)
									+ " msgs/"
									+ stats.bytesReceived(i)
									+ " bytes. LBM msgs "
									+ stats.lbmMessagesReceived(i)
									+ ", no topics "
									+ stats.noTopicMessagesReceived(i)
									+ ", requests "
									+ stats.lbmRequestsReceived(i));
						break;
/*
   Note: Ultra Messaging Persistence and Queuing Editions does not
   currently support the SMX transport. As such, there is no reason
   for this example program to print these statistics.
 */
//					case LBM.TRANSPORT_STAT_LBTSMX:
//						System.out.print("LBT-SMX, source "
//									+ stats.source(i)
//									+ ", received "
//									+ stats.messagesReceived(i)
//									+ " msgs/"
//									+ stats.bytesReceived(i)
//									+ " bytes. LBM msgs "
//									+ stats.lbmMessagesReceived(i)
//									+ ", no topics "
//									+ stats.noTopicMessagesReceived(i)
//									+ ", requests "
//									+ stats.lbmRequestsReceived(i));
//						break;
					case LBM.TRANSPORT_STAT_LBTRDMA:
						System.out.print("LBT-RDMA, source "
									+ stats.source(i)
									+ ", received "
									+ stats.messagesReceived(i)
									+ " msgs/"
									+ stats.bytesReceived(i)
									+ " bytes. LBM msgs "
									+ stats.lbmMessagesReceived(i)
									+ ", no topics "
									+ stats.noTopicMessagesReceived(i)
									+ ", requests "
									+ stats.lbmRequestsReceived(i));
						break;
					case LBM.TRANSPORT_STAT_BROKER:
						System.out.println("BROKER, source "
									+ stats.source(i)
									+ ", received "
									+ stats.messagesReceived(i)
									+ " msgs/"
									+ stats.bytesReceived(i)
									+ " bytes");
						break;
				}
			}
			System.out.flush();
		} catch (LBMException ex) {
			System.err.println("Error initializing LBM: " + ex.toString());
			System.exit(1);
		}
	}	
}

class UMQRcvEventQueue extends LBMEventQueue implements LBMEventQueueCallback {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public UMQRcvEventQueue() throws LBMException {
		super();
		addMonitor(this);
	}
	
	public void monitor(Object cbArg, int evtype, int evq_size, long evq_delay)
	{	
		System.err.println("Event Queue Monitor: Type: " + evtype +
			", Size: " + evq_size +
			", Delay: " + evq_delay + " usecs.");
	}
}

class UMQRcvCtxCB implements LBMContextEventCallback
{
	@SuppressWarnings("unused")
	private int _verbose = 0;

	public UMQRcvCtxCB(int verbose)
	{
	      _verbose = verbose;
	}

	public int onContextEvent(Object arg, LBMContextEvent contextEvent)
	{

	    switch (contextEvent.type())
	    {
			case LBM.CONTEXT_EVENT_UMQ_REGISTRATION_COMPLETE_EX:
				UMQContextEventRegistrationCompleteInfo regcomp = contextEvent.registrationCompleteInfo();
				System.out.println("UMQ queue " + 
						   regcomp.queueName() + 
						   "[" + 
						   Long.toHexString(regcomp.queueId()) +
						   "] ctx registration complete. ID " +
						   regcomp.registrationId().toString(16) +
						   " FLags " +
						   Integer.toHexString(regcomp.flags()) +
						   (((regcomp.flags() & LBM.CONTEXT_EVENT_UMQ_REGISTRATION_COMPLETE_EX_FLAG_QUORUM)== LBM.CONTEXT_EVENT_UMQ_REGISTRATION_COMPLETE_EX_FLAG_QUORUM)?"QUORUM":""));

				break;
			case LBM.CONTEXT_EVENT_UMQ_REGISTRATION_SUCCESS_EX:
				UMQContextEventRegistrationSuccessInfo reginfo = contextEvent.registrationSuccessInfo();
				System.out.println("UMQ queue " + 
						   reginfo.queueName() + 
						   "[" + 
						   Long.toHexString(reginfo.queueId()) +
						   "][" + 
						   reginfo.queueInstanceName() + 
						   "][" + 
						   reginfo.queueInstanceIndex() + 
						   "] ctx registration. ID " +
						   reginfo.registrationId().toString(16) +
						   " FLags " +
						   Integer.toHexString(reginfo.flags()) +
						   (((reginfo.flags() & LBM.CONTEXT_EVENT_UMQ_REGISTRATION_COMPLETE_EX_FLAG_QUORUM)== LBM.CONTEXT_EVENT_UMQ_REGISTRATION_COMPLETE_EX_FLAG_QUORUM)?"QUORUM":""));
				break;
			case LBM.CONTEXT_EVENT_UMQ_REGISTRATION_ERROR:
				System.out.println("Error registering context with queue: " + contextEvent.dataString());
				break;
			case LBM.CONTEXT_EVENT_UMQ_INSTANCE_LIST_NOTIFICATION:
				System.out.println("UMQ Instance list changed: " + contextEvent.dataString());
				break;
			default:
				System.out.println("Unknown context event: " + contextEvent.dataString());
				break;
	    }
		System.out.flush();
	    return 0;
	}
}

class UMQRcvReceiver implements LBMReceiverCallback,
		LBMImmediateMessageCallback {
	public long imsg_count = 0;

	public long msg_count = 0;

	public long total_msg_count = 0;

	public long subtotal_msg_count = 0;

	public long byte_count = 0;

	public long unrec_count = 0;

	public long total_unrec_count = 0;

	public long burst_loss = 0;

	public long rx_msgs = 0;

	public long otr_msgs = 0;

	public long data_start_time = 0;

	public long data_end_time = 0;

	public int stotal_msg_count = 0;

	public long total_byte_count = 0;

	public boolean rcv_done = false;

	int _verbose = 0;

	boolean _end_on_eos = false;

	boolean _summary = false;
	

	public UMQRcvReceiver(int verbose, boolean end_on_eos, boolean summary) {
		_verbose = verbose;
		_end_on_eos = end_on_eos;
		_summary = summary;
	}

	// This immediate-mode receiver is *only* used for topicless
	// immediate-mode sends. Immediate sends that use a topic
	// are received with normal receiver objects.
	public int onReceiveImmediate(Object cbArg, LBMMessage msg) {
		imsg_count++;
		return onReceive(cbArg, msg);
	}

	public int onReceive(Object cbArg, LBMMessage msg) {
		switch (msg.type()) {
		case LBM.MSG_DATA:
			if (stotal_msg_count == 0)
				data_start_time = System.currentTimeMillis();
			else
				data_end_time = System.currentTimeMillis();
			msg_count++;
			total_msg_count++;
			stotal_msg_count++;
			subtotal_msg_count++;
			byte_count += msg.data().length;
			total_byte_count += msg.data().length;
			
			if ((msg.flags() & LBM.MSG_FLAG_RETRANSMIT) != 0)
			{
				rx_msgs++;
			}
			if ((msg.flags() & LBM.MSG_FLAG_OTR) != 0)
			{
				otr_msgs++;
			}
			
			if (_verbose > 0) {
				System.err.print("[" + msg.topicName() + "][" + msg.source()
						+ "][" + msg.sequenceNumber() + "]");
				if (msg.queueMessageId() != null) {
					System.err.print("[" 
							+ msg.queueMessageId().registrationId().toString(16) 
							+ ":" 
							+ msg.queueMessageId().msgStamp().toString(16)
							+ "]");
					try {
						if (msg.queueIndexInfo() != null)
						{
							System.err.print("[" + (((msg.queueIndexInfo().flags() & LBM.UMQ_INDEX_FLAG_NUMERIC) != 0) ? msg.queueIndexInfo().numericIndex() : "\"" + new String(msg.queueIndexInfo().index(),0,msg.queueIndexInfo().indexLength()) + "\"") + "]");
						}
					} catch (LBMException e) {
						e.printStackTrace();
					}
				}
				if ((msg.flags() & LBM.MSG_FLAG_UME_RETRANSMIT) != 0) {
					System.err.print("-RX-");
				}
				if ((msg.flags() & LBM.MSG_FLAG_OTR) != 0) {
					System.err.print("-OTR-");
				}
				if ((msg.flags() & LBM.MSG_FLAG_UMQ_REASSIGNED) != 0) {
					System.err.print("-RA-");
				}
				if ((msg.flags() & LBM.MSG_FLAG_UMQ_RESUBMITTED) != 0) {
					System.err.print("-RS-");
				}
				System.err.print(", ");
				System.err.println(msg.data().length + " bytes");
				try {
					LBMMessageProperties props = msg.properties();
					if (props != null) {
						Iterator<LBMMessageProperty> iter = props.iterator();
						while (iter.hasNext()) {
							LBMMessageProperty prop = iter.next();
							try {
								System.err.println("properties[" + prop.key()
										+ "] = " + prop.getString());
							} catch (LBMEInvalException e) {
								e.printStackTrace();
							}
			}
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			break;
		case LBM.MSG_BOS:
			System.err.println("[" + msg.topicName() + "][" + msg.source()
					+ "], Beginning of Transport Session");
			break;
		case LBM.MSG_EOS:
			System.err.println("[" + msg.topicName() + "][" + msg.source()
					+ "], End of Transport Session");
			if (_end_on_eos) {
				if (_summary)
					print_summary();

				end();
			}
			subtotal_msg_count = 0;
			break;
		case LBM.MSG_UNRECOVERABLE_LOSS:
			unrec_count++;
			total_unrec_count++;
			if (_verbose > 0)
				System.err.println("[" + msg.topicName() + "][" + msg.source()
						+ "][" + Long.toHexString(msg.sequenceNumber())
						+ "], LOST");
			break;
		case LBM.MSG_UNRECOVERABLE_LOSS_BURST:
			burst_loss++;
			if (_verbose > 0)
				System.err.println("[" + msg.topicName() + "][" + msg.source()
						+ "][" + Long.toHexString(msg.sequenceNumber())
						+ "], LOST BURST");
			break;
		case LBM.MSG_REQUEST:
			if (stotal_msg_count == 0)
				data_start_time = System.currentTimeMillis();
			else
				data_end_time = System.currentTimeMillis();
			msg_count++;
			stotal_msg_count++;
			subtotal_msg_count++;
			byte_count += msg.data().length;
			total_byte_count += msg.data().length;
			break;
		case LBM.MSG_UME_REGISTRATION_ERROR:
			System.out.println("[" + msg.topicName() + "][" + msg.source()
					+ "] UME registration error: " + msg.dataString());
			break;
		case LBM.MSG_UME_REGISTRATION_SUCCESS_EX:
			UMERegistrationSuccessInfo reg = msg.registrationSuccessInfo();
			System.out.print("[" + msg.topicName() + "][" + msg.source()
					+ "] store " + reg.storeIndex() + ": "
					+ reg.store() + " UME registration successful. SrcRegID "
					+ reg.sourceRegistrationId() + " RcvRegID " + reg.receiverRegistrationId()
					+ ". Flags " + reg.flags() + " ");
			if ((reg.flags() & LBM.MSG_UME_REGISTRATION_SUCCESS_EX_FLAG_OLD) != 0)
				System.out.print("OLD[SQN " + reg.sequenceNumber() + "] ");
			if ((reg.flags() & LBM.MSG_UME_REGISTRATION_SUCCESS_EX_FLAG_NOCACHE) != 0)
				System.out.print("NOCACHE ");
			System.out.println();
			break;
		case LBM.MSG_UME_REGISTRATION_COMPLETE_EX:
			UMERegistrationCompleteInfo regcomplete = msg.registrationCompleteInfo();
			System.out.print("[" + msg.topicName() + "][" + msg.source()
					+ "] UME registration complete. SQN " + regcomplete.sequenceNumber()
					+ ". Flags " + regcomplete.flags() + " ");
			if ((regcomplete.flags() & LBM.MSG_UME_REGISTRATION_COMPLETE_EX_FLAG_QUORUM) != 0) {
				System.out.print("QUORUM ");
			}
			if ((regcomplete.flags() & LBM.MSG_UME_REGISTRATION_COMPLETE_EX_FLAG_RXREQMAX) != 0) {
				System.out.print("RXREQMAX ");
			}
			System.out.println();
			break;
		case LBM.MSG_UME_REGISTRATION_CHANGE:
			System.out.println("[" + msg.topicName() + "][" + msg.source()
					+ "] UME registration change: " + msg.dataString());
			break;
		case LBM.MSG_UMQ_REGISTRATION_ERROR:
			System.out.println("["
			    + msg.topicName()
			    + "]["
			    + msg.source()
			    + "] UMQ Registration error: "
			    + msg.dataString());
			break;
		case LBM.MSG_UMQ_REGISTRATION_COMPLETE_EX:
			UMQRegistrationCompleteInfo qregcomplete = msg.queueRegistrationCompleteInfo();
			System.out.print("["
			    + msg.topicName()
			    + "]["
			    + msg.source()
				+ "] "
				+ (((qregcomplete.flags() & LBM.MSG_UMQ_REGISTRATION_COMPLETE_EX_FLAG_ULB) != 0) ? "ULB" : "UMQ")
			    + " \"" + qregcomplete.queueName() + "\""
			    + "["
			    + Long.toHexString(qregcomplete.queueId())
			    + "] registration complete. AssignID "
			    + Long.toHexString(qregcomplete.assignmentId())
			    + ". Flags "
			    + Integer.toHexString(qregcomplete.flags()));
			if((qregcomplete.flags() & LBM.MSG_UMQ_REGISTRATION_COMPLETE_EX_FLAG_QUORUM) != 0)
			  System.out.print(" QUORUM");
			System.out.println();
			break;
		case LBM.MSG_UMQ_DEREGISTRATION_COMPLETE_EX:
			UMQDeregistrationCompleteInfo qdregcomplete = msg.queueDeregistrationCompleteInfo();
			System.out.println("["
			    + msg.topicName()
			    + "]["
			    + msg.source()
			    + "] "
				+ (((qdregcomplete.flags() & LBM.MSG_UMQ_DEREGISTRATION_COMPLETE_EX_FLAG_ULB) != 0) ? "ULB" : "UMQ")
			    + " \"" + qdregcomplete.queueName() + "\""
			    + "["
			    + Long.toHexString(qdregcomplete.queueId())
			    + "] deregistration complete. Flags "
			    + Integer.toHexString(qdregcomplete.flags()));
			rcv_done = true;
			break;
		case LBM.MSG_UMQ_INDEX_ASSIGNED_EX:
			UMQIndexAssignedInfo ia = msg.queueIndexAssignedInfo();
			try {
				System.out.println("["
						+ msg.topicName()
						+ "]["
						+ msg.source()
						+ "] "
						+ (((ia.flags() & LBM.MSG_UMQ_INDEX_ASSIGNED_FLAG_ULB) != 0) ? "ULB" : "UMQ")
						+ " \"" + ia.queueName() + "\""
						+ "["
						+ Long.toHexString(ia.queueId())
						+ "] assigned index "
						+ (((ia.indexInfo().flags() & LBM.UMQ_INDEX_FLAG_NUMERIC) != 0) ? ia.indexInfo().numericIndex() : "\"" + new String(ia.indexInfo().index(),0,ia.indexInfo().indexLength()) + "\"")
						+ ". Flags "
						+ Integer.toHexString(ia.flags()));
			}
			catch (LBMEInvalException ex) {
				System.err.println("Error getting index info: " + ex.toString());
			}
			break;
		case LBM.MSG_UMQ_INDEX_RELEASED_EX:
			UMQIndexReleasedInfo ir = msg.queueIndexReleasedInfo();
			try {
				System.out.println("["
						+ msg.topicName()
						+ "]["
						+ msg.source()
						+ "] "
						+ (((ir.flags() & LBM.MSG_UMQ_INDEX_RELEASED_FLAG_ULB) != 0) ? "ULB" : "UMQ")
						+ " \"" + ir.queueName() + "\""
						+ "["
						+ Long.toHexString(ir.queueId())
						+ "] released index "
						+ (((ir.indexInfo().flags() & LBM.UMQ_INDEX_FLAG_NUMERIC) != 0) ? ir.indexInfo().numericIndex() : "\"" + new String(ir.indexInfo().index()) + "\"")
						+ ". Flags "
						+ Integer.toHexString(ir.flags()));
			}
			catch (LBMEInvalException ex) {
				System.err.println("Error getting index info: " + ex.toString());
			}
			break;
		case LBM.MSG_UMQ_INDEX_ASSIGNMENT_ELIGIBILITY_ERROR:
			System.out.println("["
					+ msg.topicName()
					+ "]["
					+ msg.source()
					+ "] UMQ Index Assignment Eligibility error: "
					+ msg.dataString());
			break;
		case LBM.MSG_UMQ_INDEX_ASSIGNMENT_ELIGIBILITY_START_COMPLETE_EX:
			{
				UMQIndexAssignmentEligibilityStartCompleteInfo ias = msg.queueIndexAssignmentEligibilityStartCompleteInfo();
				System.out.println("["
						+ msg.topicName()
						+ "]["
						+ msg.source()
						+ "] "
						+ (((ias.flags() & LBM.MSG_UMQ_INDEX_RELEASED_FLAG_ULB) != 0) ? "ULB" : "UMQ")
						+ " \"" + ias.queueName() + "\""
						+ "["
						+ Long.toHexString(ias.queueId())
						+ "] Index Assignment Eligibility start complete. Flags "
						+ Integer.toHexString(ias.flags()));
			}
			break;
		case LBM.MSG_UMQ_INDEX_ASSIGNMENT_ELIGIBILITY_STOP_COMPLETE_EX:
			{
				UMQIndexAssignmentEligibilityStopCompleteInfo ias = msg.queueIndexAssignmentEligibilityStopCompleteInfo();
				System.out.println("["
						+ msg.topicName()
						+ "]["
						+ msg.source()
						+ "] "
						+ (((ias.flags() & LBM.MSG_UMQ_INDEX_RELEASED_FLAG_ULB) != 0) ? "ULB" : "UMQ")
						+ " \"" + ias.queueName() + "\""
						+ "["
						+ Long.toHexString(ias.queueId())
						+ "] Index Assignment Eligibility stop complete. Flags "
						+ Integer.toHexString(ias.flags()));
			}
			break;
		default:
			System.out.println("Unhandled receiver event [" + msg.type() + "] from source [" +  msg.source() + "] with topic [" + msg.topicName() + "]. Refer to https://ultramessaging.github.io/currdoc/doc/java_example/index.html#unhandledjavaevents for a detailed description.");
			break;
		}
		msg.dispose(); // Send ACK now
		System.out.flush();
		return 0;
	}

	private void print_summary() {
		double total_time_sec, mps, bps;

		total_time_sec = 0.0;
		mps = 0.0;
		bps = 0.0;

		long bits_received = total_byte_count * 8;
		long total_time = data_end_time - data_start_time;

		NumberFormat nf = NumberFormat.getInstance();
		nf.setMaximumFractionDigits(3);

		total_time_sec = total_time / 1000.0;

		if (total_time_sec > 0) {
			mps = stotal_msg_count / total_time_sec;
			bps = bits_received / total_time_sec;
		}

		System.out.println("\nTotal time         : "
				+ nf.format(total_time_sec) + "  sec");
		System.out.println("Messages received  : " + stotal_msg_count);
		System.out.println("Bytes received     : " + total_byte_count);
		System.out.println("Avg. throughput    : " + nf.format(mps / 1000.0)
				+ " Kmsgs/sec, " + nf.format(bps / 1000000.0) + " Mbps\n\n");

	}

	private void end() {
		System.err.println("Quitting.... received " + total_msg_count
				+ " messages");
		System.exit(0);
	}

}
