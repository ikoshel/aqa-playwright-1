import {expect, Locator, Page} from "@playwright/test";
import {BasePage} from "../BasePage";
import {
    anotherValidPassword,
    expectedErrorMessagesEmptyFields,
    expectedErrorMessagesForPasswordWrongData,
    expectedErrorMessagesWhenPasswordsDoNotMatch,
    expectedErrorMessagesWrongData,
    expectedValidationMassagesWrongLength,
    invalidEmail,
    invalidLongLastName,
    invalidLongName,
    invalidPassword,
    invalidShortLastName,
    invalidShortName,
    validEmail,
    validLastName,
    validName,
    validPassword,
    wrongDataEmail,
    wrongDataLastName,
    wrongDataName
} from "../../fixtures/registerPageFixtures";
import {deleteApi, postApi} from "../../utils/apiHelper";

export class WelcomePage extends BasePage {

    private SIGNUP_NAME_SELECTOR = '#signupName';
    private SIGNUP_LAST_NAME_SELECTOR = '#signupLastName';
    private SIGNUP_EMAIL_SELECTOR = '#signupEmail';
    private SIGNUP_PASSWORD_SELECTOR = '#signupPassword';
    private SIGNUP_REPEAT_PASSWORD_SELECTOR = '#signupRepeatPassword';
    private ERROR_MESSAGE_SELECTOR = '.invalid-feedback p';

    private nameInput: Locator;
    private lastNameInput: Locator;
    private emailInput: Locator;
    private passwordInput: Locator;
    private rePasswordInput: Locator;
    private readonly errorMessage: Locator;

    constructor(page: Page) {
        super(page);

        this.nameInput = this.page.locator(this.SIGNUP_NAME_SELECTOR);
        this.lastNameInput = this.page.locator(this.SIGNUP_LAST_NAME_SELECTOR);
        this.emailInput = this.page.locator(this.SIGNUP_EMAIL_SELECTOR);
        this.passwordInput = this.page.locator(this.SIGNUP_PASSWORD_SELECTOR);
        this.rePasswordInput = this.page.locator(this.SIGNUP_REPEAT_PASSWORD_SELECTOR);
        this.errorMessage = this.page.locator(this.ERROR_MESSAGE_SELECTOR)
    }

    public async fillFormWithValues(name: string, lastName: string, email: string, password: string, rePassword: string) {
        await this.nameInput.fill(name);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.rePasswordInput.fill(rePassword);
    }

    public async signUpWithValidData() {
        await this.fillFormWithValues(validName, validLastName, validEmail, validPassword, validPassword);
    }

    public async signUpWithInvalidData() {
        await this.fillFormWithValues(invalidShortName, invalidShortLastName, invalidEmail, invalidPassword, invalidPassword);
    }

    public async signUpWithShortLengthNameAndLastName() {
        await this.fillFormWithValues(invalidShortName, invalidShortLastName, validEmail, validPassword, validPassword);
        await this.validateMassageWhenWrongLengthForNameAndLastName();
    }

    public async signUpWithLongLengthNameAndLastName() {
        await this.fillFormWithValues(invalidLongName, invalidLongLastName, validEmail, validPassword, validPassword);
        await this.validateMassageWhenWrongLengthForNameAndLastName();
    }

    public async signUpWithWrongDataForNameAndLastNameAndEmail() {
        await this.fillFormWithValues(wrongDataName, wrongDataLastName, wrongDataEmail, validPassword, validPassword);
    }

    public async signUpWithWrongDataForPassword() {
        await this.fillFormWithValues(validName, validLastName, validEmail, invalidPassword, invalidPassword);
    }

    public async signUpWithDifferencePasswords() {
        await this.fillFormWithValues(validName, validLastName, validEmail, validPassword, anotherValidPassword);
    }

    public async clickSignUpButton() {
        await this.page.getByRole('button', {name: 'Sign up'}).click();
    }

    public async clickNameInput() {
        await this.nameInput.click();
    }

    public async clickRegisterButton() {
        await this.page.getByRole('button', {name: 'Register'}).click();
    }

    public async clearAllRegisterFields() {
        await this.nameInput.clear();
        await this.lastNameInput.clear();
        await this.emailInput.clear();
        await this.passwordInput.clear();
        await this.rePasswordInput.clear();
    }

    public async validateMassageWhenWrongLengthForNameAndLastName() {
        const validationMassages: Locator = this.errorMessage;
        let actualValidationMassages: string[] = [];
        for (const validationMassageItem of await validationMassages.all()) {
            actualValidationMassages.push(await validationMassageItem.innerText())
        }
        expect.soft(actualValidationMassages).toEqual(expectedValidationMassagesWrongLength);
    }

    public async validateMassageWhenPasswordsDoNotMatch() {
        const validationMassageText: string = await this.errorMessage.innerText();
        expect(validationMassageText).toBe(expectedErrorMessagesWhenPasswordsDoNotMatch);
    }

    public async validateErrorMessagesForNameAndLastNameWrongData() {
        const validationMassages: Locator = this.errorMessage;
        let actualValidationMassages: string[] = [];
        for (const validationMassageItem of await validationMassages.all()) {
            actualValidationMassages.push(await validationMassageItem.innerText())
        }
        expect.soft(actualValidationMassages).toEqual(expectedErrorMessagesWrongData);
    }

    public async validateErrorMessagesForPasswordWrongData() {
        const validationMassageText: string = await this.errorMessage.innerText();
        expect(validationMassageText).toBe(expectedErrorMessagesForPasswordWrongData);
    }

    public async validateMessagesForEmptyRegisterFields() {
        const validationMassages: Locator = this.errorMessage;
        let actualValidationMassages: string[] = [];
        for (const validationMassageItem of await validationMassages.all()) {
            actualValidationMassages.push(await validationMassageItem.innerText())
        }
        expect.soft(actualValidationMassages).toEqual(expectedErrorMessagesEmptyFields);
    }

    public async validateBorderColorForErrorFields() {
        const inputsWithRedBorder = this.errorMessage;
        const expectedBorderColor: string = 'rgb(220, 53, 69)';
        for (const input of await inputsWithRedBorder.all()) {
            await expect.soft(input).toHaveCSS('border-color', expectedBorderColor);
        }
    }

    public async expectRegistrationCompletePopup() {
        await expect(this.page.locator('div').filter({hasText: 'Registration complete'}).nth(3)).toBeVisible();
    }

    public async expectDisabledRegisterButtonWhenDataIsInvalid() {
        await expect(this.page.getByRole('button', {name: 'Register'})).toBeDisabled();
    }

    public async deleteNewUser() {
        try {
            const headers = {
                headers: {
                    authorization: process.env.AUTHORIZATION_TOKEN,
                    'content-type': 'application/json',
                },
                withCredentials: true,
            };
            const response = await postApi(`${process.env.BASE_API_URL}/api/auth/signin`, {email: validEmail, password: validPassword}, headers);

            const cookies = response.headers['set-cookie'];
            const sid = cookies[0].split(';')[0];

            await deleteApi(
                `${process.env.BASE_API_URL}/api/users`,
                {
                    headers: {
                        authorization: process.env.AUTHORIZATION_TOKEN,
                        cookie: sid,
                    },
                }
            );
        } catch (error) {
            console.log("An error occurred:", error.message);
        }
    }
}