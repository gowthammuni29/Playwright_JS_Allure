import {test, expect} from '@playwright/test';
//const path = require('path');
import path from 'path';

/** @type {import('@playwright/test').Page} */
//without passing the above statement page obect inside beforeEach wonnt show locators and 
// other options.
//typed global page (so VS Code knows it’s a Playwright Page)
let page;
test.beforeAll(async({browser})=>{
    page=await browser.newPage();
    await page.goto('https://demoblaze.com/');

    //we need to use .screenshot() method to take screenshot
    //inside screenshot method we need to pass path where we want to save the screenshot
    //and the name of the screenshot.
    //if we want ful image we need use fullPage:true inside the method.
    //we are adding Date.now() to make the screenshot name unique every time we run the test orlese
    //it will overwrite the previous screenshot.
    await page.screenshot(
        {path:'Playwright_Basics\\tests\\ScreenShots\\'+Date.now()+'HomePage.png'}
    );//screenshot of the homepage.
    await page.waitForTimeout(4000);
    await page.click('id=login2');
    await page.fill('#loginusername','NethraG');
    await page.fill("//input[@id='loginpassword']",'Nethra');
    await page.screenshot(
        {path:'Playwright_Basics\\tests\\ScreenShots\\'+Date.now()+'loginPage.png',fullPage:true}
    );
    await page.click("//button[text()='Log in']"); 
    await page.waitForTimeout(4000);

    });

//async function: dynamic screenshot function for reusable screenshot code.
async function takescreenshots(name,fullPage) {
    const folderPath = 'Playwright_Basics\\tests\\ScreenShots\\';
    const time = Date.now();
    const filepath = path.join(folderPath, `${time}_${name}.png`);
    await page.screenshot({
        path:filepath,
        fullPage:fullPage
});  
}

async function takeLocatorScreenshots(name,locators,fullPage) {
    const folderPath = 'Playwright_Basics\\tests\\ScreenShots\\';
    const time = Date.now();
    const filepath = path.join(folderPath, `${time}_${name}.png`);
    await page.locator(locators).screenshot({
        path:filepath,
        fullPage:fullPage
});  
}




test.afterAll(async () => {
    await page.locator("//a[@id='logout2']").click();
});

test.afterEach(async ()=>{
    //after each testing completed it should click the home button.
    await page.locator("(//a[@href='index.html'])[2]").click();
    await page.waitForTimeout(4000);
});

//.describe block to group tests , We can group related tests inside describe block.
//if we want specific group to run, we can use .only method after describe. which will run only that group.
//OR we can use .skip method after describe to skip that group of tests.
test.describe('Sanity Testing', ()=>{

    test('Add Device to Cart', async ()=>{
    const wholeProducts=await page.locator("//a[@class='hrefch']");
    const selectedProduct=await wholeProducts.filter({hasText: 'Samsung galaxy s6'});
    await selectedProduct.click();
    await expect(page).toHaveURL(/.*prod\.html\?idp_=\d+/);
    await takescreenshots('Deviceselected');//screenshot of the selected device.
    await page.locator("//a[@onclick='addToCart(1)']").click();
    await takescreenshots('DialogueBox',false);//screenshot of the dialogue box.
    await page.waitForTimeout(4000);
    page.on('dialog', async dialog => {
            expect(dialog.message()).toContain('Product added.'); //validating the message in the dialog.
            await dialog.accept();
        }); //this is to accept the dialog box.
    });
    test('Add second Product to Cart', async () => {
    
        const wholeProducts=await page.locator("//a[@class='hrefch']");
        const selectedProduct=await wholeProducts.filter({
            hasText: 'Nokia lumia 1520'
        });   
        await takeLocatorScreenshots('SecondDevice',selectedProduct);//screenshot of the selected device locator.
        await selectedProduct.click();
        await page.locator("//a[@onclick='addToCart(2)']").click();
        await takescreenshots('DialogueBox',false);//screenshot of the dialogue box.
        
        //enabling alert handling
        page.on('dialog', async dialog => {
            expect(dialog.message()).toContain('Product added.'); //validating the message in the dialog.
            await dialog.accept();
        });
    });
});
//if we want to take of all the tests which we run inside the describe block
//we need to update in playwrght.config.js file - important
//add this line in config file: screenshot:'on' - important
//but it will take single screenshot for each test case only for the test case.