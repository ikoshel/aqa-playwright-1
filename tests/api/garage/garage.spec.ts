import {test} from '../../../src/fixtures/test.fixture';
import {expect} from "@playwright/test";
import CarController from "../../../src/controllers/CarController";
import {VALID_BRANDS_RESPONSE_BODY} from "../../../src/data/dict/brands";
import {VALID_BRAND_MODELS} from "../../../src/data/dict/models";
import {INVALID_BRANDS_RESPONSE_BODY} from "./fixtures/brandsWithInvalidData";

let carController: CarController;

test.describe("API", () => {
    test.beforeAll(() => {
        carController = new CarController();
    });
    test.describe('Positive tests for Garage API requests', () => {
        test.only('Should create new cars @smoke @regression', async ({userAPIClient}) => {
            const response = await carController.createCar(userAPIClient, VALID_BRANDS_RESPONSE_BODY, VALID_BRAND_MODELS);

            await expect(response, "Positive response should be returned").toBeOK();
            expect(response.status(), "Status code should be 201").toEqual(201);
        });
        test('Should delete cars @smoke @regression', async ({userAPIClient}) => {
            await carController.deleteCarsFromList(userAPIClient, VALID_BRANDS_RESPONSE_BODY, VALID_BRAND_MODELS);
        });
    })
    test.describe('Negative tests for Garage API requests', () => {
        test('Should not create cars with invalid brand or model data @smoke @regression', async ({userAPIClient}) => {
            const response = await carController.createCar(userAPIClient, INVALID_BRANDS_RESPONSE_BODY, VALID_BRAND_MODELS);

            expect(response.status(), "Should fail with 404 Bad Request").toEqual(404);
            expect(response.json().message, "Error message must be 'Brand not found'").toEqual("Brand not found");
        });
        test('Should not create cars with invalid userAPIClient @smoke @regression', async () => {
            const response = await carController.createCar(null, VALID_BRANDS_RESPONSE_BODY, VALID_BRAND_MODELS);

            expect(response.status(), "Should fail with 401 Unauthorized").toEqual(401);
            expect(response.json().message, "Error message must be 'Not authenticated'").toEqual("Not authenticated");
        });
    })
})
