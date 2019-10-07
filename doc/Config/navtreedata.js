var NAVTREE =
[
  [ "Configuration Guide", "index.html", [
    [ "Introduction", "index.html", [
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
    [ "XML Configuration Files", "xmlconfigurationfiles.html", [
      [ "XML Configuration Concepts", "xmlconfigurationfiles.html#xmlconfigurationconcepts", null ],
      [ "XML Reference Names", "xmlconfigurationfiles.html#xmlreferencenames", [
        [ "XML Object Names", "xmlconfigurationfiles.html#xmlobjectnames", null ],
        [ "XML Application Names", "xmlconfigurationfiles.html#xmlapplicationnames", null ]
      ] ],
      [ "Order and Rule Specifications", "xmlconfigurationfiles.html#orderandrulespecifications", [
        [ "Constraining Configuration Values", "xmlconfigurationfiles.html#constrainingconfigurationvalues", null ],
        [ "Restricting Topics", "xmlconfigurationfiles.html#restrictingtopics", null ],
        [ "Overlapping Topics", "xmlconfigurationfiles.html#overlappingtopics", null ]
      ] ],
      [ "UM Default Values", "xmlconfigurationfiles.html#umdefaultvalues", null ],
      [ "Reading XML Configuration Files", "xmlconfigurationfiles.html#readingxmlconfigurationfiles", null ],
      [ "Using XML Configuration Files With a UM Application", "xmlconfigurationfiles.html#usingxmlconfigurationfileswithaumapplication", null ],
      [ "XML Configuration File Format", "xmlconfigurationfiles.html#xmlconfigurationfileformat", null ],
      [ "Merging Multiple XML Configuration Files", "xmlconfigurationfiles.html#mergingmultiplexmlconfigurationfiles", null ],
      [ "XML Configuration File Elements", "xmlconfigurationfiles.html#xmlconfigurationfileelements", [
        [ "UM Element \"<um-configuration>\"", "xmlconfigurationfiles.html#umelementumconfiguration", null ],
        [ "UM Element \"<applications>\"", "xmlconfigurationfiles.html#umelementapplications", null ],
        [ "UM Element \"<application>\"", "xmlconfigurationfiles.html#umelementapplication", null ],
        [ "UM Element \"<application-data>\"", "xmlconfigurationfiles.html#umelementapplicationdata", null ],
        [ "UM Element \"<hfxs>\"", "xmlconfigurationfiles.html#umelementhfxs", null ],
        [ "UM Element \"<topic>\"", "xmlconfigurationfiles.html#umelementtopic", null ],
        [ "UM Element \"<options>\"", "xmlconfigurationfiles.html#umelementoptions", null ],
        [ "UM Element \"<option>\"", "xmlconfigurationfiles.html#umelementoption", null ],
        [ "UM Element \"<deny>\"", "xmlconfigurationfiles.html#umelementdeny", null ],
        [ "UM Element \"<allow>\"", "xmlconfigurationfiles.html#umelementallow", null ],
        [ "UM Element \"<event-queues>\"", "xmlconfigurationfiles.html#umelementeventqueues", null ],
        [ "UM Element \"<event-queue>\"", "xmlconfigurationfiles.html#umelementeventqueue", null ],
        [ "UM Element \"<contexts>\"", "xmlconfigurationfiles.html#umelementcontexts", null ],
        [ "UM Element \"<context>\"", "xmlconfigurationfiles.html#umelementcontext", null ],
        [ "UM Element \"<wildcard-receivers>\"", "xmlconfigurationfiles.html#umelementwildcardreceivers", null ],
        [ "UM Element \"<wildcard-receiver>\"", "xmlconfigurationfiles.html#umelementwildcardreceiver", null ],
        [ "UM Element \"<receivers>\"", "xmlconfigurationfiles.html#umelementreceivers", null ],
        [ "UM Element \"<sources>\"", "xmlconfigurationfiles.html#umelementsources", null ],
        [ "UM Element \"<templates>\"", "xmlconfigurationfiles.html#umelementtemplates", null ],
        [ "UM Element \"<template>\"", "xmlconfigurationfiles.html#umelementtemplate", null ],
        [ "UM Element \"<license>\"", "xmlconfigurationfiles.html#umelementlicense", null ]
      ] ],
      [ "XML Configuration File DTD", "xmlconfigurationfiles.html#xmlconfigurationfiledtd", null ],
      [ "Sample XML Configuration File", "xmlconfigurationfiles.html#samplexmlconfigurationfile", null ]
    ] ],
    [ "Attributes Objects", "attributesobjects.html", [
      [ "Creating An Attributes Object", "attributesobjects.html#creatinganattributesobject", null ],
      [ "Setting an Option from a Binary Value", "attributesobjects.html#settinganoptionfromabinaryvalue", [
        [ "Setting an Option from Arrays of Binary Values", "attributesobjects.html#settinganoptionfromarraysofbinaryvalues", null ]
      ] ],
      [ "Setting an Option from a String Value", "attributesobjects.html#settinganoptionfromastringvalue", null ],
      [ "Getting an Option as a Binary Value", "attributesobjects.html#gettinganoptionasabinaryvalue", null ],
      [ "Getting an Option as a String Value", "attributesobjects.html#gettinganoptionasastringvalue", null ],
      [ "Deleting an Attributes Object", "attributesobjects.html#deletinganattributesobject", null ]
    ] ],
    [ "Access to Current Operating Options", "accesstocurrentoperatingoptions.html", [
      [ "Retrieving Current Option Values", "accesstocurrentoperatingoptions.html#retrievingcurrentoptionvalues", [
        [ "Getting Current Option as a Binary Value", "accesstocurrentoperatingoptions.html#gettingcurrentoptionasabinaryvalue", null ],
        [ "Getting Current Option as a String Value", "accesstocurrentoperatingoptions.html#gettingcurrentoptionasastringvalue", null ]
      ] ],
      [ "Modifying Current Option Values", "accesstocurrentoperatingoptions.html#modifyingcurrentoptionvalues", [
        [ "Setting Current Option from a Binary Value", "accesstocurrentoperatingoptions.html#settingcurrentoptionfromabinaryvalue", null ],
        [ "Setting Current Option from a String Value", "accesstocurrentoperatingoptions.html#settingcurrentoptionfromastringvalue", null ]
      ] ]
    ] ],
    [ "Example Configuration Scenarios", "exampleconfigurationscenarios.html", [
      [ "Highest Throughput", "exampleconfigurationscenarios.html#highestthroughput", null ],
      [ "Lowest Latency", "exampleconfigurationscenarios.html#lowestlatency", null ],
      [ "Creating Multicast Sources", "exampleconfigurationscenarios.html#creatingmulticastsources", null ],
      [ "Disabling Aspects of Topic Resolution", "exampleconfigurationscenarios.html#disablingaspectsoftopicresolution", [
        [ "Disabling Topic Advertisements", "exampleconfigurationscenarios.html#disablingtopicadvertisements", null ],
        [ "Disabling Receiver Topic Queries", "exampleconfigurationscenarios.html#disablingreceivertopicqueries", null ],
        [ "Disabling Wildcard Topic Queries", "exampleconfigurationscenarios.html#disablingwildcardtopicqueries", null ],
        [ "Disabling Store (Context) Name Queries", "exampleconfigurationscenarios.html#disablingstorecontextnamequeries", null ],
        [ "All But the Minimum Topic Resolution Traffic", "exampleconfigurationscenarios.html#Disabling", null ]
      ] ],
      [ "Unicast Resolver", "exampleconfigurationscenarios.html#unicastresolver", null ],
      [ "Re-establish Pre-4.0 Topic Resolution", "exampleconfigurationscenarios.html#reestablishpre40topicresolution", null ],
      [ "Re-establish Pre-LBM 3.3 (Pre-UME 2.0) Port Defaults", "exampleconfigurationscenarios.html#reestablishprelbm33preume20portdefaults", null ],
      [ "Configure New Port Defaults", "exampleconfigurationscenarios.html#configurenewportdefaults", null ]
    ] ],
    [ "Interrelated Configuration Options", "interrelatedconfigurationoptions.html", [
      [ "Preventing NAK Storms with NAK Intervals", "interrelatedconfigurationoptions.html#preventingnakstormswithnakintervals", null ],
      [ "Preventing Tail Loss With TSNI and NAK Interval Options", "interrelatedconfigurationoptions.html#preventingtaillosswithtsniandnakintervaloptions", null ],
      [ "Preventing IPC Receiver Deafness With Keepalive Options", "interrelatedconfigurationoptions.html#preventingipcreceiverdeafnesswithkeepaliveoptions", null ],
      [ "Preventing Erroneous LBT-RM/LBT-RU Session Timeouts", "interrelatedconfigurationoptions.html#preventingerroneouslbtrmlbtrusessiontimeouts", null ],
      [ "Preventing Errors Due to Bad Multicast Address Ranges", "interrelatedconfigurationoptions.html#preventingerrorsduetobadmulticastaddressranges", null ],
      [ "Preventing Store Timeouts", "interrelatedconfigurationoptions.html#preventingstoretimeouts", null ],
      [ "Preventing ULB Timeouts", "interrelatedconfigurationoptions.html#preventingulbtimeouts", null ],
      [ "Preventing Unicast Resolver Daemon Timeouts", "interrelatedconfigurationoptions.html#preventingunicastresolverdaemontimeouts", null ],
      [ "Preventing Undetected Late Join Loss", "interrelatedconfigurationoptions.html#preventingundetectedlatejoinloss", null ],
      [ "Preventing Undetected Loss", "interrelatedconfigurationoptions.html#preventingundetectedloss", null ],
      [ "Preventing Store Registration Hangs", "interrelatedconfigurationoptions.html#preventingstoreregistrationhangs", null ]
    ] ],
    [ "General Configuration Guidelines", "generalconfigurationguidelines.html", [
      [ "Case Sensitivity", "generalconfigurationguidelines.html#casesensitivity", null ],
      [ "Specifying Interfaces", "generalconfigurationguidelines.html#specifyinginterfaces", [
        [ "Interface Device Names and XML", "generalconfigurationguidelines.html#interfacedevicenamesandxml", null ]
      ] ],
      [ "Socket Buffer Sizes", "generalconfigurationguidelines.html#socketbuffersizes", null ],
      [ "Port Assignments", "generalconfigurationguidelines.html#portassignments", [
        [ "Ephemeral Ports", "generalconfigurationguidelines.html#ephemeralports", null ],
        [ "Network VS Host Order", "generalconfigurationguidelines.html#networkvshostorder", null ]
      ] ],
      [ "Reference Entry Format", "generalconfigurationguidelines.html#referenceentryformat", null ]
    ] ],
    [ "Special Notes", "specialnotes.html", [
      [ "Configuring Multi-Homed Hosts", "specialnotes.html#configuringmultihomedhosts", null ],
      [ "Traversing a Firewall", "specialnotes.html#traversingafirewall", null ]
    ] ],
    [ "Major Options", "grpmajoroptions.html", [
      [ "Reference", "grpmajoroptions.html#majorref", [
        [ "broker (context)", "grpmajoroptions.html#brokercontext", null ],
        [ "compatibility_include_pre_um_6_0_behavior (context)", "grpmajoroptions.html#compatibilityincludepreum60behaviorcontext", null ],
        [ "context_event_function (context)", "grpmajoroptions.html#contexteventfunctioncontext", null ],
        [ "context_name (context)", "grpmajoroptions.html#contextnamecontext", null ],
        [ "datagram_acceleration_functions (context)", "grpmajoroptions.html#datagramaccelerationfunctionscontext", null ],
        [ "default_interface (context)", "grpmajoroptions.html#defaultinterfacecontext", null ],
        [ "fd_management_type (context)", "grpmajoroptions.html#fdmanagementtypecontext", null ],
        [ "message_selector (receiver)", "grpmajoroptions.html#messageselectorreceiver", null ],
        [ "multiple_receive_maximum_datagrams (context)", "grpmajoroptions.html#multiplereceivemaximumdatagramscontext", null ],
        [ "operational_mode (context)", "grpmajoroptions.html#operationalmodecontext", null ],
        [ "operational_mode (xsp)", "grpmajoroptions.html#operationalmodexsp", null ],
        [ "ordered_delivery (receiver)", "grpmajoroptions.html#ordereddeliveryreceiver", null ],
        [ "receiver_callback_service_time_enabled (context)", "grpmajoroptions.html#receivercallbackservicetimeenabledcontext", null ],
        [ "resolver_source_notification_function (context)", "grpmajoroptions.html#resolversourcenotificationfunctioncontext", null ],
        [ "source_event_function (context)", "grpmajoroptions.html#sourceeventfunctioncontext", null ],
        [ "source_includes_topic_index (context)", "grpmajoroptions.html#sourceincludestopicindexcontext", null ],
        [ "transport (source)", "grpmajoroptions.html#transportsource", null ],
        [ "transport_demux_tablesz (receiver)", "grpmajoroptions.html#transportdemuxtableszreceiver", null ],
        [ "transport_mapping_function (context)", "grpmajoroptions.html#transportmappingfunctioncontext", null ],
        [ "transport_session_multiple_sending_threads (context)", "grpmajoroptions.html#transportsessionmultiplesendingthreadscontext", null ],
        [ "transport_session_single_receiving_thread (context)", "grpmajoroptions.html#transportsessionsinglereceivingthreadcontext", null ],
        [ "transport_source_side_filtering_behavior (source)", "grpmajoroptions.html#transportsourcesidefilteringbehaviorsource", null ],
        [ "transport_topic_sequence_number_info_active_threshold (source)", "grpmajoroptions.html#transporttopicsequencenumberinfoactivethresholdsource", null ],
        [ "transport_topic_sequence_number_info_interval (source)", "grpmajoroptions.html#transporttopicsequencenumberinfointervalsource", null ],
        [ "transport_topic_sequence_number_info_request_interval (receiver)", "grpmajoroptions.html#transporttopicsequencenumberinforequestintervalreceiver", null ],
        [ "transport_topic_sequence_number_info_request_maximum (receiver)", "grpmajoroptions.html#transporttopicsequencenumberinforequestmaximumreceiver", null ],
        [ "use_extended_reclaim_notifications (source)", "grpmajoroptions.html#useextendedreclaimnotificationssource", null ],
        [ "zero_transports_function (xsp)", "grpmajoroptions.html#zerotransportsfunctionxsp", null ]
      ] ]
    ] ],
    [ "UDP-Based Resolver Operation Options", "grpudpbasedresolveroperation.html", [
      [ "Minimum Values for Advertisement and Query Intervals", "grpudpbasedresolveroperation.html#minimumvaluesforadvertisementandqueryintervals", null ],
      [ "Reference", "grpudpbasedresolveroperation.html#resolveroperationref", [
        [ "disable_extended_topic_resolution_message_options (context)", "grpudpbasedresolveroperation.html#disableextendedtopicresolutionmessageoptionscontext", null ],
        [ "resolution_no_source_notification_threshold (receiver)", "grpudpbasedresolveroperation.html#resolutionnosourcenotificationthresholdreceiver", null ],
        [ "resolution_number_of_sources_query_threshold (receiver)", "grpudpbasedresolveroperation.html#resolutionnumberofsourcesquerythresholdreceiver", null ],
        [ "resolver_advertisement_maximum_initial_interval (source)", "grpudpbasedresolveroperation.html#resolveradvertisementmaximuminitialintervalsource", null ],
        [ "resolver_advertisement_minimum_initial_duration (source)", "grpudpbasedresolveroperation.html#resolveradvertisementminimuminitialdurationsource", null ],
        [ "resolver_advertisement_minimum_initial_interval (source)", "grpudpbasedresolveroperation.html#resolveradvertisementminimuminitialintervalsource", null ],
        [ "resolver_advertisement_minimum_sustain_duration (source)", "grpudpbasedresolveroperation.html#resolveradvertisementminimumsustaindurationsource", null ],
        [ "resolver_advertisement_send_immediate_response (source)", "grpudpbasedresolveroperation.html#resolveradvertisementsendimmediateresponsesource", null ],
        [ "resolver_advertisement_sustain_interval (source)", "grpudpbasedresolveroperation.html#resolveradvertisementsustainintervalsource", null ],
        [ "resolver_cache (context)", "grpudpbasedresolveroperation.html#resolvercachecontext", null ],
        [ "resolver_context_name_activity_timeout (context)", "grpudpbasedresolveroperation.html#resolvercontextnameactivitytimeoutcontext", null ],
        [ "resolver_context_name_query_duration (context)", "grpudpbasedresolveroperation.html#resolvercontextnamequerydurationcontext", null ],
        [ "resolver_context_name_query_maximum_interval (context)", "grpudpbasedresolveroperation.html#resolvercontextnamequerymaximumintervalcontext", null ],
        [ "resolver_context_name_query_minimum_interval (context)", "grpudpbasedresolveroperation.html#resolvercontextnamequeryminimumintervalcontext", null ],
        [ "resolver_datagram_max_size (context)", "grpudpbasedresolveroperation.html#resolverdatagrammaxsizecontext", null ],
        [ "resolver_domain_id_active_propagation_timeout (context)", "grpudpbasedresolveroperation.html#resolverdomainidactivepropagationtimeoutcontext", null ],
        [ "resolver_initial_advertisement_bps (context)", "grpudpbasedresolveroperation.html#resolverinitialadvertisementbpscontext", null ],
        [ "resolver_initial_advertisements_per_second (context)", "grpudpbasedresolveroperation.html#resolverinitialadvertisementspersecondcontext", null ],
        [ "resolver_initial_queries_per_second (context)", "grpudpbasedresolveroperation.html#resolverinitialqueriespersecondcontext", null ],
        [ "resolver_initial_query_bps (context)", "grpudpbasedresolveroperation.html#resolverinitialquerybpscontext", null ],
        [ "resolver_query_maximum_initial_interval (receiver)", "grpudpbasedresolveroperation.html#resolverquerymaximuminitialintervalreceiver", null ],
        [ "resolver_query_minimum_initial_duration (receiver)", "grpudpbasedresolveroperation.html#resolverqueryminimuminitialdurationreceiver", null ],
        [ "resolver_query_minimum_initial_interval (receiver)", "grpudpbasedresolveroperation.html#resolverqueryminimuminitialintervalreceiver", null ],
        [ "resolver_query_minimum_sustain_duration (receiver)", "grpudpbasedresolveroperation.html#resolverqueryminimumsustaindurationreceiver", null ],
        [ "resolver_query_sustain_interval (receiver)", "grpudpbasedresolveroperation.html#resolverquerysustainintervalreceiver", null ],
        [ "resolver_receiver_map_tablesz (context)", "grpudpbasedresolveroperation.html#resolverreceivermaptableszcontext", null ],
        [ "resolver_send_final_advertisements (source)", "grpudpbasedresolveroperation.html#resolversendfinaladvertisementssource", null ],
        [ "resolver_send_initial_advertisement (source)", "grpudpbasedresolveroperation.html#resolversendinitialadvertisementsource", null ],
        [ "resolver_service (context)", "grpudpbasedresolveroperation.html#resolverservicecontext", null ],
        [ "resolver_source_map_tablesz (context)", "grpudpbasedresolveroperation.html#resolversourcemaptableszcontext", null ],
        [ "resolver_string_hash_function (context)", "grpudpbasedresolveroperation.html#resolverstringhashfunctioncontext", null ],
        [ "resolver_string_hash_function_ex (context)", "grpudpbasedresolveroperation.html#resolverstringhashfunctionexcontext", null ],
        [ "resolver_sustain_advertisement_bps (context)", "grpudpbasedresolveroperation.html#resolversustainadvertisementbpscontext", null ],
        [ "resolver_sustain_advertisements_per_second (context)", "grpudpbasedresolveroperation.html#resolversustainadvertisementspersecondcontext", null ],
        [ "resolver_sustain_queries_per_second (context)", "grpudpbasedresolveroperation.html#resolversustainqueriespersecondcontext", null ],
        [ "resolver_sustain_query_bps (context)", "grpudpbasedresolveroperation.html#resolversustainquerybpscontext", null ],
        [ "resolver_unicast_activity_timeout (context)", "grpudpbasedresolveroperation.html#resolverunicastactivitytimeoutcontext", null ],
        [ "resolver_unicast_change_interval (context)", "grpudpbasedresolveroperation.html#resolverunicastchangeintervalcontext", null ],
        [ "resolver_unicast_check_interval (context)", "grpudpbasedresolveroperation.html#resolverunicastcheckintervalcontext", null ],
        [ "resolver_unicast_force_alive (context)", "grpudpbasedresolveroperation.html#resolverunicastforcealivecontext", null ],
        [ "resolver_unicast_ignore_unknown_source (context)", "grpudpbasedresolveroperation.html#resolverunicastignoreunknownsourcecontext", null ],
        [ "resolver_unicast_keepalive_interval (context)", "grpudpbasedresolveroperation.html#resolverunicastkeepaliveintervalcontext", null ]
      ] ]
    ] ],
    [ "Multicast Resolver Network Options", "grpmulticastresolvernetwork.html", [
      [ "Reference", "grpmulticastresolvernetwork.html#multicastresolvernetworkref", [
        [ "resolver_multicast_address (context)", "grpmulticastresolvernetwork.html#resolvermulticastaddresscontext", null ],
        [ "resolver_multicast_incoming_address (context)", "grpmulticastresolvernetwork.html#resolvermulticastincomingaddresscontext", null ],
        [ "resolver_multicast_incoming_port (context)", "grpmulticastresolvernetwork.html#resolvermulticastincomingportcontext", null ],
        [ "resolver_multicast_interface (context)", "grpmulticastresolvernetwork.html#resolvermulticastinterfacecontext", null ],
        [ "resolver_multicast_outgoing_address (context)", "grpmulticastresolvernetwork.html#resolvermulticastoutgoingaddresscontext", null ],
        [ "resolver_multicast_outgoing_port (context)", "grpmulticastresolvernetwork.html#resolvermulticastoutgoingportcontext", null ],
        [ "resolver_multicast_port (context)", "grpmulticastresolvernetwork.html#resolvermulticastportcontext", null ],
        [ "resolver_multicast_receiver_socket_buffer (context)", "grpmulticastresolvernetwork.html#resolvermulticastreceiversocketbuffercontext", null ],
        [ "resolver_multicast_ttl (context)", "grpmulticastresolvernetwork.html#resolvermulticastttlcontext", null ]
      ] ]
    ] ],
    [ "Unicast Resolver Network Options", "grpunicastresolvernetwork.html", [
      [ "Reference", "grpunicastresolvernetwork.html#unicastresolvernetworkref", [
        [ "resolver_unicast_daemon (context)", "grpunicastresolvernetwork.html#resolverunicastdaemoncontext", null ],
        [ "resolver_unicast_interface (context)", "grpunicastresolvernetwork.html#resolverunicastinterfacecontext", null ],
        [ "resolver_unicast_port_high (context)", "grpunicastresolvernetwork.html#resolverunicastporthighcontext", null ],
        [ "resolver_unicast_port_low (context)", "grpunicastresolvernetwork.html#resolverunicastportlowcontext", null ],
        [ "resolver_unicast_receiver_socket_buffer (context)", "grpunicastresolvernetwork.html#resolverunicastreceiversocketbuffercontext", null ]
      ] ]
    ] ],
    [ "Transport TCP Network Options", "grptransporttcpnetwork.html", [
      [ "TCP Transport Session Management", "grptransporttcpnetwork.html#tcptransportsessionmanagement", null ],
      [ "Reference", "grptransporttcpnetwork.html#transporttcpnetworkref", [
        [ "transport_tcp_interface (receiver)", "grptransporttcpnetwork.html#transporttcpinterfacereceiver", null ],
        [ "transport_tcp_interface (source)", "grptransporttcpnetwork.html#transporttcpinterfacesource", null ],
        [ "transport_tcp_maximum_ports (context)", "grptransporttcpnetwork.html#transporttcpmaximumportscontext", null ],
        [ "transport_tcp_port (source)", "grptransporttcpnetwork.html#transporttcpportsource", null ],
        [ "transport_tcp_port_high (context)", "grptransporttcpnetwork.html#transporttcpporthighcontext", null ],
        [ "transport_tcp_port_low (context)", "grptransporttcpnetwork.html#transporttcpportlowcontext", null ]
      ] ]
    ] ],
    [ "Transport TCP Operation Options", "grptransporttcpoperation.html", [
      [ "Reference", "grptransporttcpoperation.html#transporttcpoperationref", [
        [ "transport_session_maximum_buffer (source)", "grptransporttcpoperation.html#transportsessionmaximumbuffersource", null ],
        [ "transport_tcp_activity_method (receiver)", "grptransporttcpoperation.html#transporttcpactivitymethodreceiver", null ],
        [ "transport_tcp_activity_timeout (receiver)", "grptransporttcpoperation.html#transporttcpactivitytimeoutreceiver", null ],
        [ "transport_tcp_activity_timeout (source)", "grptransporttcpoperation.html#transporttcpactivitytimeoutsource", null ],
        [ "transport_tcp_coalesce_threshold (source)", "grptransporttcpoperation.html#transporttcpcoalescethresholdsource", null ],
        [ "transport_tcp_datagram_max_size (context)", "grptransporttcpoperation.html#transporttcpdatagrammaxsizecontext", null ],
        [ "transport_tcp_dro_loss_recovery_timeout (receiver)", "grptransporttcpoperation.html#transporttcpdrolossrecoverytimeoutreceiver", null ],
        [ "transport_tcp_exclusiveaddr (source)", "grptransporttcpoperation.html#transporttcpexclusiveaddrsource", null ],
        [ "transport_tcp_listen_backlog (source)", "grptransporttcpoperation.html#transporttcplistenbacklogsource", null ],
        [ "transport_tcp_multiple_receiver_behavior (source)", "grptransporttcpoperation.html#transporttcpmultiplereceiverbehaviorsource", null ],
        [ "transport_tcp_multiple_receiver_send_order (source)", "grptransporttcpoperation.html#transporttcpmultiplereceiversendordersource", null ],
        [ "transport_tcp_nodelay (source)", "grptransporttcpoperation.html#transporttcpnodelaysource", null ],
        [ "transport_tcp_receiver_socket_buffer (context)", "grptransporttcpoperation.html#transporttcpreceiversocketbuffercontext", null ],
        [ "transport_tcp_reuseaddr (source)", "grptransporttcpoperation.html#transporttcpreuseaddrsource", null ],
        [ "transport_tcp_sender_socket_buffer (source)", "grptransporttcpoperation.html#transporttcpsendersocketbuffersource", null ],
        [ "transport_tcp_use_session_id (source)", "grptransporttcpoperation.html#transporttcpusesessionidsource", null ]
      ] ]
    ] ],
    [ "Transport LBT-RM Network Options", "grptransportlbtrmnetwork.html", [
      [ "LBT-RM Transport Session Management", "grptransportlbtrmnetwork.html#lbtrmtransportsessionmanagement", null ],
      [ "Reference", "grptransportlbtrmnetwork.html#transportlbtrmnetworkref", [
        [ "transport_lbtrm_destination_port (source)", "grptransportlbtrmnetwork.html#transportlbtrmdestinationportsource", null ],
        [ "transport_lbtrm_multicast_address (source)", "grptransportlbtrmnetwork.html#transportlbtrmmulticastaddresssource", null ],
        [ "transport_lbtrm_multicast_address_high (context)", "grptransportlbtrmnetwork.html#transportlbtrmmulticastaddresshighcontext", null ],
        [ "transport_lbtrm_multicast_address_low (context)", "grptransportlbtrmnetwork.html#transportlbtrmmulticastaddresslowcontext", null ],
        [ "transport_lbtrm_source_port_high (context)", "grptransportlbtrmnetwork.html#transportlbtrmsourceporthighcontext", null ],
        [ "transport_lbtrm_source_port_low (context)", "grptransportlbtrmnetwork.html#transportlbtrmsourceportlowcontext", null ]
      ] ]
    ] ],
    [ "Transport LBT-RM Reliability Options", "grptransportlbtrmreliability.html", [
      [ "LBT-RM Datagram", "grptransportlbtrmreliability.html#lbtrmdatagramlossresultinginunrecoveredmessageloss", null ],
      [ "LBT-RM Source Ignoring NAKs for Efficiency", "grptransportlbtrmreliability.html#lbtrmsourceignoringnaksforefficiency", null ],
      [ "LBT-RM Receiver Suppressing NAK Generation", "grptransportlbtrmreliability.html#lbtrmreceiversuppressingnakgeneration", null ],
      [ "Reference", "grptransportlbtrmreliability.html#transportlbtrmreliabilityref", [
        [ "transport_lbtrm_ignore_interval (source)", "grptransportlbtrmreliability.html#transportlbtrmignoreintervalsource", null ],
        [ "transport_lbtrm_nak_backoff_interval (receiver)", "grptransportlbtrmreliability.html#transportlbtrmnakbackoffintervalreceiver", null ],
        [ "transport_lbtrm_nak_generation_interval (receiver)", "grptransportlbtrmreliability.html#transportlbtrmnakgenerationintervalreceiver", null ],
        [ "transport_lbtrm_nak_initial_backoff_interval (receiver)", "grptransportlbtrmreliability.html#transportlbtrmnakinitialbackoffintervalreceiver", null ],
        [ "transport_lbtrm_nak_suppress_interval (receiver)", "grptransportlbtrmreliability.html#transportlbtrmnaksuppressintervalreceiver", null ],
        [ "transport_lbtrm_receiver_socket_buffer (context)", "grptransportlbtrmreliability.html#transportlbtrmreceiversocketbuffercontext", null ],
        [ "transport_lbtrm_send_naks (receiver)", "grptransportlbtrmreliability.html#transportlbtrmsendnaksreceiver", null ],
        [ "transport_lbtrm_source_socket_buffer (context)", "grptransportlbtrmreliability.html#transportlbtrmsourcesocketbuffercontext", null ],
        [ "transport_lbtrm_transmission_window_limit (source)", "grptransportlbtrmreliability.html#transportlbtrmtransmissionwindowlimitsource", null ],
        [ "transport_lbtrm_transmission_window_size (source)", "grptransportlbtrmreliability.html#transportlbtrmtransmissionwindowsizesource", null ]
      ] ]
    ] ],
    [ "Transport LBT-RM Operation Options", "grptransportlbtrmoperation.html", [
      [ "Reference", "grptransportlbtrmoperation.html#transportlbtrmoperationref", [
        [ "transport_lbtrm_activity_timeout (receiver)", "grptransportlbtrmoperation.html#transportlbtrmactivitytimeoutreceiver", null ],
        [ "transport_lbtrm_coalesce_threshold (source)", "grptransportlbtrmoperation.html#transportlbtrmcoalescethresholdsource", null ],
        [ "transport_lbtrm_data_rate_limit (context)", "grptransportlbtrmoperation.html#transportlbtrmdataratelimitcontext", null ],
        [ "transport_lbtrm_datagram_max_size (context)", "grptransportlbtrmoperation.html#transportlbtrmdatagrammaxsizecontext", null ],
        [ "transport_lbtrm_preactivity_timeout (receiver)", "grptransportlbtrmoperation.html#transportlbtrmpreactivitytimeoutreceiver", null ],
        [ "transport_lbtrm_rate_interval (context)", "grptransportlbtrmoperation.html#transportlbtrmrateintervalcontext", null ],
        [ "transport_lbtrm_receiver_timestamp (context)", "grptransportlbtrmoperation.html#transportlbtrmreceivertimestampcontext", null ],
        [ "transport_lbtrm_recycle_receive_buffers (context)", "grptransportlbtrmoperation.html#transportlbtrmrecyclereceivebufferscontext", null ],
        [ "transport_lbtrm_retransmit_rate_limit (context)", "grptransportlbtrmoperation.html#transportlbtrmretransmitratelimitcontext", null ],
        [ "transport_lbtrm_sm_maximum_interval (source)", "grptransportlbtrmoperation.html#transportlbtrmsmmaximumintervalsource", null ],
        [ "transport_lbtrm_sm_minimum_interval (source)", "grptransportlbtrmoperation.html#transportlbtrmsmminimumintervalsource", null ],
        [ "transport_lbtrm_source_timestamp (context)", "grptransportlbtrmoperation.html#transportlbtrmsourcetimestampcontext", null ],
        [ "transport_lbtrm_tgsz (source)", "grptransportlbtrmoperation.html#transportlbtrmtgszsource", null ]
      ] ]
    ] ],
    [ "Transport LBT-RU Network Options", "grptransportlbtrunetwork.html", [
      [ "LBT-RU Transport Session Management", "grptransportlbtrunetwork.html#lbtrutransportsessionmanagement", null ],
      [ "Reference", "grptransportlbtrunetwork.html#transportlbtrunetworkref", [
        [ "transport_lbtru_interface (receiver)", "grptransportlbtrunetwork.html#transportlbtruinterfacereceiver", null ],
        [ "transport_lbtru_interface (source)", "grptransportlbtrunetwork.html#transportlbtruinterfacesource", null ],
        [ "transport_lbtru_maximum_ports (context)", "grptransportlbtrunetwork.html#transportlbtrumaximumportscontext", null ],
        [ "transport_lbtru_port (source)", "grptransportlbtrunetwork.html#transportlbtruportsource", null ],
        [ "transport_lbtru_port_high (context)", "grptransportlbtrunetwork.html#transportlbtruporthighcontext", null ],
        [ "transport_lbtru_port_high (receiver)", "grptransportlbtrunetwork.html#transportlbtruporthighreceiver", null ],
        [ "transport_lbtru_port_low (context)", "grptransportlbtrunetwork.html#transportlbtruportlowcontext", null ],
        [ "transport_lbtru_port_low (receiver)", "grptransportlbtrunetwork.html#transportlbtruportlowreceiver", null ]
      ] ]
    ] ],
    [ "Transport LBT-RU Reliability Options", "grptransportlbtrureliability.html", [
      [ "Reference", "grptransportlbtrureliability.html#transportlbtrureliabilityref", [
        [ "transport_lbtru_ignore_interval (source)", "grptransportlbtrureliability.html#transportlbtruignoreintervalsource", null ],
        [ "transport_lbtru_nak_backoff_interval (receiver)", "grptransportlbtrureliability.html#transportlbtrunakbackoffintervalreceiver", null ],
        [ "transport_lbtru_nak_generation_interval (receiver)", "grptransportlbtrureliability.html#transportlbtrunakgenerationintervalreceiver", null ],
        [ "transport_lbtru_nak_initial_backoff_interval (receiver)", "grptransportlbtrureliability.html#transportlbtrunakinitialbackoffintervalreceiver", null ],
        [ "transport_lbtru_nak_suppress_interval (receiver)", "grptransportlbtrureliability.html#transportlbtrunaksuppressintervalreceiver", null ],
        [ "transport_lbtru_receiver_socket_buffer (context)", "grptransportlbtrureliability.html#transportlbtrureceiversocketbuffercontext", null ],
        [ "transport_lbtru_source_socket_buffer (context)", "grptransportlbtrureliability.html#transportlbtrusourcesocketbuffercontext", null ],
        [ "transport_lbtru_transmission_window_limit (source)", "grptransportlbtrureliability.html#transportlbtrutransmissionwindowlimitsource", null ],
        [ "transport_lbtru_transmission_window_size (source)", "grptransportlbtrureliability.html#transportlbtrutransmissionwindowsizesource", null ]
      ] ]
    ] ],
    [ "Transport LBT-RU Operation Options", "grptransportlbtruoperation.html", [
      [ "Reference", "grptransportlbtruoperation.html#transportlbtruoperationref", [
        [ "transport_lbtru_acknowledgement_interval (receiver)", "grptransportlbtruoperation.html#transportlbtruacknowledgementintervalreceiver", null ],
        [ "transport_lbtru_activity_timeout (receiver)", "grptransportlbtruoperation.html#transportlbtruactivitytimeoutreceiver", null ],
        [ "transport_lbtru_client_activity_timeout (source)", "grptransportlbtruoperation.html#transportlbtruclientactivitytimeoutsource", null ],
        [ "transport_lbtru_client_map_size (source)", "grptransportlbtruoperation.html#transportlbtruclientmapsizesource", null ],
        [ "transport_lbtru_coalesce_threshold (source)", "grptransportlbtruoperation.html#transportlbtrucoalescethresholdsource", null ],
        [ "transport_lbtru_connect_interval (receiver)", "grptransportlbtruoperation.html#transportlbtruconnectintervalreceiver", null ],
        [ "transport_lbtru_data_rate_limit (context)", "grptransportlbtruoperation.html#transportlbtrudataratelimitcontext", null ],
        [ "transport_lbtru_datagram_max_size (context)", "grptransportlbtruoperation.html#transportlbtrudatagrammaxsizecontext", null ],
        [ "transport_lbtru_maximum_connect_attempts (receiver)", "grptransportlbtruoperation.html#transportlbtrumaximumconnectattemptsreceiver", null ],
        [ "transport_lbtru_rate_interval (context)", "grptransportlbtruoperation.html#transportlbtrurateintervalcontext", null ],
        [ "transport_lbtru_recycle_receive_buffers (context)", "grptransportlbtruoperation.html#transportlbtrurecyclereceivebufferscontext", null ],
        [ "transport_lbtru_retransmit_rate_limit (context)", "grptransportlbtruoperation.html#transportlbtruretransmitratelimitcontext", null ],
        [ "transport_lbtru_sm_maximum_interval (source)", "grptransportlbtruoperation.html#transportlbtrusmmaximumintervalsource", null ],
        [ "transport_lbtru_sm_minimum_interval (source)", "grptransportlbtruoperation.html#transportlbtrusmminimumintervalsource", null ],
        [ "transport_lbtru_use_session_id (source)", "grptransportlbtruoperation.html#transportlbtruusesessionidsource", null ]
      ] ]
    ] ],
    [ "Transport LBT-IPC Operation Options", "grptransportlbtipcoperation.html", [
      [ "LBT-IPC Transport Session Management", "grptransportlbtipcoperation.html#lbtipctransportsessionmanagement", null ],
      [ "Reference", "grptransportlbtipcoperation.html#transportlbtipcoperationref", [
        [ "transport_lbtipc_activity_timeout (receiver)", "grptransportlbtipcoperation.html#transportlbtipcactivitytimeoutreceiver", null ],
        [ "transport_lbtipc_behavior (source)", "grptransportlbtipcoperation.html#transportlbtipcbehaviorsource", null ],
        [ "transport_lbtipc_datagram_max_size (context)", "grptransportlbtipcoperation.html#transportlbtipcdatagrammaxsizecontext", null ],
        [ "transport_lbtipc_dro_loss_recovery_timeout (receiver)", "grptransportlbtipcoperation.html#transportlbtipcdrolossrecoverytimeoutreceiver", null ],
        [ "transport_lbtipc_id (source)", "grptransportlbtipcoperation.html#transportlbtipcidsource", null ],
        [ "transport_lbtipc_id_high (context)", "grptransportlbtipcoperation.html#transportlbtipcidhighcontext", null ],
        [ "transport_lbtipc_id_low (context)", "grptransportlbtipcoperation.html#transportlbtipcidlowcontext", null ],
        [ "transport_lbtipc_maximum_receivers_per_transport (source)", "grptransportlbtipcoperation.html#transportlbtipcmaximumreceiverspertransportsource", null ],
        [ "transport_lbtipc_pend_behavior_linger_loop_count (context)", "grptransportlbtipcoperation.html#transportlbtipcpendbehaviorlingerloopcountcontext", null ],
        [ "transport_lbtipc_receiver_operational_mode (context)", "grptransportlbtipcoperation.html#transportlbtipcreceiveroperationalmodecontext", null ],
        [ "transport_lbtipc_receiver_thread_behavior (context)", "grptransportlbtipcoperation.html#transportlbtipcreceiverthreadbehaviorcontext", null ],
        [ "transport_lbtipc_recycle_receive_buffers (context)", "grptransportlbtipcoperation.html#transportlbtipcrecyclereceivebufferscontext", null ],
        [ "transport_lbtipc_sm_interval (source)", "grptransportlbtipcoperation.html#transportlbtipcsmintervalsource", null ],
        [ "transport_lbtipc_transmission_window_size (source)", "grptransportlbtipcoperation.html#transportlbtipctransmissionwindowsizesource", null ]
      ] ]
    ] ],
    [ "Transport LBT-SMX Operation Options", "grptransportlbtsmxoperation.html", [
      [ "LBT-SMX Transport Session Management", "grptransportlbtsmxoperation.html#lbtsmxtransportsessionmanagement", null ],
      [ "Reference", "grptransportlbtsmxoperation.html#transportlbtsmxoperationref", [
        [ "transport_lbtsmx_activity_timeout (receiver)", "grptransportlbtsmxoperation.html#transportlbtsmxactivitytimeoutreceiver", null ],
        [ "transport_lbtsmx_datagram_max_size (source)", "grptransportlbtsmxoperation.html#transportlbtsmxdatagrammaxsizesource", null ],
        [ "transport_lbtsmx_id (source)", "grptransportlbtsmxoperation.html#transportlbtsmxidsource", null ],
        [ "transport_lbtsmx_id_high (context)", "grptransportlbtsmxoperation.html#transportlbtsmxidhighcontext", null ],
        [ "transport_lbtsmx_id_low (context)", "grptransportlbtsmxoperation.html#transportlbtsmxidlowcontext", null ],
        [ "transport_lbtsmx_maximum_receivers_per_transport (source)", "grptransportlbtsmxoperation.html#transportlbtsmxmaximumreceiverspertransportsource", null ],
        [ "transport_lbtsmx_message_statistics_enabled (context)", "grptransportlbtsmxoperation.html#transportlbtsmxmessagestatisticsenabledcontext", null ],
        [ "transport_lbtsmx_sm_interval (source)", "grptransportlbtsmxoperation.html#transportlbtsmxsmintervalsource", null ],
        [ "transport_lbtsmx_transmission_window_size (source)", "grptransportlbtsmxoperation.html#transportlbtsmxtransmissionwindowsizesource", null ]
      ] ]
    ] ],
    [ "Transport Acceleration Options", "grptransportacceleration.html", [
      [ "Myricom® Datagram Bypass Layer (DBL™)", "grptransportacceleration.html#myricomdatagrambypasslayerdbl", null ],
      [ "Reference", "grptransportacceleration.html#transportaccelerationmyricomref", [
        [ "dbl_lbtrm_acceleration (context)", "grptransportacceleration.html#dbllbtrmaccelerationcontext", null ],
        [ "dbl_lbtru_acceleration (context)", "grptransportacceleration.html#dbllbtruaccelerationcontext", null ],
        [ "dbl_mim_acceleration (context)", "grptransportacceleration.html#dblmimaccelerationcontext", null ],
        [ "dbl_resolver_acceleration (context)", "grptransportacceleration.html#dblresolveraccelerationcontext", null ]
      ] ],
      [ "Solarflare® Onload", "grptransportacceleration.html#solarflareonload", null ],
      [ "Reference", "grptransportacceleration.html#transportaccelerationsolarflareref", [
        [ "onload_acceleration_stack_name (receiver)", "grptransportacceleration.html#onloadaccelerationstacknamereceiver", null ],
        [ "onload_acceleration_stack_name (source)", "grptransportacceleration.html#onloadaccelerationstacknamesource", null ]
      ] ],
      [ "UD Acceleration for Mellanox® Hardware Interfaces", "grptransportacceleration.html#mellanoxudacceleration", null ],
      [ "Reference", "grptransportacceleration.html#transportaccelerationmellanoxref", [
        [ "resolver_ud_acceleration (context)", "grptransportacceleration.html#resolverudaccelerationcontext", null ],
        [ "ud_acceleration (context)", "grptransportacceleration.html#udaccelerationcontext", null ]
      ] ]
    ] ],
    [ "Smart Source Options", "grpsmartsource.html", [
      [ "Reference", "grpsmartsource.html#smartsourceref", [
        [ "mem_mgt_callbacks (source)", "grpsmartsource.html#memmgtcallbackssource", null ],
        [ "smart_src_enable_spectrum_channel (source)", "grpsmartsource.html#smartsrcenablespectrumchannelsource", null ],
        [ "smart_src_max_message_length (source)", "grpsmartsource.html#smartsrcmaxmessagelengthsource", null ],
        [ "smart_src_message_property_int_count (source)", "grpsmartsource.html#smartsrcmessagepropertyintcountsource", null ],
        [ "smart_src_retention_buffer_count (source)", "grpsmartsource.html#smartsrcretentionbuffercountsource", null ],
        [ "smart_src_user_buffer_count (source)", "grpsmartsource.html#smartsrcuserbuffercountsource", null ],
        [ "transport_lbtrm_smart_src_transmission_window_buffer_count (source)", "grpsmartsource.html#transportlbtrmsmartsrctransmissionwindowbuffercountsource", null ],
        [ "transport_lbtru_smart_src_transmission_window_buffer_count (source)", "grpsmartsource.html#transportlbtrusmartsrctransmissionwindowbuffercountsource", null ]
      ] ]
    ] ],
    [ "Encrypted TCP Options", "grpencryptedtcp.html", [
      [ "Reference", "grpencryptedtcp.html#encryptedtcpref", [
        [ "tls_certificate (context)", "grpencryptedtcp.html#tlscertificatecontext", null ],
        [ "tls_certificate_key (context)", "grpencryptedtcp.html#tlscertificatekeycontext", null ],
        [ "tls_certificate_key_password (context)", "grpencryptedtcp.html#tlscertificatekeypasswordcontext", null ],
        [ "tls_cipher_suites (context)", "grpencryptedtcp.html#tlsciphersuitescontext", null ],
        [ "tls_compression_negotiation_timeout (context)", "grpencryptedtcp.html#tlscompressionnegotiationtimeoutcontext", null ],
        [ "tls_trusted_certificates (context)", "grpencryptedtcp.html#tlstrustedcertificatescontext", null ],
        [ "use_tls (context)", "grpencryptedtcp.html#usetlscontext", null ]
      ] ]
    ] ],
    [ "Compressed TCP Options", "grpcompressedtcp.html", [
      [ "Reference", "grpcompressedtcp.html#compressedtcpref", [
        [ "compression (context)", "grpcompressedtcp.html#compressioncontext", null ]
      ] ]
    ] ],
    [ "Multicast Immediate Messaging Network Options", "grpmulticastimmediatemessagingnetwork.html", [
      [ "Reference", "grpmulticastimmediatemessagingnetwork.html#multicastimmediatemessagingnetworkref", [
        [ "mim_address (context)", "grpmulticastimmediatemessagingnetwork.html#mimaddresscontext", null ],
        [ "mim_destination_port (context)", "grpmulticastimmediatemessagingnetwork.html#mimdestinationportcontext", null ],
        [ "mim_incoming_address (context)", "grpmulticastimmediatemessagingnetwork.html#mimincomingaddresscontext", null ],
        [ "mim_incoming_destination_port (context)", "grpmulticastimmediatemessagingnetwork.html#mimincomingdestinationportcontext", null ],
        [ "mim_outgoing_address (context)", "grpmulticastimmediatemessagingnetwork.html#mimoutgoingaddresscontext", null ],
        [ "mim_outgoing_destination_port (context)", "grpmulticastimmediatemessagingnetwork.html#mimoutgoingdestinationportcontext", null ]
      ] ]
    ] ],
    [ "Multicast Immediate Messaging Reliability Options", "grpmulticastimmediatemessagingreliability.html", [
      [ "Reference", "grpmulticastimmediatemessagingreliability.html#multicastimmediatemessagingreliabilityref", [
        [ "mim_ignore_interval (context)", "grpmulticastimmediatemessagingreliability.html#mimignoreintervalcontext", null ],
        [ "mim_nak_backoff_interval (context)", "grpmulticastimmediatemessagingreliability.html#mimnakbackoffintervalcontext", null ],
        [ "mim_nak_generation_interval (context)", "grpmulticastimmediatemessagingreliability.html#mimnakgenerationintervalcontext", null ],
        [ "mim_nak_initial_backoff_interval (context)", "grpmulticastimmediatemessagingreliability.html#mimnakinitialbackoffintervalcontext", null ],
        [ "mim_nak_suppress_interval (context)", "grpmulticastimmediatemessagingreliability.html#mimnaksuppressintervalcontext", null ],
        [ "mim_send_naks (context)", "grpmulticastimmediatemessagingreliability.html#mimsendnakscontext", null ],
        [ "mim_transmission_window_limit (context)", "grpmulticastimmediatemessagingreliability.html#mimtransmissionwindowlimitcontext", null ],
        [ "mim_transmission_window_size (context)", "grpmulticastimmediatemessagingreliability.html#mimtransmissionwindowsizecontext", null ]
      ] ]
    ] ],
    [ "Multicast Immediate Messaging Operation Options", "grpmulticastimmediatemessagingoperation.html", [
      [ "Reference", "grpmulticastimmediatemessagingoperation.html#multicastimmediatemessagingoperationref", [
        [ "immediate_message_receiver_function (context)", "grpmulticastimmediatemessagingoperation.html#immediatemessagereceiverfunctioncontext", null ],
        [ "immediate_message_topic_receiver_function (context)", "grpmulticastimmediatemessagingoperation.html#immediatemessagetopicreceiverfunctioncontext", null ],
        [ "mim_activity_timeout (context)", "grpmulticastimmediatemessagingoperation.html#mimactivitytimeoutcontext", null ],
        [ "mim_delivery_control_activity_check_interval (context)", "grpmulticastimmediatemessagingoperation.html#mimdeliverycontrolactivitycheckintervalcontext", null ],
        [ "mim_delivery_control_activity_timeout (context)", "grpmulticastimmediatemessagingoperation.html#mimdeliverycontrolactivitytimeoutcontext", null ],
        [ "mim_delivery_control_order_tablesz (context)", "grpmulticastimmediatemessagingoperation.html#mimdeliverycontrolordertableszcontext", null ],
        [ "mim_implicit_batching_interval (context)", "grpmulticastimmediatemessagingoperation.html#mimimplicitbatchingintervalcontext", null ],
        [ "mim_implicit_batching_minimum_length (context)", "grpmulticastimmediatemessagingoperation.html#mimimplicitbatchingminimumlengthcontext", null ],
        [ "mim_ordered_delivery (context)", "grpmulticastimmediatemessagingoperation.html#mimordereddeliverycontext", null ],
        [ "mim_sm_maximum_interval (context)", "grpmulticastimmediatemessagingoperation.html#mimsmmaximumintervalcontext", null ],
        [ "mim_sm_minimum_interval (context)", "grpmulticastimmediatemessagingoperation.html#mimsmminimumintervalcontext", null ],
        [ "mim_sqn_window_increment (context)", "grpmulticastimmediatemessagingoperation.html#mimsqnwindowincrementcontext", null ],
        [ "mim_sqn_window_size (context)", "grpmulticastimmediatemessagingoperation.html#mimsqnwindowsizecontext", null ],
        [ "mim_src_deletion_timeout (context)", "grpmulticastimmediatemessagingoperation.html#mimsrcdeletiontimeoutcontext", null ],
        [ "mim_tgsz (context)", "grpmulticastimmediatemessagingoperation.html#mimtgszcontext", null ],
        [ "mim_unrecoverable_loss_function (context)", "grpmulticastimmediatemessagingoperation.html#mimunrecoverablelossfunctioncontext", null ]
      ] ]
    ] ],
    [ "Late Join Options", "grplatejoin.html", [
      [ "Estimating Recovery Time", "grplatejoin.html#estimatingrecoverytime", null ],
      [ "Reference", "grplatejoin.html#latejoinref", [
        [ "late_join (source)", "grplatejoin.html#latejoinsource", null ],
        [ "late_join_info_request_interval (receiver)", "grplatejoin.html#latejoininforequestintervalreceiver", null ],
        [ "late_join_info_request_maximum (receiver)", "grplatejoin.html#latejoininforequestmaximumreceiver", null ],
        [ "retransmit_initial_sequence_number_request (receiver)", "grplatejoin.html#retransmitinitialsequencenumberrequestreceiver", null ],
        [ "retransmit_message_caching_proximity (receiver)", "grplatejoin.html#retransmitmessagecachingproximityreceiver", null ],
        [ "retransmit_request_interval (receiver)", "grplatejoin.html#retransmitrequestintervalreceiver", null ],
        [ "retransmit_request_maximum (receiver)", "grplatejoin.html#retransmitrequestmaximumreceiver", null ],
        [ "retransmit_request_message_timeout (receiver)", "grplatejoin.html#retransmitrequestmessagetimeoutreceiver", null ],
        [ "retransmit_request_outstanding_maximum (receiver)", "grplatejoin.html#retransmitrequestoutstandingmaximumreceiver", null ],
        [ "retransmit_retention_size_limit (source)", "grplatejoin.html#retransmitretentionsizelimitsource", null ],
        [ "retransmit_retention_size_threshold (source)", "grplatejoin.html#retransmitretentionsizethresholdsource", null ],
        [ "use_late_join (receiver)", "grplatejoin.html#uselatejoinreceiver", null ]
      ] ]
    ] ],
    [ "Off-Transport Recovery Options", "grpofftransportrecovery.html", [
      [ "Reference", "grpofftransportrecovery.html#offtransportrecoveryref", [
        [ "otr_message_caching_threshold (receiver)", "grpofftransportrecovery.html#otrmessagecachingthresholdreceiver", null ],
        [ "otr_request_initial_delay (receiver)", "grpofftransportrecovery.html#otrrequestinitialdelayreceiver", null ],
        [ "otr_request_log_alert_cooldown (receiver)", "grpofftransportrecovery.html#otrrequestlogalertcooldownreceiver", null ],
        [ "otr_request_maximum_interval (receiver)", "grpofftransportrecovery.html#otrrequestmaximumintervalreceiver", null ],
        [ "otr_request_message_timeout (receiver)", "grpofftransportrecovery.html#otrrequestmessagetimeoutreceiver", null ],
        [ "otr_request_minimum_interval (receiver)", "grpofftransportrecovery.html#otrrequestminimumintervalreceiver", null ],
        [ "otr_request_outstanding_maximum (receiver)", "grpofftransportrecovery.html#otrrequestoutstandingmaximumreceiver", null ],
        [ "use_otr (receiver)", "grpofftransportrecovery.html#useotrreceiver", null ]
      ] ]
    ] ],
    [ "Unicast Immediate Messaging Network Options", "grpunicastimmediatemessagingnetwork.html", [
      [ "Reference", "grpunicastimmediatemessagingnetwork.html#requestnetworkref", [
        [ "request_tcp_bind_request_port (context)", "grpunicastimmediatemessagingnetwork.html#requesttcpbindrequestportcontext", null ],
        [ "request_tcp_interface (context)", "grpunicastimmediatemessagingnetwork.html#requesttcpinterfacecontext", null ],
        [ "request_tcp_port (context)", "grpunicastimmediatemessagingnetwork.html#requesttcpportcontext", null ],
        [ "request_tcp_port_high (context)", "grpunicastimmediatemessagingnetwork.html#requesttcpporthighcontext", null ],
        [ "request_tcp_port_low (context)", "grpunicastimmediatemessagingnetwork.html#requesttcpportlowcontext", null ]
      ] ]
    ] ],
    [ "Unicast Immediate Messaging Operation Options", "grpunicastimmediatemessagingoperation.html", [
      [ "Reference", "grpunicastimmediatemessagingoperation.html#requestoperationref", [
        [ "request_tcp_exclusiveaddr (context)", "grpunicastimmediatemessagingoperation.html#requesttcpexclusiveaddrcontext", null ],
        [ "request_tcp_listen_backlog (context)", "grpunicastimmediatemessagingoperation.html#requesttcplistenbacklogcontext", null ],
        [ "request_tcp_reuseaddr (context)", "grpunicastimmediatemessagingoperation.html#requesttcpreuseaddrcontext", null ],
        [ "response_session_maximum_buffer (context)", "grpunicastimmediatemessagingoperation.html#responsesessionmaximumbuffercontext", null ],
        [ "response_session_sender_socket_buffer (context)", "grpunicastimmediatemessagingoperation.html#responsesessionsendersocketbuffercontext", null ],
        [ "response_tcp_deletion_timeout (context)", "grpunicastimmediatemessagingoperation.html#responsetcpdeletiontimeoutcontext", null ],
        [ "response_tcp_interface (context)", "grpunicastimmediatemessagingoperation.html#responsetcpinterfacecontext", null ],
        [ "response_tcp_nodelay (context)", "grpunicastimmediatemessagingoperation.html#responsetcpnodelaycontext", null ]
      ] ]
    ] ],
    [ "Implicit Batching Options", "grpimplicitbatching.html", [
      [ "Reference", "grpimplicitbatching.html#implicitbatchingref", [
        [ "implicit_batching_interval (source)", "grpimplicitbatching.html#implicitbatchingintervalsource", null ],
        [ "implicit_batching_minimum_length (source)", "grpimplicitbatching.html#implicitbatchingminimumlengthsource", null ]
      ] ]
    ] ],
    [ "Delivery Control Options", "grpdeliverycontrol.html", [
      [ "Burst Loss", "grpdeliverycontrol.html#burstloss", null ],
      [ "Reference", "grpdeliverycontrol.html#deliverycontrolref", [
        [ "channel_map_tablesz (receiver)", "grpdeliverycontrol.html#channelmaptableszreceiver", null ],
        [ "delivery_control_loss_check_interval (receiver)", "grpdeliverycontrol.html#deliverycontrollosscheckintervalreceiver", null ],
        [ "delivery_control_maximum_burst_loss (receiver)", "grpdeliverycontrol.html#deliverycontrolmaximumburstlossreceiver", null ],
        [ "delivery_control_maximum_total_map_entries (context)", "grpdeliverycontrol.html#deliverycontrolmaximumtotalmapentriescontext", null ],
        [ "delivery_control_message_batching (context)", "grpdeliverycontrol.html#deliverycontrolmessagebatchingcontext", null ],
        [ "mim_delivery_control_loss_check_interval (context)", "grpdeliverycontrol.html#mimdeliverycontrollosscheckintervalcontext", null ],
        [ "null_channel_behavior (receiver)", "grpdeliverycontrol.html#nullchannelbehaviorreceiver", null ],
        [ "source_notification_function (receiver)", "grpdeliverycontrol.html#sourcenotificationfunctionreceiver", null ],
        [ "unrecognized_channel_behavior (receiver)", "grpdeliverycontrol.html#unrecognizedchannelbehaviorreceiver", null ]
      ] ]
    ] ],
    [ "Wildcard Receiver Options", "grpwildcardreceiver.html", [
      [ "Reference", "grpwildcardreceiver.html#wildcardreceiverref", [
        [ "pattern_type (wildcard_receiver)", "grpwildcardreceiver.html#patterntypewildcardreceiver", null ],
        [ "receiver_create_callback (wildcard_receiver)", "grpwildcardreceiver.html#receivercreatecallbackwildcardreceiver", null ],
        [ "receiver_delete_callback (wildcard_receiver)", "grpwildcardreceiver.html#receiverdeletecallbackwildcardreceiver", null ],
        [ "resolver_no_source_linger_timeout (wildcard_receiver)", "grpwildcardreceiver.html#resolvernosourcelingertimeoutwildcardreceiver", null ],
        [ "resolver_query_maximum_interval (wildcard_receiver)", "grpwildcardreceiver.html#resolverquerymaximumintervalwildcardreceiver", null ],
        [ "resolver_query_minimum_duration (wildcard_receiver)", "grpwildcardreceiver.html#resolverqueryminimumdurationwildcardreceiver", null ],
        [ "resolver_query_minimum_interval (wildcard_receiver)", "grpwildcardreceiver.html#resolverqueryminimumintervalwildcardreceiver", null ],
        [ "resolver_wildcard_queries_per_second (context)", "grpwildcardreceiver.html#resolverwildcardqueriespersecondcontext", null ],
        [ "resolver_wildcard_query_bps (context)", "grpwildcardreceiver.html#resolverwildcardquerybpscontext", null ],
        [ "resolver_wildcard_receiver_map_tablesz (context)", "grpwildcardreceiver.html#resolverwildcardreceivermaptableszcontext", null ]
      ] ]
    ] ],
    [ "Event Queue Options", "grpeventqueue.html", [
      [ "Reference", "grpeventqueue.html#eventqueueref", [
        [ "event_queue_name (event_queue)", "grpeventqueue.html#eventqueuenameeventqueue", null ],
        [ "queue_age_enabled (event_queue)", "grpeventqueue.html#queueageenabledeventqueue", null ],
        [ "queue_cancellation_callbacks_enabled (event_queue)", "grpeventqueue.html#queuecancellationcallbacksenabledeventqueue", null ],
        [ "queue_count_enabled (event_queue)", "grpeventqueue.html#queuecountenabledeventqueue", null ],
        [ "queue_delay_warning (event_queue)", "grpeventqueue.html#queuedelaywarningeventqueue", null ],
        [ "queue_enqueue_notification (event_queue)", "grpeventqueue.html#queueenqueuenotificationeventqueue", null ],
        [ "queue_objects_purged_on_close (event_queue)", "grpeventqueue.html#queueobjectspurgedoncloseeventqueue", null ],
        [ "queue_service_time_enabled (event_queue)", "grpeventqueue.html#queueservicetimeenabledeventqueue", null ],
        [ "queue_size_warning (event_queue)", "grpeventqueue.html#queuesizewarningeventqueue", null ]
      ] ]
    ] ],
    [ "Ultra Messaging Persistence Options", "grpultramessagingpersistence.html", [
      [ "Reference", "grpultramessagingpersistence.html#ultramessagingpersistenceref", [
        [ "ume_ack_batching_interval (context)", "grpultramessagingpersistence.html#umeackbatchingintervalcontext", null ],
        [ "ume_activity_timeout (receiver)", "grpultramessagingpersistence.html#umeactivitytimeoutreceiver", null ],
        [ "ume_activity_timeout (source)", "grpultramessagingpersistence.html#umeactivitytimeoutsource", null ],
        [ "ume_allow_confirmed_delivery (receiver)", "grpultramessagingpersistence.html#umeallowconfirmeddeliveryreceiver", null ],
        [ "ume_application_outstanding_maximum (receiver)", "grpultramessagingpersistence.html#umeapplicationoutstandingmaximumreceiver", null ],
        [ "ume_confirmed_delivery_notification (source)", "grpultramessagingpersistence.html#umeconfirmeddeliverynotificationsource", null ],
        [ "ume_consensus_sequence_number_behavior (receiver)", "grpultramessagingpersistence.html#umeconsensussequencenumberbehaviorreceiver", null ],
        [ "ume_consensus_sequence_number_behavior (source)", "grpultramessagingpersistence.html#umeconsensussequencenumberbehaviorsource", null ],
        [ "ume_explicit_ack_only (receiver)", "grpultramessagingpersistence.html#umeexplicitackonlyreceiver", null ],
        [ "ume_flight_size (source)", "grpultramessagingpersistence.html#umeflightsizesource", null ],
        [ "ume_flight_size_behavior (source)", "grpultramessagingpersistence.html#umeflightsizebehaviorsource", null ],
        [ "ume_flight_size_bytes (source)", "grpultramessagingpersistence.html#umeflightsizebytessource", null ],
        [ "ume_force_reclaim_function (source)", "grpultramessagingpersistence.html#umeforcereclaimfunctionsource", null ],
        [ "ume_late_join (source)", "grpultramessagingpersistence.html#umelatejoinsource", null ],
        [ "ume_message_stability_lifetime (source)", "grpultramessagingpersistence.html#umemessagestabilitylifetimesource", null ],
        [ "ume_message_stability_notification (source)", "grpultramessagingpersistence.html#umemessagestabilitynotificationsource", null ],
        [ "ume_message_stability_timeout (source)", "grpultramessagingpersistence.html#umemessagestabilitytimeoutsource", null ],
        [ "ume_proactive_keepalive_interval (context)", "grpultramessagingpersistence.html#umeproactivekeepaliveintervalcontext", null ],
        [ "ume_proxy_source (source)", "grpultramessagingpersistence.html#umeproxysourcesource", null ],
        [ "ume_receiver_liveness_interval (context)", "grpultramessagingpersistence.html#umereceiverlivenessintervalcontext", null ],
        [ "ume_receiver_paced_persistence (receiver)", "grpultramessagingpersistence.html#umereceiverpacedpersistencereceiver", null ],
        [ "ume_receiver_paced_persistence (source)", "grpultramessagingpersistence.html#umereceiverpacedpersistencesource", null ],
        [ "ume_recovery_sequence_number_info_function (receiver)", "grpultramessagingpersistence.html#umerecoverysequencenumberinfofunctionreceiver", null ],
        [ "ume_registration_extended_function (receiver)", "grpultramessagingpersistence.html#umeregistrationextendedfunctionreceiver", null ],
        [ "ume_registration_function (receiver)", "grpultramessagingpersistence.html#umeregistrationfunctionreceiver", null ],
        [ "ume_registration_interval (receiver)", "grpultramessagingpersistence.html#umeregistrationintervalreceiver", null ],
        [ "ume_registration_interval (source)", "grpultramessagingpersistence.html#umeregistrationintervalsource", null ],
        [ "ume_repository_ack_on_reception (source)", "grpultramessagingpersistence.html#umerepositoryackonreceptionsource", null ],
        [ "ume_repository_disk_file_size_limit (source)", "grpultramessagingpersistence.html#umerepositorydiskfilesizelimitsource", null ],
        [ "ume_repository_size_limit (source)", "grpultramessagingpersistence.html#umerepositorysizelimitsource", null ],
        [ "ume_repository_size_threshold (source)", "grpultramessagingpersistence.html#umerepositorysizethresholdsource", null ],
        [ "ume_retention_intergroup_stability_behavior (source)", "grpultramessagingpersistence.html#umeretentionintergroupstabilitybehaviorsource", null ],
        [ "ume_retention_intragroup_stability_behavior (source)", "grpultramessagingpersistence.html#umeretentionintragroupstabilitybehaviorsource", null ],
        [ "ume_retention_size_limit (source)", "grpultramessagingpersistence.html#umeretentionsizelimitsource", null ],
        [ "ume_retention_size_threshold (source)", "grpultramessagingpersistence.html#umeretentionsizethresholdsource", null ],
        [ "ume_retention_unique_confirmations (source)", "grpultramessagingpersistence.html#umeretentionuniqueconfirmationssource", null ],
        [ "ume_session_id (context)", "grpultramessagingpersistence.html#umesessionidcontext", null ],
        [ "ume_session_id (receiver)", "grpultramessagingpersistence.html#umesessionidreceiver", null ],
        [ "ume_session_id (source)", "grpultramessagingpersistence.html#umesessionidsource", null ],
        [ "ume_source_liveness_timeout (context)", "grpultramessagingpersistence.html#umesourcelivenesstimeoutcontext", null ],
        [ "ume_sri_flush_sri_request_response (source)", "grpultramessagingpersistence.html#umesriflushsrirequestresponsesource", null ],
        [ "ume_sri_immediate_sri_request_response (source)", "grpultramessagingpersistence.html#umesriimmediatesrirequestresponsesource", null ],
        [ "ume_sri_inter_sri_interval (source)", "grpultramessagingpersistence.html#umesriintersriintervalsource", null ],
        [ "ume_sri_max_number_of_sri_per_update (source)", "grpultramessagingpersistence.html#umesrimaxnumberofsriperupdatesource", null ],
        [ "ume_sri_request_interval (receiver)", "grpultramessagingpersistence.html#umesrirequestintervalreceiver", null ],
        [ "ume_sri_request_maximum (receiver)", "grpultramessagingpersistence.html#umesrirequestmaximumreceiver", null ],
        [ "ume_sri_request_response_latency (source)", "grpultramessagingpersistence.html#umesrirequestresponselatencysource", null ],
        [ "ume_state_lifetime (receiver)", "grpultramessagingpersistence.html#umestatelifetimereceiver", null ],
        [ "ume_state_lifetime (source)", "grpultramessagingpersistence.html#umestatelifetimesource", null ],
        [ "ume_store (source)", "grpultramessagingpersistence.html#umestoresource", null ],
        [ "ume_store_activity_timeout (source)", "grpultramessagingpersistence.html#umestoreactivitytimeoutsource", null ],
        [ "ume_store_behavior (source)", "grpultramessagingpersistence.html#umestorebehaviorsource", null ],
        [ "ume_store_check_interval (source)", "grpultramessagingpersistence.html#umestorecheckintervalsource", null ],
        [ "ume_store_group (source)", "grpultramessagingpersistence.html#umestoregroupsource", null ],
        [ "ume_store_name (source)", "grpultramessagingpersistence.html#umestorenamesource", null ],
        [ "ume_use_ack_batching (receiver)", "grpultramessagingpersistence.html#umeuseackbatchingreceiver", null ],
        [ "ume_use_late_join (receiver)", "grpultramessagingpersistence.html#umeuselatejoinreceiver", null ],
        [ "ume_use_store (receiver)", "grpultramessagingpersistence.html#umeusestorereceiver", null ],
        [ "ume_user_receiver_registration_id (context)", "grpultramessagingpersistence.html#umeuserreceiverregistrationidcontext", null ],
        [ "ume_write_delay (source)", "grpultramessagingpersistence.html#umewritedelaysource", null ]
      ] ]
    ] ],
    [ "Ultra Messaging Queuing Options", "grpultramessagingqueuing.html", [
      [ "Reference", "grpultramessagingqueuing.html#ultramessagingqueuingref", [
        [ "umq_command_interval (context)", "grpultramessagingqueuing.html#umqcommandintervalcontext", null ],
        [ "umq_command_outstanding_maximum (context)", "grpultramessagingqueuing.html#umqcommandoutstandingmaximumcontext", null ],
        [ "umq_delayed_consumption_report_interval (receiver)", "grpultramessagingqueuing.html#umqdelayedconsumptionreportintervalreceiver", null ],
        [ "umq_hold_interval (receiver)", "grpultramessagingqueuing.html#umqholdintervalreceiver", null ],
        [ "umq_index_assignment_eligibility_default (receiver)", "grpultramessagingqueuing.html#umqindexassignmenteligibilitydefaultreceiver", null ],
        [ "umq_message_stability_notification (source)", "grpultramessagingqueuing.html#umqmessagestabilitynotificationsource", null ],
        [ "umq_msg_total_lifetime (source)", "grpultramessagingqueuing.html#umqmsgtotallifetimesource", null ],
        [ "umq_queue_activity_timeout (context)", "grpultramessagingqueuing.html#umqqueueactivitytimeoutcontext", null ],
        [ "umq_queue_participation (receiver)", "grpultramessagingqueuing.html#umqqueueparticipationreceiver", null ],
        [ "umq_queue_registration_id (context)", "grpultramessagingqueuing.html#umqqueueregistrationidcontext", null ],
        [ "umq_receiver_type_id (receiver)", "grpultramessagingqueuing.html#umqreceivertypeidreceiver", null ],
        [ "umq_retransmit_request_interval (receiver)", "grpultramessagingqueuing.html#umqretransmitrequestintervalreceiver", null ],
        [ "umq_retransmit_request_outstanding_maximum (receiver)", "grpultramessagingqueuing.html#umqretransmitrequestoutstandingmaximumreceiver", null ],
        [ "umq_session_id (context)", "grpultramessagingqueuing.html#umqsessionidcontext", null ],
        [ "umq_ulb_application_set (source)", "grpultramessagingqueuing.html#umqulbapplicationsetsource", null ],
        [ "umq_ulb_application_set_assignment_function (source)", "grpultramessagingqueuing.html#umqulbapplicationsetassignmentfunctionsource", null ],
        [ "umq_ulb_application_set_events (source)", "grpultramessagingqueuing.html#umqulbapplicationseteventssource", null ],
        [ "umq_ulb_application_set_load_factor_behavior (source)", "grpultramessagingqueuing.html#umqulbapplicationsetloadfactorbehaviorsource", null ],
        [ "umq_ulb_application_set_message_lifetime (source)", "grpultramessagingqueuing.html#umqulbapplicationsetmessagelifetimesource", null ],
        [ "umq_ulb_application_set_message_max_reassignments (source)", "grpultramessagingqueuing.html#umqulbapplicationsetmessagemaxreassignmentssource", null ],
        [ "umq_ulb_application_set_message_reassignment_timeout (source)", "grpultramessagingqueuing.html#umqulbapplicationsetmessagereassignmenttimeoutsource", null ],
        [ "umq_ulb_application_set_receiver_activity_timeout (source)", "grpultramessagingqueuing.html#umqulbapplicationsetreceiveractivitytimeoutsource", null ],
        [ "umq_ulb_application_set_receiver_keepalive_interval (source)", "grpultramessagingqueuing.html#umqulbapplicationsetreceiverkeepaliveintervalsource", null ],
        [ "umq_ulb_application_set_round_robin_bias (source)", "grpultramessagingqueuing.html#umqulbapplicationsetroundrobinbiassource", null ],
        [ "umq_ulb_check_interval (source)", "grpultramessagingqueuing.html#umqulbcheckintervalsource", null ],
        [ "umq_ulb_events (source)", "grpultramessagingqueuing.html#umqulbeventssource", null ],
        [ "umq_ulb_flight_size (source)", "grpultramessagingqueuing.html#umqulbflightsizesource", null ],
        [ "umq_ulb_flight_size_behavior (source)", "grpultramessagingqueuing.html#umqulbflightsizebehaviorsource", null ],
        [ "umq_ulb_receiver_events (source)", "grpultramessagingqueuing.html#umqulbreceivereventssource", null ],
        [ "umq_ulb_receiver_portion (source)", "grpultramessagingqueuing.html#umqulbreceiverportionsource", null ],
        [ "umq_ulb_receiver_priority (source)", "grpultramessagingqueuing.html#umqulbreceiverprioritysource", null ],
        [ "umq_ulb_source_activity_timeout (receiver)", "grpultramessagingqueuing.html#umqulbsourceactivitytimeoutreceiver", null ],
        [ "umq_ulb_source_check_interval (receiver)", "grpultramessagingqueuing.html#umqulbsourcecheckintervalreceiver", null ]
      ] ]
    ] ],
    [ "Hot Failover Operation Options", "grphotfailoveroperation.html", [
      [ "Reference", "grphotfailoveroperation.html#hotfailoveroperationref", [
        [ "delivery_control_loss_check_interval (hfx)", "grphotfailoveroperation.html#deliverycontrollosscheckintervalhfx", null ],
        [ "delivery_control_max_delay (hfx)", "grphotfailoveroperation.html#deliverycontrolmaxdelayhfx", null ],
        [ "delivery_control_maximum_burst_loss (hfx)", "grphotfailoveroperation.html#deliverycontrolmaximumburstlosshfx", null ],
        [ "delivery_control_maximum_total_map_entries (hfx)", "grphotfailoveroperation.html#deliverycontrolmaximumtotalmapentrieshfx", null ],
        [ "duplicate_delivery (hfx)", "grphotfailoveroperation.html#duplicatedeliveryhfx", null ],
        [ "hf_duplicate_delivery (receiver)", "grphotfailoveroperation.html#hfduplicatedeliveryreceiver", null ],
        [ "hf_optional_messages (receiver)", "grphotfailoveroperation.html#hfoptionalmessagesreceiver", null ],
        [ "hf_receiver (wildcard_receiver)", "grphotfailoveroperation.html#hfreceiverwildcardreceiver", null ],
        [ "ordered_delivery (hfx)", "grphotfailoveroperation.html#ordereddeliveryhfx", null ]
      ] ]
    ] ],
    [ "Automatic Monitoring Options", "grpautomaticmonitoring.html", [
      [ "Reference", "grpautomaticmonitoring.html#automaticmonitoringref", [
        [ "monitor_appid (context)", "grpautomaticmonitoring.html#monitorappidcontext", null ],
        [ "monitor_appid (event_queue)", "grpautomaticmonitoring.html#monitorappideventqueue", null ],
        [ "monitor_interval (context)", "grpautomaticmonitoring.html#monitorintervalcontext", null ],
        [ "monitor_interval (event_queue)", "grpautomaticmonitoring.html#monitorintervaleventqueue", null ],
        [ "monitor_interval (receiver)", "grpautomaticmonitoring.html#monitorintervalreceiver", null ],
        [ "monitor_interval (wildcard_receiver)", "grpautomaticmonitoring.html#monitorintervalwildcardreceiver", null ],
        [ "monitor_transport (context)", "grpautomaticmonitoring.html#monitortransportcontext", null ],
        [ "monitor_transport (event_queue)", "grpautomaticmonitoring.html#monitortransporteventqueue", null ],
        [ "monitor_transport_opts (context)", "grpautomaticmonitoring.html#monitortransportoptscontext", null ],
        [ "monitor_transport_opts (event_queue)", "grpautomaticmonitoring.html#monitortransportoptseventqueue", null ]
      ] ]
    ] ],
    [ "Deprecated Options", "grpdeprecated.html", [
      [ "Reference", "grpdeprecated.html#deprecatedref", [
        [ "delivery_control_loss_tablesz (receiver)", "grpdeprecated.html#deliverycontrollosstableszreceiver", null ],
        [ "delivery_control_order_tablesz (receiver)", "grpdeprecated.html#deliverycontrolordertableszreceiver", null ],
        [ "implicit_batching_type (source)", "grpdeprecated.html#implicitbatchingtypesource", null ],
        [ "network_compatibility_mode (context)", "grpdeprecated.html#networkcompatibilitymodecontext", null ],
        [ "otr_request_duration (receiver)", "grpdeprecated.html#otrrequestdurationreceiver", null ],
        [ "pattern_callback (wildcard_receiver)", "grpdeprecated.html#patterncallbackwildcardreceiver", null ],
        [ "rcv_sync_cache (receiver)", "grpdeprecated.html#rcvsynccachereceiver", null ],
        [ "rcv_sync_cache_timeout (receiver)", "grpdeprecated.html#rcvsynccachetimeoutreceiver", null ],
        [ "receive_thread_pool_size (context)", "grpdeprecated.html#receivethreadpoolsizecontext", null ],
        [ "resolver_active_source_interval (context)", "grpdeprecated.html#resolveractivesourceintervalcontext", null ],
        [ "resolver_active_threshold (context)", "grpdeprecated.html#resolveractivethresholdcontext", null ],
        [ "resolver_context_advertisement_interval (context)", "grpdeprecated.html#resolvercontextadvertisementintervalcontext", null ],
        [ "resolver_maximum_advertisements (context)", "grpdeprecated.html#resolvermaximumadvertisementscontext", null ],
        [ "resolver_maximum_queries (context)", "grpdeprecated.html#resolvermaximumqueriescontext", null ],
        [ "resolver_query_interval (context)", "grpdeprecated.html#resolverqueryintervalcontext", null ],
        [ "resolver_query_max_interval (wildcard_receiver)", "grpdeprecated.html#resolverquerymaxintervalwildcardreceiver", null ],
        [ "resolver_unicast_address (context)", "grpdeprecated.html#resolverunicastaddresscontext", null ],
        [ "resolver_unicast_destination_port (context)", "grpdeprecated.html#resolverunicastdestinationportcontext", null ],
        [ "resolver_unicast_port (context)", "grpdeprecated.html#resolverunicastportcontext", null ],
        [ "retransmit_message_map_tablesz (source)", "grpdeprecated.html#retransmitmessagemaptableszsource", null ],
        [ "retransmit_request_generation_interval (receiver)", "grpdeprecated.html#retransmitrequestgenerationintervalreceiver", null ],
        [ "retransmit_retention_age_threshold (source)", "grpdeprecated.html#retransmitretentionagethresholdsource", null ],
        [ "source_cost_evaluation_function (context)", "grpdeprecated.html#sourcecostevaluationfunctioncontext", null ],
        [ "transport_datagram_max_size (context)", "grpdeprecated.html#transportdatagrammaxsizecontext", null ],
        [ "transport_lbtipc_acknowledgement_interval (receiver)", "grpdeprecated.html#transportlbtipcacknowledgementintervalreceiver", null ],
        [ "transport_lbtipc_client_activity_timeout (source)", "grpdeprecated.html#transportlbtipcclientactivitytimeoutsource", null ],
        [ "transport_lbtrdma_datagram_max_size (context)", "grpdeprecated.html#transportlbtrdmadatagrammaxsizecontext", null ],
        [ "transport_lbtrdma_interface (source)", "grpdeprecated.html#transportlbtrdmainterfacesource", null ],
        [ "transport_lbtrdma_maximum_ports (context)", "grpdeprecated.html#transportlbtrdmamaximumportscontext", null ],
        [ "transport_lbtrdma_port (source)", "grpdeprecated.html#transportlbtrdmaportsource", null ],
        [ "transport_lbtrdma_port_high (context)", "grpdeprecated.html#transportlbtrdmaporthighcontext", null ],
        [ "transport_lbtrdma_port_low (context)", "grpdeprecated.html#transportlbtrdmaportlowcontext", null ],
        [ "transport_lbtrdma_receiver_thread_behavior (context)", "grpdeprecated.html#transportlbtrdmareceiverthreadbehaviorcontext", null ],
        [ "transport_lbtrdma_transmission_window_size (source)", "grpdeprecated.html#transportlbtrdmatransmissionwindowsizesource", null ],
        [ "ume_message_map_tablesz (source)", "grpdeprecated.html#umemessagemaptableszsource", null ],
        [ "ume_primary_store_address (source)", "grpdeprecated.html#umeprimarystoreaddresssource", null ],
        [ "ume_primary_store_port (source)", "grpdeprecated.html#umeprimarystoreportsource", null ],
        [ "ume_registration_id (source)", "grpdeprecated.html#umeregistrationidsource", null ],
        [ "ume_retransmit_request_generation_interval (receiver)", "grpdeprecated.html#umeretransmitrequestgenerationintervalreceiver", null ],
        [ "ume_retransmit_request_interval (receiver)", "grpdeprecated.html#umeretransmitrequestintervalreceiver", null ],
        [ "ume_retransmit_request_maximum (receiver)", "grpdeprecated.html#umeretransmitrequestmaximumreceiver", null ],
        [ "ume_retransmit_request_outstanding_maximum (receiver)", "grpdeprecated.html#umeretransmitrequestoutstandingmaximumreceiver", null ],
        [ "ume_secondary_store_address (source)", "grpdeprecated.html#umesecondarystoreaddresssource", null ],
        [ "ume_secondary_store_port (source)", "grpdeprecated.html#umesecondarystoreportsource", null ],
        [ "ume_tertiary_store_address (source)", "grpdeprecated.html#umetertiarystoreaddresssource", null ],
        [ "ume_tertiary_store_port (source)", "grpdeprecated.html#umetertiarystoreportsource", null ],
        [ "umq_flight_size (context)", "grpdeprecated.html#umqflightsizecontext", null ],
        [ "umq_flight_size (source)", "grpdeprecated.html#umqflightsizesource", null ],
        [ "umq_flight_size_behavior (context)", "grpdeprecated.html#umqflightsizebehaviorcontext", null ],
        [ "umq_flight_size_behavior (source)", "grpdeprecated.html#umqflightsizebehaviorsource", null ],
        [ "umq_message_retransmission_interval (context)", "grpdeprecated.html#umqmessageretransmissionintervalcontext", null ],
        [ "umq_message_stability_notification (context)", "grpdeprecated.html#umqmessagestabilitynotificationcontext", null ],
        [ "umq_msg_total_lifetime (context)", "grpdeprecated.html#umqmsgtotallifetimecontext", null ],
        [ "umq_queue_check_interval (context)", "grpdeprecated.html#umqqueuecheckintervalcontext", null ],
        [ "umq_queue_name (source)", "grpdeprecated.html#umqqueuenamesource", null ],
        [ "umq_queue_participants_only (source)", "grpdeprecated.html#umqqueueparticipantsonlysource", null ],
        [ "umq_queue_query_interval (context)", "grpdeprecated.html#umqqueuequeryintervalcontext", null ],
        [ "umq_require_queue_authentication (context)", "grpdeprecated.html#umqrequirequeueauthenticationcontext", null ],
        [ "umq_retention_intergroup_stability_behavior (context)", "grpdeprecated.html#umqretentionintergroupstabilitybehaviorcontext", null ],
        [ "umq_retention_intergroup_stability_behavior (source)", "grpdeprecated.html#umqretentionintergroupstabilitybehaviorsource", null ],
        [ "umq_retention_intragroup_stability_behavior (context)", "grpdeprecated.html#umqretentionintragroupstabilitybehaviorcontext", null ],
        [ "umq_retention_intragroup_stability_behavior (source)", "grpdeprecated.html#umqretentionintragroupstabilitybehaviorsource", null ],
        [ "use_transport_thread (receiver)", "grpdeprecated.html#usetransportthreadreceiver", null ]
      ] ]
    ] ],
    [ "Option Categories", "optioncategories.html", [
      [ "UM UDP Port Values", "optioncategories.html#umudpportvalues", null ],
      [ "UM TCP Port Values", "optioncategories.html#umtcpportvalues", null ],
      [ "UM Multicast Group Values", "optioncategories.html#ummulticastgroupvalues", null ],
      [ "UM Timer Interval Values", "optioncategories.html#umtimerintervalvalues", null ],
      [ "Options That May Be Set During Operation", "optioncategories.html#optionsthatmaybesetduringoperation", null ],
      [ "Options that Cannot Be Set Via Configuration Files", "optioncategories.html#optionsthatcannotbesetviaconfigurationfiles", null ]
    ] ]
  ] ]
];

var NAVTREEINDEX =
[
"accesstocurrentoperatingoptions.html",
"grpmulticastresolvernetwork.html#resolvermulticastincomingportcontext",
"grpultramessagingpersistence.html#umerepositoryackonreceptionsource"
];

var SYNCONMSG = 'click to disable panel synchronisation';
var SYNCOFFMSG = 'click to enable panel synchronisation';