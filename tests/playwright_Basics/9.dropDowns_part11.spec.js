import { test , expect } from "@playwright/test";

test('DropDwons',async ({page}) =>{

    await page.goto('https://testautomationpractice.blogspot.com/');

    //multiple ways to select from drop down.
    //1. using selectOption()

    const dropDownSelectOption = "//select[@id='country']";
    await page.locator(dropDownSelectOption).selectOption({label:'India'}); //label /visible text. 
    await page.locator(dropDownSelectOption).selectOption('India');// visible text
    await page.locator(dropDownSelectOption).selectOption({value: 'india'}); //value attribute value is india 
    // but on visible text its India
      await page.locator(dropDownSelectOption).selectOption({index:4}); // using index. index starts from 0
     //Always preper to use label or visible text.

     await page.selectOption(dropDownSelectOption,'India'); //using visible text
     await page.waitForTimeout(5000);

    //Assertions :
    //1.check number of options in the drop down. - using toHaveCount() - Approach 1:
    const dropDownOptions = "//select[@id='country']/option";
     await expect(await page.locator(dropDownOptions)).toHaveCount(10); //10 options in the drop down.

    //2. Approach 2: get all the options in an array and check the length of the array.
     //$$ using $$ will return elements in an array.
     await expect.soft((await page.$$(dropDownOptions)).length).toBe(10);

     //check presence of value/options in the drop down. - Approach 1: direct approach
     const content =await page.locator(dropDownSelectOption).textContent();
     await expect(content.includes('India')).toBeTruthy();

     //Approach 2: get all the options in an array and iterate using for of loop.
     //sometimes select tag wont be available example for bootstraps elements at that time
     //  we can use this approach mostly.
     const allOptions = await page.$$(dropDownOptions);
     let status=false;
     for(const option of allOptions){
         const optionText= await option.textContent();
         if(optionText.includes('India')){
             console.log("Option is present in the drop down");
             status=true;
             break;
     }
 }
     await expect(status).toBeTruthy();

    //using loop to select a value from the drop down.
    const allOption = await page.$$(dropDownOptions);
    for(const option of allOption){
        let optionText= await option.textContent();
        if(optionText.includes('India')){
            console.log("Option is present in the drop down");
            const optionValue=await option.getAttribute('value');
            await page.selectOption(dropDownSelectOption,optionValue);
            break;
    }
}
    
    await page.waitForTimeout(5000);
});