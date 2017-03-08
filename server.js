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
        console.error(colors.red("Could not connect to Database! Invalid Credentials or Database is not running."));
    } else {
        client.query("SELECT true;", function(err, result) {
            done();
            if (err) {
                console.error(colors.red(JSON.stringify(err)));
            } else {
                console.log(colors.green("Connected to Database!"));
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


// Load dependencies
var login = require ('./routes/login');
var users = require ('./routes/users');
var members = require ('./routes/members');
var documents = require ('./routes/documents');
var revisions = require ('./routes/revisions');
var descriptions = require ('./routes/descriptions');
var concerns = require ('./routes/concerns');
var reviews = require ('./routes/reviews');
var recovery = require ('./routes/recovery');

// Load API routes
app.use('/api', login);
app.use('/api', users);
app.use('/api', members);
app.use('/api', documents);
app.use('/api', revisions);
app.use('/api', descriptions);
app.use('/api', concerns);
app.use('/api', reviews);
app.use('/api', recovery);


// Security best practices.
app.use(helmet());


// Resolve path after refreshing inside app
app.get('/*', function(req, res, next) {
    res.sendFile(path.resolve('public/index.html'));
});


// Start Webserver
var httpServer = http.createServer(app);
httpServer.listen(config.httpPort, function() {
    console.log(colors.blue("HTTP-Server is listening at port " + config.httpPort));
});
if(config.environment === "production") {
    var httpsServer = https.createServer(credentials, app);
    httpsServer.listen(config.httpsPort, function() {
        console.log(colors.blue("HTTPS-Server is listening at port " + config.httpsPort));
    });
}


module.exports = app;
