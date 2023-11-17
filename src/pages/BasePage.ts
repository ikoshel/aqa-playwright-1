import {expect, Locator, Page} from "@playwright/test";
import BaseComponent from "./BaseComponent";
import {STORAGE_STATE_MANAGER_PATH, STORAGE_STATE_USER_PATH} from "../data/storageState";
import {Role} from "../fixtures/roles";

export class BasePage extends BaseComponent {
    private USER_NAV_DROPDOWN_SELECTOR: string = '#userNavDropdown';
    private LOGOUT_BUTTON_SELECTOR: string = 'nav.user-nav_menu.dropdown-menu button';

    private userNavDropdown: Locator;
    private logoutButton: Locator;

    constructor(page: Page, private readonly _url: string, container: Locator) {
        const wrapper: Locator = container ?? page.locator('html');
        super(page, wrapper);

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

    public async saveSessionAsUserOfType(type: Role) {
        let authFile: string;

        switch (type) {
            case Role.User:
                authFile = STORAGE_STATE_USER_PATH;
                break;
            case Role.Manager:
                authFile = STORAGE_STATE_MANAGER_PATH;
                break;
            default:
                throw new Error("Invalid user type");
        }

        await this._page.context().storageState({path: authFile});
    }
}