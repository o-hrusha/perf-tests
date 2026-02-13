error id: file:///C:/Users/Oleksandr_Hrusha/Desktop/PTF-Course/GATLING/gatling-perf-test/src/test/scala/config/BaseHelpers.scala:io/gatling/http/protocol/HttpProtocolBuilder#userAgentHeader().
file:///C:/Users/Oleksandr_Hrusha/Desktop/PTF-Course/GATLING/gatling-perf-test/src/test/scala/config/BaseHelpers.scala
empty definition using pc, found symbol in pc: 
found definition using semanticdb; symbol io/gatling/http/protocol/HttpProtocolBuilder#userAgentHeader().
empty definition using fallback
non-local guesses:

offset: 610
uri: file:///C:/Users/Oleksandr_Hrusha/Desktop/PTF-Course/GATLING/gatling-perf-test/src/test/scala/config/BaseHelpers.scala
text:
```scala
package config

import io.gatling.core.Predef._
import io.gatling.core.structure._
import io.gatling.http.Predef._
import io.gatling.http.protocol.HttpProtocolBuilder
import io.gatling.core.session.Session

object BaseHelpers {

  val baseUrl = "http://localhost"

  val headers: Map[String, String] = Map()

  def thinkTimer(Min: Int = 2, Max: Int = 5): ChainBuilder = pause(Min, Max)

  val httpProtocol: HttpProtocolBuilder = http
    .baseUrl(baseUrl)
    .headers(headers)
    .acceptHeader("*/*")
    .acceptEncodingHeader("gzip, deflate")
    .acceptLanguageHeader("en-US,en;q=0.5")
    .userAgentHeader@@("Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/110.0")

}

```


#### Short summary: 

empty definition using pc, found symbol in pc: 