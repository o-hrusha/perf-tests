error id: file:///C:/Users/Oleksandr_Hrusha/Desktop/PTF-Course/GATLING/gatling-perf-test/src/test/scala/api/cart.scala:local5
file:///C:/Users/Oleksandr_Hrusha/Desktop/PTF-Course/GATLING/gatling-perf-test/src/test/scala/api/cart.scala
empty definition using pc, found symbol in pc: 
found definition using semanticdb; symbol local5
empty definition using fallback
non-local guesses:

offset: 2280
uri: file:///C:/Users/Oleksandr_Hrusha/Desktop/PTF-Course/GATLING/gatling-perf-test/src/test/scala/api/cart.scala
text:
```scala
package api

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.core.structure.ChainBuilder
import org.slf4j.LoggerFactory

object Cart {

  private val cartContentRegex = """name="cart_content"\s+value='(.+?)'"""
  private val totalNetRegex = """name="total_net"\s+value="([^"]+)""""
  private val transIdRegex = """value="([^"]+)"\s+name="trans_id""""
  private val pIdRegex = """name="p_id\[\]"\s+class="product_id"\s+value="(\d+)__""""
  private val productPriceRegex = """class="edit-product-quantity"\s+data-p_id="\d+"\s+data-price="([\d.]+)""""

  def addProductToCart(): ChainBuilder = {
    exec(
      http("Add product to cart")
        .post("/wp-admin/admin-ajax.php")
        .formParam("add_cart_data", "current_product=${product_id}&cart_content=&current_quantity=1")
        .formParam("action", "ic_add_to_cart")
        .formParam("cart_container", "0")
        .formParam("cart_widget", "0")
    )
  }

  def openCartPage(): ChainBuilder = {
    exec(
      http("Open cart page")
        .get("/cart")
        .check(regex(cartContentRegex).find.saveAs("cartContent"))
        .check(regex(totalNetRegex).find.saveAs("totalNet"))
        .check(regex(transIdRegex).find.saveAs("transId"))
        .check(regex(pIdRegex).findAll.saveAs("productIds"))
        .check(regex(productPriceRegex).findAll.saveAs("productPrices"))
    )
    .exec { session =>
      val ids = session("productIds").as[Seq[String]]
      val prices = session("productPrices").as[Seq[String]]

      session.set("productsMap", ids.zip(prices).toMap)
    }
  }

  def placeAnOrder(): ChainBuilder = {
  // Создаём логгер для этого объекта
  val logger = LoggerFactory.getLogger("CartExecutionLogger")

  exec { session =>
    val cartContentStr = session("cartContent").as[String]

    val cartContentMap =
      """\"(\d+__?)\"\s*:\s*(\d+)""".r
        .findAllMatchIn(cartContentStr)
        .map(m => m.group(1) -> m.group(2).toInt)
        .toMap

    // Логируем cartContentMap
    logger.info(s"[DEBUG] cartContentMap: $cartContentMap")


val productParams: Seq[(String, String)] = cartContentMap.toSeq.flatMap { case (id, qty) =>
  Seq("p_id[]" -> id, "p_quantity[]" -> qty.toString)
}
    val formParams =
      Seq("cart_content" -> cartContentStr@@) ++

        productParams ++
        Seq(
          "total_net" -> session("totalNet").as[String],
          "trans_id" -> session("transId").as[String],
          "shipping" -> "order"
        )

    session.set("PLACE_ORDER_BODY_PARAMS", formParams)
  }
  .exec(
    http("Place an order")
      .post("/checkout")
      .formParamSeq("${PLACE_ORDER_BODY_PARAMS}")
  )
}


  def buildMultipartBody(): ChainBuilder = {
    exec { session =>
      val productsMap = session("productsMap").as[Map[String, String]]
      val boundary = "----WebKitFormBoundaryxBOsQOKEt8OMSRof"

      val body =
        productsMap
          .map { case (id, price) =>
            s"""$boundary
Content-Disposition: form-data; name="product_price_${id}__"

$price
"""
          }
          .mkString + s"$boundary--\n"

      session.set("multipartBody", body)
    }
  }
}

```


#### Short summary: 

empty definition using pc, found symbol in pc: 