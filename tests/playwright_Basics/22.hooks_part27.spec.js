import { test, expect } from '@playwright/test';


//playwright Hooks:
    // beforeEach - runs before each test in the file
    // afterEach - runs after each test in the file

    // beforeAll - runs once before all tests in the file
    // afterAll - runs once after all tests in the file

    //beforeEach:
    //scenario: you have two test cases, with login and logout functionality.
    //So, instead of writing login code in each test case,
    //  we can use beforeEach hook to do the login before each test case.

    //afterEach:
    //scenario: you have two test cases, with login and logout functionality.
    //So, instead of writing logout code in each test case,
    //  we can use afterEach hook to do the logout after each test case.

    //beforeAll:
    //scenario: you have two test cases, with login and logout functionality.
    //So, instead of login and logout for each test case,
    //  we can use beforeAll hook to do the login once before all test cases.

    //afterAll:
    //scenario: you have two test cases, with login and logout functionality.
    //So, instead of login and logout for each test case,
    //  we can use afterAll hook to do the logout once after all test cases.

//beforeEach:
let page;
test.beforeEach(async ({browser}) => {
//when we use beforeEach inside test block, we need to pass browser object
//we cannot use page fixture inside beforeEach in test block
//for that we need to create new page using browser.newPage()    
page=await browser.newPage(); 
await page.goto('https://demoblaze.com/');
await page.waitForTimeout(4000);
await page.click('id=login2');
await page.fill('#loginusername','NethraG');
await page.fill("//input[@id='loginpassword']",'Nethra');
await page.click("//button[text()='Log in']"); 
await page.waitForTimeout(4000);


});

//afterEach:
test.afterEach(async () => {
    //already we have page object created in beforeEach
    //so we can use that page fixture here directly
    //only this page fixture need to use for all test cases inside this file.
    await page.locator("//a[@id='logout2']").click();
    //we can keep blank async function if no need to pass any object
    
    
    });


test('Add to Cart', async () => {
    //already we have page object created in beforeEach
    //so we can use that page fixture here directly
    //if we put page as parameter in this test function, it will create new page object
    //which lead to empty page and test will fail.
    const wholeProducts=await page.locator("//a[@class='hrefch']");
    const selectedProduct=await wholeProducts.filter({hasText: 'Samsung galaxy s6'});

    //why we use promise.all here?
    //because we want to wait for two things to happen at the same time.
    //we want to wait for the page to navigate to the product page, and we want to click on the product at the same time.
    //so we use promise.all to wait for both things to happen at the same time.
    //if we don't use promise.all, then the page will wait for the navigation to complete before it clicks on the product,
    //  which is not what we want. also we are getting error after click with the page blank.
    //rule : When do you MUST use Promise.all in Playwright?
    //A click causes navigation
    //A click opens a new page
    //A download starts after click
    //A popup / new tab opens

    
    await selectedProduct.click();
    await expect(page).toHaveURL(/.*prod\.html\?idp_=\d+/);
        
    await page.locator("//a[@onclick='addToCart(1)']").click();
    await page.waitForTimeout(4000);
    //enabling alert handling
    page.on('dialog', async dialog => {
        expect(dialog.message()).toContain('Product added.'); //validating the message in the dialog.
        await dialog.accept();
    });
});

test('Add second Product to Cart', async () => {

    const wholeProducts=await page.locator("//a[@class='hrefch']");
    const selectedProduct=await wholeProducts.filter({
        hasText: 'Nokia lumia 1520'
    });   
    await selectedProduct.click();
    await page.locator("//a[@onclick='addToCart(2)']").click();
    
    //enabling alert handling
    page.on('dialog', async dialog => {
        expect(dialog.message()).toContain('Product added.'); //validating the message in the dialog.
        await dialog.accept();
    });
});

//playwright.config.ts where we need to cahnge parallel to false to run the tests sequentially in a single browser instance.
//otherwise each test will run in separate browser instance and beforeEach and afterEach will not work as expected.
//workers: 1, //to run the tests sequentially in a single browser instance.
