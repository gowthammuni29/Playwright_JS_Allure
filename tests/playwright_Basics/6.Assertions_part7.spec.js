import {test, expect} from '@playwright/test';

test('Assertions',async ({page})=>{
    let url='https://demo.nopcommerce.com/register';
    await page.goto(url);

    //Assertions:
    //1. expect(page).toHaveURL(url) -- page has url
    await expect(page).toHaveURL(url);

    //2. expect(page).toHaveTitle(title) -- page has title
    await expect(page).toHaveTitle('nopCommerce demo store. Register');

    //3. expect(locator).toBeVisible() -- element is visible
    const register= await page.locator('id=register-button');
    await expect(register).toBeVisible();

    //4. expect(Locator).toBeEnabled() -- Control is enabled
    const search=await page.getByPlaceholder('Search store');
    await expect(search).toBeEnabled();

    //5. expect(Locator).toBeChecked() -- Radiobutton/checkbox is toBeChecked
    const newsLetter=await page.getByRole('checkbox', {name: 'Newsletter'});
    await expect(newsLetter).toBeChecked();

    //6. expect(Locator).toHaveAttribute() -- element has attribute
   const registerAttribute=await page.locator('id=register-button');
   await expect(registerAttribute).toHaveAttribute('type','submit');

   // expect(Locator).toEqual() and toContain -- element matches text
   const listHeader=["Computers","Electronics","Apparel","Digital downloads","Books","Jewelry","Gift Cards"]
   const headers=[]
   const topHeaders=await page.$$("//ul[@class='top-menu notmobile']/li/a");
   for(const top of topHeaders){
    const headText=(await top.innerText()).trim();
    headers.push(headText);
   }
   console.log(headers);
   //sort the array in an order and comparing it.
   //if dont want to sort and you want exact we can remove sort.
   await expect(headers.sort()).toEqual(listHeader.sort());

   //if the headers have more elements and you want to see ListHeaders elements are available in headers.
   for(const head of headers){
    //toContain will validate the single eelement is available in list or not.
    await expect(listHeader).toContain(head);
   }

   //7.expect(Locator).toHaveText() -- element matches text
   await expect(page.locator("//div[@class='page-title']/h1")).toHaveText('Register'); //here text should be exact.

   //8.expect(Locator).toContainText() -- element contains text
   await expect(page.locator("//div[@class='page-title']/h1")).toContainText('Regi'); //here text should be exact.

   //9. expect(Locator).toHaveValue(value) -- Input has value
   const nameUpdate=await page.locator('id=FirstName');
   await nameUpdate.fill('gowtham');
   await expect(nameUpdate).toHaveValue('gowtham');

   //10. expect(Locator).toHaveCount(count) -- element count
   //count will give the number of elements in the list.
   const countList=await page.locator("//ul[@class='top-menu notmobile']/li/ul/li/a");
   await expect(countList).toHaveCount(9);

})