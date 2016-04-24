var nodemailer = require('nodemailer');
var user = require('../server.js').user;
var pass = require('../server.js').pass;


/**
 * SMTP Configuration
 */
var smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: user,
        pass: pass
    }
};

/*var poolConfig = {
    pool: true,
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'user@gmail.com',
        pass: 'pass'
    }
};

var directConfig = {
    name: 'hostname' // must be the same that can be reverse resolved by DNS for your IP
};*/

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport(smtpConfig);

// setup e-mail data with unicode symbols
var mailOptions = {
    from: '"Ethics-App [do-not-replay] "<' + user + '>', // sender address
    to: '',// list of receivers
    subject: '[IFGI-Ethics-App] ', // Subject line
    text: '', // plaintext body
    html: ''// html body
};

exports.transporter;
exports.mailOptions;
