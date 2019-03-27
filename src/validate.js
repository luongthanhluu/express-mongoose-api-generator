const Promise = require('promise');
class Validate {
    constructor() {
    }

    none() {
        return (req, res, next) => {
            return next();
        }
    }
    getList() {
        return (req, res, next) => {
            return next();
        }
    }

    getById() {
        return (req, res, next) => {
            return next();
        }
    }

    create() {
        return (req, res, next) => {
            return next();
        }
    }

    update() {
        return (req, res, next) => {
            return next();
        }
    }

    deleteById() {
        return (req, res, next) => {
            return next();
        }
    }
}

module.exports = Validate;