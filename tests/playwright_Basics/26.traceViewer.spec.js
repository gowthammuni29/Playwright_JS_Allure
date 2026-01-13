import {test, expect} from '@playwright/test'


test('Sample Test',async ({page})=>{

    await page.goto('https://demoblaze.com/');
    await page.click('id=login2');
    await page.fill('#loginusername','NethraG');
    await page.fill("//input[@id='loginpassword']",'Nethra');
    await page.click("//button[text()='Log in']");
    const logout=await page.locator("//a[@onclick='logOut()']");
    await expect(logout).toBeVisible();
});

//to run trace viewer test use the below command in terminal: npx playwright show-trace path

//once trace - on: it will be under test-results folder with .zip file.
//we need to provide the path of the zip file on the command to open the trace viewer.
//what is trace viewer?
//Trace viewer is a Playwright feature that allows you to record and visualize the execution of your tests.
//It captures detailed information about each step of your test, including network requests, DOM snapshots, console logs, and more.
//This information is then presented in an interactive trace viewer interface, 
// which helps you understand the behavior of your tests and diagnose issues more effectively.

//how to enable trace viewer in Playwright?
//To enable trace viewer in Playwright, you need to configure your Playwright test runner to record traces during test execution.
//You can do this by setting the trace option in your Playwright configuration file (playwright.config.ts or playwright.config.js).
//Here is an example of how to enable trace viewer in your Playwright configuration file:

//case.1: trace:'on' - it will record trace for each test case.
//case.2: trace:'on-first-retry' - it will record trace only for the failed test case in the first retry.
//case.3: trace:'off' - it will not record trace for any test case.
//case.4: trace:'retain-on-failure' - it will record trace for all test cases, but only retain the trace for failed test cases.

//we need to enable trace in playwright.config.ts under use block.
//