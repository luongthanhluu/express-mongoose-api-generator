'use strict';
var Promise = require('promise');

class Service {
    constructor(name, model, options) {
        this.name = name;
        this.Model = model;
        this.maxItemPerPage = 100;
        if(options && options.limitItemPerPage) {
            this.maxItemPerPage = options.limitItemPerPage;
        }
    }

    inset(data, params) {
        //console.log(data, params)
        if (!params) {
            params = data;
        }
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.Model.findOne(params).
                exec(function (err, model) {
                    if (err) {
                        reject(err);
                    } else if (!model) {
                        _this.Model.create(data, function (err, newModel) {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(newModel);
                            }
                        }
                        );
                    } else {
                        model.update(data).then(function (newData) {
                            resolve(newData);
                        }, reject);
                    }
                }, function (err) {
                    console.log(err);
                });
        });
    }

    create(data) {
        const _this = this;
        return _this.Model.create(data);
    }

    find(params, fields, options) {
        var _this = this;
        if (!options) {
            options = {};
        }
        if (!params) {
            params = {};
        }
        if (!fields) {
            fields = {};
        }
        // if (!fields._id) {
        //     fields._id = 0;
        // }

        return new Promise(function (resolve, reject) {
            var query = _this.Model.find(params, fields);
            query.select(fields);
            if (options.limit) {
                var page = 1;
                query.limit(options.limit);
                if (options.page) {
                    page = options.page;
                }
                console.log(options, page)
                query.skip((page - 1) * options.limit);
            }

            if (options.sort) {
                query.sort(options.sort);
            }
            query.exec(function (err, models) {
                if (err) {
                    reject(err);
                } else {
                    resolve(models);
                }
            });
        });
    }

    findOne(params, fields, options) {
        var _this = this;
        if (!options) {
            options = {};
        }
        if (!params) {
            params = {};
        }
        if (!fields) {
            fields = {};
        }
        // if (!fields._id) {
        //     fields._id = 0;
        // }

        return new Promise(function (resolve, reject) {
            var query = _this.Model.findOne(params, fields);
            query.select(fields);
            if (options.skip) {
                query.skip(options.skip);
            }
            return query.exec().then(resolve, reject);
        });
    }

    count(params) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.Model.count(params).exec(function (err, count) {
                if (err) {
                    reject(err);
                } else {
                    resolve(count);
                }
            });
        });
    }

    deleteOne(params) {
        const _this = this;
        return new Promise(function (resolve, reject) {
            _this.Model.deleteOne(params, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(params);
                }
            });
        });
    }
}

module.exports = Service;