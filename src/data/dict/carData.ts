import {ICarData} from "../types/types";
import {VALID_BRANDS_RESPONSE_BODY} from "./brands";
import {VALID_BRAND_MODELS} from "./models";

export const brandIdAudi: number = VALID_BRANDS_RESPONSE_BODY.data[0].id;
export const brandIdFord: number = VALID_BRANDS_RESPONSE_BODY.data[2].id;
export const modelIdAudi: number = VALID_BRAND_MODELS[brandIdAudi].data[1].id;

export const carDataAudi: ICarData = {
    carBrandId: brandIdAudi,
    carModelId: modelIdAudi,
    mileage: 555
}

export const carDataFord: ICarData = {
    carBrandId: brandIdFord,
    carModelId: VALID_BRAND_MODELS[brandIdFord].data[1].id,
    mileage: 999
}