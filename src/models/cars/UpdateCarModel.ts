export default class UpdateCarModel {
    carBrandId: number;
    carModelId: number;
    mileage: number;

    constructor({carBrandId, carModelId, mileage}) {
        this.carBrandId = carBrandId
        this.carModelId = carModelId
        this.mileage = mileage
    }
}