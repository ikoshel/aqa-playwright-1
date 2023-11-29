import {test} from '../../../src/fixtures/test.fixture';
import {expect} from "@playwright/test";
import {VALID_BRANDS_RESPONSE_BODY} from "../../../src/data/dict/brands";
import axios, {AxiosInstance} from "axios";
import {config} from "../../../config/config";
import {wrapper} from 'axios-cookiejar-support';
import {CookieJar} from 'tough-cookie';

let client: AxiosInstance;
test.beforeAll(async () => {
    const jar = new CookieJar();
    client = wrapper(axios.create({
        baseURL: config.apiURL,
        jar,
        validateStatus: status => {
            return status < 501
        }
    }));

    await client.post('/auth/signin', {
        "email": config.userCredentials.email,
        "password": config.userCredentials.password,
        "remember": false
    })
})

test.describe("API", () => {
    test.describe('Positive tests for Garage API requests', () => {
        for (const brand of VALID_BRANDS_RESPONSE_BODY.data) {
            test(`Should return valid models for ${brand.title} brand @smoke @regression`, async () => {
                const brandId = brand.id
                const response = await client.get(`/cars/models?carBrandId=${brandId}`)
                expect(response.status, "Status code should be 200").toEqual(200)
            })
        }
    })
    test.describe('Negative tests for Garage API requests', () => {
        test('Should not allow retrieval of cars list without proper authorization @smoke @regression', async () => {
            const jar = new CookieJar();
            const clientUnAuth = wrapper(axios.create({
                baseURL: config.apiURL,
                jar,
                validateStatus: status => {
                    return status < 501
                }
            }));

            const response = await clientUnAuth.get('/cars');
            expect(response.status, "Status code should be 401").toEqual(401);
            expect(response.data.message, "Error message should be 'Not authenticated'").toEqual("Not authenticated");
        });
        test(`Should not find models for nonexistent brand @smoke @regression`, async () => {
            const brandId = -1;
            const response = await client.get(`/cars/models?carBrandId=${brandId}`);
            expect(response.status, "Status code should be 404").toEqual(404);
            expect(response.data.message, "Error message should be 'No car models found'").toEqual("No car models found");
        });
        test('Should not allow creation of car brand with invalid data @smoke @regression', async () => {
            const requestBody: object = {};
            const response = await client.post('/cars', requestBody);
            expect(response.status, "Status code should be 400").toEqual(400);
            expect(response.data.message, "Error message should be 'Car brand id is required'").toEqual("Car brand id is required");
        });
        test('Should not allow retrieval of nonexistent car details @smoke @regression', async () => {
            const carId: number = -1;
            const response = await client.get(`/cars/${carId}`);
            expect(response.status, 'Status code should be 404').toEqual(404);
            expect(response.data.message, "Error message should be 'Car not found'").toEqual("Car not found");
        });
    });
})
