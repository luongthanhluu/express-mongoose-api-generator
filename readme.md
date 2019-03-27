# express-mongoose-api-generator


[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://www.npmjs.com/package/@luongthanhluu/express-mongoose-api-generator)

Fastest way to create APIs, base form Express framework and Mongoose. Easy to extend and update your APIs.

  - Auto generate APIs with small config
  - Easy to extend
  
# Dependencies
[Nodejs > 8.xx](https://nodejs.org/)
[Express Farmwork](https://github.com/expressjs/express)
[mongoose libs](https://mongoosejs.com/)
[body-parser libs](https://www.npmjs.com/package/body-parser)

## Installation

Dillinger requires [Node.js](https://nodejs.org/) v8+ to run.

```sh
$ npm install express-mongoose-api-generator --save
```
## Usage
`product.js` file:
```javascript
const expressModule = require('express-mongoose-api-generator');
const mongoose      = require('mongoose');
const Items = mongoose.model('Items'); // we need define Items model already, see #Example for clear

const name = 'products'; //this is name of API that we want to create
const options = {}; // Read more options docs
let productModule = new expressModule.ExpressModule(name, Items, options);

module.exports = productModule.expressRouter; // will export Express router
```
`app.js` file:
```javascript
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
...
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
...
app.use('/api/', require('./product'));

...
module.exports = app;
```

 * Methods: GET, POST, PUT, DELETE
 * url: http://localhost:8080/api/products/
 * 
 * this will auto generate Apis:
 *  GET http://localhost:8080/api/products?[param1=abc&param2=xyz]/  // get list items with params
 *  GET http://localhost:8080/api/products/:id  // get an item with id
 *  POST http://localhost:8080/api/products/   // for create new item
 *  PUT http://localhost:8080/api/products/:id   // for update an item with id
 *  DELETE http://localhost:8080/api/products/:id  // for delete an item with id



## Example:
##### Our example:
To start example you could update `.env` file in `examples` folder, to config PORT and BD_CONNECTION
Run step by step following cmd: 
```sh
cd examples/
npm install
npm start
```
##### Or you can create your example step by step:
  - step 1: create `package.json`
  ```json
{
  "name": "express-modules-examples",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "inspect": "node --debug ./app.js"
  },
  "author": "Luu Luong, luongthanhluu@gmail.com",
  "repository": {
    "type": "git",
    "url": ""
  },
  "license": "ISC",
  "devDependencies": {},
  "dependencies": {
    "express": "^4.13.3",
    "express-mongoose-api-generator": "1.0.0",
    "mongoose": "^4.1.5"
  }
}

  ```
  - step 2: create `items.model.js` file
  ```javascript
var mongoose = require('mongoose');

var ItemssSchema = new mongoose.Schema({
  name: String,
  description: String
});

mongoose.model('Items', ItemssSchema);

module.exports = ItemssSchema;
  ````
  - step 3: create `items.js` file
  ```javascript
const expressModule = require('express-mongoose-api-generator');
const mongoose      = require('mongoose');
const Items = mongoose.model('Items');

const name = 'products';
/**
 * Methods: GET, POST, PUT, DELETE
 * url: http://localhost:8080/api/products/
 * 
 * this will auto generate Apis:
 *  GET http://localhost:8080/api/products?[param1=abc&param2=xyz]/  // get list items with params
 *  GET http://localhost:8080/api/products/:id  // get an item with id
 *  POST http://localhost:8080/api/products/   // for create new item
 *  PUT http://localhost:8080/api/products/:id   // for update an item with id
 *  DELETE http://localhost:8080/api/products/:id  // for delete an item with id
 */
let productModule = new expressModule.ExpressModule(name, Items);
// will export Express router
module.exports = productModule.expressRouter;
  ```
  - step 4: create `app.js` file
  ```javascript
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

require('dotenv').load();

require('./items.model.js');

mongoose.connect('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@' + process.env.DB_CONNECTION);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
 
app.use('/api/', require('./items.js'));

var port = process.env.SERVER_PORT || 8080;

app.listen(port, function () {
  console.log('Express server listening on port: ' + port);
});

module.exports = app;
  ```
  - step 5: create `.env` file to update ENV variables
  ```
SERVER_PORT =       8080
DB_HOST =           localhost
DB_USER =           
DB_PASS =           
DB_CONNECTION =     localhost:27017/express-modules-test
  ```
  - step 6: install and run
  ```sh
  npm install
  npm start ##server will start at default port 8080
  ```
  
  Now you can assess GET http://localhost/api/products to get list items

## Options


Options | Default | Example | Description
------ | -------- | ------ | ------------------
`limitItemPerPage` | `int` : 100 | `{limitItemPerPage: 50}` |limit items return per page when get list items
`appendRouters` | `array`: null | `[{ method: 'get',router: '/:id/testNewRoute',controller:'getById',validate: 'getById'}]` | to add new router
`appendPriorityRouters` | `array`: null | `[{ method: 'get',router: '/testNewRoute', controller: 'getById', validate: 'getById'}]` | to add new router with hight priority
`controller` | `Object`: Class Controller |  `const expressModule = require('express-mongoose-api-generator'); const controller = new expressModule .Controller('name');`| to replace default controller, read more docs about controller to extendable ()
`defaultRouters` | `Array` : [...]| | to replace default routers list, so you can remove some APIs that you dont want to export
## License
----

MIT

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [dill]: <https://github.com/joemccann/dillinger>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>

   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
   [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>
   [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md>