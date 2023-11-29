import {expect} from '@playwright/test';
import {test} from "../../../../src/fixtures/test.fixture";
import {config} from "../../../../config/config";
import {carDataFord} from "../../../../src/data/dict/carData";
import {ICarData} from '../../../../src/data/types/types';

let client: { cars: { editExistingCar: (arg0: ICarData) => any; }; };
test.beforeEach(async ({clientWithUser}) => {
    client = await clientWithUser(config.userCredentials);
})

test.describe("API", () => {
    test('Should edit existing car @smoke @regression', async () => {
        const response = await client.cars.editExistingCar(carDataFord);
        const body = response.data;

        expect(response.status, "Status code should be 200").toEqual(200);
        expect(body.status).toBe("ok");
    })
})