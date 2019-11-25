var NAVTREE =
[
  [ "Concepts Guide", "index.html", [
    [ "Introduction", "index.html", null ],
    [ "Fundamental Concepts", "fundamentalconcepts.html", [
      [ "Topic Structure and Management", "fundamentalconcepts.html#topicstructureandmanagement", [
        [ "Message Ordering", "fundamentalconcepts.html#messageordering", null ],
        [ "Topic Resolution Overview", "fundamentalconcepts.html#topicresolutionoverview", null ],
        [ "Topic Resolution Domain", "fundamentalconcepts.html#topicresolutiondomain", null ]
      ] ],
      [ "Messaging Reliability", "fundamentalconcepts.html#messagingreliability", [
        [ "Head Loss", "fundamentalconcepts.html#headloss", null ],
        [ "Leading Loss", "fundamentalconcepts.html#leadingloss", null ],
        [ "Tail Loss", "fundamentalconcepts.html#tailloss", null ]
      ] ],
      [ "Persistence", "fundamentalconcepts.html#persistence", null ],
      [ "Queuing", "fundamentalconcepts.html#queuing", null ],
      [ "UM Router", "fundamentalconcepts.html#umrouter", null ],
      [ "Late Join", "fundamentalconcepts.html#latejoin", null ],
      [ "Request/Response", "fundamentalconcepts.html#requestresponse", null ],
      [ "UM Transports", "fundamentalconcepts.html#umtransports", [
        [ "Transport Sessions", "fundamentalconcepts.html#transportsessions", null ]
      ] ],
      [ "Event Delivery", "fundamentalconcepts.html#eventdelivery", null ],
      [ "Rate Controls", "fundamentalconcepts.html#ratecontrols", [
        [ "Transport Rate Control", "fundamentalconcepts.html#transportratecontrol", null ],
        [ "Topic Resolution Rate Control", "fundamentalconcepts.html#topicresolutionratecontrol", null ]
      ] ],
      [ "Operational Statistics", "fundamentalconcepts.html#operationalstatistics", null ],
      [ "Immediate Messaging", "fundamentalconcepts.html#immediatemessaging", null ],
      [ "Context Object", "fundamentalconcepts.html#contextobject", null ],
      [ "Topic Object", "fundamentalconcepts.html#topicobject", null ],
      [ "Source Object", "fundamentalconcepts.html#sourceobject", [
        [ "Source String", "fundamentalconcepts.html#sourcestring", null ],
        [ "Source Configuration and Transport Sessions", "fundamentalconcepts.html#sourceconfigurationandtransportsessions", null ],
        [ "Zero Object Delivery (Source)", "fundamentalconcepts.html#zeroobjectdeliverysource", null ]
      ] ],
      [ "Receiver Object", "fundamentalconcepts.html#receiverobject", [
        [ "Receiver Configuration and Transport Sessions", "fundamentalconcepts.html#receiverconfigurationandtransportsessions", null ],
        [ "UM Wildcard Receivers", "fundamentalconcepts.html#umwildcardreceivers", null ],
        [ "Transport Services Provider Object", "fundamentalconcepts.html#transportservicesproviderobject", null ],
        [ "UM Hot Failover Across Contexts Objects", "fundamentalconcepts.html#umhotfailoveracrosscontextsobjects", null ],
        [ "Zero Object Delivery", "fundamentalconcepts.html#zeroobjectdelivery", null ]
      ] ],
      [ "Event Queue Object", "fundamentalconcepts.html#eventqueueobject", null ],
      [ "Message Object", "fundamentalconcepts.html#messageobject", [
        [ "Message Object Deletion", "fundamentalconcepts.html#messageobjectdeletion", null ],
        [ "Message Object Retention", "fundamentalconcepts.html#messageobjectretention", null ]
      ] ],
      [ "Security Considerations", "fundamentalconcepts.html#securityconsiderations", [
        [ "Webmon Security", "fundamentalconcepts.html#webmonsecurity", null ]
      ] ]
    ] ],
    [ "Transport Types", "transporttypes.html", [
      [ "Transport TCP", "transporttypes.html#transporttcp", null ],
      [ "Transport LBT-RU", "transporttypes.html#transportlbtru", null ],
      [ "Transport LBT-RM", "transporttypes.html#transportlbtrm", null ],
      [ "Transport LBT-IPC", "transporttypes.html#transportlbtipc", [
        [ "LBT-IPC Shared Memory Area", "transporttypes.html#lbtipcsharedmemoryarea", null ],
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
        [ "Sending over LBT-SMX with Native APIs", "transporttypes.html#sendingoverlbtsmxwithnativeapis", null ],
        [ "Sending over LBT-SMX with Existing APIs", "transporttypes.html#sendingoverlbtsmxwithexistingapis", null ],
        [ "Receivers and LBT-SMX", "transporttypes.html#receiversandlbtsmx", null ],
        [ "Similarities Between LBT-SMX and Other UM Transports", "transporttypes.html#similaritiesbetweenlbtsmxandotherumtransports", null ],
        [ "Differences Between LBT-SMX and Other UM Transports", "transporttypes.html#differencesbetweenlbtsmxandotherumtransports", null ],
        [ "LBT-SMX Configuration Example", "transporttypes.html#lbtsmxconfigurationexample", null ],
        [ "Java Code Examples for LBT-SMX", "transporttypes.html#javacodeexamplesforlbtsmx", null ],
        [ ".NET Code Examples for LBT-SMX", "transporttypes.html#netcodeexamplesforlbtsmx", null ],
        [ "LBT-SMX Resource Manager", "transporttypes.html#lbtsmxresourcemanager", null ]
      ] ],
      [ "Transport Broker", "transporttypes.html#transportbroker", null ]
    ] ],
    [ "Topic Resolution Description", "topicresolutiondescription.html", [
      [ "TR Protocol Comparison", "topicresolutiondescription.html#trprotocolcomparison", [
        [ "Multicast UDP TR", "topicresolutiondescription.html#multicastudptr", null ],
        [ "Unicast UDP TR", "topicresolutiondescription.html#unicastudptr", null ],
        [ "TCP TR", "topicresolutiondescription.html#tcptr", null ]
      ] ],
      [ "UDP-Based Topic Resolution Details", "topicresolutiondescription.html#udpbasedtopicresolutiondetails", [
        [ "Sources Advertise", "topicresolutiondescription.html#sourcesadvertise", null ],
        [ "Receivers Query", "topicresolutiondescription.html#receiversquery", null ],
        [ "Wildcard Receiver Topic Resolution", "topicresolutiondescription.html#wildcardreceivertopicresolution", null ],
        [ "Initial Phase", "topicresolutiondescription.html#initialphase", null ],
        [ "Sustaining Phase", "topicresolutiondescription.html#sustainingphase", null ],
        [ "Quiescent Phase", "topicresolutiondescription.html#quiescentphase", null ],
        [ "Store (context) Name Resolution", "topicresolutiondescription.html#storecontextnameresolution", null ],
        [ "UDP Topic Resolution Configuration Options", "topicresolutiondescription.html#udptopicresolutionconfigurationoptions", null ],
        [ "Unicast Topic Resolution", "topicresolutiondescription.html#unicasttopicresolution", null ],
        [ "Network Address Translation (NAT)", "topicresolutiondescription.html#networkaddresstranslationnat", null ],
        [ "Example NAT Configuration", "topicresolutiondescription.html#examplenatconfiguration", null ]
      ] ],
      [ "UDP-Based Topic Resolution Strategies", "topicresolutiondescription.html#udpbasedtopicresolutionstrategies", [
        [ "Default TR", "topicresolutiondescription.html#defaulttr", null ],
        [ "Query-Centric TR", "topicresolutiondescription.html#querycentrictr", null ],
        [ "Known Query Threshold TR", "topicresolutiondescription.html#knownquerythresholdtr", null ],
        [ "Advertise-Centric TR", "topicresolutiondescription.html#advertisecentrictr", null ]
      ] ],
      [ "TCP-Based Topic Resolution Details", "topicresolutiondescription.html#tcpbasedtopicresolutiondetails", [
        [ "TCP-Based TR and Fault Tolerance", "topicresolutiondescription.html#tcpbasedtrandfaulttolerance", null ],
        [ "TCP-Based TR Version Interoperability", "topicresolutiondescription.html#tcpbasedtrversioninteroperability", null ],
        [ "TCP-Based TR Configuration", "topicresolutiondescription.html#tcpbasedtrconfiguration", null ],
        [ "SRS Service", "topicresolutiondescription.html#srsservice", null ]
      ] ]
    ] ],
    [ "Architecture", "architecture.html", [
      [ "UM Software Stack", "architecture.html#umsoftwarestack", [
        [ "Delivery Controller", "architecture.html#deliverycontroller", null ]
      ] ],
      [ "Embedded Mode", "architecture.html#embeddedmode", null ],
      [ "Sequential Mode", "architecture.html#sequentialmode", null ],
      [ "Message Batching", "architecture.html#messagebatching", [
        [ "Implicit Batching", "architecture.html#implicitbatching", null ],
        [ "Intelligent Batching", "architecture.html#intelligentbatching", null ],
        [ "Application Batching", "architecture.html#applicationbatching", null ],
        [ "Explicit Batching", "architecture.html#explicitbatching", null ],
        [ "Adaptive Batching", "architecture.html#adaptivebatching", null ]
      ] ],
      [ "Message Fragmentation and Reassembly", "architecture.html#messagefragmentationandreassembly", [
        [ "Datagram Max Size and Network MTU", "architecture.html#datagrammaxsizeandnetworkmtu", null ],
        [ "Datagrams and Kernel Bypass Network Drivers", "architecture.html#datagramsandkernelbypassnetworkdrivers", null ]
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
        [ "TLS and the Dynamic Routing Option (DRO)", "umfeatures.html#tlsandthedynamicroutingoptiondro", null ],
        [ "TLS and Compression", "umfeatures.html#tlsandcompression", null ],
        [ "OpenSSL Dependency", "umfeatures.html#openssldependency", null ]
      ] ],
      [ "Compressed TCP", "umfeatures.html#compressedtcp", [
        [ "Compression Configuration", "umfeatures.html#compressionconfiguration", null ],
        [ "Compression and Persistence", "umfeatures.html#compressionandpersistence", null ],
        [ "Compression and Queuing", "umfeatures.html#compressionandqueuing", null ],
        [ "Compression and the Dynamic Routing Option (DRO)", "umfeatures.html#compressionandthedynamicroutingoptiondro", null ],
        [ "Compression and Encryption", "umfeatures.html#compressionandencryption", null ],
        [ "Version Interoperability", "umfeatures.html#versioninteroperability", null ]
      ] ],
      [ "High-resolution Timestamps", "umfeatures.html#highresolutiontimestamps", [
        [ "Timestamp Restrictions", "umfeatures.html#timestamprestrictions", null ],
        [ "Timestamp Configuration Summary", "umfeatures.html#timestampconfigurationsummary", null ]
      ] ],
      [ "Unicast Immediate Messaging", "umfeatures.html#unicastimmediatemessaging", [
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
      ] ]
    ] ],
    [ "UM Objects", "umobjects.html", [
      [ "Message Properties", "umobjects.html#messageproperties", [
        [ "Message Properties Performance Considerations", "umobjects.html#messagepropertiesperformanceconsiderations", null ],
        [ "Smart Sources and Message Properties", "umobjects.html#smartsourcesandmessageproperties", null ],
        [ "Smart Source Message Properties Usage", "umobjects.html#smartsourcemessagepropertiesusage", null ]
      ] ],
      [ "Request/Response Model", "umobjects.html#requestresponsemodel", [
        [ "Request Message", "umobjects.html#requestmessage", null ],
        [ "Response Message", "umobjects.html#responsemessage", null ],
        [ "TCP Management", "umobjects.html#tcpmanagement", null ],
        [ "Request/Response Configuration", "umobjects.html#requestresponseconfiguration", null ],
        [ "Request/Response Example Applications", "umobjects.html#requestresponseexampleapplications", null ]
      ] ],
      [ "Self Describing Messaging", "umobjects.html#selfdescribingmessaging", null ],
      [ "Pre-Defined Messages", "umobjects.html#predefinedmessages", [
        [ "Typical PDM Usage Patterns", "umobjects.html#typicalpdmusagepatterns", null ],
        [ "Getting Started with PDM", "umobjects.html#gettingstartedwithpdm", null ],
        [ "Using the PDM API", "umobjects.html#usingthepdmapi", null ],
        [ "Migrating from SDM", "umobjects.html#migratingfromsdm", null ]
      ] ],
      [ "Sending to Sources", "umobjects.html#sendingtosources", [
        [ "Source String from Receive Event", "umobjects.html#sourcestringfromreceiveevent", null ],
        [ "Source String from Source Notification Function", "umobjects.html#sourcestringfromsourcenotificationfunction", null ],
        [ "Sending to Source Readiness", "umobjects.html#sendingtosourcereadiness", null ]
      ] ],
      [ "Spectrum", "umobjects.html#spectrum", [
        [ "Spectrum Performance Advantages", "umobjects.html#spectrumperformanceadvantages", null ],
        [ "Spectrum Configuration Options", "umobjects.html#spectrumconfigurationoptions", null ],
        [ "Smart Sources and Spectrum", "umobjects.html#smartsourcesandspectrum", null ]
      ] ],
      [ "Hot Failover (HF)", "umobjects.html#hotfailoverhf", [
        [ "Implementing Hot Failover Sources", "umobjects.html#implementinghotfailoversources", null ],
        [ "Implementing Hot Failover Receivers", "umobjects.html#implementinghotfailoverreceivers", null ],
        [ "Implementing Hot Failover Wildcard Receivers", "umobjects.html#implementinghotfailoverwildcardreceivers", null ],
        [ "Java and .NET", "umobjects.html#javaandnet", null ],
        [ "Using Hot Failover with Persistence", "umobjects.html#usinghotfailoverwithpersistence", null ],
        [ "Hot Failover Intentional Gap Support", "umobjects.html#hotfailoverintentionalgapsupport", null ],
        [ "Hot Failover Optional Messages", "umobjects.html#hotfailoveroptionalmessages", null ],
        [ "Using Hot Failover with Ordered Delivery", "umobjects.html#usinghotfailoverwithordereddelivery", null ],
        [ "Hot Failover Across Multiple Contexts", "umobjects.html#hotfailoveracrossmultiplecontexts", null ]
      ] ],
      [ "Daemon Statistics", "umobjects.html#daemonstatistics", [
        [ "Daemon Statistics Structures", "umobjects.html#daemonstatisticsstructures", null ],
        [ "Daemon Statistics Binary Data", "umobjects.html#daemonstatisticsbinarydata", null ],
        [ "Daemon Statistics Versioning", "umobjects.html#daemonstatisticsversioning", null ],
        [ "Daemon Statistics Requests", "umobjects.html#daemonstatisticsrequests", null ],
        [ "Daemon Statistics Details", "umobjects.html#daemonstatisticsdetails", null ]
      ] ]
    ] ],
    [ "Advanced Optimizations", "advancedoptimizations.html", [
      [ "Receive Thread Busy Waiting", "advancedoptimizations.html#receivethreadbusywaiting", [
        [ "Network Socket Busy Waiting", "advancedoptimizations.html#networksocketbusywaiting", null ],
        [ "IPC Transport Busy Waiting", "advancedoptimizations.html#ipctransportbusywaiting", null ],
        [ "SMX Transport Busy Waiting", "advancedoptimizations.html#smxtransportbusywaiting", null ]
      ] ],
      [ "Receive Buffer Recycling", "advancedoptimizations.html#receivebufferrecycling", [
        [ "Receive Buffer Recycling Restrictions", "advancedoptimizations.html#receivebufferrecyclingrestrictions", null ]
      ] ],
      [ "Single Receiving Thread", "advancedoptimizations.html#singlereceivingthread", [
        [ "Single Receiving Thread Restrictions", "advancedoptimizations.html#singlereceivingthreadrestrictions", null ]
      ] ],
      [ "lbm_context_process_events_ex", "advancedoptimizations.html#lbmcontextprocesseventsex", [
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
      [ "Comparison of Zero Copy and Smart Sources", "advancedoptimizations.html#comparisonofzerocopyandsmartsources", null ]
    ] ],
    [ "Man Pages for SRS", "manpagesforsrs.html", [
      [ "SRS Man Page", "manpagesforsrs.html#srsmanpage", null ],
      [ "Srsds Man Page", "manpagesforsrs.html#srsdsmanpage", null ]
    ] ],
    [ "SRS Configuration File", "srsconfigurationfile.html", [
      [ "SRS Configuration Elements", "srsconfigurationfile.html#srsconfigurationelements", [
        [ "SRS Element \"<um-srs>\"", "srsconfigurationfile.html#srselementumsrs", null ],
        [ "SRS Element \"<daemon-monitor>\"", "srsconfigurationfile.html#srselementdaemonmonitor", null ],
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
        [ "SRS Element \"<debug-monitor>\"", "srsconfigurationfile.html#srselementdebugmonitor", null ],
        [ "SRS Element \"<enabled>\"", "srsconfigurationfile.html#srselementenabled", null ],
        [ "SRS Element \"<ping-interval>\"", "srsconfigurationfile.html#srselementpinginterval", null ],
        [ "SRS Element \"<port>\"", "srsconfigurationfile.html#srselementport", null ],
        [ "SRS Element \"<interface>\"", "srsconfigurationfile.html#srselementinterface", null ],
        [ "SRS Element \"<srs>\"", "srsconfigurationfile.html#srselementsrs", null ],
        [ "SRS Element \"<clientactor>\"", "srsconfigurationfile.html#srselementclientactor", null ],
        [ "SRS Element \"<batch-frame-max-datagram-size>\"", "srsconfigurationfile.html#srselementbatchframemaxdatagramsize", null ],
        [ "SRS Element \"<batch-frame-max-record-count>\"", "srsconfigurationfile.html#srselementbatchframemaxrecordcount", null ],
        [ "SRS Element \"<source-info-queue-service-interval>\"", "srsconfigurationfile.html#srselementsourceinfoqueueserviceinterval", null ],
        [ "SRS Element \"<request-stream-max-msg-count>\"", "srsconfigurationfile.html#srselementrequeststreammaxmsgcount", null ],
        [ "SRS Element \"<otidmap>\"", "srsconfigurationfile.html#srselementotidmap", null ],
        [ "SRS Element \"<async-receiver-distribution>\"", "srsconfigurationfile.html#srselementasyncreceiverdistribution", null ],
        [ "SRS Element \"<shards>\"", "srsconfigurationfile.html#srselementshards", null ],
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
"umfeatures.html#encryptedtcp"
];

var SYNCONMSG = 'click to disable panel synchronisation';
var SYNCOFFMSG = 'click to enable panel synchronisation';