var NAVTREE =
[
  [ "Concepts Guide", "index.html", [
    [ "Introduction", "index.html#firstsect", null ],
    [ "Fundamental Concepts", "index.html#fundamentalconcepts", [
      [ "Topic Structure and Management", "index.html#topicstructureandmanagement", [
        [ "Topic Resolution Overview", "index.html#topicresolutionoverview", null ]
      ] ],
      [ "Persistence", "index.html#persistence", null ],
      [ "Queuing", "index.html#queuing", null ],
      [ "UM Router", "index.html#umrouter", null ],
      [ "Late Join", "index.html#latejoin", null ],
      [ "Request/Response", "index.html#requestresponse", null ],
      [ "UM Transports", "index.html#umtransports", [
        [ "Multi-Transport Threads", "index.html#multitransportthreads", null ]
      ] ],
      [ "Event Delivery", "index.html#eventdelivery", null ],
      [ "Rate Controls", "index.html#ratecontrols", [
        [ "Transport Rate Control", "index.html#transportratecontrol", null ],
        [ "Topic Resolution Rate Control", "index.html#topicresolutionratecontrol", null ]
      ] ],
      [ "Operational Statistics", "index.html#operationalstatistics", null ]
    ] ],
    [ "UM Objects", "index.html#umobjects", [
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
      [ "Event Queue Object", "index.html#eventqueueobject", null ]
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
      [ "Transport LBT-RDMA", "index.html#transportlbtrdma", [
        [ "Similarities with Other UM Transports", "index.html#similaritieswithotherumstransports", null ],
        [ "Differences from Other UM Transports", "index.html#differencesfromotherumstransports", null ],
        [ "Transport Broker", "index.html#transportbroker", null ]
      ] ]
    ] ],
    [ "Architecture", "index.html#architecture", [
      [ "Embedded Mode", "index.html#embeddedmode", null ],
      [ "Sequential Mode", "index.html#sequentialmode", null ],
      [ "Topic Resolution Description", "index.html#topicresolutiondescription", [
        [ "Multicast Topic Resolution", "index.html#multicasttopicresolution", null ],
        [ "Sources Advertise", "index.html#sourcesadvertise", null ],
        [ "Receivers Query", "index.html#receiversquery", null ],
        [ "Wildcard Receiver Topic Resolution", "index.html#wildcardreceivertopicresolution", null ],
        [ "Initial Phase", "index.html#initialphase", null ],
        [ "Sustaining Phase", "index.html#sustainingphase", null ],
        [ "Quiescent Phase", "index.html#quiescentphase", null ],
        [ "Store (context) Name Resolution", "index.html#storecontextnameresolution", null ],
        [ "Topic Resolution Configuration Options", "index.html#topicresolutionconfigurationoptions", null ],
        [ "Unicast Topic Resolution", "index.html#unicasttopicresolution", null ],
        [ "Network Address Translation (NAT)", "index.html#networkaddresstranslationnat", null ]
      ] ],
      [ "Message Batching", "index.html#messagebatching", [
        [ "Implicit Batching", "index.html#implicitbatching", null ],
        [ "Intelligent Batching", "index.html#intelligentbatching", null ],
        [ "Application Batching", "index.html#applicationbatching", null ],
        [ "Explicit Batching", "index.html#explicitbatching", null ],
        [ "Adaptive Batching", "index.html#adaptivebatching", null ]
      ] ],
      [ "Ordered Delivery", "index.html#ordereddelivery", [
        [ "Sequence Number Order, Fragments Reassembled (Default Mode)", "index.html#sequencenumberorderfragmentsreassembleddefaultmode", null ],
        [ "Arrival Order, Fragments Reassembled", "index.html#arrivalorderfragmentsreassembled", null ],
        [ "Arrival Order, Fragments Not Reassembled", "index.html#arrivalorderfragmentsnotreassembled", null ]
      ] ],
      [ "Loss Detection Using TSNIs", "index.html#lossdetectionusingtsnis", null ],
      [ "Receiver Keepalive Using Session Messages", "index.html#receiverkeepaliveusingsesssionmessages", null ]
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
      [ "Smart Sources", "index.html#smartsources", [
        [ "Smart Sources and Memory Management", "index.html#smartsourcesandmemorymanagement", null ],
        [ "Smart Sources Configuration", "index.html#smartsourceconfiguration", null ],
        [ "Smart Source Defensive Checks", "index.html#smartsourcedefensivechecks", null ],
        [ "Smart Sources Restrictions", "index.html#smartsourcerestrictions", null ]
      ] ],
      [ "Zero-Copy Send API", "index.html#zerocopysendapi", [
        [ "Zero-Copy Send Compatibility", "index.html#zerocopysendcompatibility", null ],
        [ "Zero-Copy Restrictions", "index.html#zerocopyrestrictions", null ]
      ] ],
      [ "Comparison of Zero Copy and Smart Sources", "index.html#comparisonofzerocopyandsmartsources", null ],
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
      [ "Receive Multiple Datagrams", "index.html#receivemultipledatagrams", [
        [ "Receive Multiple Datagrams Compatibility", "index.html#receivemultipledatagramscompatibility", null ],
        [ "Receive Multiple Datagrams Restrictions", "index.html#receivemultipledatagramsrestrictions", null ]
      ] ],
      [ "Message Properties", "index.html#messageproperties", [
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
      [ "Multicast Immediate Messaging", "index.html#multicastimmediatemessaging", [
        [ "Temporary Transport Session", "index.html#temporarytransportsession", null ],
        [ "MIM Notifications", "index.html#mimnotifications", null ],
        [ "Receiving Immediate Messages", "index.html#receivingimmediatemessages", null ],
        [ "MIM and Wildcard Receivers", "index.html#mimandwildcardreceivers", null ],
        [ "Loss Handling", "index.html#losshandling", null ],
        [ "MIM Configuration", "index.html#mimconfiguration", null ],
        [ "MIM Example Applications", "index.html#mimexampleapplications", null ]
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
    [ "Manpage for lbmrd", "index.html#manpageforlbmrd", [
      [ "lbmrd Command Line", "index.html#lbmrdcommandline", null ],
      [ "lbmrd Configuration File", "index.html#lbmrdconfigurationfile", [
        [ "Dummy lbmrd Configuration File", "index.html#dummylbmrdconfigurationfile", null ]
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
"index.html"
];

var SYNCONMSG = 'click to disable panel synchronisation';
var SYNCOFFMSG = 'click to enable panel synchronisation';