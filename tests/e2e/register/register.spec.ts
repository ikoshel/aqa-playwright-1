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
test.describe('Positive tests for Register modal window @Se58e3e45', () => {
    test.afterAll(async () => {
        await welcomePage.logout();
        await userController.deleteUserById(validEmail, validPassword);
    });
    test('Should register a new user @smoke @regression @Tcf5aea9a', async () => {
        await welcomePage.registerModal.fillFormWithValidData();
        await welcomePage.registerModal.clickRegisterButton();
        await welcomePage.registerModal.expectRegistrationCompletePopup();
    });
});
test.describe('Negative tests for Register modal window', () => {
    test('Should be validation messages for wrong length Name and Last name @smoke @regression @T19f49554', async () => {
        await welcomePage.registerModal.fillFormWithShortLengthNameAndLastName();
        await welcomePage.registerModal.fillFormWithLongLengthNameAndLastName();
    });
    test('Should be disabled register button when data is invalid @smoke @regression @Tb0ddeab6', async () => {
        await welcomePage.registerModal.fillFormUpWithInvalidData();
        await welcomePage.registerModal.expectDisabledRegisterButtonWhenDataIsInvalid();
    });
    test('Should be all register fields are required @smoke @regression @T596cfab6', async () => {
        await welcomePage.registerModal.fillFormWithValidData();
        await welcomePage.registerModal.clearAllRegisterFields();
        await welcomePage.registerModal.validateMessagesForEmptyRegisterFields();
    });
    test('Should be all error fields with red border @smoke @regression @Ta4b3b2be', async () => {
        await welcomePage.registerModal.fillFormWithValidData();
        await welcomePage.registerModal.clearAllRegisterFields();
        await welcomePage.registerModal.validateBorderColorForErrorFields();
    });
    test('Should be correct format for Name, Last name and Email @smoke @regression @T296d039e', async () => {
        await welcomePage.registerModal.fillFormWithWrongDataForNameAndLastNameAndEmail();
        await welcomePage.registerModal.validateErrorMessagesForNameAndLastNameWrongData();
    });
    test('Should be correct format for Password @smoke @regression @T8318e091', async () => {
        await welcomePage.registerModal.fillFormWithWrongDataForPassword();
        await welcomePage.registerModal.validateErrorMessagesForPasswordWrongData();
    });
    test('Should be validate massage when passwords do not match @smoke @regression @T209bff5a', async () => {
        await welcomePage.registerModal.fillFormWithDifferencePasswords();
        await welcomePage.registerModal.clickNameInput();
        await welcomePage.registerModal.validateMassageWhenPasswordsDoNotMatch();
    });
})