error id: file:///C:/Users/Oleksandr_Hrusha/Desktop/PTF-Course/GATLING/gatling-perf-test/src/test/scala/api/checkout.scala:multipartBoundary
file:///C:/Users/Oleksandr_Hrusha/Desktop/PTF-Course/GATLING/gatling-perf-test/src/test/scala/api/checkout.scala
empty definition using pc, found symbol in pc: 
semanticdb not found

found definition using fallback; symbol multipartBoundary
offset: 459
uri: file:///C:/Users/Oleksandr_Hrusha/Desktop/PTF-Course/GATLING/gatling-perf-test/src/test/scala/api/checkout.scala
text:
```scala
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
          s"multipart/form-data; boundary=${mult@@ipartBoundary}"
        )
        .header("Connection", "keep-alive")
        .body(StringBody("${CHECKOUT_BODY}"))
    )
  }
}

```


#### Short summary: 

empty definition using pc, found symbol in pc: 