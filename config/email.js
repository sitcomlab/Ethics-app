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


// Create reusable transporter object using the default SMTP transport
exports.transporter = nodemailer.createTransport(smtpConfig);

// Default Mail options
exports.mailOptions = { from: 'IFGI-Ethics-App <' + user + '>' };
