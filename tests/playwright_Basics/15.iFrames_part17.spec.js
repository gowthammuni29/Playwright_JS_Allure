import { test, expect } from '@playwright/test';

test('Frames', async ({ page }) => {

    await page.goto('https://ui.vision/demo/webtest/frames/');

    //we can use page.framelocator or page.frame() to handle iFrames in Playwright
    //page.frame() is used to get the frame object 
    // and then we can use that frame object to interact with elements inside the iFrame
    //mostly page.frame is used when we have to do multiple operations inside the iFrame
    //page.frame() method takes name attribute or url Frame
    //page.frames() cannot pick the locator.
    //page.frame() returns the frame object
    //it return the array of all frames inside the page

    //total frames in the page
    const totalFrames= await page.frames();
    console.log("Total iFrames in the page are: "+ totalFrames.length);
    await expect(totalFrames.length).toBe(7);

    //approach 1: using frames object using name attribute or url.
    //for this webpage name attribute not available so going with url
    const frame1=await page.frame({url: 'https://ui.vision/demo/webtest/frames/frame_1.html'});
    await frame1.locator("//input[@name='mytext1']").fill("Hi I am Gowtham");
    await page.waitForTimeout(5000);

    //appracho 2: using frameLocator:
    //here name attribute or url wont accept in framelocator.
    //here i am using xpath for the src='frame_1.html'

    const frame2=await page.frameLocator("//frame[@src='frame_1.html']");
    await frame2.locator("//input[@name='mytext1']").fill("Hello I am Gowtham");
    await page.waitForTimeout(5000);

    await page.frameLocator("//frame[@src='frame_1.html']").fill("//input[@name='mytext1']", "Welcome to Playwright");
    await page.waitForTimeout(5000);





});