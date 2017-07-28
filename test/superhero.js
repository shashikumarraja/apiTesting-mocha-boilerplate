//Constains the test-cases 

const mocha = require('mocha');
const should = require('should');
const supertest = require('supertest');
const apiEndPointHelper = require('../helper/api_endpoints.js');
const testData = require('../helper/test_data.js');
const validator = require('../helper/validators.js');
const apiHelper = require('../helper/api_helper.js');

let baseUrl = apiEndPointHelper.baseUrl;
let apiEndPoint = apiEndPointHelper.superheroApiEndPoint;
let idOfFirstSuperhero = '1';

describe('Superhero Api Suite', function () {
    describe('GET Request', function () {
        it('Should Get Superhero', async function () {
            let res = await apiHelper.sendGETRequest(baseUrl, apiEndPoint + idOfFirstSuperhero);
            console.log(res.body);
            res.status.should.equal(200);
            validator.dataTypeValidator(res);
        });
    });
    describe('POST Request', function () {
        let name = testData.name;
        let fName = testData.fName;
        let lName = testData.lName;
        let age = testData.age;
        let powers = testData.powers;
        let killer = testData.killerFalse;
        let idOfCreatedSuperhero;

        it('Should Create Superhero', async function () {
            let requestBody = getRequestBody(name, fName, lName, age, powers, killer)
            let res = await apiHelper.sendPOSTRequest(baseUrl, apiEndPoint, requestBody);
            console.log(res.body);
            validator.dataTypeValidator(res);
            res.status.should.equal(201);
            idOfCreatedSuperhero = res.body.id;
        });

        //Verify the details of created superhero
        after(async function () {
            let res = await apiHelper.sendGETRequest(baseUrl, apiEndPoint + idOfCreatedSuperhero);
            console.log(res.body);
            res.status.should.equal(200);
            validator.dataTypeValidator(res);
            validator.dataValidator(res, name, fName, lName, age, powers, killer);
        });
    });
    describe('PUT Request', function () {
        let name = testData.name;
        let fName = testData.fName;
        let lName = testData.lName;
        let age = testData.age;
        let powers = testData.powers;
        let killerNew = testData.killerTrue;
        let killerOld = testData.killerFalse;
        let idOfCreatedSuperhero;

        //Create a new Superhero
        before(async function () {
            let requestBody = getRequestBody(name, fName, lName, age, powers, killerOld)
            let res = await apiHelper.sendPOSTRequest(baseUrl, apiEndPoint, requestBody);
            console.log(res.body);
            res.status.should.equal(201);
            idOfCreatedSuperhero = res.body.id;
        });

        //Modify the created superhero details
        it('Should Update Superhero', async function () {
            let requestBody = getRequestBody(name, fName, lName, age, powers, killerNew)
            let res = await apiHelper.sendPUTRequest(baseUrl, apiEndPoint + idOfCreatedSuperhero, requestBody);
            console.log(res.body);
            res.status.should.equal(200);
            validator.dataTypeValidator(res);
        });

        //Verify the modifications made
        after(async function () {
            let res = await apiHelper.sendGETRequest(baseUrl, apiEndPoint + idOfCreatedSuperhero);
            console.log(res.body);
            res.status.should.equal(200);
            validator.dataValidator(res, name, fName, lName, age, powers, killerNew);
            validator.dataTypeValidator(res);
        });


    });
    describe('DELETE Request', function () {
        let name = testData.name;
        let fName = testData.fName;
        let lName = testData.lName;
        let age = testData.age;
        let powers = testData.powers;
        let killer = testData.killerFalse;
        let idOfCreatedSuperhero;

        //Create a new superhero
        before(async function () {
            let requestBody = getRequestBody(name, fName, lName, age, powers, killer);
            let res = await apiHelper.sendPOSTRequest(baseUrl, apiEndPoint, requestBody);
            console.log(res.body);
            res.status.should.equal(201);
            idOfCreatedSuperhero = res.body.id;
        });

        //Delete the created superhero
        it('Should Delete Superhero', async function () {
            let res = await apiHelper.sendDELETERequest(baseUrl, apiEndPoint + idOfCreatedSuperhero);
            console.log(res.body);
            res.status.should.equal(200);
        });

        //Verify that the superhero has been deleted
        after(async function () {
            let res = await apiHelper.sendGETRequest(baseUrl, apiEndPoint + idOfCreatedSuperhero);
            console.log(res.body);
            res.status.should.equal(404);
        });

    });
});
var getRequestBody = function (name, fName, lName, age, powers, killer) {
    return {
        "name": name,
        "fName": fName,
        "lName": lName,
        "age": age,
        "powers": powers,
        "killer": killer
    }
};
