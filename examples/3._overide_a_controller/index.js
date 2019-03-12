const expressModule = require('express-modules');
const mongoose      = require('mongoose');
const Categories = mongoose.model('Categories');

const name = 'categories3';

/**
 * Import new controller 
 */
let Controller = require('./controller');

/**
 * Define controller with name and model
 */
let controller = new Controller(name, Categories);

/**
 * add the controller to options when create new module
 * http://localhost:8080/api/example/categories3/
 */
const categoryModule3 = new expressModule.ExpressModule(name, Categories, {
    controller: controller
});

module.exports = categoryModule3.expressRouter;