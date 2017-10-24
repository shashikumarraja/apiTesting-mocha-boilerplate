const supertest = require('supertest');


exports.sendGETRequest = async (baseUrl, apiEndPoint) => {
    try {
        let res = await supertest(baseUrl).get(apiEndPoint).retry(2)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json');
        return res;
    } catch (err) {
        console.log('Error in sending GET Request: ', err);
    }
};
exports.sendPOSTRequest = async (baseUrl, apiEndPoint, requestBody) => {
    try {
        let res = await supertest(baseUrl).post(apiEndPoint).retry(2)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(requestBody);
        return res;
    } catch (err) {
        console.log('Error in sending POST Request: ', err);
    }
};
exports.sendPUTRequest = async (baseUrl, apiEndPoint, requestBody) => {
    try {
        let res = await supertest(baseUrl).put(apiEndPoint).retry(2)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(requestBody);
        return res;
    } catch (err) {
        console.log('Error in sending PUT Request: ', err);
    }
};
exports.sendDELETERequest = async (baseUrl, apiEndPoint) => {
    try {
        let res = await supertest(baseUrl).delete(apiEndPoint).retry(2)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json');
        return res;
    } catch (err) {
        console.log('Error in sending DELETE Request: ', err);
    }
};
