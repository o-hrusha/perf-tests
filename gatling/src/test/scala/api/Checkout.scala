package api

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.core.structure.ChainBuilder
import config.BaseHelpers._

object Checkout {

  def doCheckout(): ChainBuilder = {
    exec { session =>
      session.set("CHECKOUT_BODY", buildCheckoutBody(session))
    }
    .exec(
      http("Confirm checkout")
        .post("/checkout")
        .header(
          "Content-Type",
          s"multipart/form-data; boundary=${multipartBoundary}"
        )
        .header("Connection", "keep-alive")
        .body(StringBody("${CHECKOUT_BODY}"))
    )
  }

private val boundary = "----WebKitFormBoundaryH9NvTFy45Zo1Gwvx"
private val nl = "\r\n"
private val boundaryLine = s"--$boundary$nl"

private def buildCheckoutBody(session: Session): String = {
  val cartContent   = session("cartContent").as[String]
  val totalNet      = session("totalNet").as[String].replace(",", "")
  val transId       = session("transId").as[String]
  val productsMap   = session("productsMap").as[Map[String, String]]

  val userName   = session("USER_NAME").as[String]
  val userAddress = session("USER_ADDRESS").as[String]
  val userPostal  = session("USER_POSTAL").as[String]
  val userCity    = session("USER_CITY").as[String]
  val userCountry = session("USER_COUNTRY").as[String]
  val userPhone   = session("USER_PHONE").as[String]
  val userEmail   = session("USER_EMAIL").as[String]

  val productPriceParts = productsMap.map { case (id, price) =>
    s"${boundaryLine}Content-Disposition: form-data; name=\"product_price_${id}__\"$nl${nl}${price}$nl"
  }.mkString

  val body =
    s"""${boundaryLine}Content-Disposition: form-data; name="ic_formbuilder_redirect"$nl$nl
    http://localhost/thank-you$nl""" +
    s"${boundaryLine}Content-Disposition: form-data; name=\"cart_content\"$nl$nl${cartContent}$nl" +
    productPriceParts +
    s"${boundaryLine}Content-Disposition: form-data; name=\"total_net\"$nl$nl${totalNet}$nl" +
    s"${boundaryLine}Content-Disposition: form-data; name=\"trans_id\"$nl$nl${transId}$nl" +
    s"${boundaryLine}Content-Disposition: form-data; name=\"shipping\"$nl$nl" +
    s"order$nl" +
    s"${boundaryLine}Content-Disposition: form-data; name=\"cart_content\"$nl$nl${cartContent}$nl" +
    s"${boundaryLine}Content-Disposition: form-data; name=\"cart_type\"$nl$nl" +
    s"order$nl" +
    s"${boundaryLine}Content-Disposition: form-data; name=\"cart_inside_header_1\"$nl$nl<b>BILLING ADDRESS</b>$nl" +
    s"${boundaryLine}Content-Disposition: form-data; name=\"cart_company\"$nl$nl$nl" +
    s"${boundaryLine}Content-Disposition: form-data; name=\"cart_name\"$nl$nl${userName}$nl" +
    s"${boundaryLine}Content-Disposition: form-data; name=\"cart_address\"$nl$nl${userAddress}$nl" +
    s"${boundaryLine}Content-Disposition: form-data; name=\"cart_postal\"$nl$nl${userPostal}$nl" +
    s"${boundaryLine}Content-Disposition: form-data; name=\"cart_city\"$nl$nl${userCity}$nl" +
    s"${boundaryLine}Content-Disposition: form-data; name=\"cart_country\"$nl$nl${userCountry}$nl" +
    s"${boundaryLine}Content-Disposition: form-data; name=\"cart_state\"$nl$nl$nl" +
    s"${boundaryLine}Content-Disposition: form-data; name=\"cart_phone\"$nl$nl${userPhone}$nl" +
    s"${boundaryLine}Content-Disposition: form-data; name=\"cart_email\"$nl$nl${userEmail}$nl" +
    s"${boundaryLine}Content-Disposition: form-data; name=\"cart_comment\"$nl$nl$nl" +
    s"${boundaryLine}Content-Disposition: form-data; name=\"cart_inside_header_2\"$nl$nl<b>DELIVERY ADDRESS</b> (FILL ONLY IF DIFFERENT FROM THE BILLING ADDRESS)$nl" +
    s"${boundaryLine}Content-Disposition: form-data; name=\"cart_s_company\"$nl$nl$nl" +
    s"${boundaryLine}Content-Disposition: form-data; name=\"cart_s_name\"$nl$nl$nl" +
    s"${boundaryLine}Content-Disposition: form-data; name=\"cart_s_address\"$nl$nl$nl" +
    s"${boundaryLine}Content-Disposition: form-data; name=\"cart_s_postal\"$nl$nl$nl" +
    s"${boundaryLine}Content-Disposition: form-data; name=\"cart_s_city\"$nl$nl$nl" +
    s"${boundaryLine}Content-Disposition: form-data; name=\"cart_s_country\"$nl$nl$nl" +
    s"${boundaryLine}Content-Disposition: form-data; name=\"cart_s_state\"$nl$nl$nl" +
    s"${boundaryLine}Content-Disposition: form-data; name=\"cart_s_phone\"$nl$nl$nl" +
    s"${boundaryLine}Content-Disposition: form-data; name=\"cart_s_email\"$nl$nl$nl" +
    s"${boundaryLine}Content-Disposition: form-data; name=\"cart_s_comment\"$nl$nl$nl" +
    s"${boundaryLine}Content-Disposition: form-data; name=\"cart_submit\"$nl$nl" +
    s"Place Order$nl" +
    s"--$boundary--"

  body
}

private def multipartBoundary: String = boundary

}
