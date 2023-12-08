import BaseController from "./BaseController.js";
import {IUserData} from "../data/types/types";

export default class AuthController extends BaseController {
    private readonly SIGN_IN_PATH: string = '/auth/signin';
    private readonly SIGN_UP_PATH: string = '/auth/signup';

    constructor(options: any) {
        super(options);
    }

    async signUp(userData: object) {
        return this._client.post(this.SIGN_UP_PATH, userData);
    }

    async signIn({email, password, remember = false}: IUserData) {
        return this._client.post(this.SIGN_IN_PATH, {
            email,
            password,
            remember
        });
    }
}