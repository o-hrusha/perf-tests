error id: file:///C:/Users/Oleksandr_Hrusha/Desktop/PTF-Course/GATLING/gatling-perf-test/src/test/scala/simulations/PerfTestSimulation.scala:io/gatling/core/controller/inject/open/OpenInjectionSupport#atOnceUsers().
file:///C:/Users/Oleksandr_Hrusha/Desktop/PTF-Course/GATLING/gatling-perf-test/src/test/scala/simulations/PerfTestSimulation.scala
empty definition using pc, found symbol in pc: 
found definition using semanticdb; symbol io/gatling/core/controller/inject/open/OpenInjectionSupport#atOnceUsers().
empty definition using fallback
non-local guesses:

offset: 241
uri: file:///C:/Users/Oleksandr_Hrusha/Desktop/PTF-Course/GATLING/gatling-perf-test/src/test/scala/simulations/PerfTestSimulation.scala
text:
```scala
package simulations

import io.gatling.core.Predef._
import config.BaseHelpers._
import scenarios.Demo.scnDemo

class PerfTestSimulation extends Simulation {

//mvn gatling:test
//mvn clean gatling:test

  setUp(
    scnDemo.inject(
      at@@OnceUsers(System.getProperty("DemoUsers", "1").toInt)
      .during(System.getProperty("rampUsersDuring", "60").toInt))
  ).protocols(httpProtocol)
}


// to run test use: mvn clean gatling:test -DUsers=100 -DrampUsersDuring=30 -DaddChairPossibility="70.0" -DproceedToCartPossibility="30.0"

```


#### Short summary: 

empty definition using pc, found symbol in pc: 