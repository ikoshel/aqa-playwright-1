import {expect, Locator, Page} from "@playwright/test";
import BaseComponent from "../BaseComponent";

export default class PanelLeftMenu extends BaseComponent {
    private garageButton: Locator;
    private profileButton: Locator;

    constructor(page: Page) {
        super(page, page.locator('nav.sidebar'));
        this.garageButton = this._page.getByRole('link', {name: 'Garage'});
        this.profileButton = this._page.getByRole('link', {name: 'Profile'});
    }

    public async clickGarageButton() {
        await this.garageButton.click();
        await expect(this._page.getByRole('button', {name: 'Add car'})).toBeVisible();
    }

    public async clickProfileButton() {
        await this.profileButton.click();
        await expect(this._page.getByRole('button', {name: 'Edit profile'})).toBeVisible();
    }
}