const expressModule = require('@luongthanhluu/express-mongoose-api-generator');

class Controller extends  expressModule.Controller {
    constructor(name, model) {
        super(name, model);
    }
    //overide
    getById() {
        return async (req, res, next) => {
            console.log("run overdie")
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

            if(result) {
                res.status(req.resultConstructor.hardCodeResult || req.resultConstructor.statusCodeSuccess).send({
                    code: req.resultConstructor.statusCodeSuccess,
                    [req.resultConstructor.dataFieldName]: {
                        a: 1
                    }
                });
            }
        }
    }
}

module.exports = Controller;