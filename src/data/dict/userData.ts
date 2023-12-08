import {config} from "../../../config/config";
import {Role} from "../roles";

export const data = {
    userData: {
        "email": config.userCredentials.email,
        "password": config.userCredentials.password,
        "remember": false
    },
    managerData: {
        "email": config.managerCredentials.email,
        "password": config.managerCredentials.password,
        "remember": false
    },
    invalidUserData: {
        "email": `test${Date.now()}@test.com`,
        "password": config.managerCredentials.password,
        "remember": false
    }
}

export function getRoleData(role: Role) {
    switch (role) {
        case Role.User:
            return data.userData;
        case Role.Manager:
            return data.managerData;
        default:
            throw new Error(`No data for role ${role}`);
    }
}