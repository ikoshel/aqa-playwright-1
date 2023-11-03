import {Locator, Page} from "@playwright/test";

export default class BaseComponent {
    protected _page: Page;
    protected _container: Locator;

    constructor(page: Page, container: Locator) {
        this._page = page
        this._container = container
    }

    async waitLoaded() {
        await this._container.waitFor()
    }
}