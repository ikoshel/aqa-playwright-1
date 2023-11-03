import {Page, test} from '@playwright/test';
import {WelcomePage} from "../../../src/pages/welcomePage/WelcomePage";
import UserController from "../../../src/controllers/UserController";
import {validEmail, validPassword} from "./fixtures/registerPageFixtures";

let welcomePage: WelcomePage;
let userController: UserController;

test.use({storageState: {cookies: [], origins: []}});
test.beforeAll(async ({browser}) => {
    const context = await browser.newContext();
    let page: Page = await context.newPage();

    welcomePage = new WelcomePage(page);
    userController = new UserController();
});
test.beforeEach(async () => {
    await welcomePage.navigate();
    await welcomePage.clickSignUpButton();
});
test.describe('Positive tests for Register pop-up', () => {
    test.afterAll(async () => {
        await welcomePage.logout();
        await userController.deleteUserById(validEmail, validPassword);
    });
    test('Should register a new user', async () => {
        await welcomePage.registerModal.signUpWithValidData();
        await welcomePage.registerModal.clickRegisterButton();
        await welcomePage.registerModal.expectRegistrationCompletePopup();
    });
});
test.describe('Negative tests for Register pop-up', () => {
    test('Should be validation messages for wrong length Name and Last name', async () => {
        await welcomePage.registerModal.signUpWithShortLengthNameAndLastName();
        await welcomePage.registerModal.signUpWithLongLengthNameAndLastName();
    });
    test('Should be disabled register button when data is invalid', async () => {
        await welcomePage.registerModal.signUpWithInvalidData();
        await welcomePage.registerModal.expectDisabledRegisterButtonWhenDataIsInvalid();
    });
    test('Should be all register fields are required', async () => {
        await welcomePage.registerModal.signUpWithValidData();
        await welcomePage.registerModal.clearAllRegisterFields();
        await welcomePage.registerModal.validateMessagesForEmptyRegisterFields();
    });
    test('Should be all error fields with red border', async () => {
        await welcomePage.registerModal.signUpWithValidData();
        await welcomePage.registerModal.clearAllRegisterFields();
        await welcomePage.registerModal.validateBorderColorForErrorFields();
    });
    test('Should be correct format for Name, Last name and Email', async () => {
        await welcomePage.registerModal.signUpWithWrongDataForNameAndLastNameAndEmail();
        await welcomePage.registerModal.validateErrorMessagesForNameAndLastNameWrongData();
    });
    test('Should be correct format for Password', async () => {
        await welcomePage.registerModal.signUpWithWrongDataForPassword();
        await welcomePage.registerModal.validateErrorMessagesForPasswordWrongData();
    });
    test('Should be validate massage when passwords do not match', async () => {
        await welcomePage.registerModal.signUpWithDifferencePasswords();
        await welcomePage.registerModal.clickNameInput();
        await welcomePage.registerModal.validateMassageWhenPasswordsDoNotMatch();
    });
})