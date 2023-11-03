import {expect, Locator, Page} from "@playwright/test";
import BaseComponent from "./BaseComponent";

export class BasePage extends BaseComponent {
    private readonly _url: string;
    private USER_NAV_DROPDOWN_SELECTOR: string = '#userNavDropdown';
    private LOGOUT_BUTTON_SELECTOR: string = 'nav.user-nav_menu.dropdown-menu button';

    private userNavDropdown: Locator;
    private logoutButton: Locator;

    constructor(page: Page, url: string, container: Locator) {
        const wrapper: Locator = container ?? page.locator('html');
        super(page, wrapper);

        this._url = url;
        this.userNavDropdown = this._container.locator(this.USER_NAV_DROPDOWN_SELECTOR);
        this.logoutButton = this._container.locator(this.LOGOUT_BUTTON_SELECTOR, {hasText: 'Logout'});
    }

    public async navigate() {
        await this.open();
        await this.waitLoaded();
    }

    async open() {
        await this._page.goto(this._url)
    }

    async logout() {
        await this.userNavDropdown.click()
        await this.logoutButton.click()
        await expect(this._page).toHaveURL('/')
    }

    public async saveSession() {
        const authFile: string = '.auth/user.json';
        await this._page.context().storageState({path: authFile});
    }
}