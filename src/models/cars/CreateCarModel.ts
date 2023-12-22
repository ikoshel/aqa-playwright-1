export default class CreateCarModel {
    carBrandId: number;
    carModelId: number;
    mileage: number;

    constructor({carBrandId, carModelId, mileage}) {
        this.carBrandId = carBrandId
        this.carModelId = carModelId
        this.mileage = mileage
    }
}