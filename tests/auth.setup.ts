import {test as setup, test} from '@playwright/test';
import {LoginPage} from "../project/pages/LoginPage";

setup('authenticate', async ({page}) => {
    const loginPage = new LoginPage(page);

    await test.step("Authenticate on QAuto site", async () => {
        await loginPage.navigateTo('/');
        await loginPage.signIn(process.env.EMAIL, process.env.PASSWORD);
        await loginPage.verifyProfileButtonVisible();
        await loginPage.saveSession();
    });
});