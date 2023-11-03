import {test as setup, test} from '@playwright/test';
import {LoginModal} from "../src/pages/welcomePage/LoginModal";
import {WelcomePage} from "../src/pages/welcomePage/WelcomePage";

setup('authenticate', async ({page}) => {
    new LoginModal(page);
    const welcomePage = new WelcomePage(page);

    await test.step("Authenticate on QAuto site", async () => {
        await welcomePage.navigate();
        await welcomePage.loginAsUser();
        await welcomePage.saveSession();
    });
});