import {request, test as base} from '@playwright/test';
import {STORAGE_STATE_MANAGER_PATH, STORAGE_STATE_USER_PATH} from '../data/storageStatePath';
import GaragePage from "../pages/panel/garagePage/GaragePage";
import ProfilePage from "../pages/panel/profilePage/ProfilePage";

export const test = base.extend({
    userGaragePage: async ({browser}, use) => {
        const ctx = await browser.newContext({
            storageState: STORAGE_STATE_USER_PATH,
        });
        const page = await ctx.newPage();
        const garagePage = new GaragePage(page);
        await garagePage.navigate();
        await use(garagePage);
        await ctx.close();
    },
    managerGaragePage: async ({browser}, use) => {
        const ctx = await browser.newContext({
            storageState: STORAGE_STATE_MANAGER_PATH,
        });
        const page = await ctx.newPage();
        const garagePage = new GaragePage(page);
        await garagePage.navigate();
        await use(garagePage);
        await ctx.close();
    },
    userProfilePage: async ({browser}, use) => {
        const ctx = await browser.newContext({
            storageState: STORAGE_STATE_USER_PATH,
        });
        const page = await ctx.newPage();
        const profilePage = new ProfilePage(page);
        await use(profilePage);
        await ctx.close();
    },
    managerProfilePage: async ({browser}, use) => {
        const ctx = await browser.newContext({
            storageState: STORAGE_STATE_MANAGER_PATH,
        });
        const page = await ctx.newPage();
        const profilePage = new ProfilePage(page);
        await use(profilePage);
        await ctx.close();
    },
    userAPIClient: async ({},use)=>{
        const ctx = await request.newContext({
            storageState: STORAGE_STATE_USER_PATH,
        });
        await use(ctx);
        await ctx.dispose();
    },
    managerAPIClient: async ({},use)=>{
        const ctx = await request.newContext({
            storageState: STORAGE_STATE_MANAGER_PATH,
        });
        await use(ctx);
        await ctx.dispose();
    },
})