import {test, expect} from '@playwright/test'


test('Locators',async ({page})=>{

    await page.goto('https://demoblaze.com/');
    await page.click('id=login2');
    await page.fill('#loginusername','NethraG');
    await page.fill("//input[@id='loginpassword']",'Nethra');
    await page.click("//button[text()='Log in']");
    const logout=await page.locator("//a[@onclick='logOut()']");
    await expect(logout).toBeVisible();
});

//for the above simple script: if we want to take screenshot and video we need to update in playwright.config.ts file.
//for every test case it will take screenshot and video automatically after updating the config file.
//playwright.config.ts -> use -> screenshot:'on'  (it will take screenshot for each test case)
//playwright.config.ts -> use -> video:'on'  (it will take video for each test case)
//after updating the config file we no need to write any code inside the test file for screenshot and video.
//it will take automatically after running the test cases and it will show in report aswell.
//screenshots and videos will be saved in the default location.(tets-results folder)
//if we want to change the location of screenshots and videos we need to update in playwright.config.ts file.
//playwright.config.ts -> use -> screenshot:{path:'path of the location'}
//playwright.config.ts -> use -> video:{path:'path of the location'}

//1.case - screenshot:'on' , video:'on'  - it will take screenshot and video for each test case only for the test case.
//2.case - screenshot:'only-on-failure' , video:'retain-on-failure'  - it will take screenshot and video only for failed test cases.
//3.case - screenshot:'off' , video:'off'  - it will not take screenshot and video for any test case.