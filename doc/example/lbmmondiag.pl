#!/usr/bin/perl -w
use strict;
# lbmmondiag.pl: Interpret and print LBM monitoring statistics, assigning severity estimates to those of diagnostic interest
#
# (C) Copyright 2009,2023 Informatica Inc.  Permission is granted to licensees to use
# or alter this software for any purpose, including commercial applications,
# according to the terms laid out in the Software License Agreement.
#
# This source code example is provided by Informatica for educational   
# and evaluation purposes only.
#
# THE SOFTWARE IS PROVIDED "AS IS" AND INFORMATICA DISCLAIMS ALL WARRANTIES
# EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION, ANY IMPLIED WARRANTIES OF
# NON-INFRINGEMENT, MERCHANTABILITY OR FITNESS FOR A PARTICULAR
# PURPOSE.  INFORMATICA DOES NOT WARRANT THAT USE OF THE SOFTWARE WILL BE
# UNINTERRUPTED OR ERROR-FREE.  INFORMATICA SHALL NOT, UNDER ANY CIRCUMSTANCES, BE
# LIABLE TO LICENSEE FOR LOST PROFITS, CONSEQUENTIAL, INCIDENTAL, SPECIAL OR
# INDIRECT DAMAGES ARISING OUT OF OR RELATED TO THIS AGREEMENT OR THE
# TRANSACTIONS CONTEMPLATED HEREUNDER, EVEN IF INFORMATICA HAS BEEN APPRISED OF
# THE LIKELIHOOD OF SUCH DAMAGES.
#
# Purpose
#  This example shows how LBM transport statistics can be monitored to
#  produce useful diagnostic information about the operation of a system.
#  The output is designed to be of interest to those accustomed to
#  network monitoring.  It is suitable for logging or futher parsing.
#  No output is generated for normal operation.  Statistics that show
#  abnormal operation are printed and interpreted.
#  See LBM Application Notes section on LBM Monitoring for more details.
#
# Operation
#  lbmmondiag.pl reads output from lbmmonudp.  Typically, just run
#   lbmmonudp -a 127.0.0.1
#  if it's on the same machine.
#
#  In the interest of scalability, LBM does not generate monitoring
#  statistics by default.  Most of the supplied examples will generate
#  monitoring statistics with the --monitor-ctx=n option where n is the
#  number of seconds between reports.
#  E.g.: lbmrcv --monitor-ctx=5 TestTopic
#
#  It may help with testing to introduce a percentage of random datagram loss:
#   Bourne shell and decendants: export LBTRM_LOSS_RATE; LBTRM_LOSS_RATE=2
#   C shell and decendants: setenv LBTRM_LOSS_RATE 2
#   Don't forget to set LBTRM_LOSS_RATE back to 0 when done testing!
#
# To Do
#  Add severity 3 diagnostics
#  Add decoding for LBT-RU receiver
#  Remove any leftover XXX code
#  Test on platforms other than Linux
#  Spell check

use Getopt::Std;
use IO::Socket;

# Option defaults and parsing
my %options=(1 => '1', 2 => '1', 3 => '0',
    d => 2000, p => '1234', r => 1000000000);
getopts("1:2:3:d:hp:r:",\%options);
my $tx_dg_sz = $options{d};
my $port = $options{p};
my $tx_rate = $options{r};
if ($options{h}) {
    print
"Usage: lbmmondiag.pl [options]\n",
"  -1 x      Boolean x controls printing of sev 1 diagnostics (default 1)\n",
"  -2 x      Boolean x controls printing of sev 2 diagnostics (default 1)\n",
"  -3 x      Boolean x controls printing of sev 3 diagnostics (default 0)\n",
"  -d dg_sz  Use dg_sz (bytes) to estimate send datagram size (default 2000)\n",
"  -h        Display this help and exit\n",
"  -p port   Use port to listen for UDP from lbmmonudp (default 1234)\n",
"  -r rate   Use rate (bits per second) to estimate send rate (default 1 gbps)\n";
    exit 1;
}

# Globals needed for common diagnostic printing
my ($sec,$min,$hour,$mday,$mon,$year,$wday,$yday,$isdst);
my $key;
my $ts_printed = 0;

# Common diagnostic printing
sub pr_diag {
    my ($sev, $diag) = @_;
    return if (!$options{$sev});
    if (!$ts_printed) {
    	$ts_printed = 1;
	printf("%02d:%02d:%02d %s\n", $hour, $min, $sec, $key);
    }
    print " Sev$sev: $diag\n";
}

# Contining with main line code
# Open socket to receive statistics from lbmmonudp command via UDP port
my $sock = IO::Socket::INET->new(LocalPort => $port, Proto => "udp")
    or die "Couldn't bind to udp port $port: $@\n";

# Retain last values for all totalizing counters to compute difference
my (%last_naks_rcved, %last_rxs_sent);			# RM & RU Sources
my (%last_lost, %last_naks_sent);			# RM & RU Receivers
my (%last_unrecovered_txw, %last_unrecovered_tmo);	# RM & RU Receivers

# Setup for main loop
my ($fmt, $ts, $addr, $appid, $src, $rest);	# Fields common to all formats
my ($him, $datagram, $flags);
my $max = 8192;

# Main loop
while ($him = $sock->recv($datagram, $max, $flags)) {
    chomp($datagram);
    $ts_printed = 0;

    # Parse fields common to all formats
    ($fmt, $ts, $addr, $appid, $src, $rest) = split(/,/, $datagram, 6);
    ($sec,$min,$hour,$mday,$mon,$year,$wday,$yday,$isdst) = localtime($ts);
    $addr  =~ s/^"|"$//g;	# Strip leading & trailing quotes
    $appid =~ s/^"|"$//g;
    $src   =~ s/^"|"$//g;
    $key = "$addr-$appid-$src";
    if ($fmt eq "3") {	# LBT-RM Source
    	my ($msgs_sent, $bytes_sent, $txw_msgs, $txw_bytes, $nak_pckts_rcved,
	    $naks_rcved, $naks_ignored, $naks_shed, $naks_rx_delay_ignored,
	    $rxs_sent, $rctlr_data_msgs, $rctlr_rx_msgs)
	    = split(/,/, $rest);
	if ($rctlr_data_msgs > 0) {
	    pr_diag(2, "$rctlr_data_msgs datagrams queued by data rate controller");
	}
	if ($rctlr_rx_msgs > 0) {
	    pr_diag(2, "$rctlr_rx_msgs datagrams queued by retransmission rate controller");
	}
	if (defined($last_naks_rcved{$key})) {
	    my $diff = $naks_rcved - $last_naks_rcved{$key};
	    pr_diag(2, "$diff NAKs received") if ($diff > 0);
	}
	if (defined($last_rxs_sent{$key})) {
	    my $diff = $rxs_sent - $last_rxs_sent{$key};
	    if ($diff > 0) {
		pr_diag(2, "$diff retranmissions sent");
		my $totlat = $rxs_sent * $tx_dg_sz * 8 / $tx_rate;
		pr_diag(2, "$totlat seconds estimated total latency due to retransmissions");
	    }
	}
	$last_naks_rcved{$key} = $naks_rcved;
	$last_rxs_sent{$key} = $rxs_sent;

    } elsif ($fmt eq "4") {	# LBT-RM Receiver
	my ($msgs_rcved, $bytes_rcved, $nak_pckts_sent, $naks_sent, $lost,
	    $ncfs_ignored, $ncfs_shed, $ncfs_rx_delay, $ncfs_unknown,
	    $nak_stm_min, $nak_stm_mean, $nak_stm_max, $nak_tx_min,
	    $nak_tx_mean, $nak_tx_max, $duplicate_data, $unrecovered_txw,
	    $unrecovered_tmo, $lbm_msgs_rcved, $lbm_msgs_no_topic_rcved,
	    $lbm_reqs_rcved)
	    = split(/,/, $rest);
	if (defined($last_unrecovered_txw{$key})) {
	    my $diff = $unrecovered_txw - $last_unrecovered_txw{$key};
	    pr_diag(1, "$diff datagrams unrecovered due to transmission window advancement") if ($diff > 0);
	}
	$last_unrecovered_txw{$key} = $unrecovered_txw;
	if (defined($last_unrecovered_tmo{$key})) {
	    my $diff = $unrecovered_tmo - $last_unrecovered_tmo{$key};
	    pr_diag(1, "$diff datagrams unrecovered due to NAK generation interval ending") if ($diff > 0);
	}
	$last_unrecovered_tmo{$key} = $unrecovered_tmo;
	if (defined($last_lost{$key})) {
	    my $diff = $lost - $last_lost{$key};
	    pr_diag(2, "$diff datagrams lost") if ($diff > 0);
	    if ($nak_stm_mean!=0 && $diff>0) {
		my $secs = $lost * $nak_stm_mean / 1000;
		pr_diag(2, "$secs seconds estimated total latency due to repair of $lost losses");
	    }
	}
	$last_lost{$key} = $lost;
	if (defined($last_naks_sent{$key})) {
	    my $diff = $naks_sent - $last_naks_sent{$key};
	    pr_diag(2, "$diff NAKs sent") if ($diff > 0);
	}
	$last_naks_sent{$key} = $naks_sent;

    } elsif ($fmt eq "5") {	# LBT-RU Source
    	my ($msgs_sent, $bytes_sent, $nak_pckts_rcved, $naks_rcved,
	    $naks_ignored, $naks_shed, $naks_rx_delay_ignored, $rxs_sent,
	    $num_clients)
	    = split(/,/, $rest);
	if (defined($last_naks_rcved{$key})) {
	    my $diff = $naks_rcved - $last_naks_rcved{$key};
	    pr_diag(2, "$diff NAKs received") if ($diff > 0);
	}
	$last_naks_rcved{$key} = $naks_rcved;
	if (defined($last_rxs_sent{$key})) {
	    my $diff = $rxs_sent - $last_rxs_sent{$key};
	    pr_diag(2, "$diff retranmissions sent") if ($diff > 0);
	}
	$last_rxs_sent{$key} = $rxs_sent;
    } else {
	print "XXX $datagram\n";
    }
    $ts_printed = 0;
}
