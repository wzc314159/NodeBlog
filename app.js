var express = require('express'),
    config = require('./config/config'),
    glob = require('glob'),
    mongoose = require('mongoose'),
    util = require('util');

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
    throw new Error('unable to connect to database at ' + config.db);
});

var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
    console.log('app.js ---> required modules: ' + util.inspect(model));
    require(model);
});
var app = express();

// module.exports = require('./config/express')(app, config);
require('./config/express')(app, config, db);
require('./config/passport').init();

app.listen(config.port, function () {
    console.log('Express server listening on port ' + config.port);
});

