var async = require('async');
var colors = require('colors');
var pg = require('pg');
var types = require('pg').types;
types.setTypeParser(1700, 'text', parseFloat);
var _ = require('underscore');
var mustache = require('mustache');
var moment = require('moment');
var httpPort = require('../../server.js').httpPort;
var server_url = require('../../server.js').server_url;
var server_port = require('../../server.js').server_port;
var domain = server_url + ":" + server_port;
var pool = require('../../server.js').pool;
var transporter = require('../../server.js').transporter;
var mail_options = require('../../server.js').mail_options;
var jwt = require('jsonwebtoken');
var jwtSecret = require('../../server.js').jwtSecret;

var fs = require("fs");
var dir_1 = "/../../templates/emails/";
var dir_2 = "/../../sql/queries/members/";
var template_member_recovery = fs.readFileSync(__dirname + dir_1 + 'member_recovery.html', 'utf8').toString();
var query_get_member_by_email = fs.readFileSync(__dirname + dir_2 + 'get_by_email.sql', 'utf8').toString();


// FIND BY EMAIL
exports.request = function(req, res) {

    async.waterfall([
        function(callback){
            // Connect to database
            pool.connect(function(err, client, done) {
                if(err) {
                    callback(err, 500);
                } else {
                    callback(null, client, done);
                }
            });
        },
        function(client, done, callback) {
            // Database query
            client.query(query_get_member_by_email, [
                req.params.email_address
            ], function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    // Check if Member exists
                    if (result.rows.length === 0) {
                        callback(new Error("Member not found"), 404);
                    } else {
                        callback(null, client, done, result.rows[0]);
                    }
                }
            });
        },
        function(client, done, member, callback) {
            // Attach email-address
            member.email_address = req.params.email_address;

            // Create payload
            payload = {
                iss: server_url,
                sub: 'Reset member account',
                member_id: member.member_id,
                title: member.title,
                first_name: member.first_name,
                last_name: member.last_name,
                email_address: member.email_address,
                user: false,
                member: true,
                admin: member.admin,
                iat: moment().unix(),
                exp: moment().add(5, 'minutes').unix()
            };

            // Create JWT
            member.token = jwt.sign(payload, jwtSecret);
            member.expires = "5 minutes";

            // Render HTML content
            var output = mustache.render(template_member_recovery, {
                member: member,
                domain: domain,
                year: moment().format("YYYY")
            });

            // Render text for emails without HTML support
            var text = "Reset your password";

            // Send email
            transporter.sendMail({
                from: mail_options,
                to: member.email_address,
                subject: "[Ethics-App] Reset your password",
                text: text,
                html: output
            }, function(err, info) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, 204, null);
                }
            });

        }
    ], function(err, code, result) {
        if(err){
            console.error(colors.red(err));
            res.status(code).send(err.message);
        } else {
            res.status(code).send();
        }
    });
};
