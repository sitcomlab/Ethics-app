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
var domain = server_url + ":" + httpPort;
var jwt = require('jsonwebtoken');
var pool = require('../../server.js').pool;
var jwtSecret = require('../../server.js').jwtSecret;
var transporter = require('../../server.js').transporter;
var mail_options = require('../../server.js').mail_options;

var fs = require("fs");
var dir = "/../../sql/queries/members/";
var query_get_member = fs.readFileSync(__dirname + dir + 'get.sql', 'utf8').toString();
var query_login_member = fs.readFileSync(__dirname + dir + 'login.sql', 'utf8').toString();
var query_reset_fails = fs.readFileSync(__dirname + dir + 'reset_fails.sql', 'utf8').toString();
var query_edit_member_by_admin_pw = fs.readFileSync(__dirname + dir + 'edit_by_admin_pw.sql', 'utf8').toString();
var query_edit_member_by_admin = fs.readFileSync(__dirname + dir + 'edit_by_admin.sql', 'utf8').toString();
var query_edit_member_by_member_pw = fs.readFileSync(__dirname + dir + 'edit_by_member_pw.sql', 'utf8').toString();
var query_edit_member_by_member = fs.readFileSync(__dirname + dir + 'edit_by_member.sql', 'utf8').toString();


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
                            if(decoded.admin){
                                callback(null, client, done, true);
                            } else {
                                callback(null, client, done, false);
                            }
                        } else {
                            callback(new Error("Authorization failed"), 401);
                        }
                    }
                });
            } else {
                callback(new Error("Authorization failed"), 401);
            }
        },
        function(client, done, isAdmin, callback) {
            // Database query
            client.query(query_get_member, [
                req.params.member_id
            ], function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    // Check if Member exists
                    if (result.rows.length === 0) {
                        callback(new Error("Member not found"), 404);
                    } else {
                        callback(null, client, done, isAdmin, result.rows[0]);
                    }
                }
            });
        },
        function(client, done, isAdmin, member, callback) {
            // If admin requested account, reset fails
            if(isAdmin){
                if(req.body.new_password){
                    // Database query
                    client.query(query_reset_fails, [
                        req.params.member_id
                    ], function(err, result) {
                        done();
                        if (err) {
                            callback(err, 500);
                        } else {
                            // Check if Member exists
                            if (result.rows.length === 0) {
                                callback(new Error("Member not found"), 404);
                            } else {
                                callback(null, client, done, isAdmin, query_edit_member_by_admin_pw, member);
                            }
                        }
                    });
                } else {
                    // Database query
                    client.query(query_reset_fails, [
                        req.params.member_id
                    ], function(err, result) {
                        done();
                        if (err) {
                            callback(err, 500);
                        } else {
                            // Check if Member exists
                            if (result.rows.length === 0) {
                                callback(new Error("Member not found"), 404);
                            } else {
                                callback(null, client, done, isAdmin, query_edit_member_by_admin, member);
                            }
                        }
                    });
                }
            } else {
                // Validate old password, if member requested account
                if(req.body.new_password){
                    // Database query
                    client.query(query_get_member, [
                        req.params.member_id,
                        req.body.old_password
                    ], function(err, result) {
                        done();
                        if (err) {
                            callback(err, 500);
                        } else {
                            // Check if Member exists
                            if (result.rows.length === 0) {
                                callback(new Error("Member not found"), 404);
                            } else {
                                callback(null, client, done, isAdmin, query_edit_member_by_member_pw, member);
                            }
                        }
                    });
                } else {
                    callback(null, client, done, isAdmin, query_edit_member_by_member, member);
                }
            }
        },
        function(client, done, isAdmin, query, member, callback) {
            // TODO: Add object/schema validation
            var object = {
                member_id: req.params.member_id,
                email_address: req.body.email_address,
                title: req.body.title,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                working_group_id: req.body.working_group_id,
                office_room_number: req.body.office_room_number,
                office_phone_number: req.body.office_phone_number,
                office_email_address: req.body.office_email_address,
                subscribed: req.body.subscribed
            };

            // Check if admin requested
            if(isAdmin){
                object.former = req.body.former;
                object.admin = req.body.admin;
            }

            // Check if a new password needs to be set
            if(req.body.new_password){
                object.password = req.body.password;
            }

            var params = _.values(object);
            callback(null, client, done, query, params, member);
        },
        function(client, done, query, params, member, callback){
            // Database query
            client.query(query, params, function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    callback(null, client, done, member, result.rows[0]);
                }
            });
        },
        function(client, done, member, updated_member, callback) {
            // Check if member-account has been deactivated (set to former) or reactivated
            if(member.former !== updated_member.former){

                // Prepare HTML content
                var output = "";

                // Prepare text for emails without HTML support
                var text = "";

                // Prepare subject
                var subject = "[Ethics-App] ";

                if(updated_member.former){
                    text = "Your member account has been deactivated";
                    subject = subject + "Your member account has been deactivated";
                    output = mustache.render(template_member_account_deactivated, {
                        member: member,
                        updated_member: updated_member,
                        year: moment().format("YYYY")
                    });
                } else {
                    text = "Your member account has been reactivated";
                    subject = subject + "Your member account has been reactivated";
                    output = mustache.render(template_member_account_reactivated, {
                        member: member,
                        updated_member: updated_member,
                        year: moment().format("YYYY")
                    });
                }

                // Send email
                transporter.sendMail({
                    from: mail_options,
                    to: updated_member.email_address,
                    subject: subject,
                    text: text,
                    html: output
                }, function(err, info) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, 200, updated_member);
                    }
                });

            } else {
                callback(null, 200, updated_member);
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
