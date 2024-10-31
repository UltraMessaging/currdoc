import com.latencybusters.lbm.*;
import static com.latencybusters.lbm.LBM.FLIGHT_SIZE_TYPE_UME;

import java.util.*;
import java.text.NumberFormat;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.net.UnknownHostException;
import java.util.concurrent.Semaphore;

// See https://communities.informatica.com/infakb/faq/5/Pages/80008.aspx
import org.openmdx.uses.gnu.getopt.*;

/*
  (C) Copyright 2005,2023 Informatica Inc.  Permission is granted to licensees to use
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

import java.io.*;
import java.nio.ByteBuffer;

class umessrc
{
//	private static String pcid = "";
	private static int msgs = 10000000;
	private static int stats_sec = 0;
	private static int verbose = 0;
	private static boolean sequential = true;
	private static boolean usrbuff = false;
    private static boolean prntds = false;
	private static boolean dereg = false;
	public static int flightsz = 0;
	public static int appsent = 0;
	public static int stablerecv = 0;
	private static int pause_ivl = 0;
	private static int msgs_per_ivl = 1;
	public static long last_clientd_sent = 0;
	public static long last_clientd_stable = 0;
	public static long sleep_before_sending = 0;
	private static int msgs_per_sec = 0;
	private static String purpose = "Purpose: Uses smart source to send messages on a single topic.";
	private static String usage =
"Usage: umessrc [options] topic\n"+ 
"Available options:\n"+ 
"  -a available-data-space = print the length of available data space\n"+
"  -b user-supplied-buffer =  send messages using a user-supplied buffer\n"+
"  -c filename = Use LBM configuration file filename.\n"+
"                Multiple config files are allowed.\n"+
"                Example:  '-c file1.cfg -c file2.cfg'\n"+
"  -C filename = read context config parameters from filename\n"+ 
"  -D = Send deregistration after sending 1000 messages\n"+ 
"  -e = use LBM embedded mode\n"+ 
"  -f NUM = allow NUM unstabilized messages in flight (determines message rate)"+ 
"  --flight-size = See -f above"+ 
"  -h = help\n"+ 
"  -i msg_prop = send message property as integer value with string key\n"+
"                Example:  '-i 1,prop1'\n"+
"  -j = turn on UME late join\n"+ 
"  -l len = send messages of len bytes\n"+ 
"  -L linger = linger for linger seconds before closing context\n"+ 
"  -m NUM = send at NUM messages per second (trumped by -f)"+ 
"  --message-rate = See -m above"+ 
"  -M msgs = send msgs number of messages\n"+ 
"  -N chn = send messages on channel chn\n"+
"  -P msec = pause after each send msec milliseconds\n"+ 
"  -Q = display sequence number information source events\n"+ 
"  -S ip:port = use UME store at the specified address and port\n"+ 
"  -s sec = print stats every sec seconds\n"+ 
"  -t storename = use UME store with name storename\n"+ 
"  -v = bump verbose level\n"+ 
"\nMonitoring options:\n"+ 
"  --monitor-ctx NUM = monitor context every NUM seconds\n"+ 
"  --monitor-src NUM = monitor source every NUM seconds\n"+ 
"  --monitor-transport TRANS = use monitor transport module TRANS\n"+ 
"                              TRANS may be `lbm', `udp', or `lbmsnmp', default is `lbm'\n"+ 
"  --monitor-transport-opts OPTS = use OPTS as transport module options\n"+ 
"  --monitor-format FMT = use monitor format module FMT\n"+ 
"                         FMT may be `csv' or `pb', default is `csv'\n"+ 
"  --monitor-format-opts OPTS = use OPTS as format module options\n"+ 
"  --monitor-appid ID = use ID as application ID string\n"
;

	public static void main(String[] args)
	{
		int linger = 5;
		int monitor_context_ivl = 0;
		int monitor_source_ivl = 0;
		boolean monitor_context = false;
		boolean monitor_source = false; 
		boolean latejoin = false;
		String storeip = null;
		String storeport = null;
		String storename = null;
		int mon_transport = LBMMonitor.TRANSPORT_LBM;
		int mon_format = LBMMonitor.FORMAT_CSV;
		String mon_format_options = "";
		String mon_transport_options = "";
		String application_id = null;
		StringTokenizer tokens;
		boolean seqnum_info = false;
		boolean stability = false;
		long channel = -1;
		int mprop_int_cnt = 0;
		String[] mprop_int_keys;
		long[] mprop_int_vals;
		String[] optList;
		LBMObjectRecycler objRec = new LBMObjectRecycler();

		LBM lbm = null;
		try
		{
			lbm = new LBM();
		}
		catch (LBMException ex)
		{
			System.err.println("Error initializing LBM: " + ex.toString());
			System.exit(1);
		}
		org.apache.log4j.Logger logger;
		logger = org.apache.log4j.Logger.getLogger("umessrc");
		org.apache.log4j.BasicConfigurator.configure();
		log4jLogger lbmlogger = new log4jLogger(logger);
		lbm.setLogger(lbmlogger);
		String conffname = null;
		String cconffname = null;

		LongOpt[] longopts = new LongOpt[9];
		final int OPTION_MONITOR_CTX = 2;
		final int OPTION_MONITOR_SRC = 3;
		final int OPTION_MONITOR_TRANSPORT = 4;
		final int OPTION_MONITOR_TRANSPORT_OPTS = 5; 
		final int OPTION_MONITOR_FORMAT = 6;
		final int OPTION_MONITOR_FORMAT_OPTS = 7;
		final int OPTION_MONITOR_APPID = 8;
		final int OPTION_FLIGHT_SIZE = 9;
		final int OPTION_MESSAGE_RATE = 10;

		longopts[0] = new LongOpt("monitor-ctx", LongOpt.REQUIRED_ARGUMENT, null, OPTION_MONITOR_CTX);
		longopts[1] = new LongOpt("monitor-src", LongOpt.REQUIRED_ARGUMENT, null, OPTION_MONITOR_SRC);
		longopts[2] = new LongOpt("monitor-transport", LongOpt.REQUIRED_ARGUMENT, null, OPTION_MONITOR_TRANSPORT);
		longopts[3] = new LongOpt("monitor-transport-opts", LongOpt.REQUIRED_ARGUMENT, null, OPTION_MONITOR_TRANSPORT_OPTS);
		longopts[4] = new LongOpt("monitor-format", LongOpt.REQUIRED_ARGUMENT, null, OPTION_MONITOR_FORMAT);
		longopts[5] = new LongOpt("monitor-format-opts", LongOpt.REQUIRED_ARGUMENT, null, OPTION_MONITOR_FORMAT_OPTS);
		longopts[6] = new LongOpt("monitor-appid", LongOpt.REQUIRED_ARGUMENT, null, OPTION_MONITOR_APPID);
		longopts[7] = new LongOpt("flight-size", LongOpt.REQUIRED_ARGUMENT, null, OPTION_FLIGHT_SIZE);
		longopts[8] = new LongOpt("message-rate", LongOpt.REQUIRED_ARGUMENT, null, OPTION_MESSAGE_RATE);
		Getopt gopt = new Getopt("umessrc", args, "+C:Dec:f:hi:jL:l:m:M:N:P:S:s:t:vabQ", longopts);
		int c = -1;
		int msglen = 25;
		long bytes_sent = 0;
		boolean error = false;
		boolean block = true;
		mprop_int_vals = new long[16];
		mprop_int_keys = new String[16];
		optList = new String[2];
		while ((c = gopt.getopt()) != -1)
		{
			try
			{
				switch (c)
				{
					case OPTION_MONITOR_APPID:
						application_id = gopt.getOptarg();
						break;
					case OPTION_MONITOR_CTX:
						monitor_context = true;
						monitor_context_ivl = Integer.parseInt(gopt.getOptarg());
						break;
					case OPTION_MONITOR_SRC:
						monitor_source = true;
						monitor_source_ivl = Integer.parseInt(gopt.getOptarg());
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
					case 'c':
						try
						{
							LBM.setConfiguration(gopt.getOptarg());
						}
						catch (LBMException ex)
						{
							System.err.println("Error setting LBM configuration: " + ex.toString());
							System.exit(1);
						}
						break;
					case 'C':
						cconffname = gopt.getOptarg();
						break;
					case 'D':
						dereg = true;
						break;
					case 'e':
						sequential = false;
						break;
					case 'f':
					case OPTION_FLIGHT_SIZE:
						flightsz = Integer.parseInt(gopt.getOptarg());
						break;
					case 'h':
						print_help_exit(0);
						break;
					case 'i':
						if (mprop_int_cnt > 15) {
							System.err.println("Error - more than the maximum allowed 16 message properties specified.");
							System.exit(1);
						}
						optList = gopt.getOptarg().split(",");
						mprop_int_vals[mprop_int_cnt] = Integer.parseInt(optList[0]);
						mprop_int_keys[mprop_int_cnt] = optList[1];
						mprop_int_cnt++;
						System.out.println("Property #" + mprop_int_cnt + ": " + mprop_int_keys[mprop_int_cnt - 1] + " = " + mprop_int_vals[mprop_int_cnt - 1]);
						break;
					case 'j':
						latejoin = true;
						break;
					case 'l':
						msglen = Integer.parseInt(gopt.getOptarg());
						break;
					case 'L':
						linger = Integer.parseInt(gopt.getOptarg());
						break;
					case 'm':
					case OPTION_MESSAGE_RATE:
						msgs_per_sec = Integer.parseInt(gopt.getOptarg());
						break;
					case 'M':
						msgs = Integer.parseInt(gopt.getOptarg());
						break;
					case 'N':
						channel = Long.parseLong(gopt.getOptarg());
						break;
					case 'P':
						pause_ivl = Integer.parseInt(gopt.getOptarg());
						break;
					case 'Q':
						seqnum_info = true;
						break;
					case 'S':
						tokens = new StringTokenizer(gopt.getOptarg(), ":");
						if (tokens.countTokens() > 2)
						{
							error = true;
							break;
						}
						storeip = tokens.nextToken();
						try {
							InetAddress iaddr = InetAddress.getByName(storeip);
							storeip = iaddr.getHostAddress();
						}
						catch (UnknownHostException ex)
						{
							System.err.println("Host " + storeip + " unknown.");
							System.exit(1);
						}
						if (tokens.countTokens() == 1)
						{
							storeport = tokens.nextToken();
						}
						break;
					case 's':
						stats_sec = Integer.parseInt(gopt.getOptarg());
						break;
					case 't':
						storename = gopt.getOptarg();
						break;
					case 'v':
						verbose++;
						break;
					case 'a':
						prntds = true;
						break;
					case 'b':
						usrbuff = true;
						break;
					default:
						error = true;
						break;
				}
				if (error)
					break;
			} catch (Exception e) {
				/* type conversion exception */
				System.err.println("umessrc: error\n" + e);
				print_help_exit(1);
			}
		}
		if (error || gopt.getOptind() >= args.length)
		{
			print_help_exit(1);
		}
		/* Verify the Message Rate and Flight Time args */
		if(msgs_per_sec > 0 && pause_ivl > 0) {
			System.err.println("-m and -P are conflicting options");
			System.err.println(usage);
			System.exit(1);
		}

		LBMContextAttributes cattr = null;
		try
		{
			cattr = new LBMContextAttributes();
			cattr.setObjectRecycler(objRec, null);
			// Since we are manually validating attributes, retrieve any XML
			// configuration attributes set for this context.
			cattr.setFromXml(cattr.getValue("context_name"));
			// Set UMP liveness detection callbacks
			cattr.setReceiverLivenessNotificationCallbacks(new UMERcvrLivenessCreationCb(), new UMERcvrLivenessDeletionCb(), null);
		}
		catch (LBMException ex)
		{
			System.err.println("Error creating context attributes: " + ex.toString());
			System.exit(1);
		}
		UMESSrcCB ssrccb = new UMESSrcCB(verbose);
		LBMSourceAttributes sattr = null;
		try
		{
			sattr = new LBMSourceAttributes();
			sattr.setObjectRecycler(objRec, null);
			// Since we are manually validating attributes, retrieve any XML
			// configuration attributes set for this topic.
			sattr.setFromXml(cattr.getValue("context_name"), args[gopt.getOptind()]);
		}
		catch (LBMException ex)
		{
			System.err.println("Error creating source attributes: " + ex.toString());
			System.exit(1);
		}
	
		if (channel != -1) {
			sattr.setProperty("smart_src_enable_spectrum_channel", "1");
		}
		if (mprop_int_cnt > 0) {
			sattr.setProperty("smart_src_message_property_int_count", Integer.toString(mprop_int_cnt));
		}

		LongObject cd = new LongObject();
		sattr.setMessageReclamationCallback(ssrccb, cd);

		if (flightsz > 0) {
			try
			{
				sattr.setProperty("ume_flight_size", Integer.toString(flightsz));	
			} catch (LBMRuntimeException ex)
			{
				System.err.println("Error setting flight size: " + ex.toString());
				System.exit(1);
			}
		}

		
		try 
		{
			System.out.println("Allowing " + sattr.getValue("ume_flight_size") + " in-flight messages.");
		} catch (LBMException ex) {
			System.err.println("Error getting flight size: " + ex.toString());
			System.exit(1);
		}

		/* Set the command line store IP and port to the config */
		if (storeip != null)
		{
			try
			{
				sattr.setProperty("ume_store", storeip + ":" + storeport);
			}
			catch (LBMRuntimeException ex)
			{
				System.err.println("Error setting UME store: " + ex.toString());
				System.exit(1);
			}
		} else if (storename != null) {
			try 
			{
				sattr.setProperty("ume_store_name", storename);
			}
			catch (LBMRuntimeException ex)
			{
				System.err.println("Error setting UME storename: " + ex.toString());
				System.exit(1);
			}
		}

		/* Get the store address and port from the current config.
		 * If the command line specified the address/port it will
		 * have set the config above overriding the config file
		 */
		try {
			int colon;

			storeip = sattr.getValue("ume_store");

			colon = storeip.indexOf(':');
			if(colon > 0) {
				storeport = storeip.substring(colon, storeip.length());
				storeip = storeip.substring(0,colon - 1);
			}

			if (storeip.equals("0.0.0.0"))
				storeip = null;
		}
		catch (LBMException ex)
		{
			System.err.println("Error fetching source attributes: " + ex.toString());
			System.exit(1);
		}

		/* Calculate the appropriate message rate */
		if(msgs_per_sec > 0) {
			calc_rate_vals();

			System.out.println(msgs_per_sec + " msgs/sec -> " + msgs_per_ivl + " msgs/ivl, "
					+ pause_ivl + " msec ivl ");
		}
		if (latejoin)
		{
			try
			{
				sattr.setProperty("ume_late_join", "1");
			}
			catch (LBMRuntimeException ex)
			{
				System.err.println("Error setting latejoin: " + ex.toString());
				System.exit(1);
			}
		}

		if (cconffname != null)
		{
			try 
			{
				FileInputStream f = new FileInputStream(cconffname);
				cattr.load(f);
			}
			catch (IOException e)
			{
				System.err.println(e.toString());
				System.exit(1);
			}
			catch (LBMRuntimeException ex)
			{
				System.err.println("Error setting context configuration: " + ex.toString());
				System.exit(1);
			}
		}

		/* Check to see what is set and what is not for UME settings. */
		/* If no UME stores have been specified, exit program. */
		if (check_ume_store_config(sattr) == -1)
			System.exit(1);

		try
		{
			if (sattr.getValue("ume_late_join").equals("1"))
				System.out.println("Using UME Late Join.");
			else
				System.out.println("Not using UME Late Join.");
				System.out.println("Not using UME Confirmed Delivery Notification.");
			
			if (sattr.getValue("ume_message_stability_notification").equals("2")) {
				System.out.print("Using UME Message Stability Notification. ");
				if (verbose >= 1)
					System.out.println("Will display message stability events. ");
				else
					System.out.println(" Will not display events. ");
				stability = true;
			}
		}
		catch (LBMException ex)
		{
			System.err.println("Error fetching source attributes: " + ex.toString());
			System.exit(1);
		}
		try
		{
			if (sequential)
			{
				cattr.setProperty("operational_mode", "sequential");
			}
			else
			{
				// The default for operational_mode is embedded, but set it
				// explicitly in case a configuration file was specified with
				// a different value.
				cattr.setProperty("operational_mode", "embedded");
			}
		}
		catch (LBMRuntimeException ex)
		{
			System.err.println("Error setting operational_mode: " + ex.toString());
			System.exit(1);
		}
		LBMContext ctx = null;
		try
		{
			ctx = new LBMContext(cattr);
		}
		catch (LBMException ex)
		{
			System.err.println("Error creating context: " + ex.toString());
			System.exit(1);
		}

		LBMTopic topic = null;
		try
		{
			topic =  ctx.allocTopic(args[gopt.getOptind()], sattr);
		}
		catch (LBMException ex)
		{
			System.err.println("Error allocating topic: " + ex.toString());
			System.exit(1);
		}
		LBMSSource mySmartSource = null;
		ByteBuffer message = null;
		LBMContextThread ctxthread = null;
		if (sequential)
		{
			// create thread to handle event processing
			ctxthread = new LBMContextThread(ctx);
			ctxthread.start();
		}
		if (sequential)
		{
			System.err.println("Sequential mode");
		}
		else
		{
			System.err.println("Embedded mode");
		}
		try
		{
			mySmartSource = new LBMSSource(ctx, topic);
		}
		catch (LBMException ex)
		{
			System.err.println("Error creating smart source: " + ex.toString());
			System.exit(1);
		}
		mySmartSource.addSSourceCallback(ssrccb);
		try
		{
			message = mySmartSource.buffGet();
		}
		catch (LBMException ex)
		{
			System.err.println("Error getting smart source buffer: " + ex.toString());
			System.exit(1);
		}
		UMESSrcStatsTimer stats = null;
		if (stats_sec > 0)
		{
			try
			{
				stats = new UMESSrcStatsTimer(ctx, mySmartSource, stats_sec * 1000, objRec);
			}
			catch (LBMException ex)
			{
				System.err.println("Error creating timer: " + ex.toString());
				System.exit(1);
			}
		}
		try
		{
			Thread.sleep(1000);
		}
		catch (InterruptedException e) { }
		LBMMonitorSource lbmmonsrc = null;
		if (monitor_context || monitor_source)
		{
			try
			{
				lbmmonsrc = new LBMMonitorSource(mon_format, mon_format_options, mon_transport, mon_transport_options);
			}
			catch (LBMException ex)
			{
				System.err.println("Error creating monitor source: " + ex.toString());
				System.exit(1);
			}
			try
			{
				if (monitor_context)
					lbmmonsrc.start(ctx, application_id, monitor_context_ivl);
				else
					lbmmonsrc.start(mySmartSource, application_id, monitor_source_ivl);
			}
			catch (LBMException ex)
			{
				System.err.println("Error starting monitoring: " + ex.toString());
				System.exit(1);
			}
		}
		
		System.out.println("Sending "
				   + msgs
				   + " messages of size "
				   + msglen
				   + " bytes to topic ["
				   + args[gopt.getOptind()]
				   + "]");
		System.out.flush();
		long start_time = System.currentTimeMillis();
		boolean regProblem = false;
		LBMSSourceSendExInfo exinfo = new LBMSSourceSendExInfo();
		ByteBuffer usrbuffmsg = null;

        if ((channel != -1) || (mprop_int_cnt > 0) || usrbuff) {
            if (channel != -1) {
                exinfo.setChannel(channel);
            }
            if (mprop_int_cnt > 0) {
                exinfo.setMessageProperties(mprop_int_cnt, mprop_int_keys, mprop_int_vals);
            }

			if (usrbuff) {
				System.out.println("Getting bytebuffer of size " + msglen);
				/* need to alloc a bytebuffer and fill it with data */
				usrbuffmsg = ByteBuffer.allocateDirect(msglen);
				try {
					exinfo.setUserSuppliedBuffer(usrbuffmsg);
				}
				catch (LBMEInvalException e) {
					System.err.println("umessrc: setUserSuppliedBuffer error\n" + e);
				}
			}

        }

		/*
		 * if -a was specified, print the maximum allowable message payload size.  This
		 * is the maximum allowable size based on using all of the configured message properties
		 * and spectrum.
		 */
		if (prntds) {
			System.out.println("The length of available data space: " + mySmartSource.getAvailableDataSpace());
		}

		ByteBuffer fillmessage = message;
		if (usrbuff) {
			fillmessage = usrbuffmsg;
		}


		for (long count = 0; count < msgs; )
		{
			if( ( count == 1000) && (dereg == true))
			{
				System.out.println("Just before sending Dergistration");
				System.out.flush();
				try {
					System.out.println("Sending DEREGISTRATION");
					mySmartSource.umederegister();
					dereg = false;
				} catch (LBMException ex)
				{
					System.err.println("Error Deregistering source: " + ex.toString());
					System.exit(1);
				}
			}
			
		    for(int ivlcount = 0; ivlcount < msgs_per_ivl; ivlcount++) {
				if (seqnum_info || stability)
				{
					exinfo.setClientObject(new Long(count + 1));
					last_clientd_sent = count + 1;
				} 
				try
				{
					int xflag = 0;
					ssrccb.blocked = true;
					if (seqnum_info) {
						exinfo.setFlags(LBM.SSRC_SEND_EX_FLAG_SEQUENCE_NUMBER_INFO);
					}
					try {
						/* Sleep a bit after a re-registration
						 * to allow topic resolution to take place. */
						if (sleep_before_sending > 0) {
							Thread.sleep(sleep_before_sending);
							sleep_before_sending = 0;
						}
					} catch (InterruptedException ex) {
						/* Interrupted - retry */
					}
					mySmartSource.send(message, msglen, 0, exinfo);
					ssrccb.blocked = false;
					count++;
					appsent++;
				}
				catch (LBMEWouldBlockException ex)
				{
					while (ssrccb.blocked)
					{
						try
						{
							Thread.sleep(100);
						}
						catch (InterruptedException e) { }
					}
					continue;
				}
				catch(UMENoRegException ex)
				{
					if(verbose > 0) 
					{
						System.out.println("UMENoRegException: "+ex.getMessage());
					}
					if (!regProblem)
					{
						regProblem = true;
						System.out.println("Send unsuccessful. Waiting...");
						System.out.flush();
					}
					try
					{
						Thread.sleep(1000);
						if (umessrc.appsent > 0) {
							umessrc.appsent--;
						}
					}
					catch (InterruptedException e) { }
					continue;
				}
				catch(UMENoStoreException ex)
				{
					if(verbose > 0) 
					{
						System.out.println("UMENoStoreException: "+ex.getMessage());
					}
					if (!regProblem)
					{
						regProblem = true;
						System.out.println("Store: Send unsuccessful. Waiting...");
						System.out.flush();
					}
					try
					{
						Thread.sleep(1000);
						umqsrc.appsent--;
					}
					catch (InterruptedException e) { }
					continue;
				}
				catch (LBMException ex)
				{
					System.err.println("Error sending message: " + ex.toString());
				}
				if (regProblem)
				{
					regProblem = false;
					System.out.println("Send OK. Continuing.");
					System.out.flush();
				}
				bytes_sent += msglen;
		    } /* for(ivlcount) */
			if (pause_ivl > 0)
			{
				try
				{
					Thread.sleep(pause_ivl);
				}
				catch (InterruptedException e) { }
			}
		}
		long end_time = System.currentTimeMillis();
		double secs = (end_time - start_time) / 1000.;
		System.out.println("Sent "
				   + msgs
				   + " messages of size "
				   + msglen
				   + " bytes in "
				   + secs
				   + " seconds.");
		print_bw(secs, msgs, bytes_sent);
		System.out.flush();
		if (linger > 0)
		{
			System.out.println("Lingering for "
					     + linger
					     + " seconds...");
			try
			{
				Thread.sleep(linger * 1000);
			}
			catch (InterruptedException e) { }
		}
		if (sequential)
		{
			ctxthread.terminate();
		}
		if (lbmmonsrc != null)
		{
			try
			{
				lbmmonsrc.close();
			}
			catch (LBMException ex)
			{
				System.err.println("Error closing monitor source: " + ex.toString());
			}
		}
		objRec.close();
		try
		{
			mySmartSource.close();
		}
		catch (LBMException ex)
		{
			System.err.println("Error closing source: " + ex.toString());
		}
		ctx.close();
		cd.done();
	}

	/*
 	 * Function that determines how to pace sending of messages to obtain a given
 	 * rate.  Given messages per second, calculates number of messages to send in 
 	 * a particular interval and the number of milliseconds to pause between 
 	 * intervals.
 	 */
	private static void calc_rate_vals()
	{
		int intervals_per_sec = 1000;

		pause_ivl = 20;
		intervals_per_sec = 1000/(pause_ivl);

		while(pause_ivl <= 1000 && msgs_per_sec % intervals_per_sec != 0)
		{
			pause_ivl++;
			while(((1000 % pause_ivl) != 0) && pause_ivl <= 1000)
				pause_ivl++;
			intervals_per_sec = 1000/pause_ivl;
		}
		msgs_per_ivl = msgs_per_sec/intervals_per_sec;
	}

	private static void print_help_exit(int exit_value){
		System.err.println(LBM.version());
		System.err.println(purpose);
		System.err.println(usage);
		System.exit(exit_value);
	}
	
	private static void print_bw(double sec, int msgs, long bytes)
	{
		double mps = 0;
		double bps = 0;
		double kscale = 1000;
		double mscale = 1000000;
		char mgscale = 'K';
		char bscale = 'K';
		
		if (sec == 0) return; /* avoid division by zero */

		mps = msgs/sec;
		bps = bytes*8/sec;
		if (mps <= mscale)
		{
			mgscale = 'K';
			mps /= kscale;
		}
		else
		{
			mgscale = 'M';
			mps /= mscale;
		}
		if (bps <= mscale)
		{
			bscale = 'K';
			bps /= kscale;
		}
		else
		{
			bscale = 'M';
			bps /= mscale;
		}
		NumberFormat nf = NumberFormat.getInstance();
		nf.setMaximumFractionDigits(3);
		System.out.println(sec
				   + " secs. "
				   + nf.format(mps)
				   + " " + mgscale + "msgs/sec. "
				   + nf.format(bps)
				   + " " + bscale + "bps");
	}

	private static int check_ume_store_config(LBMSourceAttributes sattr)
	{
		// flag whether a store name is present
		String store_name = null;
		try 
		{
			store_name = sattr.getValue("ume_store_name");
		}
		catch (LBMException ex) 
		{
			System.err.println("Error getting source attribute: " + ex.toString());
		}
		boolean hasStoreName = (store_name.length() == 0 || store_name == null) ? false : true;
	
		UMEStoreEntry[] stores = sattr.getStores();
		UMEStoreGroupEntry[] groups = sattr.getStoreGroups();
		InetSocketAddress addr = null;
		
		if (stores.length < 1 && !hasStoreName)
		{
			System.err.println("No UME stores specified. To send without a store, please use lbmsrc.");
			return -1; /* exit program */
		}
		try {
			String storeBehavior = sattr.getValue("ume_store_behavior");
			if (storeBehavior.equals("round-robin")) {
		for (int i = 0; i < stores.length; i++) {
			addr = stores[i].address();
			System.out.print("Store " + i + ": ");
			if(stores[i].isNamed()) {
				/* If the IP is 0.0.0.0, this store is specified by name. */
				System.out.print(stores[i].name() + " DomainID " + stores[i].domainId() + " ");
			} else {
				System.out.print(addr.toString() + " DomainID " + stores[i].domainId() + " ");
			}
			if (stores[i].registrationId() != 0) {
				System.out.print("RegID " + stores[i].registrationId());
			}
			System.out.println();
		}
			}
			else {
				if (groups.length > 0) {
					for (int j = 0; j < groups.length; j++) {
						System.out.println("Group " + j + ": Size " + groups[j].groupSize());
						for (int i = 0; i < stores.length; i++) {
							if (stores[i].groupIndex() == groups[j].index()) {
								addr = stores[i].address();
								System.out.print("Store " + i + ": ");
								if(stores[i].isNamed()) {
									/* If the IP is 0.0.0.0, this store is specified by name. */
									System.out.print(stores[i].name() + " DomainID " + stores[i].domainId() + " ");
								} else {
									System.out.print(addr.toString() + " DomainID " + stores[i].domainId() + " ");
								}
								if (stores[i].registrationId() != 0) {
									System.out.print("RegID " + stores[i].registrationId());
								}
								System.out.println();
							}
						}
					}
				}
				else {
					System.out.println("Group None: Number of Stores: " + stores.length);
					for (int i = 0; i < stores.length; i++) {
						addr = stores[i].address();
						System.out.print("Store " + i + ": ");
						if(stores[i].isNamed()) {
							/* If the IP is 0.0.0.0, this store is specified by name. */
							System.out.print(stores[i].name() + " DomainID " + stores[i].domainId() + " ");
						} else {
							System.out.print(addr.toString() + " DomainID " + stores[i].domainId() + " ");
						}
						if (stores[i].registrationId() != 0) {
							System.out.print("RegID " + stores[i].registrationId());
						}
						System.out.println();
					}
				}
			}
		} catch (LBMException ex) {
			System.err.println("Error getting source attributes: " + ex.toString());
		}
		System.out.flush();
		return 0;
	}
}

class UMESSrcCB implements LBMSourceEventCallback, LBMMessageReclamationCallback
{
	public boolean blocked = false;
	private int _verbose;
	private int force_reclaim_total = 0;

	public UMESSrcCB(int verbose)
	{
		_verbose = verbose;
	}

	public int onSourceEvent(Object arg, LBMSourceEvent sourceEvent)
	{
		switch (sourceEvent.type())
		{
			case LBM.SRC_EVENT_CONNECT:
				System.out.println("Receiver connect " + sourceEvent.dataString());
				break;
			case LBM.SRC_EVENT_DISCONNECT:
				System.out.println("Receiver disconnect " + sourceEvent.dataString());
				break;
			case LBM.SRC_EVENT_WAKEUP:
				blocked = false;
				break;
			case LBM.SRC_EVENT_UME_REGISTRATION_ERROR:
				System.out.println("Error registering smart source with UME store: "
					+ sourceEvent.dataString());
				break;
			case LBM.SRC_EVENT_UME_DEREGISTRATION_SUCCESS_EX:
				System.out.print("UME_DEREGISTRATION_SUCCESS_EX ");
				System.out.println();
				break;
			case LBM.SRC_EVENT_UME_DEREGISTRATION_COMPLETE_EX:
				System.out.print("UME_DEREGISTRATION_COMPLETE_EX ");
				System.out.println();
				break;

			case LBM.SRC_EVENT_UME_REGISTRATION_SUCCESS_EX:
				UMESourceEventRegistrationSuccessInfo reg = sourceEvent.registrationSuccessInfo();
				System.out.print("UME store " + reg.storeIndex() + ": " + reg.store()
						+ " registration success. RegID " + reg.registrationId() + ". Flags "
						+ reg.flags() + " ");
				if (((reg.flags() & LBM.SRC_EVENT_UME_REGISTRATION_SUCCESS_EX_FLAG_OLD)) != 0) {
					System.out.print("OLD[SQN " + reg.sequenceNumber() + "] ");
				}
				if (((reg.flags() & LBM.SRC_EVENT_UME_REGISTRATION_SUCCESS_EX_FLAG_NOACKS)) != 0) {
					System.out.print("NOACKS ");
				}
				System.out.println();
				break;
			case LBM.SRC_EVENT_UME_REGISTRATION_COMPLETE_EX:
				UMESourceEventRegistrationCompleteInfo regcomp = sourceEvent.registrationCompleteInfo();
				
				umessrc.sleep_before_sending = 1000;
				
				System.out.print("UME registration complete. SQN " + regcomp.sequenceNumber()
						+ ". Flags " + regcomp.flags() + " ");
				if ((regcomp.flags() & LBM.SRC_EVENT_UME_REGISTRATION_COMPLETE_EX_FLAG_QUORUM) != 0) {
					System.out.print("QUORUM ");
				}
				System.out.println();
				break;
			case LBM.SRC_EVENT_UME_MESSAGE_NOT_STABLE:
				UMESourceEventAckInfo nstaInfo = sourceEvent.ackInfo();
				if (_verbose >= 2) {
					System.out.print("UME store " + nstaInfo.storeIndex() + ": "
							+ nstaInfo.store() + " message NOT stable!! SQN " + nstaInfo.sequenceNumber()
							+ " (cd " + nstaInfo.clientObject() + "). Flags " + nstaInfo.flags() + " ");
					if ((nstaInfo.flags() & LBM.SRC_EVENT_UME_MESSAGE_NOT_STABLE_FLAG_LOSS) != 0) {
						System.out.print("LOSS");
					}
					else if ((nstaInfo.flags() & LBM.SRC_EVENT_UME_MESSAGE_NOT_STABLE_FLAG_TIMEOUT) != 0) {
						System.out.print("TIMEOUT");
					}
					System.out.println();
				}
				break;
			case LBM.SRC_EVENT_UME_MESSAGE_STABLE_EX:
				UMESourceEventAckInfo staInfo = sourceEvent.ackInfo();
				blocked = false;
				if (_verbose >= 2) {
					System.out.print("UME store " + staInfo.storeIndex() + ": "
							+ staInfo.store() + " message stable. SQN " + staInfo.sequenceNumber()
							+ " (cd " + staInfo.clientObject() + "). Flags " + staInfo.flags() + " ");
					if ((staInfo.flags() & LBM.SRC_EVENT_UME_MESSAGE_STABLE_EX_FLAG_INTRAGROUP_STABLE) != 0) {
						System.out.print("IA ");
					}
					if ((staInfo.flags() & LBM.SRC_EVENT_UME_MESSAGE_STABLE_EX_FLAG_INTERGROUP_STABLE) != 0) {
						System.out.print("IR ");
					}
					if ((staInfo.flags() & LBM.SRC_EVENT_UME_MESSAGE_STABLE_EX_FLAG_STABLE) != 0) {
						System.out.print("STABLE ");
					}
					if ((staInfo.flags() & LBM.SRC_EVENT_UME_MESSAGE_STABLE_EX_FLAG_STORE) != 0) {
						System.out.print("STORE ");
					}
					System.out.println();
				}

				/* Peg the counter for the received stable message */
				umessrc.stablerecv++;
				break;
			case LBM.SRC_EVENT_UME_DELIVERY_CONFIRMATION_EX:
				UMESourceEventAckInfo cdelvinfo = sourceEvent.ackInfo();
				if (_verbose > 0) {
					System.out.print("UME delivery confirmation. SQN " + cdelvinfo.sequenceNumber()
							+ ", RcvRegID " + cdelvinfo.receiverRegistrationId() + " (cd "
							+ cdelvinfo.clientObject() + "). Flags " + cdelvinfo.flags() + " ");
					if ((cdelvinfo.flags() & LBM.SRC_EVENT_UME_DELIVERY_CONFIRMATION_EX_FLAG_UNIQUEACKS) != 0) {
						System.out.print("UNIQUEACKS ");
					}
					if ((cdelvinfo.flags() & LBM.SRC_EVENT_UME_DELIVERY_CONFIRMATION_EX_FLAG_UREGID) != 0) {
						System.out.print("UREGID ");
					}
					if ((cdelvinfo.flags() & LBM.SRC_EVENT_UME_DELIVERY_CONFIRMATION_EX_FLAG_OOD) != 0) {
						System.out.print("OOD ");
					}
					if ((cdelvinfo.flags() & LBM.SRC_EVENT_UME_DELIVERY_CONFIRMATION_EX_FLAG_EXACK) != 0) {
						System.out.print("EXACK ");
					}
					System.out.println();
				}
				break;
			case LBM.SRC_EVENT_UME_MESSAGE_RECLAIMED:
				if (_verbose > 0)
					System.out.println("UME message reclaimed - sequence number "
						+ Long.toHexString(sourceEvent.sequenceNumber())
						+ " (cd "
						+ Long.toHexString(((Long)sourceEvent.clientObject()).longValue())
						+ ")");
				break;
			case LBM.SRC_EVENT_UME_MESSAGE_RECLAIMED_EX:
				UMESourceEventAckInfo reclaiminfo = sourceEvent.ackInfo();
				blocked = false;
				if (_verbose > 0) {
					if (reclaiminfo.clientObject() != null) {
						System.out.print("UME message reclaimed (ex) - sequence number "
								+ Long.toHexString(reclaiminfo.sequenceNumber())
								+ " (cd "
								+ Long.toHexString(((Long)reclaiminfo.clientObject()).longValue())
								+ "). Flags 0x"
								+ reclaiminfo.flags());
					} else {
						System.out.print("UME message reclaimed (ex) - sequence number "
								+ Long.toHexString(reclaiminfo.sequenceNumber())
								+ " Flags 0x"
								+ reclaiminfo.flags());
					}
					if ((reclaiminfo.flags() & LBM.SRC_EVENT_UME_MESSAGE_RECLAIMED_EX_FLAG_FORCED) != 0) {
						System.out.print(" FORCED");
					}
					System.out.println();
				}
				break;
			case LBM.SRC_EVENT_UME_STORE_UNRESPONSIVE:
					System.out.println("UME store: "
						+ sourceEvent.dataString());
				break;
			case LBM.SRC_EVENT_SEQUENCE_NUMBER_INFO:
				LBMSourceEventSequenceNumberInfo info = sourceEvent.sequenceNumberInfo();
				if (info.firstSequenceNumber() != info.lastSequenceNumber()) {
					System.out.println("SQN [" + info.firstSequenceNumber()
							+ "," + info.lastSequenceNumber() + "] (cd "
							+ info.clientObject() + ")");
				}
				else {
					System.out.println("SQN " + info.lastSequenceNumber()
							+ " (cd " + info.clientObject() + ")");
				}
				break;
			case LBM.SRC_EVENT_FLIGHT_SIZE_NOTIFICATION:
				if (_verbose > 0) {
					LBMSourceEventFlightSizeNotification note = sourceEvent.flightSizeNotification();
					System.out.print("Flight Size Notification. Type ");
					switch (note.type()) {
						case LBM.SRC_EVENT_FLIGHT_SIZE_NOTIFICATION_TYPE_UME:
							System.out.print("UME");
							break;
						case LBM.SRC_EVENT_FLIGHT_SIZE_NOTIFICATION_TYPE_ULB:
							System.out.print("ULB");
							break;
						case LBM.SRC_EVENT_FLIGHT_SIZE_NOTIFICATION_TYPE_UMQ:
							System.out.print("UMQ");
							break;
						default:
							System.out.print("unknown");
							break;
					}
					System.out.println(". Inflight is "
						+ (note.state() == LBM.SRC_EVENT_FLIGHT_SIZE_NOTIFICATION_STATE_OVER ? "OVER" : "UNDER")
						+ " specified flight size");
				}
				break;
			default:
				System.out.println("Unhandled source event [" + sourceEvent.type() + "]. Refer to https://ultramessaging.github.io/currdoc/doc/java_example/index.html#unhandledjavaevents for a detailed description.");
				break;
		}
        sourceEvent.dispose();
		System.out.flush();
		return 0;
	}

	public void onMessageReclaim(Object clientd, String topic, long sqn)
	{
		LongObject t = (LongObject)clientd;
		if (t == null)
		{
			System.err.println("WARNING: smart source for topic \"" + topic + "\" forced reclaim 0x" + Long.toString(sqn, 16));
		}
		else
		{
			long endt = System.currentTimeMillis();
			endt -= t.value;
			force_reclaim_total++;
			if (endt > 5000)
			{
				System.err.println("WARNING: smart source for topic \"" + topic + "\" forced reclaim. Total " + force_reclaim_total);
				t.value = System.currentTimeMillis();
			}
		}
	}
}

class UMESSrcStatsTimer extends LBMTimer
{
	LBMSSource _ssrc;
	boolean _done = false;
	long _tmo;
	LBMObjectRecyclerBase _recycler = null;
	int inflight = 0;

	public UMESSrcStatsTimer(LBMContext ctx, LBMSSource ssrc, long tmo, LBMObjectRecyclerBase objRec) throws LBMException
	{
		super(ctx, tmo, null);
		_ssrc = ssrc;
		_tmo = tmo;
		_recycler = objRec;
	}

	public void done()
	{
		_done = true;
	}

	private void onExpiration()
	{
		print_stats();
		if (!_done)
		{
			try
			{
				this.reschedule(_tmo);
			}
			catch (LBMException ex)
			{
				System.err.println("Error rescheduling timer: " + ex.toString());
			}
		}
	}

	private void print_stats()
	{
		int inflight = 0;
		
		try
		{
			inflight = _ssrc.getSSrcInflight(FLIGHT_SIZE_TYPE_UME);
		}
		catch (LBMException ex)
		{
			System.err.println("Error getting inflight: " + ex.toString());
		}
		try
		{
			LBMSourceStatistics stats = _ssrc.getStatistics();
			switch (stats.type())
			{
				case LBM.TRANSPORT_STAT_LBTRU:
					System.out.println("LBT-RU, sent " + stats.messagesSent()  + "/" + stats.bytesSent()
									+ ", naks " + stats.naksReceived() + "/" + stats.nakPacketsReceived()
									+ ", ignored " + stats.naksIgnored() + "/" + stats.naksIgnoredRetransmitDelay()
									+ ", shed " + stats.naksShed()
									+ ", rxs " + stats.retransmissionsSent()
									+ ", clients " + stats.numberOfClients()
									+ ", app sent " + umessrc.appsent
									+ ", stable " + umessrc.stablerecv
									+ ", inflight " + inflight);
					break;
				case LBM.TRANSPORT_STAT_LBTRM:
					System.out.println("LBT-RM, sent " + stats.messagesSent() + "/" + stats.bytesSent()
									+ ", txw " + stats.transmissionWindowMessages() + "/" + stats.transmissionWindowBytes()
									+ ", naks " + stats.naksReceived() + "/" + stats.nakPacketsReceived()
									+ ", ignored " + stats.naksIgnored() + "/" + stats.naksIgnoredRetransmitDelay()
									+ ", shed " + stats.naksShed()
									+ ", rxs " + stats.retransmissionsSent()
									+ ", rctl " + stats.messagesQueued() + "/" + stats.retransmissionsQueued()
									+ ", app sent " + umessrc.appsent
									+ ", stable " + umessrc.stablerecv
									+ ", inflight " + inflight);
					break;
			}
			if(_recycler != null) {
				_recycler.doneWithSourceStatistics(stats);
			}
			System.out.flush();
		}
		catch (LBMException ex)
		{
			System.err.println("Error getting source statistics: " + ex.toString());
		}	
	}
}

