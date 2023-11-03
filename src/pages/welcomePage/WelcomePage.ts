import {expect, Page} from "@playwright/test";
import {BasePage} from "../../BasePage";
import RegisterModal from "./RegisterModal";
import {LoginModal} from "./LoginModal";
import GaragePage from "../panel/garagePage/GaragePage";
import Header from "../components/Header";

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

    public async loginAsUser() {
        await this.header.clickSignInButton();
        await this.loginModal.signIn(process.env.EMAIL, process.env.PASSWORD);
        await expect(this._page).toHaveURL('/panel/garage')
        return new GaragePage(this._page)
    }
}