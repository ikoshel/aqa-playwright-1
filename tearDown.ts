import APIClient from "./src/client/APIClient";
import {getRoleData} from "./src/data/dict/userData";
import {Role} from "./src/data/roles";

async function tearDown() {
    // delete all cars for User role
    const client: APIClient = await APIClient.authenticate(undefined, getRoleData(Role.User));
    const response = await client.cars.getCurrentUserCars();
    const objCarsID = response.data.data;

    if (objCarsID && objCarsID.length) {
        const arrayCarsID = objCarsID.map((objResponse: { id: number; }) => objResponse.id);
        await Promise.all(arrayCarsID.map(async (id: number) => {
            await client.cars.deleteCar(id);
        }));
    } else {
        console.error("Car list is empty")
    }
}

export default tearDown;