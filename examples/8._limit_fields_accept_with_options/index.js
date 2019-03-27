const expressModule = require('@luongthanhluu/express-mongoose-api-generator');
const mongoose      = require('mongoose');
const Categories = mongoose.model('Categories');

const name = 'categories8';
/**
 * Methods: GET, POST, PUT, DELETE
 * url: http://localhost:8080/api/example/categories1/
 * 
 * this will auto generate Apis:
 *  GET http://localhost:8080/api/example/categories1?[param1=abc&param2=xyz]/  // get list items with params
 *  GET http://localhost:8080/api/example/categories1/:id  // get an item with id
 *  POST http://localhost:8080/api/example/categories1/   // for create new item
 *  PUT http://localhost:8080/api/example/categories1/:id   // for update an item with id
 *  DELETE http://localhost:8080/api/example/categories1/:id  // for delete an item with id
 *  
 * All methods will just accepted '_id', 'name' and 'isMenu'
 */
let categoryModule1 = new expressModule.ExpressModule(name, Categories, {
    acceptFields: ['_id', 'name', 'isMenu']
});

module.exports = categoryModule1.expressRouter;