import { test, expect } from '@playwright/test';

test('Alerts', async ({ page }) => {

    //By default, dialogs are auto-dismissed by Playwright, so you don't have to handle them.
    //howver we still can handle them for some validations aswell.

    //However, you can register a dialog handler before the action that triggers
    //the dialog to either dialog.accept() or dialog.dismiss() it.
    await page.goto('https://testautomationpractice.blogspot.com/');

    //1.Simple Alert

    //dialogue window handler
    //enabling alert handling
    // page.on('dialog', async dialog => { //dialog is a keyword and storing it in dialog variable.
    //     expect(dialog.type()).toContain('alert'); //validating the type of dialog.
    //     expect(dialog.type()).toBe('alert'); //validating the type of dialog.
    //     expect(dialog.message()).toContain('I am an alert box!'); //validating the message in the dialog.
    //     await dialog.accept();
    //})
    //before clicking on the button we have to enable the dialog handler.
    //await page.locator("//button[text()='Simple Alert']").click();

    //2.Confirmation Alert:
    // page.on('dialog', async dialog => { //dialog is a keyword and storing it in dialog variable.
    //     expect(dialog.type()).toContain('confirm'); //validating the type of dialog.
    //     expect(dialog.type()).toBe('confirm'); //validating the type of dialog.
    //     expect(dialog.message()).toContain('Press a button!'); //validating the message in the dialog.
    //     await dialog.accept();
    // });
    // //before clicking on the button we have to enable the dialog handler.
    // await page.locator("//button[text()='Confirmation Alert']").click();

    // await expect(page.locator("//p[@id='demo']")).toHaveText('You pressed OK!');


    //3.Prompt Alert: will have an input box to enter some text.
    page.on('dialog', async dialog => { //dialog is a keyword and storing it in dialog variable.
        expect(dialog.type()).toContain('prompt'); //validating the type of dialog.
        expect(dialog.type()).toBe('prompt'); //validating the type of dialog.
        expect(dialog.message()).toContain('Please enter your name:'); //validating the message in the dialog.

        expect(dialog.defaultValue()).toContain('Harry Potter'); //validating the default value in the input box.
        //Harry potter value is already added in the deafult input value on the prompt web alert.

        await dialog.accept('Gowtham');//need to pass some text to the input box of the prompt alert.
    });
    await page.locator("//button[text()='Prompt Alert']").click();

    await expect(page.locator("//p[@id='demo']")).toHaveText('Hello  Gowtham! How are you today?');
});

