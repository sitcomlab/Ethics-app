var async = require('async');
var colors = require('colors');
var pg = require('pg');
var types = require('pg').types;
types.setTypeParser(1700, 'text', parseFloat);
var _ = require('underscore');
var mustache = require('mustache');
var moment = require('moment');
var httpPort = require('../../server.js').httpPort;
var jwt = require('jsonwebtoken');
var pool = require('../../server.js').pool;
var server_url = require('../../server.js').server_url;
var jwtSecret = require('../../server.js').jwtSecret;
var transporter = require('../../server.js').transporter;
var mail_options = require('../../server.js').mail_options;

var fs = require("fs");
var dir_1 = "/../../templates/emails/";
var dir_2 = "/../../sql/queries/users/";
var template = fs.readFileSync(__dirname + dir_1 + 'email_address_changed.html', 'utf8').toString();
var query_get_user = fs.readFileSync(__dirname + dir_2 + 'get.sql', 'utf8').toString();
var query_edit_user = fs.readFileSync(__dirname + dir_2 + 'edit.sql', 'utf8').toString();
var query_edit_user_public = fs.readFileSync(__dirname + dir_2 + 'edit_public.sql', 'utf8').toString();


// PUT
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
            // Authorization
            if(req.headers.authorization) {
                var token = req.headers.authorization.substring(7);

                // Verify token
                jwt.verify(token, jwtSecret, function(err, decoded) {
                    if(err){
                        res.status(401).send("Authorization failed!");
                    } else {
                        if(decoded.member){
                            callback(null, client, done, query_edit_user);
                        } else {
                            callback(null, client, done, query_edit_user_public);
                        }
                    }
                });
            } else {
                res.status(401).send("Authorization failed!");
            }
        },
        function(client, done, query, callback) {
            // Database query
            client.query(query_get_user, [
                req.params.user_id
            ], function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    // Check if User exists
                    if (result.rows.length === 0) {
                        callback(new Error("User not found"), 404);
                    } else {
                        callback(null, client, done, result.rows[0], query);
                    }
                }
            });
        },
        function(client, done, user, query, callback) {
            // TODO: Add object/schema validation
            var object = {
                user_id: req.params.user_id,
                email_address: req.body.email_address,
                title: req.body.title,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                institute_id: req.body.institute_id
            };
            var params = _.values(object);
            callback(null, client, done, user, query, params);
        },
        function(client, done, user, query, params, callback){
            // Database query
            client.query(query, params, function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    callback(null, client, done, user);
                }
            });
        },
        function(client, done, user, callback) {
            // Database query
            client.query(query_get_user, [
                req.params.user_id
            ], function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    // Check if User exists
                    if (result.rows.length === 0) {
                        callback(new Error("User not found"), 404);
                    } else {
                        callback(null, client, done, user, result.rows[0]);
                    }
                }
            });
        },
        function(client, done, user, updated_user, callback) {
            if(user.email_address === req.body.email_address){
                callback(null, 200, updated_user);
            } else {
                // Render HTML content
                var output = mustache.render(template, {
                    user: user,
                    updated_user: updated_user,
                    year: moment().format("YYYY")
                });

                // Render text for emails without HTML support
                var text = '';

                // Send email
                transporter.sendMail({
                    from: mail_options,
                    to: user.email_address,
                    subject: 'Your email-address has been changed',
                    text: '',
                    html: output
                }, function(err, info) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, 200, updated_user);
                    }
                });
            }
        },
    ], function(err, code, result) {
        if(err){
            console.error(colors.red(err));
            res.status(code).send(err.message);
        } else {
            res.status(code).send(result);
        }
    });
};
