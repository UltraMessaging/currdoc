var NAVTREE =
[
  [ "Concepts Guide", "index.html", [
    [ "Introduction", "index.html", null ],
    [ "Fundamental Concepts", "fundamentalconcepts.html", [
      [ "Messaging Paradigms", "fundamentalconcepts.html#messagingparadigms", [
        [ "Streaming", "fundamentalconcepts.html#streaming", null ],
        [ "Persistence", "fundamentalconcepts.html#persistence", null ],
        [ "Queuing", "fundamentalconcepts.html#queuing", null ]
      ] ],
      [ "Messages", "fundamentalconcepts.html#messages", [
        [ "Message Integrity", "fundamentalconcepts.html#messageintegrity", null ],
        [ "Message Metadata", "fundamentalconcepts.html#messagemetadata", null ]
      ] ],
      [ "Topic Structure and Management", "fundamentalconcepts.html#topicstructureandmanagement", [
        [ "Message Ordering", "fundamentalconcepts.html#messageordering", null ],
        [ "Topic Resolution Overview", "fundamentalconcepts.html#topicresolutionoverview", null ],
        [ "Topic Resolution Domain", "fundamentalconcepts.html#topicresolutiondomain", null ]
      ] ],
      [ "Messaging Reliability", "fundamentalconcepts.html#messagingreliability", [
        [ "Unrecoverable Loss", "fundamentalconcepts.html#unrecoverableloss1", null ],
        [ "Head Loss", "fundamentalconcepts.html#headloss", null ],
        [ "Leading Loss", "fundamentalconcepts.html#leadingloss", null ],
        [ "Tail Loss", "fundamentalconcepts.html#tailloss", null ],
        [ "Burst Loss", "fundamentalconcepts.html#burstloss1", null ]
      ] ],
      [ "DRO", "fundamentalconcepts.html#umrouter", null ],
      [ "Late Join", "fundamentalconcepts.html#latejoin", null ],
      [ "Request/Response", "fundamentalconcepts.html#requestresponse", null ],
      [ "UM Transports", "fundamentalconcepts.html#umtransports", [
        [ "Transport Sessions", "fundamentalconcepts.html#transportsessions", null ],
        [ "Transport Pacing", "fundamentalconcepts.html#transportpacing", null ]
      ] ],
      [ "Event Delivery", "fundamentalconcepts.html#eventdelivery", [
        [ "Receiver BOS and EOS Events", "fundamentalconcepts.html#receiverbosandeosevents", null ],
        [ "Source Connect and Disconnect Events", "fundamentalconcepts.html#sourceconnectanddisconnectevents", null ],
        [ "Source Wakeup Event", "fundamentalconcepts.html#sourcewakeupevent", null ],
        [ "Source Flight Notification Event", "fundamentalconcepts.html#sourceflightnotificationevent", null ]
      ] ],
      [ "Rate Controls", "fundamentalconcepts.html#ratecontrols", [
        [ "Transport Rate Control", "fundamentalconcepts.html#transportratecontrol", null ],
        [ "Topic Resolution Rate Control", "fundamentalconcepts.html#topicresolutionratecontrol", null ]
      ] ],
      [ "Operational Statistics", "fundamentalconcepts.html#operationalstatistics", null ],
      [ "Immediate Messaging", "fundamentalconcepts.html#immediatemessaging", null ]
    ] ],
    [ "UM Objects", "umobjects.html", [
      [ "Context Object", "umobjects.html#contextobject", null ],
      [ "Topic Object", "umobjects.html#topicobject", null ],
      [ "Source Object", "umobjects.html#sourceobject", [
        [ "Source String", "umobjects.html#sourcestring", null ],
        [ "Source Strings in a Routed Network", "umobjects.html#sourcestringsinaroutednetwork", null ],
        [ "Source Configuration and Transport Sessions", "umobjects.html#sourceconfigurationandtransportsessions", null ]
      ] ],
      [ "Receiver Object", "umobjects.html#receiverobject", [
        [ "Receiver Configuration and Transport Sessions", "umobjects.html#receiverconfigurationandtransportsessions", null ],
        [ "UM Wildcard Receivers", "umobjects.html#umwildcardreceivers", null ],
        [ "Transport Services Provider Object", "umobjects.html#transportservicesproviderobject", null ],
        [ "UM Hot Failover Across Contexts Objects", "umobjects.html#umhotfailoveracrosscontextsobjects", null ]
      ] ],
      [ "Event Queue Object", "umobjects.html#eventqueueobject", [
        [ "Using an Event Queue", "umobjects.html#usinganeventqueue", null ],
        [ "Event Queue Efficiency", "umobjects.html#eventqueueefficiency", null ],
        [ "Event Queue Timeout", "umobjects.html#eventqueuetimeout", null ],
        [ "Event Queue Monitor", "umobjects.html#eventqueuemonitor", null ]
      ] ],
      [ "Message Object", "umobjects.html#messageobject", [
        [ "Message Object Deletion", "umobjects.html#messageobjectdeletion", null ],
        [ "Message Object Retention", "umobjects.html#messageobjectretention", null ]
      ] ],
      [ "Attributes Object", "umobjects.html#attributesobject", null ]
    ] ],
    [ "Security Considerations", "securityconsiderations.html", [
      [ "Webmon Security", "securityconsiderations.html#webmonsecurity", null ]
    ] ],
    [ "Configuration Introduction", "configurationintroduction.html", null ],
    [ "Transport Types", "transporttypes.html", [
      [ "Transport TCP", "transporttypes.html#transporttcp", [
        [ "TCP Flow Control Restrictions", "transporttypes.html#tcpflowcontrolrestrictions", null ]
      ] ],
      [ "Transport LBT-RU", "transporttypes.html#transportlbtru", null ],
      [ "Transport LBT-RM", "transporttypes.html#transportlbtrm", [
        [ "NAK Suppression", "transporttypes.html#naksuppression", null ],
        [ "Comparing LBT-RM and PGM", "transporttypes.html#comparinglbtrmndpgm", null ]
      ] ],
      [ "Transport LBT-IPC", "transporttypes.html#transportlbtipc", [
        [ "Sources and LBT-IPC", "transporttypes.html#sourcesandlbtipc", null ],
        [ "Receivers and LBT-IPC", "transporttypes.html#receiversandlbtipc", null ],
        [ "Similarities with Other UM Transports", "transporttypes.html#similaritieswithotherumtransports", null ],
        [ "Differences from Other UM Transports", "transporttypes.html#differencesfromotherumtransports", null ],
        [ "Sending to Both Local and Remote Receivers", "transporttypes.html#sendingtobothlocalandremotereceivers", null ],
        [ "LBT-IPC Configuration Example", "transporttypes.html#lbtipcconfigurationexample", null ],
        [ "Required privileges", "transporttypes.html#requiredprivileges", null ],
        [ "Host Resource Usage and Limits", "transporttypes.html#hostresourceusageandlimits", null ],
        [ "LBT-IPC Resource Manager", "transporttypes.html#lbtipcresourcemanager", null ]
      ] ],
      [ "Transport LBT-SMX", "transporttypes.html#transportlbtsmx", [
        [ "Sources and LBT-SMX", "transporttypes.html#sourcesandlbtsmx", null ],
        [ "Sending with SMX-specific APIs", "transporttypes.html#sendingoverlbtsmxwithnativeapis", null ],
        [ "Sending over LBT-SMX with General APIs", "transporttypes.html#sendingoverlbtsmxwithexistingapis", null ],
        [ "Receivers and LBT-SMX", "transporttypes.html#receiversandlbtsmx", null ],
        [ "Similarities Between LBT-SMX and Other UM Transports", "transporttypes.html#similaritiesbetweenlbtsmxandotherumtransports", null ],
        [ "Differences Between LBT-SMX and Other UM Transports", "transporttypes.html#differencesbetweenlbtsmxandotherumtransports", null ],
        [ "LBT-SMX Configuration Example", "transporttypes.html#lbtsmxconfigurationexample", null ],
        [ "Java Coding for LBT-SMX", "transporttypes.html#javacodeexamplesforlbtsmx", null ],
        [ ".NET Coding for LBT-SMX", "transporttypes.html#netcodeexamplesforlbtsmx", null ],
        [ "LBT-SMX Resource Manager", "transporttypes.html#lbtsmxresourcemanager", null ]
      ] ],
      [ "Transport Broker", "transporttypes.html#transportbroker", null ]
    ] ],
    [ "Topic Resolution Description", "topicresolutiondescription.html", [
      [ "Resolver Caches", "topicresolutiondescription.html#resolvercaches", [
        [ "Source Resolver Cache", "topicresolutiondescription.html#sourceresolvercache", null ],
        [ "Receiver Resolver Cache", "topicresolutiondescription.html#receiverresolvercache", null ]
      ] ],
      [ "TR Protocol Comparison", "topicresolutiondescription.html#trprotocolcomparison", [
        [ "Multicast UDP TR", "topicresolutiondescription.html#multicastudptr", null ],
        [ "Unicast UDP TR", "topicresolutiondescription.html#unicastudptr", null ],
        [ "TCP TR", "topicresolutiondescription.html#tcptr", null ]
      ] ],
      [ "TCP-Based Topic Resolution Details", "topicresolutiondescription.html#tcpbasedtopicresolutiondetails", [
        [ "TCP-Based TR and Fault Tolerance", "topicresolutiondescription.html#tcpbasedtrandfaulttolerance", null ],
        [ "TCP-Based TR Interest", "topicresolutiondescription.html#tcpbasedtrinterest", null ],
        [ "TCP-Based TR Version Interoperability", "topicresolutiondescription.html#tcpbasedtrversioninteroperability", null ],
        [ "TCP-Based TR Configuration", "topicresolutiondescription.html#tcpbasedtrconfiguration", null ],
        [ "SRS Service", "topicresolutiondescription.html#srsservice", null ]
      ] ],
      [ "SRS Monitoring", "topicresolutiondescription.html#srsmonitoring", [
        [ "SRS Monitoring: Logs", "topicresolutiondescription.html#srsmonitoringlogs", null ],
        [ "SRS Monitoring: Daemon Stats", "topicresolutiondescription.html#srsmonitoringdaemonstats", null ]
      ] ]
    ] ],
    [ "Architecture", "architecture.html", [
      [ "UDP-Based Topic Resolution Details", "architecture.html#udpbasedtopicresolutiondetails", [
        [ "Sources Advertise", "architecture.html#sourcesadvertise", null ],
        [ "Receivers Query", "architecture.html#receiversquery", null ],
        [ "Wildcard Receiver Topic Resolution", "architecture.html#wildcardreceivertopicresolution", null ],
        [ "Initial Phase", "architecture.html#initialphase", null ],
        [ "Sustaining Phase", "architecture.html#sustainingphase", null ],
        [ "Quiescent Phase", "architecture.html#quiescentphase", null ],
        [ "Store (context) Name Resolution", "architecture.html#storecontextnameresolution", null ],
        [ "UDP Topic Resolution Configuration Options", "architecture.html#udptopicresolutionconfigurationoptions", null ],
        [ "Unicast UDP Topic Resolution", "architecture.html#unicasttopicresolution", null ],
        [ "Network Address Translation (NAT)", "architecture.html#networkaddresstranslationnat", null ],
        [ "Example NAT Configuration", "architecture.html#examplenatconfiguration", null ]
      ] ],
      [ "UDP-Based Topic Resolution Strategies", "architecture.html#udpbasedtopicresolutionstrategies", [
        [ "Default TR", "architecture.html#defaulttr", null ],
        [ "Query-Centric TR", "architecture.html#querycentrictr", null ],
        [ "Known Query Threshold TR", "architecture.html#knownquerythresholdtr", null ],
        [ "Advertise-Centric TR", "architecture.html#advertisecentrictr", null ]
      ] ],
      [ "UM Software Stack", "architecture.html#umsoftwarestack", [
        [ "Delivery Controller", "architecture.html#deliverycontroller", null ]
      ] ],
      [ "Embedded Mode", "architecture.html#embeddedmode", null ],
      [ "Sequential Mode", "architecture.html#sequentialmode", [
        [ "Context Sequential Mode", "architecture.html#contextsequentialmode", null ],
        [ "XSP Sequential Mode", "architecture.html#xspsequentialmode", null ],
        [ "IPC Sequential Mode", "architecture.html#ipcsequentialmode", null ],
        [ "Other Specialized Threads", "architecture.html#otherspecializedthreads", null ]
      ] ],
      [ "Message Batching", "architecture.html#messagebatching", [
        [ "Implicit Batching", "architecture.html#implicitbatching", null ],
        [ "Intelligent Batching", "architecture.html#intelligentbatching", null ],
        [ "Application Batching", "architecture.html#applicationbatching", null ],
        [ "Explicit Batching", "architecture.html#explicitbatching", null ],
        [ "Adaptive Batching", "architecture.html#adaptivebatching", null ]
      ] ],
      [ "Message Fragmentation and Reassembly", "architecture.html#messagefragmentationandreassembly", [
        [ "Datagram Max Sizes", "architecture.html#datagrammaxsizes", null ],
        [ "Datagram Max Size and Network MTU", "architecture.html#datagrammaxsizeandnetworkmtu", null ],
        [ "Setting Datagram Max Sizes High", "architecture.html#datagramsandkernelbypassnetworkdrivers", null ],
        [ "Dynamic Fragmentation Reduction", "architecture.html#dynamicfragmentationreduction", null ]
      ] ],
      [ "Ordered Delivery", "architecture.html#ordereddelivery", [
        [ "Sequence Number Order, Fragments Reassembled (Default Mode)", "architecture.html#sequencenumberorderfragmentsreassembleddefaultmode", null ],
        [ "Arrival Order, Fragments Reassembled", "architecture.html#arrivalorderfragmentsreassembled", null ],
        [ "Arrival Order, Fragments Not Reassembled", "architecture.html#arrivalorderfragmentsnotreassembled", null ]
      ] ],
      [ "Loss Detection Using TSNIs", "architecture.html#lossdetectionusingtsnis", null ],
      [ "Receiver Keepalive Using Session Messages", "architecture.html#receiverkeepaliveusingsesssionmessages", null ],
      [ "Extended Messaging Example", "architecture.html#extendedmessagingexample", [
        [ "Example: First Message", "architecture.html#examplefirstmessage", null ],
        [ "Example: Batching", "architecture.html#examplebatching", null ],
        [ "Example: UM Fragmentation", "architecture.html#exampleumfragmentation", null ],
        [ "Example: Loss Recovery", "architecture.html#examplelossrecovery", null ],
        [ "Example: Unrecoverable Loss", "architecture.html#exampleunrecoverableloss", null ],
        [ "Example: Transport Deletion", "architecture.html#exampletransportdeletion", null ]
      ] ]
    ] ],
    [ "Application Design Principles", "applicationdesignprinciples.html", [
      [ "UM Monitoring", "applicationdesignprinciples.html#ummonitoring", null ],
      [ "Message Reception", "applicationdesignprinciples.html#messagereception", [
        [ "C Message Reception", "applicationdesignprinciples.html#cmessagereception", null ],
        [ "Java Message Reception", "applicationdesignprinciples.html#javamessagereception", null ],
        [ ".NET Message Reception", "applicationdesignprinciples.html#netmessagereception", null ]
      ] ]
    ] ],
    [ "UM Features", "umfeatures.html", [
      [ "Transport Services Provider (XSP)", "umfeatures.html#transportservicesproviderxsp", [
        [ "XSP Handles Transport Sessions, Not Topics", "umfeatures.html#xsphandlestransportsessionsnottopics", null ],
        [ "XSP Threading Considerations", "umfeatures.html#xspthreadingconsiderations", null ],
        [ "XSP Usage", "umfeatures.html#xspusage", null ],
        [ "Other XSP Operations", "umfeatures.html#otherxspoperations", null ],
        [ "XSP Limitations", "umfeatures.html#xsplimitations", null ]
      ] ],
      [ "Using Late Join", "umfeatures.html#usinglatejoin", [
        [ "Late Join With Persistence", "umfeatures.html#latejoinwithump", null ],
        [ "Late Join Options Summary", "umfeatures.html#latejoinoptionssummary", null ],
        [ "Using Default Late Join Options", "umfeatures.html#usingdefaultlatejoinoptions", null ],
        [ "Specifying a Range of Messages to Retransmit", "umfeatures.html#specifyingarangeofmessagestoretransmit", null ],
        [ "Retransmitting Only Recent Messages", "umfeatures.html#retransmittingonlyrecentmessages", null ],
        [ "Configuring Late Join for Large Numbers of Messages", "umfeatures.html#configuringlatejoinforlargenumbersofmessages", null ]
      ] ],
      [ "Off-Transport Recovery (OTR)", "umfeatures.html#offtransportrecoveryotr", [
        [ "OTR with Sequence Number Ordered Delivery", "umfeatures.html#otrwithsequencenumberordereddelivery", null ],
        [ "OTR With Persistence", "umfeatures.html#otrwithump", null ],
        [ "OTR Options Summary", "umfeatures.html#otroptionssummary", null ]
      ] ],
      [ "Encrypted TCP", "umfeatures.html#encryptedtcp", [
        [ "TLS Authentication", "umfeatures.html#tlsauthentication", null ],
        [ "TLS Backwards Compatibility", "umfeatures.html#tlsbackwardscompatibility", null ],
        [ "TLS Efficiency", "umfeatures.html#tlsefficiency", null ],
        [ "TLS Configuration", "umfeatures.html#tlsconfiguration", null ],
        [ "TLS Options Summary", "umfeatures.html#tlsoptionssummary", null ],
        [ "TLS and Persistence", "umfeatures.html#tlsandpersistence", null ],
        [ "TLS and Queuing", "umfeatures.html#tlsandqueuing", null ],
        [ "TLS and the DRO", "umfeatures.html#tlsandthedynamicroutingoptiondro", null ],
        [ "TLS and Compression", "umfeatures.html#tlsandcompression", null ],
        [ "OpenSSL Dependency", "umfeatures.html#openssldependency", null ]
      ] ],
      [ "Compressed TCP", "umfeatures.html#compressedtcp", [
        [ "Compression Configuration", "umfeatures.html#compressionconfiguration", null ],
        [ "Compression and Persistence", "umfeatures.html#compressionandpersistence", null ],
        [ "Compression and Queuing", "umfeatures.html#compressionandqueuing", null ],
        [ "Compression and the DRO", "umfeatures.html#compressionandthedynamicroutingoptiondro", null ],
        [ "Compression and Encryption", "umfeatures.html#compressionandencryption", null ],
        [ "Version Interoperability", "umfeatures.html#versioninteroperability", null ]
      ] ],
      [ "High-resolution Timestamps", "umfeatures.html#highresolutiontimestamps", [
        [ "Timestamp Restrictions", "umfeatures.html#timestamprestrictions", null ],
        [ "Timestamp Configuration Summary", "umfeatures.html#timestampconfigurationsummary", null ]
      ] ],
      [ "Unicast Immediate Messaging", "umfeatures.html#unicastimmediatemessaging", [
        [ "UIM Reliability", "umfeatures.html#uimreliability", null ],
        [ "UIM Addressing", "umfeatures.html#uimaddressing", null ],
        [ "Receiving a UIM", "umfeatures.html#receivingauim", null ],
        [ "Sending a UIM", "umfeatures.html#sendingauim", null ],
        [ "UIM Connection Management", "umfeatures.html#uimconnectionmanagement", null ]
      ] ],
      [ "Multicast Immediate Messaging", "umfeatures.html#multicastimmediatemessaging", [
        [ "Temporary Transport Session", "umfeatures.html#temporarytransportsession", null ],
        [ "MIM Notifications", "umfeatures.html#mimnotifications", null ],
        [ "Receiving Immediate Messages", "umfeatures.html#receivingimmediatemessages", null ],
        [ "MIM and Wildcard Receivers", "umfeatures.html#mimandwildcardreceivers", null ],
        [ "MIM Loss Handling", "umfeatures.html#mimlosshandling", null ],
        [ "MIM Configuration", "umfeatures.html#mimconfiguration", null ],
        [ "MIM Example Applications", "umfeatures.html#mimexampleapplications", null ]
      ] ],
      [ "HyperTopics", "umfeatures.html#hypertopics", null ],
      [ "Application Headers", "umfeatures.html#applicationheaders", [
        [ "Application Headers Usage", "umfeatures.html#applicationheadersusage", null ]
      ] ],
      [ "Message Properties", "umfeatures.html#messageproperties", [
        [ "Message Properties Usage", "umfeatures.html#messagepropertiesusage", null ],
        [ "Message Properties Data Types", "umfeatures.html#messagepropertiesdatatypes", null ],
        [ "Message Properties Performance Considerations", "umfeatures.html#messagepropertiesperformanceconsiderations", null ],
        [ "Smart Sources and Message Properties", "umfeatures.html#smartsourcesandmessageproperties", null ],
        [ "Smart Source Message Properties Usage", "umfeatures.html#smartsourcemessagepropertiesusage", null ]
      ] ],
      [ "Request/Response Model", "umfeatures.html#requestresponsemodel", [
        [ "Request Message", "umfeatures.html#requestmessage", null ],
        [ "Response Message", "umfeatures.html#responsemessage", null ],
        [ "TCP Management", "umfeatures.html#tcpmanagement", null ],
        [ "Request/Response Configuration", "umfeatures.html#requestresponseconfiguration", null ],
        [ "Request/Response Example Applications", "umfeatures.html#requestresponseexampleapplications", null ]
      ] ],
      [ "Self Describing Messaging", "umfeatures.html#selfdescribingmessaging", null ],
      [ "Pre-Defined Messages", "umfeatures.html#predefinedmessages", [
        [ "Typical PDM Usage Patterns", "umfeatures.html#typicalpdmusagepatterns", null ],
        [ "Getting Started with PDM", "umfeatures.html#gettingstartedwithpdm", null ],
        [ "Using the PDM API", "umfeatures.html#usingthepdmapi", null ],
        [ "Migrating from SDM", "umfeatures.html#migratingfromsdm", null ]
      ] ],
      [ "Sending to Sources", "umfeatures.html#sendingtosources", [
        [ "Source String from Receive Event", "umfeatures.html#sourcestringfromreceiveevent", null ],
        [ "Source String from Source Notification Function", "umfeatures.html#sourcestringfromsourcenotificationfunction", null ],
        [ "Sending to Source Readiness", "umfeatures.html#sendingtosourcereadiness", null ]
      ] ],
      [ "Spectrum", "umfeatures.html#spectrum", [
        [ "Spectrum Performance Advantages", "umfeatures.html#spectrumperformanceadvantages", null ],
        [ "Spectrum Configuration Options", "umfeatures.html#spectrumconfigurationoptions", null ],
        [ "Spectrum Receiver Callback", "umfeatures.html#spectrumreceivercallback", null ],
        [ "Smart Sources and Spectrum", "umfeatures.html#smartsourcesandspectrum", null ]
      ] ],
      [ "Hot Failover (HF)", "umfeatures.html#hotfailoverhf", [
        [ "Implementing Hot Failover Sources", "umfeatures.html#implementinghotfailoversources", null ],
        [ "Implementing Hot Failover Receivers", "umfeatures.html#implementinghotfailoverreceivers", null ],
        [ "Implementing Hot Failover Wildcard Receivers", "umfeatures.html#implementinghotfailoverwildcardreceivers", null ],
        [ "Java and .NET", "umfeatures.html#javaandnet", null ],
        [ "Using Hot Failover with Persistence", "umfeatures.html#usinghotfailoverwithpersistence", null ],
        [ "Hot Failover Intentional Gap Support", "umfeatures.html#hotfailoverintentionalgapsupport", null ],
        [ "Hot Failover Optional Messages", "umfeatures.html#hotfailoveroptionalmessages", null ],
        [ "Using Hot Failover with Ordered Delivery", "umfeatures.html#usinghotfailoverwithordereddelivery", null ],
        [ "Hot Failover Across Multiple Contexts (HFX)", "umfeatures.html#hotfailoveracrossmultiplecontexts", null ]
      ] ],
      [ "Binary Daemon Statistics", "umfeatures.html#binarydaemonstatistics", [
        [ "Daemon Controller", "umfeatures.html#daemoncontroller", null ],
        [ "Daemon Statistics Structures", "umfeatures.html#daemonstatisticsstructures", null ],
        [ "Daemon Statistics Binary Data", "umfeatures.html#daemonstatisticsbinarydata", null ],
        [ "Daemon Statistics Versioning", "umfeatures.html#daemonstatisticsversioning", null ],
        [ "Daemon Control Requests", "umfeatures.html#daemoncontrolrequests", null ],
        [ "Securing Daemon Control Requests", "umfeatures.html#securingdaemoncontrolrequests", null ],
        [ "Daemon Statistics Details", "umfeatures.html#daemonstatisticsdetails", null ]
      ] ]
    ] ],
    [ "Advanced Optimizations", "advancedoptimizations.html", [
      [ "Receive Thread Busy Waiting", "advancedoptimizations.html#receivethreadbusywaiting", [
        [ "Network Socket Busy Waiting", "advancedoptimizations.html#networksocketbusywaiting", null ],
        [ "IPC Transport Busy Waiting", "advancedoptimizations.html#ipctransportbusywaiting", null ],
        [ "SMX Transport Busy Waiting", "advancedoptimizations.html#smxtransportbusywaiting", null ]
      ] ],
      [ "Zero Object Delivery", "advancedoptimizations.html#zeroobjectdelivery", null ],
      [ "Receive Buffer Recycling", "advancedoptimizations.html#receivebufferrecycling", [
        [ "Receive Buffer Recycling Restrictions", "advancedoptimizations.html#receivebufferrecyclingrestrictions", null ]
      ] ],
      [ "Single Receiving Thread", "advancedoptimizations.html#singlereceivingthread", [
        [ "Single Receiving Thread Restrictions", "advancedoptimizations.html#singlereceivingthreadrestrictions", null ]
      ] ],
      [ "Extended Context Process Events", "advancedoptimizations.html#lbmcontextprocesseventsex", [
        [ "Context Lock Reduction", "advancedoptimizations.html#contextlockreduction", null ],
        [ "Context Lock Reduction Restrictions", "advancedoptimizations.html#contextlockreductionrestrictions", null ],
        [ "Gettimeofday Reduction", "advancedoptimizations.html#gettimeofdayreduction", null ],
        [ "Gettimeofday Reduction Restrictions", "advancedoptimizations.html#gettimeofdayreductionrestrictions", null ]
      ] ],
      [ "Receive Multiple Datagrams", "advancedoptimizations.html#receivemultipledatagrams", [
        [ "Receive Multiple Datagrams Compatibility", "advancedoptimizations.html#receivemultipledatagramscompatibility", null ],
        [ "Receive Multiple Datagrams Restrictions", "advancedoptimizations.html#receivemultipledatagramsrestrictions", null ]
      ] ],
      [ "Transport Demultiplexer Table Size", "advancedoptimizations.html#transportdemultiplexertablesize", null ],
      [ "Smart Sources", "advancedoptimizations.html#smartsources", [
        [ "Smart Source Message Buffers", "advancedoptimizations.html#smartsourcemessagebuffers", null ],
        [ "Smart Sources and Memory Management", "advancedoptimizations.html#smartsourcesandmemorymanagement", null ],
        [ "Smart Sources Configuration", "advancedoptimizations.html#smartsourceconfiguration", null ],
        [ "Smart Source Defensive Checks", "advancedoptimizations.html#smartsourcedefensivechecks", null ],
        [ "Smart Sources Restrictions", "advancedoptimizations.html#smartsourcerestrictions", null ]
      ] ],
      [ "Zero-Copy Send API", "advancedoptimizations.html#zerocopysendapi", [
        [ "Zero-Copy Send Compatibility", "advancedoptimizations.html#zerocopysendcompatibility", null ],
        [ "Zero-Copy Restrictions", "advancedoptimizations.html#zerocopyrestrictions", null ]
      ] ],
      [ "Comparison of Zero Copy and Smart Sources", "advancedoptimizations.html#comparisonofzerocopyandsmartsources", null ],
      [ "XSP Latency Reduction", "advancedoptimizations.html#xsplatencyreduction", null ],
      [ "Receive-Side Batching", "advancedoptimizations.html#receivesidebatching", null ],
      [ "Core Pinning", "advancedoptimizations.html#corepinning", null ],
      [ "Memory Latency Reduction", "advancedoptimizations.html#memorylatencyreduction", null ]
    ] ],
    [ "Man Pages for SRS", "manpagesforsrs.html", [
      [ "SRS Man Page", "manpagesforsrs.html#srsmanpage", null ],
      [ "Srsds Man Page", "manpagesforsrs.html#srsdsmanpage", null ]
    ] ],
    [ "SRS Configuration File", "srsconfigurationfile.html", [
      [ "SRS Configuration Elements", "srsconfigurationfile.html#srsconfigurationelements", [
        [ "SRS Element \"<um-srs>\"", "srsconfigurationfile.html#srselementumsrs", null ],
        [ "SRS Element \"<daemon-monitor>\"", "srsconfigurationfile.html#srselementdaemonmonitor", null ],
        [ "SRS Element \"<monitor-format>\"", "srsconfigurationfile.html#srselementmonitorformat", null ],
        [ "SRS Element \"<remote-config-changes-request>\"", "srsconfigurationfile.html#srselementremoteconfigchangesrequest", null ],
        [ "SRS Element \"<remote-snapshot-request>\"", "srsconfigurationfile.html#srselementremotesnapshotrequest", null ],
        [ "SRS Element \"<publish-connection-events>\"", "srsconfigurationfile.html#srselementpublishconnectionevents", null ],
        [ "SRS Element \"<lbm-attributes>\"", "srsconfigurationfile.html#srselementlbmattributes", null ],
        [ "SRS Element \"<option>\"", "srsconfigurationfile.html#srselementoption", null ],
        [ "SRS Element \"<publishing-interval>\"", "srsconfigurationfile.html#srselementpublishinginterval", null ],
        [ "SRS Element \"<internal-config-opts>\"", "srsconfigurationfile.html#srselementinternalconfigopts", null ],
        [ "SRS Element \"<config-opts>\"", "srsconfigurationfile.html#srselementconfigopts", null ],
        [ "SRS Element \"<um-client-error-stats>\"", "srsconfigurationfile.html#srselementumclienterrorstats", null ],
        [ "SRS Element \"<srs-error-stats>\"", "srsconfigurationfile.html#srselementsrserrorstats", null ],
        [ "SRS Element \"<connection-events>\"", "srsconfigurationfile.html#srselementconnectionevents", null ],
        [ "SRS Element \"<um-client-stats>\"", "srsconfigurationfile.html#srselementumclientstats", null ],
        [ "SRS Element \"<srs-stats>\"", "srsconfigurationfile.html#srselementsrsstats", null ],
        [ "SRS Element \"<default>\"", "srsconfigurationfile.html#srselementdefault", null ],
        [ "SRS Element \"<ping-interval>\"", "srsconfigurationfile.html#srselementpinginterval", null ],
        [ "SRS Element \"<debug-monitor>\"", "srsconfigurationfile.html#srselementdebugmonitor", null ],
        [ "SRS Element \"<enabled>\"", "srsconfigurationfile.html#srselementenabled", null ],
        [ "SRS Element \"<port>\"", "srsconfigurationfile.html#srselementport", null ],
        [ "SRS Element \"<interface>\"", "srsconfigurationfile.html#srselementinterface", null ],
        [ "SRS Element \"<srs>\"", "srsconfigurationfile.html#srselementsrs", null ],
        [ "SRS Element \"<application-id>\"", "srsconfigurationfile.html#srselementapplicationid", null ],
        [ "SRS Element \"<clientactor>\"", "srsconfigurationfile.html#srselementclientactor", null ],
        [ "SRS Element \"<batch-frame-max-datagram-size>\"", "srsconfigurationfile.html#srselementbatchframemaxdatagramsize", null ],
        [ "SRS Element \"<batch-frame-max-record-count>\"", "srsconfigurationfile.html#srselementbatchframemaxrecordcount", null ],
        [ "SRS Element \"<record-queue-service-interval>\"", "srsconfigurationfile.html#srselementrecordqueueserviceinterval", null ],
        [ "SRS Element \"<request-stream-max-msg-count>\"", "srsconfigurationfile.html#srselementrequeststreammaxmsgcount", null ],
        [ "SRS Element \"<namemap>\"", "srsconfigurationfile.html#srselementnamemap", null ],
        [ "SRS Element \"<shards>\"", "srsconfigurationfile.html#srselementshards", null ],
        [ "SRS Element \"<routemap>\"", "srsconfigurationfile.html#srselementroutemap", null ],
        [ "SRS Element \"<topicmap>\"", "srsconfigurationfile.html#srselementtopicmap", null ],
        [ "SRS Element \"<otidmap>\"", "srsconfigurationfile.html#srselementotidmap", null ],
        [ "SRS Element \"<source-leave-backoff>\"", "srsconfigurationfile.html#srselementsourceleavebackoff", null ],
        [ "SRS Element \"<context-name-state-lifetime>\"", "srsconfigurationfile.html#srselementcontextnamestatelifetime", null ],
        [ "SRS Element \"<route-state-lifetime>\"", "srsconfigurationfile.html#srselementroutestatelifetime", null ],
        [ "SRS Element \"<interest-state-lifetime>\"", "srsconfigurationfile.html#srselementintereststatelifetime", null ],
        [ "SRS Element \"<source-state-lifetime>\"", "srsconfigurationfile.html#srselementsourcestatelifetime", null ],
        [ "SRS Element \"<state-lifetime>\"", "srsconfigurationfile.html#srselementstatelifetime", null ],
        [ "SRS Element \"<daemon>\"", "srsconfigurationfile.html#srselementdaemon", null ],
        [ "SRS Element \"<pid-file>\"", "srsconfigurationfile.html#srselementpidfile", null ],
        [ "SRS Element \"<log>\"", "srsconfigurationfile.html#srselementlog", null ]
      ] ],
      [ "SRS XSD file", "srsconfigurationfile.html#srsxsdfile", null ]
    ] ],
    [ "SRS Daemon Statistics", "srsdaemonstatistics.html", [
      [ "Message Type: SRS_STATS", "srsdaemonstatistics.html#messagetypesrsstats", null ],
      [ "Message Type: SRS_ERROR_STATS", "srsdaemonstatistics.html#messagetypesrserrorstats", null ],
      [ "Message Type: UM_CLIENT_STATS", "srsdaemonstatistics.html#messagetypeumclientstats", null ],
      [ "Message Type: UM_CLIENT_ERROR_STATS", "srsdaemonstatistics.html#messagetypeumclienterrorstats", null ],
      [ "Message Type: CONNECTION_EVENTS", "srsdaemonstatistics.html#messagetypeconnectionevents", [
        [ "Message Subtype: UM_CLIENT_CONNECT", "srsdaemonstatistics.html#messagesubtypeumclientconnect", null ],
        [ "Message Subtype: UM_CLIENT_DISCONNECT", "srsdaemonstatistics.html#messagesubtypeumclientdisconnect", null ],
        [ "Message Subtypes: SIR and SDR", "srsdaemonstatistics.html#messagesubtypessirandsdr", null ]
      ] ],
      [ "Message Type: CONFIG_OPTS", "srsdaemonstatistics.html#messagetypeconfigopts", null ],
      [ "Message Type: INTERNAL_CONFIG_OPTS", "srsdaemonstatistics.html#messagetypeinternalconfigopts", null ],
      [ "Request Type: REPORT_SRS_VERSION", "srsdaemonstatistics.html#requesttypereportsrsversion", null ],
      [ "Request Type: REPORT_MONITOR_INFO", "srsdaemonstatistics.html#requesttypereportmonitorinfo", null ],
      [ "Request Type: SET_PUBLISHING_INTERVAL", "srsdaemonstatistics.html#requesttypesetpublishinginterval", null ]
    ] ],
    [ "Man Pages for Lbmrd", "manpagesforlbmrd.html", [
      [ "Lbmrd Man Page", "manpagesforlbmrd.html#lbmrdmanpage", null ],
      [ "Lbmrds Man Page", "manpagesforlbmrd.html#lbmrdsmanpage", null ]
    ] ],
    [ "lbmrd Configuration File", "lbmrdconfigurationfile.html", [
      [ "lbmrd Configuration Elements", "lbmrdconfigurationfile.html#lbmrdconfigurationelements", [
        [ "LBMRD Element \"<lbmrd>\"", "lbmrdconfigurationfile.html#lbmrdelementlbmrd", null ],
        [ "LBMRD Element \"<transformations>\"", "lbmrdconfigurationfile.html#lbmrdelementtransformations", null ],
        [ "LBMRD Element \"<transform>\"", "lbmrdconfigurationfile.html#lbmrdelementtransform", null ],
        [ "LBMRD Element \"<rule>\"", "lbmrdconfigurationfile.html#lbmrdelementrule", null ],
        [ "LBMRD Element \"<replace>\"", "lbmrdconfigurationfile.html#lbmrdelementreplace", null ],
        [ "LBMRD Element \"<match>\"", "lbmrdconfigurationfile.html#lbmrdelementmatch", null ],
        [ "LBMRD Element \"<domains>\"", "lbmrdconfigurationfile.html#lbmrdelementdomains", null ],
        [ "LBMRD Element \"<domain>\"", "lbmrdconfigurationfile.html#lbmrdelementdomain", null ],
        [ "LBMRD Element \"<network>\"", "lbmrdconfigurationfile.html#lbmrdelementnetwork", null ],
        [ "LBMRD Element \"<daemon>\"", "lbmrdconfigurationfile.html#lbmrdelementdaemon", null ],
        [ "LBMRD Element \"<resolver_unicast_send_socket_buffer>\"", "lbmrdconfigurationfile.html#lbmrdelementresolver_unicast_send_socket_buffer", null ],
        [ "LBMRD Element \"<resolver_unicast_receiver_socket_buffer>\"", "lbmrdconfigurationfile.html#lbmrdelementresolver_unicast_receiver_socket_buffer", null ],
        [ "LBMRD Element \"<log>\"", "lbmrdconfigurationfile.html#lbmrdelementlog", null ],
        [ "LBMRD Element \"<ttl>\"", "lbmrdconfigurationfile.html#lbmrdelementttl", null ],
        [ "LBMRD Element \"<port>\"", "lbmrdconfigurationfile.html#lbmrdelementport", null ],
        [ "LBMRD Element \"<interface>\"", "lbmrdconfigurationfile.html#lbmrdelementinterface", null ],
        [ "LBMRD Element \"<activity>\"", "lbmrdconfigurationfile.html#lbmrdelementactivity", null ]
      ] ],
      [ "Dummy lbmrd Configuration File", "lbmrdconfigurationfile.html#dummylbmrdconfigurationfile", null ],
      [ "Lbmrd DTD file", "lbmrdconfigurationfile.html#lbmrddtdfile", null ]
    ] ],
    [ "Packet Loss", "packetloss.html", [
      [ "Design to Prevent Loss", "packetloss.html#designtopreventloss", [
        [ "Decrease Packet Flow through Loss Points", "packetloss.html#decreasepacketflowthroughlosspoints", null ],
        [ "Increase Efficiency of Packet Consumers", "packetloss.html#increaseefficiencyofpacketconsumers", null ]
      ] ],
      [ "UM Recovery of Lost Packets", "packetloss.html#umrecoveryoflostpackets", null ],
      [ "Packet Loss Points", "packetloss.html#packetlosspoints", [
        [ "Loss: Switch Egress Port", "packetloss.html#lossswitchegressport", null ],
        [ "Loss: NIC Ring Buffer", "packetloss.html#lossnicringbuffer", null ],
        [ "Loss: Socket Buffer", "packetloss.html#losssocketbuffer", null ],
        [ "Loss: Other", "packetloss.html#lossother", null ]
      ] ],
      [ "Verifying Loss Detection Tools", "packetloss.html#verifyinglossdetectiontools", [
        [ "Prepare to Verify", "packetloss.html#preparetoverify", null ],
        [ "Verifying Switch Loss", "packetloss.html#verifyingswitchloss", null ],
        [ "Verifying NIC Loss", "packetloss.html#verifyingnicloss", null ],
        [ "Verifying Socket Buffer Loss", "packetloss.html#verifyingsocketbufferloss", null ]
      ] ]
    ] ],
    [ "UM Glossary", "umglossary.html", [
      [ "Glossary A", "umglossary.html#glossarya", null ],
      [ "Glossary B", "umglossary.html#glossaryb", null ],
      [ "Glossary C", "umglossary.html#glossaryc", null ],
      [ "Glossary D", "umglossary.html#glossaryd", null ],
      [ "Glossary E", "umglossary.html#glossarye", null ],
      [ "Glossary F", "umglossary.html#glossaryf", null ],
      [ "Glossary G", "umglossary.html#glossaryg", null ],
      [ "Glossary H", "umglossary.html#glossaryh", null ],
      [ "Glossary I", "umglossary.html#glossaryi", null ],
      [ "Glossary J", "umglossary.html#glossaryj", null ],
      [ "Glossary K", "umglossary.html#glossaryk", null ],
      [ "Glossary L", "umglossary.html#glossaryl", null ],
      [ "Glossary M", "umglossary.html#glossarym", null ],
      [ "Glossary N", "umglossary.html#glossaryn", null ],
      [ "Glossary O", "umglossary.html#glossaryo", null ],
      [ "Glossary P", "umglossary.html#glossaryp", null ],
      [ "Glossary Q", "umglossary.html#glossaryq", null ],
      [ "Glossary R", "umglossary.html#glossaryr", null ],
      [ "Glossary S", "umglossary.html#glossarys", null ],
      [ "Glossary T", "umglossary.html#glossaryt", null ],
      [ "Glossary U", "umglossary.html#glossaryu", null ],
      [ "Glossary V", "umglossary.html#glossaryv", null ],
      [ "Glossary W", "umglossary.html#glossaryw", null ],
      [ "Glossary X", "umglossary.html#glossaryx", null ],
      [ "Glossary Z", "umglossary.html#glossaryz", null ]
    ] ]
  ] ]
];

var NAVTREEINDEX =
[
"advancedoptimizations.html",
"transporttypes.html#differencesbetweenlbtsmxandotherumtransports"
];

var SYNCONMSG = 'click to disable panel synchronisation';
var SYNCOFFMSG = 'click to enable panel synchronisation';