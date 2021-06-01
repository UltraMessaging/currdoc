var NAVTREE =
[
  [ "Operations Guide", "index.html", [
    [ "Introduction", "index.html", null ],
    [ "UM Installation", "uminstallation.html", [
      [ "UM Package Installer", "uminstallation.html#umpackageinstaller", [
        [ "Unix Package Installer", "uminstallation.html#unixpackageinstaller", null ],
        [ "Windows Package Installer", "uminstallation.html#windowspackageinstaller", null ],
        [ "Other Package Installers", "uminstallation.html#otherpackageinstallers", null ]
      ] ],
      [ "Copy UM Runtime Files", "uminstallation.html#copyumruntimefiles", [
        [ "Copy Unix Runtime Files", "uminstallation.html#copyunixruntimefiles", null ],
        [ "Copy Windows Runtime Files", "uminstallation.html#copywindowsruntimefiles", null ]
      ] ],
      [ "Application Installer", "uminstallation.html#applicationinstaller", null ]
    ] ],
    [ "Monitoring", "monitoring.html", [
      [ "Monitoring Introduction", "monitoring.html#monitoringintroduction", [
        [ "Network and Host Monitoring", "monitoring.html#networkandhostmonitoring", null ],
        [ "UM Monitoring", "monitoring.html#ummonitoring", null ]
      ] ],
      [ "Monitoring UM Applications", "monitoring.html#monitoringumapplications", [
        [ "Application Log File", "monitoring.html#applicationlogfile", null ]
      ] ],
      [ "Monitoring UM Daemons", "monitoring.html#monitoringumdaemons", null ],
      [ "Automatic Monitoring", "monitoring.html#automaticmonitoring", [
        [ "Automatic Monitoring Recommendations", "monitoring.html#automaticmonitoringrecommendations", null ]
      ] ],
      [ "Centralized Collector", "monitoring.html#centralizedcollector", [
        [ "Monitoring Collector Service (MCS)", "monitoring.html#monitoringcollectorservicemcs", null ],
        [ "User-Developed Collector", "monitoring.html#userdevelopedcollector", null ]
      ] ],
      [ "Monitoring Formats", "monitoring.html#monitoringformats", null ]
    ] ],
    [ "Man Pages for MCS", "manpagesformcs.html", [
      [ "MCS Man Page", "manpagesformcs.html#mcsmanpage", null ],
      [ "Mcsds Man Page", "manpagesformcs.html#mcsdsmanpage", null ]
    ] ],
    [ "MCS Configuration File", "mcsconfigurationfile.html", [
      [ "MCS Configuration Elements", "mcsconfigurationfile.html#mcsconfigurationelements", [
        [ "MCS Element \"<um-mcs>\"", "mcsconfigurationfile.html#mcselementummcs", null ],
        [ "MCS Element \"<receiver-transport-opts>\"", "mcsconfigurationfile.html#mcselementreceivertransportopts", null ],
        [ "MCS Element \"<config-file>\"", "mcsconfigurationfile.html#mcselementconfigfile", null ],
        [ "MCS Element \"<wildcard-topic>\"", "mcsconfigurationfile.html#mcselementwildcardtopic", null ],
        [ "MCS Element \"<topic>\"", "mcsconfigurationfile.html#mcselementtopic", null ],
        [ "MCS Element \"<connector>\"", "mcsconfigurationfile.html#mcselementconnector", null ],
        [ "MCS Element \"<properties-file>\"", "mcsconfigurationfile.html#mcselementpropertiesfile", null ],
        [ "MCS Element \"<type>\"", "mcsconfigurationfile.html#mcselementtype", null ],
        [ "MCS Element \"<daemon>\"", "mcsconfigurationfile.html#mcselementdaemon", null ],
        [ "MCS Element \"<pid-file>\"", "mcsconfigurationfile.html#mcselementpidfile", null ],
        [ "MCS Element \"<log>\"", "mcsconfigurationfile.html#mcselementlog", null ]
      ] ]
    ] ],
    [ "Legacy Monitoring", "legacymonitoring.html", [
      [ "Self-Monitoring Applications", "legacymonitoring.html#selfmonitoringapplications", null ]
    ] ],
    [ "Monitoring UM with the lbmmon API", "monitoringumwiththelbmmonapi.html", [
      [ "\"lbmmon\" API", "monitoringumwiththelbmmonapi.html#lbmmonapi", [
        [ "Monitoring Process Flow", "monitoringumwiththelbmmonapi.html#monitoringprocessflow", null ],
        [ "API Framework Flexibility", "monitoringumwiththelbmmonapi.html#apiframeworkflexibility", null ],
        [ "Creating a Monitoring Source", "monitoringumwiththelbmmonapi.html#creatingamonitoringsource", null ],
        [ "Specifying the Object to Monitor", "monitoringumwiththelbmmonapi.html#specifyingtheobjecttomonitor", null ],
        [ "Receiving Monitoring Data", "monitoringumwiththelbmmonapi.html#receivingmonitoringdata", null ]
      ] ],
      [ "Monitoring Transport Modules", "monitoringumwiththelbmmonapi.html#monitoringtransportmodules", [
        [ "The LBM Transport Module", "monitoringumwiththelbmmonapi.html#thelbmtransportmodule", null ],
        [ "The UDP Transport Module", "monitoringumwiththelbmmonapi.html#theudptransportmodule", null ],
        [ "The SNMP Transport Module", "monitoringumwiththelbmmonapi.html#thesnmptransportmodule", null ]
      ] ],
      [ "Monitoring Format Modules", "monitoringumwiththelbmmonapi.html#monitoringformatmodules", [
        [ "The PB Format Module", "monitoringumwiththelbmmonapi.html#thepbformatmodule", null ],
        [ "The CSV Format Module", "monitoringumwiththelbmmonapi.html#thecsvformatmodule", null ]
      ] ]
    ] ],
    [ "Startup/Shutdown Procedures", "startupshutdownprocedures.html", [
      [ "Topic Resolution", "startupshutdownprocedures.html#topicresolution", null ],
      [ "UM Applications", "startupshutdownprocedures.html#umapplications", null ],
      [ "Indications of Possible Application Shutdown", "startupshutdownprocedures.html#indicationsofpossibleapplicationshutdown", null ],
      [ "Unicast Topic Resolver (lbmrd)", "startupshutdownprocedures.html#unicasttopicresolverlbmrd", null ],
      [ "Persistent Store (umestored)", "startupshutdownprocedures.html#persistentstoreumestored", [
        [ "Starting a Store", "startupshutdownprocedures.html#startingastore", null ],
        [ "Restarting a Store", "startupshutdownprocedures.html#restartingastore", null ],
        [ "Common Startup and Shutdown Issues", "startupshutdownprocedures.html#commonstartupandshutdownissues", null ]
      ] ],
      [ "DRO (tnwgd)", "startupshutdownprocedures.html#umroutertnwgd", [
        [ "Starting a DRO", "startupshutdownprocedures.html#startingaumrouter", null ],
        [ "Restarting a DRO", "startupshutdownprocedures.html#restartingaumrouter", null ]
      ] ],
      [ "UM Daemons as Windows Services", "startupshutdownprocedures.html#umdaemonsaswindowsservices", [
        [ "Install the Windows Service", "startupshutdownprocedures.html#installthewindowsservice", null ],
        [ "Configure the Daemon", "startupshutdownprocedures.html#configurethedaemon", null ],
        [ "Configure the Windows Service", "startupshutdownprocedures.html#configurethewindowsservice", null ],
        [ "Start the Windows Service", "startupshutdownprocedures.html#startthewindowsservice", null ],
        [ "Remove the Windows Service", "startupshutdownprocedures.html#removethewindowsservice", null ]
      ] ],
      [ "UM Analysis Tools", "startupshutdownprocedures.html#umanalysistools", [
        [ "Packet Capture Tools", "startupshutdownprocedures.html#packetcapturetools", null ],
        [ "Resource Monitors", "startupshutdownprocedures.html#resourcemonitors", null ],
        [ "Process Analysis Tools", "startupshutdownprocedures.html#processanalysistools", null ],
        [ "Network Tools", "startupshutdownprocedures.html#networktools", null ],
        [ "UM Tools", "startupshutdownprocedures.html#umtools", null ],
        [ "UM Debug Flags", "startupshutdownprocedures.html#umdebugflags", null ]
      ] ]
    ] ],
    [ "Troubleshooting UM Applications", "troubleshootingumapplications.html", [
      [ "Application Crashes", "troubleshootingumapplications.html#applicationcrashes", [
        [ "Persistent Store Crashed", "troubleshootingumapplications.html#persistentstorecrashed", null ],
        [ "DRO Crashed", "troubleshootingumapplications.html#umroutercrashed", null ],
        [ "Excessive Resource Use", "troubleshootingumapplications.html#excessiveresourceuse", null ],
        [ "Crash on deletion of an object", "troubleshootingumapplications.html#crashondeletionofanobject", null ],
        [ "Datagram size mismatches", "troubleshootingumapplications.html#datagramsizemismatches", null ]
      ] ],
      [ "Assertions", "troubleshootingumapplications.html#assertions", [
        [ "Fatal Assertions", "troubleshootingumapplications.html#fatalassertions", null ],
        [ "Non-fatal Assertions", "troubleshootingumapplications.html#nonfatalassertions", null ]
      ] ],
      [ "Message Loss", "troubleshootingumapplications.html#messageloss", null ],
      [ "Unrecoverable Loss", "troubleshootingumapplications.html#unrecoverableloss", null ],
      [ "High Latency", "troubleshootingumapplications.html#highlatency", null ],
      [ "Deaf Receivers", "troubleshootingumapplications.html#deafreceivers", null ],
      [ "Persistent Sending Problems", "troubleshootingumapplications.html#persistentsendingproblems", [
        [ "Flight Size", "troubleshootingumapplications.html#flightsize", null ],
        [ "Persistent Store Connectivity", "troubleshootingumapplications.html#persistentstoreconnectivity", null ]
      ] ]
    ] ],
    [ "Contacting Informatica Support", "contactinginformaticasupport.html", null ],
    [ "UM Log Messages", "umlogmessages.html", [
      [ "UM Core Messages", "umlogmessages.html#umcoremessages", null ],
      [ "UM Core API Messages", "umlogmessages.html#umcoreapimessages", null ],
      [ "UM SRS Log Messages", "umlogmessages.html#umsrslogmessages", null ],
      [ "UM Dynamic Routing Log Messages", "umlogmessages.html#umdynamicroutinglogmessages", null ],
      [ "UM Lbmrd Log Messages", "umlogmessages.html#umlbmrdlogmessages", null ],
      [ "UM Persistent Store Log Messages", "umlogmessages.html#umpersistentstorelogmessages", null ],
      [ "UM MCS Log Messages", "umlogmessages.html#ummcslogmessages", null ]
    ] ]
  ] ]
];

var NAVTREEINDEX =
[
"contactinginformaticasupport.html"
];

var SYNCONMSG = 'click to disable panel synchronisation';
var SYNCOFFMSG = 'click to enable panel synchronisation';