import {expect, Locator, Page} from "@playwright/test";
import {BasePage} from "../../BasePage";
import PanelLeftMenu from "../../components/PanelLeftMenu";

export default class ProfilePage extends BasePage {
    panelLeftMenu: PanelLeftMenu;

    constructor(page: Page) {
        super(page, '/panel/profile', page.locator('app-panel-layout > .panel-layout', {has: page.locator('button', {hasText: 'Edit profile'})}));
        this.panelLeftMenu = new PanelLeftMenu(page);
    }

    public async validateNameAndLastnameForProfile(expectedNameAndLastName: string) {
        const profileNameElement: Locator = this._page.locator('p.profile_name');
        await expect(profileNameElement).toHaveText(expectedNameAndLastName);
    }

    public async mockNameAndLastNameFromFixture(customProfileInfo: object) {
        await this._page.route('/api/users/profile', (route: { fulfill: (arg0: { body: string; }) => void; }) => {
            route.fulfill({body: JSON.stringify(customProfileInfo)})
        });
    }
}