import axios from 'axios';

async function postApi(url: string, data: object, headers: object) {
    try {
        const response = await axios.post(url, data, headers);
        if (response.status !== 200) {
            throw new Error(`Error in POST request, status code: ${response.status}`);
        }
        return response;
    } catch (error) {
        console.log("An error occurred:", error.message);
    }
}

async function deleteApi(url: string, headers: object) {
    try {
        await axios.delete(url, headers);
    } catch (error) {
        console.log("An error occurred:", error.message);
    }
}

export {postApi, deleteApi};