package scenarios

import io.gatling.core.Predef._
import io.gatling.core.structure._
import io.gatling.http.Predef._
import config.BaseHelpers._
import api._

object Demo {

  val userFeeder = csv("data/users_data.csv").random

  def scnDemo: ScenarioBuilder = {
    scenario("Demo home and Category")
      .feed(userFeeder)
      .exec(flushHttpCache)
      .exec(flushCookieJar)
      .exitBlockOnFail(

        group("Open home page") {
          exec(homePage.openHomePage())
            .exec(thinkTimer())
        }

        .group("Open tables category") {
          exec(TablesCategory.openTablesCategoryTab())
            .exec(thinkTimer())
        }

        .group("Open random table") {
          exec(TablesCategory.openRandomTable())
            .exec(thinkTimer())
        }

        .group("Add product to cart") {
          exec(Cart.addProductToCart())
            .exec(thinkTimer())
        }
        .randomSwitch(
          System.getProperty("goToChairsPossibility", "50.0").toDouble -> exec(
            group("Open chairs category") {
              exec(ChairsCategory.openChairsCategoryTab())
                .exec(thinkTimer())
            }
            .group("Open random chair") {
              exec(ChairsCategory.openRandomChair())
                .exec(thinkTimer())
            }
            .group("Add product to cart (chair)") {
              exec(Cart.addProductToCart())
                .exec(thinkTimer())
            }
          )
        )
        .randomSwitch(
          System.getProperty("proceedToCartPossibility", "30.0").toDouble -> exec(
            group("Open cart page") {
              exec(Cart.openCartPage())
                .exec(thinkTimer())
            }
            .group("Place an order") {
              exec(Cart.placeAnOrder())
                .exec(thinkTimer())
            }
            .group("Build checkout body") {
              exec(Cart.buildMultipartBody())
            }
            .group("Checkout an order") {
              exec(Checkout.doCheckout())
                .exec(thinkTimer())
            }
          )
        )
      )
  }
}