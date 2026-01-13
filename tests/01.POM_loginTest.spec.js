import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';
import { HomePage } from '../pages/homePage.js';
import { BasePage } from '../pages/basePage.js';
import {testData} from '../tests/utils/testData.js'; //importing the test data from the utils folder


/** @type {import('../pages/loginPage.js').LoginPage} */ //why use @type here?
let loginpage;
//because we are defining the type of login variable here.
//this will help us to use the methods of LoginPage class in the test function.
 //we can use this login variable in other functions as well.

/** @type {import('../pages/homePage.js').HomePage} */
let homePage; //we can use this homePage variable in other functions as well.

/** @type {import('../pages/basePage.js').BasePage} */
let basePage; //we can use this homePage variable in other functions as well.



test.describe('Login Validations', () => {
    //test.describe --> Tests can run in parallel (default Playwright behavior).
    //Tests may run at the same time , Each test gets its own page & context ,Tests are independent
    //test.describe.serial --> Groups related tests and forces them
    //  to run one after another in sequence, using the same worker.
    //Use when :
    //Tests share state (login once)
    //Using beforeAll / afterAll for UI actions
    //Order of execution matters

    

    test.beforeEach(async ({ page }) =>{
        loginpage = new LoginPage(page);
        homePage = new HomePage(page);
        basePage = new BasePage(page);
        await test.step('Step 1: Navigate to login page', async()=>{
            await loginpage.gotoLoginPage();
        });
        await test.step('Step 2: Click on login link', async()=>{
            await homePage.selectHomepageTab('Log in');//clicking the login link
        });
         

    });

    test.afterEach(async({page})=>{
        await test.step('Log out', async()=>{
            await homePage.selectHomepageTab('Log out'); });
    });

    test('TC_LOGIN_001 - login with valid credentials',async()=>{
        await test.step('Step 3: validate Login username, password & login button are visible',async()=>{
            await loginpage.validateLoginPopupUI();
       });
        await test.step('Step 4: Login with valid credentials',async()=>{
            await loginpage.login(testData.validUser.username, testData.validUser.password);  
        });
        
        
        await test.step('Step 5: validate login success',async()=>{
           await loginpage.validateLoginSuccess(); 
        });
        
    });

    test('TC_LOGIN_003 - login with invalid credentials(Negative)',async()=>{

        await test.step('Step 3: Login with Invalid credentials',async()=>{
            await loginpage.login(testData.invalidUser.username,testData.invalidUser.password);
        });
        await test.step('Step 4: validate login failure with wrong password',async()=>{
            await loginpage.acceptAlertWithMessage('Wrong password.');
        });
        await loginpage.login(testData.validUser.username, testData.validUser.password);
            await basePage.wait(5);    
    });



    });











