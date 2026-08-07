import {test, expect} from '@playwright/test';

test('login to the application', async ({page}) => {
    await page.goto('https://google.com');
})