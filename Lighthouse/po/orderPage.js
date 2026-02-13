const fs = require("fs");
const BasePage = require("./basePage");

class OrderPage extends BasePage {
  #orderUserTestDataPath = "./data-for-order.json";

  #cartNameFieldSelector = 'input[name="cart_name"]';
  #cartAddressFieldSelector = 'input[name="cart_address"]';
  #cartPostalFieldSelector = 'input[name="cart_postal"]';
  #cartCityFieldSelector = 'input[name="cart_city"]';
  #cartCountryFieldSelector = 'select[name="cart_country"]';
  #cartPhoneFieldSelector = 'input[name="cart_phone"]';
  #cartEmailFieldSelector = 'input[name="cart_email"]';
  #submitOrderButtonSelector = 'input[name="cart_submit"]';
  #checkOrderPageLoadedSelector = 'input[name="cart_name"]';

  constructor(page, flow) {
    super(page, flow);
  }
  async #getRandomUserData() {
    const orderDataArray = JSON.parse(
      fs.readFileSync(this.#orderUserTestDataPath, "utf8"),
    );

    return orderDataArray[Math.floor(Math.random() * orderDataArray.length)];
  }

  async #fillInCheckoutForm(orderData) {
    await this.page.type(this.#cartNameFieldSelector, orderData.name);
    await this.page.type(this.#cartAddressFieldSelector, orderData.address);
    await this.page.type(this.#cartPostalFieldSelector, orderData.postal);
    await this.page.type(this.#cartCityFieldSelector, orderData.city);
    await this.page.select(this.#cartCountryFieldSelector, orderData.country);
    await this.page.type(this.#cartPhoneFieldSelector, orderData.phone);
    await this.page.type(this.#cartEmailFieldSelector, orderData.email);
  }

  async #clickSubmitAnOrder() {
    await this.page.click(this.#submitOrderButtonSelector);
  }

  async submitOrder() {
    const orderData = await this.#getRandomUserData();
    await this.#fillInCheckoutForm(orderData);
    await this.#clickSubmitAnOrder();
  }

  async checkOrderPageLoaded() {
    await this.page.waitForSelector(this.#checkOrderPageLoadedSelector);
  }

  async checkOrderIsCreated() {
    await this.page.waitForFunction(
      () => window.location.href.includes("thank-you"),
      {
        timeout: 20000,
      },
    );
  }
}

module.exports = OrderPage;
