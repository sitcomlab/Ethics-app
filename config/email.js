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

// Create reusable transporter object using the default SMTP transport
exports.transporter = nodemailer.createTransport(smtpConfig);

// Default Mail options
exports.mailOptions = { from: 'IFGI-Ethics-App <' + user + '>' };
