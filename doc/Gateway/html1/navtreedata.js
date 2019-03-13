var NAVTREE =
[
  [ "Dynamic Routing Guide", "index.html", [
    [ "Introduction", "index.html#firstsect", [
      [ "DRO Features", "index.html#drofeatures", null ]
    ] ],
    [ "DRO Architecture", "index.html#droarchitecture", [
      [ "UM Router Portals", "index.html#umrouterportals", null ],
      [ "Topic Resolution Domains", "index.html#topicresolutiondomains", null ],
      [ "Proxy Sources and Proxy Receivers", "index.html#proxysourcesandproxyreceivers", null ],
      [ "Routing", "index.html#routing", null ]
    ] ],
    [ "UM Router Concepts", "index.html#umrouterconcepts", [
      [ "Basic UM Router Operation", "index.html#basicumrouteroperation", [
        [ "Interest and Use Queries", "index.html#interestandusequeries", null ],
        [ "UM Router Keepalive", "index.html#umrouterkeepalive", null ],
        [ "Final Advertisements", "index.html#finaladvertisements", null ],
        [ "More About Proxy Sources and Receivers", "index.html#moreaboutproxysourcesandreceivers", null ],
        [ "Protocol Conversion", "index.html#protocolconversion", null ]
      ] ],
      [ "Multi-Hop Forwarding", "index.html#multihopforwarding", null ],
      [ "Routing Wildcard Receivers", "index.html#routingwildcardreceivers", null ],
      [ "Forwarding Costs", "index.html#forwardingcosts", null ],
      [ "UM Router Routing", "index.html#umrouterrouting", null ],
      [ "Routing Topologies", "index.html#routingtopologies", [
        [ "Direct Link", "index.html#directlink", null ],
        [ "Single Link", "index.html#singlelink", null ],
        [ "Parallel Links", "index.html#parallellinks", null ],
        [ "Loops", "index.html#loops", null ],
        [ "Loop and Spur", "index.html#loopandspur", null ],
        [ "Loop with Centralized TRD", "index.html#loopwithcentralizedtrd", null ],
        [ "with centralized TRD", "index.html#Star", null ],
        [ "Star with Centralized UM Router", "index.html#starwithcentralizedumrouter", null ],
        [ "Mesh", "index.html#mesh", null ],
        [ "Palm Tree", "index.html#palmtree", null ],
        [ "Dumbbell", "index.html#dumbbell", null ]
      ] ],
      [ "Unsupported Configurations", "index.html#unsupportedconfigurations", null ],
      [ "UM Feature Compatibility", "index.html#umfeaturecompatibility", null ]
    ] ],
    [ "UM Router Implementation", "index.html#umrouterimplementation", [
      [ "UM Router Configuration Overview", "index.html#umrouterconfigurationoverview", null ],
      [ "Creating Applications for UM Router Compatibility", "index.html#creatingapplicationsforumroutercompatibility", [
        [ "Naming and Identification", "index.html#namingandidentification", null ],
        [ "Portal Costs", "index.html#portalcosts", null ],
        [ "Access Control Lists (ACL)", "index.html#accesscontrollistsacl", null ],
        [ "Timers and Intervals", "index.html#timersandintervals", null ],
        [ "Multicast Immediate Messaging Considerations", "index.html#multicastimmediatemessagingconsiderations", null ],
        [ "Persistence Over the UM Router", "index.html#persistenceovertheumrouter", null ],
        [ "Late Join and Off-Transport Recovery", "index.html#latejoinandofftransportrecovery", null ],
        [ "Topic Resolution Reliability", "index.html#topicresolutionreliability", null ],
        [ "BOS and EOS Behavior Over the UM Router", "index.html#bosandeosbehaviorovertheumrouter", null ],
        [ "UM Router Reliable Loss", "index.html#umrouterreliableloss", null ]
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
      [ "Using UM Configuration Files with the UM Router", "index.html#usingumconfigurationfileswiththeumrouter", [
        [ "Setting Individual Endpoint Options", "index.html#settingindividualendpointoptions", null ],
        [ "UM Router and UM XML Configuration Use Cases", "index.html#umrouterandumxmlconfigurationusecases", null ],
        [ "Sample Configuration", "index.html#sampleconfiguration", null ],
        [ "XML UM Configuration File", "index.html#xmlumconfigurationfile", null ],
        [ "XML UM Router Configuration File", "index.html#xmlumrouterconfigurationfile", null ]
      ] ],
      [ "Running the UM Router Daemon", "index.html#runningtheumrouterdaemon", null ]
    ] ],
    [ "Man Pages for UM Router", "index.html#manpagesforumrouter", [
      [ "Tnwgd Man Page", "index.html#tnwgdmanpage", null ],
      [ "Tnwgds Man Page", "index.html#tnwgdsmanpage", null ]
    ] ],
    [ "XML Configuration Reference", "index.html#xmlconfigurationreference", [
      [ "File Structure", "index.html#filestructure", null ],
      [ "Elements Reference", "index.html#elementsreference", [
        [ "<tnw-gateway>", "index.html#drocfg_tnw-gateway", null ],
        [ "<daemon>", "index.html#drocfg_daemon", null ],
        [ "<name>", "index.html#drocfg_name", null ],
        [ "<log>", "index.html#drocfg_log", null ],
        [ "<uid>", "index.html#drocfg_uid", null ],
        [ "<gid>", "index.html#drocfg_gid", null ],
        [ "<pidfile>", "index.html#drocfg_pidfile", null ],
        [ "<lbm-license-file>", "index.html#drocfg_lbm-license-file", null ],
        [ "<topicmap/>", "index.html#drocfg_topicmap", null ],
        [ "<patternmap/>", "index.html#drocfg_patternmap", null ],
        [ "<monitor>", "index.html#drocfg_monitor", null ],
        [ "<transport-module/>", "index.html#drocfg_transport-module", null ],
        [ "<format-module/>", "index.html#drocfg_format-module", null ],
        [ "<web-monitor>", "index.html#drocfg_web-monitor", null ],
        [ "<daemon-monitor>", "index.html#drocfg_daemon-monitor", null ],
        [ "<remote-snapshot-request>", "index.html#drocfg_remote-snapshot-request", null ],
        [ "<remote-config-changes-request>", "index.html#drocfg_remote-config-changes-request", null ],
        [ "<xml-config>", "index.html#drocfg_xml-config", null ],
        [ "<route-info>", "index.html#drocfg_route-info", null ],
        [ "<route-recalculation>", "index.html#drocfg_route-recalculation", null ],
        [ "<portals>", "index.html#drocfg_portals", null ],
        [ "<endpoint>", "index.html#drocfg_endpoint", null ],
        [ "<domain-id>", "index.html#drocfg_domain-id", null ],
        [ "<cost>", "index.html#drocfg_cost", null ],
        [ "<source-deletion-delay>", "index.html#drocfg_source-deletion-delay", null ],
        [ "<max-queue>", "index.html#drocfg_max-queue", null ],
        [ "<lbm-config>", "index.html#drocfg_lbm-config", null ],
        [ "<lbm-attributes>", "index.html#drocfg_lbm-attributes", null ],
        [ "<option/>", "index.html#drocfg_option", null ],
        [ "<acl>", "index.html#drocfg_acl", null ],
        [ "<inbound>", "index.html#drocfg_inbound", null ],
        [ "<outbound>", "index.html#drocfg_outbound", null ],
        [ "<ace>", "index.html#drocfg_ace", null ],
        [ "<topic>", "index.html#drocfg_topic", null ],
        [ "<pcre-pattern>", "index.html#drocfg_pcre-pattern", null ],
        [ "<regex-pattern>", "index.html#drocfg_regex-pattern", null ],
        [ "<transport/>", "index.html#drocfg_transport", null ],
        [ "<source-ip/>", "index.html#drocfg_source-ip", null ],
        [ "<multicast-group/>", "index.html#drocfg_multicast-group", null ],
        [ "<udp-source-port/>", "index.html#drocfg_udp-source-port", null ],
        [ "<udp-destination-port/>", "index.html#drocfg_udp-destination-port", null ],
        [ "<tcp-source-port/>", "index.html#drocfg_tcp-source-port", null ],
        [ "<xport-id/>", "index.html#drocfg_xport-id", null ],
        [ "<topic-resolution>", "index.html#drocfg_topic-resolution", null ],
        [ "<initial-request/>", "index.html#drocfg_initial-request", null ],
        [ "<topic-use-query>", "index.html#drocfg_topic-use-query", null ],
        [ "<rate-limit/>", "index.html#drocfg_rate-limit", null ],
        [ "<pattern-use-query>", "index.html#drocfg_pattern-use-query", null ],
        [ "<remote-topic-interest>", "index.html#drocfg_remote-topic-interest", null ],
        [ "<remote-pattern-interest>", "index.html#drocfg_remote-pattern-interest", null ],
        [ "<domain-route>", "index.html#drocfg_domain-route", null ],
        [ "<remote-topic/>", "index.html#drocfg_remote-topic", null ],
        [ "<remote-pattern/>", "index.html#drocfg_remote-pattern", null ],
        [ "<source-context-name>", "index.html#drocfg_source-context-name", null ],
        [ "<receiver-context-name>", "index.html#drocfg_receiver-context-name", null ],
        [ "<sqn-window/>", "index.html#drocfg_sqn-window", null ],
        [ "<context-query/>", "index.html#drocfg_context-query", null ],
        [ "<peer>", "index.html#drocfg_peer", null ],
        [ "<sourcemap/>", "index.html#drocfg_sourcemap", null ],
        [ "<tcp>", "index.html#drocfg_tcp", null ],
        [ "<interface>", "index.html#drocfg_interface", null ],
        [ "<listen-port>", "index.html#drocfg_listen-port", null ],
        [ "<receive-buffer>", "index.html#drocfg_receive-buffer", null ],
        [ "<send-buffer>", "index.html#drocfg_send-buffer", null ],
        [ "<keepalive/>", "index.html#drocfg_keepalive", null ],
        [ "<nodelay/>", "index.html#drocfg_nodelay", null ],
        [ "<compression>", "index.html#drocfg_compression", null ],
        [ "<tls>", "index.html#drocfg_tls", null ],
        [ "<certificate>", "index.html#drocfg_certificate", null ],
        [ "<certificate-key>", "index.html#drocfg_certificate-key", null ],
        [ "<certificate-key-password>", "index.html#drocfg_certificate-key-password", null ],
        [ "<trusted-certificates>", "index.html#drocfg_trusted-certificates", null ],
        [ "<cipher-suites>", "index.html#drocfg_cipher-suites", null ],
        [ "<companion>", "index.html#drocfg_companion", null ],
        [ "<address>", "index.html#drocfg_address", null ],
        [ "<port>", "index.html#drocfg_port", null ],
        [ "<single-tcp>", "index.html#drocfg_single-tcp", null ],
        [ "<initiator>", "index.html#drocfg_initiator", null ],
        [ "<acceptor>", "index.html#drocfg_acceptor", null ],
        [ "<max-datagram>", "index.html#drocfg_max-datagram", null ],
        [ "<smart-batch>", "index.html#drocfg_smart-batch", null ],
        [ "<batching>", "index.html#drocfg_batching", null ],
        [ "<min-length>", "index.html#drocfg_min-length", null ],
        [ "<batch-interval>", "index.html#drocfg_batch-interval", null ],
        [ "<gateway-keepalive/>", "index.html#drocfg_gateway-keepalive", null ]
      ] ],
      [ "Deprecated Elements", "index.html#deprecatedelements", [
        [ "<propagation-delay/>", "index.html#propagation-delay", null ],
        [ "<late-join/>", "index.html#late-join", null ],
        [ "<topic-purge/>", "index.html#topic-purge", null ],
        [ "<topic-interest-generate/>", "index.html#topic-interest-generate", null ],
        [ "<topic-domain-activity/>", "index.html#topic-domain-activity", null ],
        [ "<pattern-purge/>", "index.html#pattern-purge", null ],
        [ "<pattern-interest-generate/>", "index.html#pattern-interest-generate", null ],
        [ "<pattern-domain-activity/>", "index.html#pattern-domain-activity", null ],
        [ "<topic-use-check/>", "index.html#topic-use-check", null ],
        [ "<pattern-use-check/>", "index.html#pattern-use-check", null ],
        [ "<publishing-interval>", "index.html#drocfg_publishing-interval", null ],
        [ "<group>", "index.html#drocfg_group", null ]
      ] ],
      [ "UM Router Configuration DTD", "index.html#umrouterconfigurationdtd", null ]
    ] ],
    [ "UM Router Daemon Statistics", "index.html#umrouterdaemonstatistics", [
      [ "UM Router Daemon Statistics Structures", "index.html#umrouterdaemonstatisticsstructures", [
        [ "UM Router Daemon Statistics Byte Swapping", "index.html#umrouterdaemonstatisticsbyteswapping", null ],
        [ "UM Router Daemon Statistics String Buffers", "index.html#umrouterdaemonstatisticsstructuresstringbuffers", null ]
      ] ],
      [ "UM Router Daemon Statistics Configuration", "index.html#umrouterdaemonstatisticsconfiguration", null ],
      [ "UM Router Daemon Statistics Requests", "index.html#umrouterdaemonstatisticsrequests", null ]
    ] ],
    [ "UM Router Monitoring", "index.html#umroutermonitoring", [
      [ "UM Router Web Monitor", "index.html#umrouterwebmonitor", [
        [ "Main Page", "index.html#mainpage", null ],
        [ "Endpoint Portal Page", "index.html#endpointportalpage", null ],
        [ "Peer Portal Page", "index.html#peerportalpage", null ],
        [ "Topology Info Page", "index.html#topologyinfopage", null ],
        [ "Path Info", "index.html#pathinfo", null ]
      ] ],
      [ "UM Router Log Messages", "index.html#umrouterlogmessages", [
        [ "UM Router Rolling Logs", "index.html#umrouterrollinglogs", null ],
        [ "Important UM Router Log Messages", "index.html#importantumrouterlogmessages", null ]
      ] ],
      [ "UM Router Transport Stats", "index.html#umroutertransportstats", null ]
    ] ],
    [ "UM Router Glossary", "index.html#umrouterglossary", null ],
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