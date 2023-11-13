import {defineConfig, devices} from '@playwright/test';
import {config as testConfig} from "./config/config";
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */


/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    grep: /regression/,
    globalSetup: './globalSetup',
    testDir: './tests',
    /* Run tests in files in parallel */
    fullyParallel: true,
    workers: process.env.CI ? 3 : 5,
    maxFailures: process.env.CI ? 10 : undefined,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: [['html', {open: 'never'}], [process.env.CI ? 'github' : 'list']],

    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        httpCredentials: testConfig.httpCredentials,

        baseURL: testConfig.baseURL,
        trace: process.env.CI ? 'off' : 'on-first-retry',
        screenshot: 'only-on-failure',
        video: process.env.CI ? 'off' : 'retain-on-failure',
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
                //video: 'on',
                viewport: {width: 1920, height: 1080},
                //trace: 'retain-on-failure'
            }
        },
        {
            name: 'API',
            testMatch: /\/tests\/api\/.*\/*.(test|spec).(js|ts)/,
            use: {
                ...devices['Desktop Chrome']
            }
        },
    ],
});