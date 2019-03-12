const expressModule = require('express-modules');
const mongoose      = require('mongoose');
const Categories = mongoose.model('Categories');

const name = 'categories4';

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
 * http://localhost:8080/api/example/categories4/
 */
const categoryModule = new expressModule.ExpressModule(name, Categories, {
    controller: controller,
    appendPriorityRouters: [{
        method: 'get',
        router: '/testNewRoute',  // we have /:id already, so we need push new route to appendPriorityRouters, so it will have highter priority
        controller: 'newFunction',
        validate: null
    }]
});

module.exports = categoryModule.expressRouter;