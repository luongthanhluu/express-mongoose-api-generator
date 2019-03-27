const expressModule = require('@luongthanhluu/express-mongoose-api-generator');
const mongoose      = require('mongoose');
const Categories = mongoose.model('Categories');
const Validate = require('./validate');

const name = 'categories6';
let validate = new Validate();

/**
 * http://localhost:8080/api/example/categories6/
 */
let categoryModule1 = new expressModule.ExpressModule(name, Categories, {
    validate: validate
});

module.exports = categoryModule1.expressRouter;