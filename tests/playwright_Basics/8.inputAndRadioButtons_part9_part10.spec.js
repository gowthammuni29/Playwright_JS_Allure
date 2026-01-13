import { test , expect } from "@playwright/test";

test('Input Buttons',async ({page}) =>{

    const firstName="//input[@placeholder='Enter Name']"
    await page.goto('https://testautomationpractice.blogspot.com/');

    //INPUT BOX
    //input - Assertions validation before fill.
    await expect(await page.locator(firstName)).toBeVisible();
    await expect(await page.locator(firstName)).toBeEnabled();
    await expect(page.locator(firstName)).toBeEmpty();
    await expect(page.locator(firstName)).toBeEditable();

    await page.fill(firstName,'Gowtham');

    await page.waitForTimeout(5000); //pausing the code

    // //RADIO BUTTON:
    // //NORMAL CODE
    const radioButton = "//input[@id='male']"
    await page.locator(radioButton).check();
    await page.check(radioButton);
    await expect(page.locator(radioButton)).toBeChecked();
    await expect(page.locator(radioButton).isChecked()).toBeTruthy();
    // //----------------------------------------
    // //RADIO BUTTON WITH ASSERTIONS:
    const radioButtonMale = page.locator("//input[@id='male']");
    const radioButtonFemale = page.locator("//input[@id='female']");
    await radioButtonMale.check();
    await expect(radioButtonMale).toBeChecked();
    //positive validation. checking the radio should be checked.
    await expect(radioButtonMale.isChecked()).toBeTruthy();
    //negative validation. checking the female button is not checked.
    await expect(await radioButtonFemale.isChecked()).toBeFalsy();
    // //----------------------------------------------------------------
    // //CHECKBOXES WITH ASSERTIONS: 
    // //radio button and checkboxes we use .check() for selecting the button or checkbox.
    // //in checkboxes we can select multiple checkboxes.

    // //selecting single check box.
    const singleCheckBox = page.locator("//input[@id='sunday']");
    const singleCheckBox2= page.locator("//input[@id='monday']");
    await singleCheckBox.check();
    //Assertion
    await expect(singleCheckBox).toBeChecked();
    await expect(singleCheckBox.isChecked()).toBeTruthy();
    //verifying the check box is not checked.
    await expect(await singleCheckBox2.isChecked()).toBeFalsy();

    // selecting Multiple check boxes.
    // first we need to locate all the checkboxes in a small array.
    
    const multipleCheckBoxes =await page.locator( "//div/input[@type='checkbox']");
    // await multipleCheckBoxes.nth(0).check(); //sunday
    // await multipleCheckBoxes.nth(2).check(); //tuesday
    // await page.waitForTimeout(10000);

    // //Assertions
    // await expect(multipleCheckBoxes.nth(0)).toBeChecked();
    // await expect(multipleCheckBoxes.nth(2).isChecked()).toBeTruthy();
    
    const indicesToCheck=[1,3,4]; //monday, wednesday, thursday
    for(const i of indicesToCheck){
        await multipleCheckBoxes.nth(i).check();
    }
    //Assertions for the above selected checkboxes.
    for(const i of indicesToCheck){
        await expect(multipleCheckBoxes.nth(i)).toBeChecked();
        await expect(multipleCheckBoxes.nth(i).isChecked()).toBeTruthy();
    }
   //Assertions for other boxes are not checked. 
   const totalCheckBoxes = await multipleCheckBoxes.count();
   for(let i=0;i<=totalCheckBoxes; i++){
    if(!indicesToCheck.includes(i)){
    // await expect(multipleCheckBoxes.nth(i)).toBeChecked();
    await expect(await multipleCheckBoxes.nth(i).isChecked()).toBeFalsy();
    }
   }
   // nth() - to select element based on index number.
   
   //now need to unselect the checkboxes which are checked.
   for (const i of indicesToCheck){
    await multipleCheckBoxes.nth(i).uncheck();
    await expect(multipleCheckBoxes.nth(i).isChecked()).toBeFalsy();
   }
    await page.waitForTimeout(5000);
});