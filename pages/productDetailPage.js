import { BasePage } from './basePage.js';
/** @typedef {import('@playwright/test').Page} Page */

export class ProductDetailPage extends BasePage{
    /**
   * @param {Page} page
   */
    constructor(page){
        /** @type {Page} */
        super(page);//why super bcuz we are extending basepage class here.
        //we can access all the methods of basepage class using super
        this.selectedProductName=page.locator("//div[@id='tbodyid']/h2");
        this.SelectedProductPrice=page.locator("//h3[@class='price-container']");
        this.selectedProductDiscription=page.locator("//div[@id='more-information']/p");
        this.addToCart=page.locator("//a[@onclick='addToCart(5)']");
    }

    async expectOnDetailspage(){
        await this.expectVisible(this.selectedProductName);
        await this.expectVisible(this.addToCart);
    }

    async expectDeviceName(expectedName){
        await this.expectText(this.selectedProductName,expectedName);
    }

    async expectDevicePriceVisible(){
        await this.expectVisible(this.SelectedProductPrice);
    }

    async expectDescriptionVisible() {
    await this.expectVisible(this.selectedProductDiscription);
    }

    async expectAddToCartEnabled() {
        await this.expectEnabled(this.addToCart);
    }

    async clickAddToCart() {
        await this.click(this.addToCart);
    }

    async ProductAddedAlert(expectedMessage) {
        await this.handleAlert(expectedMessage);
    }


}