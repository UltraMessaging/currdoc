var NAVTREE =
[
  [ "Concepts Guide", "index.html", [
    [ "Introduction", "index.html#firstsect", null ],
    [ "Fundamental Concepts", "index.html#fundamentalconcepts", [
      [ "Topic Structure and Management", "index.html#topicstructureandmanagement", [
        [ "Message Ordering", "index.html#messageordering", null ],
        [ "Topic Resolution Overview", "index.html#topicresolutionoverview", null ],
        [ "Topic Resolution Domain", "index.html#topicresolutiondomain", null ]
      ] ],
      [ "Messaging Reliability", "index.html#messagingreliability", [
        [ "Head Loss", "index.html#headloss", null ],
        [ "Leading Loss", "index.html#leadingloss", null ],
        [ "Tail Loss", "index.html#tailloss", null ]
      ] ],
      [ "Persistence", "index.html#persistence", null ],
      [ "Queuing", "index.html#queuing", null ],
      [ "UM Router", "index.html#umrouter", null ],
      [ "Late Join", "index.html#latejoin", null ],
      [ "Request/Response", "index.html#requestresponse", null ],
      [ "UM Transports", "index.html#umtransports", [
        [ "Transport Sessions", "index.html#transportsessions", null ],
        [ "Multi-Transport Threads", "index.html#multitransportthreads", null ]
      ] ],
      [ "Event Delivery", "index.html#eventdelivery", null ],
      [ "Rate Controls", "index.html#ratecontrols", [
        [ "Transport Rate Control", "index.html#transportratecontrol", null ],
        [ "Topic Resolution Rate Control", "index.html#topicresolutionratecontrol", null ]
      ] ],
      [ "Operational Statistics", "index.html#operationalstatistics", null ],
      [ "Immediate Messaging", "index.html#immediatemessaging", null ],
      [ "Context Object", "index.html#contextobject", null ],
      [ "Topic Object", "index.html#topicobject", null ],
      [ "Source Object", "index.html#sourceobject", [
        [ "Source String", "index.html#sourcestring", null ],
        [ "Source Configuration and Transport Sessions", "index.html#sourceconfigurationandtransportsessions", null ],
        [ "Zero Object Delivery (Source)", "index.html#zeroobjectdeliverysource", null ]
      ] ],
      [ "Receiver Object", "index.html#receiverobject", [
        [ "Receiver Configuration and Transport Sessions", "index.html#receiverconfigurationandtransportsessions", null ],
        [ "UM Wildcard Receivers", "index.html#umwildcardreceivers", null ],
        [ "Transport Services Provider Object", "index.html#transportservicesproviderobject", null ],
        [ "UM Hot Failover Across Contexts Objects", "index.html#umhotfailoveracrosscontextsobjects", null ],
        [ "Zero Object Delivery", "index.html#zeroobjectdelivery", null ]
      ] ],
      [ "Event Queue Object", "index.html#eventqueueobject", null ],
      [ "Message Object", "index.html#messageobject", [
        [ "Message Object Deletion", "index.html#messageobjectdeletion", null ],
        [ "Message Object Retention", "index.html#messageobjectretention", null ]
      ] ],
      [ "Security Considerations", "index.html#securityconsiderations", [
        [ "Webmon Security", "index.html#webmonsecurity", null ]
      ] ]
    ] ],
    [ "Transport Types", "index.html#transporttypes", [
      [ "Transport TCP", "index.html#transporttcp", null ],
      [ "Transport LBT-RU", "index.html#transportlbtru", null ],
      [ "Transport LBT-RM", "index.html#transportlbtrm", null ],
      [ "Transport LBT-IPC", "index.html#transportlbtipc", [
        [ "LBT-IPC Shared Memory Area", "index.html#lbtipcsharedmemoryarea", null ],
        [ "Sources and LBT-IPC", "index.html#sourcesandlbtipc", null ],
        [ "Receivers and LBT-IPC", "index.html#receiversandlbtipc", null ],
        [ "Similarities with Other UM Transports", "index.html#similaritieswithotherumtransports", null ],
        [ "Differences from Other UM Transports", "index.html#differencesfromotherumtransports", null ],
        [ "Sending to Both Local and Remote Receivers", "index.html#sendingtobothlocalandremotereceivers", null ],
        [ "LBT-IPC Configuration Example", "index.html#lbtipcconfigurationexample", null ],
        [ "Required privileges", "index.html#requiredprivileges", null ],
        [ "Host Resource Usage and Limits", "index.html#hostresourceusageandlimits", null ],
        [ "LBT-IPC Resource Manager", "index.html#lbtipcresourcemanager", null ]
      ] ],
      [ "Transport LBT-SMX", "index.html#transportlbtsmx", [
        [ "Sources and LBT-SMX", "index.html#sourcesandlbtsmx", null ],
        [ "Sending over LBT-SMX with Native APIs", "index.html#sendingoverlbtsmxwithnativeapis", null ],
        [ "Sending over LBT-SMX with Existing APIs", "index.html#sendingoverlbtsmxwithexistingapis", null ],
        [ "Receivers and LBT-SMX", "index.html#receiversandlbtsmx", null ],
        [ "Similarities Between LBT-SMX and Other UM Transports", "index.html#similaritiesbetweenlbtsmxandotherumtransports", null ],
        [ "Differences Between LBT-SMX and Other UM Transports", "index.html#differencesbetweenlbtsmxandotherumtransports", null ],
        [ "LBT-SMX Configuration Example", "index.html#lbtsmxconfigurationexample", null ],
        [ "Java Code Examples for LBT-SMX", "index.html#javacodeexamplesforlbtsmx", null ],
        [ ".NET Code Examples for LBT-SMX", "index.html#netcodeexamplesforlbtsmx", null ],
        [ "LBT-SMX Resource Manager", "index.html#lbtsmxresourcemanager", null ]
      ] ],
      [ "Transport Broker", "index.html#transportbroker", null ]
    ] ],
    [ "Topic Resolution Description", "index.html#topicresolutiondescription", [
      [ "TR Protocol Comparison", "index.html#trprotocolcomparison", [
        [ "Multicast UDP TR", "index.html#multicastudptr", null ],
        [ "Unicast UDP TR", "index.html#unicastudptr", null ],
        [ "TCP TR", "index.html#tcptr", null ]
      ] ],
      [ "UDP-Based Topic Resolution Details", "index.html#udpbasedtopicresolutiondetails", [
        [ "Sources Advertise", "index.html#sourcesadvertise", null ],
        [ "Receivers Query", "index.html#receiversquery", null ],
        [ "Wildcard Receiver Topic Resolution", "index.html#wildcardreceivertopicresolution", null ],
        [ "Initial Phase", "index.html#initialphase", null ],
        [ "Sustaining Phase", "index.html#sustainingphase", null ],
        [ "Quiescent Phase", "index.html#quiescentphase", null ],
        [ "Store (context) Name Resolution", "index.html#storecontextnameresolution", null ],
        [ "UDP Topic Resolution Configuration Options", "index.html#udptopicresolutionconfigurationoptions", null ],
        [ "Unicast Topic Resolution", "index.html#unicasttopicresolution", null ],
        [ "Network Address Translation (NAT)", "index.html#networkaddresstranslationnat", null ],
        [ "Example NAT Configuration", "index.html#examplenatconfiguration", null ]
      ] ],
      [ "UDP-Based Topic Resolution Strategies", "index.html#udpbasedtopicresolutionstrategies", [
        [ "Default TR", "index.html#defaulttr", null ],
        [ "Query-Centric TR", "index.html#querycentrictr", null ],
        [ "Known Query Threshold TR", "index.html#knownquerythresholdtr", null ],
        [ "Advertise-Centric TR", "index.html#advertisecentrictr", null ]
      ] ],
      [ "TCP-Based Topic Resolution Details", "index.html#tcpbasedtopicresolutiondetails", [
        [ "TCP-Based TR and Fault Tolerance", "index.html#tcpbasedtrandfaulttolerance", null ],
        [ "TCP-Based TR Version Interoperability", "index.html#tcpbasedtrversioninteroperability", null ],
        [ "TCP-Based TR Configuration", "index.html#tcpbasedtrconfiguration", null ],
        [ "SRS Service", "index.html#srsservice", null ]
      ] ]
    ] ],
    [ "Architecture", "index.html#architecture", [
      [ "UM Software Stack", "index.html#umsoftwarestack", [
        [ "Delivery Controller", "index.html#deliverycontroller", null ]
      ] ],
      [ "Embedded Mode", "index.html#embeddedmode", null ],
      [ "Sequential Mode", "index.html#sequentialmode", null ],
      [ "Message Batching", "index.html#messagebatching", [
        [ "Implicit Batching", "index.html#implicitbatching", null ],
        [ "Intelligent Batching", "index.html#intelligentbatching", null ],
        [ "Application Batching", "index.html#applicationbatching", null ],
        [ "Explicit Batching", "index.html#explicitbatching", null ],
        [ "Adaptive Batching", "index.html#adaptivebatching", null ]
      ] ],
      [ "Message Fragmentation and Reassembly", "index.html#messagefragmentationandreassembly", [
        [ "Datagram Max Size and Network MTU", "index.html#datagrammaxsizeandnetworkmtu", null ],
        [ "Datagrams and Kernel Bypass Network Drivers", "index.html#datagramsandkernelbypassnetworkdrivers", null ]
      ] ],
      [ "Ordered Delivery", "index.html#ordereddelivery", [
        [ "Sequence Number Order, Fragments Reassembled (Default Mode)", "index.html#sequencenumberorderfragmentsreassembleddefaultmode", null ],
        [ "Arrival Order, Fragments Reassembled", "index.html#arrivalorderfragmentsreassembled", null ],
        [ "Arrival Order, Fragments Not Reassembled", "index.html#arrivalorderfragmentsnotreassembled", null ]
      ] ],
      [ "Loss Detection Using TSNIs", "index.html#lossdetectionusingtsnis", null ],
      [ "Receiver Keepalive Using Session Messages", "index.html#receiverkeepaliveusingsesssionmessages", null ],
      [ "Extended Messaging Example", "index.html#extendedmessagingexample", [
        [ "Example: First Message", "index.html#examplefirstmessage", null ],
        [ "Example: Batching", "index.html#examplebatching", null ],
        [ "Example: UM Fragmentation", "index.html#exampleumfragmentation", null ],
        [ "Example: Loss Recovery", "index.html#examplelossrecovery", null ],
        [ "Example: Unrecoverable Loss", "index.html#exampleunrecoverableloss", null ],
        [ "Example: Transport Deletion", "index.html#exampletransportdeletion", null ]
      ] ]
    ] ],
    [ "UM Features", "index.html#umfeatures", [
      [ "Transport Services Provider (XSP)", "index.html#transportservicesproviderxsp", [
        [ "XSP Handles Transport Sessions, Not Topics", "index.html#xsphandlestransportsessionsnottopics", null ],
        [ "XSP Threading Considerations", "index.html#xspthreadingconsiderations", null ],
        [ "XSP Usage", "index.html#xspusage", null ],
        [ "Other XSP Operations", "index.html#otherxspoperations", null ],
        [ "XSP Limitations", "index.html#xsplimitations", null ]
      ] ],
      [ "Using Late Join", "index.html#usinglatejoin", [
        [ "Late Join With Persistence", "index.html#latejoinwithump", null ],
        [ "Late Join Options Summary", "index.html#latejoinoptionssummary", null ],
        [ "Using Default Late Join Options", "index.html#usingdefaultlatejoinoptions", null ],
        [ "Specifying a Range of Messages to Retransmit", "index.html#specifyingarangeofmessagestoretransmit", null ],
        [ "Retransmitting Only Recent Messages", "index.html#retransmittingonlyrecentmessages", null ],
        [ "Configuring Late Join for Large Numbers of Messages", "index.html#configuringlatejoinforlargenumbersofmessages", null ]
      ] ],
      [ "Off-Transport Recovery (OTR)", "index.html#offtransportrecoveryotr", [
        [ "OTR with Sequence Number Ordered Delivery", "index.html#otrwithsequencenumberordereddelivery", null ],
        [ "OTR With Persistence", "index.html#otrwithump", null ],
        [ "OTR Options Summary", "index.html#otroptionssummary", null ]
      ] ],
      [ "Encrypted TCP", "index.html#encryptedtcp", [
        [ "TLS Authentication", "index.html#tlsauthentication", null ],
        [ "TLS Backwards Compatibility", "index.html#tlsbackwardscompatibility", null ],
        [ "TLS Efficiency", "index.html#tlsefficiency", null ],
        [ "TLS Configuration", "index.html#tlsconfiguration", null ],
        [ "TLS Options Summary", "index.html#tlsoptionssummary", null ],
        [ "TLS and Persistence", "index.html#tlsandpersistence", null ],
        [ "TLS and Queuing", "index.html#tlsandqueuing", null ],
        [ "TLS and the Dynamic Routing Option (DRO)", "index.html#tlsandthedynamicroutingoptiondro", null ],
        [ "TLS and Compression", "index.html#tlsandcompression", null ]
      ] ],
      [ "Compressed TCP", "index.html#compressedtcp", [
        [ "Compression Configuration", "index.html#compressionconfiguration", null ],
        [ "Compression and Persistence", "index.html#compressionandpersistence", null ],
        [ "Compression and Queuing", "index.html#compressionandqueuing", null ],
        [ "Compression and the Dynamic Routing Option (DRO)", "index.html#compressionandthedynamicroutingoptiondro", null ],
        [ "Compression and Encryption", "index.html#compressionandencryption", null ],
        [ "Version Interoperability", "index.html#versioninteroperability", null ]
      ] ],
      [ "High-resolution Timestamps", "index.html#highresolutiontimestamps", [
        [ "Timestamp Restrictions", "index.html#timestamprestrictions", null ],
        [ "Timestamp Configuration Summary", "index.html#timestampconfigurationsummary", null ]
      ] ],
      [ "Unicast Immediate Messaging", "index.html#unicastimmediatemessaging", [
        [ "UIM Addressing", "index.html#uimaddressing", null ],
        [ "Receiving a UIM", "index.html#receivingauim", null ],
        [ "Sending a UIM", "index.html#sendingauim", null ],
        [ "UIM Connection Management", "index.html#uimconnectionmanagement", null ]
      ] ],
      [ "Multicast Immediate Messaging", "index.html#multicastimmediatemessaging", [
        [ "Temporary Transport Session", "index.html#temporarytransportsession", null ],
        [ "MIM Notifications", "index.html#mimnotifications", null ],
        [ "Receiving Immediate Messages", "index.html#receivingimmediatemessages", null ],
        [ "MIM and Wildcard Receivers", "index.html#mimandwildcardreceivers", null ],
        [ "MIM Loss Handling", "index.html#mimlosshandling", null ],
        [ "MIM Configuration", "index.html#mimconfiguration", null ],
        [ "MIM Example Applications", "index.html#mimexampleapplications", null ]
      ] ]
    ] ],
    [ "UM Objects", "index.html#umobjects", [
      [ "Message Properties", "index.html#messageproperties", [
        [ "Message Properties Performance Considerations", "index.html#messagepropertiesperformanceconsiderations", null ],
        [ "Smart Sources and Message Properties", "index.html#smartsourcesandmessageproperties", null ],
        [ "Smart Source Message Properties Usage", "index.html#smartsourcemessagepropertiesusage", null ]
      ] ],
      [ "Request/Response Model", "index.html#requestresponsemodel", [
        [ "Request Message", "index.html#requestmessage", null ],
        [ "Response Message", "index.html#responsemessage", null ],
        [ "TCP Management", "index.html#tcpmanagement", null ],
        [ "Request/Response Configuration", "index.html#requestresponseconfiguration", null ],
        [ "Request/Response Example Applications", "index.html#requestresponseexampleapplications", null ]
      ] ],
      [ "Self Describing Messaging", "index.html#selfdescribingmessaging", null ],
      [ "Pre-Defined Messages", "index.html#predefinedmessages", [
        [ "Typical PDM Usage Patterns", "index.html#typicalpdmusagepatterns", null ],
        [ "Getting Started with PDM", "index.html#gettingstartedwithpdm", null ],
        [ "Using the PDM API", "index.html#usingthepdmapi", null ],
        [ "Migrating from SDM", "index.html#migratingfromsdm", null ]
      ] ],
      [ "Sending to Sources", "index.html#sendingtosources", [
        [ "Source String from Receive Event", "index.html#sourcestringfromreceiveevent", null ],
        [ "Source String from Source Notification Function", "index.html#sourcestringfromsourcenotificationfunction", null ],
        [ "Sending to Source Readiness", "index.html#sendingtosourcereadiness", null ]
      ] ],
      [ "Spectrum", "index.html#spectrum", [
        [ "Spectrum Performance Advantages", "index.html#spectrumperformanceadvantages", null ],
        [ "Spectrum Configuration Options", "index.html#spectrumconfigurationoptions", null ],
        [ "Smart Sources and Spectrum", "index.html#smartsourcesandspectrum", null ]
      ] ],
      [ "Hot Failover (HF)", "index.html#hotfailoverhf", [
        [ "Implementing Hot Failover Sources", "index.html#implementinghotfailoversources", null ],
        [ "Implementing Hot Failover Receivers", "index.html#implementinghotfailoverreceivers", null ],
        [ "Implementing Hot Failover Wildcard Receivers", "index.html#implementinghotfailoverwildcardreceivers", null ],
        [ "Java and .NET", "index.html#javaandnet", null ],
        [ "Using Hot Failover with Persistence", "index.html#usinghotfailoverwithpersistence", null ],
        [ "Hot Failover Intentional Gap Support", "index.html#hotfailoverintentionalgapsupport", null ],
        [ "Hot Failover Optional Messages", "index.html#hotfailoveroptionalmessages", null ],
        [ "Using Hot Failover with Ordered Delivery", "index.html#usinghotfailoverwithordereddelivery", null ],
        [ "Hot Failover Across Multiple Contexts", "index.html#hotfailoveracrossmultiplecontexts", null ]
      ] ],
      [ "Daemon Statistics", "index.html#daemonstatistics", [
        [ "Daemon Statistics Structures", "index.html#daemonstatisticsstructures", null ],
        [ "Daemon Statistics Binary Data", "index.html#daemonstatisticsbinarydata", null ],
        [ "Daemon Statistics Versioning", "index.html#daemonstatisticsversioning", null ],
        [ "Daemon Statistics Requests", "index.html#daemonstatisticsrequests", null ],
        [ "Daemon Statistics Details", "index.html#daemonstatisticsdetails", null ]
      ] ]
    ] ],
    [ "Advanced Optimizations", "index.html#advancedoptimizations", [
      [ "Receive Buffer Recycling", "index.html#receivebufferrecycling", [
        [ "Receive Buffer Recycling Restrictions", "index.html#receivebufferrecyclingrestrictions", null ]
      ] ],
      [ "Single Receiving Thread", "index.html#singlereceivingthread", [
        [ "Single Receiving Thread Restrictions", "index.html#singlereceivingthreadrestrictions", null ]
      ] ],
      [ "lbm_context_process_events_ex", "index.html#lbmcontextprocesseventsex", [
        [ "Context Lock Reduction", "index.html#contextlockreduction", null ],
        [ "Context Lock Reduction Restrictions", "index.html#contextlockreductionrestrictions", null ],
        [ "Gettimeofday Reduction", "index.html#gettimeofdayreduction", null ],
        [ "Gettimeofday Reduction Restrictions", "index.html#gettimeofdayreductionrestrictions", null ]
      ] ],
      [ "Receive Multiple Datagrams", "index.html#receivemultipledatagrams", [
        [ "Receive Multiple Datagrams Compatibility", "index.html#receivemultipledatagramscompatibility", null ],
        [ "Receive Multiple Datagrams Restrictions", "index.html#receivemultipledatagramsrestrictions", null ]
      ] ],
      [ "Smart Sources", "index.html#smartsources", [
        [ "Smart Source Message Buffers", "index.html#smartsourcemessagebuffers", null ],
        [ "Smart Sources and Memory Management", "index.html#smartsourcesandmemorymanagement", null ],
        [ "Smart Sources Configuration", "index.html#smartsourceconfiguration", null ],
        [ "Smart Source Defensive Checks", "index.html#smartsourcedefensivechecks", null ],
        [ "Smart Sources Restrictions", "index.html#smartsourcerestrictions", null ]
      ] ],
      [ "Zero-Copy Send API", "index.html#zerocopysendapi", [
        [ "Zero-Copy Send Compatibility", "index.html#zerocopysendcompatibility", null ],
        [ "Zero-Copy Restrictions", "index.html#zerocopyrestrictions", null ]
      ] ],
      [ "Comparison of Zero Copy and Smart Sources", "index.html#comparisonofzerocopyandsmartsources", null ]
    ] ],
    [ "Man Pages for SRS", "index.html#manpagesforsrs", [
      [ "SRS Man Page", "index.html#srsmanpage", null ],
      [ "Srsds Man Page", "index.html#srsdsmanpage", null ]
    ] ],
    [ "SRS Configuration File", "index.html#srsconfigurationfile", [
      [ "SRS Configuration Elements", "index.html#srsconfigurationelements", [
        [ "SRS Element \"<um-srs>\"", "index.html#srselementumsrs", null ],
        [ "SRS Element \"<daemon-monitor>\"", "index.html#srselementdaemonmonitor", null ],
        [ "SRS Element \"<remote-config-changes-request>\"", "index.html#srselementremoteconfigchangesrequest", null ],
        [ "SRS Element \"<remote-snapshot-request>\"", "index.html#srselementremotesnapshotrequest", null ],
        [ "SRS Element \"<publish-connection-events>\"", "index.html#srselementpublishconnectionevents", null ],
        [ "SRS Element \"<lbm-attributes>\"", "index.html#srselementlbmattributes", null ],
        [ "SRS Element \"<option>\"", "index.html#srselementoption", null ],
        [ "SRS Element \"<publishing-interval>\"", "index.html#srselementpublishinginterval", null ],
        [ "SRS Element \"<internal-config-opts>\"", "index.html#srselementinternalconfigopts", null ],
        [ "SRS Element \"<config-opts>\"", "index.html#srselementconfigopts", null ],
        [ "SRS Element \"<um-client-error-stats>\"", "index.html#srselementumclienterrorstats", null ],
        [ "SRS Element \"<srs-error-stats>\"", "index.html#srselementsrserrorstats", null ],
        [ "SRS Element \"<connection-events>\"", "index.html#srselementconnectionevents", null ],
        [ "SRS Element \"<um-client-stats>\"", "index.html#srselementumclientstats", null ],
        [ "SRS Element \"<srs-stats>\"", "index.html#srselementsrsstats", null ],
        [ "SRS Element \"<default>\"", "index.html#srselementdefault", null ],
        [ "SRS Element \"<debug-monitor>\"", "index.html#srselementdebugmonitor", null ],
        [ "SRS Element \"<enabled>\"", "index.html#srselementenabled", null ],
        [ "SRS Element \"<ping-interval>\"", "index.html#srselementpinginterval", null ],
        [ "SRS Element \"<port>\"", "index.html#srselementport", null ],
        [ "SRS Element \"<interface>\"", "index.html#srselementinterface", null ],
        [ "SRS Element \"<srs>\"", "index.html#srselementsrs", null ],
        [ "SRS Element \"<clientactor>\"", "index.html#srselementclientactor", null ],
        [ "SRS Element \"<batch-frame-max-datagram-size>\"", "index.html#srselementbatchframemaxdatagramsize", null ],
        [ "SRS Element \"<batch-frame-max-record-count>\"", "index.html#srselementbatchframemaxrecordcount", null ],
        [ "SRS Element \"<source-info-queue-service-interval>\"", "index.html#srselementsourceinfoqueueserviceinterval", null ],
        [ "SRS Element \"<request-stream-max-msg-count>\"", "index.html#srselementrequeststreammaxmsgcount", null ],
        [ "SRS Element \"<otidmap>\"", "index.html#srselementotidmap", null ],
        [ "SRS Element \"<async-receiver-distribution>\"", "index.html#srselementasyncreceiverdistribution", null ],
        [ "SRS Element \"<shards>\"", "index.html#srselementshards", null ],
        [ "SRS Element \"<state-lifetime>\"", "index.html#srselementstatelifetime", null ],
        [ "SRS Element \"<daemon>\"", "index.html#srselementdaemon", null ],
        [ "SRS Element \"<pid-file>\"", "index.html#srselementpidfile", null ],
        [ "SRS Element \"<log>\"", "index.html#srselementlog", null ]
      ] ],
      [ "SRS XSD file", "index.html#srsxsdfile", null ]
    ] ],
    [ "SRS Daemon Statistics", "index.html#srsdaemonstatistics", [
      [ "Message Type: SRS_STATS", "index.html#messagetypesrsstats", null ],
      [ "Message Type: SRS_ERROR_STATS", "index.html#messagetypesrserrorstats", null ],
      [ "Message Type: UM_CLIENT_STATS", "index.html#messagetypeumclientstats", null ],
      [ "Message Type: UM_CLIENT_ERROR_STATS", "index.html#messagetypeumclienterrorstats", null ],
      [ "Message Type: CONNECTION_EVENTS", "index.html#messagetypeconnectionevents", [
        [ "Message Subtype: UM_CLIENT_CONNECT", "index.html#messagesubtypeumclientconnect", null ],
        [ "Message Subtype: UM_CLIENT_DISCONNECT", "index.html#messagesubtypeumclientdisconnect", null ],
        [ "Message Subtypes: SIR and SDR", "index.html#messagesubtypessirandsdr", null ]
      ] ],
      [ "Message Type: CONFIG_OPTS", "index.html#messagetypeconfigopts", null ],
      [ "Message Type: INTERNAL_CONFIG_OPTS", "index.html#messagetypeinternalconfigopts", null ],
      [ "Request Type: REPORT_SRS_VERSION", "index.html#requesttypereportsrsversion", null ],
      [ "Request Type: REPORT_MONITOR_INFO", "index.html#requesttypereportmonitorinfo", null ],
      [ "Request Type: SET_PUBLISHING_INTERVAL", "index.html#requesttypesetpublishinginterval", null ]
    ] ],
    [ "Man Pages for Lbmrd", "index.html#manpagesforlbmrd", [
      [ "Lbmrd Man Page", "index.html#lbmrdmanpage", null ],
      [ "Lbmrds Man Page", "index.html#lbmrdsmanpage", null ]
    ] ],
    [ "lbmrd Configuration File", "index.html#lbmrdconfigurationfile", [
      [ "lbmrd Configuration Elements", "index.html#lbmrdconfigurationelements", [
        [ "LBMRD Element \"<lbmrd>\"", "index.html#lbmrdelementlbmrd", null ],
        [ "LBMRD Element \"<transformations>\"", "index.html#lbmrdelementtransformations", null ],
        [ "LBMRD Element \"<transform>\"", "index.html#lbmrdelementtransform", null ],
        [ "LBMRD Element \"<rule>\"", "index.html#lbmrdelementrule", null ],
        [ "LBMRD Element \"<replace>\"", "index.html#lbmrdelementreplace", null ],
        [ "LBMRD Element \"<match>\"", "index.html#lbmrdelementmatch", null ],
        [ "LBMRD Element \"<domains>\"", "index.html#lbmrdelementdomains", null ],
        [ "LBMRD Element \"<domain>\"", "index.html#lbmrdelementdomain", null ],
        [ "LBMRD Element \"<network>\"", "index.html#lbmrdelementnetwork", null ],
        [ "LBMRD Element \"<daemon>\"", "index.html#lbmrdelementdaemon", null ],
        [ "LBMRD Element \"<resolver_unicast_send_socket_buffer>\"", "index.html#lbmrdelementresolver_unicast_send_socket_buffer", null ],
        [ "LBMRD Element \"<resolver_unicast_receiver_socket_buffer>\"", "index.html#lbmrdelementresolver_unicast_receiver_socket_buffer", null ],
        [ "LBMRD Element \"<log>\"", "index.html#lbmrdelementlog", null ],
        [ "LBMRD Element \"<ttl>\"", "index.html#lbmrdelementttl", null ],
        [ "LBMRD Element \"<port>\"", "index.html#lbmrdelementport", null ],
        [ "LBMRD Element \"<interface>\"", "index.html#lbmrdelementinterface", null ],
        [ "LBMRD Element \"<activity>\"", "index.html#lbmrdelementactivity", null ]
      ] ],
      [ "Dummy lbmrd Configuration File", "index.html#dummylbmrdconfigurationfile", null ],
      [ "Lbmrd DTD file", "index.html#lbmrddtdfile", null ]
    ] ],
    [ "Packet Loss", "index.html#packetloss", [
      [ "UM Recovery of Lost Packets", "index.html#umrecoveryoflostpackets", null ],
      [ "Packet Loss Points", "index.html#packetlosspoints", [
        [ "Loss: Switch Egress Port", "index.html#lossswitchegressport", null ],
        [ "Loss: NIC Ring Buffer", "index.html#lossnicringbuffer", null ],
        [ "Loss: Socket Buffer", "index.html#losssocketbuffer", null ],
        [ "Loss: Other", "index.html#lossother", null ]
      ] ],
      [ "Verifying Loss Detection Tools", "index.html#verifyinglossdetectiontools", [
        [ "Prepare to Verify", "index.html#preparetoverify", null ],
        [ "Verifying Switch Loss", "index.html#verifyingswitchloss", null ],
        [ "Verifying NIC Loss", "index.html#verifyingnicloss", null ],
        [ "Verifying Socket Buffer Loss", "index.html#verifyingsocketbufferloss", null ]
      ] ]
    ] ],
    [ "UM Glossary", "index.html#umglossary", [
      [ "Glossary A", "index.html#glossarya", null ],
      [ "Glossary B", "index.html#glossaryb", null ],
      [ "Glossary C", "index.html#glossaryc", null ],
      [ "Glossary D", "index.html#glossaryd", null ],
      [ "Glossary E", "index.html#glossarye", null ],
      [ "Glossary F", "index.html#glossaryf", null ],
      [ "Glossary G", "index.html#glossaryg", null ],
      [ "Glossary H", "index.html#glossaryh", null ],
      [ "Glossary I", "index.html#glossaryi", null ],
      [ "Glossary J", "index.html#glossaryj", null ],
      [ "Glossary L", "index.html#glossaryl", null ],
      [ "Glossary K", "index.html#glossaryk", null ],
      [ "Glossary M", "index.html#glossarym", null ],
      [ "Glossary N", "index.html#glossaryn", null ],
      [ "Glossary O", "index.html#glossaryo", null ],
      [ "Glossary P", "index.html#glossaryp", null ],
      [ "Glossary R", "index.html#glossaryr", null ],
      [ "Glossary S", "index.html#glossarys", null ],
      [ "Glossary T", "index.html#glossaryt", null ],
      [ "Glossary U", "index.html#glossaryu", null ],
      [ "Glossary V", "index.html#glossaryv", null ],
      [ "Glossary W", "index.html#glossaryw", null ],
      [ "Glossary X", "index.html#glossaryx", null ],
      [ "Glossary Z", "index.html#glossaryz", null ]
    ] ]
  ] ]
];

var NAVTREEINDEX =
[
"index.html",
"index.html#srselementinterface"
];

var SYNCONMSG = 'click to disable panel synchronisation';
var SYNCOFFMSG = 'click to enable panel synchronisation';