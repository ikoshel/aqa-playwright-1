import {Page} from "@playwright/test";
import {BasePage} from "../../../BasePage";

export default class GaragePage extends BasePage {
    constructor(page: Page) {
        super(page, '/panel/garage', page.locator('app-panel-layout', {has: page.locator('button', {hasText: 'Add car'})}));
    }
}