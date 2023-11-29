import {expect} from '@playwright/test';
import {test} from "../../../../src/fixtures/test.fixture";
import {config} from "../../../../config/config";
import {carDataAudi} from "../../../../src/data/dict/carData";
import {ICarData} from '../../../../src/data/types/types';

let client: { cars: { createNewCar: (arg0: ICarData) => any; }; };
test.beforeEach(async ({clientWithUser}) => {
    client = await clientWithUser(config.userCredentials);
})

test.describe("API", () => {
    test('Should create a new car @smoke @regression', async () => {
        const response = await client.cars.createNewCar(carDataAudi);
        const body = response.data;

        expect(response.status, "Status code should be 201").toEqual(201);
        expect(body.status).toBe("ok");
    })
})