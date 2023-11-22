import {Page} from "@playwright/test";
import {BasePage} from "../../BasePage";
import PanelLeftMenu from "../../components/PanelLeftMenu";

export default class GaragePage extends BasePage {
    panelLeftMenu: PanelLeftMenu;
    constructor(page: Page) {
        super(page, '/panel/garage', page.locator('app-panel-layout > .panel-layout', {has: page.locator('button', {hasText: 'Add car'})}));
        this.panelLeftMenu = new PanelLeftMenu(page);
    }

}