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

// ENVIRONMENT VARIABLES
var server_url = process.env.SERVER_URL || 'http://giv-ethics-app.uni-muenster.de';
var httpPort = process.env.HTTP_PORT || 5000;
var httpsPort = httpPort + 443;
var db_host = process.env.DB_HOST || 'localhost';
var db_port = process.env.DB_PORT || 5432;
var db_name = process.env.DB_NAME || 'ethics-app';
var db_user = process.env.DB_USER || 'Nicho';
var db_password = process.env.DB_PW || undefined;
var db_ssl = process.env.DB_SSL || false;
var from_email_address = process.env.FROM || 'ifgi-ethics@uni-muenster.de';
var smtp_host = process.env.SMTP_HOST || 'smtp.gmail.com';
var smtp_port = process.env.SMTP_PORT || 465;
var smtp_ssl = process.env.SMTP_SSL || true;
var smtp_email_address = process.env.SMTP_EMAIL || '';
var smtp_password = process.env.SMTP_PW || '';
var secret = process.env.SECRET || 'superSecretKey';
exports.pool = pool;
exports.httpPort = httpPort;
exports.server_url = server_url;

// DATABASE CONFIGURATION
var config = {
    user: db_user,
    password: db_password,
    host: db_host,
    port: db_port,
    database: db_name,
    ssl: JSON.parse(db_ssl)
};
var pool = new pg.Pool(config);
exports.pool = pool;


// Check database connection
pool.connect(function(err, client, done) {
    if(err) {
        console.error(err);
        console.error(colors.red("Database is not running!"));
    } else {
        client.query("SELECT true;", function(err, result) {
            done();
            if (err) {
                console.error(colors.red(JSON.stringify(err)));
            } else {
                console.log(colors.green("Database is running!"));
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
    from: 'IFGI-Ethics-App <' + from_email_address + '>'
};


// Load certificstes
if (false) {
    var privateKey = fs.readFileSync('sslcert/server.key', 'utf8');
    var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');

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
var users = require ('./routes/users');
// var committee = require ('./routes/committee');
var documents = require ('./routes/documents');
// var revisions = require ('./routes/revisions');
// var descriptions = require ('./routes/descriptions');
// var concerns = require ('./routes/concerns');
// var comments = require ('./routes/comments');
var recovery = require ('./routes/recovery');

// Load API routes
app.use('/api', users);
// app.use('/api', committee);
app.use('/api', documents);
// app.use('/api', revisions);
// app.use('/api', descriptions);
// app.use('/api', concerns);
// app.use('/api', comments);
app.use('/api', recovery);


// Resolve path after refreshing inside app
app.get('/*', function(req, res, next) {
    res.sendFile(path.resolve('public/index.html'));
});


// Start Webserver
var httpServer = http.createServer(app);
httpServer.listen(httpPort, function() {
    console.log(colors.blue("HTTP-Server is listening at port " + httpPort));
});
if (false) {
    var httpsServer = https.createServer(credentials, app);
    httpsServer.listen(httpsPort, function() {
        console.log(colors.blue("HTTPS-Server is listening at port " + httpsPort));
    });
}


module.exports = app;
