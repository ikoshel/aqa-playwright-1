import {test} from '../../../src/fixtures/test.fixture';
import {profileNameAndLastNameForManager, profileNameAndLastNameForUser} from "./fixtures/fixturesProfilePage";

test.describe('Tests for User profile page', () => {
    test('User test: Profile has correct first and last names @regression @T316287c8', async ({userProfilePage}) => {
        await userProfilePage.clickProfileButton();
        await userProfilePage.validateNameAndLastnameForProfile(profileNameAndLastNameForUser);
    })
});

test.describe('Tests for Manager profile page', () => {
    test('Manager test: Profile has correct first and last names @regression @Td306bbf1', async ({managerProfilePage}) => {
        await managerProfilePage.clickProfileButton();
        await managerProfilePage.validateNameAndLastnameForProfile(profileNameAndLastNameForManager);
    })
});