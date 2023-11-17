import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
    baseURL: process.env.BASE_URL,
    httpCredentials: {
        username: process.env.HTTP_CREDENTIALS_USERNAME,
        password: process.env.HTTP_CREDENTIALS_PASSWORD,
    },
    userCredentials: {
        email: process.env.EMAIL_USER,
        password: process.env.PASSWORD_USER,
    },
    managerCredentials: {
        email: process.env.EMAIL_MANAGER,
        password: process.env.PASSWORD_MANAGER,
    },
    reporters: {
        testomat: {
            key: process.env.TESTOMATIO
        }
    },
    authorizationToken: process.env.AUTHORIZATION_TOKEN
}