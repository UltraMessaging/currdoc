import java.util.Arrays;
import java.io.PrintStream;
import java.io.UnsupportedEncodingException;
import java.nio.ByteBuffer;

import com.latencybusters.lbm.LBM;
import com.latencybusters.lbm.LBMContext;
import com.latencybusters.lbm.LBMContextAttributes;
import com.latencybusters.lbm.LBMException;
import com.latencybusters.lbm.LBMMessage;
import com.latencybusters.lbm.LBMReceiver;
import com.latencybusters.lbm.LBMReceiverAttributes;
import com.latencybusters.lbm.LBMSource;
import com.latencybusters.lbm.LBMSourceAttributes;
import com.latencybusters.lbm.LBMTopic;

// See https://communities.informatica.com/infakb/faq/5/Pages/80008.aspx
import org.openmdx.uses.gnu.getopt.*;

/*
  Copyright (C) 2005-2021, Informatica Corporation  Permission is granted to licensees to use
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

public class lbmlatping {

        /* Send each message around a large number of times -- needed because the clocks
         * are not accurate enough to measure one round trip. */
        static final private int NUM_ROUNDTRIPS_PER_MSG = 250;

        /* Ignore the results for the first two thousand messages (things still getting
         * set up). */
        static final private int NUM_MSGS_IGNORED = 2000;

        /* Total messages sent = fifty thousand, plus the amount ignored */
        static final private int NUM_MSGS = (50 * 1000) + NUM_MSGS_IGNORED;

	private ByteBuffer msgbuf = null;
	private LBMSource ping_src;
	private long usBusyWaitPause = 0;
	private int cpu = -1;

	private final static String usage =
"Usage: lbmlatping [options]\n"+ 
"Available options:\n"+ 
"  -a procnum = set cpu affinity to procnum (disabled).\n"+ 
"  -c filename = Use LBM configuration file filename.\n"+ 
"                Multiple config files are allowed.\n"+ 
"                Example:  '-c file1.cfg -c file2.cfg'\n"+ 
"  -h = help\n"+ 
"  -l len = use len length messages\n"+ 
"  -P usec = pause after each send usec microseconds (busy wait only)\n"
;

	public lbmlatping() {
		this(new String[0]);
	}

	public lbmlatping(String args[]) {
		processCommandline(args);
		if (msgbuf == null) generatePayload(16);
	}

	private void generatePayload(int msglen) {
		if ((msgbuf != null) && (msgbuf.limit() == msglen)) return;

		try {
			msgbuf = ByteBuffer.allocateDirect(msglen);
			StringBuilder msg = new StringBuilder(msglen + 50);
			while (msg.length() < msglen) {
				msg.append("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ");
			}
			byte[] payload = msg.substring(0, msglen).getBytes("UTF-8");
			msgbuf.put(payload);
			msgbuf.position(0);
			msgbuf.mark();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
	}

	private void processCommandline(String[] args) {
		Getopt gopt = new Getopt("lbmlatping", args, "a:c:hl:P:");
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
					case 'l':
						int msglen = Integer.parseInt(gopt.getOptarg());
						generatePayload(msglen);
						break;
					case 'P':
						usBusyWaitPause = Integer.parseInt(gopt.getOptarg());
						break;
					default:
						error = true;
						break;
				}
				if (error) break;
			}
			catch (Exception e) {
				/* type conversion exception */
				System.err.println("lbmpong: error\n" + e);
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

	public static void main(String[] args) {
		lbmlatping latping = null;

		LBMContext ctx = null;
		LBMContextAttributes ctx_attr = null;

		LBMTopic ping_src_topic = null;
		LBMSourceAttributes ping_src_topic_attr = null;
		LBMSource ping_src = null;

		LBMTopic pong_rcv_topic = null;
		LBMReceiverAttributes pong_rcv_topic_attr = null;
		@SuppressWarnings("unused")
		lbmlatpingreceiver pong_rcv = null;

		latping = new lbmlatping(args);
		try {
			/* Create the context. */
			ctx_attr = new LBMContextAttributes();
			ctx_attr.setValue("resolver_cache", "0");
			ctx_attr.setValue("operational_mode", "sequential");
			ctx_attr.setValue("request_tcp_port_high", "50000");
			ctx = new LBMContext(ctx_attr);
			ctx_attr.dispose();

			/* Create the ping source. */
			ping_src_topic_attr = new LBMSourceAttributes();
			ping_src_topic_attr.setValue("resolver_advertisement_sustain_interval", "0");
			ping_src_topic_attr.setValue("transport", "lbtsmx");
			ping_src_topic = new LBMTopic(ctx, "lbmlat-ping", ping_src_topic_attr);
			ping_src_topic_attr.dispose();
			ping_src = new LBMSource(ctx, ping_src_topic);
			latping.ping_src = ping_src;

			/* Perform configuration validation */
			final int smx_header_size = 16;
			int max_payload_size =
				Integer.parseInt(ping_src.getAttributeValue("transport_lbtsmx_datagram_max_size")) + smx_header_size;
			if (latping.msgbuf.limit() > max_payload_size) {
				/* The SMX transport doesn't fragment, so payload must be within maximum size limits */
				System.out.println("Error: Message size requested is larger than configured SMX datagram size.");
				System.exit(1);
			}

			/* Create the pong receiver. */
			pong_rcv_topic_attr = new LBMReceiverAttributes();
			pong_rcv_topic = new LBMTopic(ctx, "lbmlat-pong", pong_rcv_topic_attr);
			pong_rcv_topic_attr.dispose();
			pong_rcv = latping.new lbmlatpingreceiver(ctx, pong_rcv_topic, latping);

			/* Run the context just long enough to advertise. */
			ctx.processEvents(100);

			/* The ponger kicks things off as soon as he's discovered our ping source. */
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
	class lbmlatpingreceiver extends LBMReceiver {

		private final lbmlatping latping;
		private final long[] tsstart = new long[lbmlatping.NUM_MSGS+2];
		private final long[] tsend = new long[lbmlatping.NUM_MSGS+1];
		private final LBMSource src;

		private int bounce_count = NUM_ROUNDTRIPS_PER_MSG; 
		private int rcvd_msgs = 0;

		private final ByteBuffer buf;
		private final ByteBuffer msgbuffer;
		private int acquiredPosition = -1;
		private final int acquiredSize;
		

		protected lbmlatpingreceiver(LBMContext lbmctx, LBMTopic lbmtopic, lbmlatping mylatping)
				throws LBMException {
			super(lbmctx, lbmtopic);
			latping = mylatping;
			src = mylatping.ping_src;
			buf = mylatping.ping_src.getMessagesBuffer();
			msgbuffer = latping.msgbuf;
			acquiredSize = latping.msgbuf.limit();
			// pre-acquire our first buffer
			try {
				acquiredPosition = src.acquireMessageBufferPosition(acquiredSize, 0);
			} catch (LBMException ex) {
				ex.printStackTrace();
			}
		}

		@Override
		protected int onReceive(LBMMessage msg) {
			if (msg.type() == LBM.MSG_DATA) {
				try {
					if (++bounce_count < NUM_ROUNDTRIPS_PER_MSG) {
						// Bounce the message -- no need to size check
						buf.position(acquiredPosition);
						buf.put(msg.getMessagesBuffer());
						acquiredPosition =
							src.messageBuffersCompleteAndAcquirePosition(acquiredSize, 0);
					} else {
						tsend[rcvd_msgs] = System.nanoTime();
						tsstart[rcvd_msgs+1] = tsend[rcvd_msgs];
						if (usBusyWaitPause > 0) {
							// Busy wait for at least requested microseconds.
							long tstarget = tsend[rcvd_msgs] + (usBusyWaitPause * 1000);
							while (tstarget > System.nanoTime());
							tsstart[rcvd_msgs+1] = System.nanoTime();
						}
					
						buf.position(acquiredPosition);
						buf.put(msgbuffer);
						acquiredPosition =
							src.messageBuffersCompleteAndAcquirePosition(acquiredSize, 0);
						msgbuffer.reset();
						bounce_count = 0;

						if (rcvd_msgs++ == lbmlatping.NUM_MSGS) {
							int i;
							double min = Double.MAX_VALUE, max = 0;
							@SuppressWarnings("unused")
							int max_idx = -1;
							double elapsed_ts[] = new double[lbmlatping.NUM_MSGS - lbmlatping.NUM_MSGS_IGNORED];

							System.out.println("Successfully sent & received " + lbmlatping.NUM_MSGS + " total "
								+ latping.msgbuf.limit() + "-byte messages, ignoring the first "
								+ lbmlatping.NUM_MSGS_IGNORED + " messages.");
							System.out.println("Round-trip times in nanoseconds.");

							for (i = lbmlatping.NUM_MSGS_IGNORED; i < lbmlatping.NUM_MSGS; i++) {
								elapsed_ts[i - lbmlatping.NUM_MSGS_IGNORED] =
									((double)(tsend[i] - tsstart[i])) / NUM_ROUNDTRIPS_PER_MSG;
								if (elapsed_ts[i - lbmlatping.NUM_MSGS_IGNORED] < min)
									min = elapsed_ts[i - lbmlatping.NUM_MSGS_IGNORED];
								else if (elapsed_ts[i - lbmlatping.NUM_MSGS_IGNORED] > max) {
									max = elapsed_ts[i - lbmlatping.NUM_MSGS_IGNORED];
									max_idx = i - lbmlatping.NUM_MSGS_IGNORED;
								}
							}

							/* Now calculate some summary statistics. */
							lbmStats stats = new lbmStats();
							Arrays.sort(elapsed_ts);
							stats.calcSummaryStats(elapsed_ts);
							System.out.printf("Min: %.0f, Max %.0f\n", min, max);
							System.out.printf("Mean: %.0f, Median: %.0f, Standard Dev: %.0f\n", stats.mean,
								stats.data[stats.data.length / 2], stats.sample_sd);
							System.out.printf("99.9%%: %.0f, 99%%: %.0f, 95%%: %.0f, 90%%: %.0f, 80%%: %.0f\n",
								stats.data[(stats.data.length * 999) / 1000],
								stats.data[(stats.data.length * 99) / 100],
								stats.data[(stats.data.length * 95) / 100],
								stats.data[(stats.data.length * 9) / 10],
								stats.data[(stats.data.length * 8) / 10]);

							/* We're done. */
							System.exit(0);
						}
					}
				} catch (LBMException e) {
					e.printStackTrace();
				}
			}
			else if ((msg.type() == LBM.MSG_BOS) && (latping.cpu != -1)) {
			}

			msg.dispose();
			return 0;
		}

	}
}


/*
 *  lbmStats class
 *
 *  Original Port Date: March 2013
 *              Author: hwong
 */

class lbmStats {
/* 
    This class has been ported from a C library, and hence,
    has code that follows a different copyright. That copyright
    message is included here...


    Copyright (c) 2011 Anil Madhavapeddy <anil@recoil.org>

    Permission is hereby granted, free of charge, to any person
    obtaining a copy of this software and associated documentation
    files (the "Software"), to deal in the Software without
    restriction, including without limitation the rights to use,
    copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the
    Software is furnished to do so, subject to the following
    conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
    OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
    HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
    WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
    FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
    OTHER DEALINGS IN THE SOFTWARE.
*/
    public double data[];

    public double mean;
    public double sample_sd;
    public double sample_skew;
    public double sample_kurtosis;

    public double alpha;
    public double beta;

    public lbmStats calcSummaryStats(double [] data) {
        /* On-line calculation of mean, variance, skew and kurtosis
           lifted straight from wikipedia. */
        double mean = 0;
        double m2 = 0;
        double m3 = 0;
        double m4 = 0;
        double delta;
        double delta_n;
        double variance;
        double sd;
        double skew;
        double kurtosis;
        double n;
        int i;

        for (i = 0; i < data.length; i++) {
            n = i + 1;
            delta = data[i] - mean;
            delta_n = delta / n;
            mean = (mean * i) / n + data[i]/n;
            m4 = m4 + delta_n * delta_n * delta_n * delta * (n - 1) * (n * n - 3 * n + 3) + 6 * delta_n * delta_n * m2 - 4 * delta_n * m3;
            m3 = m3 + delta_n * delta_n * delta * (n - 1) * (n - 2) - 3 * delta_n * m2;
            m2 = m2 + delta_n * delta * (n - 1);
        }

        variance = m2 / data.length;
        sd = Math.sqrt(variance);
        skew = m3/(data.length * sd * sd * sd);
        kurtosis = data.length * m4 / (m2*m2) - 3;

        this.mean = mean;
        this.sample_sd = sd;
        this.sample_skew = skew;
        this.sample_kurtosis = kurtosis;

        this.data = data;
	return this;
    }

    public double pointToPercentile(double point) {
        int low, high;
        int probe;

        if (point < data[0])
            return 0;
        else if (point > data[data.length-1])
            return 100;
        low = 0;
        high = data.length;
        while (low + 1 < high) {
            /* Invariant: everything in slots before @low is less than @point,
               everything in slots at or after @high is greater than
               @point. */
            probe = (high + low) / 2;
            if (point > data[probe]) {
                low = probe + 1;
            } else if (point < data[probe]) {
                high = probe;
            } else {
                /* The probe is now in the range of data which is equal to
                   point. */
                return doProbeIsPointPercentile(point, low, high, probe);
            }
        }
        if (high == low + 1) {
            if (point < data[low]) {
                low--;
                high--;
            }
            if (data[low] == point) {
                probe = low;
                return doProbeIsPointPercentile(point, low, high, probe);
            } else if (data[high] == point) {
                probe = high;
                return doProbeIsPointPercentile(point, low, high, probe);
            } else {
                return doLinearInterpolatePercentile(point, low, high);
            }
        } else {
            if (low == 0) {
                return 0;
            } else {
                low = high - 1;
                return doLinearInterpolatePercentile(point, low, high);
            }
        }
    }

    // Argh. The orig code has gotos, so I had to break it out to methods (see pointToPercentile)
    private double doProbeIsPointPercentile(double point, int low, int high, int probe) {
        low = probe;
        while (low >= 0 && data[low] == point)
            low--;
        high = probe;
        while (high < data.length && data[high] == point)
            high++;
        return (high + low) * 50.0 / data.length;
    }
	

    // Argh. The orig code has gotos, so I had to break it out to methods (see pointToPercentile)
    private double doLinearInterpolatePercentile(double point, int low, int high) {
        double y1, y2, num, denum;

        y1 = data[low];
        y2 = data[high];
        num = (point + y2 * low - high * y1) * 100.0 / data.length;
        denum = y2 - y1;
        if (Math.abs(denum / num) < 0.01) {
            /* The two points we're trying to interpolate between are so close
               together that we risk numerical error, so we can't use the
               normal formula.  Fortunately, if they're that close together
               then it doesn't really matter, and we can use a simple
               average. */
            return (low + high) * 50.0 / data.length;
        } else {
            return num / denum;
        }
    }

    public void printSummaryStats(PrintStream f) {
        double sd_percentiles[] = new double[7];
        int i;

        f.printf("\tMean %e, sample sd %e, sample skew %e, sample kurtosis %e\n",
               mean, sample_sd, sample_skew, sample_kurtosis);
        f.printf("\tQuintiles: %e, %e, %e, %e, %e, %e\n",
               data[0],
               data[data.length / 5],
               data[data.length * 2 / 5],
               data[data.length * 3 / 5],
               data[data.length * 4 / 5],
               data[data.length - 1]);
        f.printf("\t5%% %e, median %e, 95%% %e\n",
               data[data.length / 20],
               data[data.length / 2],
               data[data.length * 19 / 20]);

        /* Also look at how deltas from the mean, in multiples of the SD,
           map onto percentiles, to get more hints about non-normality. */
        for (i = 0; i < 7; i++) {
            double point = mean + sample_sd * (i - 3);
            sd_percentiles[i] = pointToPercentile(point);
        }
        f.printf("\tSD percentiles: -3 -> %f%%, -2 -> %f%%, -1 -> %f%%, 0 -> %f%%, 1 -> %f%%, 2 -> %f%%, 3 -> %f%%\n",
               sd_percentiles[0],
               sd_percentiles[1],
               sd_percentiles[2],
               sd_percentiles[3],
               sd_percentiles[4],
               sd_percentiles[5],
               sd_percentiles[6]);
    }

    public lbmStats linearRegression(double data[]) {
        double x_bar;
        double x_bar2;
        double x_y_bar;
        double y_bar;
        int i;

        x_y_bar = 0;
        y_bar = 0;

        for (i = 0; i < data.length; i++) {
            x_y_bar += data[i] * (i + 1);
            y_bar += data[i];
        }

        x_y_bar /= data.length;
        y_bar /= data.length;

        x_bar = data.length / 2.0 + 1;
        x_bar2 = (data.length + 2.0) * (2.0 * data.length + 1) / 6.0;

        beta = (x_y_bar - x_bar * y_bar) / (x_bar2 - x_bar * x_bar);
        alpha = y_bar - beta * x_bar;

        /* Norm so that xs run from 0 to 1, rather than from 0 to
           sample size, because that's a bit easier to think about. */
        beta *= data.length;
	return this;
    }

    /* Note: didn't port "summarise_samples" -- see c code if needed
     */
}

