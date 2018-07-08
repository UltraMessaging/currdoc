var NAVTREE =
[
  [ "Concepts Guide", "index.html", [
    [ "Introduction", "index.html", null ],
    [ "Fundamental Concepts", "fundamentalconcepts.html", [
      [ "Topic Structure and Management", "fundamentalconcepts.html#topicstructureandmanagement", [
        [ "Topic Resolution Overview", "fundamentalconcepts.html#topicresolutionoverview", null ]
      ] ],
      [ "Persistence", "fundamentalconcepts.html#persistence", null ],
      [ "Queuing", "fundamentalconcepts.html#queuing", null ],
      [ "UM Router", "fundamentalconcepts.html#umrouter", null ],
      [ "Late Join", "fundamentalconcepts.html#latejoin", null ],
      [ "Request/Response", "fundamentalconcepts.html#requestresponse", null ],
      [ "UM Transports", "fundamentalconcepts.html#umtransports", [
        [ "Multi-Transport Threads", "fundamentalconcepts.html#multitransportthreads", null ]
      ] ],
      [ "Event Delivery", "fundamentalconcepts.html#eventdelivery", null ],
      [ "Rate Controls", "fundamentalconcepts.html#ratecontrols", [
        [ "Transport Rate Control", "fundamentalconcepts.html#transportratecontrol", null ],
        [ "Topic Resolution Rate Control", "fundamentalconcepts.html#topicresolutionratecontrol", null ]
      ] ],
      [ "Operational Statistics", "fundamentalconcepts.html#operationalstatistics", null ]
    ] ],
    [ "UM Objects", "umobjects.html", [
      [ "Context Object", "umobjects.html#contextobject", null ],
      [ "Topic Object", "umobjects.html#topicobject", null ],
      [ "Source Object", "umobjects.html#sourceobject", [
        [ "Source String", "umobjects.html#sourcestring", null ],
        [ "Source Configuration and Transport Sessions", "umobjects.html#sourceconfigurationandtransportsessions", null ],
        [ "Zero Object Delivery (Source)", "umobjects.html#zeroobjectdeliverysource", null ]
      ] ],
      [ "Receiver Object", "umobjects.html#receiverobject", [
        [ "Receiver Configuration and Transport Sessions", "umobjects.html#receiverconfigurationandtransportsessions", null ],
        [ "UM Wildcard Receivers", "umobjects.html#umwildcardreceivers", null ],
        [ "Transport Services Provider Object", "umobjects.html#transportservicesproviderobject", null ],
        [ "UM Hot Failover Across Contexts Objects", "umobjects.html#umhotfailoveracrosscontextsobjects", null ],
        [ "Zero Object Delivery", "umobjects.html#zeroobjectdelivery", null ]
      ] ],
      [ "Event Queue Object", "umobjects.html#eventqueueobject", null ]
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
      [ "Transport LBT-RDMA", "transporttypes.html#transportlbtrdma", [
        [ "Similarities with Other UM Transports", "transporttypes.html#similaritieswithotherumstransports", null ],
        [ "Differences from Other UM Transports", "transporttypes.html#differencesfromotherumstransports", null ],
        [ "Transport Broker", "transporttypes.html#transportbroker", null ]
      ] ]
    ] ],
    [ "Architecture", "architecture.html", [
      [ "Embedded Mode", "architecture.html#embeddedmode", null ],
      [ "Sequential Mode", "architecture.html#sequentialmode", null ],
      [ "Topic Resolution Description", "architecture.html#topicresolutiondescription", [
        [ "Multicast Topic Resolution", "architecture.html#multicasttopicresolution", null ],
        [ "Sources Advertise", "architecture.html#sourcesadvertise", null ],
        [ "Receivers Query", "architecture.html#receiversquery", null ],
        [ "Wildcard Receiver Topic Resolution", "architecture.html#wildcardreceivertopicresolution", null ],
        [ "Initial Phase", "architecture.html#initialphase", null ],
        [ "Sustaining Phase", "architecture.html#sustainingphase", null ],
        [ "Quiescent Phase", "architecture.html#quiescentphase", null ],
        [ "Store (context) Name Resolution", "architecture.html#storecontextnameresolution", null ],
        [ "Topic Resolution Configuration Options", "architecture.html#topicresolutionconfigurationoptions", null ],
        [ "Unicast Topic Resolution", "architecture.html#unicasttopicresolution", null ],
        [ "Network Address Translation (NAT)", "architecture.html#networkaddresstranslationnat", null ]
      ] ],
      [ "Message Batching", "architecture.html#messagebatching", [
        [ "Implicit Batching", "architecture.html#implicitbatching", null ],
        [ "Intelligent Batching", "architecture.html#intelligentbatching", null ],
        [ "Application Batching", "architecture.html#applicationbatching", null ],
        [ "Explicit Batching", "architecture.html#explicitbatching", null ],
        [ "Adaptive Batching", "architecture.html#adaptivebatching", null ]
      ] ],
      [ "Ordered Delivery", "architecture.html#ordereddelivery", [
        [ "Sequence Number Order, Fragments Reassembled (Default Mode)", "architecture.html#sequencenumberorderfragmentsreassembleddefaultmode", null ],
        [ "Arrival Order, Fragments Reassembled", "architecture.html#arrivalorderfragmentsreassembled", null ],
        [ "Arrival Order, Fragments Not Reassembled", "architecture.html#arrivalorderfragmentsnotreassembled", null ]
      ] ],
      [ "Loss Detection Using TSNIs", "architecture.html#lossdetectionusingtsnis", null ],
      [ "Receiver Keepalive Using Session Messages", "architecture.html#receiverkeepaliveusingsesssionmessages", null ]
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
      [ "Smart Sources", "umfeatures.html#smartsources", [
        [ "Smart Sources and Memory Management", "umfeatures.html#smartsourcesandmemorymanagement", null ],
        [ "Smart Sources Configuration", "umfeatures.html#smartsourceconfiguration", null ],
        [ "Smart Source Defensive Checks", "umfeatures.html#smartsourcedefensivechecks", null ],
        [ "Smart Sources Restrictions", "umfeatures.html#smartsourcerestrictions", null ]
      ] ],
      [ "Zero-Copy Send API", "umfeatures.html#zerocopysendapi", [
        [ "Zero-Copy Send Compatibility", "umfeatures.html#zerocopysendcompatibility", null ],
        [ "Zero-Copy Restrictions", "umfeatures.html#zerocopyrestrictions", null ]
      ] ],
      [ "Comparison of Zero Copy and Smart Sources", "umfeatures.html#comparisonofzerocopyandsmartsources", null ],
      [ "Encrypted TCP", "umfeatures.html#encryptedtcp", [
        [ "TLS Authentication", "umfeatures.html#tlsauthentication", null ],
        [ "TLS Backwards Compatibility", "umfeatures.html#tlsbackwardscompatibility", null ],
        [ "TLS Efficiency", "umfeatures.html#tlsefficiency", null ],
        [ "TLS Configuration", "umfeatures.html#tlsconfiguration", null ],
        [ "TLS Options Summary", "umfeatures.html#tlsoptionssummary", null ],
        [ "TLS and Persistence", "umfeatures.html#tlsandpersistence", null ],
        [ "TLS and Queuing", "umfeatures.html#tlsandqueuing", null ],
        [ "TLS and the Dynamic Routing Option (DRO)", "umfeatures.html#tlsandthedynamicroutingoptiondro", null ],
        [ "TLS and Compression", "umfeatures.html#tlsandcompression", null ]
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
      [ "Receive Multiple Datagrams", "umfeatures.html#receivemultipledatagrams", [
        [ "Receive Multiple Datagrams Compatibility", "umfeatures.html#receivemultipledatagramscompatibility", null ],
        [ "Receive Multiple Datagrams Restrictions", "umfeatures.html#receivemultipledatagramsrestrictions", null ]
      ] ],
      [ "Message Properties", "umfeatures.html#messageproperties", [
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
      [ "Multicast Immediate Messaging", "umfeatures.html#multicastimmediatemessaging", [
        [ "Temporary Transport Session", "umfeatures.html#temporarytransportsession", null ],
        [ "MIM Notifications", "umfeatures.html#mimnotifications", null ],
        [ "Receiving Immediate Messages", "umfeatures.html#receivingimmediatemessages", null ],
        [ "MIM and Wildcard Receivers", "umfeatures.html#mimandwildcardreceivers", null ],
        [ "Loss Handling", "umfeatures.html#losshandling", null ],
        [ "MIM Configuration", "umfeatures.html#mimconfiguration", null ],
        [ "MIM Example Applications", "umfeatures.html#mimexampleapplications", null ]
      ] ],
      [ "Spectrum", "umfeatures.html#spectrum", [
        [ "Spectrum Performance Advantages", "umfeatures.html#spectrumperformanceadvantages", null ],
        [ "Spectrum Configuration Options", "umfeatures.html#spectrumconfigurationoptions", null ],
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
        [ "Hot Failover Across Multiple Contexts", "umfeatures.html#hotfailoveracrossmultiplecontexts", null ]
      ] ],
      [ "Daemon Statistics", "umfeatures.html#daemonstatistics", [
        [ "Daemon Statistics Structures", "umfeatures.html#daemonstatisticsstructures", null ],
        [ "Daemon Statistics Binary Data", "umfeatures.html#daemonstatisticsbinarydata", null ],
        [ "Daemon Statistics Versioning", "umfeatures.html#daemonstatisticsversioning", null ],
        [ "Daemon Statistics Requests", "umfeatures.html#daemonstatisticsrequests", null ],
        [ "Daemon Statistics Details", "umfeatures.html#daemonstatisticsdetails", null ]
      ] ]
    ] ],
    [ "Manpage for lbmrd", "manpageforlbmrd.html", [
      [ "lbmrd Command Line", "manpageforlbmrd.html#lbmrdcommandline", null ],
      [ "lbmrd Configuration File", "manpageforlbmrd.html#lbmrdconfigurationfile", [
        [ "Dummy lbmrd Configuration File", "manpageforlbmrd.html#dummylbmrdconfigurationfile", null ]
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
"architecture.html"
];

var SYNCONMSG = 'click to disable panel synchronisation';
var SYNCOFFMSG = 'click to enable panel synchronisation';