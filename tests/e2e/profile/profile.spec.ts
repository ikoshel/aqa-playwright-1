import {test} from '../../../src/fixtures/test.fixture';

test.describe('Tests for User profile page @Sd9feaac0', () => {
    test('User test: Profile has correct first and last names @regression @T316287c8', async ({userProfilePage}) => {
        await userProfilePage.page.clickProfileButton();
        await userProfilePage.page.validateNameAndLastnameForProfile();
    })
});

test.describe('Tests for Manager profile page', () => {
    test('Manager test: Profile has correct first and last names @regression @Td306bbf1', async ({managerProfilePage}) => {
        await managerProfilePage.page.clickProfileButton();
        await managerProfilePage.page.validateNameAndLastnameForProfile();
    })
});