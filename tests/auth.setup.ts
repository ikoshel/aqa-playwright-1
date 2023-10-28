import {test as setup, test} from '@playwright/test';
import {LoginPage} from "../project/pages/LoginPage";

setup('authenticate', async ({page}) => {
    const loginPage = new LoginPage(page);

    await test.step("Navigate to QAuto site", async () => {
        await loginPage.navigateTo('/');
    });

    await test.step("Click to Sign in button", async () => {
        await loginPage.clickSignInButton();
    });

    await test.step("Fill Email, Password, click remember me, ", async () => {
        await loginPage.fillEmail(process.env.EMAIL);
        await loginPage.fillPassword(process.env.PASSWORD);
        await loginPage.clickRememberMeCheckbox();
    });

    await test.step("Click to Login button", async () => {
        await loginPage.clickLoginButton();
    });

    await loginPage.verifyProfileButtonVisible();
    await loginPage.saveSession();
});