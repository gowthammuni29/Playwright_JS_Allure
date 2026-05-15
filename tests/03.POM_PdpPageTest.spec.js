import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';
import { HomePage } from '../pages/homePage.js';
import { BasePage } from '../pages/basePage.js';
import { ProductDetailPage } from '../pages/productDetailPage.js';

/** @type {import('../pages/loginPage.js').LoginPage} */ //why use @type here?
//because we are defining the type of login variable here.
//this will help us to use the methods of LoginPage class in the test function.
let login; //we can use this login variable in other functions as well.

/** @type {import('../pages/homePage.js').HomePage} */
let homePage; //we can use this homePage variable in other functions as well.

/** @type {import('../pages/basePage.js').BasePage} */
let basePage; //we can use this homePage variable in other functions as well.

/** @type {import('../pages/productDetailPage.js').ProductDetailPage} */
let productDetailPage; //we can use this homePage variable in other functions as well.

test.beforeEach(async({page})=>{
    login= new LoginPage(page);
    homePage=new HomePage(page);
    basePage= new BasePage(page);
    productDetailPage= new ProductDetailPage(page);
    await login.gotoLoginPage();
    await homePage.selectHomepageTab('Log in');
    await login.login('NethraG','Nethra'); });


test.afterEach(async({page})=>{
    await homePage.selectHomepageTab('Log out');
});

test('PDP page', async ({page}) =>{
    await basePage.wait(4);
    await homePage.selectCateogry('Phones');
    await basePage.wait(4);
    await expect(homePage.selectCateogry()).toBeTruthy();
    await homePage.selectDevice('Iphone 6 32gb');
    await productDetailPage.expectOnDetailspage();
    await productDetailPage.expectDeviceName('Iphone 6 32gb');
    await productDetailPage.expectDevicePriceVisible();
    await productDetailPage.expectDescriptionVisible();
    await productDetailPage.expectAddToCartEnabled();
    await productDetailPage.clickAddToCart();
    await productDetailPage.ProductAddedAlert("Product added.");
   
});

test.only("Adding mUltiple Device", async({page})=>{
    await basePage.wait(4);
    await homePage.selectCateogry('Phones');
    await basePage.wait(4);
    //await expect(homePage.selectCateogry()).toBeTruthy();
    await homePage.selectDevice('Iphone 6 32gb');
    await productDetailPage.clickAddToCart();
    await productDetailPage.ProductAddedAlert("Product added.");
    await homePage.selectHomepageTab('Home ');
    await basePage.wait(4);
    await homePage.selectDevice('Nexus 6');

    });