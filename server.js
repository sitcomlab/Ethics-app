var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var async = require('async');
var debug = require('debug');
var mongoose = require('mongoose');
var pdfkit = require('pdfkit');
var program = require('commander');
var jwt = require('jsonwebtoken');


// COMMAND-LINE-PARAMS
program
  .version('0.0.1')
  .option('-d, --dev', 'Use development database')
  .option('-g, --gmail [email]', 'Add the SMTP-address for nodemailer, e.g. user@gmail.com', 'user@gmail.com')
  .option('-p, --password [password]', 'Add the SMTP-address for nodemailer, e.g. password', 'password')
  .parse(process.argv);

var devStatus = false;
if(program.dev){
    devStatus = true;
}
exports.user = program.gmail;
exports.pass = program.password;


// CONFIG
var db = require('./config/db')


// ROUTES
var docs = require ('./routes/docs');
var recover = require ('./routes/recover');


// DATABASE
mongoose.connect(db.getConnection(devStatus));


// WEBSERVER
var app = express();
app.set('port', process.env.PORT || 8000);

var server = app.listen(app.get('port'), function() {
    console.log('Webserver is listening on port ' + server.address().port);
});
app.use(logger('dev'));
app.use(bodyParser({
    limit: 1024 * 1000
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());


// WEBCLIENT
app.use(express.static(path.join(__dirname, '/public')));


// REST-API
app.use('/api', docs);
app.use('/api', recover);


/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send(JSON.stringify({
        message: err.message,
        error: {}
    }));
});


module.exports = app;
