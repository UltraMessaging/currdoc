var NAVTREE =
[
  [ "Guide for Persistence", "index.html", [
    [ "Introduction", "index.html", null ],
    [ "Persistence Overview", "persistenceoverview.html", null ],
    [ "Persistence Concepts", "persistenceconcepts.html", [
      [ "Persistent Store Concept", "persistenceconcepts.html#persistentstoreconcept", null ],
      [ "Persistence Configuration Concept", "persistenceconcepts.html#persistenceconfigurationconcept", null ],
      [ "Registration Identifier Concept", "persistenceconcepts.html#registrationidentifierconcept", null ],
      [ "Delivery Confirmation Concept", "persistenceconcepts.html#deliveryconfirmationconcept", null ],
      [ "Release Policy", "persistenceconcepts.html#releasepolicy", null ],
      [ "Message Stability Concept", "persistenceconcepts.html#messagestabilityconcept", null ],
      [ "Quorum/Consensus Store Failover", "persistenceconcepts.html#quorumconsensusstorefailover", null ]
    ] ],
    [ "Persistence Architecture", "persistencearchitecture.html", [
      [ "Persistent Store Architecture", "persistencearchitecture.html#persistentstorearchitecture", [
        [ "Store Processes and Instances", "persistencearchitecture.html#storeprocessesandinstances", null ],
        [ "Source Repositories", "persistencearchitecture.html#sourcerepositories", null ],
        [ "Repository Thresholds and Limits", "persistencearchitecture.html#repositorythresholdsandlimits", null ],
        [ "Persistent Store Fault Tolerance", "persistencearchitecture.html#persistentstorefault", null ],
        [ "Identifying Persistent Stores", "persistencearchitecture.html#identifyingpersistentstores", null ]
      ] ]
    ] ],
    [ "Operational View", "operationalview.html", [
      [ "General Persistence Operation", "operationalview.html#generalpersistenceoperation", [
        [ "Source Registration", "operationalview.html#sourceregistration", null ],
        [ "Source Registration Information (SRI)", "operationalview.html#sourceregistrationinformationsri", null ]
      ] ],
      [ "Receiver Registration", "operationalview.html#receiverregistration", [
        [ "Receiver Registration Process", "operationalview.html#receiverregistrationprocess", null ],
        [ "Persistence Normal Operation", "operationalview.html#persistencenormaloperation", null ],
        [ "Persistence Flight Size", "operationalview.html#persistenceflightsize", null ],
        [ "Receiver Recovery", "operationalview.html#receiverrecovery", null ],
        [ "Registration Limitations", "operationalview.html#registrationlimitations", null ]
      ] ],
      [ "RPP: Receiver-Paced Persistence", "operationalview.html#receiverpacedpersistenceoperations", [
        [ "RPP Registration", "operationalview.html#rppregistration", null ],
        [ "RPP Normal Operation", "operationalview.html#rppnormaloperation", null ],
        [ "RPP Message Recovery", "operationalview.html#rppmessagerecovery", null ],
        [ "RPP Deregistration", "operationalview.html#rppderegistration", null ],
        [ "Implementing RPP", "operationalview.html#implementingrpp", null ],
        [ "Example RPP Configuration Files", "operationalview.html#examplerppconfigurationfiles", null ],
        [ "RPP Cross Feature Functionality", "operationalview.html#rppcrossfeaturefunctionality", null ]
      ] ],
      [ "Persistence Events", "operationalview.html#persistenceevents", [
        [ "Persistence Source Events", "operationalview.html#persistencesourceevents", null ],
        [ "Persistence Receiver Events", "operationalview.html#persistencereceiverevents", null ]
      ] ]
    ] ],
    [ "Store Repository Profiling (SRP)", "storerepositoryprofilingsrp.html", [
      [ "Using the SRP API", "storerepositoryprofilingsrp.html#usingthesrpapi", null ],
      [ "umesnaprepo Man Page", "storerepositoryprofilingsrp.html#umesnaprepomanpage", null ]
    ] ],
    [ "Enabling Persistence", "enablingpersistence.html", [
      [ "Starting Configuration", "enablingpersistence.html#startingconfiguration", null ],
      [ "Adding the Store to a Source", "enablingpersistence.html#addingthestoretoasource", null ],
      [ "Adding Fault Recovery with Registration IDs", "enablingpersistence.html#addingfaultrecoverywithregistrationids", null ],
      [ "Enabling Persistence Between the Source and Store", "enablingpersistence.html#enablingpersistencebetweenthesourceandstore", null ],
      [ "Enabling Persistence in the Source", "enablingpersistence.html#enablingpersistenceinthesource", [
        [ "Smart Sources and Persistence", "enablingpersistence.html#smartsourcesandpersistence", null ]
      ] ],
      [ "Enabling Persistence in the Receiver", "enablingpersistence.html#enablingpersistenceinthereceiver", null ]
    ] ],
    [ "Demonstrating Persistence", "demonstratingpersistence.html", [
      [ "Running Persistent Example Applications", "demonstratingpersistence.html#runningpersistentexampleapplications", null ],
      [ "Single Receiver Fails and Recovers", "demonstratingpersistence.html#singlereceiverfailsandrecovers", null ],
      [ "Single Source Fails and Recovers", "demonstratingpersistence.html#singlesourcefailsandrecovers", null ],
      [ "Single Store Fails", "demonstratingpersistence.html#singlestorefails", null ]
    ] ],
    [ "Registration Identifiers", "registrationidentifiers.html", [
      [ "Use Static RegIDs", "registrationidentifiers.html#usestaticregids", null ],
      [ "Save Assigned RegIDs", "registrationidentifiers.html#saveassignedregids", null ],
      [ "Managing RegIDs with Session IDs", "registrationidentifiers.html#managingregidswithsessionids", null ]
    ] ],
    [ "Designing Persistent Sources", "designingpersistentsources.html", [
      [ "New or Re-Registration", "designingpersistentsources.html#neworreregistration", null ],
      [ "Sources Must Be Able to Resume Sending", "designingpersistentsources.html#sourcesmustbeabletoresumesending", null ],
      [ "Source Message Retention and Release", "designingpersistentsources.html#sourcemessageretentionandrelease", null ],
      [ "Forced Reclaims", "designingpersistentsources.html#forcedreclaims", null ],
      [ "Source Release Policy Options", "designingpersistentsources.html#sourcereleasepolicyoptions", null ],
      [ "Confirmed Delivery", "designingpersistentsources.html#confirmeddelivery", null ],
      [ "Source Event Handler", "designingpersistentsources.html#sourceeventhandler", null ],
      [ "Source Event Handler - Stability, Confirmation and Release", "designingpersistentsources.html#sourceeventhandlerstabilityconfirmationandrelease", null ],
      [ "Mapping Your Message Numbers to Sequence Numbers", "designingpersistentsources.html#mappingyourmessagenumberstosequencenumbers", null ],
      [ "Receiver Liveness Detection", "designingpersistentsources.html#receiverlivenessdetection", null ]
    ] ],
    [ "Designing Persistent Receivers", "designingpersistentreceivers.html", [
      [ "Receiver RegID Management", "designingpersistentreceivers.html#receiverregidmanagement", null ],
      [ "Recovery Management", "designingpersistentreceivers.html#recoverymanagement", null ],
      [ "Duplicate Message Delivery", "designingpersistentreceivers.html#duplicatmessagedelivery", null ],
      [ "Setting Callback Function to Set Recovery Sequence Number", "designingpersistentreceivers.html#settingcallbackfunctiontosetrecoverysequencenumber", null ],
      [ "Persistence Message Consumption", "designingpersistentreceivers.html#persistencemessageconsumption", [
        [ "Delete on Return, Batch ACKs", "designingpersistentreceivers.html#deleteonreturnbatchacks", null ],
        [ "Retain on Return, Batch ACKs", "designingpersistentreceivers.html#retainonreturnbatchacks", null ],
        [ "Explicit Acknowledgments", "designingpersistentreceivers.html#explicitacknowledgments", null ],
        [ "ACK Immediately on Delete", "designingpersistentreceivers.html#ackimmediatelyondelete", null ]
      ] ],
      [ "ACK Ordering", "designingpersistentreceivers.html#ackordering", null ],
      [ "Object-free Explicit Acknowledgments", "designingpersistentreceivers.html#objectfreeexplicitacknowledgments", null ]
    ] ],
    [ "Designing Persistent Stores", "designingpersistentstores.html", [
      [ "Store Log File", "designingpersistentstores.html#storelogfile", null ],
      [ "Store Rolling Logs", "designingpersistentstores.html#storerollinglogs", null ],
      [ "Quorum/Consensus Store Usage", "designingpersistentstores.html#quorumconsensusstoreusage", null ],
      [ "Sources Using Quorum/Consensus Store Configuration", "designingpersistentstores.html#sourcesusingquorumconsensusstoreconfiguration", null ]
    ] ],
    [ "Persistent Fault Recovery", "persistentfaultrecovery.html", [
      [ "Persistent Source Recovery", "persistentfaultrecovery.html#persistentsourcerecovery", null ],
      [ "Persistent Receiver Recovery", "persistentfaultrecovery.html#persistentreceiverrecovery", null ]
    ] ],
    [ "Callable Store", "callablestore.html", null ],
    [ "Store Thread Affinity", "storethreadaffinity.html", null ],
    [ "Persistence Fault Tolerance", "persistencefaulttolerance.html", [
      [ "Message Loss Recovery", "persistencefaulttolerance.html#messagelossrecovery", null ],
      [ "Configuring for Persistence and Recovery", "persistencefaulttolerance.html#configuringforpersistenceandrecovery", [
        [ "Source Considerations", "persistencefaulttolerance.html#sourceconsiderations", null ],
        [ "Receiver Considerations", "persistencefaulttolerance.html#receiverconsiderations", null ],
        [ "Store Configuration Considerations", "persistencefaulttolerance.html#storeconfigurationconsiderations", null ]
      ] ],
      [ "Persistence Proxy Sources", "persistencefaulttolerance.html#persistenceproxysources", [
        [ "How Proxy Sources Operate", "persistencefaulttolerance.html#howproxysourcesoperate", null ],
        [ "Activity Timeout and State Lifetimes", "persistencefaulttolerance.html#activitytimeoutandstatelifetimes", null ],
        [ "Enabling the Proxy Sources", "persistencefaulttolerance.html#enablingtheproxysources", null ],
        [ "Proxy Source Elections", "persistencefaulttolerance.html#proxysourceelections", null ],
        [ "Proactive Retransmissions", "persistencefaulttolerance.html#proactiveretransmissions", null ]
      ] ]
    ] ],
    [ "Man Pages for Store", "manpagesforstore.html", [
      [ "Umestored Man Page", "manpagesforstore.html#umestoredmanpage", null ],
      [ "Umestoreds Man Page", "manpagesforstore.html#umestoredsmanpage", null ]
    ] ],
    [ "Configuration Reference for Umestored", "configurationreferenceforumestored.html", [
      [ "Store XML Configuration File Elements", "configurationreferenceforumestored.html#storexmlconfigurationfileelements", [
        [ "UMP Element \"<ume-store>\"", "configurationreferenceforumestored.html#umeelementumestore", null ],
        [ "UMP Element \"<stores>\"", "configurationreferenceforumestored.html#umeelementstores", null ],
        [ "UMP Element \"<store>\"", "configurationreferenceforumestored.html#umeelementstore", null ],
        [ "UMP Element \"<topics>\"", "configurationreferenceforumestored.html#umeelementtopics", null ],
        [ "UMP Element \"<topic>\"", "configurationreferenceforumestored.html#umeelementtopic", null ],
        [ "UMP Element \"<ume-attributes>\"", "configurationreferenceforumestored.html#umeelementumeattributes", null ],
        [ "UMP Element \"<option>\"", "configurationreferenceforumestored.html#umeelementoption", null ],
        [ "UMP Element \"<publishing-interval>\"", "configurationreferenceforumestored.html#umeelementpublishinginterval", null ],
        [ "UMP Element \"<group>\"", "configurationreferenceforumestored.html#umeelementgroup", null ],
        [ "UMP Element \"<daemon>\"", "configurationreferenceforumestored.html#umeelementdaemon", null ],
        [ "UMP Element \"<daemon-monitor>\"", "configurationreferenceforumestored.html#umeelementdaemonmonitor", null ],
        [ "UMP Element \"<remote-config-changes-request>\"", "configurationreferenceforumestored.html#umeelementremoteconfigchangesrequest", null ],
        [ "UMP Element \"<remote-snapshot-request>\"", "configurationreferenceforumestored.html#umeelementremotesnapshotrequest", null ],
        [ "UMP Element \"<lbm-config>\"", "configurationreferenceforumestored.html#umeelementlbmconfig", null ],
        [ "UMP Element \"<web-monitor>\"", "configurationreferenceforumestored.html#umeelementwebmonitor", null ],
        [ "UMP Element \"<lbm-license-file>\"", "configurationreferenceforumestored.html#umeelementlbmlicensefile", null ],
        [ "UMP Element \"<xml-config>\"", "configurationreferenceforumestored.html#umeelementxmlconfig", null ],
        [ "UMP Element \"<gid>\"", "configurationreferenceforumestored.html#umeelementgid", null ],
        [ "UMP Element \"<pidfile>\"", "configurationreferenceforumestored.html#umeelementpidfile", null ],
        [ "UMP Element \"<uid>\"", "configurationreferenceforumestored.html#umeelementuid", null ],
        [ "UMP Element \"<log>\"", "configurationreferenceforumestored.html#umeelementlog", null ]
      ] ],
      [ "umestored Configuration DTD", "configurationreferenceforumestored.html#umestoredconfigurationdtd", null ],
      [ "Store Configuration Example", "configurationreferenceforumestored.html#storeconfigurationexample", null ]
    ] ],
    [ "\"<option>\" Element Details", "optionsforastoresumeattributeselement.html", [
      [ "Setting LBM Configuration Options", "optionsforastoresumeattributeselement.html#optionsforum", null ],
      [ "Store Options in \"<store>\" Element", "optionsforastoresumeattributeselement.html#optionsforatopicsume-attributeselement", [
        [ "Store Option \"disk-cache-directory\"", "optionsforastoresumeattributeselement.html#umecfgdiskcachedirectory", null ],
        [ "Store Option \"disk-state-directory\"", "optionsforastoresumeattributeselement.html#umecfgdiskstatedirectory", null ],
        [ "Store Option \"allow-proxy-source\"", "optionsforastoresumeattributeselement.html#umecfgallowproxysource", null ],
        [ "Store Option \"context-name\"", "optionsforastoresumeattributeselement.html#umecfgcontextname", null ],
        [ "Store Option \"retransmission-request-processing-rate\"", "optionsforastoresumeattributeselement.html#umecfgretransmissionrequestprocessingrate", null ]
      ] ],
      [ "Store Options in \"<topic>\" Element", "optionsforastoresumeattributeselement.html#storeoptionsintopicelement", [
        [ "Topic Option \"retransmission-request-forwarding\"", "optionsforastoresumeattributeselement.html#umecfgretransmissionrequestforwarding", null ],
        [ "Topic Option \"repository-type\"", "optionsforastoresumeattributeselement.html#umecfgrepositorytype", null ],
        [ "Topic Option \"repository-size-threshold\"", "optionsforastoresumeattributeselement.html#umecfgrepositorysizethreshold", null ],
        [ "Topic Option \"repository-size-limit\"", "optionsforastoresumeattributeselement.html#umecfgrepositorysizelimit", null ],
        [ "Topic Option \"repository-age-threshold\"", "optionsforastoresumeattributeselement.html#umecfgrepositoryagethreshold", null ],
        [ "Topic Option \"repository-disk-max-async-cbs\"", "optionsforastoresumeattributeselement.html#umecfgrepositorydiskmaxasynccbs", null ],
        [ "Topic Option \"repository-disk-max-write-async-cbs\"", "optionsforastoresumeattributeselement.html#umecfgrepositorydiskmaxwriteasynccbs", null ],
        [ "Topic Option \"repository-disk-max-read-async-cbs\"", "optionsforastoresumeattributeselement.html#umecfgrepositorydiskmaxreadasynccbs", null ],
        [ "Topic Option \"repository-disk-file-size-limit\"", "optionsforastoresumeattributeselement.html#umecfgrepositorydiskfilesizelimit", null ],
        [ "Topic Option \"repository-disk-file-preallocate\"", "optionsforastoresumeattributeselement.html#umecfgrepositorydiskfilepreallocate", null ],
        [ "Topic Option \"repository-disk-async-buffer-length\"", "optionsforastoresumeattributeselement.html#umecfgrepositorydiskasyncbufferlength", null ],
        [ "Topic Option \"repository-disk-message-checksum\"", "optionsforastoresumeattributeselement.html#umecfgrepositorydiskmessagechecksum", null ],
        [ "Topic Option \"source-activity-timeout\"", "optionsforastoresumeattributeselement.html#umecfgsourceactivitytimeout", null ],
        [ "Topic Option \"source-state-lifetime\"", "optionsforastoresumeattributeselement.html#umecfgsourcestatelifetime", null ],
        [ "Topic Option \"receiver-activity-timeout\"", "optionsforastoresumeattributeselement.html#umecfgreceiveractivitytimeout", null ],
        [ "Topic Option \"receiver-state-lifetime\"", "optionsforastoresumeattributeselement.html#umecfgreceiverstatelifetime", null ],
        [ "Topic Option \"source-check-interval\"", "optionsforastoresumeattributeselement.html#umecfgsourcecheckinterval", null ],
        [ "Topic Option \"keepalive-interval\"", "optionsforastoresumeattributeselement.html#umecfgkeepaliveinterval", null ],
        [ "Topic Option \"receiver-new-registration-rollback\"", "optionsforastoresumeattributeselement.html#umecfgreceivernewregistrationrollback", null ],
        [ "Topic Option \"proxy-election-interval\"", "optionsforastoresumeattributeselement.html#umecfgproxyelectioninterval", null ],
        [ "Topic Option \"stability-ack-interval\"", "optionsforastoresumeattributeselement.html#umecfgstabilityackinterval", null ],
        [ "Topic Option \"stability-ack-minimum-number\"", "optionsforastoresumeattributeselement.html#umecfgstabilityackminimumnumber", null ],
        [ "Topic Option \"repository-allow-receiver-paced-persistence\"", "optionsforastoresumeattributeselement.html#umecfgrepositoryallowreceiverpacedpersistence", null ],
        [ "Topic Option \"repository-allow-ack-on-reception\"", "optionsforastoresumeattributeselement.html#umecfgrepositoryallowackonreception", null ],
        [ "Topic Option \"repository-disk-write-delay\"", "optionsforastoresumeattributeselement.html#umecfgrepositorydiskwritedelay", null ],
        [ "Topic Option \"source-flight-size-bytes-maximum\"", "optionsforastoresumeattributeselement.html#umecfgsourceflightsizebytesmaximum", null ]
      ] ]
    ] ],
    [ "Special Configuration Topics", "specialconfigurationtopics.html", [
      [ "RPP Configuration Specifics", "specialconfigurationtopics.html#rppconfigurationspecifics", null ]
    ] ],
    [ "Store Daemon Statistics", "storedaemonstatistics.html", [
      [ "Store Daemon Statistics Structures", "storedaemonstatistics.html#storedaemonstatisticsstructures", [
        [ "Store Daemon Statistics Byte Swapping", "storedaemonstatistics.html#storedaemonstatisticsbyteswapping", null ],
        [ "Store Daemon Statistics String Buffers", "storedaemonstatistics.html#storedaemonstatisticsstructuresstringbuffers", null ],
        [ "Store Daemon Statistics Retx Counts", "storedaemonstatistics.html#storedaemonstatisticsstructuresretxcounts", null ]
      ] ],
      [ "Store Daemon Statistics Configuration", "storedaemonstatistics.html#storedaemonstatisticsconfiguration", null ],
      [ "Store Daemon Control Requests", "storedaemonstatistics.html#storedaemoncontrolrequests", [
        [ "Store Daemon Control Request Addressing", "storedaemonstatistics.html#storedaemoncontrolrequestaddressing", null ],
        [ "Store Daemon Control Request Types", "storedaemonstatistics.html#storedaemoncontrolrequesttypes", null ],
        [ "Request: Mark Stored Message Invalid", "storedaemonstatistics.html#requestmarkstoredmessageinvalid", null ],
        [ "Request: Deregister Receiver", "storedaemonstatistics.html#requestderegisterreceiver", null ]
      ] ],
      [ "umedcmd Man Page", "storedaemonstatistics.html#umedcmdmanpage", [
        [ "umedcmd Publish Mode", "storedaemonstatistics.html#umedcmdpublishmode", null ],
        [ "umedcmd Mark Mode", "storedaemonstatistics.html#umedcmdmarkmode", null ],
        [ "umedcmd Deregister Mode", "storedaemonstatistics.html#umedcmdderegistermode", null ]
      ] ]
    ] ],
    [ "Store Web Monitor", "storewebmonitor.html", [
      [ "Store Web Monitor Index Page", "storewebmonitor.html#storewebmonitorindexpage", null ],
      [ "Store Web Monitor Stores Page", "storewebmonitor.html#storewebmonitorstorespage", null ],
      [ "Store Web Monitor Store Page", "storewebmonitor.html#storewebmonitorstorepage", null ],
      [ "Store Web Monitor Source Page", "storewebmonitor.html#storewebmonitorsourcepage", null ],
      [ "Store Web Monitor Receiver Page", "storewebmonitor.html#storewebmonitorreceiverpage", null ]
    ] ]
  ] ]
];

var NAVTREEINDEX =
[
"callablestore.html"
];

var SYNCONMSG = 'click to disable panel synchronisation';
var SYNCOFFMSG = 'click to enable panel synchronisation';