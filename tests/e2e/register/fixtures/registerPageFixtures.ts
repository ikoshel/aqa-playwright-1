import faker from 'faker';

// Name
export const validName: string = "John";
export const invalidShortName: string = faker.name.firstName().substring(0, 1);
export const invalidLongName: string = 'LongNameWithLengthMoreThanTwentyCharacters';
export const wrongDataName: string = "111";

// LastName
export const validLastName: string = "Dou";
export const invalidShortLastName: string = faker.name.firstName().substring(0, 1);
export const invalidLongLastName: string = 'LongLastNameWithLengthMoreThanTwentyCharacters';
export const wrongDataLastName: string = "111";

// Email
export const validEmail: string = `aqa-${faker.internet.email()}`;
export const invalidEmail: string = 'notAValidEmail';
export const wrongDataEmail: string = "111";

// Password
export const validPassword: string = 'ValidPass123';
export const anotherValidPassword: string = 'newValidPass123';
export const invalidPassword: string = 'short';

// Expected validation massages
export const expectedValidationMassagesWrongLength: string[] = ['Name has to be from 2 to 20 characters long', 'Last name has to be from 2 to 20 characters long'];
export const expectedErrorMessagesWhenPasswordsDoNotMatch: string = 'Passwords do not match';
export const expectedErrorMessagesWrongData: string[] = ['Name is invalid', 'Last name is invalid', 'Email is incorrect'];
export const expectedErrorMessagesForPasswordWrongData: string = 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter';
export const expectedErrorMessagesEmptyFields: string[] = ['Name required', 'Last name required', 'Email required', 'Password required', 'Re-enter password required'];