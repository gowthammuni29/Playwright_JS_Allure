import { test, expect } from '@playwright/test';

test('Keyboard Press', async ({ page }) => {

await page.goto("https://gotranscript.com/text-compare");

const word=await page.locator("//textarea[@name='text1']");
await word.fill("Hello World");
await page.keyboard.press("Control+A");
await page.waitForTimeout(4000);
await page.keyboard.press("Control+C");
await page.waitForTimeout(4000);
await page.keyboard.press("Tab");
await page.waitForTimeout(4000);
await page.keyboard.press("Control+V");
await page.waitForTimeout(4000);


});