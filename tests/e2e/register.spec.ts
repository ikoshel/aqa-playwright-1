import {test} from '@playwright/test';
import {RegisterPage} from "../../project/modals/RegisterPage";

let registerPage: RegisterPage;

test.describe('Tests for Register page', () => {
    test.use({storageState: {cookies: [], origins: []}});

    test.beforeEach(async ({page}) => {
        registerPage = new RegisterPage(page);
        await registerPage.navigateTo('/');
        await registerPage.clickSignUpButton();
    });
    test('Should register a new user, and delete', async () => {
        await registerPage.signUpWithValidData();
        await registerPage.clickRegisterButton();
        await registerPage.expectRegistrationCompletePopup();
        await registerPage.deleteNewUser();
    });
    test('Should be validation messages for wrong length Name and Last name', async () => {
        await registerPage.signUpWithShortLengthNameAndLastName();
        await registerPage.signUpWithLongLengthNameAndLastName();
    });
    test('Should be disabled register button when data is invalid', async () => {
        await registerPage.signUpWithInvalidData();
        await registerPage.expectDisabledRegisterButtonWhenDataIsInvalid();
    });
    test('Should be all register fields are required', async () => {
        await registerPage.signUpWithValidData();
        await registerPage.clearAllRegisterFields();
        await registerPage.validateMessagesForEmptyRegisterFields();
    });
    test('Should be all error fields with red border', async () => {
        await registerPage.signUpWithValidData();
        await registerPage.clearAllRegisterFields();
        await registerPage.validateBorderColorForErrorFields();
    });
    test('Should be correct format for Name, Last name and Email', async () => {
        await registerPage.signUpWithWrongDataForNameAndLastNameAndEmail();
        await registerPage.validateErrorMessagesForNameAndLastNameWrongData();
    });
    test('Should be correct format for Password', async () => {
        await registerPage.signUpWithWrongDataForPassword();
        await registerPage.validateErrorMessagesForPasswordWrongData();
    });
    test('Should be validate massage when passwords do not match', async () => {
        await registerPage.signUpWithDifferencePasswords();
        await registerPage.clickNameInput();
        await registerPage.validateMassageWhenPasswordsDoNotMatch();
    });
})