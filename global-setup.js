import { chromium } from '@playwright/test';
import { LoginPage } from './pages/loginPage.js';
import { testData } from './tests/utils/testData.js';
import { HomePage } from './pages/homePage.js';
import { BasePage } from './pages/basePage.js';
import { writeAllureEnv } from './helpers/allure-env.js';
import { cleanAllureResults } from './helpers/cleanAllureResults.js';


export default async () => {
  cleanAllureResults();
  writeAllureEnv();
  
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const basePage = new BasePage(page);

  await loginPage.gotoLoginPage();

  await homePage.selectHomepageTab('Log in');

  await loginPage.login(testData.validUser.username, testData.validUser.password);

  
  // Critical: wait until login completes
  await loginPage.validateLoginSuccess();

  // Save authenticated session
  await page.context().storageState({
    path: 'auth.json'
  });

  await browser.close();



};
