import { Page } from "@playwright/test";

export class LoginPage {
    private page: Page;

    constructor(page: Page){
        this.page = page;
    }

    //locators are separated here for better readability and maintainability
    signInButton = async (username: string, password: string) => {
        await this.page.getByRole('textbox', { name: 'Username' }).click();
        await this.page.getByRole('textbox', { name: 'Username' }).fill(username);
        await this.page.getByRole('textbox', { name: 'Password' }).click();
        await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
        await this.page.getByRole('button', { name: 'Sign In' }).click();
    }


    // CreateAccountButton = async () => {
    //     await this.page.getByRole('link', { name: 'My Account' }).click();
    //     await this.page.getByRole('link', { name: 'Create an Account' }).click();
    // }

    //functions are added in this section.
    async goToLoginPage() {
        await this.page.goto('https://hr.demo.horilla.com/login/');
        //await this.page.pause();
    }

    async signIn(username: string, password: string){
        await this.signInButton(username, password);
        // Give the application time to navigate
        await this.page.waitForLoadState('networkidle');
        console.log('[INFO] redirecting to SignIn page...');
    }

    // async createAccount(){
    //     await this.CreateAccountButton();
    //     console.log('[INFO] redirecting to Create Account page...');
    // }

}