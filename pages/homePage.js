//when we mention exports. classname it means we are exporting that class
//so that we can use it in other files. we can import this class in other files.

//On this loginPage page is not showing any auto-suggestions because we have not defined
//  the type of page parameter in constructor.
//To define the type of page parameter we can use JSDoc comments as shown below:
import { BasePage } from '../pages/basePage.js';
/** @typedef {import('@playwright/test').Page} Page */
export class HomePage extends BasePage{
    /**
   * @param {Page} page
   */
    constructor(page){
        /** @type {Page} */
        super(page);}//why super bcuz we are extending basepage class here.
        //we can access all the methods of basepage class using super
        categoreisAll=this.page.locator("//div[@class='list-group']/a[@onclick]");
        homePageTabsAll=this.page.locator("//div[@id='navbarExample']/ul/li/a");
        devicesAll =this.page.locator("//div[@id='tbodyid']/div/div/div/h4/a");
        nextButton=this.page.locator("//button[@id='next2']");


    

    async openHomePage(){
        await this.navigate('/');
    }

    async selectCateogry(catergoryName){
        await this.selectTextInList(this.categoreisAll,catergoryName);
    }

    async selectHomepageTab(homePageTab){
        await this.selectTextInList(this.homePageTabsAll,homePageTab);
    }

    async selectDevice(deviceName){
        await this.waitForItemsToLoad(this.devicesAll);
        await this.clickItemAcrossPages(this.devicesAll, this.nextButton, deviceName);
    }
    

}