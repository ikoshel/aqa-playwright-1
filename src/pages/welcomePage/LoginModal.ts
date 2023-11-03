import {Page} from "@playwright/test";
import {BasePage} from "../../BasePage";
import Header from "../components/Header";

export class LoginModal extends BasePage {
    private header: Header;

    constructor(page: Page) {
        super(page, '/', page.locator('button', {hasText: 'Guest log in'}));
        this.header = new Header(page);
    }

    public async signIn(email: string, password: string, rememberMe: boolean = true) {
        await this.header.clickSignInButton();
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

    public async saveSession() {
        const authFile: string = '.auth/user.json';
        await this._page.context().storageState({path: authFile});
    }
}