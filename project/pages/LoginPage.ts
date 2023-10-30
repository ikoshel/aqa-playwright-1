import {expect, Page} from "@playwright/test";
import {BasePage} from "../BasePage";

export class LoginPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    public async signIn(email: string, password: string, rememberMe: boolean = true) {
        await this.clickSignInButton();
        await this.fillEmail(email);
        await this.fillPassword(password);
        if (rememberMe) {
            await this.clickRememberMeCheckbox()
        }
        await this.clickLoginButton();
    }

    public async clickSignInButton() {
        await this.page.getByRole('button', {name: 'Sign In'}).click();
    }

    public async fillEmail(email: string) {
        await this.page.getByLabel('Email').fill(email);
    }

    public async fillPassword(password: string) {
        await this.page.getByLabel('Password').fill(password);
    }

    public async clickRememberMeCheckbox() {
        await this.page.getByLabel('Remember me').click();
    }

    public async clickLoginButton() {
        await this.page.getByRole('button', {name: 'Login'}).click();
    }

    public async verifyProfileButtonVisible() {
        await expect(this.page.getByRole('button', {name: 'My profile'})).toBeVisible();
    }

    public async saveSession() {
        const authFile = '.auth/user.json';
        await this.page.context().storageState({path: authFile});
    }
}