import {expect} from '@playwright/test';
import {test} from "../../../../src/fixtures/test.fixture";
import {config} from "../../../../config/config";
import {VALID_BRANDS_RESPONSE_BODY} from "../../../../src/data/dict/brands";
import {brandIdAudi, modelIdAudi} from "../../../../src/data/dict/carData";

let client: {
    cars: {
        getCarBrands: () => any;
        getCarBrandById: (arg0: number) => any;
        getCarModels: () => any;
        getCarModelById: (arg0: number) => any;
        getCurrentUserCars: () => any;
        getCurrentUserCarById: () => any;
    };
};
test.beforeEach(async ({clientWithUser}) => {
    client = await clientWithUser(config.userCredentials);
})
test.describe("API", () => {
    test('Should gets car brands @smoke @regression', async () => {
        const response = await client.cars.getCarBrands();
        const body = response.data;

        expect(response.status, "Status code should be 200").toEqual(200);
        expect(body.status).toBe("ok");
        expect(body, "Valid brands should be returned").toEqual(VALID_BRANDS_RESPONSE_BODY);
    })
    test('Should gets car brand by id @smoke @regression', async () => {
        const response = await client.cars.getCarBrandById(brandIdAudi);
        const body = response.data;

        expect(response.status, "Status code should be 200").toEqual(200);
        expect(body.status).toBe("ok");
    })
    test('Should gets car models @smoke @regression', async () => {
        const response = await client.cars.getCarModels();
        const body = response.data;

        expect(response.status, "Status code should be 200").toEqual(200);
        expect(body.status).toBe("ok");
    })
    test('Should gets car model by id @smoke @regression', async () => {
        const response = await client.cars.getCarModelById(modelIdAudi);
        const body = response.data;

        expect(response.status, "Status code should be 200").toEqual(200);
        expect(body.status).toBe("ok");
    })
    test('Should gets current user cars @smoke @regression', async () => {
        const response = await client.cars.getCurrentUserCars();
        const body = response.data;

        expect(response.status, "Status code should be 200").toEqual(200);
        expect(body.status).toBe("ok");
    })
    test('Should gets current user car by id @smoke @regression', async () => {
        const response = await client.cars.getCurrentUserCarById();
        const body = response.data;

        expect(response.status, "Status code should be 200").toEqual(200);
        expect(body.status).toBe("ok");
    })
})