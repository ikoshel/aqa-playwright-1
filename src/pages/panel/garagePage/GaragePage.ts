import {expect, Locator, Page} from "@playwright/test";
import {BasePage} from "../../BasePage";

export default class GaragePage extends BasePage {

    constructor(page: Page) {
        super(page, '/panel/garage', page.locator('app-panel-layout > .panel-layout', {has: page.locator('button', {hasText: 'Add car'})}));
    }

    public async clickProfileButton() {
        await this._page.getByRole('link', {name: 'Profile'}).click();
    }

    public async validateNameAndLastnameForProfile(expectedNameAndLastName: string) {
        const profileNameElement: Locator = this._page.locator('p.profile_name');
        expect(await profileNameElement.innerText()).toBe(expectedNameAndLastName);
    }
}