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

#include "3rdParty/ujdecode.h"

/* Monitor info message categories: */

/* SRS_STATS: General statistics concerning SRS interactions with UM clients since startup */
#define SRS_STATS L"SRS_STATS"
/* UM_CLIENT_STATS: Per UM client statistics for all UM clients with an active TCP connection */
#define UM_CLIENT_STATS L"UM_CLIENT_STATS"
/* CONNECTION_EVENTS: UM client connection related events */
#define CONNECTION_EVENTS L"CONNECTION_EVENTS"
/* SRS_ERROR_STATS: Error statistics concerning SRS interactions with UM clients since startup */
#define SRS_ERROR_STATS L"SRS_ERROR_STATS"
/* UM_CLIENT_ERROR_STATS: Per UM client error statistics for all UM clients with an active TCP connection */

#define UM_CLIENT_ERROR_STATS L"UM_CLIENT_ERROR_STATS"
/* CONFIG_OPTS: Customer configured configuration option values */
#define CONFIG_OPTS L"CONFIG_OPTS"
/* INTERNAL_CONFIG_OPTS: Internally/developer configured configuration option values */
#define INTERNAL_CONFIG_OPTS L"INTERNAL_CONFIG_OPTS"

/* Connection event types: */
#define UM_CLIENT_CONNECT L"UM_CLIENT_CONNECT" /* UM client connected event */
#define UM_CLIENT_DISCONNECT L"UM_CLIENT_DISCONNECT" /* UM client disconnected event */
#define SIR L"SIR" /* Source information record event */
#define SDR L"SDR" /* Source delete record event */

void handle_srs_monitor_info_message(UJObject monitor_info_message);
/* handle_srs_monitor_info_message helpers */
void handle_connection_event(const wchar_t *monitor_info_category, UJObject srs_reg_info_object,
                             UJObject connection_event_type_string, UJObject events_array);
void handle_um_client_stats(const wchar_t *monitor_info_category, UJObject srs_reg_info_object,
                            UJObject srs_stats_array);
void handle_srs_stats(const wchar_t *monitor_info_category, UJObject srs_stats_array);
void handle_config_opts(const wchar_t *monitor_info_category, UJObject config_opts_array);
