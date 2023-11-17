import {expect, Page} from "@playwright/test";
import {BasePage} from "../BasePage";
import RegisterModal from "./RegisterModal";
import {LoginModal} from "./LoginModal";
import GaragePage from "../panel/garagePage/GaragePage";
import Header from "../components/Header";
import {config as testConfig} from "./../../../config/config"
import {Role} from "../../fixtures/roles";

export class WelcomePage extends BasePage {
    registerModal: RegisterModal;
    loginModal: LoginModal;
    header: Header;

    private credentials: { [key in Role]: { email: string; password: string } } = {
        [Role.User]: testConfig.userCredentials,
        [Role.Manager]: testConfig.managerCredentials,
    };

    constructor(page: Page) {
        super(page, '/', page.locator('.container .header_inner'));
        this.registerModal = new RegisterModal(page);
        this.loginModal = new LoginModal(page);
        this.header = new Header(page);
    }

    async clickSignUpButton() {
        await this._page.getByRole('button', {name: 'Sign up'}).click();
    }

    public async loginAsUserOfType(type: Role) {
        await this.header.clickSignInButton();
        await this.loginModal.signIn(this.credentials[type].email, this.credentials[type].password);
        await expect(this._page).toHaveURL('/panel/garage');
        return new GaragePage(this._page);
    }
}