const expressModule = require('express-modules');

class Validate extends expressModule.Validate {
    constructor() {
        super();
    }
    
    getByAdmin() {
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