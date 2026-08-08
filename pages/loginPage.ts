import { Page } from "@playwright/test";

export class LoginPage {
    private page: Page;

    constructor(page: Page){
        this.page = page;
    }

    //locators are separated here for better readability and maintainability
    signInButton = async () => {
        await this.page.getByRole('link', { name: 'My Account' }).click();
        await this.page.getByRole('link', { name: 'Sign In' }).click();
    }

    CreateAccountButton = async () => {
        await this.page.getByRole('link', { name: 'My Account' }).click();
        await this.page.getByRole('link', { name: 'Create an Account' }).click();
    }


    //functions are added in this section.
    async goToLoginPage() {
        await this.page.goto('https://www.jajuma.de/en');
        //await this.page.pause();
    }

    async signIn(){
        await this.signInButton();
        console.log('[INFO] redirecting to SignIn page...');
    }

    async createAccount(){
        await this.CreateAccountButton();
        console.log('[INFO] redirecting to Create Account page...');
    }

}