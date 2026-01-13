import { test, expect } from '@playwright/test';

test('Upload Files', async ({ page }) => {

await page.goto("https://practice.expandtesting.com/upload");

//link: https://playwright.dev/docs/input#upload-files
//Normally browser file upload dialog cannot be automated directly.
//So, we have to set the file to the input element directly.
//we cannot automate window based application. example if we click 
// an upload button, OS file dialog will open, we cannot automate that using playwright.
//So, we have to set the file to the input element directly.
const uploadFile=await page.locator("//input[@id='fileInput']");
await page.waitForTimeout(4000);
//need to use '/' or '\\' double backslash with `` as commas for windows path
await uploadFile.setInputFiles(`C:\\Users\\DELL\\Javascript_Basics\\Playwright_Basics\\tests\\Files_upload\\MTD_1.xlsx`);
await page.waitForTimeout(4000);
await page.locator("//input[@id='fileInput']").click();
await page.waitForTimeout(4000);


// Upload multiple files:
//need to use [] for multiple files thats it.
//await uploadFile.setInputFiles([`path/to/file1`, `path/to/file2`]);

//remove uploaded file:
//await uploadfile.setInputFiles([]); // to clear the file input

});