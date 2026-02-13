package api

import io.gatling.core.Predef._
import io.gatling.core.structure._
import io.gatling.http.Predef._
import config.BaseHelpers._
import scala.util.Random

object TablesCategory {

  private val productRegex = """/products/([^"/]+)"""
  private val productIdRegex = """name="current_product" value="(\d+)""""

  def openTablesCategoryTab(): ChainBuilder = {
    exec(
      http(requestName = "Open Tables category")
        .get("/products-category/tables-2")
        .header("Upgrade-Insecure-Requests", "1")
        .header(
          "Accept",
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7"
        )
        .header("Sec-Fetch-Mode", "navigate")
        .header("Sec-Fetch-User", "?1")
        .header("Sec-Fetch-Dest", "document")
        .check(status.is(200))
        .check(regex( pattern= "All Tables"))
        .check(regex(productRegex).findAll.saveAs("tableProducts"))
        

    )
    .exec { session =>
      val tableProducts = session("tableProducts").as[List[String]]
      val randomTableProduct = tableProducts(Random.nextInt(tableProducts.size))
      session.set("randomTable", randomTableProduct)
    }
  }

  def openRandomTable(): ChainBuilder = {    
    exec(
      http("Open random table product")
        .get("/products/${randomTable}")
        .check(status.is(200))
        .check(regex(productIdRegex).saveAs("product_id"))
        
    )
  }
}
