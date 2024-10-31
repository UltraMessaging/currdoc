var NAVTREE =
[
  [ "Guide for Persistence", "index.html", [
    [ "Introduction", "index.html#firstsect", null ],
    [ "Persistence Overview", "index.html#persistenceoverview", null ],
    [ "Persistence Concepts", "index.html#persistenceconcepts", [
      [ "Persistent Store Concept", "index.html#persistentstoreconcept", null ],
      [ "Persistence Configuration Concept", "index.html#persistenceconfigurationconcept", null ],
      [ "Registration Identifier Concept", "index.html#registrationidentifierconcept", null ],
      [ "Delivery Confirmation Concept", "index.html#deliveryconfirmationconcept", null ],
      [ "Retention Policy", "index.html#releasepolicy", null ],
      [ "Message Stability Concept", "index.html#messagestabilityconcept", null ],
      [ "Quorum/Consensus Store Failover", "index.html#quorumconsensusstorefailover", null ]
    ] ],
    [ "Persistence Architecture", "index.html#persistencearchitecture", [
      [ "Persistent Store Architecture", "index.html#persistentstorearchitecture", [
        [ "Store Processes and Instances", "index.html#storeprocessesandinstances", null ],
        [ "Source Repositories", "index.html#sourcerepositories", null ],
        [ "Repository Thresholds and Limits", "index.html#repositorythresholdsandlimits", null ],
        [ "Persistent Store Fault Tolerance", "index.html#persistentstorefault", null ],
        [ "Identifying Persistent Stores", "index.html#identifyingpersistentstores", null ]
      ] ]
    ] ],
    [ "Operational View", "index.html#operationalview", [
      [ "General Persistence Operation", "index.html#generalpersistenceoperation", [
        [ "Source Registration", "index.html#sourceregistration", null ],
        [ "Source Registration Information (SRI)", "index.html#sourceregistrationinformationsri", null ]
      ] ],
      [ "Receiver Registration", "index.html#receiverregistration", [
        [ "Receiver Registration Process", "index.html#receiverregistrationprocess", null ],
        [ "Persistence Normal Operation", "index.html#persistencenormaloperation", null ],
        [ "Persistence Flight Size", "index.html#persistenceflightsize", null ],
        [ "Receiver Recovery", "index.html#receiverrecovery", null ],
        [ "Registration Limitations", "index.html#registrationlimitations", null ]
      ] ],
      [ "RPP: Receiver-Paced Persistence", "index.html#receiverpacedpersistenceoperations", [
        [ "RPP Registration", "index.html#rppregistration", null ],
        [ "RPP Normal Operation", "index.html#rppnormaloperation", null ],
        [ "RPP Message Recovery", "index.html#rppmessagerecovery", null ],
        [ "RPP Deregistration", "index.html#rppderegistration", null ],
        [ "Implementing RPP", "index.html#implementingrpp", null ],
        [ "Example RPP Configuration Files", "index.html#examplerppconfigurationfiles", null ],
        [ "RPP Cross Feature Functionality", "index.html#rppcrossfeaturefunctionality", null ]
      ] ],
      [ "Persistence Events", "index.html#persistenceevents", [
        [ "Persistence Source Events", "index.html#persistencesourceevents", null ],
        [ "Persistence Receiver Events", "index.html#persistencereceiverevents", null ]
      ] ],
      [ "Store Monitoring", "index.html#storemonitoring", [
        [ "Store Monitoring: Logs", "index.html#storemonitoringlogs", null ],
        [ "Store Monitoring: UM Library Stats", "index.html#storemonitoringumlibrarystats", null ],
        [ "Store Monitoring: Daemon Stats", "index.html#storemonitoringdaemonstats", null ]
      ] ]
    ] ],
    [ "Store Repository Profiling (SRP)", "index.html#storerepositoryprofilingsrp", [
      [ "Using the SRP API", "index.html#usingthesrpapi", null ],
      [ "umesnaprepo Man Page", "index.html#umesnaprepomanpage", null ]
    ] ],
    [ "Enabling Persistence", "index.html#enablingpersistence", [
      [ "Starting Configuration", "index.html#startingconfiguration", null ],
      [ "Adding the Store to a Source", "index.html#addingthestoretoasource", null ],
      [ "Adding Fault Recovery with Registration IDs", "index.html#addingfaultrecoverywithregistrationids", null ],
      [ "Enabling Persistence Between the Source and Store", "index.html#enablingpersistencebetweenthesourceandstore", null ],
      [ "Enabling Persistence in the Source", "index.html#enablingpersistenceinthesource", [
        [ "Smart Sources and Persistence", "index.html#smartsourcesandpersistence", null ]
      ] ],
      [ "Enabling Persistence in the Receiver", "index.html#enablingpersistenceinthereceiver", null ]
    ] ],
    [ "Demonstrating Persistence", "index.html#demonstratingpersistence", [
      [ "Running Persistent Example Applications", "index.html#runningpersistentexampleapplications", null ],
      [ "Single Receiver Fails and Recovers", "index.html#singlereceiverfailsandrecovers", null ],
      [ "Single Source Fails and Recovers", "index.html#singlesourcefailsandrecovers", null ],
      [ "Single Store Fails", "index.html#singlestorefails", null ]
    ] ],
    [ "Registration Identifiers", "index.html#registrationidentifiers", [
      [ "Use Static RegIDs", "index.html#usestaticregids", null ],
      [ "Save Assigned RegIDs", "index.html#saveassignedregids", null ],
      [ "Managing RegIDs with Session IDs", "index.html#managingregidswithsessionids", null ]
    ] ],
    [ "Designing Persistent Sources", "index.html#designingpersistentsources", [
      [ "New or Re-Registration", "index.html#neworreregistration", null ],
      [ "Sources Must Be Able to Resume Sending", "index.html#sourcesmustbeabletoresumesending", null ],
      [ "Source Message Retention and Release", "index.html#sourcemessageretentionandrelease", null ],
      [ "Forced Reclaims", "index.html#forcedreclaims", null ],
      [ "Source Retention Policy Options", "index.html#sourcereleasepolicyoptions", null ],
      [ "Confirmed Delivery", "index.html#confirmeddelivery", null ],
      [ "Source Event Handler", "index.html#sourceeventhandler", null ],
      [ "Source Event Handler - Stability, Confirmation and Release", "index.html#sourceeventhandlerstabilityconfirmationandrelease", null ],
      [ "Mapping Your Message Numbers to Sequence Numbers", "index.html#mappingyourmessagenumberstosequencenumbers", null ],
      [ "Receiver Liveness Detection", "index.html#receiverlivenessdetection", null ]
    ] ],
    [ "Designing Persistent Receivers", "index.html#designingpersistentreceivers", [
      [ "Receiver RegID Management", "index.html#receiverregidmanagement", null ],
      [ "Recovery Management", "index.html#recoverymanagement", null ],
      [ "Duplicate Message Delivery", "index.html#duplicatmessagedelivery", null ],
      [ "Setting Callback Function to Set Recovery Sequence Number", "index.html#settingcallbackfunctiontosetrecoverysequencenumber", null ],
      [ "Persistence Message Consumption", "index.html#persistencemessageconsumption", [
        [ "Delete on Return, Batch ACKs", "index.html#deleteonreturnbatchacks", null ],
        [ "Retain on Return, Batch ACKs", "index.html#retainonreturnbatchacks", null ],
        [ "Explicit Acknowledgments", "index.html#explicitacknowledgments", null ],
        [ "ACK Immediately on Delete", "index.html#ackimmediatelyondelete", null ]
      ] ],
      [ "ACK Ordering", "index.html#ackordering", null ],
      [ "Object-free Explicit Acknowledgments", "index.html#objectfreeexplicitacknowledgments", null ]
    ] ],
    [ "Designing Persistent Stores", "index.html#designingpersistentstores", [
      [ "Limit Initial Restore with Restore-Last", "index.html#limitinitialrestore", null ],
      [ "Store Log File", "index.html#storelogfile", null ],
      [ "Store Rolling Logs", "index.html#storerollinglogs", null ],
      [ "Quorum/Consensus Store Usage", "index.html#quorumconsensusstoreusage", null ],
      [ "Sources Using Quorum/Consensus Store Configuration", "index.html#sourcesusingquorumconsensusstoreconfiguration", null ]
    ] ],
    [ "Persistent Fault Recovery", "index.html#persistentfaultrecovery", [
      [ "Persistent Source Recovery", "index.html#persistentsourcerecovery", null ],
      [ "Persistent Receiver Recovery", "index.html#persistentreceiverrecovery", null ]
    ] ],
    [ "Callable Store", "index.html#callablestore", null ],
    [ "Store Thread Affinity", "index.html#storethreadaffinity", null ],
    [ "Persistence Fault Tolerance", "index.html#persistencefaulttolerance", [
      [ "Message Loss Recovery", "index.html#messagelossrecovery", null ],
      [ "Persistence Proxy Sources", "index.html#persistenceproxysources", [
        [ "How Proxy Sources Operate", "index.html#howproxysourcesoperate", null ],
        [ "Activity Timeout and State Lifetimes", "index.html#activitytimeoutandstatelifetimes", null ],
        [ "Enabling the Proxy Sources", "index.html#enablingtheproxysources", null ],
        [ "Proxy Source Elections", "index.html#proxysourceelections", null ],
        [ "Proactive Retransmissions", "index.html#proactiveretransmissions", null ]
      ] ]
    ] ],
    [ "Configuring for Persistence and Recovery", "index.html#configuringforpersistenceandrecovery", [
      [ "Source Considerations", "index.html#sourceconsiderations", null ],
      [ "Receiver Considerations", "index.html#receiverconsiderations", [
        [ "Receiver Acknowledgement Generation", "index.html#receiveracknowledgementgeneration", null ],
        [ "Controlling Retransmission", "index.html#controllingretransmission", null ],
        [ "Receiver Recovery Process", "index.html#receiverrecoveryprocess", null ]
      ] ],
      [ "Store Configuration Considerations", "index.html#storeconfigurationconsiderations", [
        [ "Configuring Store Usage per Source", "index.html#configuringstoreusagepersource", null ],
        [ "Memory Use by Stores", "index.html#memoryusebystores", null ],
        [ "Activity Timeouts", "index.html#activitytimeouts", null ],
        [ "Recommendations for Store Configuration", "index.html#recommendationsforstoreconfiguration", null ],
        [ "Store Configuration Practices to Avoid", "index.html#storeconfigurationpracticestoavoid", null ]
      ] ]
    ] ],
    [ "Man Pages for Store", "index.html#manpagesforstore", [
      [ "Umestored Man Page", "index.html#umestoredmanpage", null ],
      [ "Umestoreds Man Page", "index.html#umestoredsmanpage", null ]
    ] ],
    [ "Configuration Reference for Umestored", "index.html#configurationreferenceforumestored", [
      [ "Share/Merge Store XML Files with XInclude", "index.html#mergingmultiplestorexmlconfigurationfiles", [
        [ "Common Store XInclude Use Case", "index.html#commonstorexincludeusecase", null ]
      ] ],
      [ "Store XML Configuration File Elements", "index.html#storexmlconfigurationfileelements", [
        [ "UMP Element \"<ume-store>\"", "index.html#umeelementumestore", null ],
        [ "UMP Element \"<stores>\"", "index.html#umeelementstores", null ],
        [ "UMP Element \"<store>\"", "index.html#umeelementstore", null ],
        [ "UMP Element \"<topics>\"", "index.html#umeelementtopics", null ],
        [ "UMP Element \"<topic>\"", "index.html#umeelementtopic", null ],
        [ "UMP Element \"<ume-attributes>\"", "index.html#umeelementumeattributes", null ],
        [ "UMP Element \"<option>\"", "index.html#umeelementoption", null ],
        [ "UMP Element \"<restore-last>\"", "index.html#umeelementrestorelast", null ],
        [ "UMP Element \"<publishing-interval>\"", "index.html#umeelementpublishinginterval", null ],
        [ "UMP Element \"<group>\"", "index.html#umeelementgroup", null ],
        [ "UMP Element \"<daemon>\"", "index.html#umeelementdaemon", null ],
        [ "UMP Element \"<daemon-monitor>\"", "index.html#umeelementdaemonmonitor", null ],
        [ "UMP Element \"<remote-config-changes-request>\"", "index.html#umeelementremoteconfigchangesrequest", null ],
        [ "UMP Element \"<remote-snapshot-request>\"", "index.html#umeelementremotesnapshotrequest", null ],
        [ "UMP Element \"<lbm-config>\"", "index.html#umeelementlbmconfig", null ],
        [ "UMP Element \"<web-monitor>\"", "index.html#umeelementwebmonitor", null ],
        [ "UMP Element \"<lbm-license-file>\"", "index.html#umeelementlbmlicensefile", null ],
        [ "UMP Element \"<xml-config>\"", "index.html#umeelementxmlconfig", null ],
        [ "UMP Element \"<gid>\"", "index.html#umeelementgid", null ],
        [ "UMP Element \"<pidfile>\"", "index.html#umeelementpidfile", null ],
        [ "UMP Element \"<uid>\"", "index.html#umeelementuid", null ],
        [ "UMP Element \"<log>\"", "index.html#umeelementlog", null ]
      ] ],
      [ "umestored Configuration DTD", "index.html#umestoredconfigurationdtd", null ],
      [ "Store Configuration Example", "index.html#storeconfigurationexample", null ]
    ] ],
    [ "\"<option>\" Element Details", "index.html#optionsforastoresumeattributeselement", [
      [ "Setting LBM Configuration Options", "index.html#optionsforum", null ],
      [ "Store Options in \"<store>\" Element", "index.html#optionsforatopicsume-attributeselement", [
        [ "Store Option \"disk-cache-directory\"", "index.html#umecfgdiskcachedirectory", null ],
        [ "Store Option \"disk-state-directory\"", "index.html#umecfgdiskstatedirectory", null ],
        [ "Store Option \"allow-proxy-source\"", "index.html#umecfgallowproxysource", null ],
        [ "Store Option \"proxy-source-repo-quorum-required\"", "index.html#umecfgproxysourcerepoquorumrequired", null ],
        [ "Store Option \"context-name\"", "index.html#umecfgcontextname", null ],
        [ "Store Option \"retransmission-request-processing-rate\"", "index.html#umecfgretransmissionrequestprocessingrate", null ]
      ] ],
      [ "Store Options in \"<topic>\" Element", "index.html#storeoptionsintopicelement", [
        [ "Topic Option \"retransmission-request-forwarding\"", "index.html#umecfgretransmissionrequestforwarding", null ],
        [ "Topic Option \"repository-type\"", "index.html#umecfgrepositorytype", null ],
        [ "Topic Option \"repository-size-threshold\"", "index.html#umecfgrepositorysizethreshold", null ],
        [ "Topic Option \"repository-size-limit\"", "index.html#umecfgrepositorysizelimit", null ],
        [ "Topic Option \"repository-age-threshold\"", "index.html#umecfgrepositoryagethreshold", null ],
        [ "Topic Option \"repository-disk-max-async-cbs\"", "index.html#umecfgrepositorydiskmaxasynccbs", null ],
        [ "Topic Option \"repository-disk-max-write-async-cbs\"", "index.html#umecfgrepositorydiskmaxwriteasynccbs", null ],
        [ "Topic Option \"repository-disk-max-read-async-cbs\"", "index.html#umecfgrepositorydiskmaxreadasynccbs", null ],
        [ "Topic Option \"repository-disk-file-size-limit\"", "index.html#umecfgrepositorydiskfilesizelimit", null ],
        [ "Topic Option \"repository-disk-file-preallocate\"", "index.html#umecfgrepositorydiskfilepreallocate", null ],
        [ "Topic Option \"repository-disk-async-buffer-length\"", "index.html#umecfgrepositorydiskasyncbufferlength", null ],
        [ "Topic Option \"repository-disk-message-checksum\"", "index.html#umecfgrepositorydiskmessagechecksum", null ],
        [ "Topic Option \"source-activity-timeout\"", "index.html#umecfgsourceactivitytimeout", null ],
        [ "Topic Option \"source-state-lifetime\"", "index.html#umecfgsourcestatelifetime", null ],
        [ "Topic Option \"receiver-activity-timeout\"", "index.html#umecfgreceiveractivitytimeout", null ],
        [ "Topic Option \"receiver-state-lifetime\"", "index.html#umecfgreceiverstatelifetime", null ],
        [ "Topic Option \"source-check-interval\"", "index.html#umecfgsourcecheckinterval", null ],
        [ "Topic Option \"keepalive-interval\"", "index.html#umecfgkeepaliveinterval", null ],
        [ "Topic Option \"receiver-new-registration-rollback\"", "index.html#umecfgreceivernewregistrationrollback", null ],
        [ "Topic Option \"proxy-election-interval\"", "index.html#umecfgproxyelectioninterval", null ],
        [ "Topic Option \"stability-ack-interval\"", "index.html#umecfgstabilityackinterval", null ],
        [ "Topic Option \"stability-ack-minimum-number\"", "index.html#umecfgstabilityackminimumnumber", null ],
        [ "Topic Option \"repository-allow-receiver-paced-persistence\"", "index.html#umecfgrepositoryallowreceiverpacedpersistence", null ],
        [ "Topic Option \"repository-allow-ack-on-reception\"", "index.html#umecfgrepositoryallowackonreception", null ],
        [ "Topic Option \"repository-disk-write-delay\"", "index.html#umecfgrepositorydiskwritedelay", null ],
        [ "Topic Option \"source-flight-size-bytes-maximum\"", "index.html#umecfgsourceflightsizebytesmaximum", null ]
      ] ]
    ] ],
    [ "Special Configuration Topics", "index.html#specialconfigurationtopics", [
      [ "Store Loss Repair", "index.html#storelossrepair", null ],
      [ "Persistence Buffer Sizes", "index.html#persistencebuffersizes", null ],
      [ "Calculating Options for SPP", "index.html#calculatingoptionsforspp", null ],
      [ "RPP Configuration Specifics", "index.html#rppconfigurationspecifics", null ]
    ] ],
    [ "Store Binary Daemon Statistics", "index.html#storedaemonstatistics", [
      [ "Store Daemon Statistics Structures", "index.html#storedaemonstatisticsstructures", [
        [ "Store Daemon Statistics Byte Swapping", "index.html#storedaemonstatisticsbyteswapping", null ],
        [ "Store Daemon Statistics String Buffers", "index.html#storedaemonstatisticsstructuresstringbuffers", null ],
        [ "Store Daemon Statistics Retx Counts", "index.html#storedaemonstatisticsstructuresretxcounts", null ]
      ] ],
      [ "Store Daemon Statistics Configuration", "index.html#storedaemonstatisticsconfiguration", null ],
      [ "Store Daemon Control Requests", "index.html#storedaemoncontrolrequests", [
        [ "Store Daemon Control Request Addressing", "index.html#storedaemoncontrolrequestaddressing", null ],
        [ "Store Daemon Control Request Types", "index.html#storedaemoncontrolrequesttypes", null ],
        [ "Request: Mark Stored Message Invalid", "index.html#requestmarkstoredmessageinvalid", null ],
        [ "Request: Deregister Receiver", "index.html#requestderegisterreceiver", null ]
      ] ],
      [ "umedcmd Man Page", "index.html#umedcmdmanpage", [
        [ "umedcmd Publish Mode", "index.html#umedcmdpublishmode", null ],
        [ "umedcmd Mark Mode", "index.html#umedcmdmarkmode", null ],
        [ "umedcmd Deregister Mode", "index.html#umedcmdderegistermode", null ]
      ] ]
    ] ],
    [ "Store Web Monitor", "index.html#storewebmonitor", [
      [ "Store Web Monitor Index Page", "index.html#storewebmonitorindexpage", null ],
      [ "Store Web Monitor Stores Page", "index.html#storewebmonitorstorespage", null ],
      [ "Store Web Monitor Store Page", "index.html#storewebmonitorstorepage", null ],
      [ "Store Web Monitor Source Page", "index.html#storewebmonitorsourcepage", null ],
      [ "Store Web Monitor Receiver Page", "index.html#storewebmonitorreceiverpage", null ]
    ] ]
  ] ]
];

var NAVTREEINDEX =
[
"index.html"
];

var SYNCONMSG = 'click to disable panel synchronisation';
var SYNCOFFMSG = 'click to enable panel synchronisation';