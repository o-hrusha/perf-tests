file:///C:/Users/Oleksandr_Hrusha/Desktop/PTF-Course/GATLING/gatling-perf-test/src/test/scala/config/BaseHelpers.scala
empty definition using pc, found symbol in pc: 
semanticdb not found
empty definition using fallback
non-local guesses:
	 -io/gatling/core/Predef.nlContent.
	 -io/gatling/core/Predef.nlContent#
	 -io/gatling/core/Predef.nlContent().
	 -io/gatling/core/structure/nlContent.
	 -io/gatling/core/structure/nlContent#
	 -io/gatling/core/structure/nlContent().
	 -io/gatling/http/Predef.nlContent.
	 -io/gatling/http/Predef.nlContent#
	 -io/gatling/http/Predef.nlContent().
	 -nlContent.
	 -nlContent#
	 -nlContent().
	 -scala/Predef.nlContent.
	 -scala/Predef.nlContent#
	 -scala/Predef.nlContent().
offset: 3267
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
    .userAgentHeader("Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/110.0")

private val boundary = "----WebKitFormBoundaryxBOsTFy45Zo1Gwvx"
private val nl = "\r\n"

def buildCheckoutBody(session: Session): String = {
  val cartContent = session("cartContent").as[String]
  val totalNet = session("totalNet").as[String].replace(",", "")
  val transId = session("transId").as[String]

  val productsMap = session("productsMap").as[Map[String, String]]

  val userName = session("USER_NAME").as[String]
  val userAddress = session("USER_ADDRESS").as[String]
  val userPostal = session("USER_POSTAL").as[String]
  val userCity = session("USER_CITY").as[String]
  val userCountry = session("USER_COUNTRY").as[String]
  val userPhone = session("USER_PHONE").as[String]
  val userEmail = session("USER_EMAIL").as[String]

  // product_price блоки
  val productPriceBlocks = productsMap.map { case (id, price) =>
    s"$boundary$nl"+"Content-Disposition: form-data; name=\"product_price_${id}__\"$nl$nl$price$nl"
  }.mkString

  // основной боди
  val body =
    s"$boundary$nl"+"Content-Disposition: form-data; name=\"ic_formbuilder_redirect\"$nl$nlhttp://localhost/thank-you$nl" +
    s"$boundary$nl"+"Content-Disposition: form-data; name=\"cart_content\"$nl$nl$cartContent$nl" +
    s"$productPriceBlocks" +
    s"$boundary$nl"+"Content-Disposition: form-data; name=\"total_net\"$nl$nl$totalNet$nl" +
    s"$boundary$nl"+"Content-Disposition: form-data; name=\"trans_id\"$nl$nl$transId$nl" +
    s"$boundary$nl"+"Content-Disposition: form-data; name=\"shipping\"$nl$nlorder$nl" +
    s"$boundary$nl"+"Content-Disposition: form-data; name=\"cart_content\"$nl$nl$cartContent$nl" +
    s"$boundary$nl"+"Content-Disposition: form-data; name=\"cart_type\"$nl$nlorder$nl" +
    s"$boundary$nl"+"Content-Disposition: form-data; name=\"cart_inside_header_1\"$nl$nl<b>BILLING ADDRESS</b>$nl" +
    s"$boundary$nl"+"Content-Disposition: form-data; name=\"cart_company\"$nl$nl$nl" +
    s"$boundary$nl"+"Content-Disposition: form-data; name=\"cart_name\"$nl$nl$userName$nl" +
    s"$boundary$nl"+"Content-Disposition: form-data; name=\"cart_address\"$nl$nl$userAddress$nl" +
    s"$boundary$nl"+"Content-Disposition: form-data; name=\"cart_postal\"$nl$nl$userPostal$nl" +
    s"$boundary$nl"+"Content-Disposition: form-data; name=\"cart_city\"$nl$nl$userCity$nl" +
    s"$boundary$nl"+"Content-Disposition: form-data; name=\"cart_country\"$nl$nl$userCountry$nl" +
    s"$boundary$nl"+"Content-Disposition: form-data; name=\"cart_state\"$nl$nl$nl" +
    s"$boundary$nlContent-Disposition: form-data; name=\"cart_phone\"$nl$nl$userPhone$nl" +
    s"$boundary$nl@@Content-Disposition: form-data; name=\"cart_email\"$nl$nl$userEmail$nl" +
    s"$boundary$nlContent-Disposition: form-data; name=\"cart_comment\"$nl$nl$nl" +
    // cart_s_* поля оставляем без изменений
    s"$boundary--$nl"

  body
}

def multipartBoundary: String = boundary


}

```


#### Short summary: 

empty definition using pc, found symbol in pc: 