import BaseController from "./BaseController.js";
import {ICarData} from "../data/types/types";

export default class CarController extends BaseController {

    private readonly GET_CAR_BRANDS_PATH: string = '/cars/brands';
    private readonly GET_CAR_BRAND_BY_ID_PATH: string = '/cars/brands/';
    private readonly GET_CAR_MODELS_PATH: string = '/cars/models';
    private readonly GET_CAR_MODEL_BY_ID_PATH: string = '/cars/models/';
    private readonly GET_CURRENT_USER_CARS_PATH: string = '/cars';
    private readonly CREATE_CAR_PATH: string = '/cars';
    private readonly GET_CURRENT_USER_CAR_BY_ID_PATH: string = '/cars/';
    private readonly EDIT_EXISTING_CAR_PATH: string = '/cars/';
    private readonly DELETE_USER_CARS_PATH: string = '/cars/';
    private readonly GET_CAR_MODELS_BY_BRAND_ID: string = '/cars/models?carBrandId=';

    constructor(options: any) {
        super(options);
    }

    async getCarBrands() {
        return this._client.get(this.GET_CAR_BRANDS_PATH);
    }

    async getCarBrandById(brandId: number) {
        return this._client.get(`${this.GET_CAR_BRAND_BY_ID_PATH}${brandId}`);
    }

    async getCarModels() {
        return this._client.get(this.GET_CAR_MODELS_PATH);
    }

    async getCarModelById(modelId: number) {
        return this._client.get(`${this.GET_CAR_MODEL_BY_ID_PATH}${modelId}`);
    }

    async getCarModelsByBrandId(brandId: number) {
        return this._client.get(`${this.GET_CAR_MODELS_BY_BRAND_ID}${brandId}`);
    }

    async getCurrentUserCars() {
        return this._client.get(this.GET_CURRENT_USER_CARS_PATH);
    }

    async createNewCar(carData: ICarData | object) {
        return this._client.post(this.CREATE_CAR_PATH, carData);
    }

    async getCurrentUserCarById(idCar: number) {
        return this._client.get(`${this.GET_CURRENT_USER_CAR_BY_ID_PATH}${idCar}`);
    }

    async editExistingCar(idCar: number, carData: ICarData | object) {
        return this._client.put(`${this.EDIT_EXISTING_CAR_PATH}${idCar}`, carData);
    }

    async deleteCar(idCar: number) {
        return this._client.delete(`${this.DELETE_USER_CARS_PATH}${idCar}`);
    }
}