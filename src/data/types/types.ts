export interface IBrand {
    id: number;
    title: string;
    logoFilename: string;
}

export interface IBrandsResponse {
    status: string;
    data: IBrand[];
}

export interface IModel {
    id: number;
    carBrandId: number;
    title: string;
}

export interface IModelsResponse {
    status: string;
    data: IModel[];
}

export interface IBrandModels {
    [brandId: number]: IModelsResponse;
}

export interface IUserData {
    email: string;
    password: string;
    remember?: boolean;
}

export interface ICarData {
    carBrandId: number;
    carModelId: number;
    mileage?: number;
}