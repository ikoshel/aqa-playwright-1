import {test as base} from '@playwright/test';
import {STORAGE_STATE_MANAGER_PATH, STORAGE_STATE_USER_PATH} from '../data/storageStatePath';
import GaragePage from "../pages/panel/garagePage/GaragePage";
import ProfilePage from "../pages/panel/profilePage/ProfilePage";
import CarController from "../controllers/CarController";
import {CookieJar} from "tough-cookie";
import {config} from "../../config/config";
import AuthController from "../controllers/AuthController";
import {IUserData} from "../data/types/types";

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

    // API fixture for authenticate
    clientWithUser: async ({page}, use) => {
        async function getClient(userData: IUserData) {
            const cookie = new CookieJar()
            const options = {
                baseUrl: config.apiURL,
                cookies: cookie
            }
            const authController = new AuthController(options)
            await authController.signIn(userData)

            return {
                cars: new CarController(options),
                auth: authController,
                users: new AuthController(options),
            }
        }

        await use(getClient)
    },
})