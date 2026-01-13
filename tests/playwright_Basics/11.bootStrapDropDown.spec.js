import { test , expect } from "@playwright/test";

test('Boot Strap DropDown',async ({page}) =>{

    await page.goto('https://www.jqueryscript.net/demo/Drop-Down-Combo-Tree/');
    await page.click("//div[@class='comboTreeInputWrapper']/input[@id='justAnInputBox']");

    //const options=await page.$$("//div[@id='comboTree293419DropDownContainer']/ul/li");
    //await expect(options.lenghth).toBe(7); //assertion to check number of options in the drop down.
    //important note: if you are using locator instead of $$ then you need to use .all() method to get all the elements in the array.
    const options1="//div/div[@class='comboTreeInputWrapper']/input[@id='justAnInputBox']/parent::div/following-sibling::div/ul/li";
    
    //Assertion to check number of options in the drop down.
    await expect.soft(page.locator(options1)).toHaveCount(7);

    //using .all() method to get all the elements in the array.
    const allOptions=await page.locator(options1).all();
    for(const option of allOptions){
       const optionText=await option.textContent();
       console.log(optionText);
       if(optionText.includes('choice 3')|| optionText.includes('choice 4')|| optionText.includes('choice 5')){
        await page.waitForTimeout(3000);
        await option.click();

       }
    }

    const expectedOptions=['choice 3','choice 4','choice 5'];
    const expectedOptions1=['choice 1','choice 7'];
    //Assertion: to check the selected options in the drop down.
    for (const option of allOptions) {
        const optionText = (await option.textContent()).trim();

  // Get the checkbox inside each li element to input box so that it can be verified.
        const checkbox= await option.locator("xpath=./span/input[@type='checkbox']");
        const isChecked = await checkbox.isChecked(); // works if option is an <input type="checkbox">

        if (expectedOptions.includes(optionText)) {
            expect(isChecked, `${optionText} should be selected`).toBeTruthy();
    }   else {
            expect(isChecked, `${optionText} should NOT be selected`).toBeFalsy();
  }
}
    //using filter() method to filter the options and check the checkboxes are selected.
    const optionsLocator= page.locator(options1);
    for(const expectedOption of expectedOptions){
        await expect(optionsLocator.filter({hasText:expectedOption }).locator("xpath=./span/input[@type='checkbox']")).toBeChecked();
    }

    //using filter() method validating other check boxes are not selected.
    const notSelected= page.locator(options1);
    for(const notSelect of expectedOptions1){
        await expect(notSelected.filter({hasText: notSelect }).locator("xpath=./span/input[@type='checkbox']")).not.toBeChecked();
    }

});