import {Browser, test as setup, test} from '@playwright/test';
import {WelcomePage} from "../src/pages/welcomePage/WelcomePage";
import {Role} from "../src/data/roles";

async function loginAs(browser: Browser, type: Role) {
    const context = await browser.newContext();
    const page = await context.newPage();
    const welcomePage = new WelcomePage(page);
    await welcomePage.navigate();
    await welcomePage.authentication(type);
    await welcomePage.saveSessionAsUserOfType(type);
    await context.close();
}

setup('authenticate', async ({browser}) => {
    await test.step("Authenticate on QAuto site as user", async () => {
        await loginAs(browser, Role.User);
    });

    await test.step("Authenticate on QAuto site as manager", async () => {
        await loginAs(browser, Role.Manager);
    });
});