var NAVTREE =
[
  [ "Configuration Guide", "index.html", [
    [ "Introduction", "index.html#firstsect", [
      [ "Configuration Overview", "index.html#configurationoverview", [
        [ "Assignment Methods", "index.html#assignmentmethods", null ],
        [ "Assignment Flow", "index.html#assignmentflow", null ],
        [ "Definitions", "index.html#definitions", null ],
        [ "Which Method Should I Use?", "index.html#whichmethodshouldiuse", null ],
        [ "Host Name Resolution", "index.html#hostnameresolution", null ],
        [ "Configuration Files", "index.html#configurationfiles", null ]
      ] ],
      [ "Plain Text Configuration Files", "index.html#plaintextconfigurationfiles", [
        [ "Reading Plain Text Configuration Files", "index.html#readingplaintextconfigurationfiles", null ]
      ] ],
      [ "Plain Text Configuration File Format", "index.html#plaintextconfigurationfileformat", null ]
    ] ],
    [ "XML Configuration Files", "index.html#xmlconfigurationfiles", [
      [ "XML Configuration Concepts", "index.html#xmlconfigurationconcepts", null ],
      [ "XML Reference Names", "index.html#xmlreferencenames", [
        [ "XML Object Names", "index.html#xmlobjectnames", null ],
        [ "XML Application Names", "index.html#xmlapplicationnames", null ]
      ] ],
      [ "Order and Rule Specifications", "index.html#orderandrulespecifications", [
        [ "Constraining Configuration Values", "index.html#constrainingconfigurationvalues", null ],
        [ "Restricting Topics", "index.html#restrictingtopics", null ],
        [ "Overlapping Topics", "index.html#overlappingtopics", null ]
      ] ],
      [ "UM Default Values", "index.html#umdefaultvalues", null ],
      [ "Reading XML Configuration Files", "index.html#readingxmlconfigurationfiles", null ],
      [ "Using XML Configuration Files With a UM Application", "index.html#usingxmlconfigurationfileswithaumapplication", null ],
      [ "XML Configuration File Format", "index.html#xmlconfigurationfileformat", null ],
      [ "Merging Multiple XML Configuration Files", "index.html#mergingmultiplexmlconfigurationfiles", null ],
      [ "XML Configuration File Elements", "index.html#xmlconfigurationfileelements", [
        [ "UM Element \"<um-configuration>\"", "index.html#umelementumconfiguration", null ],
        [ "UM Element \"<applications>\"", "index.html#umelementapplications", null ],
        [ "UM Element \"<application>\"", "index.html#umelementapplication", null ],
        [ "UM Element \"<application-data>\"", "index.html#umelementapplicationdata", null ],
        [ "UM Element \"<hfxs>\"", "index.html#umelementhfxs", null ],
        [ "UM Element \"<topic>\"", "index.html#umelementtopic", null ],
        [ "UM Element \"<options>\"", "index.html#umelementoptions", null ],
        [ "UM Element \"<option>\"", "index.html#umelementoption", null ],
        [ "UM Element \"<deny>\"", "index.html#umelementdeny", null ],
        [ "UM Element \"<allow>\"", "index.html#umelementallow", null ],
        [ "UM Element \"<event-queues>\"", "index.html#umelementeventqueues", null ],
        [ "UM Element \"<event-queue>\"", "index.html#umelementeventqueue", null ],
        [ "UM Element \"<contexts>\"", "index.html#umelementcontexts", null ],
        [ "UM Element \"<context>\"", "index.html#umelementcontext", null ],
        [ "UM Element \"<wildcard-receivers>\"", "index.html#umelementwildcardreceivers", null ],
        [ "UM Element \"<wildcard-receiver>\"", "index.html#umelementwildcardreceiver", null ],
        [ "UM Element \"<receivers>\"", "index.html#umelementreceivers", null ],
        [ "UM Element \"<sources>\"", "index.html#umelementsources", null ],
        [ "UM Element \"<templates>\"", "index.html#umelementtemplates", null ],
        [ "UM Element \"<template>\"", "index.html#umelementtemplate", null ],
        [ "UM Element \"<license>\"", "index.html#umelementlicense", null ]
      ] ],
      [ "XML Configuration File DTD", "index.html#xmlconfigurationfiledtd", null ],
      [ "Sample XML Configuration File", "index.html#samplexmlconfigurationfile", null ]
    ] ],
    [ "Attributes Objects", "index.html#attributesobjects", [
      [ "Creating An Attributes Object", "index.html#creatinganattributesobject", null ],
      [ "Setting an Option from a Binary Value", "index.html#settinganoptionfromabinaryvalue", [
        [ "Setting an Option from Arrays of Binary Values", "index.html#settinganoptionfromarraysofbinaryvalues", null ]
      ] ],
      [ "Setting an Option from a String Value", "index.html#settinganoptionfromastringvalue", null ],
      [ "Getting an Option as a Binary Value", "index.html#gettinganoptionasabinaryvalue", null ],
      [ "Getting an Option as a String Value", "index.html#gettinganoptionasastringvalue", null ],
      [ "Deleting an Attributes Object", "index.html#deletinganattributesobject", null ]
    ] ],
    [ "Access to Current Operating Options", "index.html#accesstocurrentoperatingoptions", [
      [ "Retrieving Current Option Values", "index.html#retrievingcurrentoptionvalues", [
        [ "Getting Current Option as a Binary Value", "index.html#gettingcurrentoptionasabinaryvalue", null ],
        [ "Getting Current Option as a String Value", "index.html#gettingcurrentoptionasastringvalue", null ]
      ] ],
      [ "Modifying Current Option Values", "index.html#modifyingcurrentoptionvalues", [
        [ "Setting Current Option from a Binary Value", "index.html#settingcurrentoptionfromabinaryvalue", null ],
        [ "Setting Current Option from a String Value", "index.html#settingcurrentoptionfromastringvalue", null ]
      ] ]
    ] ],
    [ "Example Configuration Scenarios", "index.html#exampleconfigurationscenarios", [
      [ "Highest Throughput", "index.html#highestthroughput", null ],
      [ "Lowest Latency", "index.html#lowestlatency", null ],
      [ "Creating Multicast Sources", "index.html#creatingmulticastsources", null ],
      [ "Disabling Aspects of Topic Resolution", "index.html#disablingaspectsoftopicresolution", [
        [ "Disabling Topic Advertisements", "index.html#disablingtopicadvertisements", null ],
        [ "Disabling Receiver Topic Queries", "index.html#disablingreceivertopicqueries", null ],
        [ "Disabling Wildcard Topic Queries", "index.html#disablingwildcardtopicqueries", null ],
        [ "Disabling Store (Context) Name Queries", "index.html#disablingstorecontextnamequeries", null ],
        [ "All But the Minimum Topic Resolution Traffic", "index.html#Disabling", null ]
      ] ],
      [ "Unicast Resolver", "index.html#unicastresolver", null ],
      [ "Re-establish Pre-4.0 Topic Resolution", "index.html#reestablishpre40topicresolution", null ],
      [ "Re-establish Pre-LBM 3.3 (Pre-UME 2.0) Port Defaults", "index.html#reestablishprelbm33preume20portdefaults", null ],
      [ "Configure New Port Defaults", "index.html#configurenewportdefaults", null ]
    ] ],
    [ "Interrelated Configuration Options", "index.html#interrelatedconfigurationoptions", [
      [ "Preventing NAK Storms with NAK Intervals", "index.html#preventingnakstormswithnakintervals", null ],
      [ "Preventing Tail Loss With TSNI and NAK Interval Options", "index.html#preventingtaillosswithtsniandnakintervaloptions", null ],
      [ "Preventing IPC Receiver Deafness With Keepalive Options", "index.html#preventingipcreceiverdeafnesswithkeepaliveoptions", null ],
      [ "Preventing Erroneous LBT-RM/LBT-RU Session Timeouts", "index.html#preventingerroneouslbtrmlbtrusessiontimeouts", null ],
      [ "Preventing Errors Due to Bad Multicast Address Ranges", "index.html#preventingerrorsduetobadmulticastaddressranges", null ],
      [ "Preventing Store Timeouts", "index.html#preventingstoretimeouts", null ],
      [ "Preventing ULB Timeouts", "index.html#preventingulbtimeouts", null ],
      [ "Preventing Unicast Resolver Daemon Timeouts", "index.html#preventingunicastresolverdaemontimeouts", null ],
      [ "Preventing Undetected Late Join Loss", "index.html#preventingundetectedlatejoinloss", null ],
      [ "Preventing Undetected Loss", "index.html#preventingundetectedloss", null ],
      [ "Preventing Store Registration Hangs", "index.html#preventingstoreregistrationhangs", null ]
    ] ],
    [ "General Configuration Guidelines", "index.html#generalconfigurationguidelines", [
      [ "Case Sensitivity", "index.html#casesensitivity", null ],
      [ "Specifying Interfaces", "index.html#specifyinginterfaces", [
        [ "Interface Device Names and XML", "index.html#interfacedevicenamesandxml", null ]
      ] ],
      [ "Socket Buffer Sizes", "index.html#socketbuffersizes", null ],
      [ "Port Assignments", "index.html#portassignments", [
        [ "Ephemeral Ports", "index.html#ephemeralports", null ],
        [ "Network VS Host Order", "index.html#networkvshostorder", null ]
      ] ],
      [ "Reference Entry Format", "index.html#referenceentryformat", null ]
    ] ],
    [ "Special Notes", "index.html#specialnotes", [
      [ "Configuring Multi-Homed Hosts", "index.html#configuringmultihomedhosts", null ],
      [ "Traversing a Firewall", "index.html#traversingafirewall", null ]
    ] ],
    [ "Major Options", "index.html#grpmajoroptions", [
      [ "Reference", "index.html#majorref", [
        [ "broker (context)", "index.html#brokercontext", null ],
        [ "compatibility_include_pre_um_6_0_behavior (context)", "index.html#compatibilityincludepreum60behaviorcontext", null ],
        [ "context_event_function (context)", "index.html#contexteventfunctioncontext", null ],
        [ "context_name (context)", "index.html#contextnamecontext", null ],
        [ "datagram_acceleration_functions (context)", "index.html#datagramaccelerationfunctionscontext", null ],
        [ "default_interface (context)", "index.html#defaultinterfacecontext", null ],
        [ "fd_management_type (context)", "index.html#fdmanagementtypecontext", null ],
        [ "message_selector (receiver)", "index.html#messageselectorreceiver", null ],
        [ "multiple_receive_maximum_datagrams (context)", "index.html#multiplereceivemaximumdatagramscontext", null ],
        [ "operational_mode (context)", "index.html#operationalmodecontext", null ],
        [ "operational_mode (xsp)", "index.html#operationalmodexsp", null ],
        [ "ordered_delivery (receiver)", "index.html#ordereddeliveryreceiver", null ],
        [ "receiver_callback_service_time_enabled (context)", "index.html#receivercallbackservicetimeenabledcontext", null ],
        [ "resolver_source_notification_function (context)", "index.html#resolversourcenotificationfunctioncontext", null ],
        [ "source_event_function (context)", "index.html#sourceeventfunctioncontext", null ],
        [ "source_includes_topic_index (context)", "index.html#sourceincludestopicindexcontext", null ],
        [ "transport (source)", "index.html#transportsource", null ],
        [ "transport_demux_tablesz (receiver)", "index.html#transportdemuxtableszreceiver", null ],
        [ "transport_mapping_function (context)", "index.html#transportmappingfunctioncontext", null ],
        [ "transport_session_multiple_sending_threads (context)", "index.html#transportsessionmultiplesendingthreadscontext", null ],
        [ "transport_session_single_receiving_thread (context)", "index.html#transportsessionsinglereceivingthreadcontext", null ],
        [ "transport_source_side_filtering_behavior (source)", "index.html#transportsourcesidefilteringbehaviorsource", null ],
        [ "transport_topic_sequence_number_info_active_threshold (source)", "index.html#transporttopicsequencenumberinfoactivethresholdsource", null ],
        [ "transport_topic_sequence_number_info_interval (source)", "index.html#transporttopicsequencenumberinfointervalsource", null ],
        [ "transport_topic_sequence_number_info_request_interval (receiver)", "index.html#transporttopicsequencenumberinforequestintervalreceiver", null ],
        [ "transport_topic_sequence_number_info_request_maximum (receiver)", "index.html#transporttopicsequencenumberinforequestmaximumreceiver", null ],
        [ "use_extended_reclaim_notifications (source)", "index.html#useextendedreclaimnotificationssource", null ],
        [ "zero_transports_function (xsp)", "index.html#zerotransportsfunctionxsp", null ]
      ] ]
    ] ],
    [ "UDP-Based Resolver Operation Options", "index.html#grpudpbasedresolveroperation", [
      [ "Minimum Values for Advertisement and Query Intervals", "index.html#minimumvaluesforadvertisementandqueryintervals", null ],
      [ "Reference", "index.html#resolveroperationref", [
        [ "disable_extended_topic_resolution_message_options (context)", "index.html#disableextendedtopicresolutionmessageoptionscontext", null ],
        [ "resolution_no_source_notification_threshold (receiver)", "index.html#resolutionnosourcenotificationthresholdreceiver", null ],
        [ "resolution_number_of_sources_query_threshold (receiver)", "index.html#resolutionnumberofsourcesquerythresholdreceiver", null ],
        [ "resolver_advertisement_maximum_initial_interval (source)", "index.html#resolveradvertisementmaximuminitialintervalsource", null ],
        [ "resolver_advertisement_minimum_initial_duration (source)", "index.html#resolveradvertisementminimuminitialdurationsource", null ],
        [ "resolver_advertisement_minimum_initial_interval (source)", "index.html#resolveradvertisementminimuminitialintervalsource", null ],
        [ "resolver_advertisement_minimum_sustain_duration (source)", "index.html#resolveradvertisementminimumsustaindurationsource", null ],
        [ "resolver_advertisement_send_immediate_response (source)", "index.html#resolveradvertisementsendimmediateresponsesource", null ],
        [ "resolver_advertisement_sustain_interval (source)", "index.html#resolveradvertisementsustainintervalsource", null ],
        [ "resolver_cache (context)", "index.html#resolvercachecontext", null ],
        [ "resolver_context_name_activity_timeout (context)", "index.html#resolvercontextnameactivitytimeoutcontext", null ],
        [ "resolver_context_name_query_duration (context)", "index.html#resolvercontextnamequerydurationcontext", null ],
        [ "resolver_context_name_query_maximum_interval (context)", "index.html#resolvercontextnamequerymaximumintervalcontext", null ],
        [ "resolver_context_name_query_minimum_interval (context)", "index.html#resolvercontextnamequeryminimumintervalcontext", null ],
        [ "resolver_datagram_max_size (context)", "index.html#resolverdatagrammaxsizecontext", null ],
        [ "resolver_domain_id_active_propagation_timeout (context)", "index.html#resolverdomainidactivepropagationtimeoutcontext", null ],
        [ "resolver_initial_advertisement_bps (context)", "index.html#resolverinitialadvertisementbpscontext", null ],
        [ "resolver_initial_advertisements_per_second (context)", "index.html#resolverinitialadvertisementspersecondcontext", null ],
        [ "resolver_initial_queries_per_second (context)", "index.html#resolverinitialqueriespersecondcontext", null ],
        [ "resolver_initial_query_bps (context)", "index.html#resolverinitialquerybpscontext", null ],
        [ "resolver_query_maximum_initial_interval (receiver)", "index.html#resolverquerymaximuminitialintervalreceiver", null ],
        [ "resolver_query_minimum_initial_duration (receiver)", "index.html#resolverqueryminimuminitialdurationreceiver", null ],
        [ "resolver_query_minimum_initial_interval (receiver)", "index.html#resolverqueryminimuminitialintervalreceiver", null ],
        [ "resolver_query_minimum_sustain_duration (receiver)", "index.html#resolverqueryminimumsustaindurationreceiver", null ],
        [ "resolver_query_sustain_interval (receiver)", "index.html#resolverquerysustainintervalreceiver", null ],
        [ "resolver_receiver_map_tablesz (context)", "index.html#resolverreceivermaptableszcontext", null ],
        [ "resolver_send_final_advertisements (source)", "index.html#resolversendfinaladvertisementssource", null ],
        [ "resolver_send_initial_advertisement (source)", "index.html#resolversendinitialadvertisementsource", null ],
        [ "resolver_service (context)", "index.html#resolverservicecontext", null ],
        [ "resolver_source_map_tablesz (context)", "index.html#resolversourcemaptableszcontext", null ],
        [ "resolver_string_hash_function (context)", "index.html#resolverstringhashfunctioncontext", null ],
        [ "resolver_string_hash_function_ex (context)", "index.html#resolverstringhashfunctionexcontext", null ],
        [ "resolver_sustain_advertisement_bps (context)", "index.html#resolversustainadvertisementbpscontext", null ],
        [ "resolver_sustain_advertisements_per_second (context)", "index.html#resolversustainadvertisementspersecondcontext", null ],
        [ "resolver_sustain_queries_per_second (context)", "index.html#resolversustainqueriespersecondcontext", null ],
        [ "resolver_sustain_query_bps (context)", "index.html#resolversustainquerybpscontext", null ],
        [ "resolver_unicast_activity_timeout (context)", "index.html#resolverunicastactivitytimeoutcontext", null ],
        [ "resolver_unicast_change_interval (context)", "index.html#resolverunicastchangeintervalcontext", null ],
        [ "resolver_unicast_check_interval (context)", "index.html#resolverunicastcheckintervalcontext", null ],
        [ "resolver_unicast_force_alive (context)", "index.html#resolverunicastforcealivecontext", null ],
        [ "resolver_unicast_ignore_unknown_source (context)", "index.html#resolverunicastignoreunknownsourcecontext", null ],
        [ "resolver_unicast_keepalive_interval (context)", "index.html#resolverunicastkeepaliveintervalcontext", null ]
      ] ]
    ] ],
    [ "Multicast Resolver Network Options", "index.html#grpmulticastresolvernetwork", [
      [ "Reference", "index.html#multicastresolvernetworkref", [
        [ "resolver_multicast_address (context)", "index.html#resolvermulticastaddresscontext", null ],
        [ "resolver_multicast_incoming_address (context)", "index.html#resolvermulticastincomingaddresscontext", null ],
        [ "resolver_multicast_incoming_port (context)", "index.html#resolvermulticastincomingportcontext", null ],
        [ "resolver_multicast_interface (context)", "index.html#resolvermulticastinterfacecontext", null ],
        [ "resolver_multicast_outgoing_address (context)", "index.html#resolvermulticastoutgoingaddresscontext", null ],
        [ "resolver_multicast_outgoing_port (context)", "index.html#resolvermulticastoutgoingportcontext", null ],
        [ "resolver_multicast_port (context)", "index.html#resolvermulticastportcontext", null ],
        [ "resolver_multicast_receiver_socket_buffer (context)", "index.html#resolvermulticastreceiversocketbuffercontext", null ],
        [ "resolver_multicast_ttl (context)", "index.html#resolvermulticastttlcontext", null ]
      ] ]
    ] ],
    [ "Unicast Resolver Network Options", "index.html#grpunicastresolvernetwork", [
      [ "Reference", "index.html#unicastresolvernetworkref", [
        [ "resolver_unicast_daemon (context)", "index.html#resolverunicastdaemoncontext", null ],
        [ "resolver_unicast_interface (context)", "index.html#resolverunicastinterfacecontext", null ],
        [ "resolver_unicast_port_high (context)", "index.html#resolverunicastporthighcontext", null ],
        [ "resolver_unicast_port_low (context)", "index.html#resolverunicastportlowcontext", null ],
        [ "resolver_unicast_receiver_socket_buffer (context)", "index.html#resolverunicastreceiversocketbuffercontext", null ]
      ] ]
    ] ],
    [ "Transport TCP Network Options", "index.html#grptransporttcpnetwork", [
      [ "TCP Transport Session Management", "index.html#tcptransportsessionmanagement", null ],
      [ "Reference", "index.html#transporttcpnetworkref", [
        [ "transport_tcp_interface (receiver)", "index.html#transporttcpinterfacereceiver", null ],
        [ "transport_tcp_interface (source)", "index.html#transporttcpinterfacesource", null ],
        [ "transport_tcp_maximum_ports (context)", "index.html#transporttcpmaximumportscontext", null ],
        [ "transport_tcp_port (source)", "index.html#transporttcpportsource", null ],
        [ "transport_tcp_port_high (context)", "index.html#transporttcpporthighcontext", null ],
        [ "transport_tcp_port_low (context)", "index.html#transporttcpportlowcontext", null ]
      ] ]
    ] ],
    [ "Transport TCP Operation Options", "index.html#grptransporttcpoperation", [
      [ "Reference", "index.html#transporttcpoperationref", [
        [ "transport_session_maximum_buffer (source)", "index.html#transportsessionmaximumbuffersource", null ],
        [ "transport_tcp_activity_method (receiver)", "index.html#transporttcpactivitymethodreceiver", null ],
        [ "transport_tcp_activity_timeout (receiver)", "index.html#transporttcpactivitytimeoutreceiver", null ],
        [ "transport_tcp_activity_timeout (source)", "index.html#transporttcpactivitytimeoutsource", null ],
        [ "transport_tcp_coalesce_threshold (source)", "index.html#transporttcpcoalescethresholdsource", null ],
        [ "transport_tcp_datagram_max_size (context)", "index.html#transporttcpdatagrammaxsizecontext", null ],
        [ "transport_tcp_dro_loss_recovery_timeout (receiver)", "index.html#transporttcpdrolossrecoverytimeoutreceiver", null ],
        [ "transport_tcp_exclusiveaddr (source)", "index.html#transporttcpexclusiveaddrsource", null ],
        [ "transport_tcp_listen_backlog (source)", "index.html#transporttcplistenbacklogsource", null ],
        [ "transport_tcp_multiple_receiver_behavior (source)", "index.html#transporttcpmultiplereceiverbehaviorsource", null ],
        [ "transport_tcp_multiple_receiver_send_order (source)", "index.html#transporttcpmultiplereceiversendordersource", null ],
        [ "transport_tcp_nodelay (source)", "index.html#transporttcpnodelaysource", null ],
        [ "transport_tcp_receiver_socket_buffer (context)", "index.html#transporttcpreceiversocketbuffercontext", null ],
        [ "transport_tcp_reuseaddr (source)", "index.html#transporttcpreuseaddrsource", null ],
        [ "transport_tcp_sender_socket_buffer (source)", "index.html#transporttcpsendersocketbuffersource", null ],
        [ "transport_tcp_use_session_id (source)", "index.html#transporttcpusesessionidsource", null ]
      ] ]
    ] ],
    [ "Transport LBT-RM Network Options", "index.html#grptransportlbtrmnetwork", [
      [ "LBT-RM Transport Session Management", "index.html#lbtrmtransportsessionmanagement", null ],
      [ "Reference", "index.html#transportlbtrmnetworkref", [
        [ "transport_lbtrm_destination_port (source)", "index.html#transportlbtrmdestinationportsource", null ],
        [ "transport_lbtrm_multicast_address (source)", "index.html#transportlbtrmmulticastaddresssource", null ],
        [ "transport_lbtrm_multicast_address_high (context)", "index.html#transportlbtrmmulticastaddresshighcontext", null ],
        [ "transport_lbtrm_multicast_address_low (context)", "index.html#transportlbtrmmulticastaddresslowcontext", null ],
        [ "transport_lbtrm_source_port_high (context)", "index.html#transportlbtrmsourceporthighcontext", null ],
        [ "transport_lbtrm_source_port_low (context)", "index.html#transportlbtrmsourceportlowcontext", null ]
      ] ]
    ] ],
    [ "Transport LBT-RM Reliability Options", "index.html#grptransportlbtrmreliability", [
      [ "LBT-RM Datagram", "index.html#lbtrmdatagramlossresultinginunrecoveredmessageloss", null ],
      [ "LBT-RM Source Ignoring NAKs for Efficiency", "index.html#lbtrmsourceignoringnaksforefficiency", null ],
      [ "LBT-RM Receiver Suppressing NAK Generation", "index.html#lbtrmreceiversuppressingnakgeneration", null ],
      [ "Reference", "index.html#transportlbtrmreliabilityref", [
        [ "transport_lbtrm_ignore_interval (source)", "index.html#transportlbtrmignoreintervalsource", null ],
        [ "transport_lbtrm_nak_backoff_interval (receiver)", "index.html#transportlbtrmnakbackoffintervalreceiver", null ],
        [ "transport_lbtrm_nak_generation_interval (receiver)", "index.html#transportlbtrmnakgenerationintervalreceiver", null ],
        [ "transport_lbtrm_nak_initial_backoff_interval (receiver)", "index.html#transportlbtrmnakinitialbackoffintervalreceiver", null ],
        [ "transport_lbtrm_nak_suppress_interval (receiver)", "index.html#transportlbtrmnaksuppressintervalreceiver", null ],
        [ "transport_lbtrm_receiver_socket_buffer (context)", "index.html#transportlbtrmreceiversocketbuffercontext", null ],
        [ "transport_lbtrm_send_naks (receiver)", "index.html#transportlbtrmsendnaksreceiver", null ],
        [ "transport_lbtrm_source_socket_buffer (context)", "index.html#transportlbtrmsourcesocketbuffercontext", null ],
        [ "transport_lbtrm_transmission_window_limit (source)", "index.html#transportlbtrmtransmissionwindowlimitsource", null ],
        [ "transport_lbtrm_transmission_window_size (source)", "index.html#transportlbtrmtransmissionwindowsizesource", null ]
      ] ]
    ] ],
    [ "Transport LBT-RM Operation Options", "index.html#grptransportlbtrmoperation", [
      [ "Reference", "index.html#transportlbtrmoperationref", [
        [ "transport_lbtrm_activity_timeout (receiver)", "index.html#transportlbtrmactivitytimeoutreceiver", null ],
        [ "transport_lbtrm_coalesce_threshold (source)", "index.html#transportlbtrmcoalescethresholdsource", null ],
        [ "transport_lbtrm_data_rate_limit (context)", "index.html#transportlbtrmdataratelimitcontext", null ],
        [ "transport_lbtrm_datagram_max_size (context)", "index.html#transportlbtrmdatagrammaxsizecontext", null ],
        [ "transport_lbtrm_preactivity_timeout (receiver)", "index.html#transportlbtrmpreactivitytimeoutreceiver", null ],
        [ "transport_lbtrm_rate_interval (context)", "index.html#transportlbtrmrateintervalcontext", null ],
        [ "transport_lbtrm_receiver_timestamp (context)", "index.html#transportlbtrmreceivertimestampcontext", null ],
        [ "transport_lbtrm_recycle_receive_buffers (context)", "index.html#transportlbtrmrecyclereceivebufferscontext", null ],
        [ "transport_lbtrm_retransmit_rate_limit (context)", "index.html#transportlbtrmretransmitratelimitcontext", null ],
        [ "transport_lbtrm_sm_maximum_interval (source)", "index.html#transportlbtrmsmmaximumintervalsource", null ],
        [ "transport_lbtrm_sm_minimum_interval (source)", "index.html#transportlbtrmsmminimumintervalsource", null ],
        [ "transport_lbtrm_source_timestamp (context)", "index.html#transportlbtrmsourcetimestampcontext", null ],
        [ "transport_lbtrm_tgsz (source)", "index.html#transportlbtrmtgszsource", null ]
      ] ]
    ] ],
    [ "Transport LBT-RU Network Options", "index.html#grptransportlbtrunetwork", [
      [ "LBT-RU Transport Session Management", "index.html#lbtrutransportsessionmanagement", null ],
      [ "Reference", "index.html#transportlbtrunetworkref", [
        [ "transport_lbtru_interface (receiver)", "index.html#transportlbtruinterfacereceiver", null ],
        [ "transport_lbtru_interface (source)", "index.html#transportlbtruinterfacesource", null ],
        [ "transport_lbtru_maximum_ports (context)", "index.html#transportlbtrumaximumportscontext", null ],
        [ "transport_lbtru_port (source)", "index.html#transportlbtruportsource", null ],
        [ "transport_lbtru_port_high (context)", "index.html#transportlbtruporthighcontext", null ],
        [ "transport_lbtru_port_high (receiver)", "index.html#transportlbtruporthighreceiver", null ],
        [ "transport_lbtru_port_low (context)", "index.html#transportlbtruportlowcontext", null ],
        [ "transport_lbtru_port_low (receiver)", "index.html#transportlbtruportlowreceiver", null ]
      ] ]
    ] ],
    [ "Transport LBT-RU Reliability Options", "index.html#grptransportlbtrureliability", [
      [ "Reference", "index.html#transportlbtrureliabilityref", [
        [ "transport_lbtru_ignore_interval (source)", "index.html#transportlbtruignoreintervalsource", null ],
        [ "transport_lbtru_nak_backoff_interval (receiver)", "index.html#transportlbtrunakbackoffintervalreceiver", null ],
        [ "transport_lbtru_nak_generation_interval (receiver)", "index.html#transportlbtrunakgenerationintervalreceiver", null ],
        [ "transport_lbtru_nak_initial_backoff_interval (receiver)", "index.html#transportlbtrunakinitialbackoffintervalreceiver", null ],
        [ "transport_lbtru_nak_suppress_interval (receiver)", "index.html#transportlbtrunaksuppressintervalreceiver", null ],
        [ "transport_lbtru_receiver_socket_buffer (context)", "index.html#transportlbtrureceiversocketbuffercontext", null ],
        [ "transport_lbtru_source_socket_buffer (context)", "index.html#transportlbtrusourcesocketbuffercontext", null ],
        [ "transport_lbtru_transmission_window_limit (source)", "index.html#transportlbtrutransmissionwindowlimitsource", null ],
        [ "transport_lbtru_transmission_window_size (source)", "index.html#transportlbtrutransmissionwindowsizesource", null ]
      ] ]
    ] ],
    [ "Transport LBT-RU Operation Options", "index.html#grptransportlbtruoperation", [
      [ "Reference", "index.html#transportlbtruoperationref", [
        [ "transport_lbtru_acknowledgement_interval (receiver)", "index.html#transportlbtruacknowledgementintervalreceiver", null ],
        [ "transport_lbtru_activity_timeout (receiver)", "index.html#transportlbtruactivitytimeoutreceiver", null ],
        [ "transport_lbtru_client_activity_timeout (source)", "index.html#transportlbtruclientactivitytimeoutsource", null ],
        [ "transport_lbtru_client_map_size (source)", "index.html#transportlbtruclientmapsizesource", null ],
        [ "transport_lbtru_coalesce_threshold (source)", "index.html#transportlbtrucoalescethresholdsource", null ],
        [ "transport_lbtru_connect_interval (receiver)", "index.html#transportlbtruconnectintervalreceiver", null ],
        [ "transport_lbtru_data_rate_limit (context)", "index.html#transportlbtrudataratelimitcontext", null ],
        [ "transport_lbtru_datagram_max_size (context)", "index.html#transportlbtrudatagrammaxsizecontext", null ],
        [ "transport_lbtru_maximum_connect_attempts (receiver)", "index.html#transportlbtrumaximumconnectattemptsreceiver", null ],
        [ "transport_lbtru_rate_interval (context)", "index.html#transportlbtrurateintervalcontext", null ],
        [ "transport_lbtru_recycle_receive_buffers (context)", "index.html#transportlbtrurecyclereceivebufferscontext", null ],
        [ "transport_lbtru_retransmit_rate_limit (context)", "index.html#transportlbtruretransmitratelimitcontext", null ],
        [ "transport_lbtru_sm_maximum_interval (source)", "index.html#transportlbtrusmmaximumintervalsource", null ],
        [ "transport_lbtru_sm_minimum_interval (source)", "index.html#transportlbtrusmminimumintervalsource", null ],
        [ "transport_lbtru_use_session_id (source)", "index.html#transportlbtruusesessionidsource", null ]
      ] ]
    ] ],
    [ "Transport LBT-IPC Operation Options", "index.html#grptransportlbtipcoperation", [
      [ "LBT-IPC Transport Session Management", "index.html#lbtipctransportsessionmanagement", null ],
      [ "Reference", "index.html#transportlbtipcoperationref", [
        [ "transport_lbtipc_activity_timeout (receiver)", "index.html#transportlbtipcactivitytimeoutreceiver", null ],
        [ "transport_lbtipc_behavior (source)", "index.html#transportlbtipcbehaviorsource", null ],
        [ "transport_lbtipc_datagram_max_size (context)", "index.html#transportlbtipcdatagrammaxsizecontext", null ],
        [ "transport_lbtipc_dro_loss_recovery_timeout (receiver)", "index.html#transportlbtipcdrolossrecoverytimeoutreceiver", null ],
        [ "transport_lbtipc_id (source)", "index.html#transportlbtipcidsource", null ],
        [ "transport_lbtipc_id_high (context)", "index.html#transportlbtipcidhighcontext", null ],
        [ "transport_lbtipc_id_low (context)", "index.html#transportlbtipcidlowcontext", null ],
        [ "transport_lbtipc_maximum_receivers_per_transport (source)", "index.html#transportlbtipcmaximumreceiverspertransportsource", null ],
        [ "transport_lbtipc_pend_behavior_linger_loop_count (context)", "index.html#transportlbtipcpendbehaviorlingerloopcountcontext", null ],
        [ "transport_lbtipc_receiver_operational_mode (context)", "index.html#transportlbtipcreceiveroperationalmodecontext", null ],
        [ "transport_lbtipc_receiver_thread_behavior (context)", "index.html#transportlbtipcreceiverthreadbehaviorcontext", null ],
        [ "transport_lbtipc_recycle_receive_buffers (context)", "index.html#transportlbtipcrecyclereceivebufferscontext", null ],
        [ "transport_lbtipc_sm_interval (source)", "index.html#transportlbtipcsmintervalsource", null ],
        [ "transport_lbtipc_transmission_window_size (source)", "index.html#transportlbtipctransmissionwindowsizesource", null ]
      ] ]
    ] ],
    [ "Transport LBT-SMX Operation Options", "index.html#grptransportlbtsmxoperation", [
      [ "LBT-SMX Transport Session Management", "index.html#lbtsmxtransportsessionmanagement", null ],
      [ "Reference", "index.html#transportlbtsmxoperationref", [
        [ "transport_lbtsmx_activity_timeout (receiver)", "index.html#transportlbtsmxactivitytimeoutreceiver", null ],
        [ "transport_lbtsmx_datagram_max_size (source)", "index.html#transportlbtsmxdatagrammaxsizesource", null ],
        [ "transport_lbtsmx_id (source)", "index.html#transportlbtsmxidsource", null ],
        [ "transport_lbtsmx_id_high (context)", "index.html#transportlbtsmxidhighcontext", null ],
        [ "transport_lbtsmx_id_low (context)", "index.html#transportlbtsmxidlowcontext", null ],
        [ "transport_lbtsmx_maximum_receivers_per_transport (source)", "index.html#transportlbtsmxmaximumreceiverspertransportsource", null ],
        [ "transport_lbtsmx_message_statistics_enabled (context)", "index.html#transportlbtsmxmessagestatisticsenabledcontext", null ],
        [ "transport_lbtsmx_sm_interval (source)", "index.html#transportlbtsmxsmintervalsource", null ],
        [ "transport_lbtsmx_transmission_window_size (source)", "index.html#transportlbtsmxtransmissionwindowsizesource", null ]
      ] ]
    ] ],
    [ "Transport Acceleration Options", "index.html#grptransportacceleration", [
      [ "Myricom® Datagram Bypass Layer (DBL™)", "index.html#myricomdatagrambypasslayerdbl", null ],
      [ "Reference", "index.html#transportaccelerationmyricomref", [
        [ "dbl_lbtrm_acceleration (context)", "index.html#dbllbtrmaccelerationcontext", null ],
        [ "dbl_lbtru_acceleration (context)", "index.html#dbllbtruaccelerationcontext", null ],
        [ "dbl_mim_acceleration (context)", "index.html#dblmimaccelerationcontext", null ],
        [ "dbl_resolver_acceleration (context)", "index.html#dblresolveraccelerationcontext", null ]
      ] ],
      [ "Solarflare® Onload", "index.html#solarflareonload", null ],
      [ "Reference", "index.html#transportaccelerationsolarflareref", [
        [ "onload_acceleration_stack_name (receiver)", "index.html#onloadaccelerationstacknamereceiver", null ],
        [ "onload_acceleration_stack_name (source)", "index.html#onloadaccelerationstacknamesource", null ]
      ] ],
      [ "UD Acceleration for Mellanox® Hardware Interfaces", "index.html#mellanoxudacceleration", null ],
      [ "Reference", "index.html#transportaccelerationmellanoxref", [
        [ "resolver_ud_acceleration (context)", "index.html#resolverudaccelerationcontext", null ],
        [ "ud_acceleration (context)", "index.html#udaccelerationcontext", null ]
      ] ]
    ] ],
    [ "Smart Source Options", "index.html#grpsmartsource", [
      [ "Reference", "index.html#smartsourceref", [
        [ "mem_mgt_callbacks (source)", "index.html#memmgtcallbackssource", null ],
        [ "smart_src_enable_spectrum_channel (source)", "index.html#smartsrcenablespectrumchannelsource", null ],
        [ "smart_src_max_message_length (source)", "index.html#smartsrcmaxmessagelengthsource", null ],
        [ "smart_src_message_property_int_count (source)", "index.html#smartsrcmessagepropertyintcountsource", null ],
        [ "smart_src_retention_buffer_count (source)", "index.html#smartsrcretentionbuffercountsource", null ],
        [ "smart_src_user_buffer_count (source)", "index.html#smartsrcuserbuffercountsource", null ],
        [ "transport_lbtrm_smart_src_transmission_window_buffer_count (source)", "index.html#transportlbtrmsmartsrctransmissionwindowbuffercountsource", null ],
        [ "transport_lbtru_smart_src_transmission_window_buffer_count (source)", "index.html#transportlbtrusmartsrctransmissionwindowbuffercountsource", null ]
      ] ]
    ] ],
    [ "Encrypted TCP Options", "index.html#grpencryptedtcp", [
      [ "Reference", "index.html#encryptedtcpref", [
        [ "tls_certificate (context)", "index.html#tlscertificatecontext", null ],
        [ "tls_certificate_key (context)", "index.html#tlscertificatekeycontext", null ],
        [ "tls_certificate_key_password (context)", "index.html#tlscertificatekeypasswordcontext", null ],
        [ "tls_cipher_suites (context)", "index.html#tlsciphersuitescontext", null ],
        [ "tls_compression_negotiation_timeout (context)", "index.html#tlscompressionnegotiationtimeoutcontext", null ],
        [ "tls_trusted_certificates (context)", "index.html#tlstrustedcertificatescontext", null ],
        [ "use_tls (context)", "index.html#usetlscontext", null ]
      ] ]
    ] ],
    [ "Compressed TCP Options", "index.html#grpcompressedtcp", [
      [ "Reference", "index.html#compressedtcpref", [
        [ "compression (context)", "index.html#compressioncontext", null ]
      ] ]
    ] ],
    [ "Multicast Immediate Messaging Network Options", "index.html#grpmulticastimmediatemessagingnetwork", [
      [ "Reference", "index.html#multicastimmediatemessagingnetworkref", [
        [ "mim_address (context)", "index.html#mimaddresscontext", null ],
        [ "mim_destination_port (context)", "index.html#mimdestinationportcontext", null ],
        [ "mim_incoming_address (context)", "index.html#mimincomingaddresscontext", null ],
        [ "mim_incoming_destination_port (context)", "index.html#mimincomingdestinationportcontext", null ],
        [ "mim_outgoing_address (context)", "index.html#mimoutgoingaddresscontext", null ],
        [ "mim_outgoing_destination_port (context)", "index.html#mimoutgoingdestinationportcontext", null ]
      ] ]
    ] ],
    [ "Multicast Immediate Messaging Reliability Options", "index.html#grpmulticastimmediatemessagingreliability", [
      [ "Reference", "index.html#multicastimmediatemessagingreliabilityref", [
        [ "mim_ignore_interval (context)", "index.html#mimignoreintervalcontext", null ],
        [ "mim_nak_backoff_interval (context)", "index.html#mimnakbackoffintervalcontext", null ],
        [ "mim_nak_generation_interval (context)", "index.html#mimnakgenerationintervalcontext", null ],
        [ "mim_nak_initial_backoff_interval (context)", "index.html#mimnakinitialbackoffintervalcontext", null ],
        [ "mim_nak_suppress_interval (context)", "index.html#mimnaksuppressintervalcontext", null ],
        [ "mim_send_naks (context)", "index.html#mimsendnakscontext", null ],
        [ "mim_transmission_window_limit (context)", "index.html#mimtransmissionwindowlimitcontext", null ],
        [ "mim_transmission_window_size (context)", "index.html#mimtransmissionwindowsizecontext", null ]
      ] ]
    ] ],
    [ "Multicast Immediate Messaging Operation Options", "index.html#grpmulticastimmediatemessagingoperation", [
      [ "Reference", "index.html#multicastimmediatemessagingoperationref", [
        [ "immediate_message_receiver_function (context)", "index.html#immediatemessagereceiverfunctioncontext", null ],
        [ "immediate_message_topic_receiver_function (context)", "index.html#immediatemessagetopicreceiverfunctioncontext", null ],
        [ "mim_activity_timeout (context)", "index.html#mimactivitytimeoutcontext", null ],
        [ "mim_delivery_control_activity_check_interval (context)", "index.html#mimdeliverycontrolactivitycheckintervalcontext", null ],
        [ "mim_delivery_control_activity_timeout (context)", "index.html#mimdeliverycontrolactivitytimeoutcontext", null ],
        [ "mim_delivery_control_order_tablesz (context)", "index.html#mimdeliverycontrolordertableszcontext", null ],
        [ "mim_implicit_batching_interval (context)", "index.html#mimimplicitbatchingintervalcontext", null ],
        [ "mim_implicit_batching_minimum_length (context)", "index.html#mimimplicitbatchingminimumlengthcontext", null ],
        [ "mim_ordered_delivery (context)", "index.html#mimordereddeliverycontext", null ],
        [ "mim_sm_maximum_interval (context)", "index.html#mimsmmaximumintervalcontext", null ],
        [ "mim_sm_minimum_interval (context)", "index.html#mimsmminimumintervalcontext", null ],
        [ "mim_sqn_window_increment (context)", "index.html#mimsqnwindowincrementcontext", null ],
        [ "mim_sqn_window_size (context)", "index.html#mimsqnwindowsizecontext", null ],
        [ "mim_src_deletion_timeout (context)", "index.html#mimsrcdeletiontimeoutcontext", null ],
        [ "mim_tgsz (context)", "index.html#mimtgszcontext", null ],
        [ "mim_unrecoverable_loss_function (context)", "index.html#mimunrecoverablelossfunctioncontext", null ]
      ] ]
    ] ],
    [ "Late Join Options", "index.html#grplatejoin", [
      [ "Estimating Recovery Time", "index.html#estimatingrecoverytime", null ],
      [ "Reference", "index.html#latejoinref", [
        [ "late_join (source)", "index.html#latejoinsource", null ],
        [ "late_join_info_request_interval (receiver)", "index.html#latejoininforequestintervalreceiver", null ],
        [ "late_join_info_request_maximum (receiver)", "index.html#latejoininforequestmaximumreceiver", null ],
        [ "retransmit_initial_sequence_number_request (receiver)", "index.html#retransmitinitialsequencenumberrequestreceiver", null ],
        [ "retransmit_message_caching_proximity (receiver)", "index.html#retransmitmessagecachingproximityreceiver", null ],
        [ "retransmit_request_interval (receiver)", "index.html#retransmitrequestintervalreceiver", null ],
        [ "retransmit_request_maximum (receiver)", "index.html#retransmitrequestmaximumreceiver", null ],
        [ "retransmit_request_message_timeout (receiver)", "index.html#retransmitrequestmessagetimeoutreceiver", null ],
        [ "retransmit_request_outstanding_maximum (receiver)", "index.html#retransmitrequestoutstandingmaximumreceiver", null ],
        [ "retransmit_retention_size_limit (source)", "index.html#retransmitretentionsizelimitsource", null ],
        [ "retransmit_retention_size_threshold (source)", "index.html#retransmitretentionsizethresholdsource", null ],
        [ "use_late_join (receiver)", "index.html#uselatejoinreceiver", null ]
      ] ]
    ] ],
    [ "Off-Transport Recovery Options", "index.html#grpofftransportrecovery", [
      [ "Reference", "index.html#offtransportrecoveryref", [
        [ "otr_message_caching_threshold (receiver)", "index.html#otrmessagecachingthresholdreceiver", null ],
        [ "otr_request_initial_delay (receiver)", "index.html#otrrequestinitialdelayreceiver", null ],
        [ "otr_request_log_alert_cooldown (receiver)", "index.html#otrrequestlogalertcooldownreceiver", null ],
        [ "otr_request_maximum_interval (receiver)", "index.html#otrrequestmaximumintervalreceiver", null ],
        [ "otr_request_message_timeout (receiver)", "index.html#otrrequestmessagetimeoutreceiver", null ],
        [ "otr_request_minimum_interval (receiver)", "index.html#otrrequestminimumintervalreceiver", null ],
        [ "otr_request_outstanding_maximum (receiver)", "index.html#otrrequestoutstandingmaximumreceiver", null ],
        [ "use_otr (receiver)", "index.html#useotrreceiver", null ]
      ] ]
    ] ],
    [ "Unicast Immediate Messaging Network Options", "index.html#grpunicastimmediatemessagingnetwork", [
      [ "Reference", "index.html#requestnetworkref", [
        [ "request_tcp_bind_request_port (context)", "index.html#requesttcpbindrequestportcontext", null ],
        [ "request_tcp_interface (context)", "index.html#requesttcpinterfacecontext", null ],
        [ "request_tcp_port (context)", "index.html#requesttcpportcontext", null ],
        [ "request_tcp_port_high (context)", "index.html#requesttcpporthighcontext", null ],
        [ "request_tcp_port_low (context)", "index.html#requesttcpportlowcontext", null ]
      ] ]
    ] ],
    [ "Unicast Immediate Messaging Operation Options", "index.html#grpunicastimmediatemessagingoperation", [
      [ "Reference", "index.html#requestoperationref", [
        [ "request_tcp_exclusiveaddr (context)", "index.html#requesttcpexclusiveaddrcontext", null ],
        [ "request_tcp_listen_backlog (context)", "index.html#requesttcplistenbacklogcontext", null ],
        [ "request_tcp_reuseaddr (context)", "index.html#requesttcpreuseaddrcontext", null ],
        [ "response_session_maximum_buffer (context)", "index.html#responsesessionmaximumbuffercontext", null ],
        [ "response_session_sender_socket_buffer (context)", "index.html#responsesessionsendersocketbuffercontext", null ],
        [ "response_tcp_deletion_timeout (context)", "index.html#responsetcpdeletiontimeoutcontext", null ],
        [ "response_tcp_interface (context)", "index.html#responsetcpinterfacecontext", null ],
        [ "response_tcp_nodelay (context)", "index.html#responsetcpnodelaycontext", null ]
      ] ]
    ] ],
    [ "Implicit Batching Options", "index.html#grpimplicitbatching", [
      [ "Reference", "index.html#implicitbatchingref", [
        [ "implicit_batching_interval (source)", "index.html#implicitbatchingintervalsource", null ],
        [ "implicit_batching_minimum_length (source)", "index.html#implicitbatchingminimumlengthsource", null ]
      ] ]
    ] ],
    [ "Delivery Control Options", "index.html#grpdeliverycontrol", [
      [ "Burst Loss", "index.html#burstloss", null ],
      [ "Reference", "index.html#deliverycontrolref", [
        [ "channel_map_tablesz (receiver)", "index.html#channelmaptableszreceiver", null ],
        [ "delivery_control_loss_check_interval (receiver)", "index.html#deliverycontrollosscheckintervalreceiver", null ],
        [ "delivery_control_maximum_burst_loss (receiver)", "index.html#deliverycontrolmaximumburstlossreceiver", null ],
        [ "delivery_control_maximum_total_map_entries (context)", "index.html#deliverycontrolmaximumtotalmapentriescontext", null ],
        [ "delivery_control_message_batching (context)", "index.html#deliverycontrolmessagebatchingcontext", null ],
        [ "mim_delivery_control_loss_check_interval (context)", "index.html#mimdeliverycontrollosscheckintervalcontext", null ],
        [ "null_channel_behavior (receiver)", "index.html#nullchannelbehaviorreceiver", null ],
        [ "source_notification_function (receiver)", "index.html#sourcenotificationfunctionreceiver", null ],
        [ "unrecognized_channel_behavior (receiver)", "index.html#unrecognizedchannelbehaviorreceiver", null ]
      ] ]
    ] ],
    [ "Wildcard Receiver Options", "index.html#grpwildcardreceiver", [
      [ "Reference", "index.html#wildcardreceiverref", [
        [ "pattern_type (wildcard_receiver)", "index.html#patterntypewildcardreceiver", null ],
        [ "receiver_create_callback (wildcard_receiver)", "index.html#receivercreatecallbackwildcardreceiver", null ],
        [ "receiver_delete_callback (wildcard_receiver)", "index.html#receiverdeletecallbackwildcardreceiver", null ],
        [ "resolver_no_source_linger_timeout (wildcard_receiver)", "index.html#resolvernosourcelingertimeoutwildcardreceiver", null ],
        [ "resolver_query_maximum_interval (wildcard_receiver)", "index.html#resolverquerymaximumintervalwildcardreceiver", null ],
        [ "resolver_query_minimum_duration (wildcard_receiver)", "index.html#resolverqueryminimumdurationwildcardreceiver", null ],
        [ "resolver_query_minimum_interval (wildcard_receiver)", "index.html#resolverqueryminimumintervalwildcardreceiver", null ],
        [ "resolver_wildcard_queries_per_second (context)", "index.html#resolverwildcardqueriespersecondcontext", null ],
        [ "resolver_wildcard_query_bps (context)", "index.html#resolverwildcardquerybpscontext", null ],
        [ "resolver_wildcard_receiver_map_tablesz (context)", "index.html#resolverwildcardreceivermaptableszcontext", null ]
      ] ]
    ] ],
    [ "Event Queue Options", "index.html#grpeventqueue", [
      [ "Reference", "index.html#eventqueueref", [
        [ "event_queue_name (event_queue)", "index.html#eventqueuenameeventqueue", null ],
        [ "queue_age_enabled (event_queue)", "index.html#queueageenabledeventqueue", null ],
        [ "queue_cancellation_callbacks_enabled (event_queue)", "index.html#queuecancellationcallbacksenabledeventqueue", null ],
        [ "queue_count_enabled (event_queue)", "index.html#queuecountenabledeventqueue", null ],
        [ "queue_delay_warning (event_queue)", "index.html#queuedelaywarningeventqueue", null ],
        [ "queue_enqueue_notification (event_queue)", "index.html#queueenqueuenotificationeventqueue", null ],
        [ "queue_objects_purged_on_close (event_queue)", "index.html#queueobjectspurgedoncloseeventqueue", null ],
        [ "queue_service_time_enabled (event_queue)", "index.html#queueservicetimeenabledeventqueue", null ],
        [ "queue_size_warning (event_queue)", "index.html#queuesizewarningeventqueue", null ]
      ] ]
    ] ],
    [ "Ultra Messaging Persistence Options", "index.html#grpultramessagingpersistence", [
      [ "Reference", "index.html#ultramessagingpersistenceref", [
        [ "ume_ack_batching_interval (context)", "index.html#umeackbatchingintervalcontext", null ],
        [ "ume_activity_timeout (receiver)", "index.html#umeactivitytimeoutreceiver", null ],
        [ "ume_activity_timeout (source)", "index.html#umeactivitytimeoutsource", null ],
        [ "ume_allow_confirmed_delivery (receiver)", "index.html#umeallowconfirmeddeliveryreceiver", null ],
        [ "ume_application_outstanding_maximum (receiver)", "index.html#umeapplicationoutstandingmaximumreceiver", null ],
        [ "ume_confirmed_delivery_notification (source)", "index.html#umeconfirmeddeliverynotificationsource", null ],
        [ "ume_consensus_sequence_number_behavior (receiver)", "index.html#umeconsensussequencenumberbehaviorreceiver", null ],
        [ "ume_consensus_sequence_number_behavior (source)", "index.html#umeconsensussequencenumberbehaviorsource", null ],
        [ "ume_explicit_ack_only (receiver)", "index.html#umeexplicitackonlyreceiver", null ],
        [ "ume_flight_size (source)", "index.html#umeflightsizesource", null ],
        [ "ume_flight_size_behavior (source)", "index.html#umeflightsizebehaviorsource", null ],
        [ "ume_flight_size_bytes (source)", "index.html#umeflightsizebytessource", null ],
        [ "ume_force_reclaim_function (source)", "index.html#umeforcereclaimfunctionsource", null ],
        [ "ume_late_join (source)", "index.html#umelatejoinsource", null ],
        [ "ume_message_stability_lifetime (source)", "index.html#umemessagestabilitylifetimesource", null ],
        [ "ume_message_stability_notification (source)", "index.html#umemessagestabilitynotificationsource", null ],
        [ "ume_message_stability_timeout (source)", "index.html#umemessagestabilitytimeoutsource", null ],
        [ "ume_proactive_keepalive_interval (context)", "index.html#umeproactivekeepaliveintervalcontext", null ],
        [ "ume_proxy_source (source)", "index.html#umeproxysourcesource", null ],
        [ "ume_receiver_liveness_interval (context)", "index.html#umereceiverlivenessintervalcontext", null ],
        [ "ume_receiver_paced_persistence (receiver)", "index.html#umereceiverpacedpersistencereceiver", null ],
        [ "ume_receiver_paced_persistence (source)", "index.html#umereceiverpacedpersistencesource", null ],
        [ "ume_recovery_sequence_number_info_function (receiver)", "index.html#umerecoverysequencenumberinfofunctionreceiver", null ],
        [ "ume_registration_extended_function (receiver)", "index.html#umeregistrationextendedfunctionreceiver", null ],
        [ "ume_registration_function (receiver)", "index.html#umeregistrationfunctionreceiver", null ],
        [ "ume_registration_interval (receiver)", "index.html#umeregistrationintervalreceiver", null ],
        [ "ume_registration_interval (source)", "index.html#umeregistrationintervalsource", null ],
        [ "ume_repository_ack_on_reception (source)", "index.html#umerepositoryackonreceptionsource", null ],
        [ "ume_repository_disk_file_size_limit (source)", "index.html#umerepositorydiskfilesizelimitsource", null ],
        [ "ume_repository_size_limit (source)", "index.html#umerepositorysizelimitsource", null ],
        [ "ume_repository_size_threshold (source)", "index.html#umerepositorysizethresholdsource", null ],
        [ "ume_retention_intergroup_stability_behavior (source)", "index.html#umeretentionintergroupstabilitybehaviorsource", null ],
        [ "ume_retention_intragroup_stability_behavior (source)", "index.html#umeretentionintragroupstabilitybehaviorsource", null ],
        [ "ume_retention_size_limit (source)", "index.html#umeretentionsizelimitsource", null ],
        [ "ume_retention_size_threshold (source)", "index.html#umeretentionsizethresholdsource", null ],
        [ "ume_retention_unique_confirmations (source)", "index.html#umeretentionuniqueconfirmationssource", null ],
        [ "ume_session_id (context)", "index.html#umesessionidcontext", null ],
        [ "ume_session_id (receiver)", "index.html#umesessionidreceiver", null ],
        [ "ume_session_id (source)", "index.html#umesessionidsource", null ],
        [ "ume_source_liveness_timeout (context)", "index.html#umesourcelivenesstimeoutcontext", null ],
        [ "ume_sri_flush_sri_request_response (source)", "index.html#umesriflushsrirequestresponsesource", null ],
        [ "ume_sri_immediate_sri_request_response (source)", "index.html#umesriimmediatesrirequestresponsesource", null ],
        [ "ume_sri_inter_sri_interval (source)", "index.html#umesriintersriintervalsource", null ],
        [ "ume_sri_max_number_of_sri_per_update (source)", "index.html#umesrimaxnumberofsriperupdatesource", null ],
        [ "ume_sri_request_interval (receiver)", "index.html#umesrirequestintervalreceiver", null ],
        [ "ume_sri_request_maximum (receiver)", "index.html#umesrirequestmaximumreceiver", null ],
        [ "ume_sri_request_response_latency (source)", "index.html#umesrirequestresponselatencysource", null ],
        [ "ume_state_lifetime (receiver)", "index.html#umestatelifetimereceiver", null ],
        [ "ume_state_lifetime (source)", "index.html#umestatelifetimesource", null ],
        [ "ume_store (source)", "index.html#umestoresource", null ],
        [ "ume_store_activity_timeout (source)", "index.html#umestoreactivitytimeoutsource", null ],
        [ "ume_store_behavior (source)", "index.html#umestorebehaviorsource", null ],
        [ "ume_store_check_interval (source)", "index.html#umestorecheckintervalsource", null ],
        [ "ume_store_group (source)", "index.html#umestoregroupsource", null ],
        [ "ume_store_name (source)", "index.html#umestorenamesource", null ],
        [ "ume_use_ack_batching (receiver)", "index.html#umeuseackbatchingreceiver", null ],
        [ "ume_use_late_join (receiver)", "index.html#umeuselatejoinreceiver", null ],
        [ "ume_use_store (receiver)", "index.html#umeusestorereceiver", null ],
        [ "ume_user_receiver_registration_id (context)", "index.html#umeuserreceiverregistrationidcontext", null ],
        [ "ume_write_delay (source)", "index.html#umewritedelaysource", null ]
      ] ]
    ] ],
    [ "Ultra Messaging Queuing Options", "index.html#grpultramessagingqueuing", [
      [ "Reference", "index.html#ultramessagingqueuingref", [
        [ "umq_command_interval (context)", "index.html#umqcommandintervalcontext", null ],
        [ "umq_command_outstanding_maximum (context)", "index.html#umqcommandoutstandingmaximumcontext", null ],
        [ "umq_delayed_consumption_report_interval (receiver)", "index.html#umqdelayedconsumptionreportintervalreceiver", null ],
        [ "umq_hold_interval (receiver)", "index.html#umqholdintervalreceiver", null ],
        [ "umq_index_assignment_eligibility_default (receiver)", "index.html#umqindexassignmenteligibilitydefaultreceiver", null ],
        [ "umq_message_stability_notification (source)", "index.html#umqmessagestabilitynotificationsource", null ],
        [ "umq_msg_total_lifetime (source)", "index.html#umqmsgtotallifetimesource", null ],
        [ "umq_queue_activity_timeout (context)", "index.html#umqqueueactivitytimeoutcontext", null ],
        [ "umq_queue_participation (receiver)", "index.html#umqqueueparticipationreceiver", null ],
        [ "umq_queue_registration_id (context)", "index.html#umqqueueregistrationidcontext", null ],
        [ "umq_receiver_type_id (receiver)", "index.html#umqreceivertypeidreceiver", null ],
        [ "umq_retransmit_request_interval (receiver)", "index.html#umqretransmitrequestintervalreceiver", null ],
        [ "umq_retransmit_request_outstanding_maximum (receiver)", "index.html#umqretransmitrequestoutstandingmaximumreceiver", null ],
        [ "umq_session_id (context)", "index.html#umqsessionidcontext", null ],
        [ "umq_ulb_application_set (source)", "index.html#umqulbapplicationsetsource", null ],
        [ "umq_ulb_application_set_assignment_function (source)", "index.html#umqulbapplicationsetassignmentfunctionsource", null ],
        [ "umq_ulb_application_set_events (source)", "index.html#umqulbapplicationseteventssource", null ],
        [ "umq_ulb_application_set_load_factor_behavior (source)", "index.html#umqulbapplicationsetloadfactorbehaviorsource", null ],
        [ "umq_ulb_application_set_message_lifetime (source)", "index.html#umqulbapplicationsetmessagelifetimesource", null ],
        [ "umq_ulb_application_set_message_max_reassignments (source)", "index.html#umqulbapplicationsetmessagemaxreassignmentssource", null ],
        [ "umq_ulb_application_set_message_reassignment_timeout (source)", "index.html#umqulbapplicationsetmessagereassignmenttimeoutsource", null ],
        [ "umq_ulb_application_set_receiver_activity_timeout (source)", "index.html#umqulbapplicationsetreceiveractivitytimeoutsource", null ],
        [ "umq_ulb_application_set_receiver_keepalive_interval (source)", "index.html#umqulbapplicationsetreceiverkeepaliveintervalsource", null ],
        [ "umq_ulb_application_set_round_robin_bias (source)", "index.html#umqulbapplicationsetroundrobinbiassource", null ],
        [ "umq_ulb_check_interval (source)", "index.html#umqulbcheckintervalsource", null ],
        [ "umq_ulb_events (source)", "index.html#umqulbeventssource", null ],
        [ "umq_ulb_flight_size (source)", "index.html#umqulbflightsizesource", null ],
        [ "umq_ulb_flight_size_behavior (source)", "index.html#umqulbflightsizebehaviorsource", null ],
        [ "umq_ulb_receiver_events (source)", "index.html#umqulbreceivereventssource", null ],
        [ "umq_ulb_receiver_portion (source)", "index.html#umqulbreceiverportionsource", null ],
        [ "umq_ulb_receiver_priority (source)", "index.html#umqulbreceiverprioritysource", null ],
        [ "umq_ulb_source_activity_timeout (receiver)", "index.html#umqulbsourceactivitytimeoutreceiver", null ],
        [ "umq_ulb_source_check_interval (receiver)", "index.html#umqulbsourcecheckintervalreceiver", null ]
      ] ]
    ] ],
    [ "Hot Failover Operation Options", "index.html#grphotfailoveroperation", [
      [ "Reference", "index.html#hotfailoveroperationref", [
        [ "delivery_control_loss_check_interval (hfx)", "index.html#deliverycontrollosscheckintervalhfx", null ],
        [ "delivery_control_max_delay (hfx)", "index.html#deliverycontrolmaxdelayhfx", null ],
        [ "delivery_control_maximum_burst_loss (hfx)", "index.html#deliverycontrolmaximumburstlosshfx", null ],
        [ "delivery_control_maximum_total_map_entries (hfx)", "index.html#deliverycontrolmaximumtotalmapentrieshfx", null ],
        [ "duplicate_delivery (hfx)", "index.html#duplicatedeliveryhfx", null ],
        [ "hf_duplicate_delivery (receiver)", "index.html#hfduplicatedeliveryreceiver", null ],
        [ "hf_optional_messages (receiver)", "index.html#hfoptionalmessagesreceiver", null ],
        [ "hf_receiver (wildcard_receiver)", "index.html#hfreceiverwildcardreceiver", null ],
        [ "ordered_delivery (hfx)", "index.html#ordereddeliveryhfx", null ]
      ] ]
    ] ],
    [ "Automatic Monitoring Options", "index.html#grpautomaticmonitoring", [
      [ "Reference", "index.html#automaticmonitoringref", [
        [ "monitor_appid (context)", "index.html#monitorappidcontext", null ],
        [ "monitor_appid (event_queue)", "index.html#monitorappideventqueue", null ],
        [ "monitor_interval (context)", "index.html#monitorintervalcontext", null ],
        [ "monitor_interval (event_queue)", "index.html#monitorintervaleventqueue", null ],
        [ "monitor_interval (receiver)", "index.html#monitorintervalreceiver", null ],
        [ "monitor_interval (wildcard_receiver)", "index.html#monitorintervalwildcardreceiver", null ],
        [ "monitor_transport (context)", "index.html#monitortransportcontext", null ],
        [ "monitor_transport (event_queue)", "index.html#monitortransporteventqueue", null ],
        [ "monitor_transport_opts (context)", "index.html#monitortransportoptscontext", null ],
        [ "monitor_transport_opts (event_queue)", "index.html#monitortransportoptseventqueue", null ]
      ] ]
    ] ],
    [ "Deprecated Options", "index.html#grpdeprecated", [
      [ "Reference", "index.html#deprecatedref", [
        [ "delivery_control_loss_tablesz (receiver)", "index.html#deliverycontrollosstableszreceiver", null ],
        [ "delivery_control_order_tablesz (receiver)", "index.html#deliverycontrolordertableszreceiver", null ],
        [ "implicit_batching_type (source)", "index.html#implicitbatchingtypesource", null ],
        [ "network_compatibility_mode (context)", "index.html#networkcompatibilitymodecontext", null ],
        [ "otr_request_duration (receiver)", "index.html#otrrequestdurationreceiver", null ],
        [ "pattern_callback (wildcard_receiver)", "index.html#patterncallbackwildcardreceiver", null ],
        [ "rcv_sync_cache (receiver)", "index.html#rcvsynccachereceiver", null ],
        [ "rcv_sync_cache_timeout (receiver)", "index.html#rcvsynccachetimeoutreceiver", null ],
        [ "receive_thread_pool_size (context)", "index.html#receivethreadpoolsizecontext", null ],
        [ "resolver_active_source_interval (context)", "index.html#resolveractivesourceintervalcontext", null ],
        [ "resolver_active_threshold (context)", "index.html#resolveractivethresholdcontext", null ],
        [ "resolver_context_advertisement_interval (context)", "index.html#resolvercontextadvertisementintervalcontext", null ],
        [ "resolver_maximum_advertisements (context)", "index.html#resolvermaximumadvertisementscontext", null ],
        [ "resolver_maximum_queries (context)", "index.html#resolvermaximumqueriescontext", null ],
        [ "resolver_query_interval (context)", "index.html#resolverqueryintervalcontext", null ],
        [ "resolver_query_max_interval (wildcard_receiver)", "index.html#resolverquerymaxintervalwildcardreceiver", null ],
        [ "resolver_unicast_address (context)", "index.html#resolverunicastaddresscontext", null ],
        [ "resolver_unicast_destination_port (context)", "index.html#resolverunicastdestinationportcontext", null ],
        [ "resolver_unicast_port (context)", "index.html#resolverunicastportcontext", null ],
        [ "retransmit_message_map_tablesz (source)", "index.html#retransmitmessagemaptableszsource", null ],
        [ "retransmit_request_generation_interval (receiver)", "index.html#retransmitrequestgenerationintervalreceiver", null ],
        [ "retransmit_retention_age_threshold (source)", "index.html#retransmitretentionagethresholdsource", null ],
        [ "source_cost_evaluation_function (context)", "index.html#sourcecostevaluationfunctioncontext", null ],
        [ "transport_datagram_max_size (context)", "index.html#transportdatagrammaxsizecontext", null ],
        [ "transport_lbtipc_acknowledgement_interval (receiver)", "index.html#transportlbtipcacknowledgementintervalreceiver", null ],
        [ "transport_lbtipc_client_activity_timeout (source)", "index.html#transportlbtipcclientactivitytimeoutsource", null ],
        [ "transport_lbtrdma_datagram_max_size (context)", "index.html#transportlbtrdmadatagrammaxsizecontext", null ],
        [ "transport_lbtrdma_interface (source)", "index.html#transportlbtrdmainterfacesource", null ],
        [ "transport_lbtrdma_maximum_ports (context)", "index.html#transportlbtrdmamaximumportscontext", null ],
        [ "transport_lbtrdma_port (source)", "index.html#transportlbtrdmaportsource", null ],
        [ "transport_lbtrdma_port_high (context)", "index.html#transportlbtrdmaporthighcontext", null ],
        [ "transport_lbtrdma_port_low (context)", "index.html#transportlbtrdmaportlowcontext", null ],
        [ "transport_lbtrdma_receiver_thread_behavior (context)", "index.html#transportlbtrdmareceiverthreadbehaviorcontext", null ],
        [ "transport_lbtrdma_transmission_window_size (source)", "index.html#transportlbtrdmatransmissionwindowsizesource", null ],
        [ "ume_message_map_tablesz (source)", "index.html#umemessagemaptableszsource", null ],
        [ "ume_primary_store_address (source)", "index.html#umeprimarystoreaddresssource", null ],
        [ "ume_primary_store_port (source)", "index.html#umeprimarystoreportsource", null ],
        [ "ume_registration_id (source)", "index.html#umeregistrationidsource", null ],
        [ "ume_retransmit_request_generation_interval (receiver)", "index.html#umeretransmitrequestgenerationintervalreceiver", null ],
        [ "ume_retransmit_request_interval (receiver)", "index.html#umeretransmitrequestintervalreceiver", null ],
        [ "ume_retransmit_request_maximum (receiver)", "index.html#umeretransmitrequestmaximumreceiver", null ],
        [ "ume_retransmit_request_outstanding_maximum (receiver)", "index.html#umeretransmitrequestoutstandingmaximumreceiver", null ],
        [ "ume_secondary_store_address (source)", "index.html#umesecondarystoreaddresssource", null ],
        [ "ume_secondary_store_port (source)", "index.html#umesecondarystoreportsource", null ],
        [ "ume_tertiary_store_address (source)", "index.html#umetertiarystoreaddresssource", null ],
        [ "ume_tertiary_store_port (source)", "index.html#umetertiarystoreportsource", null ],
        [ "umq_flight_size (context)", "index.html#umqflightsizecontext", null ],
        [ "umq_flight_size (source)", "index.html#umqflightsizesource", null ],
        [ "umq_flight_size_behavior (context)", "index.html#umqflightsizebehaviorcontext", null ],
        [ "umq_flight_size_behavior (source)", "index.html#umqflightsizebehaviorsource", null ],
        [ "umq_message_retransmission_interval (context)", "index.html#umqmessageretransmissionintervalcontext", null ],
        [ "umq_message_stability_notification (context)", "index.html#umqmessagestabilitynotificationcontext", null ],
        [ "umq_msg_total_lifetime (context)", "index.html#umqmsgtotallifetimecontext", null ],
        [ "umq_queue_check_interval (context)", "index.html#umqqueuecheckintervalcontext", null ],
        [ "umq_queue_name (source)", "index.html#umqqueuenamesource", null ],
        [ "umq_queue_participants_only (source)", "index.html#umqqueueparticipantsonlysource", null ],
        [ "umq_queue_query_interval (context)", "index.html#umqqueuequeryintervalcontext", null ],
        [ "umq_require_queue_authentication (context)", "index.html#umqrequirequeueauthenticationcontext", null ],
        [ "umq_retention_intergroup_stability_behavior (context)", "index.html#umqretentionintergroupstabilitybehaviorcontext", null ],
        [ "umq_retention_intergroup_stability_behavior (source)", "index.html#umqretentionintergroupstabilitybehaviorsource", null ],
        [ "umq_retention_intragroup_stability_behavior (context)", "index.html#umqretentionintragroupstabilitybehaviorcontext", null ],
        [ "umq_retention_intragroup_stability_behavior (source)", "index.html#umqretentionintragroupstabilitybehaviorsource", null ],
        [ "use_transport_thread (receiver)", "index.html#usetransportthreadreceiver", null ]
      ] ]
    ] ],
    [ "Option Categories", "index.html#optioncategories", [
      [ "UM UDP Port Values", "index.html#umudpportvalues", null ],
      [ "UM TCP Port Values", "index.html#umtcpportvalues", null ],
      [ "UM Multicast Group Values", "index.html#ummulticastgroupvalues", null ],
      [ "UM Timer Interval Values", "index.html#umtimerintervalvalues", null ],
      [ "Options That May Be Set During Operation", "index.html#optionsthatmaybesetduringoperation", null ],
      [ "Options that Cannot Be Set Via Configuration Files", "index.html#optionsthatcannotbesetviaconfigurationfiles", null ]
    ] ]
  ] ]
];

var NAVTREEINDEX =
[
"index.html",
"index.html#resolveradvertisementminimumsustaindurationsource",
"index.html#transporttcpusesessionidsource"
];

var SYNCONMSG = 'click to disable panel synchronisation';
var SYNCOFFMSG = 'click to enable panel synchronisation';