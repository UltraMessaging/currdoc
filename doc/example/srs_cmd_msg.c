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
#ifdef _WIN32
#define snprintf _snprintf
#endif

#include "srs_cmd_msg.h"

char *get_command_message(char *command_string) {
    char *token_one = NULL, *token_two = NULL;
    char *json_command_ret = NULL;
    size_t command_string_len = strlen(command_string);
    /* + 1 for the null character */
    char *command_string_copy = (char *)malloc(command_string_len + 1);
    char *json_command = (char *)malloc(MAX_CMD_LEN);
    memset(command_string_copy, 0, command_string_len);
    strcpy(command_string_copy, command_string);
    memset(json_command, 0, MAX_CMD_LEN);
    
    /* Split command based on single white space */
    token_one = strtok(command_string_copy, " ");
    token_two = strtok(NULL, " ");
    if (token_two == NULL) {
        /* Possibly a one token command like version or snap */
        if (token_one != NULL) {
            char *lower_token_one = to_lower_case(token_one);
            if (strcmp(lower_token_one, VERSION) == 0) {
                snprintf(json_command, MAX_CMD_LEN,
                         "{\"commandMessageType\":\"%s\"}", REPORT_SRS_VERSION);
                json_command_ret = json_command;
            } else if (strcmp(lower_token_one, SNAP) == 0) {
                snprintf(json_command, MAX_CMD_LEN,
                         "{\"commandMessageType\":\"%s\"}", REPORT_MONITOR_INFO);
                json_command_ret = json_command;
            } else {
                handle_invalid_command(token_one);
            }
            free(lower_token_one); /* to_lower_case mallocs a new string */
        } else {
            handle_invalid_command(command_string);
        }
    } else {
        /* Possibly a two token command like "category 0-N" or "snap category" */
        
        if (token_one != NULL) {
            /* Token one should be a category or command */
            char *category_first = to_upper_case(token_one);
            char *command = to_lower_case(token_one);
            /* Token two should be command or interval */
            char *category_second = to_upper_case(token_two);
            if (is_valid_category(category_first) && is_valid_interval(token_two)) {
                snprintf(json_command, MAX_CMD_LEN,
                         "{\"commandMessageType\":\"%s\",\"monitorInfoCategory\":\"%s\",\"publishingInterval\":%ld}",
                         SET_PUBLISHING_INTERVAL, category_first, atol(token_two));
                json_command_ret = json_command;
            } else if ((strcmp(command, INTERVAL) == 0) && is_valid_interval(token_two)) {
                snprintf(json_command, MAX_CMD_LEN,
                         "{\"commandMessageType\":\"%s\",\"publishingInterval\":%ld}",
                         SET_PUBLISHING_INTERVAL, atol(token_two));
                json_command_ret = json_command;
            } else if ((strcmp(command, SNAP) == 0) && is_valid_category(category_second)) {
                snprintf(json_command, MAX_CMD_LEN,
                         "{\"commandMessageType\":\"%s\",\"monitorInfoCategory\":\"%s\"}",
                         REPORT_MONITOR_INFO, category_second);
                json_command_ret = json_command;
            } else {
                handle_invalid_command(command_string);
            }
        
            free(category_first); /* to_upper_case mallocs a new string */
            free(command); /* to_lower_case mallocs a new string */
            free(category_second); /* to_upper_case mallocs a new string */
        } else {
            handle_invalid_command(command_string);
        }
    }
    
    free(command_string_copy);
    
    return json_command_ret;
}

int is_valid_category(char *category) {
    return (strcmp(category, SRS_STATS) == 0) ||
    (strcmp(category, UM_CLIENT_STATS) == 0) ||
    (strcmp(category, CONNECTION_EVENTS) == 0) ||
    (strcmp(category, SRS_ERROR_STATS) == 0) ||
    (strcmp(category, UM_CLIENT_ERROR_STATS) == 0) ||
    (strcmp(category, CONFIG_OPTS) == 0) ||
    (strcmp(category, INTERNAL_CONFIG_OPTS) == 0);
}

void handle_invalid_command(char *command) {
    fprintf(stderr, "Invalid command %s\n", command);
    fflush(stderr);
}

int is_valid_interval(char *interval) {
    int is_valid = 0;
    size_t len = strlen(interval);
    
    if ((len == 1) && interval[0] == '0') {
        is_valid = 1;
    } else if (atol(interval) != 0) {
        is_valid = 1;
    }
    
    return is_valid;
}

char *to_upper_case(char *string) {
    int c;
    size_t len = strlen(string);
    /* + 1 for the null character */
    char *upper_case_string = (char *)malloc(len + 1);
    memset(upper_case_string, 0, len + 1);
    
    for (c = 0; c < len; c++) {
        upper_case_string[c] = toupper(string[c]);
    }
    
    return upper_case_string;
}

char *to_lower_case(char *string) {
    int c;
    size_t len = strlen(string);
    /* + 1 for the null character */
    char *lower_case_string = (char *)malloc(len + 1);
    memset(lower_case_string, 0, len + 1);
    
    for (c = 0; c < len; c++) {
        lower_case_string[c] = tolower(string[c]);
    }
    
    return lower_case_string;
}
