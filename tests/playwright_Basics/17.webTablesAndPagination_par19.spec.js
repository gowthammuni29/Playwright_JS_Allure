import { test, expect } from '@playwright/test';

test('Nested Frames', async ({ page }) => {

    await page.goto('https://testautomationpractice.blogspot.com/');

    //no of columns:
    const sample=await page.locator("//table[@id='productTable']/thead/tr/th");
    const texts= await sample.allTextContents();
    console.log(texts);
    expect.soft(texts.length).toBe(4);

    //rows:
    const rows=await page.locator("//table[@id='productTable']/tbody/tr");
    console.log("no of rows:"+await rows.count());


    //Regular way to select particular webtable row:
    const rows1=await page.locator("//table[@id='productTable']/tbody/tr").all();
    for(const row of rows1){
       const rowText=await row.textContent();
       console.log(rowText);
       if(rowText.includes("Smartphone") || rowText.includes("$10.99")){
         await row.locator("//input[@type='checkbox']").check();
         //Assertion
         expect(row.locator("//input[@type='checkbox']")).toBeChecked();
         console.log("Checkbox for the row with Smartphone is checked");
       }
    }
    //await page.waitForTimeout(3000);
    
    //using filter() method :
    //we cannot use .all() array for the filter() method directly.
    //.all() returns the array of elements and also promise. 
    //when it comes to promises The filter() method doesn't work properly with async/await because
    //  it doesn't wait for the promises to resolve.
    //simple when you want to use filter in locators dont use .all() method. 
    // because it wont retunr has,hastext & hasnottext methods.
    //always use the locator directly when you want to use filter method.
    // const matchedRows=rows.filter({
    //   has: page.locator('td'), //it filters rows that have td element
    //   hasText: "Smartphone" //from the td elements it filters rows that contain the text 'Smartphone'
    // })

    // matchedRows.locator("//input[@type='checkbox']").check();
    // //Assertion
    // expect(matchedRows.locator("//input[@type='checkbox']")).toBeChecked();
    // console.log("Checkbox for the row with Smartphone is checked using filter method");
    // await page.waitForTimeout(3000);

    //3.more functional way: using promise.all() with map() method:
    //promise.all was used for parallel execution of promises.
    //sequential execution like for loop will take more time to execute.
    //Sequential: If each row takes 100ms to process, and you have 10 rows, it would take about 1000ms
    //Parallel: With Promise.all(), it would take roughly 100ms (plus a small overhead)
    //exceptions: if any of the promises reject, the entire Promise.all() rejects.
    //without promise.all also we can run with map() method but it will be less effiient.
    //Using map() with Promise.all() = operations run in parallel AND you can wait for completion with await.

//     await Promise.all(rows1.map(async row => {
//     const rowText = await row.textContent();
//     if (rowText.includes("Smartphone") || rowText.includes("$10.99")) {
//         await row.locator("//input[@type='checkbox']").check();
//         expect(row.locator("//input[@type='checkbox']")).toBeChecked();
//     }
    
// }))


//using function: it will make the code resuable. 




//   async function selectCheckBoxes(Name, price) {
    
//     await Promise.all(rows1.map(async row => {
//     const rowText = await row.textContent();
//     if (rowText.includes(Name) || rowText.includes(price)) {
//         await row.locator("//input[@type='checkbox']").check();
//         expect(row.locator("//input[@type='checkbox']")).toBeChecked();
//     }
    
// }))

    
//   }
//   await selectCheckBoxes("Smartphone", "$10.99");
//   await page.waitForTimeout(3000);
//   await selectCheckBoxes("Smartwatch", "$7.99");
//   await page.waitForTimeout(3000);





//pagination selecting product from multiple pages.


// async function selectPaginationCheckBoxes(Name,price) {
  
//   const pages1=await page.locator("//ul[@id='pagination']/li/a").all();//no of pages
//   //iterate thrugh each pages:
//   for(let j=0; j<await pages1.length; j++){

//     //click the page button:
//     if(j>0){
//       await page.waitForTimeout(2000);
//       //await pages1.nth(j).click();
//       await pages1[j].click();
//     }

//     await Promise.all(rows1.map(async row => {
//     const rowText = await row.textContent();
//     if (rowText.includes(Name) || rowText.includes(price)) {
//         await page.waitForTimeout(3000);
//         await row.locator("//input[@type='checkbox']").check();
//         await page.waitForTimeout(3000);
//         expect(row.locator("//input[@type='checkbox']")).toBeChecked();
//     }
    
//     }));
//     //clicking the next page button
    

  
    
//   }
// }

// await selectPaginationCheckBoxes("Digital Camera","$16.99");
// await page.waitForTimeout(3000);

});
