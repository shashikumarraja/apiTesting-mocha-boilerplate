# apiTestingWithMochaBoilerPlate
Boiler Plate for getting started with Api Testing (uses fake apis created using json-server)with Mocha as test runner,should.js as assertion library, supertest.js to make HTTP requests and mochawesome as Reporter.
# How to run the Project
OS Requirement: Linux or Mac OS
Pre-requisite: Node.js version >= 7

a. Clone or download the project directory
b. Traverse to the downloaded/clonned project directory and install dependencies and run json-server:
   cd apiTestingWithMochaBoilerPlate
   npm install
   cd json-server
   npm install -g json-server
   json-server --watch db.json
c. Now in separate tab of the terminal
   cd apiTestingWithMochaBoilerPlate
   npm test
d. Once the tests are run, check the report inside mochawesome-report folder in project directory
Note: Make sure that json-server is running when you run the tests else you won't be able to access the fake apis
