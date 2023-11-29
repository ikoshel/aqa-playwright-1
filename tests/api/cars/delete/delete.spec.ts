import {test} from "../../../../src/fixtures/test.fixture";
import {config} from "../../../../config/config";

let client: { cars: { deleteCarList: () => any; }; };
test.beforeEach(async ({clientWithUser}) => {
    client = await clientWithUser(config.userCredentials);
})
test.describe("API", () => {
    test('Should delete current user car list @smoke @regression', async () => {
        await client.cars.deleteCarList();
    })
})