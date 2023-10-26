import {expect, test} from '@playwright/test';

test.describe('has title', () => {

    test('has title', async ({page}) => {
        await test.step("Navigate to Playwright site", async ()=>{
            await page.goto('https://playwright.dev/');
        })
        await test.step("Chech page title", async ()=>{
            // Expect a title "to contain" a substring.
            await expect(page).toHaveTitle(/Playwright/);
        })
    });

    test('get started link', async ({page}) => {
        await page.goto('https://playwright.dev/');

        // Click the get started link.
        await page.getByRole('link', {name: 'Get started'}).click();

        // Expects page to have a heading with the name of Installation.
        await expect(page.getByRole('heading', {name: 'Installation'})).toBeVisible();
    });
})
