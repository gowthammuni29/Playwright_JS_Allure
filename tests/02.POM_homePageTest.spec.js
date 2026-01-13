import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';
import { HomePage } from '../pages/homePage.js';
import { BasePage } from '../pages/basePage.js';


/** @type {import('../pages/loginPage.js').LoginPage} */ //why use @type here?
//because we are defining the type of login variable here.
//this will help us to use the methods of LoginPage class in the test function.
let login; //we can use this login variable in other functions as well.

/** @type {import('../pages/homePage.js').HomePage} */
let homePage; //we can use this homePage variable in other functions as well.

/** @type {import('../pages/basePage.js').BasePage} */
let basePage; //we can use this homePage variable in other functions as well.

test.describe('Home Page Module', ()=>{

    test.beforeEach(async({page})=>{
        login= new LoginPage(page);
        homePage=new HomePage(page);
        basePage= new BasePage(page);
        await homePage.openHomePage();
    });

    test('TC_HOMEPAGE_001 - select Categories tab',
        { tag: ['@sanity'],
          annotation: [
            {type: 'suite', description: 'Home Page' },
            { type: 'severity', description: 'low' }
          ]  
         }, async () =>{

        await test.step('Step 1:select the category device', async()=>{   
        await homePage.selectCateogry('Laptops');
        });
        
        
    });

    test('TC_HOMEPAGE_002 - select device',
        { tag: ['@regression'],
          annotation: [
            {type: 'suite', description: 'Home Page' },
            { type: 'severity', description: 'normal' }
          ]  
         },async () =>{   
        await test.step('Step 1:select the category device', async()=>{
        await homePage.selectCateogry('Phones');
        });
        await test.step('Step 2:select the Device', async()=>{
        await homePage.selectDevice('Iphone 6 32gb');
        });   
        
    });
});