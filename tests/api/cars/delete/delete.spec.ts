import {test} from "../../../../src/fixtures/test.fixture";
import {carDataAudi} from "../../../../src/data/dict/carData";
import {expect} from "@playwright/test";
import APIClient from "../../../../src/client/APIClient";
import {getRoleData} from "../../../../src/data/dict/userData";
import {Role} from "../../../../src/data/roles";

let client: APIClient;
let idCar: number;
test.beforeAll(async () => {
    client = await APIClient.authenticate(undefined, getRoleData(Role.User));
    const response = await client.cars.createNewCar(carDataAudi);
    idCar = response.data.data.id;
})
test.describe("API DELETE", () => {
    test.describe("Positive tests", () => {
        test('Should delete existing cars @smoke @regression', async () => {
            const response = await client.cars.deleteCar(idCar);
            expect(response.status, "Status code should be 200").toEqual(200);
        })
    })
    test.describe("Negative tests", () => {
        test('Should not delete non-existing car @smoke @regression', async () => {
            const response = await client.cars.deleteCar(999);
            const body = response.data;

            expect(response.status, "Status code should be 404").toEqual(404);
            expect(body.status).toBe("error");
            expect(body.message, "Error message should be 'Car not found'").toEqual("Car not found");
        })
    })
})