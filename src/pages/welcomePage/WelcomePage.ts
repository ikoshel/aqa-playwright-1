import {expect, Page} from "@playwright/test";
import {BasePage} from "../BasePage";
import RegisterModal from "./RegisterModal";
import {LoginModal} from "./LoginModal";
import Header from "../components/Header";
import {config as testConfig} from "./../../../config/config"
import {Role} from "../../data/roles";

export class WelcomePage extends BasePage {
    registerModal: RegisterModal;
    loginModal: LoginModal;
    header: Header;

    constructor(page: Page) {
        super(page, '/', page.locator('.container .header_inner'));
        this.registerModal = new RegisterModal(page);
        this.loginModal = new LoginModal(page);
        this.header = new Header(page);
    }

    async clickSignUpButton() {
        await this._page.getByRole('button', {name: 'Sign up'}).click();
    }

    public async authentication(type: Role) {
        interface Credentials {
            email: string;
            password: string;
        }

        await this.header.clickSignInButton();
        let credentials: Credentials;
        switch (type) {
            case Role.User:
                credentials = testConfig.userCredentials;
                break;
            case Role.Manager:
                credentials = testConfig.managerCredentials;
                break;
            default:
                throw new Error("Invalid user type");
        }
        await this.loginModal.signIn(credentials.email, credentials.password);
        await expect(this._page).toHaveURL('/panel/garage');
    }
}