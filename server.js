var colors = require('colors');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var fs = require('fs');
var http = require('http');
var https = require('https');
var pg = require('pg');
var path = require('path');
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
var helmet = require('helmet');
var config = require('./config');

exports.pool = pool;
exports.httpPort = config.httpPort;
exports.server_url = config.server_url;
exports.jwtSecret = config.jwtSecret;

// DATABASE CONFIGURATION
var db_config = {
    user: config.db_user,
    password: config.db_password,
    host: config.db_host,
    port: config.db_port,
    database: config.db_name,
    ssl: JSON.parse(config.db_ssl)
};
var pool = new pg.Pool(db_config);

exports.pool = pool;


// Check database connection
pool.connect(function(err, client, done) {
    if(err) {
        console.error(err);
        console.error(colors.red("Could not connect to Database! Invalid Credentials or Postgres Database is not running."));

    } else {
        client.query("SELECT true;", function(err, result) {
            done();
            if (err) {
                console.error(colors.red(JSON.stringify(err)));
            } else {
                console.log(colors.green(new Date() + " Postgres is running on port " + config.db_port));
            }
        });
    }
});

pool.on('error', function (err, client) {
    console.error('idle client error', err.message, err.stack);
});


// SMTP CONFIGURATION
exports.transporter = nodemailer.createTransport({
    host: config.smtp_host,
    port: config.smtp_port,
    secure: config.smtp_ssl,
    auth: {
        user: config.smtp_email_address,
        pass: config.smtp_password
    }
});
exports.mail_options = {
    name: "Ethics-App",
    address: config.from_email_address
};


// Load certificstes
if (config.environment === "production") {
    var privateKey = fs.readFileSync('ssl/server.key', 'utf8');
    var certificate = fs.readFileSync('ssl/server.crt', 'utf8');

    var credentials = {
        key: privateKey,
        cert: certificate
    };
}

// Setup settings
var app = express();
app.use(bodyParser.json({
    limit: 52428800 // 50MB
}));
app.use(bodyParser.urlencoded({
    extended: false,
    limit: 52428800 // 50MB
}));
app.use(cookieParser());

// Set folder for static files
app.use(express.static(__dirname + '/public', {
    redirect: false
}));

// Authentication
exports.isAuthenticated = function isAuthenticated(req, res, next) {
    if (req.headers.authorization) {
        var token = req.headers.authorization.substring(7);

        // Verify token
        jwt.verify(token, jwtSecret, function(err, decoded) {
            if(err){
                res.status(401).send("Authentication failed!");
            } else {
                // Authorization
                if(decoded.username === account.username && decoded.iss === server_url){
                    return next();
                } else {
                    res.status(401).send("Authentication failed!");
                }
            }
        });
    } else {
        res.status(401).send("Authentication failed!");
    }
};

// API endpoint
var prefix = '/api';

// Load API routes
app.use(prefix, require ('./routes/login'));
app.use(prefix, require ('./routes/users'));
app.use(prefix, require ('./routes/members'));
app.use(prefix, require ('./routes/documents'));
app.use(prefix, require ('./routes/revisions'));
app.use(prefix, require ('./routes/descriptions'));
app.use(prefix, require ('./routes/concerns'));
app.use(prefix, require ('./routes/reviews'));
app.use(prefix, require ('./routes/recovery'));


// Security best practices.
app.use(helmet());


// Resolve path after refreshing inside app
app.get('/', function(req, res, next) {
    res.sendFile(path.resolve('public/index.html'));
});
app.get('/admin/*', function(req, res, next) {
    res.sendFile(path.resolve('public/admin/index.html'));
});


// Start Webserver
var httpServer = http.createServer(app);
httpServer.listen(config.httpPort, function() {
    console.log(colors.green(new Date() + "HTTP-Server is listening at port " + config.httpPort));
});
if(config.environment === "production") {
    var httpsServer = https.createServer(credentials, app);
  
    httpsServer.listen(config.httpsPort, function() {
        console.log(colors.green(new Date() + "HTTPS-Server is listening at port " + config.httpsPort));
    });
}


module.exports = app;
