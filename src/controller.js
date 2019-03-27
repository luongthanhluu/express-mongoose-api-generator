const Promise = require('promise');
const Service = require('./service');

class Controller {
    constructor(name, model) {
        this.name = name;
        this.service = new Service(name, model);
        this.fields = [];
    }

    getList() {
        return async (req, res, next) => {
            if(!req.acceptFields) req.acceptFields = [];

            let params = {};
            const acceptFields = {};
            if(req.acceptFields.length) {

                req.acceptFields.forEach(field => {
                    acceptFields[field] = 1;
                    if(req.query[field]) {
                        params[field] = req.query[field];
                    }
                });
            }
            else{
                params = req.query;
                console.log(params)
            }

            const results = await Promise.all([req.service.find(params, acceptFields), req.service.count(params)]).catch((err) => {
                res.status(req.resultConstructor.hardCodeResult || req.resultConstructor.statusCodeError).send({
                    code: req.resultConstructor.statusCodeError,
                    message: err
                })
            });
            
            res.status(req.resultConstructor.hardCodeResult || req.resultConstructor.statusCodeSuccess).send({
                code: req.resultConstructor.statusCodeSuccess,
                [req.resultConstructor.dataFieldName]: {
                    items: results[0],
                    count: results[1]
                }
            });
        }
    }

    getById() {
        return async (req, res, next) => {
            if(!req.acceptFields) req.acceptFields = [];
            const id = req.params.id;
            const acceptFields = {};
            
            req.acceptFields.forEach(field => {
                acceptFields[field] = 1;
            });

            const result = await req.service.findOne({ _id: id }, acceptFields).catch((err) => {
                res.status(req.resultConstructor.hardCodeResult || req.resultConstructor.statusCodeError).send({
                    code: req.resultConstructor.statusCodeError,
                    message: err
                })
            });

            res.status(req.resultConstructor.hardCodeResult || req.resultConstructor.statusCodeSuccess).send({
                code: req.resultConstructor.statusCodeSuccess,
                [req.resultConstructor.dataFieldName]: result
            });
        }
    }

    create() {
        return async (req, res, next) => {
            if(!req.acceptFields) req.acceptFields = [];
            let data = {};
            if(req.acceptFields && req.acceptFields.length){
                const acceptFields = req.acceptFields;
                acceptFields.forEach(field => {
                    data[field] = req.body[field];
                });
            }
            else{
                data = req.body;
            }
            data._id = null;

            const result = await req.service.create(data).catch((err) => {
                res.status(req.resultConstructor.hardCodeResult || req.resultConstructor.statusCodeError).send({
                    code: req.resultConstructor.statusCodeError,
                    message: err
                })
            });
            if(result){
                res.status(req.resultConstructor.hardCodeResult || req.resultConstructor.statusCodeSuccess).send({
                    code: req.resultConstructor.statusCodeSuccess,
                    [req.resultConstructor.dataFieldName]: result
                });
            }
            
        }
    }

    update() {
        return async (req, res, next) => {
            if(!req.acceptFields) req.acceptFields = [];
            let data = {};
            if(req.acceptFields && req.acceptFields.length){
                const acceptFields = req.acceptFields;
                acceptFields.forEach(field => {
                    data[field] = req.body[field];
                });
            }
            else{
                data = req.body;
            }

            data._id = req.params.id;
            
            const result = await req.service.inset(data, {_id: data._id}).catch((err) => {
                res.status(req.resultConstructor.hardCodeResult || req.resultConstructor.statusCodeError).send({
                    code: req.resultConstructor.statusCodeError,
                    message: err
                })
            });

            res.status(req.resultConstructor.hardCodeResult || req.resultConstructor.statusCodeSuccess).send({
                code: req.resultConstructor.statusCodeSuccess,
                [req.resultConstructor.dataFieldName]: result
            });
        }
    }

    deleteById() {
        return async (req, res, next) => {
            const id = req.params.id;
            const result = await req.service.deleteOne({ _id: id }).catch((err) => {
                res.status(req.resultConstructor.hardCodeResult || req.resultConstructor.statusCodeError).send({
                    code: req.resultConstructor.statusCodeError,
                    message: err
                })
            });
            
            res.status(req.resultConstructor.hardCodeResult || req.resultConstructor.statusCodeSuccess).send({
                code: req.resultConstructor.statusCodeSuccess,
                [req.resultConstructor.dataFieldName]: result
            });
        }
    }
}

module.exports = Controller;