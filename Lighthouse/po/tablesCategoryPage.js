const BasePage = require("./basePage");

class TablesCategoryPage extends BasePage {
  #listOfProductsTableSelector = 'a[href*="/products/"]';
  #addToCartButtonSelector = "button.button.green-box.ic-design";
  constructor(page, flow) {
    super(page, flow);
  }

  async openRandomTable() {
    await this.page.evaluate((selector) => {
      const products = Array.from(document.querySelectorAll(selector));
      if (products.length === 0) return;

      const randomIndex = Math.floor(Math.random() * products.length);
      products[randomIndex].click();
    }, this.#listOfProductsTableSelector);
  }

  async clickAddProductToCart() {
    await this.page.click(this.#addToCartButtonSelector);
  }

  async checkTableCategoryPageLoaded() {
    await this.page.waitForSelector(this.#listOfProductsTableSelector);
  }
  async checkRandomTablePageLoaded() {
    const el = await this.page.waitForSelector(this.#addToCartButtonSelector, {
      visible: true,
      timeout: 30000,
    });

    await el.evaluate((e) =>
      e.scrollIntoView({ block: "center", inline: "center" }),
    );
  }
}

module.exports = TablesCategoryPage;
