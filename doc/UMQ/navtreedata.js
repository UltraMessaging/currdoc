var NAVTREE =
[
  [ "Guide to Queuing", "index.html", [
    [ "Introduction", "index.html", [
      [ "UMQ Overview", "index.html#umqoverview", null ],
      [ "UMQ Architecture", "index.html#umqarchitecture", [
        [ "Single Node", "index.html#singnode", null ],
        [ "Introduction to High Availability", "index.html#introductiontohighavailability", null ],
        [ "Client Applications", "index.html#clientapplications", null ]
      ] ],
      [ "Security and Authentication", "index.html#securityandauthentication", null ],
      [ "JMS", "index.html#jms", null ]
    ] ],
    [ "Getting Started", "gettingstarted.html", [
      [ "Requirements", "gettingstarted.html#requirements", [
        [ "Minimum System Requirements", "gettingstarted.html#minimumsystemrequirements", null ],
        [ "Software Requirements", "gettingstarted.html#softwarerequirements", null ]
      ] ],
      [ "Single Node Installation", "gettingstarted.html#singlenodeinstallation", null ],
      [ "Starting a Single-Node Queuing System", "gettingstarted.html#startingasinglenodequeuingsystem", null ],
      [ "Shutting Down a Single-Node Broker", "gettingstarted.html#shuttingdownasinglenodebroker", null ],
      [ "High Availability Installation", "gettingstarted.html#highavailabilityinstallation", null ],
      [ "Starting a High Availability Queuing System", "gettingstarted.html#startingahighavailabilityqueuingsystem", null ],
      [ "Shutting Down High Availability Nodes", "gettingstarted.html#shuttingdownhighavailabilitynodes", null ],
      [ "Queuing Upgrade Considerations", "gettingstarted.html#queuingupgradeconsiderations", [
        [ "Configuration Options", "gettingstarted.html#configurationoptions", null ],
        [ "Application Code", "gettingstarted.html#applicationcode", null ]
      ] ]
    ] ],
    [ "Concepts and Features", "conceptsandfeatures.html", [
      [ "Brokered Context", "conceptsandfeatures.html#brokeredcontext", null ],
      [ "Brokered Source", "conceptsandfeatures.html#brokeredsource", [
        [ "Source Event Concepts", "conceptsandfeatures.html#sourceeventconcepts", null ]
      ] ],
      [ "Brokered Receiver", "conceptsandfeatures.html#brokeredreceiver", null ],
      [ "The Broker", "conceptsandfeatures.html#thebroker", [
        [ "Message Destination", "conceptsandfeatures.html#messagedestination", null ],
        [ "Message Store", "conceptsandfeatures.html#messagestore", null ]
      ] ],
      [ "Flight Size Concepts", "conceptsandfeatures.html#flightsizeconcepts", null ],
      [ "High Availability Concepts", "conceptsandfeatures.html#highavailabilityconcepts", null ],
      [ "Indexed Queuing", "conceptsandfeatures.html#indexedqueuing", null ],
      [ "Composite Destinations", "conceptsandfeatures.html#compositedestinations", [
        [ "Composite Destination Configuration", "conceptsandfeatures.html#compositedestinationconfiguration", null ]
      ] ],
      [ "Message Lifetime", "conceptsandfeatures.html#messagelifetime", [
        [ "Dead Letter Queue", "conceptsandfeatures.html#deadletterqueue", null ]
      ] ]
    ] ],
    [ "Best Practices", "bestpractices.html", [
      [ "Application Development Best Practices", "bestpractices.html#applicationdevelopmentbestpractices", [
        [ "Use the Appropriate Number of Contexts", "bestpractices.html#usetheappropriatenumberofcontexts", null ],
        [ "If Performance Is Important, Consider Not Persisting Messages", "bestpractices.html#ifperformanceisimportantconsidernotpersistingmessages", null ],
        [ "Wait for Registration", "bestpractices.html#waitforregistration", null ],
        [ "Plan For Possible Connection Interruptions", "bestpractices.html#planforpossibleconnectioninterruptions", null ],
        [ "Java and C# Receivers: Call dispose()", "bestpractices.html#javaandcreceiverscalldispose", null ]
      ] ],
      [ "Configuration Best Practices", "bestpractices.html#configurationbestpractices", [
        [ "Use Configuration Files", "bestpractices.html#useconfigurationfiles", null ],
        [ "Set Permanent Attributes Within the Code", "bestpractices.html#setpermanentattributeswithinthecode", null ],
        [ "Consider Nonblocking Sources", "bestpractices.html#considernonblockingsources", null ]
      ] ],
      [ "Deployment Best Practices", "bestpractices.html#deploymentbestpractices", [
        [ "Use a Three-Node System for Greater Reliability", "bestpractices.html#useathreenodesystemforgreaterreliability", null ],
        [ "Keep Track of Configuration Files", "bestpractices.html#keeptrackofconfigurationfiles", null ]
      ] ],
      [ "Memory Usage", "bestpractices.html#memoryusage", [
        [ "JVM Size", "bestpractices.html#jvmsize", null ],
        [ "JVM Reserved Space", "bestpractices.html#jvmreservedspace", null ],
        [ "Message Paging", "bestpractices.html#messagepaging", null ]
      ] ]
    ] ],
    [ "Developing the Client Application", "developingtheclientapplication.html", [
      [ "Before You Start", "developingtheclientapplication.html#beforeyoustart", null ],
      [ "Create the Context", "developingtheclientapplication.html#createthecontext", null ],
      [ "Create the Sources", "developingtheclientapplication.html#createthesources", null ],
      [ "Create the Receivers", "developingtheclientapplication.html#createthereceivers", null ],
      [ "Client Configuration", "developingtheclientapplication.html#clientconfiguration", null ],
      [ "Sample Applications", "developingtheclientapplication.html#sampleapplications", null ],
      [ "Developing Client Applications for JMS", "developingtheclientapplication.html#developingclientapplicationsforjms", [
        [ "Message Types", "developingtheclientapplication.html#messagetypes", null ]
      ] ],
      [ "Message Components", "developingtheclientapplication.html#messagecomponents", null ],
      [ "JMS Message Properties", "developingtheclientapplication.html#jmsmessageproperties", [
        [ "JMS-defined Properties", "developingtheclientapplication.html#jmsdefinedproperties", null ],
        [ "Provider-specific Properties", "developingtheclientapplication.html#providerspecificproperties", null ],
        [ "User Properties", "developingtheclientapplication.html#userproperties", null ]
      ] ]
    ] ],
    [ "Fault Tolerance", "faulttolerance.html", [
      [ "Message Reliability", "faulttolerance.html#messagereliability", [
        [ "Message Stability", "faulttolerance.html#messagestability", null ],
        [ "Message Consumption", "faulttolerance.html#messageconsumption", null ],
        [ "Message Persistence", "faulttolerance.html#messagepersistence", null ]
      ] ],
      [ "Node Redundancy", "faulttolerance.html#noderedundancy", [
        [ "High Availability", "faulttolerance.html#highavailability", null ],
        [ "High Availability System Initiation", "faulttolerance.html#highavailabilitysysteminitiation", null ]
      ] ],
      [ "Node Failover", "faulttolerance.html#nodefailover", null ]
    ] ],
    [ "Ultra Load Balancing (ULB)", "ultraloadbalancingulb.html", [
      [ "Application Sets and Receiver Type IDs", "ultraloadbalancingulb.html#applicationsetsandreceivertypeids", null ],
      [ "Load Balancing", "ultraloadbalancingulb.html#loadbalancing", [
        [ "ULB Performance", "ultraloadbalancingulb.html#ulbperformance", null ]
      ] ],
      [ "Ultra Load Balancing Flight Size", "ultraloadbalancingulb.html#ultraloadbalancingflightsize", null ],
      [ "Indexed Ultra Load Balancing", "ultraloadbalancingulb.html#indexedultraloadbalancing", null ],
      [ "Total Message Lifetimes for Ultra Load Balancing", "ultraloadbalancingulb.html#totalmessagelifetimesforultraloadbalancing", null ]
    ] ],
    [ "UMQ Events", "umqevents.html", [
      [ "Context Events", "umqevents.html#contextevents", null ],
      [ "Source Events", "umqevents.html#sourceevents", null ],
      [ "Receiver Events", "umqevents.html#receiverevents", null ],
      [ "Event Changes", "umqevents.html#eventchanges", null ]
    ] ],
    [ "Configuration Option Changes", "configurationoptionchanges.html", [
      [ "New Configuration Options", "configurationoptionchanges.html#newconfigurationoptions", null ],
      [ "Changed Configuration Options", "configurationoptionchanges.html#changedconfigurationoptions", null ],
      [ "Deprecated Configuration Options", "configurationoptionchanges.html#deprecatedconfigurationoptions", null ]
    ] ],
    [ "Deprecated and Unavailable Features", "deprecatedandunavailablefeatures.html", [
      [ "Deprecated Features", "deprecatedandunavailablefeatures.html#deprecatedfeatures", null ],
      [ "Deprecated Functions and Methods", "deprecatedandunavailablefeatures.html#deprecatedfunctionsandmethods", null ],
      [ "Unavailable Features", "deprecatedandunavailablefeatures.html#unavailablefeatures", null ],
      [ "Limited Ultra Messaging Functionality", "deprecatedandunavailablefeatures.html#limitedultramessagingfunctionality", null ]
    ] ]
  ] ]
];

var NAVTREEINDEX =
[
"bestpractices.html"
];

var SYNCONMSG = 'click to disable panel synchronisation';
var SYNCOFFMSG = 'click to enable panel synchronisation';