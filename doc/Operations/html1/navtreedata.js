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
    [ "Monitoring", "index.html#monitoring", [
      [ "Monitoring Transport Statistics", "index.html#monitoringtransportstatistics", [
        [ "LBT-RM and LBT-RU Receiver Statistics", "index.html#lbtrmandlbtrureceiverstatistics", null ],
        [ "LBT-RM and LBT-RU Source Statistics", "index.html#lbtrmandlbtrusourcestatistics", null ],
        [ "TCP Statistics", "index.html#tcpstatistics", null ],
        [ "LBT-IPC Statistics", "index.html#lbtipcstatistics", null ]
      ] ],
      [ "Monitoring Event Queues", "index.html#monitoringeventqueues", null ],
      [ "Monitoring Application Log Messages", "index.html#monitoringapplicationlogmessages", null ],
      [ "Monitoring the Persistent Store Daemon (umestored)", "index.html#monitoringthepersistentstoredaemonumestored", [
        [ "Monitoring Store Log File", "index.html#monitoringstorelogfile", null ],
        [ "Monitoring a Store's Internal Transport Statistics", "index.html#monitoringastoresinternaltransportstatistics", null ],
        [ "Persistent Store Web Monitoring", "index.html#persistentstorewebmonitoring", null ],
        [ "Persistent Store Daemon Statistics", "index.html#persistentstoredaemonstatistics", null ],
        [ "Detecting Persistent Store Failures", "index.html#detectingpersistentstorefailures", null ]
      ] ],
      [ "Monitoring the DRO Daemon (tnwgd)", "index.html#monitoringtheumrouterdaemontnwgd", [
        [ "Monitoring DRO Log File", "index.html#monitoringumrouterlogfile", null ],
        [ "DRO Transport Statistics", "index.html#umroutertransportstatistics", null ],
        [ "DRO Web Monitoring", "index.html#umrouterwebmonitoring", null ],
        [ "DRO Daemon Statistics", "index.html#op-umrouterdaemonstatistics", null ],
        [ "Detecting DRO Failures", "index.html#detectingumrouterfailures", null ]
      ] ],
      [ "Monitoring Messaging System Resources", "index.html#monitoringmessagingsystemresources", [
        [ "Persistent Store System Considerations", "index.html#persistentstoresystemconsiderations", null ],
        [ "Sources of Latency", "index.html#sourcesoflatency", null ],
        [ "Runtime Diagnostics", "index.html#runtimediagnostics", null ]
      ] ]
    ] ],
    [ "Startup/Shutdown Procedures", "index.html#startupshutdownprocedures", [
      [ "Topic Resolution", "index.html#topicresolution", null ],
      [ "UM Applications", "index.html#umapplications", null ],
      [ "Indications of Possible Application Shutdown", "index.html#indicationsofpossibleapplicationshutdown", null ],
      [ "Unicast Topic Resolver (lbmrd)", "index.html#unicasttopicresolverlbmrd", null ],
      [ "Persistent Store (umestored)", "index.html#persistentstoreumestored", [
        [ "Starting a Store", "index.html#startingastore", null ],
        [ "Restarting a Store", "index.html#restartingastore", null ],
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
    [ "Monitoring UM Applications", "index.html#monitoringumwiththelbmmonapi", [
      [ "Monitoring Introduction", "index.html#monitoringintroduction", [
        [ "What to Monitor", "index.html#whattomonitor", null ]
      ] ],
      [ "Monitoring Methods", "index.html#monitoringmethods", [
        [ "Monitoring Field Sizes", "index.html#monitoringfieldsizes", null ],
        [ "Application Monitoring Context", "index.html#monitoringcontext", null ]
      ] ],
      [ "UM API Functions and Data Structures", "index.html#umsapifunctionsanddatastructures", [
        [ "Context Statistics", "index.html#contextstatistics", null ],
        [ "Event Queue Statistics", "index.html#eventqueuestatistics", null ],
        [ "Source or Receiver Transport Statistics", "index.html#sourceorreceivertransportstatistics", null ]
      ] ],
      [ "\"lbmmon\" Client API", "index.html#lbmmonapi", [
        [ "Monitoring Process Flow", "index.html#monitoringprocessflow", null ],
        [ "API Framework Flexibility", "index.html#apiframeworkflexibility", null ],
        [ "Initial Monitoring Questions", "index.html#initialmonitoringquestions", null ],
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
        [ "The CSV Format Module", "index.html#thecsvformatmodule", null ]
      ] ],
      [ "Automatic Monitoring", "index.html#automaticmonitoring", null ],
      [ "Monitoring Examples", "index.html#monitoringexamples", [
        [ "lbmmon.c", "index.html#lbmmonc", null ],
        [ "lbmmonudp.c and lbmmondiag.pl", "index.html#lbmmonudpcandlbmmondiagpl", null ]
      ] ],
      [ "Interpreting LBT-RM Source Statistics", "index.html#interpretinglbtrmsourcestatistics", null ]
    ] ],
    [ "UM Monitoring Statistics", "index.html#ummonitoringstatistics", [
      [ "Monitoring Receiving Statistics", "index.html#monitoringreceivingstatistics", null ],
      [ "Monitoring Sending Statistics", "index.html#monitoringsendingstatistics", null ],
      [ "Monitoring Context Statistics", "index.html#monitoringcontextstatistics", null ],
      [ "Monitoring Event Queue Statistics", "index.html#monitoringeventqueuestatistics", null ]
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
      [ "UM Persistent Store Log Messages", "index.html#umpersistentstorelogmessages", null ]
    ] ]
  ] ]
];

var NAVTREEINDEX =
[
"index.html"
];

var SYNCONMSG = 'click to disable panel synchronisation';
var SYNCOFFMSG = 'click to enable panel synchronisation';