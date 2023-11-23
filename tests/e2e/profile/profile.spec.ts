import {test} from '../../../src/fixtures/test.fixture';
import {
    mockedProfileNameAndLastName,
    profileNameAndLastNameForManager,
    profileNameAndLastNameForUser
} from "./fixtures/fixturesProfilePage";
import {CUSTOM_PROFILE_INFO} from "./fixtures/profileInfo";

test.describe('Tests for User profile page', () => {
    test('User test: Profile has correct first and last names @regression @T316287c8', async ({userProfilePage}) => {
        await userProfilePage.navigate();
        await userProfilePage.validateNameAndLastnameForProfile(profileNameAndLastNameForUser);
    });
    test('User test: Compare first and last names with mock names on UI @regression', async ({userProfilePage}) => {
        await userProfilePage.mockNameAndLastNameFromFixture(CUSTOM_PROFILE_INFO);
        await userProfilePage.navigate();
        await userProfilePage.validateNameAndLastnameForProfile(mockedProfileNameAndLastName);
    });
});

test.describe('Tests for Manager profile page', () => {
    test('Manager test: Profile has correct first and last names @regression @Td306bbf1', async ({managerProfilePage}) => {
        await managerProfilePage.navigate();
        await managerProfilePage.validateNameAndLastnameForProfile(profileNameAndLastNameForManager);
    });
    test('Manager test: Compare first and last names with mock names on UI @regression', async ({managerProfilePage}) => {
        await managerProfilePage.mockNameAndLastNameFromFixture(CUSTOM_PROFILE_INFO);
        await managerProfilePage.navigate();
        await managerProfilePage.validateNameAndLastnameForProfile(mockedProfileNameAndLastName);
    });
});