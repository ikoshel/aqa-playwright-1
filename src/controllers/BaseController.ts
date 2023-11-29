import {CookieJar} from "tough-cookie";
import {wrapper} from "axios-cookiejar-support";
import axios, {AxiosInstance} from "axios";
import {config} from "../../config/config.js";

export default class BaseController {
    protected _client: AxiosInstance;
    private readonly _baseUrl: string;

    constructor({baseUrl = config.apiURL, cookies = new CookieJar()} = {}) {
        this._baseUrl = baseUrl;
        const jar = cookies;
        this._client = wrapper(axios.create({
            baseURL: this._baseUrl,
            jar,
            validateStatus: status => {
                return status < 501
            }
        }));
    }
}