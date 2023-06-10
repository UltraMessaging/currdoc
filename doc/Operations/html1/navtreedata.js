var NAVTREE =
[
  [ "Operations Guide", "index.html", [
    [ "Introduction", "index.html#firstsect", null ],
    [ "UM Installation", "index.html#uminstallation", [
      [ "UM Package Installer", "index.html#umpackageinstaller", [
        [ "Unix Package Installer", "index.html#unixpackageinstaller", null ],
        [ "Windows Package Installer", "index.html#windowspackageinstaller", null ],
        [ "Other Package Installers", "index.html#otherpackageinstallers", null ]
      ] ],
      [ "Copy UM Runtime Files", "index.html#copyumruntimefiles", [
        [ "Copy Unix Runtime Files", "index.html#copyunixruntimefiles", null ],
        [ "Copy Windows Runtime Files", "index.html#copywindowsruntimefiles", null ]
      ] ],
      [ "Application Installer", "index.html#applicationinstaller", null ]
    ] ],
    [ "Virtualized Environments", "index.html#virtualizedenvironments", [
      [ "Physical Network in a Virtualized Environment", "index.html#physicalnetworkinavirtualizedenvironment", null ],
      [ "Shared Memory Between Containers", "index.html#sharedmemorybetweencontainers", null ]
    ] ],
    [ "Monitoring", "index.html#monitoring", [
      [ "Monitoring Introduction", "index.html#monitoringintroduction", [
        [ "Network and Host Equipment Monitoring", "index.html#networkandhostmonitoring", null ],
        [ "Monitoring UM", "index.html#monitoringum", null ]
      ] ],
      [ "Monitoring UM Applications", "index.html#monitoringumapplications", [
        [ "Application Log File", "index.html#applicationlogfile", null ]
      ] ],
      [ "Monitoring UM Daemons", "index.html#monitoringumdaemons", null ],
      [ "Automatic Monitoring", "index.html#automaticmonitoring", [
        [ "Automatic Monitoring Sample", "index.html#automaticmonitoringsample", null ]
      ] ],
      [ "Centralized Collector", "index.html#centralizedcollector", [
        [ "Monitoring Collector Service (MCS)", "index.html#monitoringcollectorservicemcs", null ],
        [ "User-Developed Collector", "index.html#userdevelopedcollector", null ]
      ] ],
      [ "Monitoring Formats", "index.html#monitoringformats", null ],
      [ "Protocol Buffer Format", "index.html#protocolbufferformat", null ]
    ] ],
    [ "Man Pages for MCS", "index.html#manpagesformcs", [
      [ "MCS Man Page", "index.html#mcsmanpage", null ],
      [ "Mcsds Man Page", "index.html#mcsdsmanpage", null ]
    ] ],
    [ "MCS Configuration File", "index.html#mcsconfigurationfile", [
      [ "MCS Configuration Elements", "index.html#mcsconfigurationelements", [
        [ "MCS Element \"<um-mcs>\"", "index.html#mcselementummcs", null ],
        [ "MCS Element \"<receiver-transport-opts>\"", "index.html#mcselementreceivertransportopts", null ],
        [ "MCS Element \"<config-file>\"", "index.html#mcselementconfigfile", null ],
        [ "MCS Element \"<wildcard-topic>\"", "index.html#mcselementwildcardtopic", null ],
        [ "MCS Element \"<topic>\"", "index.html#mcselementtopic", null ],
        [ "MCS Element \"<connector>\"", "index.html#mcselementconnector", null ],
        [ "MCS Element \"<properties-file>\"", "index.html#mcselementpropertiesfile", null ],
        [ "MCS Element \"<type>\"", "index.html#mcselementtype", null ],
        [ "MCS Element \"<daemon>\"", "index.html#mcselementdaemon", null ],
        [ "MCS Element \"<pid-file>\"", "index.html#mcselementpidfile", null ],
        [ "MCS Element \"<log>\"", "index.html#mcselementlog", null ]
      ] ]
    ] ],
    [ "Legacy Monitoring", "index.html#legacymonitoring", [
      [ "Self-Monitoring Applications", "index.html#selfmonitoringapplications", null ]
    ] ],
    [ "Monitoring UM with the lbmmon API", "index.html#monitoringumwiththelbmmonapi", [
      [ "\"lbmmon\" API", "index.html#lbmmonapi", [
        [ "Monitoring Process Flow", "index.html#monitoringprocessflow", null ],
        [ "API Framework Flexibility", "index.html#apiframeworkflexibility", null ],
        [ "Creating a Monitoring Source", "index.html#creatingamonitoringsource", null ],
        [ "Specifying the Object to Monitor", "index.html#specifyingtheobjecttomonitor", null ],
        [ "Receiving Monitoring Data", "index.html#receivingmonitoringdata", null ]
      ] ],
      [ "Monitoring Transport Modules", "index.html#monitoringtransportmodules", [
        [ "The LBM Transport Module", "index.html#thelbmtransportmodule", null ],
        [ "The UDP Transport Module", "index.html#theudptransportmodule", null ],
        [ "The SNMP Transport Module", "index.html#thesnmptransportmodule", null ]
      ] ],
      [ "Monitoring Format Modules", "index.html#monitoringformatmodules", [
        [ "The PB Format Module", "index.html#thepbformatmodule", null ],
        [ "The CSV Format Module", "index.html#thecsvformatmodule", null ]
      ] ]
    ] ],
    [ "Startup/Shutdown Procedures", "index.html#startupshutdownprocedures", [
      [ "Topic Resolution", "index.html#topicresolution", null ],
      [ "UM Applications", "index.html#umapplications", null ],
      [ "Indications of Possible Application Shutdown", "index.html#indicationsofpossibleapplicationshutdown", null ],
      [ "Unicast Topic Resolver (lbmrd)", "index.html#unicasttopicresolverlbmrd", null ],
      [ "Running Persistent Stores (umestored)", "index.html#persistentstoreumestored", [
        [ "Eliminate Past State", "index.html#eliminatepaststate", null ],
        [ "Retain Past State", "index.html#retainpaststate", null ],
        [ "Starting a Store", "index.html#startingastore", null ],
        [ "Shutting Down a Store", "index.html#restartingastore", null ],
        [ "Common Startup and Shutdown Issues", "index.html#commonstartupandshutdownissues", null ]
      ] ],
      [ "DRO (tnwgd)", "index.html#umroutertnwgd", [
        [ "Starting a DRO", "index.html#startingaumrouter", null ],
        [ "Restarting a DRO", "index.html#restartingaumrouter", null ]
      ] ],
      [ "UM Daemons as Windows Services", "index.html#umdaemonsaswindowsservices", [
        [ "Install the Windows Service", "index.html#installthewindowsservice", null ],
        [ "Configure the Daemon", "index.html#configurethedaemon", null ],
        [ "Configure the Windows Service", "index.html#configurethewindowsservice", null ],
        [ "Start the Windows Service", "index.html#startthewindowsservice", null ],
        [ "Remove the Windows Service", "index.html#removethewindowsservice", null ]
      ] ],
      [ "UM Analysis Tools", "index.html#umanalysistools", [
        [ "Packet Capture Tools", "index.html#packetcapturetools", null ],
        [ "Resource Monitors", "index.html#resourcemonitors", null ],
        [ "Process Analysis Tools", "index.html#processanalysistools", null ],
        [ "Network Tools", "index.html#networktools", null ],
        [ "UM Tools", "index.html#umtools", null ],
        [ "UM Debug Flags", "index.html#umdebugflags", null ]
      ] ]
    ] ],
    [ "Troubleshooting UM Applications", "index.html#troubleshootingumapplications", [
      [ "Application Crashes", "index.html#applicationcrashes", [
        [ "Persistent Store Crashed", "index.html#persistentstorecrashed", null ],
        [ "DRO Crashed", "index.html#umroutercrashed", null ],
        [ "Excessive Resource Use", "index.html#excessiveresourceuse", null ],
        [ "Crash on deletion of an object", "index.html#crashondeletionofanobject", null ],
        [ "Datagram size mismatches", "index.html#datagramsizemismatches", null ]
      ] ],
      [ "Assertions", "index.html#assertions", [
        [ "Fatal Assertions", "index.html#fatalassertions", null ],
        [ "Non-fatal Assertions", "index.html#nonfatalassertions", null ]
      ] ],
      [ "Message Loss", "index.html#messageloss", null ],
      [ "Unrecoverable Loss", "index.html#unrecoverableloss", null ],
      [ "High Latency", "index.html#highlatency", null ],
      [ "Deaf Receivers", "index.html#deafreceivers", null ],
      [ "Persistent Sending Problems", "index.html#persistentsendingproblems", [
        [ "Flight Size", "index.html#flightsize", null ],
        [ "Persistent Store Connectivity", "index.html#persistentstoreconnectivity", null ]
      ] ]
    ] ],
    [ "Contacting Informatica Support", "index.html#contactinginformaticasupport", null ],
    [ "UM Log Messages", "index.html#umlogmessages", [
      [ "UM Core Messages", "index.html#umcoremessages", null ],
      [ "UM Core API Messages", "index.html#umcoreapimessages", null ],
      [ "UM SRS Log Messages", "index.html#umsrslogmessages", null ],
      [ "UM Dynamic Routing Log Messages", "index.html#umdynamicroutinglogmessages", null ],
      [ "UM Lbmrd Log Messages", "index.html#umlbmrdlogmessages", null ],
      [ "UM Persistent Store Log Messages", "index.html#umpersistentstorelogmessages", null ],
      [ "UM MCS Log Messages", "index.html#ummcslogmessages", null ]
    ] ]
  ] ]
];

var NAVTREEINDEX =
[
"index.html"
];

var SYNCONMSG = 'click to disable panel synchronisation';
var SYNCOFFMSG = 'click to enable panel synchronisation';