import { test , expect } from "@playwright/test";

test('Soft Assertion', async ({page}) =>{
    let url='https://demoblaze.com/index.html'

    await page.goto(url);
    await page.click('id=login2');
    await page.fill('id=loginusername','NethraG');
    await page.fill('id=loginusername','Nethra');
    await page.click("//button[text()='Log in']");
    await expect.soft(page).toHaveURL('https://demoblaze.com');
    await expect(page).toHaveURL('https://demoblaze.com/index.html');
    await expect.soft(page).toHaveTitle('STORE1234');
    await expect(page).toHaveTitle('STORE');

    //what is hard and soft assertion ?
    //hard assertion will stop the execution of the test case if the assertion fails
    //soft assertion will not stop the execution of the test case if the assertion fails
    //soft assertion will continue the execution of the test case even if the assertion fails
    //soft assertion will give the result of the test case as failed
    //hard assertion will give the result of the test case as passed
    //soft assertion will give the result of the test case as passed if all the assertions are passed
    //soft assertion will give the result of the test case as failed if any of the assertions are failed











})
