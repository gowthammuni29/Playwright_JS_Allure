import { test, expect } from '@playwright/test';

test('Nested Frames', async ({ page }) => {

    await page.goto('https://ui.vision/demo/webtest/frames/');

    //total frames in the page
    const totalFrames= await page.frames();
    console.log("Total iFrames in the page are: "+ totalFrames.length);
    await expect(totalFrames.length).toBe(7);

    //In the page we have five frames and one of the frame have nested frames
    //I am trying to provide input value on the input box for the 5 frames.
    for(let i=1;i<=5;i++){

        const eachFrames=await page.frame({url:`https://ui.vision/demo/webtest/frames/frame_${i}.html`});
        const frameInput=await eachFrames.locator(`//input[@name='mytext${i}']`);
        const inputVal= `Hello I am Gowtham from frame ${i}`;
        const inputValues=await frameInput.fill(inputVal);
        console.log(`Input value for the frame ${i} is ${inputVal}`);
        await page.waitForTimeout(3000);
        if(eachFrames===page.frame({url:'https://ui.vision/demo/webtest/frames/frame_3.html'})){
            
            //handling nested frames inside frame 3: 
            //for nested frames we need to use childframes() method.
            // it will give the array of all nested frames inside the parent frame.
            //here only one nested frame is there inside frame 3.
            //so we used childFrames[0] to get the first nested frame.
            const childFrame3=await eachFrames.childFrames();
            console.log("Total nested frames inside frame 3 are: "+ childFrame3.length);
            const cc= await childFrame3[0].locator("(//div[@class='vd3tt'])[1]");
            await cc.click();
            await expect(cc).toBeChecked();
            console.log("Checkbox inside nested frame is clicked successfully");
            await page.waitForTimeout(3000);

    }}




});