const expressModule = require('express-modules');
const mongoose      = require('mongoose');
const Categories = mongoose.model('Categories');
const Validate = require('./validate');

const name = 'categories7';
let validate = new Validate();

/**
 * http://localhost:8080/api/example/categories7/
 */
let categoryModule1 = new expressModule.ExpressModule(name, Categories, {
    validate: validate,
    appendPriorityRouters: [{
        method: 'get',
        router: '/testNewRoute',  // we have /:id already, so we need push new route to appendPriorityRouters, so it will have highter priority
        controller: 'getList', //this is a exist function name in controller
        validate: 'getByAdmin' //new function name in validate.js
    }]
});

module.exports = categoryModule1.expressRouter;