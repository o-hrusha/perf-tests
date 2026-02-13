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
    .userAgentHeader("Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/110.0")

}
