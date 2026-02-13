file:///C:/Users/Oleksandr_Hrusha/Desktop/PTF-Course/GATLING/gatling-perf-test/src/test/scala/simulations/PerfTestSimulation.scala
empty definition using pc, found symbol in pc: 
semanticdb not found
empty definition using fallback
non-local guesses:
	 -io/gatling/core/Predef.atOnceUsers.
	 -io/gatling/core/Predef.atOnceUsers#
	 -io/gatling/core/Predef.atOnceUsers().
	 -config/BaseHelpers.atOnceUsers.
	 -config/BaseHelpers.atOnceUsers#
	 -config/BaseHelpers.atOnceUsers().
	 -atOnceUsers.
	 -atOnceUsers#
	 -atOnceUsers().
	 -scala/Predef.atOnceUsers.
	 -scala/Predef.atOnceUsers#
	 -scala/Predef.atOnceUsers().
offset: 239
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
    scnDemo.inject(atOnceU@@sers(System.getProperty( key= "DemoUsers", def= "1").toInt))
  ).protocols(httpProtocol)
}


// to run test use: mvn clean gatling:test -DrampUsers=100 -DrampUsersDuring=30 -DaddChairPossibility="70.0" -DproceedToCartPossibility="30.0"

```


#### Short summary: 

empty definition using pc, found symbol in pc: 