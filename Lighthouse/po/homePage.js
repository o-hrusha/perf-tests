const BasePage = require("./basePage");

class HomePage extends BasePage {
  #headerMainCategorySelector = "h2.catalog-header";
  constructor(page, flow) {
    super(page, flow);
  }

  async checkHomePageLoaded() {
    await this.page.waitForSelector(this.#headerMainCategorySelector);
  }
}
module.exports = HomePage;
