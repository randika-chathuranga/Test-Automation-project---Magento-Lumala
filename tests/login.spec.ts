import {test, expect} from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import ENV from '../utils/env';

const clientTestData = JSON.parse(JSON.stringify(require("../testData/"+ENV.ENV+".json")));


test('login to the application', async ({page}) => {
    const loginPage = new LoginPage(page);

    await loginPage.goToLoginPage();
    await loginPage.signIn(ENV.UN, ENV.PW);
    await expect(page).toHaveURL(new RegExp(clientTestData.urlSubstrings.loginSuccessPage), { timeout: 15000 });
});


test('create an new account', async ({page})=>{
    const loginPage = new LoginPage(page);

    await loginPage.goToLoginPage();
    await loginPage.createAccount();
})