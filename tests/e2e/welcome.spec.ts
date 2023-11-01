import {test} from '@playwright/test';
import {WelcomePage} from "../../project/modals/WelcomePage";

let welcomePage: WelcomePage;

test.use({storageState: {cookies: [], origins: []}});

test.beforeEach(async ({page}) => {
    welcomePage = new WelcomePage(page);
    await welcomePage.navigateTo('/');
    await welcomePage.clickSignUpButton();
});
test.describe('Positive tests for Register pop-up', () => {
    test('Should register a new user', async () => {
        await welcomePage.signUpWithValidData();
        await welcomePage.clickRegisterButton();
        await welcomePage.expectRegistrationCompletePopup();
    });
    test.afterAll(async ()=>{
        await welcomePage.deleteNewUser();
    })
});
test.describe('Negative tests for Register pop-up', ()=>{
    test('Should be validation messages for wrong length Name and Last name', async () => {
        await welcomePage.signUpWithShortLengthNameAndLastName();
        await welcomePage.signUpWithLongLengthNameAndLastName();
    });
    test('Should be disabled register button when data is invalid', async () => {
        await welcomePage.signUpWithInvalidData();
        await welcomePage.expectDisabledRegisterButtonWhenDataIsInvalid();
    });
    test('Should be all register fields are required', async () => {
        await welcomePage.signUpWithValidData();
        await welcomePage.clearAllRegisterFields();
        await welcomePage.validateMessagesForEmptyRegisterFields();
    });
    test('Should be all error fields with red border', async () => {
        await welcomePage.signUpWithValidData();
        await welcomePage.clearAllRegisterFields();
        await welcomePage.validateBorderColorForErrorFields();
    });
    test('Should be correct format for Name, Last name and Email', async () => {
        await welcomePage.signUpWithWrongDataForNameAndLastNameAndEmail();
        await welcomePage.validateErrorMessagesForNameAndLastNameWrongData();
    });
    test('Should be correct format for Password', async () => {
        await welcomePage.signUpWithWrongDataForPassword();
        await welcomePage.validateErrorMessagesForPasswordWrongData();
    });
    test('Should be validate massage when passwords do not match', async () => {
        await welcomePage.signUpWithDifferencePasswords();
        await welcomePage.clickNameInput();
        await welcomePage.validateMassageWhenPasswordsDoNotMatch();
    });
})