import { test , expect } from "@playwright/test";

test('DropDwons',async ({page}) =>{

    await page.goto('https://testautomationpractice.blogspot.com/');

    //Multi-Select Drop Down
    //select multiple options from the drop down.
    const multiSelect= "//select[@id='colors']";
    const multiSelectOptions= "//select[@id='colors']/option";
    const expectedOptions = ['Red','Yellow','Green'];
    const multiSelect1= page.locator(multiSelect);
    




    await page.locator(multiSelect).selectOption(expectedOptions); //using value attribute values in the array.
    await page.waitForTimeout(5000);

    //Assertions:
    //.1.check no of options in the drop down.
    await expect(page.locator(multiSelectOptions)).toHaveCount(7);

    //2.checking number of options using JS Array.
    const arrayOptions= await page.$$(multiSelectOptions);
    await expect(arrayOptions.length).toBe(7);

    //3.check the presense of value in the drop down.
    //.includes() method will check only the single value exist in string or array. 
    const contents=await page.locator(multiSelect).textContent();
    await expect(contents.includes('Red')).toBeTruthy();
    //if you want to validate the multiple values need to use the loop for it.
    
    // 3. check the presence of expected labels among all option texts
    // const allTexts=(await page.locator(multiSelectOptions).allTextContents()).map(t => t.trim())
    // for(const expected of expectedOptions){
    //     expect(allTexts).toContain(expected);
    // }

    await page.locator(multiSelect).selectOption(expectedOptions); //using value attribute values in the array.
    await page.waitForTimeout(5000);

    //Assertion:
    //option:checked css selector will give all the selected options in the drop down. 
    //we can use tag option with :checked ex: option:checked when we want to get all the selected options from the drop down for Assertion.
    const selectedOptions=(await multiSelect1.locator('option:checked').allTextContents()).map(t =>t.trim());
    expect(selectedOptions.sort()).toEqual(expectedOptions.sort()); //using sort() method to sort the array.
    

    //Multi-select:4.  change selection and assert updated checked options
    await page.locator(multiSelect).selectOption([{label: 'Green'}, {label: 'Yellow'}]); //using label to select options.
    await page.waitForTimeout(5000);

    //Assertion:

    //option:checked css selector will give all the selected options in the drop down. 
    //we can use option:checked when we want to get all the selected options from the drop down for Assertion.
   const checkedFirst=(await multiSelect1.locator('option:checked').allTextContents()).map(t => t.trim());
   console.log(checkedFirst.sort());
    expect(checkedFirst.sort()).toEqual(['Green','Yellow']);

    //change selection to a different subset
    await page.locator(multiSelect).selectOption([{label: 'Blue'}]);
    await page.waitForTimeout(5000);

    //Assertion:
    const checkedSecond=(await multiSelect1.locator('option:checked').allTextContents()).map(t => t.trim());
    expect(checkedSecond).toEqual(['Blue']);
});