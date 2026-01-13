import {test, expect} from '@playwright/test'

test('Locators',async ({page})=>{
    const allProductTexts=[]

    await page.goto('https://demoblaze.com/');
    await page.click('id=login2');
    await page.fill('#loginusername','NethraG');
    await page.fill("//input[@id='loginpassword']",'Nethra');

    await page.click("//button[text()='Log in']");
    //locators of the product name

    
    //click button for next page
    const nextPage=await page.locator("//button[@id='next2']");
    const pageLoaded=await page.locator("(//a[@class='hrefch'])[1]");
    
    let hasNextPage=true

    while (hasNextPage){
        await expect(page.locator("(//a[@class='hrefch'])[1]")).toBeVisible();
        const productNameLocators =await page.$$("//a[@class='hrefch']");
        for(const productNameLocator of productNameLocators){
            const productName=await productNameLocator.innerText();
            allProductTexts.push(productName);
        }
        if(await nextPage.isVisible() && await nextPage.isEnabled()){
            await nextPage.click();
        }else{
            hasNextPage=false;
        }
    }
console.log(allProductTexts);
await expect(allProductTexts).toContain('Samsung galaxy s6');
})
