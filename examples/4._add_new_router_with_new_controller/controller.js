const expressModule = require('@luongthanhluu/express-mongoose-api-generator');

class Controller extends  expressModule.Controller {
    constructor(name, model) {
        super(name, model);
    }
    
    newFunction() {
        return async (req, res, next) => {
            console.log("run new function")
            res.status(req.resultConstructor.hardCodeResult || req.resultConstructor.statusCodeSuccess).send({
                code: req.resultConstructor.statusCodeSuccess,
                [req.resultConstructor.dataFieldName]: {
                    a: 4
                }
            });
        }
    }
}

module.exports = Controller;