var NAVTREE =
[
  [ "Dynamic Routing Guide", "index.html", [
    [ "Introduction", "index.html", [
      [ "DRO Features", "index.html#drofeatures", null ]
    ] ],
    [ "DRO Architecture", "droarchitecture.html", [
      [ "UM Router Portals", "droarchitecture.html#umrouterportals", null ],
      [ "Topic Resolution Domains", "droarchitecture.html#topicresolutiondomains", null ],
      [ "Proxy Sources and Proxy Receivers", "droarchitecture.html#proxysourcesandproxyreceivers", null ],
      [ "Routing", "droarchitecture.html#routing", null ]
    ] ],
    [ "UM Router Concepts", "umrouterconcepts.html", [
      [ "Basic UM Router Operation", "umrouterconcepts.html#basicumrouteroperation", [
        [ "Interest and Use Queries", "umrouterconcepts.html#interestandusequeries", null ],
        [ "UM Router Keepalive", "umrouterconcepts.html#umrouterkeepalive", null ],
        [ "Final Advertisements", "umrouterconcepts.html#finaladvertisements", null ],
        [ "More About Proxy Sources and Receivers", "umrouterconcepts.html#moreaboutproxysourcesandreceivers", null ]
      ] ],
      [ "Multi-Hop Forwarding", "umrouterconcepts.html#multihopforwarding", null ],
      [ "Routing Wildcard Receivers", "umrouterconcepts.html#routingwildcardreceivers", null ],
      [ "Forwarding Costs", "umrouterconcepts.html#forwardingcosts", null ],
      [ "UM Router Routing", "umrouterconcepts.html#umrouterrouting", null ],
      [ "Routing Topologies", "umrouterconcepts.html#routingtopologies", [
        [ "Direct Link", "umrouterconcepts.html#directlink", null ],
        [ "Single Link", "umrouterconcepts.html#singlelink", null ],
        [ "Parallel Links", "umrouterconcepts.html#parallellinks", null ],
        [ "Loops", "umrouterconcepts.html#loops", null ],
        [ "Loop and Spur", "umrouterconcepts.html#loopandspur", null ],
        [ "Loop with Centralized TRD", "umrouterconcepts.html#loopwithcentralizedtrd", null ],
        [ "with centralized TRD", "umrouterconcepts.html#Star", null ],
        [ "Star with Centralized UM Router", "umrouterconcepts.html#starwithcentralizedumrouter", null ],
        [ "Mesh", "umrouterconcepts.html#mesh", null ],
        [ "Palm Tree", "umrouterconcepts.html#palmtree", null ],
        [ "Dumbbell", "umrouterconcepts.html#dumbbell", null ]
      ] ],
      [ "Unsupported Configurations", "umrouterconcepts.html#unsupportedconfigurations", null ],
      [ "UM Feature Compatibility", "umrouterconcepts.html#umfeaturecompatibility", null ]
    ] ],
    [ "UM Router Implementation", "umrouterimplementation.html", [
      [ "UM Router Configuration Overview", "umrouterimplementation.html#umrouterconfigurationoverview", null ],
      [ "Creating Applications for UM Router Compatibility", "umrouterimplementation.html#creatingapplicationsforumroutercompatibility", [
        [ "Naming and Identification", "umrouterimplementation.html#namingandidentification", null ],
        [ "Portal Costs", "umrouterimplementation.html#portalcosts", null ],
        [ "Access Control Lists (ACL)", "umrouterimplementation.html#accesscontrollistsacl", null ],
        [ "Timers and Intervals", "umrouterimplementation.html#timersandintervals", null ],
        [ "Multicast Immediate Messaging Considerations", "umrouterimplementation.html#multicastimmediatemessagingconsiderations", null ],
        [ "Persistence Over the UM Router", "umrouterimplementation.html#persistenceovertheumrouter", null ],
        [ "Late Join and Off-Transport Recovery", "umrouterimplementation.html#latejoinandofftransportrecovery", null ],
        [ "Topic Resolution Reliability", "umrouterimplementation.html#topicresolutionreliability", null ],
        [ "BOS and EOS Behavior Over the UM Router", "umrouterimplementation.html#bosandeosbehaviorovertheumrouter", null ]
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
      [ "Using UM Configuration Files with the UM Router", "umrouterimplementation.html#usingumconfigurationfileswiththeumrouter", [
        [ "Setting Individual Endpoint Options", "umrouterimplementation.html#settingindividualendpointoptions", null ],
        [ "UM Router and UM XML Configuration Use Cases", "umrouterimplementation.html#umrouterandumxmlconfigurationusecases", null ],
        [ "Sample Configuration", "umrouterimplementation.html#sampleconfiguration", null ],
        [ "XML UM Configuration File", "umrouterimplementation.html#xmlumconfigurationfile", null ],
        [ "XML UM Router Configuration File", "umrouterimplementation.html#xmlumrouterconfigurationfile", null ]
      ] ],
      [ "Running the UM Router Daemon", "umrouterimplementation.html#runningtheumrouterdaemon", [
        [ "tnwgd", "umrouterimplementation.html#tnwgd", null ]
      ] ]
    ] ],
    [ "XML Configuration Reference", "xmlconfigurationreference.html", [
      [ "File Structure", "xmlconfigurationreference.html#filestructure", null ],
      [ "Elements Reference", "xmlconfigurationreference.html#elementsreference", [
        [ "<tnw-gateway>", "xmlconfigurationreference.html#drocfg_tnw-gateway", null ],
        [ "<daemon>", "xmlconfigurationreference.html#drocfg_daemon", null ],
        [ "<name>", "xmlconfigurationreference.html#drocfg_name", null ],
        [ "<log>", "xmlconfigurationreference.html#drocfg_log", null ],
        [ "<uid>", "xmlconfigurationreference.html#drocfg_uid", null ],
        [ "<gid>", "xmlconfigurationreference.html#drocfg_gid", null ],
        [ "<pidfile>", "xmlconfigurationreference.html#drocfg_pidfile", null ],
        [ "<lbm-license-file>", "xmlconfigurationreference.html#drocfg_lbm-license-file", null ],
        [ "<topicmap/>", "xmlconfigurationreference.html#drocfg_topicmap", null ],
        [ "<patternmap/>", "xmlconfigurationreference.html#drocfg_patternmap", null ],
        [ "<monitor>", "xmlconfigurationreference.html#drocfg_monitor", null ],
        [ "<transport-module/>", "xmlconfigurationreference.html#drocfg_transport-module", null ],
        [ "<format-module/>", "xmlconfigurationreference.html#drocfg_format-module", null ],
        [ "<web-monitor>", "xmlconfigurationreference.html#drocfg_web-monitor", null ],
        [ "<daemon-monitor>", "xmlconfigurationreference.html#drocfg_daemon-monitor", null ],
        [ "<remote-snapshot-request>", "xmlconfigurationreference.html#drocfg_remote-snapshot-request", null ],
        [ "<remote-config-changes-request>", "xmlconfigurationreference.html#drocfg_remote-config-changes-request", null ],
        [ "<xml-config>", "xmlconfigurationreference.html#drocfg_xml-config", null ],
        [ "<route-info>", "xmlconfigurationreference.html#drocfg_route-info", null ],
        [ "<route-recalculation>", "xmlconfigurationreference.html#drocfg_route-recalculation", null ],
        [ "<portals>", "xmlconfigurationreference.html#drocfg_portals", null ],
        [ "<endpoint>", "xmlconfigurationreference.html#drocfg_endpoint", null ],
        [ "<domain-id>", "xmlconfigurationreference.html#drocfg_domain-id", null ],
        [ "<cost>", "xmlconfigurationreference.html#drocfg_cost", null ],
        [ "<source-deletion-delay>", "xmlconfigurationreference.html#drocfg_source-deletion-delay", null ],
        [ "<max-queue>", "xmlconfigurationreference.html#drocfg_max-queue", null ],
        [ "<lbm-config>", "xmlconfigurationreference.html#drocfg_lbm-config", null ],
        [ "<lbm-attributes>", "xmlconfigurationreference.html#drocfg_lbm-attributes", null ],
        [ "<option/>", "xmlconfigurationreference.html#drocfg_option", null ],
        [ "<acl>", "xmlconfigurationreference.html#drocfg_acl", null ],
        [ "<inbound>", "xmlconfigurationreference.html#drocfg_inbound", null ],
        [ "<outbound>", "xmlconfigurationreference.html#drocfg_outbound", null ],
        [ "<ace>", "xmlconfigurationreference.html#drocfg_ace", null ],
        [ "<topic>", "xmlconfigurationreference.html#drocfg_topic", null ],
        [ "<pcre-pattern>", "xmlconfigurationreference.html#drocfg_pcre-pattern", null ],
        [ "<regex-pattern>", "xmlconfigurationreference.html#drocfg_regex-pattern", null ],
        [ "<transport/>", "xmlconfigurationreference.html#drocfg_transport", null ],
        [ "<source-ip/>", "xmlconfigurationreference.html#drocfg_source-ip", null ],
        [ "<multicast-group/>", "xmlconfigurationreference.html#drocfg_multicast-group", null ],
        [ "<udp-source-port/>", "xmlconfigurationreference.html#drocfg_udp-source-port", null ],
        [ "<udp-destination-port/>", "xmlconfigurationreference.html#drocfg_udp-destination-port", null ],
        [ "<tcp-source-port/>", "xmlconfigurationreference.html#drocfg_tcp-source-port", null ],
        [ "<xport-id/>", "xmlconfigurationreference.html#drocfg_xport-id", null ],
        [ "<topic-resolution>", "xmlconfigurationreference.html#drocfg_topic-resolution", null ],
        [ "<initial-request/>", "xmlconfigurationreference.html#drocfg_initial-request", null ],
        [ "<topic-use-query>", "xmlconfigurationreference.html#drocfg_topic-use-query", null ],
        [ "<rate-limit/>", "xmlconfigurationreference.html#drocfg_rate-limit", null ],
        [ "<pattern-use-query>", "xmlconfigurationreference.html#drocfg_pattern-use-query", null ],
        [ "<remote-topic-interest>", "xmlconfigurationreference.html#drocfg_remote-topic-interest", null ],
        [ "<remote-pattern-interest>", "xmlconfigurationreference.html#drocfg_remote-pattern-interest", null ],
        [ "<domain-route>", "xmlconfigurationreference.html#drocfg_domain-route", null ],
        [ "<remote-topic/>", "xmlconfigurationreference.html#drocfg_remote-topic", null ],
        [ "<remote-pattern/>", "xmlconfigurationreference.html#drocfg_remote-pattern", null ],
        [ "<source-context-name>", "xmlconfigurationreference.html#drocfg_source-context-name", null ],
        [ "<receiver-context-name>", "xmlconfigurationreference.html#drocfg_receiver-context-name", null ],
        [ "<sqn-window/>", "xmlconfigurationreference.html#drocfg_sqn-window", null ],
        [ "<context-query/>", "xmlconfigurationreference.html#drocfg_context-query", null ],
        [ "<peer>", "xmlconfigurationreference.html#drocfg_peer", null ],
        [ "<sourcemap/>", "xmlconfigurationreference.html#drocfg_sourcemap", null ],
        [ "<tcp>", "xmlconfigurationreference.html#drocfg_tcp", null ],
        [ "<interface>", "xmlconfigurationreference.html#drocfg_interface", null ],
        [ "<listen-port>", "xmlconfigurationreference.html#drocfg_listen-port", null ],
        [ "<receive-buffer>", "xmlconfigurationreference.html#drocfg_receive-buffer", null ],
        [ "<send-buffer>", "xmlconfigurationreference.html#drocfg_send-buffer", null ],
        [ "<keepalive/>", "xmlconfigurationreference.html#drocfg_keepalive", null ],
        [ "<nodelay/>", "xmlconfigurationreference.html#drocfg_nodelay", null ],
        [ "<compression>", "xmlconfigurationreference.html#drocfg_compression", null ],
        [ "<tls>", "xmlconfigurationreference.html#drocfg_tls", null ],
        [ "<certificate>", "xmlconfigurationreference.html#drocfg_certificate", null ],
        [ "<certificate-key>", "xmlconfigurationreference.html#drocfg_certificate-key", null ],
        [ "<certificate-key-password>", "xmlconfigurationreference.html#drocfg_certificate-key-password", null ],
        [ "<trusted-certificates>", "xmlconfigurationreference.html#drocfg_trusted-certificates", null ],
        [ "<cipher-suites>", "xmlconfigurationreference.html#drocfg_cipher-suites", null ],
        [ "<companion>", "xmlconfigurationreference.html#drocfg_companion", null ],
        [ "<address>", "xmlconfigurationreference.html#drocfg_address", null ],
        [ "<port>", "xmlconfigurationreference.html#drocfg_port", null ],
        [ "<single-tcp>", "xmlconfigurationreference.html#drocfg_single-tcp", null ],
        [ "<initiator>", "xmlconfigurationreference.html#drocfg_initiator", null ],
        [ "<acceptor>", "xmlconfigurationreference.html#drocfg_acceptor", null ],
        [ "<max-datagram>", "xmlconfigurationreference.html#drocfg_max-datagram", null ],
        [ "<smart-batch>", "xmlconfigurationreference.html#drocfg_smart-batch", null ],
        [ "<batching>", "xmlconfigurationreference.html#drocfg_batching", null ],
        [ "<min-length>", "xmlconfigurationreference.html#drocfg_min-length", null ],
        [ "<batch-interval>", "xmlconfigurationreference.html#drocfg_batch-interval", null ],
        [ "<gateway-keepalive/>", "xmlconfigurationreference.html#drocfg_gateway-keepalive", null ]
      ] ],
      [ "Deprecated Elements", "xmlconfigurationreference.html#deprecatedelements", [
        [ "<propagation-delay/>", "xmlconfigurationreference.html#propagation-delay", null ],
        [ "<late-join/>", "xmlconfigurationreference.html#late-join", null ],
        [ "<topic-purge/>", "xmlconfigurationreference.html#topic-purge", null ],
        [ "<topic-interest-generate/>", "xmlconfigurationreference.html#topic-interest-generate", null ],
        [ "<topic-domain-activity/>", "xmlconfigurationreference.html#topic-domain-activity", null ],
        [ "<pattern-purge/>", "xmlconfigurationreference.html#pattern-purge", null ],
        [ "<pattern-interest-generate/>", "xmlconfigurationreference.html#pattern-interest-generate", null ],
        [ "<pattern-domain-activity/>", "xmlconfigurationreference.html#pattern-domain-activity", null ],
        [ "<topic-use-check/>", "xmlconfigurationreference.html#topic-use-check", null ],
        [ "<pattern-use-check/>", "xmlconfigurationreference.html#pattern-use-check", null ],
        [ "<publishing-interval>", "xmlconfigurationreference.html#drocfg_publishing-interval", null ],
        [ "<group>", "xmlconfigurationreference.html#drocfg_group", null ]
      ] ],
      [ "UM Router Configuration DTD", "xmlconfigurationreference.html#umrouterconfigurationdtd", null ]
    ] ],
    [ "UM Router Daemon Statistics", "umrouterdaemonstatistics.html", [
      [ "UM Router Daemon Statistics Structures", "umrouterdaemonstatistics.html#umrouterdaemonstatisticsstructures", [
        [ "UM Router Daemon Statistics Byte Swapping", "umrouterdaemonstatistics.html#umrouterdaemonstatisticsbyteswapping", null ],
        [ "UM Router Daemon Statistics String Buffers", "umrouterdaemonstatistics.html#umrouterdaemonstatisticsstructuresstringbuffers", null ]
      ] ],
      [ "UM Router Daemon Statistics Configuration", "umrouterdaemonstatistics.html#umrouterdaemonstatisticsconfiguration", null ],
      [ "UM Router Daemon Statistics Requests", "umrouterdaemonstatistics.html#umrouterdaemonstatisticsrequests", null ]
    ] ],
    [ "UM Router Monitoring", "umroutermonitoring.html", [
      [ "Router Web Monitor", "umroutermonitoring.html#UM", [
        [ "Main Page", "umroutermonitoring.html#mainpage", null ],
        [ "Endpoint Portal Page", "umroutermonitoring.html#endpointportalpage", null ],
        [ "Peer Portal Page", "umroutermonitoring.html#peerportalpage", null ],
        [ "Topology Info Page", "umroutermonitoring.html#topologyinfopage", null ],
        [ "Path Info", "umroutermonitoring.html#pathinfo", null ]
      ] ],
      [ "UM Router Log Messages", "umroutermonitoring.html#umrouterlogmessages", [
        [ "UM Router Rolling Logs", "umroutermonitoring.html#umrouterrollinglogs", null ],
        [ "Important UM Router Log Messages", "umroutermonitoring.html#importantumrouterlogmessages", null ]
      ] ],
      [ "UM Router Transport Stats", "umroutermonitoring.html#umroutertransportstats", null ]
    ] ],
    [ "UM Router Glossary", "umrouterglossary.html", null ],
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