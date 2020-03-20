import java.nio.ByteBuffer;

import com.latencybusters.lbm.*;

// See https://communities.informatica.com/infakb/faq/5/Pages/80008.aspx
import org.openmdx.uses.gnu.getopt.*;

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

public class lbmlatpong implements LBMSourceCreationCallback, LBMSourceDeletionCallback {

	private volatile boolean found_pinger = false;
	private LBMSource pong_src;
	private int cpu = -1;

	private final static String usage =
"Usage: lbmlatpong [options]\n"+ 
"Available options:\n"+ 
"  -a procnum = set cpu affinity to procnum (disabled).\n"+ 
"  -c filename = Use LBM configuration file filename.\n"+ 
"                Multiple config files are allowed.\n"+ 
"                Example:  '-c file1.cfg -c file2.cfg'\n"+ 
"  -h = help\n"
;

	private void processCommandline(String[] args) {
		Getopt gopt = new Getopt("lbmlatping", args, "a:c:h:");
		boolean error = false;
		int c = -1;
		while ((c = gopt.getopt()) != -1) {
			try {
				switch (c) {
					case 'a':
						cpu = Integer.parseInt(gopt.getOptarg());
						System.err.println("Note: CPU affinity support is disabled.");
						break;
					case 'c':
						try {
							LBM.setConfiguration(gopt.getOptarg());
						}
						catch (LBMException ex) {
							System.err.println("Error setting LBM configuration: "
								+ ex.toString());
							System.exit(1);
						}
						break;
					case 'h':
						printHelpExit(0);
						break;
					default:
						error = true;
						break;
				}
				if (error) break;
			}
			catch (Exception e) {
				/* type conversion exception */
				System.err.println("lbmlatpong: error\n" + e);
				printHelpExit(1);
			}
		}
		if (error) {
			/* An error occurred processing the command line - print help and exit */
			printHelpExit(1);
		}
	}
	
	private static void printHelpExit(int exit_value) {
		System.err.println(LBM.version());
		System.err.println(usage);
		System.exit(exit_value);
	}

	public lbmlatpong() {
		this(new String[0]);
	}

	public lbmlatpong(String args[]) {
		processCommandline(args);
	}

	public static void main(String[] args) {
		lbmlatpong latpong = null;

		LBMContext ctx = null;
		LBMContextAttributes ctx_attr = null;

		LBMTopic pong_src_topic = null;
		LBMSourceAttributes pong_src_topic_attr = null;
		LBMSource pong_src = null;

		LBMTopic ping_rcv_topic = null;
		LBMReceiverAttributes ping_rcv_topic_attr = null;
		@SuppressWarnings("unused")
		lbmlatpongreceiver ping_rcv = null;

		try {
			latpong = new lbmlatpong(args);

			/* Create the context. */
			ctx_attr = new LBMContextAttributes();
			ctx_attr.setValue("resolver_cache", "0");
			ctx_attr.setValue("operational_mode", "sequential");
			ctx_attr.setValue("request_tcp_port_high", "50000");
			ctx = new LBMContext(ctx_attr);
			ctx_attr.dispose();

			/* Create the pong source. */
			pong_src_topic_attr = new LBMSourceAttributes();
			pong_src_topic_attr.setValue("resolver_advertisement_sustain_interval", "0");
			pong_src_topic_attr.setValue("transport", "lbtsmx");
			pong_src_topic = new LBMTopic(ctx, "lbmlat-pong", pong_src_topic_attr);
			pong_src_topic_attr.dispose();
			pong_src = new LBMSource(ctx, pong_src_topic);
			latpong.pong_src = pong_src;

			/* Perform configuration validation */
			/* Note: the ponger will assume that validation is done by the pinger */

			/* Create the ping receiver. */
			ping_rcv_topic_attr = new LBMReceiverAttributes();
			ping_rcv_topic_attr.setSourceNotificationCallbacks(latpong, latpong, null);
			ping_rcv_topic = new LBMTopic(ctx, "lbmlat-ping", ping_rcv_topic_attr);
			ping_rcv_topic_attr.dispose();
			ping_rcv = latpong.new lbmlatpongreceiver(ctx, ping_rcv_topic, latpong);

			/* Wait a bit for things to get set up. */
			Thread.sleep(1000);

			/* Run the context until we've discovered the pinger's source. */
			while (!latpong.found_pinger) {
				ctx.processEvents(100);
			}

			/* Wait a bit for things to get set up. */
			Thread.sleep(1000);

			/* Send in a dummy pong message to kick things off. */
			ByteBuffer buf = pong_src.getMessagesBuffer();
			buf.position(pong_src.acquireMessageBufferPosition(16,0));
			buf.put("0123456789abcdef".getBytes());
			pong_src.messageBuffersComplete();

			/* Wait forever. */
			while (true) {
				Thread.sleep(1000000);
			}

		} catch (LBMException e) {
			e.printStackTrace();
		} catch (InterruptedException e) {
			e.printStackTrace();
		} catch (NumberFormatException e) {
			e.printStackTrace();
		}
	}

	@SuppressWarnings("serial")
	class lbmlatpongreceiver extends LBMReceiver {

		lbmlatpong latpong;
		private final ByteBuffer msgbuf;
		private final LBMSource src;
		private int acquiredPosition = -1;
		private int acquiredSize = -1;

		protected lbmlatpongreceiver(LBMContext lbmctx, LBMTopic lbmtopic, lbmlatpong mylatpong)
				throws LBMException {
			super(lbmctx, lbmtopic);
			latpong = mylatpong;
			src = latpong.pong_src;
			msgbuf = latpong.pong_src.getMessagesBuffer();
			acquiredPosition = -1;
			acquiredSize = -1;
		}

		@Override
		protected int onReceive(LBMMessage msg) {
			final int len = (int)msg.dataLength();
			
			if (msg.type() == LBM.MSG_DATA) {
				try {
					if (acquiredSize != len) {
						if (acquiredSize != -1) {
							src.messageBuffersCancel();
						}
						acquiredSize = len;
						acquiredPosition = src.acquireMessageBufferPosition(len, 0);
					}
					msgbuf.position(acquiredPosition);
					msgbuf.put(msg.getMessagesBuffer());
					acquiredPosition = src.messageBuffersCompleteAndAcquirePosition(len, 0);
				} catch (LBMException e) {
					e.printStackTrace();
				}
			}
			else if ((msg.type() == LBM.MSG_BOS) && (latpong.cpu != -1)) {
			}

			msg.dispose();
			return 0;
		}

	}

	public int onSourceDelete(String source, Object cbObj, Object sourceCbObj) {
		return 0;
	}

	public Object onNewSource(String source, Object cbObj) {
		found_pinger = true;
		return null;
	}

}


