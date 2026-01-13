//Homepage login and check.
//in playwright we can right code using codegen aswell.
// require --> need to use modules from from other files to access it. 
//under node_modules we have @playwirght\test which we need to access. 
//{test, expect} --> we are taking test and expect from the playwright package to test and validate.

import {test, expect} from '@playwright/test';
//test--> test is required to create our test.
//expect --> expect is required to validate our test. these two are available in @playwright/test package.

//test --> is a function to create a test.
//homepage --> is a name of the test.
test('Home Page',async ({page})=>{
    //home page is a title for this test. 
    //{page} -> is a fixture with lot of function. we can access all the function of page using this.
    //page --> is a function to open a new tab.
    await page.goto('https://demoblaze.com/');
    //page.goto --> is a function to open a url.
    //page.goto('https://demoblaze.com/') --> is a url to open.
    ////Await can only be used inside an async function.async returns the promise and awaits for the promise to resolve.
    //javascript is a asynchronized function and all the methods and functions are run parallelly.
    //here we are using await to make sure that the page is loaded before we validate it.
    //here automation steps depends on the previous step. once we launch browser only we can able to validate. so we are using 
    //await to make sure that the page is loaded before we validate it.
    
    //expect
    await expect(page).toHaveTitle('STORE');
    //expect(page).toHaveTitle('STORE') --> is a function to validate the title of the page.
    //page --> is a function to open a new tab.
    //toHaveTitle --> is a function to validate the title of the page.
    //('STORE') --> is a title of the page.
    //expect is used to validate.
    const pageTitle= await page.title();
    console.log('page title is ', pageTitle);
    const pageURL= await page.url();
    console.log('page url is ', pageURL);

    await expect(page).toHaveURL(pageURL);
    await page.close();
})

//TO run test on terminal: headless, if you want run as headed mode just add --headed at the end
//test file should always save as spec.js
// to run all the test -> npx playwright test
//to run the specific test script -> npx playwright test testname
//by default test will execute in three browsers(chromium, webkit, firefox)
//to run on specfic browser -> npx playwright test --project=chromium
//to run with headed mode -> npx playwright test --project=chromium --headed