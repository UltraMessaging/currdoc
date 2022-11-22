/*
  (C) Copyright 2005,2022 Informatica LLC  Permission is granted to licensees to use
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
#include <ctype.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/* Commands */
# define VERSION "version"
# define INTERVAL "interval"
# define SNAP "snap"

/* Command message types */
#define REPORT_MONITOR_INFO "REPORT_MONITOR_INFO" /* Report current monitor info snapshot */
#define SET_PUBLISHING_INTERVAL "SET_PUBLISHING_INTERVAL" /* Set the publishing interval */
#define REPORT_SRS_VERSION "REPORT_SRS_VERSION" /* Report current SRS daemon version */

/* Categories */

/* SRS_STATS: General statistics concerning SRS interactions with UM clients since startup */
#define SRS_STATS "SRS_STATS"
/* UM_CLIENT_STATS: Per UM client statistics for all UM clients with an active TCP connection */
#define UM_CLIENT_STATS "UM_CLIENT_STATS"
/* CONNECTION_EVENTS: UM client connection related events */
#define CONNECTION_EVENTS "CONNECTION_EVENTS"
/* SRS_ERROR_STATS: Error statistics concerning SRS interactions with UM clients since startup */
#define SRS_ERROR_STATS "SRS_ERROR_STATS"
/* UM_CLIENT_ERROR_STATS: Per UM client error statistics for all UM clients with an active TCP connection */
#define UM_CLIENT_ERROR_STATS "UM_CLIENT_ERROR_STATS"
/* CONFIG_OPTS: Customer configured configuration option values */
#define CONFIG_OPTS "CONFIG_OPTS"
/* INTERNAL_CONFIG_OPTS: Internally/developer configured configuration option values */
#define INTERNAL_CONFIG_OPTS "INTERNAL_CONFIG_OPTS"

#define MAX_CMD_LEN 256

char *get_command_message(char *command_string);
/* get_command_message helpers */
int is_valid_category(char *category);
int is_valid_interval(char *interval);
void handle_invalid_command(char *command);
char *to_upper_case(char *string);
char *to_lower_case(char *string);
