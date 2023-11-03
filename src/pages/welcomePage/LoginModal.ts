import {Page} from "@playwright/test";
import {BasePage} from "../../BasePage";
import Header from "../components/Header";

export class LoginModal extends BasePage {

    constructor(page: Page) {
        super(page, '/', page.locator('button', {hasText: 'Guest log in'}));
    }

    public async signIn(email: string, password: string, rememberMe: boolean = true) {
        await this.fillEmail(email);
        await this.fillPassword(password);
        if (rememberMe) {
            await this.clickRememberMeCheckbox()
        }
        await this.clickLoginButton();
    }

    async fillEmail(email: string) {
        await this._page.getByLabel('Email').fill(email);
    }

    async fillPassword(password: string) {
        await this._page.getByLabel('Password').fill(password);
    }

    async clickRememberMeCheckbox() {
        await this._page.getByLabel('Remember me').click();
    }

    async clickLoginButton() {
        await this._page.getByRole('button', {name: 'Login'}).click();
    }
}