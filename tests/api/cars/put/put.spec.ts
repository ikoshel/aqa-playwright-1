import {expect} from '@playwright/test';
import {test} from "../../../../src/fixtures/test.fixture";
import {carDataAudi, carDataFord} from "../../../../src/data/dict/carData";
import APIClient from "../../../../src/client/APIClient";
import {getRoleData} from "../../../../src/data/dict/userData";
import {Role} from "../../../../src/data/roles";
import UpdateCarModel from "../../../../src/models/cars/UpdateCarModel";
import {VALID_BRANDS_RESPONSE_BODY} from "../../../../src/data/dict/brands";
import {VALID_BRAND_MODELS} from "../../../../src/data/dict/models";

let client: APIClient;
let idCar: number;
test.beforeAll(async () => {
    client = await APIClient.authenticate(getRoleData(Role.User));
    const response = await client.cars.createNewCar(carDataAudi);
    idCar = response.data.data.id;
})
test.afterAll(async () => {
    await client.cars.deleteCar(idCar);
})

test.describe("API PUT", () => {
    test.describe("Positive tests", () => {
        test('Should edit existing car @smoke @regression', async () => {
            const updatedCarModel = new UpdateCarModel({carBrandId: 3, carModelId: 12, mileage: 999});
            const updatedBrand = VALID_BRANDS_RESPONSE_BODY.data.find((brand) => brand.id === updatedCarModel.carBrandId);
            const updatedModel = VALID_BRAND_MODELS[updatedBrand.id].data.find((model)=> model.id === updatedCarModel.carModelId);
            const expectedBody = {
                ...updatedCarModel,
                initialMileage: carDataAudi.mileage,
                id: idCar,
                carCreatedAt: expect.any(String),
                updatedMileageAt: expect.any(String),
                brand: updatedBrand.title,
                model: updatedModel.title,
                logo: updatedBrand.logoFilename
            }
            const response = await client.cars.editExistingCar(idCar, carDataFord);
            const body = response.data;

            expect(body.data, 'Returned updated car object should be valid').toEqual(expectedBody);
            expect(response.status, "Status code should be 200").toEqual(200);
            expect(body.status).toBe("ok");
        })
    })
    test.describe("Negative tests", () => {
        test.skip('Should not edit existing car with invalid brand id @smoke @regression', async () => {
            const response = await client.cars.editExistingCar(idCar, {...carDataFord, carBrandId: 999});
            const body = response.data;

            expect(response.status, "Status code should be 404").toEqual(404);
            expect(body.status).toBe("error");
            expect(body.message, "Error message should be 'Brand not found'").toEqual("Brand not found");
        })
        test.skip('Should not edit existing car with invalid model id @smoke @regression', async () => {
            const response = await client.cars.editExistingCar(idCar, {...carDataFord, carModelId: 999});
            const body = response.data;

            expect(response.status, "Status code should be 404").toEqual(404);
            expect(body.status).toBe("error");
            expect(body.message, "Error message should be 'Model not found'").toEqual("Model not found");
        })
        test('Should not edit existing car with invalid mileage @smoke @regression', async () => {
            const response = await client.cars.editExistingCar(idCar, {...carDataFord, mileage: -1});
            const body = response.data;

            expect(response.status, "Status code should be 400").toEqual(400);
            expect(body.status).toBe("error");
            expect(body.message, "Error message should be 'New mileage is less then previous entry'").toEqual("New mileage is less then previous entry");
        })
        test('Should not edit existing car with invalid data @smoke @regression', async () => {
            const requestBody: object = {};
            const response = await client.cars.editExistingCar(idCar, requestBody);
            const body = response.data;

            expect(response.status, "Status code should be 400").toEqual(400);
            expect(body.status).toBe("error");
            expect(response.data.message, "Error message should be 'Unacceptable fields only or empty body are not allowed'").toEqual("Unacceptable fields only or empty body are not allowed");
        })
    })
})