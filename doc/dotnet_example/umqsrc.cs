
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
using System;
using System.Text;
using System.Runtime.InteropServices;
using System.Net;
using System.Threading;
using com.latencybusters.lbm;

namespace LBMApplication
{
    class umqsrc
    {
        [DllImport("Kernel32.dll")]
        public static extern int SetEnvironmentVariable(string name, string value);

        private static int force_reclaim_total = 0;
        private static int msgs = 10000000;
        private static int stats_sec = 0;
        public static int flightsz = 0;
        public static bool flightsz_user_set = false;
        public static int appsent = 0;
        public static int stablerecv = 0;
        private static int pause_ivl = 0;
        private static int msgs_per_ivl = 1;
        private static int msgs_per_sec = 0;
        public static uint last_clientd_sent = 0;
        public static uint last_clientd_stable = 0;
        public static int sleep_before_sending = 0;
		public static int initial_ulb_reg = 1;
        private static UMQIndexInfo index_info;
        private static string purpose = "Purpose: Send messages on a single topic.";
        private static string usage =
"Usage: umqsrc [options] topic\n"+ 
"Available options:\n"+ 
"  -A cfg = use ULB Application Sets given by cfg\n"+ 
"  -B broker = use broker specified by address\n"+ 
"  -c filename = Use LBM configuration file filename.\n"+
"                Multiple config files are allowed.\n"+
"                Example:  '-c file1.cfg -c file2.cfg'\n"+
"  -d NUM = delay sending for NUM seconds after source creation\n"+ 
"  -f NUM = allow NUM unstabilized messages in flight\n"+ 
"  -h = help\n"+ 
"  -i = display message IDs for sent message\n"+ 
"  -l len = send messages of len bytes\n"+ 
"  -L linger = linger for linger seconds before closing context\n"+ 
"  -M msgs = send msgs number of messages\n"+ 
"  -N = display sequence number information source events\n"+ 
"  -m NUM = send at NUM messages per second (trumped by -f)\n"+ 
"  -n = used non-blocking I/O\n"+ 
"  -P msec = pause after each send msec milliseconds\n"+ 
"  -R rate/pct = send with LBT-RM at rate and retranmission pct% \n"+ 
"  -s sec = print stats every sec seconds\n"+ 
"  -X = Send using numeric or named UMQ index X\n"+ 
"	 -Y = Send using named UMQ index for broker sources\n"+ 
"  -v = verbose\n"+ 
"\nMonitoring options:\n"+ 
"  --monitor-ctx NUM = monitor context every NUM seconds\n"+ 
"  --monitor-src NUM = monitor source every NUM seconds\n"+ 
"  --monitor-transport TRANS = use monitor transport module TRANS\n"+ 
"                              TRANS may be `lbm', `udp', or `lbmsnmp', default is `lbm'\n"+ 
"  --monitor-transport-opts OPTS = use OPTS as transport module options\n"+ 
"  --monitor-format FMT = use monitor format module FMT\n"+ 
"                         FMT may be `csv'\n"+ 
"  --monitor-format-opts OPTS = use OPTS as format module options\n"+ 
"  --monitor-appid ID = use ID as application ID string\n"+ 
"  --flight-size = See -f above\n"+ 
"  --message-rate = See -m above\n"
;

        static void Main(string[] args)
        {
            if (System.Environment.GetEnvironmentVariable("LBM_LICENSE_FILENAME") == null
                && System.Environment.GetEnvironmentVariable("LBM_LICENSE_INFO") == null)
            {
                SetEnvironmentVariable("LBM_LICENSE_FILENAME", "lbm_license.txt");
            }
            LBM lbm = new LBM();
            lbm.setLogger(new LBMLogging(logger));

            LBMObjectRecycler objRec = new LBMObjectRecycler();

            string topic_name = "";
            int verbose = 0;
            int rm_rate = 0;
            int rm_retrans = 0;
            int delay_secs = -1;
            int msglen = 25;
            int linger = 5;
            ulong bytes_sent = 0;
            int i;
            bool block = true;
            int n = args.Length;
            bool monitor_context = false;
            int monitor_context_ivl = 0;
            bool monitor_source = false;
            int monitor_source_ivl = 0;
            string application_id = null;
            int mon_format = LBMMonitor.FORMAT_CSV;
            int mon_transport = LBMMonitor.TRANSPORT_LBM;
            string mon_format_options = null;
            string mon_transport_options = null;
            bool error = false;
            bool done = false;
            bool show_msg_id = false;
            bool show_sqn_num_events = false;
            string broker = null;
			string appsets = null;
            string[] tokens;
            char[] delim;
            const string OPTION_MONITOR_CTX = "--monitor-ctx";
            const string OPTION_MONITOR_SRC = "--monitor-src";
            const string OPTION_MONITOR_TRANSPORT = "--monitor-transport";
            const string OPTION_MONITOR_TRANSPORT_OPTS = "--monitor-transport-opts";
            const string OPTION_MONITOR_FORMAT = "--monitor-format";
            const string OPTION_MONITOR_FORMAT_OPTS = "--monitor-format-opts";
            const string OPTION_MONITOR_APPID = "--monitor-appid";
            const string OPTION_FLIGHT_SIZE = "--flight-size";
            const string OPTION_MESSAGE_RATE = "--message-rate";
            for (i = 0; i < n; i++)
            {
				try
				{
					switch (args[i])
					{
						case OPTION_MONITOR_APPID:
							if (++i >= n)
							{
								error = true;
								break;
							}
							application_id = args[i];
							break;

						case OPTION_MONITOR_CTX:
							if (++i >= n)
							{
								error = true;
								break;
							}
							monitor_context = true;
							monitor_context_ivl = Convert.ToInt32(args[i]);
							break;

						case OPTION_MONITOR_SRC:
							if (++i >= n)
							{
								error = true;
								break;
							}
							monitor_source = true;
							monitor_source_ivl = Convert.ToInt32(args[i]);
							break;

						case OPTION_MONITOR_FORMAT:
							if (++i >= n)
							{
								error = true;
								break;
							}
							if (args[i].ToLower().CompareTo("csv") == 0)
								mon_format = LBMMonitor.FORMAT_CSV;
							else
							{
								error = true;
								break;
							}
							break;

						case OPTION_MONITOR_TRANSPORT:
							if (++i >= n)
							{
								error = true;
								break;
							}
							if (args[i].ToLower().CompareTo("lbm") == 0)
								mon_transport = LBMMonitor.TRANSPORT_LBM;
							else if (args[i].ToLower().CompareTo("udp") == 0)
								mon_transport = LBMMonitor.TRANSPORT_UDP;
							else if (args[i].ToLower().CompareTo("lbmsnmp") == 0)
								mon_transport = LBMMonitor.TRANSPORT_LBMSNMP;
							else
							{
								error = true;
								break;
							}
							break;

						case OPTION_MONITOR_TRANSPORT_OPTS:
							if (++i >= n)
							{
								error = true;
								break;
							}
							mon_transport_options += args[i];
							break;

						case OPTION_MONITOR_FORMAT_OPTS:
							if (++i >= n)
							{
								error = true;
								break;
							}
							mon_format_options += args[i];
							break;

						case "-A":
							if (++i >= n)
							{
								error = true;
								break;
							}
							appsets = args[i];
							break;
						case "-B":
							if (++i >= n)
							{
								error = true;
								break;
							}
							broker = args[i];
							break;
						case "-c":
							if (++i >= n)
							{
								error = true;
								break;
							}
							try
							{
								LBM.setConfiguration(args[i]);
							}
							catch (LBMException Ex)
							{
								System.Console.Error.WriteLine("umqsrc error: " + Ex.Message);
								error = true;
							}
							break;
						case "-d":
							if (++i >= n)
							{
								error = true;
								break;
							}
							delay_secs = Convert.ToInt32(args[i]);
							if (delay_secs < 0)
								error = true;
							break;
						case OPTION_FLIGHT_SIZE:
						case "-f":
							if (++i >= n)
							{
								error = true;
								break;
							}
							flightsz = Convert.ToInt32(args[i]);
                            flightsz_user_set = true;
							break;

						case "-h":
							print_help_exit(0);
							break;
						case "-i":
							show_msg_id = true;
							break;
						case "-l":
							if (++i >= n)
							{
								error = true;
								break;
							}
							msglen = Convert.ToInt32(args[i]);
							break;

						case "-N":
							show_sqn_num_events = true;
							break;

						case "-n":
							block = false;
							break;

						case "-L":
							if (++i >= n)
							{
								error = true;
								break;
							}
							linger = Convert.ToInt32(args[i]);
							break;

						case OPTION_MESSAGE_RATE:
						case "-m":
							if (++i >= n)
							{
								error = true;
								break;
							}
							msgs_per_sec = Convert.ToInt32(args[i]);
							break;

						case "-M":
							if (++i >= n)
							{
								error = true;
								break;
							}
							msgs = Convert.ToInt32(args[i]);
							break;

						case "-P":
							if (++i >= n)
							{
								error = true;
								break;
							}
							pause_ivl = Convert.ToInt32(args[i]);
							break;
						case "-R":
							if (++i >= n)
							{
								error = true;
								break;
							}
							delim = "/".ToCharArray();
							tokens = args[i].Split(delim);
							if (tokens.Length != 2)
							{
								print_help_exit(1);
							}
							string mult = "";
							string rate = tokens[0];
							char[] tmp = rate.ToCharArray();
							if (rate.Length > 0 && Char.IsLetter(rate, rate.Length - 1))
							{
								mult = rate.Substring(rate.Length - 1);
								rate = rate.Substring(0, rate.Length - 1);
							}
							rm_rate = Convert.ToInt32(rate);
							switch (mult)
							{
								case "k":
								case "K":
									rm_rate *= 1000;
									break;
								case "m":
								case "M":
									rm_rate *= 1000000;
									break;
								case "g":
								case "G":
									rm_rate *= 1000000000;
									break;
								default:
									print_help_exit(1);
									break;
							}
							string pct = tokens[1];
							mult = "";
							if (pct.Length > 0 && !Char.IsNumber(pct, pct.Length - 1))
							{
								mult = pct.Substring(pct.Length - 1);
								pct = pct.Substring(0, pct.Length - 1);
							}
							rm_retrans = Convert.ToInt32(pct);
							switch (mult)
							{
								case "k":
								case "K":
									rm_retrans *= 1000;
									break;
								case "m":
								case "M":
									rm_retrans *= 1000000;
									break;
								case "g":
								case "G":
									rm_retrans *= 1000000000;
									break;
								case "%":
									rm_retrans = rm_rate / 100 * rm_retrans;
									break;
								default:
									print_help_exit(1);
									break;
							}
							break;
						case "-s":
							if (++i >= n)
							{
								error = true;
								break;
							}
							stats_sec = Convert.ToInt32(args[i]);
							break;

						case "-v":
							verbose++;
							break;

                        case "-X":
                            if (++i >= n)
                            {
                                error = true;
                                break;
                            }
                            index_info = new UMQIndexInfo();

                            try
                            {
                                UInt64 numeric_index = Convert.ToUInt64(args[i]);
                                index_info.setNumericIndex(numeric_index);
                            }
                            catch (FormatException )
                            {
                                byte[] index = Encoding.ASCII.GetBytes(args[i]);
                                try
                                {
                                    index_info.setIndex(index, index.Length);
                                }
                                catch (LBMEInvalException ex)
                                {
                                    System.Console.Error.WriteLine("Error setting UMQ index: " + ex.Message);
                                    System.Environment.Exit(1);
                                }
                            }
                            break;
                          case "-Y":
                             if (++i >= n)
                            {
                                error = true;
                                break;
                            }
                            index_info = new UMQIndexInfo();
                            try
                            {
                              byte[] index_y = Encoding.ASCII.GetBytes(args[i]);
                              index_info.setIndex(index_y, index_y.Length);
                            }
                            catch (LBMEInvalException ex)
                            {
                              System.Console.Error.WriteLine("Error setting UMQ index for broker sources: " + ex.Message);
                              System.Environment.Exit(1);
                            }
                            break;
						default:
							if (args[i].StartsWith("-"))
							{
								error = true;
							}
							else
							{
								done = true;
							}
							break;
					}
					if (error || done)
						break;
				}
				catch (Exception e) 
				{
					/* type conversion exception */
					System.Console.Error.WriteLine("umqsrc: error\n" + e.Message);
					print_help_exit(1);
				}
            }
            if (error || i >= n)
            {
               /* An error occurred processing the command line - print help and exit */
				print_help_exit(1);
            }
            topic_name = args[i];

            byte[] message = new byte[msglen];
            LBMContextAttributes cattr = new LBMContextAttributes();
            cattr.setFromXml(cattr.getValue("context_name"));
            cattr.setObjectRecycler(objRec, null);
            LBMSourceAttributes sattr = new LBMSourceAttributes();
            sattr.setFromXml(cattr.getValue("context_name"), topic_name);
            sattr.setObjectRecycler(objRec, null);
            if (broker != null)
            {
                cattr.setValue("broker", broker);
                sattr.setValue("transport", "broker");
            }
			if (appsets != null)
			{
				sattr.setValue("umq_ulb_application_set", appsets);
			}
            bool isBrokerTransport = sattr.getValue("transport").Equals("broker", StringComparison.InvariantCultureIgnoreCase);
			if (isBrokerTransport)
			{
                if (flightsz_user_set) {
                    sattr.setValue("umq_flight_size", flightsz.ToString());
                }
                else {
                    flightsz = Convert.ToInt32(sattr.getValue("umq_flight_size"));
                }
			}
			if (sattr.getValue("umq_ulb_application_set") != "")
			{
				string events = "";

				Console.WriteLine("Using ULB applciation set(s) \"" + sattr.getValue("umq_ulb_application_set") + "\"");
				events = sattr.getValue("umq_ulb_events");
                if (flightsz_user_set) {
                    sattr.setValue("umq_ulb_flight_size", flightsz.ToString());
                }
                else {
                    flightsz = Convert.ToInt32(sattr.getValue("umq_ulb_flight_size"));
                }
				if (flightsz > 0)
				{
					events = "MSG_COMPLETE|RCV_REGISTRATION|RCV_DEREGISTRATION|RCV_TIMEOUT" + ((events == "0") ? "" : ("|" + events));
				}
				if (verbose > 0)
				{
					events = "0xFF";
				}
				if (events != "0")
				{
					Console.WriteLine(" ULB events " + events);
					sattr.setValue("umq_ulb_events",events);
				}
				Console.WriteLine(" Assignment Function(s) \"" + sattr.getValue("umq_ulb_application_set_assignment_function") + "\"");
				Console.WriteLine(" Load Factor Behavior(s) \"" + sattr.getValue("umq_ulb_application_set_load_factor_behavior") + "\"");
			}
            if (!isBrokerTransport && sattr.getValue("umq_ulb_application_set") == "")
            {
                Console.WriteLine("Broker and ULB Application set are not set.  Exiting.");
                System.Environment.Exit(1);
            }
            if (rm_rate != 0)
            {
                sattr.setValue("transport", "LBTRM");
                cattr.setValue("transport_lbtrm_data_rate_limit",
                    rm_rate.ToString());
                cattr.setValue("transport_lbtrm_retransmit_rate_limit",
                    rm_retrans.ToString());
            }

            /* Calculate the approriate message rate */
            if (msgs_per_sec > 0)
                calc_rate_vals();

            System.Console.Out.WriteLine(msgs_per_sec + " msgs/sec -> " + msgs_per_ivl + " msgs/ivl, "
                + pause_ivl + " msec ivl " + flightsz + " inflight");

            if (sattr.getValue("ume_late_join") == "1")
                System.Console.Out.WriteLine("Using UME Late Join.");
            else
                System.Console.Out.WriteLine("Not using UME Late Join.");

            if (sattr.getValue("umq_message_stability_notification") == "1")
            {
                Console.Out.Write("Using UMQ Message Stability Notification. ");
                if (verbose > 0)
                    Console.Out.WriteLine("Will display message stability events. ");
                else
                    Console.Out.WriteLine(" Will not display events. ");
            }
            else
                Console.Out.WriteLine("Not using UMQ Message Stability Notification.");

            /* Set the context source event callback */

            UMESrcCB srccb = new UMESrcCB(verbose);
            cattr.setContextEventCallback(onContextEvent);
            cattr.setContextSourceEventCallback(new LBMContextSourceEventCallback(srccb.onContextSourceEvent));
            LBMContext ctx = new LBMContext(cattr);
            LongObject cd = new LongObject();
            sattr.setMessageReclamationCallback(new LBMMessageReclamationCallback(onMessageReclaim), cd);
            LBMSource src = null;
            LBMSrcStatsTimer stats;
            LBMTopic topic;

            topic = ctx.allocTopic(topic_name, sattr);
            src = ctx.createSource(topic, new LBMSourceEventCallback(srccb.onSourceEvent), null, null);
            if (stats_sec > 0)
            {
                stats = new LBMSrcStatsTimer(ctx, src, stats_sec * 1000, null, objRec);
            }

            LBMMonitorSource lbmmonsrc = null;
            if (monitor_context || monitor_source)
            {
                lbmmonsrc = new LBMMonitorSource(mon_format, mon_format_options, mon_transport, mon_transport_options);
                if (monitor_context)
                    lbmmonsrc.start(ctx, application_id, monitor_context_ivl);
                else
                    lbmmonsrc.start(src, application_id, monitor_source_ivl);
            }
            if (delay_secs != -1)
            {
                Console.WriteLine("Delaying for {0} second{1}.", delay_secs, (delay_secs != 1) ? "s" : "");
                System.Threading.Thread.Sleep(delay_secs * 1000);
            }
            else
            {
                Console.WriteLine("Delaying for 1 second.");
                System.Threading.Thread.Sleep(1000);
            }
            System.Console.Out.WriteLine("Sending "
                       + msgs
                       + " messages of size "
                       + msglen
                       + " bytes to topic ["
                       + topic_name
                       + "]");
			System.Console.Out.Flush();
            long start_time = System.DateTime.Now.Ticks;
            bool regProblem = false;
            LBMSourceSendExInfo exinfo = new LBMSourceSendExInfo();
            
            // index_info can be null here, in which case setIndexInfo() is a no-op.
            exinfo.setIndexInfo(index_info);

            int flags = exinfo.flags();
            flags |= (show_msg_id ? LBM.SRC_SEND_EX_FLAG_UMQ_MESSAGE_ID_INFO : 0);
            flags |= (show_sqn_num_events ? LBM.SRC_SEND_EX_FLAG_SEQUENCE_NUMBER_INFO : 0);
            exinfo.setFlags(flags);

            for (uint count = 0; count < msgs; )
            {
                for (int ivlcount = 0; ivlcount < msgs_per_ivl; ivlcount++)
                {
                    exinfo.setClientObject(count + 1);
                    last_clientd_sent = (uint)count + 1;
                    try
                    {
                        int xflag = 0;

                        srccb.blocked = true;
                        umqsrc.appsent++;
                        src.send(message, msglen, (block ? 0 : LBM.SRC_NONBLOCK) | xflag, exinfo);
                        srccb.blocked = false;
                        count++;
                    }
                    catch (LBMEWouldBlockException)
                    {
                        while (srccb.blocked)
                            System.Threading.Thread.Sleep(100);
                        continue;
                    }
                    catch (UMENoRegException)
                    {
                        if (!regProblem)
                        {
                            regProblem = true;
                            System.Console.Out.WriteLine("Send unsuccessful. Waiting...");
							System.Console.Out.Flush();
                        }
                        System.Threading.Thread.Sleep(1000);
                        umqsrc.appsent--;
                        continue;
                    }
                    if (regProblem)
                    {
                        regProblem = false;
                        System.Console.Out.WriteLine("Send OK. Continuing.");
						System.Console.Out.Flush();
                    }
                    bytes_sent += (ulong)msglen;
                }
                if (pause_ivl > 0)
                {
                    System.Threading.Thread.Sleep(pause_ivl);
                }
            }
            long end_time = System.DateTime.Now.Ticks;
            double secs = (end_time - start_time) / 10000000.0;
            System.Console.Out.WriteLine("Sent "
                       + msgs
                       + " messages of size "
                       + msglen
                       + " bytes in "
                       + secs
                       + " seconds.");
            print_bw(secs, msgs, bytes_sent);
			System.Console.Out.Flush();
            if (linger > 0)
            {
                System.Console.Out.WriteLine("Lingering for "
                                 + linger
                                 + " seconds...");
                System.Threading.Thread.Sleep(linger * 1000);
            }
            stats = new LBMSrcStatsTimer(ctx, src, 0, null, objRec);
            objRec.close();
            src.close();
            ctx.close();
            cd.done();
        }

		private static void print_help_exit(int exit_value)
		{
			System.Console.Error.WriteLine(LBM.version());
			System.Console.Error.WriteLine(purpose);
			System.Console.Error.WriteLine(usage);
			System.Environment.Exit(exit_value);
		}

        private static void logger(int loglevel, string message)
        {
            string level;
            switch (loglevel)
            {
                case LBM.LOG_ALERT: level = "Alert"; break;
                case LBM.LOG_CRIT: level = "Critical"; break;
                case LBM.LOG_DEBUG: level = "Debug"; break;
                case LBM.LOG_EMERG: level = "Emergency"; break;
                case LBM.LOG_ERR: level = "Error"; break;
                case LBM.LOG_INFO: level = "Info"; break;
                case LBM.LOG_NOTICE: level = "Note"; break;
                case LBM.LOG_WARNING: level = "Warning"; break;
                default: level = "Unknown"; break;
            }
            System.Console.Out.WriteLine(System.DateTime.Now.ToString() + " [" + level + "]: " + message);
			System.Console.Out.Flush();
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
            intervals_per_sec = 1000 / (pause_ivl);

            while (pause_ivl <= 1000 && msgs_per_sec % intervals_per_sec != 0)
            {
                pause_ivl++;
                while (((1000 % pause_ivl) != 0) && pause_ivl <= 1000)
                    pause_ivl++;
                intervals_per_sec = 1000 / pause_ivl;
            }
            msgs_per_ivl = msgs_per_sec / intervals_per_sec;
        }

        private static void print_bw(double sec, int msgs, ulong bytes)
        {
            double mps = 0;
            double bps = 0;
            double kscale = 1000;
            double mscale = 1000000;
            char mgscale = 'K';
            char bscale = 'K';

            if (sec == 0) return; /* avoid division by zero */
            mps = msgs / sec;
            bps = bytes * 8 / sec;
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
            System.Console.Out.WriteLine(sec
                       + " secs. "
                       + mps.ToString("0.000")
                       + " " + mgscale + "msgs/sec. "
                       + bps.ToString("0.000")
                       + " " + bscale + "bps");
        }

        private static void onMessageReclaim(object clientd, string topic, long sqn)
        {
            LongObject t = (LongObject)clientd;
            if (t == null)
            {
                System.Console.Error.WriteLine("WARNING: source for topic \"" + topic + "\" forced reclaim 0x" + sqn.ToString("x"));
            }
            else
            {
                long endt = System.DateTime.Now.Ticks / 10000000;
                endt -= t.value;
                force_reclaim_total++;
                if (endt > 5)
                {
                    System.Console.Error.WriteLine("WARNING: source for topic \"" + topic + "\" forced_reclaim. Total " + force_reclaim_total);
                    t.value = System.DateTime.Now.Ticks / 10000000;
                }
            }
        }

        public static int onContextEvent(object cbArg, LBMContextEvent evt)
        {
            switch (evt.type())
            {
                case LBM.CONTEXT_EVENT_UMQ_REGISTRATION_COMPLETE_EX:
                    Console.WriteLine("UMQ queue {0}[{1:X}] ctx registration complete. ID {2:X} Flags {3} {4}",
                                evt.registrationCompleteInfo().queueName(),
                                evt.registrationCompleteInfo().queueId(),
                                evt.registrationCompleteInfo().registrationId(),
                                evt.registrationCompleteInfo().flags(),
                                ((evt.registrationCompleteInfo().flags() & LBM.CONTEXT_EVENT_UMQ_REGISTRATION_COMPLETE_EX_FLAG_QUORUM) == LBM.CONTEXT_EVENT_UMQ_REGISTRATION_COMPLETE_EX_FLAG_QUORUM) ? "QUORUM" : "");
                    break;
                case LBM.CONTEXT_EVENT_UMQ_REGISTRATION_SUCCESS_EX:
                    Console.WriteLine("UMQ queue {0}[{1:X}][{2}][{3}] ctx registration. ID {4:X} Flags {5}",
                                evt.registrationSuccessInfo().queueName(),
                                evt.registrationSuccessInfo().queueId(),
                                evt.registrationSuccessInfo().queueInstanceName(),
                                evt.registrationSuccessInfo().queueInstanceIndex(),
                                evt.registrationSuccessInfo().registrationId(),
                                evt.registrationSuccessInfo().flags());
                    break;
                case LBM.CONTEXT_EVENT_UMQ_REGISTRATION_ERROR:
                    Console.WriteLine("UMQ Registration Error: {0}", evt.dataString());
                    break;
                default:
                    Console.WriteLine("Unknown context event: {0}", evt.dataString());
                    break;
            }
            System.Console.Out.Flush();
            return 0;
        }

    }

    class LongObject
    {
        public long value = 0;

        public void done()
        {
        }
    }

    class UMESrcCB
    {
        public bool blocked = false;
        private int _verbose;

        public UMESrcCB(int verbose)
        {
            _verbose = verbose;
        }

        public void onContextSourceEvent(object cbArg, LBMContextSourceEvent sourceEvent)
        {
            onSourceEvent(cbArg, sourceEvent);
        }

        public void onSourceEvent(Object arg, LBMSourceEvent sourceEvent)
        {
            uint count;
            switch (sourceEvent.type())
            {
                case LBM.SRC_EVENT_CONNECT:
                    System.Console.Out.WriteLine("Receiver connect " + sourceEvent.dataString());
                    break;
                case LBM.SRC_EVENT_DISCONNECT:
                    System.Console.Out.WriteLine("Receiver disconnect " + sourceEvent.dataString());
                    break;
                case LBM.SRC_EVENT_WAKEUP:
					if (_verbose > 0) {
						System.Console.Out.WriteLine("Source wakeup event flags 0x{0:X}", sourceEvent.sourceWakeupInfo().flags());
					}
                    blocked = false;
                    break;
                case LBM.SRC_EVENT_UMQ_REGISTRATION_ERROR:
                    System.Console.Out.WriteLine("Error registering source with UMQ queue: "
                               + sourceEvent.dataString());
                    break;
                case LBM.SRC_EVENT_UMQ_REGISTRATION_COMPLETE_EX:
                    UMQSourceEventRegistrationCompleteInfo regcomp = sourceEvent.queueRegistrationCompleteInfo();

                    umqsrc.sleep_before_sending = 1000;

                    Console.WriteLine("UMQ {0} [{1:X}] src registration complete. Flags {2:X}{3}",
                        regcomp.queueName(),
                        regcomp.queueId(),
                        regcomp.flags(),
                        (regcomp.flags() & LBM.SRC_EVENT_UMQ_REGISTRATION_COMPLETE_EX_FLAG_QUORUM) != 0 ? " QUORUM" : "");
                    break;
                case LBM.SRC_EVENT_UMQ_MESSAGE_STABLE_EX:
                    UMQSourceEventAckInfo staInfo = sourceEvent.queueAckInfo();
                    if (_verbose > 0)
                    {
                        Console.WriteLine("UMQ {0} [{1:X}][{2}][{3}]: message [{4:X}:{5:X}, SQN [{6:X},{7:X}]] stable. (cd {8:X}). Flags {9}{10}{11}{12}",
                            staInfo.queueName(),
                            staInfo.queueId(),
                            staInfo.queueInstanceName(),
                            staInfo.queueInstanceIndex(),
                            staInfo.messageIdInfo().registrationId(),
                            staInfo.messageIdInfo().msgStamp(),
                            staInfo.firstSequenceNumber(),
                            staInfo.lastSequenceNumber(),
                            (uint)staInfo.clientObject(),
                            staInfo.flags(),
                            (staInfo.flags() & LBM.SRC_EVENT_UMQ_MESSAGE_STABLE_EX_FLAG_INTRAGROUP_STABLE) != 0 ? " IA" : "",
                            (staInfo.flags() & LBM.SRC_EVENT_UMQ_MESSAGE_STABLE_EX_FLAG_INTERGROUP_STABLE) != 0 ? " IR" : "",
                            (staInfo.flags() & LBM.SRC_EVENT_UMQ_MESSAGE_STABLE_EX_FLAG_STABLE) != 0 ? " STABLE" : "");

                    }

                    if ((staInfo.flags() & LBM.SRC_EVENT_UMQ_MESSAGE_STABLE_EX_FLAG_STABLE) != 0)
                    {
                        /* Peg the counter for the received stable message */
                        umqsrc.stablerecv++;

                        count = (uint)(staInfo.clientObject());
                    }

                    break;
                case LBM.SRC_EVENT_UMQ_MESSAGE_ID_INFO:
                    UMQSourceEventMessageIdInfo msgid = sourceEvent.messageIdInfo();

                    Console.WriteLine("UMQ Message ID: [{0:X}:{1:X}] (cd {2:X}). Flags {3:X}",
                        msgid.messageId().registrationId(),
                        msgid.messageId().msgStamp(),
                        (uint)msgid.clientObject(),
                        msgid.flags());

                    break;
                case LBM.SRC_EVENT_SEQUENCE_NUMBER_INFO:
                    LBMSourceEventSequenceNumberInfo info = sourceEvent.sequenceNumberInfo();
                    if (info.firstSequenceNumber() != info.lastSequenceNumber())
                    {
                        Console.Out.WriteLine("SQN [" + info.firstSequenceNumber()
                                + "," + info.lastSequenceNumber() + "] (cd "
                                + ((uint)info.clientObject()).ToString("x") + ")");
                    }
                    else
                    {
                        Console.Out.WriteLine("SQN " + info.lastSequenceNumber()
                                + " (cd " + ((uint)info.clientObject()).ToString("x") + ")");
                    }
                    break;
                case LBM.SRC_EVENT_UME_MESSAGE_RECLAIMED:
                    if (_verbose > 0)
                        Console.Out.WriteLine("UME message reclaimed - sequence number "
                                       + sourceEvent.sequenceNumber().ToString("x")
                                       + " (cd "
                                       + ((uint)sourceEvent.clientObject()).ToString("x")
                                       + ")");
                    break;
				case LBM.SRC_EVENT_UME_MESSAGE_RECLAIMED_EX:
					UMESourceEventAckInfo reclaiminfo = sourceEvent.ackInfo();
					if (_verbose > 0) {
						System.Console.Out.Write("UME message reclaimed (ex) - sequence number "
								+ reclaiminfo.sequenceNumber()
								+ " (cd "
								+ ((uint)reclaiminfo.clientObject()).ToString("x")
								+ "). Flags "
								+ reclaiminfo.flags());
						if ((reclaiminfo.flags() & LBM.SRC_EVENT_UME_MESSAGE_RECLAIMED_EX_FLAG_FORCED) != 0) {
							System.Console.Out.Write(" FORCED");
						}
						System.Console.Out.WriteLine();
					}
					break;
                case LBM.SRC_EVENT_UMQ_ULB_RECEIVER_REGISTRATION_EX:
					if (umqsrc.initial_ulb_reg > 0)
					{
						umqsrc.initial_ulb_reg = 0;
					}

                    Console.WriteLine("UMQ ULB [{0:X}][{1:X}][{2}] receiver [{3}] registration.",
									  sourceEvent.ulbReceiverInfo().registrationId(),
									  sourceEvent.ulbReceiverInfo().assignmentId(),
									  sourceEvent.ulbReceiverInfo().applicationSetIndex(),
									  sourceEvent.ulbReceiverInfo().receiver());
                    break;
                case LBM.SRC_EVENT_UMQ_ULB_RECEIVER_DEREGISTRATION_EX:
                    Console.WriteLine("UMQ ULB [{0:X}][{1:X}][{2}] receiver [{3}] deregistration.",
									  sourceEvent.ulbReceiverInfo().registrationId(),
									  sourceEvent.ulbReceiverInfo().assignmentId(),
									  sourceEvent.ulbReceiverInfo().applicationSetIndex(),
									  sourceEvent.ulbReceiverInfo().receiver());
                    break;
                case LBM.SRC_EVENT_UMQ_ULB_RECEIVER_READY_EX:
                    Console.WriteLine("UMQ ULB [{0:X}][{1:X}][{2}] receiver [{3}] ready for messages.",
									  sourceEvent.ulbReceiverInfo().registrationId(),
									  sourceEvent.ulbReceiverInfo().assignmentId(),
									  sourceEvent.ulbReceiverInfo().applicationSetIndex(),
									  sourceEvent.ulbReceiverInfo().receiver());
                    break;
                case LBM.SRC_EVENT_UMQ_ULB_RECEIVER_TIMEOUT_EX:
                    Console.WriteLine("UMQ ULB [{0:X}][{1:X}][{2}] receiver [{3}] EOL.",
									  sourceEvent.ulbReceiverInfo().registrationId(),
									  sourceEvent.ulbReceiverInfo().assignmentId(),
									  sourceEvent.ulbReceiverInfo().applicationSetIndex(),
									  sourceEvent.ulbReceiverInfo().receiver());
                    break;
			    case LBM.SRC_EVENT_UMQ_ULB_MESSAGE_CONSUMED_EX:
					if (_verbose > 0)
					{
						Console.WriteLine("UMQ ULB message [{0:X}:{1:X}] [{2:X},{3:X}] consumed by [{4:X}][{5:X}][{6}][{7}]",
										  sourceEvent.ulbMessageInfo().messageId().registrationId(),
										  sourceEvent.ulbMessageInfo().messageId().msgStamp(),
										  sourceEvent.ulbMessageInfo().firstSequenceNumber(),
										  sourceEvent.ulbMessageInfo().lastSequenceNumber(),
										  sourceEvent.ulbMessageInfo().registrationId(),
										  sourceEvent.ulbMessageInfo().assignmentId(),
										  sourceEvent.ulbMessageInfo().applicationSetIndex(),
										  sourceEvent.ulbMessageInfo().receiver());
					}
					break;
			    case LBM.SRC_EVENT_UMQ_ULB_MESSAGE_ASSIGNED_EX:
					if (_verbose > 0)
					{
						Console.WriteLine("UMQ ULB message [{0:X}:{1:X}] [{2:X},{3:X}] assigned to [{4:X}][{5:X}][{6}][{7}]",
										  sourceEvent.ulbMessageInfo().messageId().registrationId(),
										  sourceEvent.ulbMessageInfo().messageId().msgStamp(),
										  sourceEvent.ulbMessageInfo().firstSequenceNumber(),
										  sourceEvent.ulbMessageInfo().lastSequenceNumber(),
										  sourceEvent.ulbMessageInfo().registrationId(),
										  sourceEvent.ulbMessageInfo().assignmentId(),
										  sourceEvent.ulbMessageInfo().applicationSetIndex(),
										  sourceEvent.ulbMessageInfo().receiver());
					}
					break;
			    case LBM.SRC_EVENT_UMQ_ULB_MESSAGE_REASSIGNED_EX:
					if (_verbose > 0)
					{
						Console.WriteLine("UMQ ULB message [{0:X}:{1:X}] [{2:X},{3:X}] reassigned from [{4:X}][{5:X}][{6}][{7}]",
										  sourceEvent.ulbMessageInfo().messageId().registrationId(),
										  sourceEvent.ulbMessageInfo().messageId().msgStamp(),
										  sourceEvent.ulbMessageInfo().firstSequenceNumber(),
										  sourceEvent.ulbMessageInfo().lastSequenceNumber(),
										  sourceEvent.ulbMessageInfo().registrationId(),
										  sourceEvent.ulbMessageInfo().assignmentId(),
										  sourceEvent.ulbMessageInfo().applicationSetIndex(),
										  sourceEvent.ulbMessageInfo().receiver());
					}
					break;
			    case LBM.SRC_EVENT_UMQ_ULB_MESSAGE_TIMEOUT_EX:
					if (_verbose > 0)
					{
						Console.WriteLine("UMQ ULB message [{0:X}:{1:X}] [{2:X},{3:X}] EOL [{4}]",
										  sourceEvent.ulbMessageInfo().messageId().registrationId(),
										  sourceEvent.ulbMessageInfo().messageId().msgStamp(),
										  sourceEvent.ulbMessageInfo().firstSequenceNumber(),
										  sourceEvent.ulbMessageInfo().lastSequenceNumber(),
										  sourceEvent.ulbMessageInfo().applicationSetIndex());
					}
					break;
			    case LBM.SRC_EVENT_UMQ_ULB_MESSAGE_COMPLETE_EX:
					umqsrc.stablerecv++;
					if (_verbose > 0)
					{
						Console.WriteLine("UMQ ULB message [{0:X}:{1:X}] [{2:X},{3:X}] complete",
										  sourceEvent.ulbMessageInfo().messageId().registrationId(),
										  sourceEvent.ulbMessageInfo().messageId().msgStamp(),
										  sourceEvent.ulbMessageInfo().firstSequenceNumber(),
										  sourceEvent.ulbMessageInfo().lastSequenceNumber());
					}
					break;
                case LBM.SRC_EVENT_FLIGHT_SIZE_NOTIFICATION:
                    if (_verbose > 0)
                    {
                        LBMSourceEventFlightSizeNotification note = sourceEvent.flightSizeNotification();
                        System.Console.Out.Write("Flight Size Notification. Type ");
                        switch (note.type()) {
                            case LBM.SRC_EVENT_FLIGHT_SIZE_NOTIFICATION_TYPE_UME:
                                System.Console.Out.Write("UME");
                                break;
                            case LBM.SRC_EVENT_FLIGHT_SIZE_NOTIFICATION_TYPE_ULB:
                                System.Console.Out.Write("ULB");
                                break;
                            case LBM.SRC_EVENT_FLIGHT_SIZE_NOTIFICATION_TYPE_UMQ:
                                System.Console.Out.Write("UMQ");
                                break;
                            default:
                                System.Console.Out.Write("unknown");
                                break;
                        }
                        System.Console.Out.WriteLine(". Inflight is "
                            + (note.state() == LBM.SRC_EVENT_FLIGHT_SIZE_NOTIFICATION_STATE_OVER ? "OVER" : "UNDER")
                            + " specified flight size");
                    }
                    break;
                default:
                    System.Console.Out.WriteLine("Unhandled source event [" + sourceEvent.type() + "]. Refer to https://ultramessaging.github.io/currdoc/doc/dotnet_example/index.html#unhandledcsevents for a detailed description.");
                    break;
            }
			System.Console.Out.Flush();
            sourceEvent.dispose();
        }
    }

    class LBMSrcStatsTimer : LBMTimer
    {
        private LBMSource _src;
        private bool _done = false;
        private long _tmo;
        private LBMObjectRecyclerBase _recycler;

        public LBMSrcStatsTimer(LBMContext ctx, LBMSource src, long tmo, LBMEventQueue evq, LBMObjectRecyclerBase recycler)
            : base(ctx, tmo, evq)
        {
            _recycler = recycler;
            _src = src;
            _tmo = tmo;
            if (tmo == 0)
                print_stats();
            else
                this.addTimerCallback(new LBMTimerCallback(onExpiration));
        }

        public void done()
        {
            _done = true;
        }

        private void onExpiration(object arg)
        {
            print_stats();
            if (!_done)
            {
                this.reschedule(_tmo);
            }
        }

        private void print_stats()
        {
            LBMSourceStatistics stats = _src.getStatistics();

            switch (stats.type())
            {
                case LBM.TRANSPORT_STAT_TCP:
                    System.Console.Out.WriteLine("TCP, buffered "
                               + stats.bytesBuffered()
                               + ", clients "
                               + stats.numberOfClients()
                               + ", app sent "
                               + umqsrc.appsent
                               + ", stable "
                               + umqsrc.stablerecv
                               + ", inflight "
                               + (umqsrc.stablerecv > umqsrc.appsent ?
                                       umqsrc.stablerecv - umqsrc.appsent :
                                       umqsrc.appsent - umqsrc.stablerecv));

                    break;
                case LBM.TRANSPORT_STAT_LBTRU:
                    System.Console.Out.WriteLine("LBT-RU, sent "
                               + stats.messagesSent()
                               + "/"
                               + stats.bytesSent()
                               + ", naks "
                               + stats.naksReceived()
                               + "/"
                               + stats.nakPacketsReceived()
                               + ", ignored "
                               + stats.naksIgnored()
                               + "/"
                               + stats.naksIgnoredRetransmitDelay()
                               + ", shed "
                               + stats.naksShed()
                               + ", rxs "
                               + stats.retransmissionsSent()
                               + ", clients "
                               + stats.numberOfClients()
                               + ", app sent "
                               + umqsrc.appsent
                               + ", stable "
                               + umqsrc.stablerecv
                               + ", inflight "
                               + (umqsrc.stablerecv > umqsrc.appsent ?
                                       umqsrc.stablerecv - umqsrc.appsent :
                                       umqsrc.appsent - umqsrc.stablerecv));
                    break;
                case LBM.TRANSPORT_STAT_LBTRM:
                    System.Console.Out.WriteLine("LBT-RM, sent "
                               + stats.messagesSent()
                               + "/"
                               + stats.bytesSent()
                               + ", txw "
                               + stats.transmissionWindowMessages()
                               + "/"
                               + stats.transmissionWindowBytes()
                               + ", naks "
                               + stats.naksReceived()
                               + "/"
                               + stats.nakPacketsReceived()
                               + ", ignored "
                               + stats.naksIgnored()
                               + "/"
                               + stats.naksIgnoredRetransmitDelay()
                               + ", shed "
                               + stats.naksShed()
                               + ", rxs "
                               + stats.retransmissionsSent()
                               + ", rctl "
                               + stats.messagesQueued()
                               + "/"
                               + stats.retransmissionsQueued()
                               + ", app sent "
                               + umqsrc.appsent
                               + ", stable "
                               + umqsrc.stablerecv
                               + ", inflight "
                               + (umqsrc.stablerecv > umqsrc.appsent ?
                                       umqsrc.stablerecv - umqsrc.appsent :
                                       umqsrc.appsent - umqsrc.stablerecv));
                    break;
                case LBM.TRANSPORT_STAT_LBTIPC:
                    System.Console.Out.WriteLine("LBT-IPC, source " + stats.source()
                        + " clients "
                        + stats.numberOfClients()
                        + ", sent "
                        + stats.messagesSent()
                        + "/"
                        + stats.bytesSent()
                        + ", app sent "
                        + umqsrc.appsent
                        + ", stable "
                        + umqsrc.stablerecv
                        + ", inflight "
                        + (umqsrc.stablerecv > umqsrc.appsent ?
                           umqsrc.stablerecv - umqsrc.appsent :
                           umqsrc.appsent - umqsrc.stablerecv));
                    break;
/*
   Note: Ultra Messaging Persistence and Queuing Editions does not
   currently support the SMX transport. As such, there is no reason
   for this example program to print these statistics.
 */
//              case LBM.TRANSPORT_STAT_LBTSMX:
//                  System.Console.Out.WriteLine("LBT-SMX, source " + stats.source()
//                      + " clients "
//                      + stats.numberOfClients()
//                      + ", sent "
//                      + stats.messagesSent()
//                      + "/"
//                      + stats.bytesSent()
//                      + ", app sent "
//                      + umqsrc.appsent
//                      + ", stable "
//                      + umqsrc.stablerecv
//                      + ", inflight "
//                      + (umqsrc.stablerecv > umqsrc.appsent ?
//                         umqsrc.stablerecv - umqsrc.appsent :
//                         umqsrc.appsent - umqsrc.stablerecv));
//                  break;
                case LBM.TRANSPORT_STAT_LBTRDMA:
                    System.Console.Out.WriteLine("LBT-RDMA, source " + stats.source()
                        + " clients "
                        + stats.numberOfClients()
                        + ", sent "
                        + stats.messagesSent()
                        + "/"
                        + stats.bytesSent()
                        + ", app sent "
                        + umqsrc.appsent
                        + ", stable "
                        + umqsrc.stablerecv
                        + ", inflight "
                        + (umqsrc.stablerecv > umqsrc.appsent ?
                           umqsrc.stablerecv - umqsrc.appsent :
                           umqsrc.appsent - umqsrc.stablerecv));
                    break;
                case LBM.TRANSPORT_STAT_BROKER:
                    System.Console.Out.WriteLine("BROKER, source " + stats.source()
                               + ", sent "
                               + stats.messagesSent()
                               + "/"
                               + stats.bytesSent()
                               + ", app sent "
                               + umqsrc.appsent
                               + ", stable "
                               + umqsrc.stablerecv
                               + ", inflight "
                               + (umqsrc.stablerecv > umqsrc.appsent ?
                                       umqsrc.stablerecv - umqsrc.appsent :
                                       umqsrc.appsent - umqsrc.stablerecv));

                    break;
            }
			System.Console.Out.Flush();
            _recycler.doneWithSourceStatistics(stats);
        }
    }
}
