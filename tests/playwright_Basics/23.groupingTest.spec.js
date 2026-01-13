import {test, expect} from '@playwright/test';

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
test.describe('Sanity Testing', ()=>{

    test('Add Device to Cart', async ()=>{
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
});

test.describe.skip('Regression', ()=>{

    test('Dummy1', async ()=>{
        console.log("This is regression test");
    });

     test('Dummy2', async ()=>{
        console.log("This is regression test");
    });

});