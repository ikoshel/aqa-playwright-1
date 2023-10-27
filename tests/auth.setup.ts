import {expect, test as setup, test} from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();
const authFile = '.auth/user.json';

setup('authenticate', async ({page}) => {
    await test.step("Navigate to QAuto site", async () => {
        await page.goto('/');
    });
    await test.step("Click to Sign in button", async () => {
        await page.getByRole('button', {name: 'Sign In'}).click();
    });
    await test.step("Fill Email, Password, click remember me, ", async () => {
        await page.getByLabel('Email').fill(process.env.EMAIL);
        await page.getByLabel('Password').fill(process.env.PASSWORD);
        await page.getByLabel('Remember me').click();
    });
    await test.step("Click to Login button", async () => {
        await page.getByRole('button', {name: 'Login'}).click();
    });

    await page.waitForURL('https://qauto.forstudy.space/panel/garage');
    await expect(page.getByRole('button', {name: 'My profile'})).toBeVisible();

    await page.context().storageState({path: authFile});
});