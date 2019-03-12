const expressModule = require('express-modules');
const mongoose      = require('mongoose');
const Categories = mongoose.model('Categories');

const name = 'categories2';

/**
 * http://localhost:8080/api/example/categories2/
 */

let categoryModule = new expressModule.ExpressModule(name, Categories, {
    appendRouters: [{
        method: 'get',
        router: '/:id/testNewRoute',
        controller: 'getById',
        validate: 'getById'
    }],
    appendPriorityRouters: [{
        method: 'get',
        router: '/testNewRoute',  // we have /:id already, so we need push new route to appendPriorityRouters, so it will have highter priority
        controller: 'getById',
        validate: 'getById'
    }]
});

// we also can insert new route by this way (but it will have low priority, so if we had /:id/:abcd, /:id/testNewRoute would nerver work) :
// categoryModule.router.createRouter({
//     method: 'get',
//     router: '/:id/testNewRoute',
//     controller: 'getById',
//     validate: 'getById'
// })

module.exports = categoryModule.expressRouter;