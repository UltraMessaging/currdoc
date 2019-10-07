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
      [ "Monitoring Transport Statistics", "monitoring.html#monitoringtransportstatistics", [
        [ "LBT-RM and LBT-RU Receiver Statistics", "monitoring.html#lbtrmandlbtrureceiverstatistics", null ],
        [ "LBT-RM and LBT-RU Source Statistics", "monitoring.html#lbtrmandlbtrusourcestatistics", null ],
        [ "TCP Statistics", "monitoring.html#tcpstatistics", null ],
        [ "LBT-IPC Statistics", "monitoring.html#lbtipcstatistics", null ]
      ] ],
      [ "Monitoring Event Queues", "monitoring.html#monitoringeventqueues", null ],
      [ "Monitoring Application Log Messages", "monitoring.html#monitoringapplicationlogmessages", null ],
      [ "Monitoring the Persistent Store Daemon (umestored)", "monitoring.html#monitoringthepersistentstoredaemonumestored", [
        [ "Monitoring Store Log File", "monitoring.html#monitoringstorelogfile", null ],
        [ "Monitoring a Store's Internal Transport Statistics", "monitoring.html#monitoringastoresinternaltransportstatistics", null ],
        [ "Persistent Store Web Monitoring", "monitoring.html#persistentstorewebmonitoring", null ],
        [ "Persistent Store Daemon Statistics", "monitoring.html#persistentstoredaemonstatistics", null ],
        [ "Detecting Persistent Store Failures", "monitoring.html#detectingpersistentstorefailures", null ]
      ] ],
      [ "Monitoring the UM Router Daemon (tnwgd)", "monitoring.html#monitoringtheumrouterdaemontnwgd", [
        [ "Monitoring UM Router Log File", "monitoring.html#monitoringumrouterlogfile", null ],
        [ "UM Router Transport Statistics", "monitoring.html#umroutertransportstatistics", null ],
        [ "UM Router Web Monitoring", "monitoring.html#umrouterwebmonitoring", null ],
        [ "UM Router Daemon Statistics", "monitoring.html#op-umrouterdaemonstatistics", null ],
        [ "Detecting UM Router Failures", "monitoring.html#detectingumrouterfailures", null ]
      ] ],
      [ "Monitoring Messaging System Resources", "monitoring.html#monitoringmessagingsystemresources", [
        [ "Persistent Store System Considerations", "monitoring.html#persistentstoresystemconsiderations", null ],
        [ "Sources of Latency", "monitoring.html#sourcesoflatency", null ],
        [ "Runtime Diagnostics", "monitoring.html#runtimediagnostics", null ]
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
      [ "UM Router (tnwgd)", "startupshutdownprocedures.html#umroutertnwgd", [
        [ "Starting a UM Router", "startupshutdownprocedures.html#startingaumrouter", null ],
        [ "Restarting a UM Router", "startupshutdownprocedures.html#restartingaumrouter", null ]
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
    [ "Monitoring UM with the lbmmon API", "monitoringumwiththelbmmonapi.html", [
      [ "Monitoring Introduction", "monitoringumwiththelbmmonapi.html#monitoringintroduction", [
        [ "Why Monitor?", "monitoringumwiththelbmmonapi.html#whymonitor", null ],
        [ "What to Monitor", "monitoringumwiththelbmmonapi.html#whattomonitor", null ]
      ] ],
      [ "Monitoring Methods", "monitoringumwiththelbmmonapi.html#monitoringmethods", null ],
      [ "UM API Functions and Data Structures", "monitoringumwiththelbmmonapi.html#umsapifunctionsanddatastructures", [
        [ "Context Statistics", "monitoringumwiththelbmmonapi.html#contextstatistics", null ],
        [ "Event Queue Statistics", "monitoringumwiththelbmmonapi.html#eventqueuestatistics", null ],
        [ "Source or Receiver Transport Statistics", "monitoringumwiththelbmmonapi.html#sourceorreceivertransportstatistics", null ]
      ] ],
      [ "UM Monitoring API", "monitoringumwiththelbmmonapi.html#umsmonitoringapi", [
        [ "Monitoring Process Flow", "monitoringumwiththelbmmonapi.html#monitoringprocessflow", null ],
        [ "API Framework Flexibility", "monitoringumwiththelbmmonapi.html#apiframeworkflexibility", null ],
        [ "Initial Monitoring Questions", "monitoringumwiththelbmmonapi.html#initialmonitoringquestions", null ],
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
        [ "The CSV Format Module", "monitoringumwiththelbmmonapi.html#thecsvformatmodule", null ]
      ] ],
      [ "Automatic Monitoring", "monitoringumwiththelbmmonapi.html#automaticmonitoring", null ],
      [ "Monitoring Examples", "monitoringumwiththelbmmonapi.html#monitoringexamples", [
        [ "lbmmon.c", "monitoringumwiththelbmmonapi.html#lbmmonc", null ],
        [ "lbmmonudp.c and lbmmondiag.pl", "monitoringumwiththelbmmonapi.html#lbmmonudpcandlbmmondiagpl", null ]
      ] ],
      [ "Interpreting LBT-RM Source Statistics", "monitoringumwiththelbmmonapi.html#interpretinglbtrmsourcestatistics", null ]
    ] ],
    [ "UM Monitoring Statistics", "ummonitoringstatistics.html", [
      [ "Monitoring Receiving Statistics", "ummonitoringstatistics.html#monitoringreceivingstatistics", null ],
      [ "Monitoring Sending Statistics", "ummonitoringstatistics.html#monitoringsendingstatistics", null ],
      [ "Monitoring Context Statistics", "ummonitoringstatistics.html#monitoringcontextstatistics", null ],
      [ "Monitoring Event Queue Statistics", "ummonitoringstatistics.html#monitoringeventqueuestatistics", null ]
    ] ],
    [ "Troubleshooting UM Applications", "troubleshootingumapplications.html", [
      [ "Application Crashes", "troubleshootingumapplications.html#applicationcrashes", [
        [ "Persistent Store Crashed", "troubleshootingumapplications.html#persistentstorecrashed", null ],
        [ "UM Router Crashed", "troubleshootingumapplications.html#umroutercrashed", null ],
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
      [ "UM Persistent Store Log Messages", "umlogmessages.html#umpersistentstorelogmessages", null ]
    ] ]
  ] ]
];

var NAVTREEINDEX =
[
"contactinginformaticasupport.html"
];

var SYNCONMSG = 'click to disable panel synchronisation';
var SYNCOFFMSG = 'click to enable panel synchronisation';