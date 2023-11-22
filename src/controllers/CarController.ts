import {expect} from "@playwright/test";

export default class CarController {
    // Get cars list
    async getCarsList(page: { get: (arg0: string) => any; }) {
        try {
            const response = await page.get('/api/cars');
            let arrayCarsID: number[];
            if (response) {
                const objResponse = await response.json();
                arrayCarsID = objResponse.data.map(objResponse => objResponse.id);
            }
            return arrayCarsID;
        } catch (error) {
            console.log("Can't to get cars list. An error occurred:", error.message);
        }
    }

    // Create car
    async createCar(page: any, brand: object, model: object) {
        try {
            // @ts-ignore
            const brandId: number = brand.data[0].id;
            const modelId: number = model[brandId].data[1].id;
            const requestBody: object = {
                "carBrandId": brandId,
                "carModelId": modelId,
                "mileage": 122
            }
            return await page.post('/api/cars', {
                data: requestBody
            });
        } catch (error) {
            console.log("Can't to create a new car. An error occurred:", error.message);
        }
    }

    // Delete cars from list
    async deleteCarsFromList(page: any, brand: object, model: object) {
        try {
            await this.createCar(page, brand, model)
            const arrayCarsID = await this.getCarsList(page);
            if (arrayCarsID.length) {
                for (const id of arrayCarsID) {
                    const response = await page.delete(`/api/cars/${id}`);
                    expect.soft(response.status(), "Status code should be 200").toEqual(200);
                }
            } else {
                console.error("Car list is empty")
            }
        } catch (error) {
            console.log("Can't to delete cars from list. An error occurred:", error.message);
        }
    }
}