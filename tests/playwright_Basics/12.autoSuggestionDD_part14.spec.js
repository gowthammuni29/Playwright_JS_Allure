import { test , expect } from "@playwright/test";

test('Auto Suggestion Dropdown', async ({page}) =>{

    await page.goto('https://www.amazon.in/');
    const searchBox= "//input[@id='twotabsearchtextbox']";

    const autoSuggestList= "//div[@class='autocomplete-results-container']/div/div/div";

    
    await page.click(searchBox);
    await page.fill(searchBox,'iphone 16');
    await page.waitForTimeout(5000);

    const autoSuggestItems =await page.locator(autoSuggestList).all();
    await expect((await autoSuggestItems).length).toBe(10);

    //if we want use textContent() we cannot use map() function as textContent returns a string not an array.
    //we can use allTextContents() method which returns an array of strings.
    for(const item of autoSuggestItems){
        const autoText = (await item.allTextContents()).map(t=> t.trim());
        console.log(autoText);
        if(autoText.includes('iphone 16 pro 128+gb')){
            await item.click();
            break;
        }
    }

    await page.waitForTimeout(5000);

    //Assertion: verify the search results page contains the searched text.
    const searchResultText= await page.locator("//span[@class='a-color-state a-text-bold']").textContent();
    console.log(searchResultText);
    await expect(searchResultText.includes('iphone 16 pro 128+gb')).toBeTruthy();
    










});