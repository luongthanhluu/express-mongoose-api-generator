const expressModule = require('express-modules');
const mongoose      = require('mongoose');
const Categories = mongoose.model('Categories');

const name = 'categories10';
/**
 * Methods: GET, POST, PUT, DELETE
 * url: http://localhost:8080/api/example/categories10/
 * 
 * this will auto generate Apis:
 *  GET http://localhost:8080/api/example/categories1?[param1=abc&param2=xyz]/  // get list items with params
 *  GET http://localhost:8080/api/example/categories1/:id  // get an item with id
 *  POST http://localhost:8080/api/example/categories1/   // for create new item
 *  PUT http://localhost:8080/api/example/categories1/:id   // for update an item with id
 *  DELETE http://localhost:8080/api/example/categories1/:id  // for delete an item with id
 *  
 */
let categoryModule1 = new expressModule.ExpressModule(name, Categories, {
    result: {
        statusCodeSuccess: 200,  // default value is 200
        dataFieldName: 'value', //default value is 'data',
        statusCodeError: 400, //default value is 400
        hardCodeResult: 200, // it will force for all response return header status 200 
    }
});

module.exports = categoryModule1.expressRouter;