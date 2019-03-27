/**
 * @author Luu Luong, luongthanhluu@gmail.com
 * @version 1.0.0
 * @description created base from Express.js modules
 */

const Controller = require('./controller');
const Router = require('./router');
const Validate = require('./validate');
const Service = require('./service');

class ExpressModule {
    constructor(name, model, options) {
        let validate, controller;
        if(!name){
            throw new Error("name is required when create new module");
        }

        if(!model){
            throw new Error("model is required when create new module");
        }

        if(!options) {
            options = {};
        }
        this.name = name;
        this.service = new Service(name, model, {
            limitItemPerPage: options.limitItemPerPage
        });

        if(!options.validate) {
            validate = new Validate(name, {
                roleLevel: options.roleLevel || 0
            });
        }
        else{
            validate = options.validate
        }

        if(!options.controller){
            controller = new Controller(name, model);
        }
        else{
            controller = options.controller;
        }

        this.controller = controller;
        this.validate = validate;
        const router = new Router(name, controller, this.service, validate, options);

        //init router
        this.router = router;
        this.expressRouter = router.createDefaultRouter();
    }
}

module.exports = {
    ExpressModule,
    Controller,
    Service,
    Validate
};