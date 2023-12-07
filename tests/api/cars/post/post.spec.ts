import {expect} from '@playwright/test';
import {test} from "../../../../src/fixtures/test.fixture";
import {carDataAudi} from "../../../../src/data/dict/carData";
import APIClient from "../../../../src/client/APIClient";
import {getRoleData} from "../../../../src/data/dict/userData";
import {Role} from "../../../../src/data/roles";

let client: APIClient;
let idCar: number;
test.beforeAll(async () => {
    client = await APIClient.authenticate(undefined, getRoleData(Role.User));
})
test.afterAll(async () => {
    await client.cars.deleteCar(idCar);
})

test.describe("API POST", () => {
    test.describe("Positive tests", () => {
        test('Should create a new car @smoke @regression', async () => {
            const response = await client.cars.createNewCar(carDataAudi);
            const body = response.data;
            idCar = body.data.id;

            expect(response.status, "Status code should be 201").toEqual(201);
            expect(body.status).toBe("ok");
        })
    })
    test.describe("Negative tests", () => {
        test('Should not create a new car with invalid brand id @smoke @regression', async () => {
            const response = await client.cars.createNewCar({...carDataAudi, carBrandId: 999});
            const body = response.data;

            expect(response.status, "Status code should be 400").toEqual(404);
            expect(body.status).toBe("error");
            expect(body.message, "Error message should be 'Brand not found'").toEqual("Brand not found");
        })
        test('Should not create a new car with invalid model id @smoke @regression', async () => {
            const response = await client.cars.createNewCar({...carDataAudi, carModelId: 999});
            const body = response.data;

            expect(response.status, "Status code should be 400").toEqual(404);
            expect(body.status).toBe("error");
            expect(body.message, "Error message should be 'Model not found'").toEqual("Model not found");
        })
        test('Should not create a new car with invalid mileage @smoke @regression', async () => {
            const response = await client.cars.createNewCar({...carDataAudi, mileage: -1});
            const body = response.data;

            expect(response.status, "Status code should be 400").toEqual(400);
            expect(body.status).toBe("error");
            expect(body.message, "Error message should be 'Mileage has to be from 0 to 999999'").toEqual("Mileage has to be from 0 to 999999");
        })
        test('Should not allow creation of car brand with invalid data @smoke @regression', async () => {
            const requestBody: object = {};
            const response = await client.cars.createNewCar(requestBody);
            expect(response.status, "Status code should be 400").toEqual(400);
            expect(response.data.message, "Error message should be 'Car brand id is required'").toEqual("Car brand id is required");
        })
    })
})