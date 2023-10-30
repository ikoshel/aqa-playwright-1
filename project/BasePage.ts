import {Page} from "@playwright/test";

export class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public async navigateTo(sting: string) {
        await this.page.goto(sting);
    }
}