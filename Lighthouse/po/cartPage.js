const BasePage = require("./basePage");

class CartPage extends BasePage {
  #placeAnOrderButtonSelector =
    "input.to_cart_submit.button.green-box.ic-design";
  constructor(page, flow) {
    super(page, flow);
  }

  async clickCheckOut() {
    await this.page.click(this.#placeAnOrderButtonSelector);
  }

  async checkCartPageLoaded() {
    await this.page.waitForSelector(this.#placeAnOrderButtonSelector);
  }
}

module.exports = CartPage;
