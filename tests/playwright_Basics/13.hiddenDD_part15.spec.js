import { test, expect } from '@playwright/test';

test('Hidden Dropdown', async ({ page }) => {

  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'PIM' }).click();
  await page.click("//div[@class='oxd-grid-4 orangehrm-full-width-grid']//div[6]//i[@class='oxd-icon bi-caret-down-fill oxd-select-text--arrow']");



  const hiddenDropDown ="//div[contains(@class, 'oxd-select-dropdown')]//span";
  await page.waitForSelector(hiddenDropDown, {state:'visible'});
  
  const dropdownOptions= await page.locator(hiddenDropDown).all();
  for (const options of dropdownOptions){
   const optionText=await options.textContent();
   if(optionText.includes('automation tester')){
    await options.click();
    break;
   }
  }

  


});