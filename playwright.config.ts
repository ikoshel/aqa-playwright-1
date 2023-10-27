import {defineConfig, devices} from '@playwright/test';
import * as dotenv from 'dotenv';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
dotenv.config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    globalSetup: './globalSetup',
    testDir: './tests',
    /* Run tests in files in parallel */
    fullyParallel: false,
    workers: 3,
    maxFailures: 10,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: [['html', {open: 'never'}], [process.env.CI ? 'github' : 'list']],

    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        httpCredentials: {
            username: process.env.HTTP_CREDENTIALS_USERNAME,
            password: process.env.HTTP_CREDENTIALS_PASSWORD,
        },

        baseURL: 'https://qauto.forstudy.space',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'on-first-retry',
    },

    projects: [
        // Setup project
        {name: 'setup', testMatch: /.*\.setup\.ts/},
        {
            name: 'e2e-chromium',
            testMatch: /\/tests\/e2e\/.*\/*.(test|spec).(js|ts)/,
            dependencies: ['setup'],
            use: {
                // Use prepared auth state.
                storageState: '.auth/user.json',
                screenshot: {
                    mode: 'only-on-failure',
                    fullPage: true
                },
                browserName: 'chromium',
                video: 'on',
                viewport: {width: 1920, height: 1080},
                trace: 'retain-on-failure'
            }
        },
        {
            name: 'API',
            testMatch: /\/tests\/api\/.*\/*.(test|spec).(js|ts)/,
            use: {
                ...devices['Desktop Chrome']
            }
        },
        // {
        //   name: 'chromium',
        //   use: { ...devices['Desktop Chrome'] },
        // },
        // {
        //   name: 'firefox',
        //   use: { ...devices['Desktop Firefox'] },
        // },
        // {
        //   name: 'webkit',
        //   use: { ...devices['Desktop Safari'] },
        // },
    ],
});