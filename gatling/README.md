# Gatling Performance Test Project

A load testing project for an e-commerce website using Gatling framework with Scala.

## 🛠️ Requirements

- Java 8+
- Maven 3.6+
- Gatling 3.6.1

## 🚀 Quick Start

### Running Tests

```bash
# Basic run (1 user)
mvn clean gatling:test

# With load parameters
mvn clean gatling:test -DrampUsers=100 -DrampUsersDuring=30

# With additional probability parameters
mvn clean gatling:test \
  -DrampUsers=100 \
  -DrampUsersDuring=30 \
  -DgoToChairsPossibility=50.0 \
  -DproceedToCartPossibility=30.0
```

### Execution Parameters

- `rampUsers` - number of users (default: 1)
- `rampUsersDuring` - ramp-up duration in seconds (default: 60)
- `goToChairsPossibility` - probability of navigating to chairs category in % (default: 50.0)
- `proceedToCartPossibility` - probability of proceeding to checkout in % (default: 30.0)

## 📂 Directory Description

### `api/` - API Methods

Contains objects with methods for executing HTTP requests:

- `homePage` - home page interactions
- `tableCategory` / `chairCategory` - product category operations
- `cart` - shopping cart operations (add, view, place order)
- `checkout` - checkout process

### `config/` - Configuration

- `BaseHelpers` - base settings:
  - `baseUrl` - URL of the application under test (default: `http://localhost`)
  - `httpProtocol` - HTTP protocol with headers
  - `thinkTimer()` - function for pauses between actions

### `scenarios/` - Scenarios

- `Demo.scala` - main scenario:
  1. Open home page
  2. Browse tables category
  3. Add table to cart
  4. (Optional) Browse chairs category and add chair
  5. (Optional) Complete checkout

### `simulations/` - Simulations

- `PerfTestSimulation` - load configuration and scenario execution

### `resources/data/` - Test Data

- `users_data.csv` - CSV file with user data (name, address, email, etc.)

## 📊 Test Results

After test execution, results are saved in:

```
target/gatling/[timestamp]/
```

Open the `index.html` file in your browser to view the detailed report.

## ⚙️ Configuration

### Changing Base URL

Edit `src/test/scala/config/BaseHelpers.scala`:

```scala
val baseUrl = "http://your-server.com"
```

### Adding Test Data

Add users to `src/test/resources/data/users_data.csv`:

```csv
USER_NAME,USER_ADDRESS,USER_POSTAL,USER_CITY,USER_COUNTRY,USER_PHONE,USER_EMAIL
John Doe,123 Main St,12345,New York,USA,+1234567890,john@example.com
```
