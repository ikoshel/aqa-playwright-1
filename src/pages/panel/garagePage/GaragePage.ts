import {expect, Locator, Page} from "@playwright/test";
import {BasePage} from "../../BasePage";
import {Role} from "../../../fixtures/roles";
import {
    profileNameAndLastNameForManager,
    profileNameAndLastNameForUser
} from "../../../../tests/e2e/profile/fixtures/fixturesProfilePage";

const profileNames: { [key in Role]: string } = {
    [Role.User]: profileNameAndLastNameForUser,
    [Role.Manager]: profileNameAndLastNameForManager,
}

export default class GaragePage extends BasePage {
    private readonly _role: Role;

    constructor(page: Page, role: Role) {
        super(page, '/panel/garage', page.locator('app-panel-layout > .panel-layout', {has: page.locator('button', {hasText: 'Add car'})}));
        this._role = role;
    }

    public async clickProfileButton() {
        await this._page.getByRole('link', {name: 'Profile'}).click();
    }

    public async validateNameAndLastnameForProfile() {
        const profileNameElement: Locator = this._page.locator('p.profile_name');
        expect(await profileNameElement.innerText()).toBe(profileNames[this._role]);
    }
}