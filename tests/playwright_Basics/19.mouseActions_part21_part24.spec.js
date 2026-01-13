import { test, expect } from '@playwright/test';

test('Mouse Actions', async ({ page }) => {

await page.goto("https://vinothqaacademy.com/mouse-event/");


//Mouse Hover actions - element.hover()
const tabs = await page.locator("//div[@class='collapse navbar-collapse pull-right']/ul[@class='header-menu clearfix']/li/a").all();

//regular loop method:
// async function mouseHover(selecttab) {

//     for(const tab of tabs){

//         const selectedTab=await tab.textContent();
//         if(selectedTab === selecttab){

//             await tab.hover();
//             await page.waitForTimeout(4000);
//     }
//     }
// }

// await mouseHover("About Me & Feedback");
// await page.waitForTimeout(4000);
// await mouseHover("Free Complete QA Video Courses");
// await page.waitForTimeout(4000);

//using filter method:
const tabs1 = await page.locator("//div[@class='collapse navbar-collapse pull-right']/ul[@class='header-menu clearfix']/li/a");
const subTabs=await page.locator("//div[@class='collapse navbar-collapse pull-right']/ul[@class='header-menu clearfix']/li/ul/li/a");
async function mouseHover(locators, selecttab) {

    const selected1=locators.filter({
        hasText: selecttab
    }).first();
    await selected1.hover();
    await page.waitForTimeout(4000);
}

async function selectSubTab(selectsub){
    const selectedSubTab=subTabs.filter({
        hasText: selectsub
    }).first();
    await selectedSubTab.click(); 
}

await mouseHover(tabs1,"About Me & Feedback");
await page.waitForTimeout(4000);
await mouseHover(tabs1,"Free Complete QA Video Courses");
await page.waitForTimeout(4000);
//await selectSubTab("API Manual and Automation Testing using SoapUI");
await page.waitForTimeout(4000);


//Mouse right click actions: element.click({ button: 'right' })
//example:
// const rightclick= await page.locator("//div[@class='collapse navbar-collapse pull-right']");
//await rightclick.click({ button : 'right' });


//Mouse double click actions: element.dblclick()
//example:
// const doubleclick= await page.locator("//div[@class='collapse navbar-collapse pull-right']");
//await doubleclick.dblclick();

//Mouse drag and drop actions: 
//approach1 : using hover ad=nd page.mouse.down() and page.mouse.up()
//example: 
// const dragElement= await page.locator("//div[@class='collapse navbar-collapse pull-right']");
// const dropElement= await page.locator("//div[@class='collapse navbar-collapse pull-right']");
// await dragElement.hover();
// await page.mouse.down();
// await dropElement.hover();
// await page.mouse.up();

//Approach2: using drag and drop method: dragTo
// await dragElement.dragTo(dropElement);




});
