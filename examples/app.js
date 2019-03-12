var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

require('dotenv').load();

require('./models/Categories');

mongoose.connect('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@' + process.env.DB_CONNECTION);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
 
app.use('/api/example/', require('./1._example_1/'));
app.use('/api/example/', require('./2._add_new_route_with_exist_controller/'));
app.use('/api/example/', require('./3._overide_a_controller/'))
app.use('/api/example/', require('./4._add_new_router_with_new_controller/'))
app.use('/api/example/', require('./5._overide_default_router/'));
app.use('/api/example/', require('./6._overide_a_validater/'))
app.use('/api/example/', require('./7._add_a_router_with_new_validater/'))
app.use('/api/example/', require('./8._limit_fields_accept_with_options/'))
app.use('/api/example/', require('./9._limit_fields_accept_with_validate/'))
app.use('/api/example/', require('./10._replace_result_status_and_field_name/'))

var port = process.env.SERVER_PORT || 80;

app.listen(port, function () {
  console.log('Express server listening on port: ' + port);
});

module.exports = app;



