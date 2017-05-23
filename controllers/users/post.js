var async = require('async');
var colors = require('colors');
var pg = require('pg');
var types = require('pg').types;
types.setTypeParser(1700, 'text', parseFloat);
var _ = require('underscore');
var mustache = require('mustache');
var moment = require('moment');
var domain = process.env.SERVER_URL + ":" + process.env.SERVER_PORT;
var user_client_path = process.env.USER_CLIENT_PATH;
var jwt = require('jsonwebtoken');
var pool = require('../../server.js').pool;
var transporter = require('../../server.js').transporter;

var fs = require("fs");
var dir_1 = "/../../templates/emails/";
var dir_2 = "/../../sql/queries/users/";
var template_user_account_created = fs.readFileSync(__dirname + dir_1 + 'user_account_created.html', 'utf8').toString();
var query_create_user = fs.readFileSync(__dirname + dir_2 + 'create.sql', 'utf8').toString();


// POST
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
            // TODO: Add object/schema validation
            var object = {
                email_address: req.body.email_address,
                title: req.body.title,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                institute_id: req.body.institute_id,
                blocked: req.body.blocked || false
            };
            var params = _.values(object);
            callback(null, client, done, params);
        },
        function(client, done, params, callback){
            // Database query
            client.query(query_create_user, params, function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    var user = result.rows[0];
                    // Prepare HTML content
                    var output = mustache.render(template_user_account_created, {
                        user: user,
                        domain: domain,
                        user_client_path: user_client_path,
                        year: moment().format("YYYY")
                    });

                    // Send email
                    transporter.sendMail({
                        from: {
                            name: process.env.SENDER_NAME,
                            address: process.env.SENDER_EMAIL_ADDRESS
                        },
                        to: user.email_address,
                        subject: "[Ethics-App] Your account has been created",
                        text: "Your account has been created",
                        html: output
                    }, function(err, info) {
                        if (err) {
                            callback(err);
                        } else {
                            callback(null, 201, user);
                        }
                    });

                }
            });
        }
    ], function(err, code, result) {
        if(err){
            console.error(colors.red(err));
            res.status(code).send(err.message);
        } else {
            res.status(code).send(result);
        }
    });
};
