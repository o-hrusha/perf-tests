package api

import io.gatling.core.structure._
import io.gatling.core.Predef._
import io.gatling.http.Predef._
import config.BaseHelpers._

object homePage {
  def openHomePage(): ChainBuilder = {
exec(
    http( requestName= "Open home page")
    .get("/")
    .check(regex( pattern= "Performance testing Essentials"))
)
  }
}
