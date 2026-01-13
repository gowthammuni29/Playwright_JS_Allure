/**
 * @typedef {import('@playwright/test').Locator} Locator
 */
/** @typedef {import('@playwright/test').Page} Page */
import { expect } from '@playwright/test';
import logger from '../helpers/logger.js';
import path from 'path';

export class BasePage {
    /**
   * @param {Page} page
   */
  
  constructor(page) {
     /** @type {Page} */
     if (!page) {
      throw new Error('Page instance is required for BasePage');
    }
      this.page = page;
      logger.info('BasePage Initialized');
  }


  /* ==========================
     NAVIGATION METHODS
     ========================== */
  /**
   * @param {String} url
   */
  async navigate(url) {
    logger.info(`Navigate to URL: ${url}`);
    await this.page.goto(url);
  }

  /**
   * @param {String} value
   */
  async navigateUrlContains(value){
    logger.info(`Waiting for URL to contain: ${value}`);
    await expect(this.page).toHaveURL(new RegExp(value));
  }

  async getPageTitle() {
    logger.info('Getting Page Title');
    return await this.page.title();
  }

  /* ==========================
     ACTION METHODS
     ========================== */
  /**
   * @param {Locator} locator
   */
  async click(locator,stepName='Click Element') {
    try{
      logger.info(`ACTION -> CLICKING: ${stepName}`);
      await expect(locator).toBeVisible();
      await expect(locator).toBeEnabled();
      await locator.click();
    }catch(error){
      logger.error(`ERROR: ${stepName}`);
      await this.captureScreenshot('Click Failed');
      throw error;
    }
    
  }

  /**
   * @param {Locator} locator
   * @param {string} text
   */
  async fill(locator, text, stepName='Fill Input') {
    try{
      logger.info(`ACTION -> FILL : ${stepName} --> ${text}`);
      await expect(locator).toBeVisible();
      await locator.fill(text);
      logger.info(`SUCCESS: ${stepName}`);
    }catch(error){
      logger.error(`FAILED: ${stepName}`, error);
      await this.captureScreenshot('fill-failed');
      throw error;
    }
    
  }

  /**
   * @param {Locator} locator
   */
  async hover(locator, stepName= 'Hover Element'){
    try{logger.info(`ACTION -> HOVER: ${stepName}`);
    await expect(locator).toBeVisible();
    await locator.hover();
    logger.info(`SUCCESS: ${stepName}`);
    }catch(error){
      logger.error(`FAILED: ${stepName}`, error);
      throw error;
    }
  }

  /**
   * @param {Locator} locator
   */
  async clear(locator, stepName='Clear Input') {
    try{
      logger.info(`ACTION -> CLEAR: ${stepName}`);
      await expect(locator).toBeVisible();
      await locator.fill('');
    }catch(error){
      logger.error(`FAILED: ${stepName}`, error);
      throw error;
    }
    
  }


  

  
  

  /* ==========================
     DROPDOWNS /PAGINATION
     ========================== */
 
  /**
   * @param {Locator} locator
   * @param {string} tabName
   */
  //single page locators
  async selectTextInList(locator,tabName){
    logger.info(`SELECT : ${tabName} `)
    const item=locator.filter({hasText: tabName });
    await item.waitFor({ state: 'visible' });
    const count=await item.count(); 
    if(count==0){
      throw new Error(` Text "${tabName}" not found in list`);
    }
    await item.click();
    logger.info(`Selected Name: ${tabName}`);

  }

  
  

  /**
   * Click an item across pagination pages
   *
   * @param {Locator} locator - locator matching all items on a page
   * @param {string} textToSelect - visible text of the item to click
   * @param {Locator} nextButtonLocator - locator for "Next" pagination button
   */
  async clickItemAcrossPages(locator, nextButtonLocator,textToSelect) {
    logger.info(`Searching for item across pages: ${textToSelect}`);
    // Initial wait (VERY IMPORTANT)
    await expect(locator.first()).toBeVisible({ timeout: 15000 });
    while(true){
      
      const textSelected=locator.filter({hasText:textToSelect});

      if(await textSelected.count()>0){
        await textSelected.first().click();
        logger.info(`Item clicked: ${textToSelect}`);
        return;
      }
      if (!(await nextButtonLocator.isVisible()) || !(await nextButtonLocator.isEnabled())) {
        throw new Error(`Item "${textToSelect}" not found across pages`);
      }
      const firstItemTextBefore = await locator.first().textContent();
      
      await nextButtonLocator.click();
      logger.info('Navigating to next page');
      //WAIT FOR UI CHANGE,
      await expect(locator.first()).not.toHaveText(firstItemTextBefore, {
      timeout: 15000
      });
    
    }

    }

   /* ==========================
     UTILITIES
     ========================== */  

    /**
   * @param {Locator} locator
   * @param {string} tabName
   */
  async getTextInList(locator,tabName){
    const selectedTab=locator.filter({hasText:tabName}).first();
    return await selectedTab.textContent();

  }

  /**
   * @param {Locator} locator
   */
  async getText(locator) {
    logger.info("Getting text from the element");
    return await locator.getText();
  }
  /**
   * @param {Locator} locator
   */
  async isVisible(locator) {
    logger.info("Element is Visible");
    return await locator.isVisible();
  }

  /**
   * @param {Locator} locator
   */
  async isEnabled(locator) {
    logger.info("Element is enabled");
    return await locator.isEnabled();
  }



  /* ---------- ASSERTION HELPERS ---------- */

  

  /**
   * Assert element is visible
   * @param {Locator} locator
   */
  async expectVisible(locator) {
    await expect(locator).toBeVisible({timeout: 5000});
  }

  /**
   * Assert element contains text
   * @param {Locator} locator
   * @param {string} text
   */
  async expectText(locator, text) {
    await expect(locator).toContainText(text);
  }

   /**
   * @param {Locator} locator
   * @param {string} tabName
   */
  async expectTextInList(locator,tabName){
    await this.waitForVisible(locator);
    const selectedTab=locator.filter({hasText:tabName}).first();;
    const selectedInnerText=await selectedTab.textContent();
    await expect(selectedInnerText).toContain(tabName);

  };
  


  /**
   * Assert element count
   * @param {Locator} locator
   * @param {number} count
   */
  async expectCount(locator, count) {
    await expect(locator).toHaveCount(count);
  }

  /**
   * Assert element is enabled
   * @param {Locator} locator
   */
  async expectEnabled(locator) {
    await expect(locator).toBeEnabled();
  }

  /**
   * Assert element is hidden
   * @param {Locator} locator
   */
  async expectHidden(locator) {
    await expect(locator).toBeHidden();
  }

  
  /* ==========================
     ALERT / DIALOG HANDLING
     ========================== */
  /**
   * Handle and assert alert dialog
   * @param {string} expectedMessage
   */
  async handleAlert(expectedMessage) {
    this.page.once('dialog', async dialog => {
      logger.info(`Alert message: ${dialog.message()}`);
      if (expectedMessage) {
        expect(dialog.message()).toContain(expectedMessage);
      }
      await dialog.accept();
    });
  }


/* ==========================
     SCREENSHOT & DEBUG
     ========================== */

  async captureScreenshot(name) {
    const path = `screenshots/${name}-${Date.now()}.png`;
    await this.page.screenshot({ path, fullPage: true });
    logger.info(` Screenshot captured: ${path}`);
  }

  async logCurrentURL() {
    logger.info(`Current URL: ${this.page.url()}`);
  }

/* ==========================
     WAIT METHODS
     ========================== */


  /**
   * @param {Locator} locator
   */   
  async waitForVisible(locator, timeout = 4000) {
    await expect(locator).toBeVisible({ timeout });
  }

  /**
   * @param {Locator} locator
   */  
  async waitForHidden(locator, timeout = 30000) {
    await expect(locator).toBeHidden({ timeout });
  }

  /**
   * @param {Locator} locator
   */  
  async waitForEnabled(locator) {
    await expect(locator).toBeEnabled();
  }


   /**
   * @param {Locator} locator
   */
  //this wait is very important after selecting some category. its needs some wait to reload with new selected category.  
  async waitForItemsToLoad(itemsLocator) {
    logger.info('Waiting for items to load after category selection');

  // Wait until at least one item is visible
    await expect(itemsLocator.first()).toBeVisible({ timeout: 15000 });

  // Ensure text is not empty (API completed)
    await expect(itemsLocator.first()).not.toHaveText('', {
    timeout: 15000
  });
}

}