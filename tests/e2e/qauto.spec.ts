import {expect, test} from '@playwright/test';

test.describe('Test for home page @S5aa0dfdf', () => {

    test('Has title @regression @T341386f2', async ({page}) => {
        await test.step("Navigate to QAuto site", async () => {
            await page.goto('/');
        });
        await test.step("Check page title", async () => {
            // Expect a title "to contain" a substring.
            await expect(page).toHaveTitle(/Hillel Qauto/);
        });
    });
})

test.describe('Tests for profile page', () => {

    test('Profile has correct first and last names @regression @T316287c8', async ({page}) => {
        await test.step("Navigate to Garage section", async () => {
            await page.goto('/panel/garage');
        });
        await test.step("Click to Profile button", async () => {
            await page.getByRole('link', {name: 'Profile'}).click();
        });
        await test.step("Has Profile correct first and last names", async () => {
            const profileNameElement = page.locator('p.profile_name');
            expect(profileNameElement).not.toBeNull();

            const profileName = await profileNameElement.innerText();
            expect(profileName).toBe('John Tester');
        })
    })
})
