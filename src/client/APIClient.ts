import AuthController from "../controllers/AuthController";
import CarController from "../controllers/CarController";
import {config} from "../../config/config";
import {CookieJar} from "tough-cookie";
import {IUserData} from "../data/types/types";

class APIClient {
    auth: AuthController;
    cars: CarController;

    constructor(options) {
        this.auth = new AuthController(options);
        this.cars = new CarController(options);
    }

    static async authenticate(options = {baseURL: config.apiURL}, userData: IUserData) {
        const jar = new CookieJar();
        await new AuthController({...options, cookies: jar}).signIn(userData);
        return new APIClient({...options, cookies: jar});
    }
}

export default APIClient;