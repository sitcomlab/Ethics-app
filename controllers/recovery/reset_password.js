var async = require('async');
var colors = require('colors');
var pg = require('pg');
var types = require('pg').types;
types.setTypeParser(1700, 'text', parseFloat);
var _ = require('underscore');
var mustache = require('mustache');
var moment = require('moment');
var domain = process.env.SERVER_URL + ":" + process.env.SERVER_PORT;
var member_client_path = process.env.MEMBER_CLIENT_PATH;
var pool = require('../../server.js').pool;
var transporter = require('../../server.js').transporter;
var jwt = require('jsonwebtoken');

var fs = require("fs");
var dir_1 = "/../../templates/emails/";
var dir_2 = "/../../sql/queries/members/";
var template_member_recovery = fs.readFileSync(__dirname + dir_1 + 'member_recovery.html', 'utf8').toString();
var query_get_member = fs.readFileSync(__dirname + dir_2 + 'get.sql', 'utf8').toString();
var query_reset_password = fs.readFileSync(__dirname + dir_2 + 'reset_password.sql', 'utf8').toString();


// RESET PASSWORD
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
                jwt.verify(token, process.env.JWTSECRET, function(err, decoded) {
                    if(err){
                        console.error(colors.red(err));
                        callback(new Error("Authorization failed"), 401);
                    } else {
                        if(decoded.member){
                            // Database query
                            client.query(query_get_member, [
                                decoded.member_id
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
                        } else {
                            callback(new Error("Authorization failed"), 401);
                        }
                    }
                });
            } else {
                callback(new Error("Authorization failed"), 401);
            }
        },
        function(client, done, member, callback) {
            // Database query
            client.query(query_reset_password, [
                member.member_id,
                req.body.password
            ], function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    // Check if Member exists
                    if (result.rows.length === 0) {
                        callback(new Error("Member not found"), 404);
                    } else {
                        // TODO: Send email
                        callback(null, 204, null);
                    }
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
