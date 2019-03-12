const expressModule = require('express-modules');
const mongoose = require('mongoose');
const Categories = mongoose.model('Categories');

const name = 'categories5';

/**
 * We remove create, update and delete Apis, so now we just have get list categories and get category by id Apis
 * http://localhost:8080/api/example/categories5/
 */
let categoryModule1 = new expressModule.ExpressModule(name, Categories, {
    defaultRouters: [{
        method: 'get',
        router: '', // get list
        controller: 'getList',
        validate: 'getList'
    },
    {
        method: 'get',
        router: '/:id', //get item by id
        controller: 'getById',
        validate: 'getById'
    }
        // ,
        // {
        //     method: 'post',
        //     router: '', 
        //     controller: 'create',
        //     validate: 'create'
        // },
        // {
        //     method: 'put',
        //     router: '/:id', 
        //     controller: 'update',
        //     validate: 'update'
        // },
        // {
        //     method: 'delete',
        //     router: '/:id',
        //     controller: 'deleteById',
        //     validate: 'deleteById'
        // }
    ]
});

module.exports = categoryModule1.expressRouter;