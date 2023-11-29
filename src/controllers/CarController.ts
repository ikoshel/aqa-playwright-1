import BaseController from "./BaseController.js";
import {ICarData} from "../data/types/types";
import {expect} from "@playwright/test";
import {carDataAudi} from "../data/dict/carData";

export default class CarController extends BaseController {

    private readonly GET_CAR_BRANDS_PATH: string = '/cars/brands';
    private readonly GET_CAR_BRAND_BY_ID_PATH: string = '/cars/brands/';
    private readonly GET_CAR_MODELS_PATH: string = '/cars/models';
    private readonly GET_CAR_MODEL_BY_ID_PATH: string = '/cars/models/';
    private readonly GET_CURRENT_USER_CARS_PATH: string = '/cars';
    private readonly CREATE_CAR_PATH: string = '/cars';
    private readonly GET_CURRENT_USER_CAR_BY_ID_PATH: string = '/cars/';
    private readonly EDIT_EXISTING_CAR_PATH: string = '/cars/#';
    private readonly DELETE_USER_CARS_PATH: string = '/cars/';

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

    async getCurrentUserCars() {
        return this._client.get(this.GET_CURRENT_USER_CARS_PATH);
    }

    async createNewCar({carBrandId, carModelId, mileage = 123}: ICarData) {
        return this._client.post(this.CREATE_CAR_PATH, {
            carBrandId,
            carModelId,
            mileage
        });
    }

    async getCurrentUserCarById() {
        const response = await this.createNewCar(carDataAudi);
        const id = response.data.data.id;
        return this._client.get(this.GET_CURRENT_USER_CAR_BY_ID_PATH.replace('#', id));
    }

    async editExistingCar(carData: ICarData) {
        const response = await this.createNewCar(carDataAudi);
        return this._client.put(this.EDIT_EXISTING_CAR_PATH.replace('#', response.data.data.id), carData);
    }

    async deleteCar(id: number) {
        return this._client.delete(`${this.DELETE_USER_CARS_PATH}${id}`);
    }

    async deleteCarList() {
        // create car
        await this.createNewCar(carDataAudi);

        // get cars id
        const response = await this.getCurrentUserCars();
        const objCarsID = response.data.data;

        if (objCarsID && objCarsID.length) {
            const arrayCarsID = objCarsID.map((objResponse: { id: number; }) => objResponse.id);
            // delete current cars from list
            await Promise.all(arrayCarsID.map(async (id) => {
                const deleteResponse = await this.deleteCar(id);
                expect.soft(deleteResponse.status, "Status code should be 200").toEqual(200);
            }));
        } else {
            console.error("Car list is empty")
        }
    }
}