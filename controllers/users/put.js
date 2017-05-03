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
var jwt = require('jsonwebtoken');
var pool = require('../../server.js').pool;
var jwtSecret = require('../../server.js').jwtSecret;
var transporter = require('../../server.js').transporter;
var mail_options = require('../../server.js').mail_options;

var fs = require("fs");
var dir_1 = "/../../templates/emails/";
var dir_2 = "/../../sql/queries/users/";
var template_user_account_blocked = fs.readFileSync(__dirname + dir_1 + 'user_account_blocked.html', 'utf8').toString();
var template_user_account_reactivated = fs.readFileSync(__dirname + dir_1 + 'user_account_reactivated.html', 'utf8').toString();
var query_get_user = fs.readFileSync(__dirname + dir_2 + 'get.sql', 'utf8').toString();
var query_edit_user_by_member = fs.readFileSync(__dirname + dir_2 + 'edit_by_member.sql', 'utf8').toString();
var query_edit_user_by_user = fs.readFileSync(__dirname + dir_2 + 'edit_by_user.sql', 'utf8').toString();


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
                        callback(new Error("Authorization failed"), 401);
                    } else {
                        if(decoded.member){
                            callback(null, client, done, true, query_edit_user_by_member);
                        } else {
                            callback(null, client, done, false, query_edit_user_by_user);
                        }
                    }
                });
            } else {
                callback(new Error("Authorization failed"), 401);
            }
        },
        function(client, done, isMember, query, callback) {
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
                        callback(null, client, done, isMember, result.rows[0], query);
                    }
                }
            });
        },
        function(client, done, isMember, user, query, callback) {
            // TODO: Add object/schema validation
            var object = {
                user_id: req.params.user_id,
                title: req.body.title,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                institute_id: req.body.institute_id
            };

            if(isMember){
                object.email_address = req.body.email_address;
                object.blocked = req.body.blocked;
            }

            var params = _.values(object);
            callback(null, client, done, isMember, user, query, params);
        },
        function(client, done, isMember, user, query, params, callback){
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
            // Check if user-account has been blocked or reactivated
            if(user.blocked !== updated_user.blocked){

                // Prepare HTML content
                var output = "";

                // Prepare text for emails without HTML support
                var text = "";

                // Prepare subject
                var subject = "[Ethics-App] ";

                if(updated_user.blocked){
                    text = "Your account has been blocked";
                    subject = subject + "Your account has been blocked";
                    output = mustache.render(template_user_account_blocked, {
                        user: user,
                        updated_user: updated_user,
                        year: moment().format("YYYY")
                    });
                } else {
                    text = "Your account has been reactivated";
                    subject = subject + "Your account has been reactivated";
                    output = mustache.render(template_user_account_reactivated, {
                        user: user,
                        updated_user: updated_user,
                        year: moment().format("YYYY")
                    });
                }

                // Send email
                transporter.sendMail({
                    from: mail_options,
                    to: updated_user.email_address,
                    subject: subject,
                    text: text,
                    html: output
                }, function(err, info) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, 200, updated_user);
                    }
                });

            } else {
                callback(null, 200, updated_user);
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
