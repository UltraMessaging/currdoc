import com.latencybusters.lbm.*;
import java.util.*;
import java.text.NumberFormat;
import java.math.BigInteger;
// See https://communities.informatica.com/infakb/faq/5/Pages/80008.aspx
import org.openmdx.uses.gnu.getopt.*;
import verifiablemsg.*;

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

class lbmssrc
{
//	private static String pcid = "";
	private static int maxmsglength = 65536;
	private static long msgs = 10000000;
	private static int stats_sec = 0;
	private static boolean verbose = false;
	private static boolean sequential = true;
	private static boolean verifiable = false;
	private static boolean usrbuff = false;
	private static boolean prntds = false;
	private static String purpose = "Purpose: Uses Smart Source to send messages on a single topic.";
	private static String usage =
"Usage: lbmssrc [options] topic\n"+ 
"Available options:\n"+ 
"  -a available-data-space = print the length of available data space\n"+
"  -b user-supplied-buffer =  send messages using a user-supplied buffer\n"+
"  -c filename = Use LBM configuration file filename.\n"+ 
"                Multiple config files are allowed.\n"+ 
"                Example:  '-c file1.cfg -c file2.cfg'\n"+ 
"  -C filename = read context config parameters from filename\n"+ 
"  -d delay = delay sending for delay seconds after source creation\n"+ 
"  -e = use LBM embedded mode\n"+ 
"  -h = help\n"+ 
"  -i msg_prop = send message property as integer value with string key\n"+ 
"                Example:  '-i 1,prop1'\n"+
"  -l len = send messages of len bytes\n"+ 
"  -L linger = linger for linger seconds before closing context\n"+ 
"  -M msgs = send msgs number of messages\n"+ 
"  -N chn = send messages on channel chn\n"+ 
"  -P msec = pause after each send msec milliseconds\n"+ 
"  -s sec = print stats every sec seconds\n"+ 
"  -v = be verbose about each message\n"+ 
"  -V = construct verifiable messages\n"+ 
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
		@SuppressWarnings("unused")
		lbmssrc srcapp = new lbmssrc(args);
	}
	
	int linger = 5;
	int delay = 1;
	int monitor_context_ivl = 0;
	int monitor_source_ivl = 0;
	boolean monitor_context = false;
	boolean monitor_source = false; 
	int mon_transport = LBMMonitor.TRANSPORT_LBM;
	int mon_format = LBMMonitor.FORMAT_CSV;
	String mon_format_options = "";
	String mon_transport_options = "";
	String application_id = null;
	String cconffname = null;
	int msglen = 25;
	long bytes_sent = 0;
	int pause = 0;
	LBMSSource mySmartSource = null;
	long channel = -1;
	ByteBuffer message = null;
	String topicname = null;
	int mprop_int_cnt = 0;
	String[] mprop_int_keys;
	long[] mprop_int_vals;
	String[] optList;
	LBMObjectRecycler objRec = new LBMObjectRecycler();

	private void process_cmdline(String[] args)
	{
		LongOpt[] longopts = new LongOpt[7];
		final int OPTION_MONITOR_CTX = 2;
		final int OPTION_MONITOR_SRC = 3;
		final int OPTION_MONITOR_TRANSPORT = 4;
		final int OPTION_MONITOR_TRANSPORT_OPTS = 5; 
		final int OPTION_MONITOR_FORMAT = 6;
		final int OPTION_MONITOR_FORMAT_OPTS = 7;
		final int OPTION_MONITOR_APPID = 8;

		longopts[0] = new LongOpt("monitor-ctx", LongOpt.REQUIRED_ARGUMENT, null, OPTION_MONITOR_CTX);
		longopts[1] = new LongOpt("monitor-src", LongOpt.REQUIRED_ARGUMENT, null, OPTION_MONITOR_SRC);
		longopts[2] = new LongOpt("monitor-transport", LongOpt.REQUIRED_ARGUMENT, null, OPTION_MONITOR_TRANSPORT);
		longopts[3] = new LongOpt("monitor-transport-opts", LongOpt.REQUIRED_ARGUMENT, null, OPTION_MONITOR_TRANSPORT_OPTS);
		longopts[4] = new LongOpt("monitor-format", LongOpt.REQUIRED_ARGUMENT, null, OPTION_MONITOR_FORMAT);
		longopts[5] = new LongOpt("monitor-format-opts", LongOpt.REQUIRED_ARGUMENT, null, OPTION_MONITOR_FORMAT_OPTS);
		longopts[6] = new LongOpt("monitor-appid", LongOpt.REQUIRED_ARGUMENT, null, OPTION_MONITOR_APPID);
		Getopt gopt = new Getopt("lbmssrc", args, "+C:d:ec:hi:l:M:N:P:s:L:vVab", longopts);
		int c = -1;
		boolean error = false;
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
					case 'd':
						delay = Integer.parseInt(gopt.getOptarg());
						break;
					case 'e':
						sequential = false;
						break;
					case 'h':
						print_help_exit(0);
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
					case 'l':
						msglen = Integer.parseInt(gopt.getOptarg());
						break;
					case 'L':
						linger = Integer.parseInt(gopt.getOptarg());
						break;
					case 'M':
						msgs = Long.parseLong(gopt.getOptarg());
						break;
					case 'N':
						channel = Long.parseLong(gopt.getOptarg());
						break;
					case 'P':
						pause = Integer.parseInt(gopt.getOptarg());
						break;
					case 's':
						stats_sec = Integer.parseInt(gopt.getOptarg());
						break;
					case 'v':
						verbose = true;
						break;
					case 'V':
						verifiable = true;	
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
			}
			catch (Exception e)
			{
				/* type conversion exception */
				System.err.println("lbmssrc: error\n" + e);
				print_help_exit(1);
			}
		}
		
		if (error || gopt.getOptind() >= args.length)
		{	
			/* An error occurred processing the command line - print help and exit */
			print_help_exit(1);
		}
		topicname = args[gopt.getOptind()];
	}
	
	private static void print_help_exit(int exit_value)
	{
		System.err.println(LBM.version());
		System.err.println(purpose);
		System.err.println(usage);
		System.exit(exit_value);
	}

	private lbmssrc(String[] args)
	{
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
		logger = org.apache.log4j.Logger.getLogger("lbmssrc");
		org.apache.log4j.BasicConfigurator.configure();
		log4jLogger lbmlogger = new log4jLogger(logger);
		lbm.setLogger(lbmlogger);

		process_cmdline(args);

		LBMSourceAttributes sattr = null;
		LBMContextAttributes cattr = null;
		try
		{
			sattr = new LBMSourceAttributes();
			cattr = new LBMContextAttributes();
		}
		catch (LBMException ex)
		{
			System.err.println("Error creating attributes: " + ex.toString());
			System.exit(1);
		}
		
		if (channel != -1) {
			sattr.setProperty("smart_src_enable_spectrum_channel", "1");
		}
		if (mprop_int_cnt > 0) {
			sattr.setProperty("smart_src_message_property_int_count", Integer.toString(mprop_int_cnt));
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
		
		sattr.setObjectRecycler(objRec, null);
		
		if (sattr.size() > 0)
			sattr.list(System.out);
		if (cattr.size() > 0)
			cattr.list(System.out);
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
			topic =  ctx.allocTopic(topicname, sattr);
		}
		catch (LBMException ex)
		{
			System.err.println("Error allocating topic: " + ex.toString());
			System.exit(1);
		}
		SSrcCB srccb = new SSrcCB(verbose);
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
		mySmartSource.addSSourceCallback(srccb);
		try
		{
			message = mySmartSource.buffGet();
		}
		catch (LBMException ex)
		{
			System.err.println("Error getting smart source buffer: " + ex.toString());
			System.exit(1);
		}
		
		@SuppressWarnings("unused")
		SSrcStatsTimer stats = null;
		if (stats_sec > 0)
		{
			try
			{
				stats = new SSrcStatsTimer(ctx, mySmartSource, stats_sec * 1000, objRec);
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
		catch (InterruptedException e) 
		{
			System.err.println("lbmssrc: error--" + e);
		}
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
		
		if (delay > 0) 
		{
			System.out.printf("Will start sending in %d second%s...\n", delay, ((delay > 1) ? "s" : ""));
			try
			{
				Thread.sleep(delay * 1000);
			}
			catch (InterruptedException e)
			{
				System.err.println("lbmssrc: error\n" + e);
			}
		}
		
		System.out.printf("Sending %d messages of size %d bytes to topic[%s]\n", 
		                   msgs, msglen, topicname);
						   
		System.out.flush();	
		long start_time = System.currentTimeMillis();
		int totmsgs;
		LBMSSourceSendExInfo exinfo = null;
		ByteBuffer usrbuffmsg = null;

		if ((channel != -1) || (mprop_int_cnt > 0) || usrbuff) {
			exinfo = new LBMSSourceSendExInfo();
			if (channel != -1) {
				exinfo.setChannel(channel);
			}
			if (mprop_int_cnt > 0) {
				exinfo.setMessageProperties(mprop_int_cnt, mprop_int_keys, mprop_int_vals);
			}
			if (usrbuff) {
				/* need to alloc a bytebuffer and fill it with data */
				usrbuffmsg = ByteBuffer.allocateDirect(msglen);
				try {
					exinfo.setUserSuppliedBuffer(usrbuffmsg);
				}
				catch (LBMEInvalException e) {
					System.err.println("lbmssrc: setUserSuppliedBuffer error\n" + e);
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

		for ( totmsgs = 0 ; totmsgs < msgs ; )
		{
			try
			{
				if (verifiable) {
					fillmessage.position(0);
					fillmessage.put(VerifiableMessage.constructVerifiableMessage(msglen));
				} else {
					/* Only put data in message if verbose since this is performance sensitive */
					if (verbose) {
						fillmessage.position(0);
						fillmessage.put("message ".getBytes());
						fillmessage.put(String.valueOf(totmsgs).getBytes());
					}
				}
				mySmartSource.send(message, msglen, 0, exinfo);
				totmsgs++;
			}
			catch (LBMException ex)
			{
				System.err.println("Error sending message: " + ex.toString());
			}
			bytes_sent += msglen;
			if (pause >0)
			{
				try
				{
					Thread.sleep(pause);
				}
				catch (InterruptedException e) 
				{
					System.err.println("lbmssrc: error\n" + e);
				}
			}
		}
		long end_time = System.currentTimeMillis();
		double secs = (end_time - start_time) / 1000.;
		
		System.out.printf("Sent %d messages of size %d bytes in %.03f second%s.\n", 
						  msgs, msglen, secs, ((secs > 1) ? "s" : ""));
		
		print_bw(secs, msgs, bytes_sent);
		System.out.flush();	
		if (linger > 0)
		{
			System.out.printf("Lingering for %d second%s...\n",
			                  linger, ((linger > 1) ? "s" : ""));
			try
			{
				Thread.sleep(linger * 1000);
			}
			catch (InterruptedException e) 
			{
				System.err.println("lbmssrc: error\n" + e);
			}
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
	}

	private static void print_bw(double sec, long msgs, long bytes)
	{
		char scale[] = {'\0', 'K', 'M', 'G'};
		double mps = 0.0, bps = 0.0;
		double kscale = 1000.0;
		int msg_scale_index = 0, bit_scale_index = 0;
		
		if (sec == 0) return; /* avoid division by zero */
		mps = msgs/sec;
		bps = bytes*8/sec;
		
		while (mps >= kscale) {
			mps /= kscale;
			msg_scale_index++;
		}

		while (bps >= kscale) {
			bps /= kscale;
			bit_scale_index++;
		}
		
		NumberFormat nf = NumberFormat.getInstance();
		nf.setMaximumFractionDigits(3);
		System.out.println(sec
				   + " secs. "
				   + nf.format(mps)
				   + " " + scale[msg_scale_index] + "msgs/sec. "
				   + nf.format(bps)
				   + " " + scale[bit_scale_index] + "bps");
	}
}

class SSrcCB implements LBMSourceEventCallback
{
	boolean _verbose = false;

	public SSrcCB(boolean verbose) {
		_verbose = verbose;
	}

	public int onSourceEvent(Object arg, LBMSourceEvent sourceEvent)
	{
		String clientname;

		switch (sourceEvent.type())
		{
			case LBM.SRC_EVENT_TIMESTAMP:
				LBMSourceEventTimestampInfo tsInfo = sourceEvent.timestampInfo();

				if (_verbose) {
					System.out.format("HR@%d.%09d[SQN %d]\n", tsInfo.hrTimestamp().tv_sec(),
						tsInfo.hrTimestamp().tv_nsec(), tsInfo.sequenceNumber());
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
}

class SSrcStatsTimer extends LBMTimer
{
	LBMSSource _ssrc;
	boolean _done = false;
	long _tmo;
	LBMObjectRecyclerBase _recycler = null;

	public SSrcStatsTimer(LBMContext ctx, LBMSSource ssrc, long tmo, LBMObjectRecyclerBase objRec) throws LBMException
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
		try
		{
			LBMSourceStatistics stats = _ssrc.getStatistics();
			switch (stats.type())
			{
				case LBM.TRANSPORT_STAT_TCP:
					System.out.println("TCP, buffered " + stats.bytesBuffered()
							   			+ ", clients " + stats.numberOfClients());
					break;
				case LBM.TRANSPORT_STAT_LBTRU:
					System.out.println("LBT-RU, sent " + stats.messagesSent()  + "/" + stats.bytesSent()
									+ ", naks " + stats.naksReceived() + "/" + stats.nakPacketsReceived()
									+ ", ignored " + stats.naksIgnored() + "/" + stats.naksIgnoredRetransmitDelay()
									+ ", shed " + stats.naksShed()
									+ ", rxs " + stats.retransmissionsSent()
									+ ", clients " + stats.numberOfClients());
					break;
				case LBM.TRANSPORT_STAT_LBTRM:
					System.out.println("LBT-RM, sent " + stats.messagesSent() + "/" + stats.bytesSent()
									+ ", txw " + stats.transmissionWindowMessages() + "/" + stats.transmissionWindowBytes()
									+ ", naks " + stats.naksReceived() + "/" + stats.nakPacketsReceived()
									+ ", ignored " + stats.naksIgnored() + "/" + stats.naksIgnoredRetransmitDelay()
									+ ", shed " + stats.naksShed()
									+ ", rxs " + stats.retransmissionsSent()
									+ ", rctl " + stats.messagesQueued() + "/" + stats.retransmissionsQueued());
					break;
				case LBM.TRANSPORT_STAT_LBTIPC:
					System.out.println("LBT-IPC, clients " + stats.numberOfClients()
									+ ", sent " + stats.messagesSent() + "/" + stats.bytesSent());
					break;
				case LBM.TRANSPORT_STAT_LBTSMX:
					System.out.println("LBT-SMX, clients " + stats.numberOfClients()
											+ ", sent " + stats.messagesSent() + "/" + stats.bytesSent());
					break;
				case LBM.TRANSPORT_STAT_LBTRDMA:
					System.out.println("LBT-RDMA, clients " + stats.numberOfClients()
									+ ", sent "  + stats.messagesSent() + "/" + stats.bytesSent());
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

