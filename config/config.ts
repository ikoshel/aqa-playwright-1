import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
    baseURL: process.env.BASE_URL,
    httpCredentials: {
        username: process.env.HTTP_CREDENTIALS_USERNAME,
        password: process.env.HTTP_CREDENTIALS_PASSWORD,
    },
    email: process.env.EMAIL,
    password: process.env.PASSWORD,
    testomatIO: process.env.TESTOMATIO,
    authorizationToken: process.env.AUTHORIZATION_TOKEN
}