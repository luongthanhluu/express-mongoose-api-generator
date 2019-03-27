const expressModule = require('@luongthanhluu/express-mongoose-api-generator');

class Validate extends expressModule.Validate {
    constructor() {
        super();
    }
    //@overide
    getList() {
        return (req, res, next) => {
            if(!req.headers.authorization) {
                console.log("unAuthorization")
                res.status(401).send("test api success with unAuthorization validate");
            }
            else{
                next();
            }
        }
    }
}

module.exports = Validate;