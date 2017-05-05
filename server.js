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

// ENVIRONMENT VARIABLES
config.environment = process.env.NODE_ENV || config.environment;
config.server_url = process.env.SERVER_URL || config.server_url;
config.server_port = process.env.SERVER_PORT || config.server_port;
config.httpPort = process.env.HTTP_PORT || config.httpPort;
config.httpsPort = process.env.HTTPS_PORT || config.httpsPort;
config.postgres_host = process.env.POSTGRES_HOST || config.postgres_host;
config.postgres_port = process.env.POSTGRES_PORT || config.postgres_port;
config.postgres_db_name = process.env.POSTGRES_DB_NAME || config.postgres_db_name;
config.postgres_username = process.env.POSTGRES_USERNAME || config.postgres_username;
config.postgres_password = process.env.POSTGRES_PASSWORD || config.postgres_password;
config.postgres_ssl = process.env.POSTGRES_SSL || config.postgres_ssl;
config.from_email_address = process.env.FROM || config.from_email_address;
config.smtp_host = process.env.SMTP_HOST || config.smtp_host;
config.smtp_port = process.env.SMTP_PORT || config.smtp_port;
config.smtp_ssl = process.env.SMTP_SSL || config.smtp_ssl;
config.smtp_email_address = process.env.SMTP_EMAIL_ADDRESS || config.smtp_email_address;
config.smtp_password = process.env.SMTP_PASSWORD || config.smtp_password;
config.jwtSecret = process.env.JWTSECRET || config.jwtSecret;

exports.httpPort = config.httpPort;
exports.server_url = config.server_url;
exports.server_port = config.server_port;
exports.jwtSecret = config.jwtSecret;

// DATABASE CONFIGURATION
var pool = new pg.Pool({
    host: config.postgres_host,
    port: config.postgres_port,
    database: config.postgres_db_name,
    user: config.postgres_username,
    password: config.postgres_password,
    ssl: JSON.parse(config.postgres_ssl)
});
exports.pool = pool;


// Check database connection
pool.connect(function(err, client, done) {
    if(err) {
        console.error(err);
        console.error(colors.red(new Date() + " Could not connect to Database! Invalid Credentials or Postgres is not running"));
    } else {
        client.query("SELECT true;", function(err, result) {
            done();
            if (err) {
                console.error(colors.red(JSON.stringify(err)));
            } else {
                console.log(colors.green(new Date() + " Postgres is running on port " + config.postgres_port));
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
if(config.environment === "production") {
    var credentials = {
        key: fs.readFileSync('ssl/server.key', 'utf8'),
        cert: fs.readFileSync('ssl/server.crt', 'utf8')
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
    if(req.headers.authorization) {
        var token = req.headers.authorization.substring(7);

        // Verify token
        jwt.verify(token, config.jwtSecret, function(err, decoded) {
            if(err){
                res.status(401).send("Authentication failed!");
            } else {
                return next();
            }
        });
    } else {
        res.status(401).send("Authentication failed, request-token missing!");
    }
};

// Security headers
app.use(helmet());

// API endpoint
var prefix = '/api';

// Load API routes
app.use(prefix, require ('./routes/login'));
app.use(prefix, require ('./routes/universities'));
app.use(prefix, require ('./routes/institutes'));
app.use(prefix, require ('./routes/working_groups'));
app.use(prefix, require ('./routes/courses'));
app.use(prefix, require ('./routes/users'));
app.use(prefix, require ('./routes/members'));
app.use(prefix, require ('./routes/documents'));
app.use(prefix, require ('./routes/revisions'));
app.use(prefix, require ('./routes/descriptions'));
app.use(prefix, require ('./routes/concerns'));
app.use(prefix, require ('./routes/comments'));
app.use(prefix, require ('./routes/notes'));
app.use(prefix, require ('./routes/reviewers'));
app.use(prefix, require ('./routes/recovery'));
app.use(prefix, require ('./routes/search'));


// Resolve path after refreshing inside app
app.get('/', function(req, res, next) {
    res.sendFile(path.resolve('public/user-client/index.html'));
});
app.get('/user-client/*', function(req, res, next) {
    res.sendFile(path.resolve('public/user-client/index.html'));
});
app.get('/member-client/*', function(req, res, next) {
    res.sendFile(path.resolve('public/member-client/index.html'));
});


// Start Webserver
var httpServer = http.createServer(app);
httpServer.listen(config.httpPort, function() {
    console.log(colors.green(new Date() + " HTTP-Server is listening at port " + config.httpPort));
});
if(config.environment === "production") {
    var httpsServer = https.createServer(credentials, app);

    httpsServer.listen(config.httpsPort, function() {
        console.log(colors.green(new Date() + " HTTPS-Server is listening at port " + config.httpsPort));
    });
}


module.exports = app;
