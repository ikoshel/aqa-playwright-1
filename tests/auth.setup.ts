import {Browser, Page, test as setup, test} from '@playwright/test';
import {LoginModal} from "../src/pages/welcomePage/LoginModal";
import {WelcomePage} from "../src/pages/welcomePage/WelcomePage";
import {Role} from "../src/fixtures/roles";

function createWelcomePage(page: Page) {
    return new WelcomePage(page);
}

async function loginAsUserOfType(browser: Browser, type: Role) {
    const context = await browser.newContext();
    const page = await context.newPage();
    new LoginModal(page);
    const welcomePage = createWelcomePage(page);
    await welcomePage.navigate();
    await welcomePage.loginAsUserOfType(type);
    await welcomePage.saveSessionAsUserOfType(type);
    await context.close();
}

setup('authenticate', async ({browser}) => {
    await test.step("Authenticate on QAuto site as user", async () => {
        await loginAsUserOfType(browser, Role.User);
    });

    await test.step("Authenticate on QAuto site as manager", async () => {
        await loginAsUserOfType(browser, Role.Manager);
    });
});