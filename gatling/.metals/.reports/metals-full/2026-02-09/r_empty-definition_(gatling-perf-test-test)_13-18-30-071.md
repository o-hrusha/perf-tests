error id: file:///C:/Users/Oleksandr_Hrusha/Desktop/PTF-Course/GATLING/gatling-perf-test/src/test/scala/simulations/PerfTestSimulation.scala:
file:///C:/Users/Oleksandr_Hrusha/Desktop/PTF-Course/GATLING/gatling-perf-test/src/test/scala/simulations/PerfTestSimulation.scala
empty definition using pc, found symbol in pc: 
empty definition using semanticdb
empty definition using fallback
non-local guesses:
	 -DaddChairPossibility.
	 -DaddChairPossibility#
	 -DaddChairPossibility().
	 -scala/Predef.DaddChairPossibility.
	 -scala/Predef.DaddChairPossibility#
	 -scala/Predef.DaddChairPossibility().
offset: 1599
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

class PerfTestSimulation extends Simulation {

  private val targetUsers = System.getProperty("users", "100").toInt
  private val rampSeconds = System.getProperty("rampSeconds", "900").toInt
  private val holdSeconds = System.getProperty("holdSeconds", "300").toInt // полка на пике

  setUp(
    scnDemo.inject(
      rampConcurrentUsers(0).to(targetUsers).during(rampSeconds),
      constantConcurrentUsers(targetUsers).during(holdSeconds)
    )
  ).protocols(httpProtocol)
}


mvn clean gatling:test -Dusers=100 -DrampSeconds=900 -DholdSeconds=300 \
  -DaddChairP@@ossibility="50.0" -DproceedToCartPossibility="30.0"

```


#### Short summary: 

empty definition using pc, found symbol in pc: 