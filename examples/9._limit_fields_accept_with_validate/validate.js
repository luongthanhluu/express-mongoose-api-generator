const expressModule = require('@luongthanhluu/express-mongoose-api-generator');

class Validate extends expressModule.Validate {
    constructor() {
        super();
    }
    //@overide
    getList() {
        return (req, res, next) => {
            req.acceptFields = ['_id', 'name', 'isMenu'];
            next();
        }
    }
}

module.exports = Validate;