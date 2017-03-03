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

// ENVIRONMENT VARIABLES
var environment = process.env.NODE_ENV || 'development';
var server_url = process.env.SERVER_URL || 'http://giv-ethics-app.uni-muenster.de';
var httpPort = process.env.HTTP_PORT || 5000;
var httpsPort = process.env.HTTPS_PORT || (httpPort + 443);
var postgres_host = process.env.POSTGRES_HOST || 'localhost';
var postgres_port = process.env.POSTGRES_PORT || 5432;
var postgres_db_name = process.env.POSTGRES_DB_NAME || 'ethics-app';
var postgres_username = process.env.POSTGRES_USERNAME || 'Nicho';
var postgres_password = process.env.POSTGRES_PASSWORD || undefined;
var postgres_ssl = process.env.POSTGRES_SSL || false;
var from_email_address = process.env.FROM || 'ifgi-ethics@uni-muenster.de';
var smtp_host = process.env.SMTP_HOST || 'smtp.gmail.com';
var smtp_port = process.env.SMTP_PORT || 465;
var smtp_ssl = process.env.SMTP_SSL || true;
var smtp_email_address = process.env.SMTP_EMAIL_ADDRESS || '';
var smtp_password = process.env.SMTP_PASSWORD || '';
var jwtSecret = process.env.JWTSECRET || 'superSecretKey';
exports.pool = pool;
exports.httpPort = httpPort;
exports.server_url = server_url;
exports.jwtSecret = jwtSecret;

// DATABASE CONFIGURATION
var pool = new pg.Pool({
    user: postgres_username,
    password: postgres_password,
    host: postgres_host,
    port: postgres_port,
    database: postgres_db_name,
    ssl: JSON.parse(postgres_ssl)
});
exports.pool = pool;


// Check database connection
pool.connect(function(err, client, done) {
    if(err) {
        console.error(err);
        console.error(colors.red(new Date() + " Postgres is not running!"));
    } else {
        client.query("SELECT true;", function(err, result) {
            done();
            if (err) {
                console.error(colors.red(JSON.stringify(err)));
            } else {
                console.log(colors.green(new Date() + " Postgres is running on port " + postgres_port));
            }
        });
    }
});

pool.on('error', function (err, client) {
    console.error('idle client error', err.message, err.stack);
});


// SMTP CONFIGURATION
exports.transporter = nodemailer.createTransport({
    host: smtp_host,
    port: smtp_port,
    secure: smtp_ssl,
    auth: {
        user: smtp_email_address,
        pass: smtp_password
    }
});
exports.mail_options = {
    name: "IFGI-Ethics-App",
    address: from_email_address
};


// Load certificstes
if (environment === "production") {
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


// Resolve path after refreshing inside app
app.get('/', function(req, res, next) {
    res.sendFile(path.resolve('public/index.html'));
});
app.get('/admin/*', function(req, res, next) {
    res.sendFile(path.resolve('public/admin/index.html'));
});


// Start Webserver
var httpServer = http.createServer(app);
httpServer.listen(httpPort, function() {
    console.log(colors.green(new Date() + " HTTP-Server is listening at port " + httpPort));
});
if(environment === "production") {
    var httpsServer = https.createServer(credentials, app);
    httpsServer.listen(httpsPort, function() {
        console.log(colors.green(new Date() + " HTTPS-Server is listening at port " + httpsPort));
    });
}


module.exports = app;
