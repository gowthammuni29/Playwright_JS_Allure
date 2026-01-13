//when we mention exports. classname it means we are exporting that class
//so that we can use it in other files. we can import this class in other files.

//On this loginPage page is not showing any auto-suggestions because we have not defined
//  the type of page parameter in constructor.
//To define the type of page parameter we can use JSDoc comments as shown below:
import { expect } from '@playwright/test';
import { BasePage } from '../pages/basePage.js';
/** @typedef {import('@playwright/test').Page} Page */
export class LoginPage extends BasePage {
   /**
   * @param {Page} page
   */
    constructor(page){
        /** @type {Page} */
        super(page);//why super bcuz we are extending basepage class here.
        //we can access all the methods of basepage class using super
        this.url='https://demoblaze.com/';
        this.loginLink = page.locator('#login2');
        this.userNameInput =page.locator("//input[@id='loginusername']");
        this.passwordInput = page.locator("//input[@id='loginpassword']");
        this.loginButton = page.locator("//button[text()='Log in']");
        this.logoutButton = page.locator("//a[@id='logout2']");
        this.loggedUserName=page.locator("//a[@id='nameofuser']");
        this.loginTabs=page.locator("//div[@id='navbarExample']/ul/li/a");//this is the xpath for login tabs
        
    }

    async gotoLoginPage(){
        await this.navigate(this.url);
    }

    async clickLoginLink(){
       await this.click(this.loginLink);

    }

    async validateLoginPopupUI() {
        this.expectVisible(this.userNameInput);
        this.expectVisible(this.passwordInput);
        this.expectEnabled(this.loginButton);
    }



    async login(username,password){
        await this.fill(this.userNameInput, username);
        await this.fill(this.passwordInput, password);
        await this.click(this.loginButton);
    }

    async validateLoginSuccess(){
       await this.expectVisible(this.loggedUserName);
       await this.expectText(this.loggedUserName,'Welcome NethraG');
    }
    

    async logout(){
        await this.page.locator(this.logoutButton).click();
    }
}