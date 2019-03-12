const expressModule = require('express-modules');
const mongoose      = require('mongoose');
const Categories = mongoose.model('Categories');
const Validate = require('./validate');

const name = 'categories9';
let validate = new Validate();

/**
 * http://localhost:8080/api/example/categories6/
 * 
 * We will limit accepted fields for get list categories api (see validate.js file)
 * Other apis will accepted all fields
 */
let categoryModule1 = new expressModule.ExpressModule(name, Categories, {
    validate: validate
});

module.exports = categoryModule1.expressRouter;