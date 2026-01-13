import { BasePage } from './basePage.js';
/** @typedef {import('@playwright/test').Page} Page */



export class CartPage extends BasePage{
    /**
   * @param {Page} page
   */
    constructor(page){
        /** @type {Page} */
        super(page);//why super bcuz we are extending basepage class here.
        //we can access all the methods of basepage class using super
        this.hompagetabs=page.locator("//div[@id='navbarExample']/ul/li/a");
        this.placeOrder=page.locator("//button[@class='btn btn-success']");
        this.cartDevice=page.locator("(//tr[@class='success']/td)[2]");

    }

    async selectCartTab(cartab){
        this.selectTextInList(this.hompagetabs,cartab);

    }

    async expectedDeviceName(devicename){
        await this.expectText(this.cartDevice,devicename);
    } 
    async clickPlaceOrder(){
        await this.click(this.placeOrder);
    }
        
    
}