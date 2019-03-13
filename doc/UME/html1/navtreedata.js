var NAVTREE =
[
  [ "Guide for Persistence", "index.html", [
    [ "Introduction", "index.html#firstsect", null ],
    [ "Persistence Overview", "index.html#persistenceoverview", null ],
    [ "Persistence Concepts", "index.html#persistenceconcepts", [
      [ "Persistent Store Concept", "index.html#persistentstoreconcept", null ],
      [ "Registration Identifier Concept", "index.html#registrationidentifierconcept", null ],
      [ "Delivery Confirmation Concept", "index.html#deliveryconfirmationconcept", null ],
      [ "Release Policy", "index.html#releasepolicy", null ],
      [ "Message Stability Concept", "index.html#messagestabilityconcept", null ],
      [ "Quorum/Consensus Store Failover", "index.html#quorumconsensusstorefailover", null ]
    ] ],
    [ "Persistence Architecture", "index.html#persistencearchitecture", [
      [ "Persistent Store Architecture", "index.html#persistentstorearchitecture", [
        [ "Source Repositories", "index.html#sourcerepositories", null ],
        [ "Repository Thresholds and Limits", "index.html#repositorythresholdsandlimits", null ],
        [ "Tolerance Persistent Store Fault Tolerance", "index.html#persistentstorefault", null ],
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
        [ "Receiver Recovery", "index.html#receiverrecovery", null ]
      ] ],
      [ "Receiver-paced Persistence Operations", "index.html#receiverpacedpersistenceoperations", [
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
        [ "Persistence Receiver Events", "index.html#persistencereceiverevents", null ],
        [ "Persistence Context Events", "index.html#persistencecontextevents", null ]
      ] ]
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
    [ "Designing Persistence Applications", "index.html#designingpersistenceapplications", [
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
        [ "Source Release Policy Options", "index.html#sourcereleasepolicyoptions", null ],
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
        [ "Persistence Message Consumption", "index.html#persistencemessageconsumption", null ],
        [ "Immediate Message Consumption", "index.html#immediatemessageconsumption", null ],
        [ "Delayed Message Processing", "index.html#delayedmessageprocessing", null ],
        [ "Batching Acknowledgments", "index.html#batchingacknowledgments", null ],
        [ "ACK Ordering", "index.html#ackordering", null ],
        [ "Explicit Acknowledgments", "index.html#explicitacknowledgments", null ],
        [ "Object-free Explicit Acknowledgments", "index.html#objectfreeexplicitacknowledgments", null ]
      ] ],
      [ "Designing Persistent Stores", "index.html#designingpersistentstores", [
        [ "Store Log File", "index.html#storelogfile", null ],
        [ "Store Rolling Logs", "index.html#storerollinglogs", null ],
        [ "Quorum/Consensus Store Usage", "index.html#quorumconsensusstoreusage", null ],
        [ "Sources Using Quorum/Consensus Store Configuration", "index.html#sourcesusingquorumconsensusstoreconfiguration", null ]
      ] ],
      [ "Persistent Fault Recovery", "index.html#persistentfaultrecovery", [
        [ "Persistent Source Recovery", "index.html#persistentsourcerecovery", null ],
        [ "Persistent Receiver Recovery", "index.html#persistentreceiverrecovery", null ]
      ] ],
      [ "Callable Store", "index.html#callablestore", null ]
    ] ],
    [ "Persistence Fault Tolerance", "index.html#persistencefaulttolerance", [
      [ "Message Loss Recovery", "index.html#messagelossrecovery", null ],
      [ "Configuring for Persistence and Recovery", "index.html#configuringforpersistenceandrecovery", [
        [ "Source Considerations", "index.html#sourceconsiderations", null ],
        [ "Receiver Considerations", "index.html#receiverconsiderations", null ],
        [ "Store Configuration Considerations", "index.html#storeconfigurationconsiderations", null ]
      ] ],
      [ "Persistence Proxy Sources", "index.html#persistenceproxysources", [
        [ "How Proxy Sources Operate", "index.html#howproxysourcesoperate", null ],
        [ "Activity Timeout and State Lifetimes", "index.html#activitytimeoutandstatelifetimes", null ],
        [ "Enabling the Proxy Sources", "index.html#enablingtheproxysources", null ],
        [ "Proxy Source Elections", "index.html#proxysourceelections", null ],
        [ "Proactive Retransmissions", "index.html#proactiveretransmissions", null ]
      ] ]
    ] ],
    [ "Man Pages for Store", "index.html#manpagesforstore", [
      [ "Umestored Man Page", "index.html#umestoredmanpage", null ],
      [ "Umestoreds Man Page", "index.html#umestoredsmanpage", null ]
    ] ],
    [ "Configuration Reference for Umestored", "index.html#configurationreferenceforumestored", [
      [ "Daemon Element", "index.html#daemonelement", [
        [ "Log Element", "index.html#logelement", null ],
        [ "Daemon-monitor Element", "index.html#daemonmonitorelement", null ],
        [ "Publishing-interval Element", "index.html#publishingintervalelement", null ],
        [ "Group Element", "index.html#groupelement", null ]
      ] ],
      [ "Stores Element", "index.html#storeselement", [
        [ "Store Element", "index.html#storeelement", null ],
        [ "Topics Element", "index.html#topicselement", null ],
        [ "Topic Element", "index.html#topicelement", null ]
      ] ],
      [ "Option Types for ume-attributes Elements", "index.html#optiontypesforumeattributeselements", null ],
      [ "umestored Configuration DTD", "index.html#umestoredconfigurationdtd", null ],
      [ "Store Configuration Example", "index.html#storeconfigurationexample", [
        [ "xml-config Tag", "index.html#xmlconfigtag", null ]
      ] ]
    ] ],
    [ "Store Daemon Statistics", "index.html#storedaemonstatistics", [
      [ "Store Daemon Statistics Structures", "index.html#storedaemonstatisticsstructures", [
        [ "Store Daemon Statistics Byte Swapping", "index.html#storedaemonstatisticsbyteswapping", null ],
        [ "Store Daemon Statistics String Buffers", "index.html#storedaemonstatisticsstructuresstringbuffers", null ],
        [ "Store Daemon Statistics Retx Counts", "index.html#storedaemonstatisticsstructuresretxcounts", null ]
      ] ],
      [ "Store Daemon Statistics Configuration", "index.html#storedaemonstatisticsconfiguration", null ],
      [ "Store Daemon Statistics Requests", "index.html#storedaemonstatisticsrequests", null ]
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