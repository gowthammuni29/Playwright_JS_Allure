
//what is tagging in Playwright?
//Tagging is a way to categorize and organize your tests in Playwright using annotations called tags.
//Tags allow you to group related tests together, making it easier to run specific subsets of tests based on their tags.
//tags are added to test cases using the @ symbol followed by the tag name in the test title or description.

//how to use tagging in Playwright?
//To use tagging in Playwright, you can add tags to your test cases using the @ symbol followed by the tag name in the test title or description.
//You can then run tests based on their tags using the --grep option with the Playwright test runner.

//sometimes we may have test case which are related to multiple groups like sanity, regression etc.
//in such cases we can use describe block to group those test cases together. 
//we can add multiple tags to a single test case by separating them with spaces.
//example: test('Add Device to Cart @sanity @regression', async ()=>{}); while running the tests if you want to remove test case which was
//both tags we can use --grep-invert option in terminal command.
//example: npx playwright test --grep @sanity -invert "@sanity @regression" -. run only sanity tests 
// except the one which has both sanity and regression tags.


//terminal command to run tagged tests:
//npx playwright test --grep "@tagname"
//example: npx playwright test --grep "@sanity"

import {test, expect} from '@playwright/test'

/** @type {import('@playwright/test').Page} */
//without passing the above statement page obect inside beforeEach wonnt show locators and 
// other options.
//typed global page (so VS Code knows it’s a Playwright Page)
let page;
test.beforeAll(async({browser})=>{
page=await browser.newPage();
await page.goto('https://demoblaze.com/');
await page.waitForTimeout(4000);
await page.click('id=login2');
await page.fill('#loginusername','NethraG');
await page.fill("//input[@id='loginpassword']",'Nethra');
await page.click("//button[text()='Log in']"); 
await page.waitForTimeout(4000);

});

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
test.describe('Sanity Testing ', ()=>{

    test('Add Device to Cart @sanity', async ()=>{
    const wholeProducts=await page.locator("//a[@class='hrefch']");
    const selectedProduct=await wholeProducts.filter({hasText: 'Samsung galaxy s6'});
    await selectedProduct.click();
    await expect(page).toHaveURL(/.*prod\.html\?idp_=\d+/);
    await page.locator("//a[@onclick='addToCart(1)']").click();
    await page.waitForTimeout(4000);
    page.on('dialog', async dialog => {
            expect(dialog.message()).toContain('Product added.'); //validating the message in the dialog.
            await dialog.accept();
        }); //this is to accept the dialog box.
    });
    test('Add second Product to Cart @regression', async () => {
    
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
});

test.describe('Regression ', ()=>{

    test('Dummy1 @sanity', async ()=>{
        console.log("This is regression test");
    });

     test('Dummy2 @sanity @regression', async ()=>{
        console.log("This is regression test");
    });

});