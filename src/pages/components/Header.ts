import {Locator, Page} from "@playwright/test";
import BaseComponent from "../BaseComponent";

export default class Header extends BaseComponent {
    private signInButton: Locator;

    constructor(page: Page) {
        super(page, page.locator('app-header'));
        this.signInButton = this._container.getByRole('button', {name: 'Sign In'});
    }

    async clickSignInButton() {
        await this.signInButton.click();
    }
}