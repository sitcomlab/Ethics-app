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
var config = require('dotenv').config();

// DATABASE CONFIGURATION
var pool = new pg.Pool({
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    database: process.env.POSTGRES_DB_NAME,
    user: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    ssl: JSON.parse(process.env.POSTGRES_SSL)
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
                console.log(colors.green(new Date() + " Postgres is running on port " + process.env.POSTGRES_PORT));
            }
        });
    }
});

pool.on('error', function (err, client) {
    console.error('idle client error', err.message, err.stack);
});


// SMTP CONFIGURATION
var trans = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: JSON.parse(process.env.SMTP_SSL),
    auth: {
        user: process.env.SMTP_EMAIL_ADDRESS,
        pass: process.env.SMTP_PASSWORD
    }
});

// verify connection configuration
trans.verify(function(error, success) {
   if (error) {
        console.log(error);
   } else {
        console.log('Connection to Email Server successfull!');
   }
});

exports.transporter = trans;

// Load certificstes
/*if(process.env.NODE_ENV === "production") {
    var credentials = {
        key: fs.readFileSync('/etc/nginx/ssl/giv-ethics-app-key-unsafe.pem', 'utf8'),
        cert: fs.readFileSync('/etc/nginx/ssl/giv-ethics-app-cert.pem', 'utf8')
    };
}*/

// Setup settings
var app = express();

// create application/json parser
var jsonParser = bodyParser.json({
    limit: 52428800 // 50MB
})
// create application/json parser
var urlencodedParser = bodyParser.json({
    extended: false,
    limit: 52428800 // 50MB
})

app.use(cookieParser());
app.enable('trust proxy');
// Set folder for static files
app.use(express.static(__dirname + '/public', {
    redirect: false
}));

// Authentication
exports.isAuthenticated = function isAuthenticated(req, res, next) {
    if(req.headers.authorization) {
        var token = req.headers.authorization.substring(7);

        // Verify token
        jwt.verify(token, process.env.JWTSECRET, function(err, decoded) {
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
var uploadprefix = '/upload';

// Load API routes
app.use(prefix, jsonParser);
app.use(prefix, urlencodedParser);
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

app.use(uploadprefix, require ('./routes/fileupload'));


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
httpServer.listen(Number(process.env.HTTP_PORT), function() {
    console.log(colors.green(new Date() + " HTTP-Server is listening at port " + process.env.HTTP_PORT));
});
/*if(process.env.NODE_ENV === "production") {
    var httpsServer = https.createServer(credentials, app);

    httpsServer.listen(Number(process.env.HTTP_PORT), function() {
        console.log(colors.green(new Date() + " HTTPS-Server is listening at port " + process.env.HTTP_PORT));
    });
}*/


module.exports = app;
