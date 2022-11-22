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

/* This module is referenced by srs_monitor_info_receiver_json.c.
 * Note that this tool is deprecated.
 * See https://ultramessaging.github.io/currdoc/doc/ChangeLog/deprecations.html#deprecationsfor615
 */

#include "srs_monitor_info_msg.h"

void handle_srs_monitor_info_message(UJObject monitor_info_message) {
    if (!UJIsNull(monitor_info_message) && UJIsObject(monitor_info_message)) {
        UJObject monitor_info_category_string, srs_reg_info_object, srs_stats_array,
        connection_event_type_string, events_array, config_opts_array;
        const wchar_t *srs_stats_keys[] = {L"monitorInfoCategory", L"stats"};
        const wchar_t *um_client_stats_keys[] = {L"monitorInfoCategory", L"srsRegistrationInfo", L"stats"};
        const wchar_t *connection_events[] = {L"monitorInfoCategory", L"srsRegistrationInfo", L"connectionEventType", L"events"};
        const wchar_t *config_opts_keys[] = {L"monitorInfoCategory", L"configOptions"};
        
        if (UJObjectUnpack(monitor_info_message, 4, "SOSA", connection_events,
                           &monitor_info_category_string, &srs_reg_info_object,
                           &connection_event_type_string, &events_array) == 4) {
            if (UJIsString(monitor_info_category_string)) {
                const wchar_t *monitor_info_category = UJReadString(monitor_info_category_string, NULL);
                
                /* This monitor info message should be of CONNECTION_EVENTS category */
                if (wcscmp(monitor_info_category, CONNECTION_EVENTS) == 0) {
                    handle_connection_event(monitor_info_category, srs_reg_info_object,
                                            connection_event_type_string, events_array);
                } else {
                    fprintf(stderr, "Error: monitor_info_category is %ls but expected %ls\n",
                            monitor_info_category, CONNECTION_EVENTS);
                }
            } else {
                fprintf(stderr, "Error: monitor_info_category_string should be UJT_String (%d) instead of %d\n", UJT_String, UJGetType(monitor_info_category_string));
            }
        } else if (UJObjectUnpack(monitor_info_message, 3, "SOA", um_client_stats_keys,
                                  &monitor_info_category_string, &srs_reg_info_object, &srs_stats_array) == 3) {
            if (UJIsString(monitor_info_category_string)) {
                const wchar_t *monitor_info_category = UJReadString(monitor_info_category_string, NULL);
                
                /* This monitor info message should be of UM_CLIENT_STATS or UM_CLIENT_ERROR_STATS category */
                if ((wcscmp(monitor_info_category, UM_CLIENT_STATS) == 0) ||
                    (wcscmp(monitor_info_category, UM_CLIENT_ERROR_STATS) == 0)) {
                    handle_um_client_stats(monitor_info_category, srs_reg_info_object, srs_stats_array);
                } else {
                    fprintf(stderr, "Error: monitor_info_category is %ls but expected %ls or %ls\n",
                            monitor_info_category, UM_CLIENT_STATS, UM_CLIENT_ERROR_STATS);
                }
            } else {
                fprintf(stderr, "Error: monitor_info_category_string should be UJT_String (%d) instead of %d\n",
                        UJT_String, UJGetType(monitor_info_category_string));
            }
        } else if (UJObjectUnpack(monitor_info_message, 2, "SA", srs_stats_keys,
                                  &monitor_info_category_string, &srs_stats_array) == 2) {
            if (UJIsString(monitor_info_category_string)) {
                const wchar_t *monitor_info_category = UJReadString(monitor_info_category_string, NULL);
                
                /* This monitor info message should be of SRS_STATS or SRS_ERROR_STATS category */
                if ((wcscmp(monitor_info_category, SRS_STATS) == 0) ||
                    (wcscmp(monitor_info_category, SRS_ERROR_STATS) == 0)) {
                    handle_srs_stats(monitor_info_category, srs_stats_array);
                } else {
                    fprintf(stderr, "Error: monitor_info_category is %ls but expected %ls or %ls\n",
                            monitor_info_category, SRS_STATS, SRS_ERROR_STATS);
                }
            } else {
                fprintf(stderr, "Error: monitor_info_category_string should be UJT_String (%d) instead of %d\n", UJT_String, UJGetType(monitor_info_category_string));
            }
        } else if (UJObjectUnpack(monitor_info_message, 2, "SA", config_opts_keys,
                                  &monitor_info_category_string, &config_opts_array) == 2) {
            if (UJIsString(monitor_info_category_string)) {
                const wchar_t *monitor_info_category = UJReadString(monitor_info_category_string, NULL);
                
                /* This monitor info message should be of CONFIG_OPTS or INTERNAL_CONFIG_OPTS category */
                if ((wcscmp(monitor_info_category, CONFIG_OPTS) == 0) ||
                    (wcscmp(monitor_info_category, INTERNAL_CONFIG_OPTS) == 0)) {
                    handle_config_opts(monitor_info_category, config_opts_array);
                } else {
                    fprintf(stderr, "Error: monitor_info_category is %ls but expected %ls or %ls\n",
                            monitor_info_category, CONFIG_OPTS, INTERNAL_CONFIG_OPTS);
                }
            } else {
                fprintf(stderr, "Error: monitor_info_category_string should be UJT_String (%d) instead of %d\n", UJT_String, UJGetType(monitor_info_category_string));
            }
        } else {
            fprintf(stderr, "Error: monitor_info_category_string: %s\n", "Failed to retrieve monitor_info_message");
        }
        
        fflush(stderr);
        fflush(stdout);
    } else {
        if (UJIsNull(monitor_info_message)) {
            fprintf(stderr, "Error: monitor_info_message is NULL\n");
        } else {
            fprintf(stderr, "Error: monitor_info_message type should be UJT_Object (%d) instead of %d\n",
                    UJT_Object, UJGetType(monitor_info_message));
        }
    }
}

void handle_connection_event(const wchar_t *monitor_info_category, UJObject srs_reg_info_object,
                             UJObject connection_event_type_string, UJObject events_array) {
    UJObject reg_info_ip_string, reg_info_port_string, reg_info_session_id_string;
    const wchar_t *reg_info_keys[] = {L"ip", L"port", L"sessionId"};
    if (UJIsString(connection_event_type_string)) {
        const wchar_t *connection_event_type = UJReadString(connection_event_type_string, NULL);
        
        if ((!UJIsNull(srs_reg_info_object)) &&
            UJObjectUnpack(srs_reg_info_object, 3, "SSS", reg_info_keys,
                           &reg_info_ip_string, &reg_info_port_string, &reg_info_session_id_string) == 3) {
                if (UJIsString(reg_info_ip_string) && UJIsString(reg_info_port_string) &&
                    UJIsString(reg_info_session_id_string)) {
                    const wchar_t *reg_info_ip = UJReadString(reg_info_ip_string, NULL);
                    const wchar_t *reg_info_port = UJReadString(reg_info_port_string, NULL);
                    const wchar_t *reg_info_session_id = UJReadString(reg_info_session_id_string, NULL);
                    
                    fprintf(stdout, "\n%ls\n", monitor_info_category);
                    
                    if ((wcscmp(connection_event_type, UM_CLIENT_CONNECT) == 0) ||
                        (wcscmp(connection_event_type, UM_CLIENT_DISCONNECT) == 0)) {
                        if (UJIsArray(events_array)) {
                            UJObject connection_event_info;
                            
                            void *events_iter = UJBeginArray(events_array);
                            int iter_result = UJIterArray(&events_iter, &connection_event_info);
                            
                            UJObject connection_event_time_string;
                            const wchar_t *event_keys[] = {L"connectionEventTime"};
                            
                            if (UJObjectUnpack(connection_event_info, 1, "S", event_keys, &connection_event_time_string) == 1) {
                                const wchar_t *connection_event_time = UJReadString(connection_event_time_string, NULL);
                                if (wcscmp(connection_event_type, UM_CLIENT_CONNECT) == 0) {
                                    fprintf(stdout, "\tUM client: %ls:%ls (%ls) CONNECTED on %ls\n",
                                            reg_info_ip, reg_info_port, reg_info_session_id, connection_event_time);
                                } else { /* UM_CLIENT_DISCONNECT */
                                    fprintf(stdout, "\tUM client: %ls:%ls (%ls) DISCONNECTED on %ls\n",
                                            reg_info_ip, reg_info_port, reg_info_session_id, connection_event_time);
                                }
                            } else {
                                fprintf(stderr, "Error: monitor_info_category: %ls; connectionEventType: %ls: failed to unpack connection_event_info UJObject\n",
                                        monitor_info_category, connection_event_type);
                            }
                        } else {
                            fprintf(stderr, "Error: monitor_info_category: %ls; connectionEventType: %ls but expected UJT_Array (%d)\n",
                                    monitor_info_category, connection_event_type, UJT_Array);
                        }
                    } else if ((wcscmp(connection_event_type, SIR) == 0) ||
                               (wcscmp(connection_event_type, SDR) == 0)) {
                        if (UJIsArray(events_array)) {
                            int iter_result;
                            UJObject connection_event_info;
                            UJObject topic_string, source_string, connection_event_time_string;
                            const wchar_t *event_keys[] = {L"topic", L"source", L"connectionEventTime"};
                            const wchar_t *topic, *source, *connection_event_time;
                            void *events_iter;
                            
                            fprintf(stdout, "\t%lss for UM client: %ls:%ls (%ls):\n",
                                    connection_event_type, reg_info_ip, reg_info_port, reg_info_session_id);
                            
                            events_iter = UJBeginArray(events_array);
                            while ((iter_result = UJIterArray(&events_iter, &connection_event_info)) != 0) {
                                if (UJObjectUnpack(connection_event_info, 3, "SSS", event_keys, &topic_string, &source_string, &connection_event_time_string) == 3) {
                                    if (UJIsString(topic_string) && UJIsString(source_string) &&
                                        UJIsString(connection_event_time_string)) {
                                        topic = UJReadString(topic_string, NULL);
                                        source = UJReadString(source_string, NULL);
                                        connection_event_time = UJReadString(connection_event_time_string, NULL);
                                        
                                        fprintf(stdout, "\t\tSource: %ls, topic: %ls on %ls\n",
                                                source, topic, connection_event_time);
                                    } else {
                                        fprintf(stderr, "Error: monitor_info_category: %ls; connectionEventType: %ls: event_info contains a non-UJT_String member\n",
                                                monitor_info_category, connection_event_type);
                                    }
                                } else {
                                    fprintf(stderr, "Error: monitor_info_category: %ls; connectionEventType: %ls: failed to unpack connection_event_info UJObject\n",
                                            monitor_info_category, connection_event_type);
                                }
                            }
                        } else {
                            fprintf(stderr, "Error: monitor_info_category: %ls; connectionEventType: %ls: expected UJT_Array (%d) instead of %d\n",
                                    monitor_info_category, connection_event_type, UJT_Array, UJGetType(events_array));
                        }
                    } else {
                        fprintf(stderr, "Error: monitor_info_category %ls: %ls is not expected\n",
                                monitor_info_category, connection_event_type);
                    }
                } else {
                    fprintf(stderr, "Error: monitor_info_category: %ls; connectionEventType: %ls: reg_info contains a non-UJT_String member\n",
                            monitor_info_category, connection_event_type);
                }
            } else {
                fprintf(stderr, "Error: monitor_info_category: %ls; connectionEventType: %ls: failed to unpack UJObject srs_reg_info_object\n",
                        monitor_info_category, connection_event_type);
            }
    } else {
        fprintf(stderr, "Error: connection_event_type_string should be UJT_String (%d) instead of %d\n",
                UJT_String, UJGetType(connection_event_type_string));
    }
}

void handle_um_client_stats(const wchar_t *monitor_info_category, UJObject srs_reg_info_object,
                            UJObject srs_stats_array) {
    if (UJIsArray(srs_stats_array)) {
        UJObject reg_info_ip_string, reg_info_port_string, reg_info_session_id_string;
        const wchar_t *reg_info_keys[] = {L"ip", L"port", L"sessionId"};
        
        if ((!UJIsNull(srs_reg_info_object)) &&
            UJObjectUnpack(srs_reg_info_object, 3, "SSS", reg_info_keys,
                           &reg_info_ip_string, &reg_info_port_string, &reg_info_session_id_string) == 3) {
                int iter_result;
                UJObject stat;
                const wchar_t *reg_info_ip, *reg_info_port, *reg_info_session_id;
                
                if (UJIsString(reg_info_ip_string) && UJIsString(reg_info_port_string) &&
                    UJIsString(reg_info_session_id_string)) {
                    UJObject name_string, value_long;
                    const wchar_t *stats_keys[] = {L"name", L"value"};
                    void *stats_iter;
                    
                    reg_info_ip = UJReadString(reg_info_ip_string, NULL);
                    reg_info_port = UJReadString(reg_info_port_string, NULL);
                    reg_info_session_id = UJReadString(reg_info_session_id_string, NULL);
                    
                    fprintf(stdout, "\n%ls\n", monitor_info_category);
                    fprintf(stdout, "\tUM client: %ls:%ls (%ls):\n",
                            reg_info_ip, reg_info_port, reg_info_session_id);
                    
                    
                    stats_iter = UJBeginArray(srs_stats_array);
                    while ((iter_result = UJIterArray(&stats_iter, &stat)) != 0) {
                        if (UJObjectUnpack(stat, 2, "SN", stats_keys, &name_string, &value_long) == 2) {
                            const wchar_t *name = UJReadString(name_string, NULL);
                            long value = UJNumericLongLong(value_long);
                            
                            fprintf(stdout, "\t\t%ls == %ld\n", name, value);
                        } else {
                            fprintf(stderr, "Error: monitor_info_category: %ls: failed to unpack UJObject\n",
                                    monitor_info_category);
                        }
                    }
                } else {
                    fprintf(stderr, "Error: monitor_info_category: %ls: reg_info contains a non-UJT_String member\n",
                            monitor_info_category);
                }
            } else {
                fprintf(stderr, "Error: monitor_info_category: %ls: failed to unpack srs_reg_info_object UJObject\n",
                        monitor_info_category);
            }
    } else {
        fprintf(stderr, "Error: monitor_info_category: %ls: expected UJT_Array (%d) instead of %d\n",
                monitor_info_category, UJT_Array, UJGetType(srs_stats_array));
    }
}

void handle_srs_stats(const wchar_t *monitor_info_category, UJObject srs_stats_array) {
    if (UJIsArray(srs_stats_array)) {
        int iter_result;
        UJObject stat;
        UJObject name_string, value_long;
        const wchar_t *stats_keys[] = {L"name", L"value"};
        void *stats_iter;
        
        fprintf(stdout, "\n%ls\n", monitor_info_category);
        
        stats_iter = UJBeginArray(srs_stats_array);
        while ((iter_result = UJIterArray(&stats_iter, &stat)) != 0) {
            if ((!UJIsNull(stat)) &&
                UJObjectUnpack(stat, 2, "SN", stats_keys, &name_string, &value_long) == 2) {
                const wchar_t *name = UJReadString(name_string, NULL);
                long value = UJNumericLongLong(value_long);
                
                fprintf(stdout, "\t%ls == %ld\n", name, value);
            } else {
                fprintf(stderr, "Error: monitor_info_category: %ls: failed to unpack stat UJObject\n",
                        monitor_info_category);
            }
        }
    } else {
        fprintf(stderr, "Error: monitor_info_category: %ls: expected UJT_Array (%d) instead of %d\n", monitor_info_category, UJT_Array, UJGetType(srs_stats_array));
    }
}

void handle_config_opts(const wchar_t *monitor_info_category, UJObject config_opts_array) {
    if (UJIsArray(config_opts_array)) {
        int iter_result;
        UJObject config_opt;
        UJObject name_string, value_string;
        const wchar_t *opts_keys[] = {L"name", L"value"};
        void *config_opts_iter;
        
        fprintf(stdout, "\n%ls\n", monitor_info_category);
        
        config_opts_iter = UJBeginArray(config_opts_array);
        while ((iter_result = UJIterArray(&config_opts_iter, &config_opt)) != 0) {
            if ((!UJIsNull(config_opt)) &&
                UJObjectUnpack(config_opt, 2, "SS", opts_keys, &name_string, &value_string) == 2) {
                const wchar_t *name = UJReadString(name_string, NULL);
                const wchar_t *value = UJReadString(value_string, NULL);
                
                fprintf(stdout, "\t%ls == %ls\n", name, value);
            } else {
                fprintf(stderr, "monitor_info_category: %ls: failed to unpack config_opt UJObject\n",
                        monitor_info_category);
            }
        }
    } else {
        fprintf(stderr, "Error: monitor_info_category: %ls: expected UJT_Array (%d) instead of %d\n", monitor_info_category, UJT_Array, UJGetType(config_opts_array));
    }
}
