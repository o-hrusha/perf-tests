const fs = require("fs");
const puppeteer = require("puppeteer");
const { startFlow } = require("lighthouse");

const HomePage = require("./po/homePage");
const CartPage = require("./po/cartPage");
const OrderPage = require("./po/orderPage");
const TablesCategoryPage = require("./po/tablesCategoryPage");

async function captureReport() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
  });

  try {
    const page = await browser.newPage();

    await page.setViewport({ width: 1366, height: 768 });
    page.setDefaultTimeout(15000);

    const flow = await startFlow(page, {
      name: "Placing-an-order-for-random-table",
      configContext: {
        settingsOverrides: {
          onlyCategories: ["performance"],

          formFactor: "desktop",
          screenEmulation: {
            mobile: false,
            width: 1366,
            height: 768,
            deviceScaleFactor: 1,
            disabled: false,
          },

          throttlingMethod: "provided",
          throttling: {
            rttMs: 0,
            throughputKbps: 0,
            requestLatencyMs: 0,
            downloadThroughputKbps: 0,
            uploadThroughputKbps: 0,
            cpuSlowdownMultiplier: 1,
          },
        },
      },
    });

    const homePage = new HomePage(page, flow);
    const cartPage = new CartPage(page, flow);
    const orderPage = new OrderPage(page, flow);
    const tablesCategoryPage = new TablesCategoryPage(page, flow);

    console.log("Open home page");
    await flow.startNavigation({ name: "Open Home page" });
    await homePage.openHomePage();
    await homePage.checkHomePageLoaded();
    await flow.endNavigation();

    console.log("Open Tables category");
    await flow.startTimespan({ name: "Open Tables category" });
    await homePage.openTableCategoryPage();
    await tablesCategoryPage.checkTableCategoryPageLoaded();
    await flow.endTimespan();

    console.log("Open random table");
    await flow.startTimespan({ name: "Open random table" });
    await tablesCategoryPage.openRandomTable();
    await tablesCategoryPage.checkRandomTablePageLoaded();
    await flow.endTimespan();

    console.log("Add to cart");
    await flow.startTimespan({ name: "Add to cart" });
    await tablesCategoryPage.clickAddProductToCart();
    await flow.endTimespan();

    console.log("Open cart");
    await flow.startTimespan({ name: "Open cart page" });
    await tablesCategoryPage.openCartPage();
    await cartPage.checkCartPageLoaded();
    await flow.endTimespan();

    console.log("Click checkout");
    await flow.startTimespan({ name: "Click checkout" });
    await cartPage.clickCheckOut();
    await orderPage.checkOrderPageLoaded();
    await flow.endTimespan();

    console.log("Submit order");
    await flow.startTimespan({ name: "Submit order" });
    await orderPage.submitOrder();
    await orderPage.checkOrderIsCreated();
    await flow.endTimespan();

    const flowResult = await flow.createFlowResult();
    const reportHtml = await flow.generateReport(flowResult, "html");
    const reportPath = `Placing-an-order-for-random-table-${Date.now()}.html`;
    fs.writeFileSync(reportPath, reportHtml);
    console.log(`Report saved: ${reportPath}`);
  } catch (err) {
    console.error("Error during the process:", err);
  } finally {
    await browser.close();
  }
}

captureReport();

// To run test use: node Placing-an-order-for-random-table-with-page-objects.js
