import {expect} from '@playwright/test';
import {test} from "../../../../src/fixtures/test.fixture";
import {VALID_BRANDS_RESPONSE_BODY} from "../../../../src/data/dict/brands";
import {brandIdAudi, carDataAudi, modelIdAudi} from "../../../../src/data/dict/carData";
import APIClient from "../../../../src/client/APIClient";
import {data, getRoleData} from "../../../../src/data/dict/userData";
import {Role} from "../../../../src/data/roles";

let client: APIClient;
let idCar: number;
test.beforeAll(async () => {
    client = await APIClient.authenticate(undefined, getRoleData(Role.User));
    const response = await client.cars.createNewCar(carDataAudi);
    idCar = response.data.data.id;
})
test.afterAll(async () => {
    await client.cars.deleteCar(idCar);
})
test.describe("API GET", () => {
    test.describe("Positive tests", () => {
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
        for (const brand of VALID_BRANDS_RESPONSE_BODY.data) {
            test(`Should return valid models for ${brand.title} brand @smoke @regression`, async () => {
                const brandId = brand.id
                const response = await client.cars.getCarModelsByBrandId(brandId);
                expect(response.status, "Status code should be 200").toEqual(200)
            })
        }
        test('Should gets current user cars @smoke @regression', async () => {
            const response = await client.cars.getCurrentUserCars();
            const body = response.data;

            expect(response.status, "Status code should be 200").toEqual(200);
            expect(body.status).toBe("ok");
        })
        test('Should gets current user car by id @smoke @regression', async () => {
            const response = await client.cars.getCurrentUserCarById(idCar);
            const body = response.data;

            expect(response.status, "Status code should be 200").toEqual(200);
            expect(body.status).toBe("ok");
        })
    })
    test.describe("Negative tests", () => {
        test('Should not allow retrieval of cars list without proper authorization @smoke @regression', async () => {
            const clientUnAuth = await APIClient.authenticate(undefined, data.invalidUserData);
            const response = await clientUnAuth.cars.getCurrentUserCars();
            expect(response.status, "Status code should be 401").toEqual(401);
            expect(response.data.message, "Error message should be 'Not authenticated'").toEqual("Not authenticated");
        })
        test(`Should not find models for nonexistent brand @smoke @regression`, async () => {
            const brandId = -1;
            const response = await client.cars.getCarModelsByBrandId(brandId);
            expect(response.status, "Status code should be 404").toEqual(404);
            expect(response.data.message, "Error message should be 'No car models found'").toEqual("No car models found");
        })
        test('Should not allow retrieval of nonexistent car details @smoke @regression', async () => {
            const carId: number = -1;
            const response = await client.cars.getCurrentUserCarById(carId);
            expect(response.status, 'Status code should be 404').toEqual(404);
            expect(response.data.message, "Error message should be 'Car not found'").toEqual("Car not found");
        })
    })
})