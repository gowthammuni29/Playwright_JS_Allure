//const {test, expect}=require('@playwright/test')
//we can write in other way
import {test, expect} from '@playwright/test'

test('BuildInLocators',async ({page})=>{

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    //----------------------------------------------------------------------------------
    //page.getByAllText() 
    // -- to locate an element,usually image, by its text alternative.
    //In the DOM if we see alt attribute we can directly use this locator.
    //mostly alt will be on images.
    const imagePath=await page.getByAltText('company-branding');
    await expect(imagePath).toBeVisible();
    //----------------------------------------------------------------------------------
    //page.getByPlaceholder()
    //this attribute mostly available in the input boxes.
    //attribute name will be placeholder
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    //----------------------------------------------------------------------------------
    //page.getByRole():
    //to locate the explicit and implicit accessibility attributes.
    //basically getByRole() is not an attribute on DOM. its like the role of the elements which
    //it performs. basically like button, link, checkbox, etc.
    //we can use this locator to locate the elements by their role.
    //first need to tag name then comma post {}within that need to pass any attribute colon with value.
    await page.getByRole('button',{type : 'submit'}).click();
    //---------------------------------------------------------------------------------
    //page.getByText()
    //to locate the element by its text.

   const pim= await page.getByText('PIM');
   await expect(pim).toBeVisible();
   await pim.click();

    const empI=await page.getByText('Employee Information');
    await expect(empI).toBeVisible();
    const empDetail=[]
    const employeeInformation=await page.$$("//div/div/div/div/div//div[@class='oxd-input-group__label-wrapper']/label");
    for(const emp of employeeInformation){
        //const empData=await emp.innerText();
        //empDetail.push(empData);
        empDetail.push(await emp.innerText());
    }
    console.log(empDetail);
    await expect(empDetail).toHaveLength(7);
    //---------------------------------------------------------------------------------
    //page.getByLabel():
    //to locate the element by its label attribute or tag.
    //In DOM the attribute <label> password<input tpe='password' is rare to find. only it will have tag name. 
    //if label comes under tag name we need to use normal locators finding.
    //only with label attribute we can use this getByLabel() locator.
    //----------------------------------------------------------------------------------
    //page.getByTitle():
    //to locate the element by its title attribute.
    //example: <span title="issues count"> 25 issues</span>
    //await expect(page.getByTitle('issues count')).toHaveText('25 issues');
    //----------------------------------------------------------
    //page.getByTestId():
    //to locate the element by its data-testid attribute.
    //example: <button data-testid="login-button">Login</button>
    //await page.getByTestId('login-button').click();
})