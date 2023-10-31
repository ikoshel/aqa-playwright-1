import faker from 'faker';

// Name
export const validName = "John";
export const invalidShortName = faker.name.firstName().substring(0, 1);
export const invalidLongName = 'LongNameWithLengthMoreThanTwentyCharacters';
export const wrongDataName = "111";

// LastName
export const validLastName = "Dou";
export const invalidShortLastName = faker.name.firstName().substring(0, 1);
export const invalidLongLastName = 'LongLastNameWithLengthMoreThanTwentyCharacters';
export const wrongDataLastName = "111";

// Email
export const validEmail = `aqa-${faker.internet.email()}`;
export const invalidEmail = 'notAValidEmail';
export const wrongDataEmail = "111";

// Password
export const validPassword = 'ValidPass123';
export const anotherValidPassword = 'newValidPass123';
export const invalidPassword = 'short';

// Expected validation massages
export const expectedValidationMassagesWrongLength = ['Name has to be from 2 to 20 characters long', 'Last name has to be from 2 to 20 characters long'];
export const expectedErrorMessagesWhenPasswordsDoNotMatch = 'Passwords do not match';
export const expectedErrorMessagesWrongData = ['Name is invalid', 'Last name is invalid', 'Email is incorrect'];
export const expectedErrorMessagesForPasswordWrongData = 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter';
export const expectedErrorMessagesEmptyFields = ['Name required', 'Last name required', 'Email required', 'Password required', 'Re-enter password required'];