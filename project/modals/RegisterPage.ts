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
import {
    ERROR_MESSAGE_SELECTOR,
    SIGNUP_EMAIL_SELECTOR,
    SIGNUP_LAST_NAME_SELECTOR,
    SIGNUP_NAME_SELECTOR,
    SIGNUP_PASSWORD_SELECTOR,
    SIGNUP_REPEAT_PASSWORD_SELECTOR
} from '../../constants/registerPageSelectors';
import {deleteApi, postApi} from "../../utils/apiHelper";

export class RegisterPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    public async signUp(name: string, lastName: string, email: string, password: string, rePassword: string) {
        await this.fillName(name);
        await this.fillLastName(lastName);
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.fillRePassword(rePassword);
    }

    public async signUpWithValidData() {
        await this.signUp(validName, validLastName, validEmail, validPassword, validPassword);
    }

    public async signUpWithInvalidData() {
        await this.signUp(invalidShortName, invalidShortLastName, invalidEmail, invalidPassword, invalidPassword);
    }

    public async signUpWithShortLengthNameAndLastName() {
        await this.signUp(invalidShortName, invalidShortLastName, validEmail, validPassword, validPassword);
        await this.validateMassageWhenWrongLengthForNameAndLastName();
    }

    public async signUpWithLongLengthNameAndLastName() {
        await this.signUp(invalidLongName, invalidLongLastName, validEmail, validPassword, validPassword);
        await this.validateMassageWhenWrongLengthForNameAndLastName();
    }

    public async signUpWithWrongDataForNameAndLastNameAndEmail() {
        await this.signUp(wrongDataName, wrongDataLastName, wrongDataEmail, validPassword, validPassword);
    }

    public async signUpWithWrongDataForPassword() {
        await this.signUp(validName, validLastName, validEmail, invalidPassword, invalidPassword);
    }

    public async signUpWithDifferencePasswords() {
        await this.signUp(validName, validLastName, validEmail, validPassword, anotherValidPassword);
    }

    public async clickSignUpButton() {
        await this.page.getByRole('button', {name: 'Sign up'}).click();
    }

    public async clickNameInput() {
        await this.page.locator(SIGNUP_NAME_SELECTOR).click();
    }

    public async fillName(name: string) {
        await this.page.locator(SIGNUP_NAME_SELECTOR).fill(name);
    }

    public async fillLastName(lastName: string) {
        await this.page.locator(SIGNUP_LAST_NAME_SELECTOR).fill(lastName);
    }

    public async fillEmail(email: string) {
        await this.page.locator(SIGNUP_EMAIL_SELECTOR).fill(email);
    }

    public async fillPassword(password: string) {
        await this.page.locator(SIGNUP_PASSWORD_SELECTOR).fill(password);
    }

    public async fillRePassword(rePassword: string) {
        await
            this.page.locator(SIGNUP_REPEAT_PASSWORD_SELECTOR).fill(rePassword);
    }

    public async clickRegisterButton() {
        await this.page.getByRole('button', {name: 'Register'}).click();
    }

    public async clearAllRegisterFields() {
        await this.page.locator(SIGNUP_NAME_SELECTOR).clear();
        await this.page.locator(SIGNUP_LAST_NAME_SELECTOR).clear();
        await this.page.locator(SIGNUP_EMAIL_SELECTOR).clear();
        await this.page.locator(SIGNUP_PASSWORD_SELECTOR).clear();
        await this.page.locator(SIGNUP_REPEAT_PASSWORD_SELECTOR).clear();
    }

    public async validateMassageWhenWrongLengthForNameAndLastName() {
        const validationMassages: Locator = this.page.locator(ERROR_MESSAGE_SELECTOR);
        let actualValidationMassages: string[] = [];
        for (const validationMassageItem of await validationMassages.all()) {
            actualValidationMassages.push(await validationMassageItem.innerText())
        }
        expect.soft(actualValidationMassages).toEqual(expectedValidationMassagesWrongLength);
    }

    public async validateMassageWhenPasswordsDoNotMatch() {
        const validationMassageText: string = await this.page.locator(ERROR_MESSAGE_SELECTOR).innerText();
        expect(validationMassageText).toBe(expectedErrorMessagesWhenPasswordsDoNotMatch);
    }

    public async validateErrorMessagesForNameAndLastNameWrongData() {
        const validationMassages: Locator = this.page.locator(ERROR_MESSAGE_SELECTOR);
        let actualValidationMassages: string[] = [];
        for (const validationMassageItem of await validationMassages.all()) {
            actualValidationMassages.push(await validationMassageItem.innerText())
        }
        expect.soft(actualValidationMassages).toEqual(expectedErrorMessagesWrongData);
    }

    public async validateErrorMessagesForPasswordWrongData() {
        const validationMassageText: string = await this.page.locator(ERROR_MESSAGE_SELECTOR).innerText();
        expect(validationMassageText).toBe(expectedErrorMessagesForPasswordWrongData);
    }

    public async validateMessagesForEmptyRegisterFields() {
        const validationMassages: Locator = this.page.locator(ERROR_MESSAGE_SELECTOR);
        let actualValidationMassages: string[] = [];
        for (const validationMassageItem of await validationMassages.all()) {
            actualValidationMassages.push(await validationMassageItem.innerText())
        }
        expect.soft(actualValidationMassages).toEqual(expectedErrorMessagesEmptyFields);
    }

    public async validateBorderColorForErrorFields() {
        const inputsWithRedBorder = this.page.locator(ERROR_MESSAGE_SELECTOR);
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