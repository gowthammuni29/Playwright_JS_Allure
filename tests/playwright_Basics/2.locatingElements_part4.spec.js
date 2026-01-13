//const {test, expect}=require('@playwright/test')
//we can write in other way
import {test, expect} from '@playwright/test'

test('Locators',async ({page})=>{

    await page.goto('https://demoblaze.com/');
    //await page.locator('Here we need to pass the locators').click();
    //other approach
    //await page.click('Here we need to pass the locators'); //most prepareable.

    //click on login button - using proprety (we need to copy both property and its value as well)
    //await page.locator('id=login2').click();
    await page.click('id=login2');

    //fill the user name - using CSS
    //fill- fill where we used to write the text on UI
    //await page.locator('#loginusername').fill('Gowtham');
    await page.fill('#loginusername','NethraG');
    //we also can use type keyword instead of fill.
    //await page.type('#loginusername','Gowtham');
    
    //fill the password -using Xpath
    //if the locators has single quote in xpath or css then we need to use double quote in js.
    await page.fill("//input[@id='loginpassword']",'Nethra');

    //click on login button - using Xpath
    await page.click("//button[text()='Log in']");

    //verify the logout link presence
    const logout=await page.locator("//a[@onclick='logOut()']");

    //assertion using expect
    await expect(logout).toBeVisible();

    //closing the browser
    await page.close();

})