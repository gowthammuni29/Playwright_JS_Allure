import { test, expect } from '@playwright/test';

//Annotations (tags) in Playwright are special markers that can be added to test cases to provide additional information about the test.
//Tags help in categorizing, filtering, and organizing tests based on their characteristics or requirements.
//By using tags, you can easily run specific subsets of tests, skip certain tests, or group related tests together.



//test.only - it will run only that specific test case.
//we can multiple only test cases in a single file,
//  it will run all the only test cases present in that file.
test.only('test1', async ({ page }) => {
  
    console.log('Test 1 Test Executed');
});

//test.skip - it will skip that specific test case.
//we can multiple skip test cases in a single file,
//  it will skip all the skip test cases present in that file.
test.skip('test2', async ({ page }) => {
    // Test code for sanity test
  
    console.log('Sanity 2 Test Executed');
});

//test.fixme - it will mark that specific test case as to be fixed.
//when we have some issues or bug on the test case and we want to skip that test case temporarily until the issue is fixed,
// we can use test.fixme annotation. it will mark that test case as to be fixed in the test report.
//we can multiple fixme test cases in a single file,
//  it will mark all the fixme test cases present in that file.
test.fixme('test3', async ({ page }) => {
    // Test code for sanity test
  
    console.log('reg 1 Test Executed');
});

test('test 6', async ({page})=>{ 
    test.skip();
    console.log('test 6 skipped');
})

//test.fail - it will mark that specific test case as expected to fail.
//when we have some known issues or bug on the test case and we expect that test case to fail,
// we can use test.fail annotation. it will mark that test case as expected to fail in the test report.
//we can multiple fail test cases in a single file,
//  it will mark all the fail test cases present in that file.
test('test4', async ({ page }) => {
    // Test code for sanity test
    test.fail(); //expected to fail
    console.log('expected to fail Test Executed');
    //expect(1).toBe(1); //in Error it will show as expected to fail, but got passed.
    expect(1).toBe(2); //this will get passed. because expected and actually its failed. so it got passed. its kind of negative type assertion.
});

//test.slow - it will mark that specific test case as slow test.
//when we have some test case which takes more time to execute than usual test cases,
// we can use test.slow annotation. it will mark that test case as slow in the test report.
//test.slow also increases the default timeout for that specific test case to 3 times.
//in normal test case default timeout is 30 seconds, but for slow test case it will be 90 seconds.
//in config.properties we can change the default timeout also. like this: "timeout": 1000, 1sec.
//if the browser take 3 secs to load the page, then we can use test.slow to avoid timeout error.
test('test5', async ({ page }) => {
    // Test code for sanity test
  
    console.log('reg 2 Test Executed');
});