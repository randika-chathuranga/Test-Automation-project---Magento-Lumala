import {test, expect} from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

test('login to the application', async ({page}) => {
    const loginPage = new LoginPage(page);

    await loginPage.goToLoginPage();
    await loginPage.signIn();
});


test('create an new account', async ({page})=>{
    const loginPage = new LoginPage(page);

    await loginPage.goToLoginPage();
    await loginPage.createAccount();
})