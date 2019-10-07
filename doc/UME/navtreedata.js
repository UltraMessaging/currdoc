var NAVTREE =
[
  [ "Guide for Persistence", "index.html", [
    [ "Introduction", "index.html", null ],
    [ "Persistence Overview", "persistenceoverview.html", null ],
    [ "Persistence Concepts", "persistenceconcepts.html", [
      [ "Persistent Store Concept", "persistenceconcepts.html#persistentstoreconcept", null ],
      [ "Registration Identifier Concept", "persistenceconcepts.html#registrationidentifierconcept", null ],
      [ "Delivery Confirmation Concept", "persistenceconcepts.html#deliveryconfirmationconcept", null ],
      [ "Release Policy", "persistenceconcepts.html#releasepolicy", null ],
      [ "Message Stability Concept", "persistenceconcepts.html#messagestabilityconcept", null ],
      [ "Quorum/Consensus Store Failover", "persistenceconcepts.html#quorumconsensusstorefailover", null ]
    ] ],
    [ "Persistence Architecture", "persistencearchitecture.html", [
      [ "Persistent Store Architecture", "persistencearchitecture.html#persistentstorearchitecture", [
        [ "Source Repositories", "persistencearchitecture.html#sourcerepositories", null ],
        [ "Repository Thresholds and Limits", "persistencearchitecture.html#repositorythresholdsandlimits", null ],
        [ "Tolerance Persistent Store Fault Tolerance", "persistencearchitecture.html#persistentstorefault", null ],
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
        [ "Receiver Recovery", "operationalview.html#receiverrecovery", null ]
      ] ],
      [ "Receiver-paced Persistence Operations", "operationalview.html#receiverpacedpersistenceoperations", [
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
        [ "Persistence Receiver Events", "operationalview.html#persistencereceiverevents", null ],
        [ "Persistence Context Events", "operationalview.html#persistencecontextevents", null ]
      ] ]
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
    [ "Designing Persistence Applications", "designingpersistenceapplications.html", [
      [ "Registration Identifiers", "designingpersistenceapplications.html#registrationidentifiers", [
        [ "Use Static RegIDs", "designingpersistenceapplications.html#usestaticregids", null ],
        [ "Save Assigned RegIDs", "designingpersistenceapplications.html#saveassignedregids", null ],
        [ "Managing RegIDs with Session IDs", "designingpersistenceapplications.html#managingregidswithsessionids", null ]
      ] ],
      [ "Designing Persistent Sources", "designingpersistenceapplications.html#designingpersistentsources", [
        [ "New or Re-Registration", "designingpersistenceapplications.html#neworreregistration", null ],
        [ "Sources Must Be Able to Resume Sending", "designingpersistenceapplications.html#sourcesmustbeabletoresumesending", null ],
        [ "Source Message Retention and Release", "designingpersistenceapplications.html#sourcemessageretentionandrelease", null ],
        [ "Forced Reclaims", "designingpersistenceapplications.html#forcedreclaims", null ],
        [ "Source Release Policy Options", "designingpersistenceapplications.html#sourcereleasepolicyoptions", null ],
        [ "Confirmed Delivery", "designingpersistenceapplications.html#confirmeddelivery", null ],
        [ "Source Event Handler", "designingpersistenceapplications.html#sourceeventhandler", null ],
        [ "Source Event Handler - Stability, Confirmation and Release", "designingpersistenceapplications.html#sourceeventhandlerstabilityconfirmationandrelease", null ],
        [ "Mapping Your Message Numbers to Sequence Numbers", "designingpersistenceapplications.html#mappingyourmessagenumberstosequencenumbers", null ],
        [ "Receiver Liveness Detection", "designingpersistenceapplications.html#receiverlivenessdetection", null ]
      ] ],
      [ "Designing Persistent Receivers", "designingpersistenceapplications.html#designingpersistentreceivers", [
        [ "Receiver RegID Management", "designingpersistenceapplications.html#receiverregidmanagement", null ],
        [ "Recovery Management", "designingpersistenceapplications.html#recoverymanagement", null ],
        [ "Duplicate Message Delivery", "designingpersistenceapplications.html#duplicatmessagedelivery", null ],
        [ "Setting Callback Function to Set Recovery Sequence Number", "designingpersistenceapplications.html#settingcallbackfunctiontosetrecoverysequencenumber", null ],
        [ "Persistence Message Consumption", "designingpersistenceapplications.html#persistencemessageconsumption", null ],
        [ "Immediate Message Consumption", "designingpersistenceapplications.html#immediatemessageconsumption", null ],
        [ "Delayed Message Processing", "designingpersistenceapplications.html#delayedmessageprocessing", null ],
        [ "Batching Acknowledgments", "designingpersistenceapplications.html#batchingacknowledgments", null ],
        [ "ACK Ordering", "designingpersistenceapplications.html#ackordering", null ],
        [ "Explicit Acknowledgments", "designingpersistenceapplications.html#explicitacknowledgments", null ],
        [ "Object-free Explicit Acknowledgments", "designingpersistenceapplications.html#objectfreeexplicitacknowledgments", null ]
      ] ],
      [ "Designing Persistent Stores", "designingpersistenceapplications.html#designingpersistentstores", [
        [ "Store Log File", "designingpersistenceapplications.html#storelogfile", null ],
        [ "Store Rolling Logs", "designingpersistenceapplications.html#storerollinglogs", null ],
        [ "Quorum/Consensus Store Usage", "designingpersistenceapplications.html#quorumconsensusstoreusage", null ],
        [ "Sources Using Quorum/Consensus Store Configuration", "designingpersistenceapplications.html#sourcesusingquorumconsensusstoreconfiguration", null ]
      ] ],
      [ "Persistent Fault Recovery", "designingpersistenceapplications.html#persistentfaultrecovery", [
        [ "Persistent Source Recovery", "designingpersistenceapplications.html#persistentsourcerecovery", null ],
        [ "Persistent Receiver Recovery", "designingpersistenceapplications.html#persistentreceiverrecovery", null ]
      ] ],
      [ "Callable Store", "designingpersistenceapplications.html#callablestore", null ]
    ] ],
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
      [ "Options for a Store's ume-attributes Element", "configurationreferenceforumestored.html#optionsforastoresumeattributeselement", [
        [ "Options for UM", "configurationreferenceforumestored.html#optionsforum", null ],
        [ "Store Options", "configurationreferenceforumestored.html#storeoptions", null ]
      ] ],
      [ "Options for a Topic's ume-attributes Element", "configurationreferenceforumestored.html#optionsforatopicsume-attributeselement", null ],
      [ "Option Types for ume-attributes Elements", "configurationreferenceforumestored.html#optiontypesforumeattributeselements", null ],
      [ "umestored Configuration DTD", "configurationreferenceforumestored.html#umestoredconfigurationdtd", null ],
      [ "Store Configuration Example", "configurationreferenceforumestored.html#storeconfigurationexample", [
        [ "xml-config Tag", "configurationreferenceforumestored.html#xmlconfigtag", null ]
      ] ]
    ] ],
    [ "Store Daemon Statistics", "storedaemonstatistics.html", [
      [ "Store Daemon Statistics Structures", "storedaemonstatistics.html#storedaemonstatisticsstructures", [
        [ "Store Daemon Statistics Byte Swapping", "storedaemonstatistics.html#storedaemonstatisticsbyteswapping", null ],
        [ "Store Daemon Statistics String Buffers", "storedaemonstatistics.html#storedaemonstatisticsstructuresstringbuffers", null ],
        [ "Store Daemon Statistics Retx Counts", "storedaemonstatistics.html#storedaemonstatisticsstructuresretxcounts", null ]
      ] ],
      [ "Store Daemon Statistics Configuration", "storedaemonstatistics.html#storedaemonstatisticsconfiguration", null ],
      [ "Store Daemon Statistics Requests", "storedaemonstatistics.html#storedaemonstatisticsrequests", null ]
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
"configurationreferenceforumestored.html"
];

var SYNCONMSG = 'click to disable panel synchronisation';
var SYNCOFFMSG = 'click to enable panel synchronisation';