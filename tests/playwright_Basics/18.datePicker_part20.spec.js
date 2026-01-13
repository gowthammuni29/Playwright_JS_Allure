import { test, expect } from '@playwright/test';

test('Date Picker', async ({ page }) => {
    //normal input date picker
    await page.goto('https://testautomationpractice.blogspot.com/');

    await page.click("//input[@id='datepicker']");
    await page.waitForTimeout(4000);
    await page.fill("//input[@id='datepicker']","06/03/1995");
    await page.waitForTimeout(4000);

    await page.keyboard.press('Tab');
    await page.waitForTimeout(4000);
    await page.click("//input[@id='txtDate']");
    
    await page.waitForTimeout(4000);

    //calender date picker using select Dropdown:

    const selectMonth=await page.locator("//select[@class='ui-datepicker-month']");
    const selectYear= await page.locator("//select[@class='ui-datepicker-year']");
    await selectMonth.selectOption("Aug");
    await selectYear.selectOption("2022");
    const selectedMonth=await selectMonth.textContent();
    const selectedYear= await selectYear.textContent();
    await expect.soft(selectedMonth.includes("Aug")).toBeTruthy();
    await expect.soft(selectedYear.includes("2022")).toBeTruthy();

    //clicking date from calender its not select tag - using for loop (tried with function for reusable code)
    // const tableDate= await page.locator("//table[@class='ui-datepicker-calendar']/tbody/tr/td/a").all();
    // async function datePickerMethod(locators,selectDate) {
    //     for (const dates of locators){
    //         const dateText=await dates.textContent();
    //         if(dateText===selectDate){
    //             await dates.click();
    //             expect.soft(dateText).toContain("6"); 
    //             break;
            
    //     }
    //     }  
    // }
    // await datePickerMethod(tableDate,"6");


    //clicking date from calender its not select tag - using filter Method:


    //when we use filter need to remove .all() from the locator.
    const tableDate1= await page.locator("//table[@class='ui-datepicker-calendar']/tbody/tr/td/a");

    async function datefilterMethod(locateDate,pickDate){
        const datepicked=await locateDate.filter({ hasText: pickDate}).first();
        await datepicked.click();
        await expect.soft(locateDate.filter({ hasText: pickDate}).first()).toContainText("6");
        await page.waitForTimeout(4000);
    }
    
    await datefilterMethod(tableDate1,"6");
    await page.waitForTimeout(4000);

    await page.keyboard.press('Tab');
    // certain pop up date-pickers are there where you cannot inspect the date.
    //There is NO dropdown <ul>/<li> in the DOM
    // ✅ The calendar you see is rendered by the browser UI, not by HTML
    // ✅ Therefore, you cannot inspect calendar dates in Elements tab
    //⚠️ Format must be: YYYY-MM-DD, Even if UI shows dd-mm-yyyy
    await page.locator('#start-date').fill('1995-06-03'); //filling date using input tag

    });
    
    
    

    


