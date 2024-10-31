var NAVTREE =
[
  [ "Guide to Queuing", "index.html", [
    [ "Introduction", "index.html#firstsect", [
      [ "UMQ Overview", "index.html#umqoverview", null ],
      [ "UMQ Architecture", "index.html#umqarchitecture", [
        [ "Single Node", "index.html#singnode", null ],
        [ "Introduction to High Availability", "index.html#introductiontohighavailability", null ],
        [ "Client Applications", "index.html#clientapplications", null ]
      ] ],
      [ "Security and Authentication", "index.html#securityandauthentication", null ],
      [ "JMS", "index.html#jms", null ]
    ] ],
    [ "Getting Started", "index.html#gettingstarted", [
      [ "Requirements", "index.html#requirements", [
        [ "Minimum System Requirements", "index.html#minimumsystemrequirements", null ],
        [ "Software Requirements", "index.html#softwarerequirements", null ]
      ] ],
      [ "Single Node Installation", "index.html#singlenodeinstallation", null ],
      [ "Starting a Single-Node Queuing System", "index.html#startingasinglenodequeuingsystem", null ],
      [ "Shutting Down a Single-Node Broker", "index.html#shuttingdownasinglenodebroker", null ],
      [ "High Availability Installation", "index.html#highavailabilityinstallation", null ],
      [ "Starting a High Availability Queuing System", "index.html#startingahighavailabilityqueuingsystem", null ],
      [ "Shutting Down High Availability Nodes", "index.html#shuttingdownhighavailabilitynodes", null ],
      [ "Queuing Upgrade Considerations", "index.html#queuingupgradeconsiderations", [
        [ "Configuration Options", "index.html#configurationoptions", null ],
        [ "Application Code", "index.html#applicationcode", null ]
      ] ]
    ] ],
    [ "Concepts and Features", "index.html#conceptsandfeatures", [
      [ "Brokered Context", "index.html#brokeredcontext", null ],
      [ "Brokered Source", "index.html#brokeredsource", [
        [ "Source Event Concepts", "index.html#sourceeventconcepts", null ]
      ] ],
      [ "Brokered Receiver", "index.html#brokeredreceiver", null ],
      [ "The Broker", "index.html#thebroker", [
        [ "Message Destination", "index.html#messagedestination", null ],
        [ "Message Store", "index.html#messagestore", null ]
      ] ],
      [ "Flight Size Concepts", "index.html#flightsizeconcepts", null ],
      [ "High Availability Concepts", "index.html#highavailabilityconcepts", null ],
      [ "Indexed Queuing", "index.html#indexedqueuing", null ],
      [ "Composite Destinations", "index.html#compositedestinations", [
        [ "Composite Destination Configuration", "index.html#compositedestinationconfiguration", null ]
      ] ],
      [ "Message Lifetime", "index.html#messagelifetime", [
        [ "Dead Letter Queue", "index.html#deadletterqueue", null ]
      ] ]
    ] ],
    [ "Best Practices", "index.html#bestpractices", [
      [ "Application Development Best Practices", "index.html#applicationdevelopmentbestpractices", [
        [ "Use the Appropriate Number of Contexts", "index.html#usetheappropriatenumberofcontexts", null ],
        [ "If Performance Is Important, Consider Not Persisting Messages", "index.html#ifperformanceisimportantconsidernotpersistingmessages", null ],
        [ "Wait for Registration", "index.html#waitforregistration", null ],
        [ "Plan For Possible Connection Interruptions", "index.html#planforpossibleconnectioninterruptions", null ],
        [ "Java and C# Receivers: Call dispose()", "index.html#javaandcreceiverscalldispose", null ]
      ] ],
      [ "Configuration Best Practices", "index.html#configurationbestpractices", [
        [ "Use Configuration Files", "index.html#useconfigurationfiles", null ],
        [ "Set Permanent Attributes Within the Code", "index.html#setpermanentattributeswithinthecode", null ],
        [ "Consider Nonblocking Sources", "index.html#considernonblockingsources", null ]
      ] ],
      [ "Deployment Best Practices", "index.html#deploymentbestpractices", [
        [ "Use a Three-Node System for Greater Reliability", "index.html#useathreenodesystemforgreaterreliability", null ],
        [ "Keep Track of Configuration Files", "index.html#keeptrackofconfigurationfiles", null ]
      ] ],
      [ "Memory Usage", "index.html#memoryusage", [
        [ "JVM Size", "index.html#jvmsize", null ],
        [ "JVM Reserved Space", "index.html#jvmreservedspace", null ],
        [ "Message Paging", "index.html#messagepaging", null ]
      ] ]
    ] ],
    [ "Developing the Client Application", "index.html#developingtheclientapplication", [
      [ "Before You Start", "index.html#beforeyoustart", null ],
      [ "Create the Context", "index.html#createthecontext", null ],
      [ "Create the Sources", "index.html#createthesources", null ],
      [ "Create the Receivers", "index.html#createthereceivers", null ],
      [ "Client Configuration", "index.html#clientconfiguration", null ],
      [ "Sample Applications", "index.html#sampleapplications", null ],
      [ "Developing Client Applications for JMS", "index.html#developingclientapplicationsforjms", [
        [ "Message Types", "index.html#messagetypes", null ]
      ] ],
      [ "Message Components", "index.html#messagecomponents", null ],
      [ "JMS Message Properties", "index.html#jmsmessageproperties", [
        [ "JMS-defined Properties", "index.html#jmsdefinedproperties", null ],
        [ "Provider-specific Properties", "index.html#providerspecificproperties", null ],
        [ "User Properties", "index.html#userproperties", null ]
      ] ]
    ] ],
    [ "Fault Tolerance", "index.html#faulttolerance", [
      [ "Message Reliability", "index.html#messagereliability", [
        [ "Message Stability", "index.html#messagestability", null ],
        [ "Message Consumption", "index.html#messageconsumption", null ],
        [ "Message Persistence", "index.html#messagepersistence", null ]
      ] ],
      [ "Node Redundancy", "index.html#noderedundancy", [
        [ "High Availability", "index.html#highavailability", null ],
        [ "High Availability System Initiation", "index.html#highavailabilitysysteminitiation", null ]
      ] ],
      [ "Node Failover", "index.html#nodefailover", null ]
    ] ],
    [ "Ultra Load Balancing (ULB)", "index.html#ultraloadbalancingulb", [
      [ "Application Sets and Receiver Type IDs", "index.html#applicationsetsandreceivertypeids", null ],
      [ "Load Balancing", "index.html#loadbalancing", [
        [ "ULB Performance", "index.html#ulbperformance", null ]
      ] ],
      [ "Ultra Load Balancing Flight Size", "index.html#ultraloadbalancingflightsize", null ],
      [ "Indexed Ultra Load Balancing", "index.html#indexedultraloadbalancing", null ],
      [ "Total Message Lifetimes for Ultra Load Balancing", "index.html#totalmessagelifetimesforultraloadbalancing", null ]
    ] ],
    [ "UMQ Events", "index.html#umqevents", [
      [ "Context Events", "index.html#contextevents", null ],
      [ "Source Events", "index.html#sourceevents", null ],
      [ "Receiver Events", "index.html#receiverevents", null ],
      [ "Event Changes", "index.html#eventchanges", null ]
    ] ],
    [ "Configuration Option Changes", "index.html#configurationoptionchanges", [
      [ "New Configuration Options", "index.html#newconfigurationoptions", null ],
      [ "Changed Configuration Options", "index.html#changedconfigurationoptions", null ],
      [ "Deprecated Configuration Options", "index.html#deprecatedconfigurationoptions", null ]
    ] ],
    [ "Deprecated and Unavailable Features", "index.html#deprecatedandunavailablefeatures", [
      [ "Deprecated Features", "index.html#deprecatedfeatures", null ],
      [ "Deprecated Functions and Methods", "index.html#deprecatedfunctionsandmethods", null ],
      [ "Unavailable Features", "index.html#unavailablefeatures", null ],
      [ "Limited Ultra Messaging Functionality", "index.html#limitedultramessagingfunctionality", null ]
    ] ]
  ] ]
];

var NAVTREEINDEX =
[
"index.html"
];

var SYNCONMSG = 'click to disable panel synchronisation';
var SYNCOFFMSG = 'click to enable panel synchronisation';