error id: file:///C:/Users/Oleksandr_Hrusha/Desktop/PTF-Course/GATLING/gatling-perf-test/src/test/scala/simulations/PerfTestSimulation.scala:scala/concurrent/duration/DurationConversions#minutes().
file:///C:/Users/Oleksandr_Hrusha/Desktop/PTF-Course/GATLING/gatling-perf-test/src/test/scala/simulations/PerfTestSimulation.scala
empty definition using pc, found symbol in pc: 
found definition using semanticdb; symbol scala/concurrent/duration/DurationConversions#minutes().
empty definition using fallback
non-local guesses:

offset: 1414
uri: file:///C:/Users/Oleksandr_Hrusha/Desktop/PTF-Course/GATLING/gatling-perf-test/src/test/scala/simulations/PerfTestSimulation.scala
text:
```scala
// package simulations

// import io.gatling.core.Predef._
// import config.BaseHelpers._
// import scenarios.Demo.scnDemo

// class PerfTestSimulation extends Simulation {

//   setUp(
//     // OPEN MODEL (current active model)
//     // scnDemo.inject(
//     //   rampUsers(System.getProperty("rampUsers", "1").toInt)
//     //     .during(System.getProperty("rampUsersDuring", "60").toInt)
//     // )

   
//     // CLOSED MODEL (example, commented out)
//     // Keeps a constant number of concurrent users
//    scnDemo.inject(
//   rampConcurrentUsers(0).to(20).during(30),
//   constantConcurrentUsers(20).during(90)
// )

   

//   ).protocols(httpProtocol)
// }

// // to run test use:
// // mvn clean gatling:test -DrampUsers=100 -DrampUsersDuring=30 -DaddChairPossibility="50.0" -DproceedToCartPossibility="30.0"
// // mvn clean gatling:test -DaddChairPossibility="50.0" -DproceedToCartPossibility="30.0"


package simulations

import io.gatling.core.Predef._
import config.BaseHelpers._
import scenarios.Demo.scnDemo
import scala.concurrent.duration._

class PerfTestSimulation extends Simulation {

  private val targetUsers = System.getProperty("users", "100").toInt
  private val rampSeconds = System.getProperty("rampSeconds", "900").toInt

  setUp(
    scnDemo.inject(
      rampConcurrentUsers(0).to(targetUsers).during(rampSeconds)
    )
  ).protocols(httpProtocol)
   .maxDuration(20.minutes@@)
}



 //mvn clean gatling:test -Dusers=100 -DrampSeconds=900 -DaddChairPossibility="100.0" -DproceedToCartPossibility="100.0"



```


#### Short summary: 

empty definition using pc, found symbol in pc: 