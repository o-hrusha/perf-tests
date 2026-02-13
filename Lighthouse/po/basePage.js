class BasePage {
  #baseUrl;
  #cartPageSelector;
  #tableCategorySelector;
  constructor(page, flow) {
    this.page = page;
    this.flow = flow;

    this.#baseUrl = "http://localhost";
    this.#cartPageSelector = "li.page-item-31 a";
    this.#tableCategorySelector = "li.page-item-13 a";
  }

  async openHomePage() {
    await this.page.goto(this.#baseUrl);
  }

  async openTableCategoryPage() {
    await this.page.click(this.#tableCategorySelector);
  }

  async openCartPage() {
    await this.page.click(this.#cartPageSelector);
  }
}

module.exports = BasePage;
