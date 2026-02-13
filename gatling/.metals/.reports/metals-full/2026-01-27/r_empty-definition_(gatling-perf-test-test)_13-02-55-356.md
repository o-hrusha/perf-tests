error id: file:///C:/Users/Oleksandr_Hrusha/Desktop/PTF-Course/GATLING/gatling-perf-test/src/test/scala/simulations/PerfTestSimulation.scala:io/gatling/core/controller/inject/open/RampBuilder#during().
file:///C:/Users/Oleksandr_Hrusha/Desktop/PTF-Course/GATLING/gatling-perf-test/src/test/scala/simulations/PerfTestSimulation.scala
empty definition using pc, found symbol in pc: 
found definition using semanticdb; symbol io/gatling/core/controller/inject/open/RampBuilder#during().
empty definition using fallback
non-local guesses:

offset: 304
uri: file:///C:/Users/Oleksandr_Hrusha/Desktop/PTF-Course/GATLING/gatling-perf-test/src/test/scala/simulations/PerfTestSimulation.scala
text:
```scala
package simulations

import io.gatling.core.Predef._
import config.BaseHelpers._
import scenarios.Demo.scnDemo

class PerfTestSimulation extends Simulation {

  setUp(
    // OPEN MODEL (current active model)
    scnDemo.inject(
      rampUsers(System.getProperty("rampUsers", "1").toInt)
        .during@@(System.getProperty("rampUsersDuring", "60").toInt)
    )

   
    // CLOSED MODEL (example, commented out)
    // Keeps a constant number of concurrent users
    // scnDemo.inject(
    //   constantConcurrentUsers(20).during(60)
    // )
   

  ).protocols(httpProtocol)
}

// to run test use:
// mvn clean gatling:test -DrampUsers=100 -DrampUsersDuring=30 -DaddChairPossibility="50.0" -DproceedToCartPossibility="30.0"

```


#### Short summary: 

empty definition using pc, found symbol in pc: 