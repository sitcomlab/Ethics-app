var async = require('async');
var colors = require('colors');
var pg = require('pg');
var types = require('pg').types;
types.setTypeParser(1700, 'text', parseFloat);
var _ = require('underscore');
var moment = require('moment');
var jwt = require('jsonwebtoken');
var pool = require('../server.js').pool;
var server_url = require('../server.js').server_url;
var jwtSecret = require('../server.js').jwtSecret;

var fs = require("fs");
var dir_1 = "/../sql/queries/users/";
var dir_2 = "/../sql/queries/committee/";
var query_find_user_by_email = fs.readFileSync(__dirname + dir_1 + 'find_by_email.sql', 'utf8').toString();
var query_find_member_by_user = fs.readFileSync(__dirname + dir_2 + 'find_by_user.sql', 'utf8').toString();
var query_login = fs.readFileSync(__dirname + dir_2 + 'login.sql', 'utf8').toString();
var query_increase_fails = fs.readFileSync(__dirname + dir_2 + 'increase_fails.sql', 'utf8').toString();
var query_reset_fails = fs.readFileSync(__dirname + dir_2 + 'reset_fails.sql', 'utf8').toString();


// LOGIN
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
            client.query(query_find_user_by_email, [
                req.body.username
            ], function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    // Check if User exists
                    if (result.rows.length === 0) {
                        callback(new Error("User not found"), 404);
                    } else {
                        callback(null, client, done, result.rows[0]);
                    }
                }
            });
        },
        function(client, done, user, callback) {
            // Database query
            client.query(query_find_member_by_user, [
                user.user_id
            ], function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    // Check if Member exists
                    if (result.rows.length === 0) {
                        callback(new Error("User is not a committee member"), 404);
                    } else {
                        callback(null, client, done, user, result.rows[0]);
                    }
                }
            });
        },
        function(client, done, user, member, callback) {
            // Database query
            client.query(query_login, [
                member.user_id,
                req.body.password
            ], function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    // Check if password was correct
                    if (result.rows.length === 0) {
                        callback(null, client, done, user, member, false);
                    } else {
                        // Check if user has been tried to access fewer than 5 times
                        var fails = result.rows[0].fails;
                        if(fails <= 5){
                            callback(null, client, done, user, member, true);
                        } else {
                            callback(new Error("Your account has been locked"), 403);
                        }
                    }
                }
            });
        },
        function(client, done, user, member, loginStatus, callback) {
            if(loginStatus){
                // Database query
                client.query(query_reset_fails, [
                    member.user_id
                ], function(err, result) {
                    done();
                    if (err) {
                        callback(err, 500);
                    } else {
                        // Create payload
                        payload = {
                            iss: server_url,
                            name: member.title + ' ' + member.first_name + ' ' + member.last_name,
                            email_address: user.email_address,
                            exp: moment().add(1, 'days').format('x')
                        };
                        // Create JWT
                        member.token = jwt.sign(payload, jwtSecret);
                        callback(null, 200, member);
                    }
                });
            } else {
                // Database query
                client.query(query_increase_fails, [
                    member.user_id
                ], function(err, result) {
                    done();
                    if (err) {
                        callback(err, 500);
                    } else {
                        callback(new Error("Password incorrect"), 400);
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
