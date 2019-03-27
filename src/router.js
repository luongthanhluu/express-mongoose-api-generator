const express = require('express');
let expressRouter = express.Router();

class Router {
    constructor(name, controller, service, validate, options) {
        this.controller = controller;
        this.validate = validate;
        this.validateDefaultFunction = 'none';
        this.name = name;
        this.service = service;
        this.statusCodeSuccess = 200;
        this.statusCodeError = 400;
        this.expressRouter = expressRouter;

        this.dataFieldName = 'data';

        this.appendPriorityRouters = [];
        this.listDefault = options.defaultRouters || [{
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
        },
        {
            method: 'post',
            router: '', 
            controller: 'create',
            validate: 'create'
        },
        {
            method: 'put',
            router: '/:id', 
            controller: 'update',
            validate: 'update'
        },
        {
            method: 'delete',
            router: '/:id',
            controller: 'deleteById',
            validate: 'deleteById'
        }];

        this.listRouters = [];
        this.appendRouters = [];

        if(options.appendRouters) {
            this.appendRouters = options.appendRouters;
        }

        if(options.appendPriorityRouters) {
            this.appendPriorityRouters = options.appendPriorityRouters;
        }

        this.listRouters = this.appendPriorityRouters.concat(this.listDefault).concat(this.appendRouters);

        if(options.result) {
            if(options.result.statusCodeSuccess){
                this.statusCodeSuccess = options.result.statusCodeSuccess;
            }

            if(options.result.statusCodeError){
                this.statusCodeError = options.result.statusCodeError;
            }

            if(options.result.dataFieldName){
                this.dataFieldName = options.result.dataFieldName;
            }

            if(options.result.hardCodeResult){
                this.hardCodeResult = options.result.hardCodeResult;
            }
        }

        if(options.acceptFields) {
            this.acceptFields = options.acceptFields;
        }
    }

    setName(name) {
        this.name = name;
    }

    setController(controller) {
        this.controller = controller;
    }

    setValidate(validate) {
        this.validate = validate;
    }

    createDefaultRouter() {
        this.listRouters.forEach(r => {
            this.createRouter(r);
        })

        return expressRouter;
    }

    createRouter(r) {
        const service = this.service;
        const validate = this.validate;
        const controller = this.controller;
        const acceptFields = this.acceptFields;
        const validateDefaultFunction = this.validateDefaultFunction;

        let resultConstructor = {
            statusCodeSuccess: this.statusCodeSuccess,
            statusCodeError: this.statusCodeError,
            dataFieldName: this.dataFieldName,
            hardCodeResult: this.hardCodeResult
        }

        const router = '/' + this.name + r.router;
        expressRouter[r.method](router, (req, res, next) => {
            req.service = service;
            req.resultConstructor = resultConstructor;
            req.acceptFields = acceptFields;
            
            next();
        }, validate[r.validate || validateDefaultFunction](), controller[r.controller]());
    }
}

module.exports = Router;