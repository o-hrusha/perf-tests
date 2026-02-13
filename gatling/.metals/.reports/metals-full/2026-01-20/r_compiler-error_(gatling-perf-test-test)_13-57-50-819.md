file:///c:/Users/Oleksandr_Hrusha/Desktop/PTF-Course/GATLING/gatling-perf-test/Main.scala
### java.lang.NullPointerException: Cannot read the array length because "a" is null

occurred in the presentation compiler.

presentation compiler configuration:
Scala version: 2.13.6
Classpath:
<WORKSPACE>\target\bloop-bsp-clients-classes\test-classes-Metals-Gel9tSvHReSTXxXycdsYEg== [missing ], <HOME>\AppData\Local\Coursier\cache\v1\https\repo1.maven.org\maven2\com\sourcegraph\semanticdb-javac\0.11.1\semanticdb-javac-0.11.1.jar [exists ], <WORKSPACE>\target\test-classes [exists ], <WORKSPACE>\target\bloop-bsp-clients-classes\classes-Metals-Gel9tSvHReSTXxXycdsYEg== [missing ], <HOME>\.m2\repository\io\gatling\highcharts\gatling-charts-highcharts\3.6.1\gatling-charts-highcharts-3.6.1.jar [exists ], <HOME>\.m2\repository\org\scala-lang\scala-library\2.13.6\scala-library-2.13.6.jar [exists ], <HOME>\.m2\repository\io\gatling\gatling-app\3.6.1\gatling-app-3.6.1.jar [exists ], <HOME>\.m2\repository\io\gatling\gatling-core\3.6.1\gatling-core-3.6.1.jar [exists ], <HOME>\.m2\repository\io\gatling\gatling-commons\3.6.1\gatling-commons-3.6.1.jar [exists ], <HOME>\.m2\repository\io\gatling\gatling-commons-shared\3.6.1\gatling-commons-shared-3.6.1.jar [exists ], <HOME>\.m2\repository\org\scala-lang\scala-reflect\2.13.6\scala-reflect-2.13.6.jar [exists ], <HOME>\.m2\repository\io\suzaku\boopickle_2.13\1.3.3\boopickle_2.13-1.3.3.jar [exists ], <HOME>\.m2\repository\io\gatling\gatling-commons-shared-unstable\3.6.1\gatling-commons-shared-unstable-3.6.1.jar [exists ], <HOME>\.m2\repository\org\typelevel\spire-macros_2.13\0.17.0\spire-macros_2.13-0.17.0.jar [exists ], <HOME>\.m2\repository\org\slf4j\slf4j-api\1.7.31\slf4j-api-1.7.31.jar [exists ], <HOME>\.m2\repository\com\typesafe\scala-logging\scala-logging_2.13\3.9.4\scala-logging_2.13-3.9.4.jar [exists ], <HOME>\.m2\repository\ch\qos\logback\logback-classic\1.2.3\logback-classic-1.2.3.jar [exists ], <HOME>\.m2\repository\ch\qos\logback\logback-core\1.2.3\logback-core-1.2.3.jar [exists ], <HOME>\.m2\repository\io\gatling\gatling-jsonpath\3.6.1\gatling-jsonpath-3.6.1.jar [exists ], <HOME>\.m2\repository\com\typesafe\akka\akka-slf4j_2.13\2.6.15\akka-slf4j_2.13-2.6.15.jar [exists ], <HOME>\.m2\repository\org\simpleflatmapper\lightning-csv\8.2.3\lightning-csv-8.2.3.jar [exists ], <HOME>\.m2\repository\org\simpleflatmapper\sfm-util\8.2.3\sfm-util-8.2.3.jar [exists ], <HOME>\.m2\repository\com\github\ben-manes\caffeine\caffeine\2.9.1\caffeine-2.9.1.jar [exists ], <HOME>\.m2\repository\org\checkerframework\checker-qual\3.10.0\checker-qual-3.10.0.jar [exists ], <HOME>\.m2\repository\com\google\errorprone\error_prone_annotations\2.5.1\error_prone_annotations-2.5.1.jar [exists ], <HOME>\.m2\repository\io\pebbletemplates\pebble\3.1.5\pebble-3.1.5.jar [exists ], <HOME>\.m2\repository\org\unbescape\unbescape\1.1.6.RELEASE\unbescape-1.1.6.RELEASE.jar [exists ], <HOME>\.m2\repository\org\scala-lang\modules\scala-parser-combinators_2.13\2.0.0\scala-parser-combinators_2.13-2.0.0.jar [exists ], <HOME>\.m2\repository\com\github\scopt\scopt_2.13\3.7.1\scopt_2.13-3.7.1.jar [exists ], <HOME>\.m2\repository\io\netty\netty-handler\4.1.65.Final\netty-handler-4.1.65.Final.jar [exists ], <HOME>\.m2\repository\io\netty\netty-resolver\4.1.65.Final\netty-resolver-4.1.65.Final.jar [exists ], <HOME>\.m2\repository\com\softwaremill\quicklens\quicklens_2.13\1.7.4\quicklens_2.13-1.7.4.jar [exists ], <HOME>\.m2\repository\net\sf\saxon\Saxon-HE\10.5\Saxon-HE-10.5.jar [exists ], <HOME>\.m2\repository\org\jodd\jodd-lagarto\6.0.5\jodd-lagarto-6.0.5.jar [exists ], <HOME>\.m2\repository\org\jodd\jodd-util\6.0.1\jodd-util-6.0.1.jar [exists ], <HOME>\.m2\repository\io\burt\jmespath-jackson\0.5.0\jmespath-jackson-0.5.0.jar [exists ], <HOME>\.m2\repository\io\burt\jmespath-core\0.5.0\jmespath-core-0.5.0.jar [exists ], <HOME>\.m2\repository\io\gatling\gatling-http\3.6.1\gatling-http-3.6.1.jar [exists ], <HOME>\.m2\repository\io\gatling\gatling-http-client\3.6.1\gatling-http-client-3.6.1.jar [exists ], <HOME>\.m2\repository\io\netty\netty-handler-proxy\4.1.65.Final\netty-handler-proxy-4.1.65.Final.jar [exists ], <HOME>\.m2\repository\io\netty\netty-codec-socks\4.1.65.Final\netty-codec-socks-4.1.65.Final.jar [exists ], <HOME>\.m2\repository\io\netty\netty-resolver-dns\4.1.65.Final\netty-resolver-dns-4.1.65.Final.jar [exists ], <HOME>\.m2\repository\io\netty\netty-codec-dns\4.1.65.Final\netty-codec-dns-4.1.65.Final.jar [exists ], <HOME>\.m2\repository\io\netty\netty-codec-http2\4.1.65.Final\netty-codec-http2-4.1.65.Final.jar [exists ], <HOME>\.m2\repository\io\netty\netty-tcnative-boringssl-static\2.0.40.Final\netty-tcnative-boringssl-static-2.0.40.Final.jar [exists ], <HOME>\.m2\repository\com\aayushatharva\brotli4j\brotli4j\1.4.2\brotli4j-1.4.2.jar [exists ], <HOME>\.m2\repository\com\aayushatharva\brotli4j\native-linux-x86_64\1.4.2\native-linux-x86_64-1.4.2.jar [exists ], <HOME>\.m2\repository\com\aayushatharva\brotli4j\native-linux-aarch64\1.4.2\native-linux-aarch64-1.4.2.jar [exists ], <HOME>\.m2\repository\com\aayushatharva\brotli4j\native-osx-x86_64\1.4.2\native-osx-x86_64-1.4.2.jar [exists ], <HOME>\.m2\repository\com\aayushatharva\brotli4j\native-windows-x86_64\1.4.2\native-windows-x86_64-1.4.2.jar [exists ], <HOME>\.m2\repository\io\gatling\gatling-jms\3.6.1\gatling-jms-3.6.1.jar [exists ], <HOME>\.m2\repository\javax\jms\javax.jms-api\2.0.1\javax.jms-api-2.0.1.jar [exists ], <HOME>\.m2\repository\com\eatthepath\fast-uuid\0.1\fast-uuid-0.1.jar [exists ], <HOME>\.m2\repository\io\gatling\gatling-mqtt\3.6.1\gatling-mqtt-3.6.1.jar [exists ], <HOME>\.m2\repository\io\gatling\gatling-netty-util\3.6.1\gatling-netty-util-3.6.1.jar [exists ], <HOME>\.m2\repository\io\netty\netty-codec-mqtt\4.1.65.Final\netty-codec-mqtt-4.1.65.Final.jar [exists ], <HOME>\.m2\repository\io\netty\netty-transport-native-epoll\4.1.65.Final\netty-transport-native-epoll-4.1.65.Final-linux-x86_64.jar [exists ], <HOME>\.m2\repository\io\netty\netty-transport-native-unix-common\4.1.65.Final\netty-transport-native-unix-common-4.1.65.Final.jar [exists ], <HOME>\.m2\repository\io\gatling\gatling-jdbc\3.6.1\gatling-jdbc-3.6.1.jar [exists ], <HOME>\.m2\repository\io\gatling\gatling-redis\3.6.1\gatling-redis-3.6.1.jar [exists ], <HOME>\.m2\repository\net\debasishg\redisclient_2.13\3.30\redisclient_2.13-3.30.jar [exists ], <HOME>\.m2\repository\org\apache\commons\commons-pool2\2.8.0\commons-pool2-2.8.0.jar [exists ], <HOME>\.m2\repository\io\gatling\gatling-graphite\3.6.1\gatling-graphite-3.6.1.jar [exists ], <HOME>\.m2\repository\org\hdrhistogram\HdrHistogram\2.1.12\HdrHistogram-2.1.12.jar [exists ], <HOME>\.m2\repository\io\gatling\gatling-charts\3.6.1\gatling-charts-3.6.1.jar [exists ], <HOME>\.m2\repository\com\tdunning\t-digest\3.1\t-digest-3.1.jar [exists ], <HOME>\.m2\repository\io\gatling\gatling-recorder\3.6.1\gatling-recorder-3.6.1.jar [exists ], <HOME>\.m2\repository\org\scala-lang\modules\scala-swing_2.13\3.0.0\scala-swing_2.13-3.0.0.jar [exists ], <HOME>\.m2\repository\com\fasterxml\jackson\core\jackson-databind\2.12.3\jackson-databind-2.12.3.jar [exists ], <HOME>\.m2\repository\com\fasterxml\jackson\core\jackson-annotations\2.12.3\jackson-annotations-2.12.3.jar [exists ], <HOME>\.m2\repository\com\fasterxml\jackson\core\jackson-core\2.12.3\jackson-core-2.12.3.jar [exists ], <HOME>\.m2\repository\org\bouncycastle\bcpkix-jdk15on\1.69\bcpkix-jdk15on-1.69.jar [exists ], <HOME>\.m2\repository\org\bouncycastle\bcprov-jdk15on\1.69\bcprov-jdk15on-1.69.jar [exists ], <HOME>\.m2\repository\org\bouncycastle\bcutil-jdk15on\1.69\bcutil-jdk15on-1.69.jar [exists ], <HOME>\.m2\repository\io\netty\netty-codec-http\4.1.65.Final\netty-codec-http-4.1.65.Final.jar [exists ], <HOME>\.m2\repository\io\netty\netty-common\4.1.65.Final\netty-common-4.1.65.Final.jar [exists ], <HOME>\.m2\repository\io\netty\netty-buffer\4.1.65.Final\netty-buffer-4.1.65.Final.jar [exists ], <HOME>\.m2\repository\io\netty\netty-transport\4.1.65.Final\netty-transport-4.1.65.Final.jar [exists ], <HOME>\.m2\repository\io\netty\netty-codec\4.1.65.Final\netty-codec-4.1.65.Final.jar [exists ], <HOME>\.m2\repository\com\typesafe\akka\akka-actor_2.13\2.6.15\akka-actor_2.13-2.6.15.jar [exists ], <HOME>\.m2\repository\com\typesafe\config\1.4.0\config-1.4.0.jar [exists ], <HOME>\.m2\repository\org\scala-lang\modules\scala-java8-compat_2.13\0.9.0\scala-java8-compat_2.13-0.9.0.jar [exists ], <HOME>\.m2\repository\org\scala-lang\scala-library\2.13.6\scala-library-2.13.6.jar [exists ]
Options:
-target:8 -Yrangepos -Xplugin-require:semanticdb


action parameters:
offset: 9
uri: file:///c:/Users/Oleksandr_Hrusha/Desktop/PTF-Course/GATLING/gatling-perf-test/Main.scala
text:
```scala
object Ma@@

```



#### Error stacktrace:

```
java.base/java.util.Arrays.sort(Arrays.java:1233)
	scala.tools.nsc.classpath.JFileDirectoryLookup.listChildren(DirectoryClassPath.scala:118)
	scala.tools.nsc.classpath.JFileDirectoryLookup.listChildren$(DirectoryClassPath.scala:102)
	scala.tools.nsc.classpath.DirectoryClassPath.listChildren(DirectoryClassPath.scala:293)
	scala.tools.nsc.classpath.DirectoryClassPath.listChildren(DirectoryClassPath.scala:293)
	scala.tools.nsc.classpath.DirectoryLookup.list(DirectoryClassPath.scala:83)
	scala.tools.nsc.classpath.DirectoryLookup.list$(DirectoryClassPath.scala:78)
	scala.tools.nsc.classpath.DirectoryClassPath.list(DirectoryClassPath.scala:293)
	scala.tools.nsc.classpath.AggregateClassPath.$anonfun$list$3(AggregateClassPath.scala:106)
	scala.collection.immutable.Vector.foreach(Vector.scala:2122)
	scala.tools.nsc.classpath.AggregateClassPath.list(AggregateClassPath.scala:102)
	scala.tools.nsc.util.ClassPath.list(ClassPath.scala:34)
	scala.tools.nsc.util.ClassPath.list$(ClassPath.scala:34)
	scala.tools.nsc.classpath.AggregateClassPath.list(AggregateClassPath.scala:31)
	scala.tools.nsc.symtab.SymbolLoaders$PackageLoader.doComplete(SymbolLoaders.scala:297)
	scala.tools.nsc.symtab.SymbolLoaders$SymbolLoader.$anonfun$complete$2(SymbolLoaders.scala:249)
	scala.tools.nsc.symtab.SymbolLoaders$SymbolLoader.complete(SymbolLoaders.scala:247)
	scala.reflect.internal.Symbols$Symbol.completeInfo(Symbols.scala:1562)
	scala.reflect.internal.Symbols$Symbol.info(Symbols.scala:1534)
	scala.reflect.internal.Types$TypeRef.decls(Types.scala:2606)
	scala.tools.nsc.typechecker.Namers$Namer.enterPackage(Namers.scala:762)
	scala.tools.nsc.typechecker.Namers$Namer.dispatch$1(Namers.scala:297)
	scala.tools.nsc.typechecker.Namers$Namer.standardEnterSym(Namers.scala:310)
	scala.tools.nsc.typechecker.AnalyzerPlugins.pluginsEnterSym(AnalyzerPlugins.scala:496)
	scala.tools.nsc.typechecker.AnalyzerPlugins.pluginsEnterSym$(AnalyzerPlugins.scala:495)
	scala.meta.internal.pc.MetalsGlobal$MetalsInteractiveAnalyzer.pluginsEnterSym(MetalsGlobal.scala:68)
	scala.tools.nsc.typechecker.Namers$Namer.enterSym(Namers.scala:288)
	scala.tools.nsc.typechecker.Analyzer$namerFactory$$anon$1.apply(Analyzer.scala:50)
	scala.tools.nsc.Global$GlobalPhase.applyPhase(Global.scala:480)
	scala.tools.nsc.Global$Run.$anonfun$compileLate$2(Global.scala:1684)
	scala.tools.nsc.Global$Run.$anonfun$compileLate$2$adapted(Global.scala:1683)
	scala.collection.IterableOnceOps.foreach(IterableOnce.scala:576)
	scala.collection.IterableOnceOps.foreach$(IterableOnce.scala:574)
	scala.collection.AbstractIterator.foreach(Iterator.scala:1300)
	scala.tools.nsc.Global$Run.compileLate(Global.scala:1683)
	scala.tools.nsc.interactive.Global.parseAndEnter(Global.scala:668)
	scala.tools.nsc.interactive.Global.typeCheck(Global.scala:678)
	scala.meta.internal.pc.HoverProvider.typedHoverTreeAt(HoverProvider.scala:314)
	scala.meta.internal.pc.HoverProvider.hoverOffset(HoverProvider.scala:43)
	scala.meta.internal.pc.HoverProvider.hover(HoverProvider.scala:22)
	scala.meta.internal.pc.ScalaPresentationCompiler.$anonfun$hover$1(ScalaPresentationCompiler.scala:342)
```
#### Short summary: 

java.lang.NullPointerException: Cannot read the array length because "a" is null