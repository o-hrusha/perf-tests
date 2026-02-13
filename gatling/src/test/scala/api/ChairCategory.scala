package api

import io.gatling.core.Predef._
import io.gatling.core.structure._
import io.gatling.http.Predef._
import config.BaseHelpers._
import scala.util.Random

object ChairsCategory {

  private val productRegex = """/products/([^"/]+)"""
  private val productIdRegex = """name="current_product" value="(\d+)""""

  def openChairsCategoryTab(): ChainBuilder = {
    exec(
      http(requestName = "Open Chairs category")
        .get("/products-category/chairs-2")
        .header("Upgrade-Insecure-Requests", "1")
        .header(
          "Accept",
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7"
        )
        .header("Sec-Fetch-Mode", "navigate")
        .header("Sec-Fetch-User", "?1")
        .header("Sec-Fetch-Dest", "document")
        .check(status.is(200))
        .check(regex("All Chairs"))
        .check(regex(productRegex).findAll.saveAs("chairProducts"))
    )
    .exec { session =>
      val chairProducts = session("chairProducts").as[List[String]]
      val randomChairProduct = chairProducts(Random.nextInt(chairProducts.size))
      session.set("randomChair", randomChairProduct)
    }
  }

  def openRandomChair(): ChainBuilder = {    
    exec(
      http("Open random chair product")
        .get("/products/${randomChair}")
        .check(status.is(200))
        .check(regex(productIdRegex).saveAs("product_id"))
    )
  }
}
