import axios from "axios";

export default class UserController {
    // Get user ID
    async getUserId(email: string, password: string): Promise<string> {
        try {
            const url: string = `${process.env.BASE_API_URL}/api/auth/signin`;
            const body: object = {email, password};
            const headers: object = {
                headers: {
                    authorization: process.env.AUTHORIZATION_TOKEN,
                    'content-type': 'application/json',
                },
                withCredentials: true,
            };
            const response = await axios.post(url, body, headers);
            const cookies: string[] = response.headers['set-cookie'];
            return cookies[0].split(';')[0];
        } catch (error) {
            console.log("Can't to login to get user ID. An error occurred:", error.message);
        }
    }

    // Delete user by ID
    async deleteUserById(email: string, password: string): Promise<void> {
        try {
            const url: string = `${process.env.BASE_API_URL}/api/users`;
            const headers: object = {
                headers: {
                    authorization: process.env.AUTHORIZATION_TOKEN,
                    cookie: await this.getUserId(email, password),
                },
            };
            await axios.delete(url, headers);
        } catch (error) {
            console.log("Can't to delete user by ID. An error occurred:", error.message);
        }
    }
}