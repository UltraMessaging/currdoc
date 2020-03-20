var NAVTREE =
[
  [ "Dynamic Routing Guide", "index.html", [
    [ "Introduction", "index.html#firstsect", [
      [ "DRO Features", "index.html#drofeatures", null ]
    ] ],
    [ "DRO Architecture", "index.html#droarchitecture", [
      [ "DRO Portals", "index.html#umrouterportals", null ],
      [ "Topic Resolution Domains", "index.html#topicresolutiondomains", null ],
      [ "Proxy Sources and Proxy Receivers", "index.html#proxysourcesandproxyreceivers", [
        [ "DRO and Transport Sessions", "index.html#umrouterandtransportsessions", null ]
      ] ],
      [ "Routing", "index.html#routing", null ]
    ] ],
    [ "DRO Concepts", "index.html#umrouterconcepts", [
      [ "Basic DRO Operation", "index.html#basicumrouteroperation", [
        [ "Interest and Use Queries", "index.html#interestandusequeries", null ],
        [ "DRO Keepalive", "index.html#umrouterkeepalive", null ],
        [ "Final Advertisements", "index.html#finaladvertisements", null ],
        [ "More About Proxy Sources and Receivers", "index.html#moreaboutproxysourcesandreceivers", null ],
        [ "Protocol Conversion", "index.html#protocolconversion", null ]
      ] ],
      [ "Multi-Hop Forwarding", "index.html#multihopforwarding", null ],
      [ "Routing Wildcard Receivers", "index.html#routingwildcardreceivers", null ],
      [ "Forwarding Costs", "index.html#forwardingcosts", null ],
      [ "DRO Routing", "index.html#umrouterrouting", null ],
      [ "Routing Topologies", "index.html#routingtopologies", [
        [ "Direct Link", "index.html#directlink", null ],
        [ "Single Link", "index.html#singlelink", null ],
        [ "Parallel Links", "index.html#parallellinks", null ],
        [ "Loops", "index.html#loops", null ],
        [ "Loop and Spur", "index.html#loopandspur", null ],
        [ "Loop with Centralized TRD", "index.html#loopwithcentralizedtrd", null ],
        [ "with centralized TRD", "index.html#Star", null ],
        [ "Star with Centralized DRO", "index.html#starwithcentralizedumrouter", null ],
        [ "Mesh", "index.html#mesh", null ],
        [ "Palm Tree", "index.html#palmtree", null ],
        [ "Dumbbell", "index.html#dumbbell", null ]
      ] ],
      [ "Unsupported Configurations", "index.html#unsupportedconfigurations", null ],
      [ "UM Feature Compatibility", "index.html#umfeaturecompatibility", null ]
    ] ],
    [ "DRO Implementation", "index.html#umrouterimplementation", [
      [ "DRO Configuration Overview", "index.html#umrouterconfigurationoverview", null ],
      [ "Creating Applications for DRO Compatibility", "index.html#creatingapplicationsforumroutercompatibility", [
        [ "Naming and Identification", "index.html#namingandidentification", null ],
        [ "Portal Costs", "index.html#portalcosts", null ],
        [ "Access Control Lists (ACL)", "index.html#accesscontrollistsacl", null ],
        [ "Timers and Intervals", "index.html#timersandintervals", null ],
        [ "Multicast Immediate Messaging Considerations", "index.html#multicastimmediatemessagingconsiderations", null ],
        [ "Persistence Over the DRO", "index.html#persistenceovertheumrouter", null ],
        [ "Late Join and Off-Transport Recovery", "index.html#latejoinandofftransportrecovery", null ],
        [ "Topic Resolution Reliability", "index.html#topicresolutionreliability", null ],
        [ "BOS and EOS Behavior Over the DRO", "index.html#bosandeosbehaviorovertheumrouter", null ],
        [ "DRO Reliable Loss", "index.html#umrouterreliableloss", null ]
      ] ],
      [ "Topology Configuration Examples", "index.html#topologyconfigurationexamples", [
        [ "Direct Link Configuration", "index.html#directlinkconfiguration", null ],
        [ "Peer Link Configuration", "index.html#peerlinkconfiguration", null ],
        [ "Transit TRD Link Configuration", "index.html#transittrdlinkconfiguration", null ],
        [ "Parallel Links Configuration", "index.html#parallellinksconfiguration", null ],
        [ "Loop and Spur Configuration", "index.html#loopandspurconfiguration", null ],
        [ "Star Configuration", "index.html#starconfiguration", null ],
        [ "Mesh Configuration", "index.html#meshconfiguration", null ]
      ] ],
      [ "Using UM Configuration Files with the DRO", "index.html#usingumconfigurationfileswiththeumrouter", [
        [ "Setting Individual Endpoint Options", "index.html#settingindividualendpointoptions", null ],
        [ "DRO and UM XML Configuration Use Cases", "index.html#umrouterandumxmlconfigurationusecases", null ],
        [ "Sample Configuration", "index.html#sampleconfiguration", null ],
        [ "XML UM Configuration File", "index.html#xmlumconfigurationfile", null ],
        [ "XML DRO Configuration File", "index.html#xmlumrouterconfigurationfile", null ]
      ] ],
      [ "Running the DRO Daemon", "index.html#runningtheumrouterdaemon", null ]
    ] ],
    [ "Man Pages for DRO", "index.html#manpagesforumrouter", [
      [ "Tnwgd Man Page", "index.html#tnwgdmanpage", null ],
      [ "Tnwgds Man Page", "index.html#tnwgdsmanpage", null ]
    ] ],
    [ "XML Configuration Reference", "index.html#xmlconfigurationreference", [
      [ "File Structure", "index.html#filestructure", null ],
      [ "Elements Reference", "index.html#elementsreference", [
        [ "Router Element \"<tnw-gateway>\"", "index.html#droelementtnwgateway", null ],
        [ "Router Element \"<portals>\"", "index.html#droelementportals", null ],
        [ "Router Element \"<peer>\"", "index.html#droelementpeer", null ],
        [ "Router Element \"<publishing-interval>\"", "index.html#droelementpublishinginterval", null ],
        [ "Router Element \"<group>\"", "index.html#droelementgroup", null ],
        [ "Router Element \"<gateway-keepalive>\"", "index.html#droelementgatewaykeepalive", null ],
        [ "Router Element \"<context-query>\"", "index.html#droelementcontextquery", null ],
        [ "Router Element \"<sqn-window>\"", "index.html#droelementsqnwindow", null ],
        [ "Router Element \"<receiver-context-name>\"", "index.html#droelementreceivercontextname", null ],
        [ "Router Element \"<source-context-name>\"", "index.html#droelementsourcecontextname", null ],
        [ "Router Element \"<pattern-use-check>\"", "index.html#droelementpatternusecheck", null ],
        [ "Router Element \"<topic-use-check>\"", "index.html#droelementtopicusecheck", null ],
        [ "Router Element \"<pattern-domain-activity>\"", "index.html#droelementpatterndomainactivity", null ],
        [ "Router Element \"<pattern-interest-generate>\"", "index.html#droelementpatterninterestgenerate", null ],
        [ "Router Element \"<pattern-purge>\"", "index.html#droelementpatternpurge", null ],
        [ "Router Element \"<topic-domain-activity>\"", "index.html#droelementtopicdomainactivity", null ],
        [ "Router Element \"<topic-interest-generate>\"", "index.html#droelementtopicinterestgenerate", null ],
        [ "Router Element \"<topic-purge>\"", "index.html#droelementtopicpurge", null ],
        [ "Router Element \"<acl>\"", "index.html#droelementacl", null ],
        [ "Router Element \"<outbound>\"", "index.html#droelementoutbound", null ],
        [ "Router Element \"<ace>\"", "index.html#droelementace", null ],
        [ "Router Element \"<xport-id>\"", "index.html#droelementxportid", null ],
        [ "Router Element \"<tcp-source-port>\"", "index.html#droelementtcpsourceport", null ],
        [ "Router Element \"<udp-destination-port>\"", "index.html#droelementudpdestinationport", null ],
        [ "Router Element \"<udp-source-port>\"", "index.html#droelementudpsourceport", null ],
        [ "Router Element \"<multicast-group>\"", "index.html#droelementmulticastgroup", null ],
        [ "Router Element \"<source-ip>\"", "index.html#droelementsourceip", null ],
        [ "Router Element \"<transport>\"", "index.html#droelementtransport", null ],
        [ "Router Element \"<regex-pattern>\"", "index.html#droelementregexpattern", null ],
        [ "Router Element \"<pcre-pattern>\"", "index.html#droelementpcrepattern", null ],
        [ "Router Element \"<topic>\"", "index.html#droelementtopic", null ],
        [ "Router Element \"<inbound>\"", "index.html#droelementinbound", null ],
        [ "Router Element \"<lbm-attributes>\"", "index.html#droelementlbmattributes", null ],
        [ "Router Element \"<option>\"", "index.html#droelementoption", null ],
        [ "Router Element \"<lbm-config>\"", "index.html#droelementlbmconfig", null ],
        [ "Router Element \"<batching>\"", "index.html#droelementbatching", null ],
        [ "Router Element \"<batch-interval>\"", "index.html#droelementbatchinterval", null ],
        [ "Router Element \"<min-length>\"", "index.html#droelementminlength", null ],
        [ "Router Element \"<max-datagram>\"", "index.html#droelementmaxdatagram", null ],
        [ "Router Element \"<smart-batch>\"", "index.html#droelementsmartbatch", null ],
        [ "Router Element \"<max-queue>\"", "index.html#droelementmaxqueue", null ],
        [ "Router Element \"<source-deletion-delay>\"", "index.html#droelementsourcedeletiondelay", null ],
        [ "Router Element \"<single-tcp>\"", "index.html#droelementsingletcp", null ],
        [ "Router Element \"<acceptor>\"", "index.html#droelementacceptor", null ],
        [ "Router Element \"<listen-port>\"", "index.html#droelementlistenport", null ],
        [ "Router Element \"<initiator>\"", "index.html#droelementinitiator", null ],
        [ "Router Element \"<port>\"", "index.html#droelementport", null ],
        [ "Router Element \"<address>\"", "index.html#droelementaddress", null ],
        [ "Router Element \"<tls>\"", "index.html#droelementtls", null ],
        [ "Router Element \"<cipher-suites>\"", "index.html#droelementciphersuites", null ],
        [ "Router Element \"<trusted-certificates>\"", "index.html#droelementtrustedcertificates", null ],
        [ "Router Element \"<certificate-key-password>\"", "index.html#droelementcertificatekeypassword", null ],
        [ "Router Element \"<certificate-key>\"", "index.html#droelementcertificatekey", null ],
        [ "Router Element \"<certificate>\"", "index.html#droelementcertificate", null ],
        [ "Router Element \"<compression>\"", "index.html#droelementcompression", null ],
        [ "Router Element \"<nodelay>\"", "index.html#droelementnodelay", null ],
        [ "Router Element \"<keepalive>\"", "index.html#droelementkeepalive", null ],
        [ "Router Element \"<send-buffer>\"", "index.html#droelementsendbuffer", null ],
        [ "Router Element \"<receive-buffer>\"", "index.html#droelementreceivebuffer", null ],
        [ "Router Element \"<interface>\"", "index.html#droelementinterface", null ],
        [ "Router Element \"<tcp>\"", "index.html#droelementtcp", null ],
        [ "Router Element \"<companion>\"", "index.html#droelementcompanion", null ],
        [ "Router Element \"<sourcemap>\"", "index.html#droelementsourcemap", null ],
        [ "Router Element \"<cost>\"", "index.html#droelementcost", null ],
        [ "Router Element \"<name>\"", "index.html#droelementname", null ],
        [ "Router Element \"<endpoint>\"", "index.html#droelementendpoint", null ],
        [ "Router Element \"<remote-pattern>\"", "index.html#droelementremotepattern", null ],
        [ "Router Element \"<remote-topic>\"", "index.html#droelementremotetopic", null ],
        [ "Router Element \"<late-join>\"", "index.html#droelementlatejoin", null ],
        [ "Router Element \"<topic-resolution>\"", "index.html#droelementtopicresolution", null ],
        [ "Router Element \"<initial-request>\"", "index.html#droelementinitialrequest", null ],
        [ "Router Element \"<domain-route>\"", "index.html#droelementdomainroute", null ],
        [ "Router Element \"<rate-limit>\"", "index.html#droelementratelimit", null ],
        [ "Router Element \"<remote-pattern-interest>\"", "index.html#droelementremotepatterninterest", null ],
        [ "Router Element \"<remote-topic-interest>\"", "index.html#droelementremotetopicinterest", null ],
        [ "Router Element \"<pattern-use-query>\"", "index.html#droelementpatternusequery", null ],
        [ "Router Element \"<topic-use-query>\"", "index.html#droelementtopicusequery", null ],
        [ "Router Element \"<domain-id>\"", "index.html#droelementdomainid", null ],
        [ "Router Element \"<daemon>\"", "index.html#droelementdaemon", null ],
        [ "Router Element \"<route-recalculation>\"", "index.html#droelementrouterecalculation", null ],
        [ "Router Element \"<route-info>\"", "index.html#droelementrouteinfo", null ],
        [ "Router Element \"<xml-config>\"", "index.html#droelementxmlconfig", null ],
        [ "Router Element \"<propagation-delay>\"", "index.html#droelementpropagationdelay", null ],
        [ "Router Element \"<daemon-monitor>\"", "index.html#droelementdaemonmonitor", null ],
        [ "Router Element \"<remote-config-changes-request>\"", "index.html#droelementremoteconfigchangesrequest", null ],
        [ "Router Element \"<remote-snapshot-request>\"", "index.html#droelementremotesnapshotrequest", null ],
        [ "Router Element \"<web-monitor>\"", "index.html#droelementwebmonitor", null ],
        [ "Router Element \"<monitor>\"", "index.html#droelementmonitor", null ],
        [ "Router Element \"<format-module>\"", "index.html#droelementformatmodule", null ],
        [ "Router Element \"<transport-module>\"", "index.html#droelementtransportmodule", null ],
        [ "Router Element \"<patternmap>\"", "index.html#droelementpatternmap", null ],
        [ "Router Element \"<topicmap>\"", "index.html#droelementtopicmap", null ],
        [ "Router Element \"<lbm-license-file>\"", "index.html#droelementlbmlicensefile", null ],
        [ "Router Element \"<pidfile>\"", "index.html#droelementpidfile", null ],
        [ "Router Element \"<gid>\"", "index.html#droelementgid", null ],
        [ "Router Element \"<uid>\"", "index.html#droelementuid", null ],
        [ "Router Element \"<log>\"", "index.html#droelementlog", null ]
      ] ],
      [ "DRO Configuration DTD", "index.html#umrouterconfigurationdtd", null ]
    ] ],
    [ "DRO Daemon Statistics", "index.html#umrouterdaemonstatistics", [
      [ "DRO Daemon Statistics Structures", "index.html#umrouterdaemonstatisticsstructures", [
        [ "DRO Daemon Statistics Byte Swapping", "index.html#umrouterdaemonstatisticsbyteswapping", null ],
        [ "DRO Daemon Statistics String Buffers", "index.html#umrouterdaemonstatisticsstructuresstringbuffers", null ]
      ] ],
      [ "DRO Daemon Statistics Configuration", "index.html#umrouterdaemonstatisticsconfiguration", null ],
      [ "DRO Daemon Statistics Requests", "index.html#umrouterdaemonstatisticsrequests", null ]
    ] ],
    [ "DRO Monitoring", "index.html#umroutermonitoring", [
      [ "DRO Web Monitor", "index.html#umrouterwebmonitor", [
        [ "Main Page", "index.html#mainpage", null ],
        [ "Endpoint Portal Page", "index.html#endpointportalpage", null ],
        [ "Peer Portal Page", "index.html#peerportalpage", null ],
        [ "Topology Info Page", "index.html#topologyinfopage", null ],
        [ "Path Info", "index.html#pathinfo", null ]
      ] ],
      [ "DRO Log Messages", "index.html#umrouterlogmessages", [
        [ "DRO Rolling Logs", "index.html#umrouterrollinglogs", null ],
        [ "Important DRO Log Messages", "index.html#importantumrouterlogmessages", null ]
      ] ],
      [ "DRO Transport Stats", "index.html#umroutertransportstats", null ]
    ] ],
    [ "DRO Glossary", "index.html#umrouterglossary", null ],
    [ "Comparison to Pre-6.0 UM Gateway", "index.html#comparisontopre60umgateway", [
      [ "Added Features and Differences", "index.html#addedfeaturesanddifferences", null ]
    ] ]
  ] ]
];

var NAVTREEINDEX =
[
"index.html"
];

var SYNCONMSG = 'click to disable panel synchronisation';
var SYNCOFFMSG = 'click to enable panel synchronisation';