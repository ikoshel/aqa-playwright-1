import {test as base} from '@playwright/test';
import {STORAGE_STATE_MANAGER_PATH, STORAGE_STATE_USER_PATH} from '../data/storageState';
import GaragePage from "../pages/panel/garagePage/GaragePage";
import {Role} from "./roles";

export const test = base.extend({
    userProfilePage: async ({browser}, use) => {
        const ctx = await browser.newContext({
            storageState: STORAGE_STATE_USER_PATH,
        });
        const page = await ctx.newPage();
        const garagePage = new GaragePage(page, Role.User);
        await garagePage.navigate();
        await use({page: garagePage, role: Role.User});
    },
    managerProfilePage: async ({browser}, use) => {
        const ctx = await browser.newContext({
            storageState: STORAGE_STATE_MANAGER_PATH,
        });
        const page = await ctx.newPage();
        const garagePage = new GaragePage(page, Role.Manager);
        await garagePage.navigate();
        await use({page: garagePage, role: Role.Manager});
    },
})