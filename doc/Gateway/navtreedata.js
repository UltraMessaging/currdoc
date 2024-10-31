var NAVTREE =
[
  [ "Dynamic Routing Guide", "index.html", [
    [ "Introduction", "index.html", [
      [ "DRO Features", "index.html#drofeatures", null ]
    ] ],
    [ "DRO Architecture", "droarchitecture.html", [
      [ "DRO Portals", "droarchitecture.html#umrouterportals", [
        [ "UDP Peer Link", "droarchitecture.html#udppeerlink", null ]
      ] ],
      [ "Topic Resolution Domains", "droarchitecture.html#topicresolutiondomains", null ],
      [ "Proxy Sources and Proxy Receivers", "droarchitecture.html#proxysourcesandproxyreceivers", [
        [ "DRO and Transport Sessions", "droarchitecture.html#umrouterandtransportsessions", null ]
      ] ],
      [ "Routing", "droarchitecture.html#routing", null ]
    ] ],
    [ "DRO Concepts", "umrouterconcepts.html", [
      [ "Basic DRO Operation", "umrouterconcepts.html#basicumrouteroperation", [
        [ "Interest and Topic Resolution", "umrouterconcepts.html#interestandtopicresolution", null ],
        [ "Interest and Use Queries", "umrouterconcepts.html#interestandusequeries", null ],
        [ "DRO Keepalive", "umrouterconcepts.html#umrouterkeepalive", null ],
        [ "Final Advertisements", "umrouterconcepts.html#finaladvertisements", null ],
        [ "More About Proxy Sources and Receivers", "umrouterconcepts.html#moreaboutproxysourcesandreceivers", null ],
        [ "Protocol Conversion", "umrouterconcepts.html#protocolconversion", null ]
      ] ],
      [ "Multi-Hop Forwarding", "umrouterconcepts.html#multihopforwarding", null ],
      [ "Routing Wildcard Receivers", "umrouterconcepts.html#routingwildcardreceivers", null ],
      [ "Forwarding Costs", "umrouterconcepts.html#forwardingcosts", null ],
      [ "DRO Routing", "umrouterconcepts.html#umrouterrouting", null ],
      [ "Routing Topologies", "umrouterconcepts.html#routingtopologies", [
        [ "Direct Link", "umrouterconcepts.html#directlink", null ],
        [ "Single Link", "umrouterconcepts.html#singlelink", null ],
        [ "Parallel Links", "umrouterconcepts.html#parallellinks", null ],
        [ "Loops", "umrouterconcepts.html#loops", null ],
        [ "Loop and Spur", "umrouterconcepts.html#loopandspur", null ],
        [ "Loop with Centralized TRD", "umrouterconcepts.html#loopwithcentralizedtrd", null ],
        [ "with centralized TRD", "umrouterconcepts.html#Star", null ],
        [ "Star with Centralized DRO", "umrouterconcepts.html#starwithcentralizedumrouter", null ],
        [ "Mesh", "umrouterconcepts.html#mesh", null ],
        [ "Palm Tree", "umrouterconcepts.html#palmtree", null ],
        [ "Dumbbell", "umrouterconcepts.html#dumbbell", null ]
      ] ],
      [ "Unsupported Configurations", "umrouterconcepts.html#unsupportedconfigurations", null ],
      [ "UM Feature Compatibility", "umrouterconcepts.html#umfeaturecompatibility", null ]
    ] ],
    [ "DRO Implementation", "umrouterimplementation.html", [
      [ "DRO Configuration Overview", "umrouterimplementation.html#umrouterconfigurationoverview", null ],
      [ "Creating Applications for DRO Compatibility", "umrouterimplementation.html#creatingapplicationsforumroutercompatibility", [
        [ "Naming and Identification", "umrouterimplementation.html#namingandidentification", null ],
        [ "Portal Costs", "umrouterimplementation.html#portalcosts", null ],
        [ "Access Control Lists (ACL)", "umrouterimplementation.html#accesscontrollistsacl", null ],
        [ "Timers and Intervals", "umrouterimplementation.html#timersandintervals", null ],
        [ "Multicast Immediate Messaging Considerations", "umrouterimplementation.html#multicastimmediatemessagingconsiderations", null ],
        [ "Persistence Over the DRO", "umrouterimplementation.html#persistenceovertheumrouter", null ],
        [ "Late Join and Off-Transport Recovery", "umrouterimplementation.html#latejoinandofftransportrecovery", null ],
        [ "Topic Resolution Reliability", "umrouterimplementation.html#topicresolutionreliability", null ],
        [ "BOS and EOS Behavior Over the DRO", "umrouterimplementation.html#bosandeosbehaviorovertheumrouter", null ],
        [ "DRO Reliable Loss", "umrouterimplementation.html#umrouterreliableloss", null ]
      ] ],
      [ "Topology Configuration Examples", "umrouterimplementation.html#topologyconfigurationexamples", [
        [ "Direct Link Configuration", "umrouterimplementation.html#directlinkconfiguration", null ],
        [ "Peer Link Configuration", "umrouterimplementation.html#peerlinkconfiguration", null ],
        [ "Transit TRD Link Configuration", "umrouterimplementation.html#transittrdlinkconfiguration", null ],
        [ "Parallel Links Configuration", "umrouterimplementation.html#parallellinksconfiguration", null ],
        [ "Loop and Spur Configuration", "umrouterimplementation.html#loopandspurconfiguration", null ],
        [ "Star Configuration", "umrouterimplementation.html#starconfiguration", null ],
        [ "Mesh Configuration", "umrouterimplementation.html#meshconfiguration", null ]
      ] ],
      [ "Using UM Configuration Files with the DRO", "umrouterimplementation.html#usingumconfigurationfileswiththeumrouter", [
        [ "Setting Individual Endpoint Options", "umrouterimplementation.html#settingindividualendpointoptions", null ],
        [ "DRO and UM XML Configuration Use Cases", "umrouterimplementation.html#umrouterandumxmlconfigurationusecases", null ],
        [ "Sample Configuration", "umrouterimplementation.html#sampleconfiguration", null ],
        [ "XML UM Configuration File", "umrouterimplementation.html#xmlumconfigurationfile", null ],
        [ "XML DRO Configuration File", "umrouterimplementation.html#xmlumrouterconfigurationfile", null ]
      ] ],
      [ "Running the DRO Daemon", "umrouterimplementation.html#runningtheumrouterdaemon", null ]
    ] ],
    [ "DRO Monitoring", "umroutermonitoring.html", [
      [ "DRO Monitoring: Logs", "umroutermonitoring.html#dromonitoringlogs", null ],
      [ "DRO Monitoring: UM Library Stats", "umroutermonitoring.html#dromonitoringumlibrarystats", null ],
      [ "DRO Monitoring: Daemon Stats", "umroutermonitoring.html#dromonitoringdaemonstats", null ],
      [ "DRO Web Monitor", "umroutermonitoring.html#umrouterwebmonitor", [
        [ "Main Page", "umroutermonitoring.html#mainpage", null ],
        [ "Endpoint Portal Page", "umroutermonitoring.html#endpointportalpage", null ],
        [ "Peer Portal Page", "umroutermonitoring.html#peerportalpage", null ],
        [ "Topology Info Page", "umroutermonitoring.html#topologyinfopage", null ],
        [ "Path Info", "umroutermonitoring.html#pathinfo", null ]
      ] ],
      [ "DRO Log Messages", "umroutermonitoring.html#umrouterlogmessages", [
        [ "DRO Rolling Logs", "umroutermonitoring.html#umrouterrollinglogs", null ],
        [ "Important DRO Log Messages", "umroutermonitoring.html#importantumrouterlogmessages", null ]
      ] ],
      [ "DRO Transport Stats", "umroutermonitoring.html#umroutertransportstats", null ]
    ] ],
    [ "Man Pages for DRO", "manpagesforumrouter.html", [
      [ "Tnwgd Man Page", "manpagesforumrouter.html#tnwgdmanpage", null ],
      [ "Tnwgds Man Page", "manpagesforumrouter.html#tnwgdsmanpage", null ]
    ] ],
    [ "DRO Configuration Reference", "xmlconfigurationreference.html", [
      [ "File Structure", "xmlconfigurationreference.html#filestructure", null ],
      [ "Share/Merge DRO XML Files with XInclude", "xmlconfigurationreference.html#mergingmultipledroxmlconfigurationfiles", [
        [ "Common DRO XInclude Use Case", "xmlconfigurationreference.html#commondroxincludeusecase", null ]
      ] ],
      [ "Elements Reference", "xmlconfigurationreference.html#elementsreference", [
        [ "Router Element \"<tnw-gateway>\"", "xmlconfigurationreference.html#droelementtnwgateway", null ],
        [ "Router Element \"<portals>\"", "xmlconfigurationreference.html#droelementportals", null ],
        [ "Router Element \"<peer>\"", "xmlconfigurationreference.html#droelementpeer", null ],
        [ "Router Element \"<publishing-interval>\"", "xmlconfigurationreference.html#droelementpublishinginterval", null ],
        [ "Router Element \"<group>\"", "xmlconfigurationreference.html#droelementgroup", null ],
        [ "Router Element \"<gateway-keepalive>\"", "xmlconfigurationreference.html#droelementgatewaykeepalive", null ],
        [ "Router Element \"<context-query>\"", "xmlconfigurationreference.html#droelementcontextquery", null ],
        [ "Router Element \"<sqn-window>\"", "xmlconfigurationreference.html#droelementsqnwindow", null ],
        [ "Router Element \"<receiver-context-name>\"", "xmlconfigurationreference.html#droelementreceivercontextname", null ],
        [ "Router Element \"<source-context-name>\"", "xmlconfigurationreference.html#droelementsourcecontextname", null ],
        [ "Router Element \"<pattern-use-check>\"", "xmlconfigurationreference.html#droelementpatternusecheck", null ],
        [ "Router Element \"<topic-use-check>\"", "xmlconfigurationreference.html#droelementtopicusecheck", null ],
        [ "Router Element \"<pattern-domain-activity>\"", "xmlconfigurationreference.html#droelementpatterndomainactivity", null ],
        [ "Router Element \"<pattern-interest-generate>\"", "xmlconfigurationreference.html#droelementpatterninterestgenerate", null ],
        [ "Router Element \"<pattern-purge>\"", "xmlconfigurationreference.html#droelementpatternpurge", null ],
        [ "Router Element \"<topic-domain-activity>\"", "xmlconfigurationreference.html#droelementtopicdomainactivity", null ],
        [ "Router Element \"<topic-interest-generate>\"", "xmlconfigurationreference.html#droelementtopicinterestgenerate", null ],
        [ "Router Element \"<topic-purge>\"", "xmlconfigurationreference.html#droelementtopicpurge", null ],
        [ "Router Element \"<acl>\"", "xmlconfigurationreference.html#droelementacl", null ],
        [ "Router Element \"<outbound>\"", "xmlconfigurationreference.html#droelementoutbound", null ],
        [ "Router Element \"<ace>\"", "xmlconfigurationreference.html#droelementace", null ],
        [ "Router Element \"<xport-id>\"", "xmlconfigurationreference.html#droelementxportid", null ],
        [ "Router Element \"<tcp-source-port>\"", "xmlconfigurationreference.html#droelementtcpsourceport", null ],
        [ "Router Element \"<udp-destination-port>\"", "xmlconfigurationreference.html#droelementudpdestinationport", null ],
        [ "Router Element \"<udp-source-port>\"", "xmlconfigurationreference.html#droelementudpsourceport", null ],
        [ "Router Element \"<multicast-group>\"", "xmlconfigurationreference.html#droelementmulticastgroup", null ],
        [ "Router Element \"<source-ip>\"", "xmlconfigurationreference.html#droelementsourceip", null ],
        [ "Router Element \"<transport>\"", "xmlconfigurationreference.html#droelementtransport", null ],
        [ "Router Element \"<regex-pattern>\"", "xmlconfigurationreference.html#droelementregexpattern", null ],
        [ "Router Element \"<pcre-pattern>\"", "xmlconfigurationreference.html#droelementpcrepattern", null ],
        [ "Router Element \"<topic>\"", "xmlconfigurationreference.html#droelementtopic", null ],
        [ "Router Element \"<inbound>\"", "xmlconfigurationreference.html#droelementinbound", null ],
        [ "Router Element \"<lbm-attributes>\"", "xmlconfigurationreference.html#droelementlbmattributes", null ],
        [ "Router Element \"<option>\"", "xmlconfigurationreference.html#droelementoption", null ],
        [ "Router Element \"<lbm-config>\"", "xmlconfigurationreference.html#droelementlbmconfig", null ],
        [ "Router Element \"<batching>\"", "xmlconfigurationreference.html#droelementbatching", null ],
        [ "Router Element \"<batch-interval>\"", "xmlconfigurationreference.html#droelementbatchinterval", null ],
        [ "Router Element \"<min-length>\"", "xmlconfigurationreference.html#droelementminlength", null ],
        [ "Router Element \"<max-datagram>\"", "xmlconfigurationreference.html#droelementmaxdatagram", null ],
        [ "Router Element \"<smart-batch>\"", "xmlconfigurationreference.html#droelementsmartbatch", null ],
        [ "Router Element \"<max-queue>\"", "xmlconfigurationreference.html#droelementmaxqueue", null ],
        [ "Router Element \"<source-deletion-delay>\"", "xmlconfigurationreference.html#droelementsourcedeletiondelay", null ],
        [ "Router Element \"<udp>\"", "xmlconfigurationreference.html#droelementudp", null ],
        [ "Router Element \"<connect>\"", "xmlconfigurationreference.html#droelementconnect", null ],
        [ "Router Element \"<session-message>\"", "xmlconfigurationreference.html#droelementsessionmessage", null ],
        [ "Router Element \"<nak-handling>\"", "xmlconfigurationreference.html#droelementnakhandling", null ],
        [ "Router Element \"<peer-rate-limit>\"", "xmlconfigurationreference.html#droelementpeerratelimit", null ],
        [ "Router Element \"<transmission-window>\"", "xmlconfigurationreference.html#droelementtransmissionwindow", null ],
        [ "Router Element \"<coalesce-threshold>\"", "xmlconfigurationreference.html#droelementcoalescethreshold", null ],
        [ "Router Element \"<multiple-receive-max-datagrams>\"", "xmlconfigurationreference.html#droelementmultiplereceivemaxdatagrams", null ],
        [ "Router Element \"<send-buffer>\"", "xmlconfigurationreference.html#droelementsendbuffer", null ],
        [ "Router Element \"<receive-buffer>\"", "xmlconfigurationreference.html#droelementreceivebuffer", null ],
        [ "Router Element \"<port>\"", "xmlconfigurationreference.html#droelementport", null ],
        [ "Router Element \"<single-tcp>\"", "xmlconfigurationreference.html#droelementsingletcp", null ],
        [ "Router Element \"<acceptor>\"", "xmlconfigurationreference.html#droelementacceptor", null ],
        [ "Router Element \"<listen-port>\"", "xmlconfigurationreference.html#droelementlistenport", null ],
        [ "Router Element \"<initiator>\"", "xmlconfigurationreference.html#droelementinitiator", null ],
        [ "Router Element \"<address>\"", "xmlconfigurationreference.html#droelementaddress", null ],
        [ "Router Element \"<tls>\"", "xmlconfigurationreference.html#droelementtls", null ],
        [ "Router Element \"<cipher-suites>\"", "xmlconfigurationreference.html#droelementciphersuites", null ],
        [ "Router Element \"<trusted-certificates>\"", "xmlconfigurationreference.html#droelementtrustedcertificates", null ],
        [ "Router Element \"<certificate-key-password>\"", "xmlconfigurationreference.html#droelementcertificatekeypassword", null ],
        [ "Router Element \"<certificate-key>\"", "xmlconfigurationreference.html#droelementcertificatekey", null ],
        [ "Router Element \"<certificate>\"", "xmlconfigurationreference.html#droelementcertificate", null ],
        [ "Router Element \"<compression>\"", "xmlconfigurationreference.html#droelementcompression", null ],
        [ "Router Element \"<nodelay>\"", "xmlconfigurationreference.html#droelementnodelay", null ],
        [ "Router Element \"<keepalive>\"", "xmlconfigurationreference.html#droelementkeepalive", null ],
        [ "Router Element \"<interface>\"", "xmlconfigurationreference.html#droelementinterface", null ],
        [ "Router Element \"<tcp>\"", "xmlconfigurationreference.html#droelementtcp", null ],
        [ "Router Element \"<companion>\"", "xmlconfigurationreference.html#droelementcompanion", null ],
        [ "Router Element \"<sourcemap>\"", "xmlconfigurationreference.html#droelementsourcemap", null ],
        [ "Router Element \"<cost>\"", "xmlconfigurationreference.html#droelementcost", null ],
        [ "Router Element \"<name>\"", "xmlconfigurationreference.html#droelementname", null ],
        [ "Router Element \"<endpoint>\"", "xmlconfigurationreference.html#droelementendpoint", null ],
        [ "Router Element \"<remote-pattern>\"", "xmlconfigurationreference.html#droelementremotepattern", null ],
        [ "Router Element \"<remote-topic>\"", "xmlconfigurationreference.html#droelementremotetopic", null ],
        [ "Router Element \"<late-join>\"", "xmlconfigurationreference.html#droelementlatejoin", null ],
        [ "Router Element \"<topic-resolution>\"", "xmlconfigurationreference.html#droelementtopicresolution", null ],
        [ "Router Element \"<initial-request>\"", "xmlconfigurationreference.html#droelementinitialrequest", null ],
        [ "Router Element \"<domain-route>\"", "xmlconfigurationreference.html#droelementdomainroute", null ],
        [ "Router Element \"<rate-limit>\"", "xmlconfigurationreference.html#droelementratelimit", null ],
        [ "Router Element \"<remote-pattern-interest>\"", "xmlconfigurationreference.html#droelementremotepatterninterest", null ],
        [ "Router Element \"<remote-topic-interest>\"", "xmlconfigurationreference.html#droelementremotetopicinterest", null ],
        [ "Router Element \"<pattern-use-query>\"", "xmlconfigurationreference.html#droelementpatternusequery", null ],
        [ "Router Element \"<topic-use-query>\"", "xmlconfigurationreference.html#droelementtopicusequery", null ],
        [ "Router Element \"<domain-id>\"", "xmlconfigurationreference.html#droelementdomainid", null ],
        [ "Router Element \"<daemon>\"", "xmlconfigurationreference.html#droelementdaemon", null ],
        [ "Router Element \"<route-recalculation>\"", "xmlconfigurationreference.html#droelementrouterecalculation", null ],
        [ "Router Element \"<route-info>\"", "xmlconfigurationreference.html#droelementrouteinfo", null ],
        [ "Router Element \"<xml-config>\"", "xmlconfigurationreference.html#droelementxmlconfig", null ],
        [ "Router Element \"<propagation-delay>\"", "xmlconfigurationreference.html#droelementpropagationdelay", null ],
        [ "Router Element \"<daemon-monitor>\"", "xmlconfigurationreference.html#droelementdaemonmonitor", null ],
        [ "Router Element \"<remote-config-changes-request>\"", "xmlconfigurationreference.html#droelementremoteconfigchangesrequest", null ],
        [ "Router Element \"<remote-snapshot-request>\"", "xmlconfigurationreference.html#droelementremotesnapshotrequest", null ],
        [ "Router Element \"<web-monitor>\"", "xmlconfigurationreference.html#droelementwebmonitor", null ],
        [ "Router Element \"<monitor>\"", "xmlconfigurationreference.html#droelementmonitor", null ],
        [ "Router Element \"<format-module>\"", "xmlconfigurationreference.html#droelementformatmodule", null ],
        [ "Router Element \"<transport-module>\"", "xmlconfigurationreference.html#droelementtransportmodule", null ],
        [ "Router Element \"<patternmap>\"", "xmlconfigurationreference.html#droelementpatternmap", null ],
        [ "Router Element \"<topicmap>\"", "xmlconfigurationreference.html#droelementtopicmap", null ],
        [ "Router Element \"<lbm-license-file>\"", "xmlconfigurationreference.html#droelementlbmlicensefile", null ],
        [ "Router Element \"<pidfile>\"", "xmlconfigurationreference.html#droelementpidfile", null ],
        [ "Router Element \"<gid>\"", "xmlconfigurationreference.html#droelementgid", null ],
        [ "Router Element \"<uid>\"", "xmlconfigurationreference.html#droelementuid", null ],
        [ "Router Element \"<log>\"", "xmlconfigurationreference.html#droelementlog", null ]
      ] ],
      [ "DRO Configuration DTD", "xmlconfigurationreference.html#umrouterconfigurationdtd", null ]
    ] ],
    [ "DRO Binary Daemon Statistics", "umrouterdaemonstatistics.html", [
      [ "DRO Daemon Statistics Structures", "umrouterdaemonstatistics.html#umrouterdaemonstatisticsstructures", [
        [ "DRO Daemon Statistics Byte Swapping", "umrouterdaemonstatistics.html#umrouterdaemonstatisticsbyteswapping", null ],
        [ "DRO Daemon Statistics String Buffers", "umrouterdaemonstatistics.html#umrouterdaemonstatisticsstructuresstringbuffers", null ]
      ] ],
      [ "DRO Daemon Statistics Configuration", "umrouterdaemonstatistics.html#umrouterdaemonstatisticsconfiguration", null ],
      [ "DRO Daemon Control Requests", "umrouterdaemonstatistics.html#umrouterdaemoncontrolrequests", [
        [ "DRO Daemon Control Request Addressing", "umrouterdaemonstatistics.html#umrouterdaemoncontrolrequestaddressing", null ],
        [ "DRO Control Request Types", "umrouterdaemonstatistics.html#umrouterdaemoncontrolrequesttypes", null ]
      ] ]
    ] ],
    [ "DRO Glossary", "umrouterglossary.html", null ],
    [ "Comparison to Pre-6.0 UM Gateway", "comparisontopre60umgateway.html", [
      [ "Added Features and Differences", "comparisontopre60umgateway.html#addedfeaturesanddifferences", null ]
    ] ]
  ] ]
];

var NAVTREEINDEX =
[
"comparisontopre60umgateway.html"
];

var SYNCONMSG = 'click to disable panel synchronisation';
var SYNCOFFMSG = 'click to enable panel synchronisation';