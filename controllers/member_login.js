var async = require('async');
var colors = require('colors');
var pg = require('pg');
var types = require('pg').types;
types.setTypeParser(1700, 'text', parseFloat);
var _ = require('underscore');
var moment = require('moment');
var jwt = require('jsonwebtoken');
var pool = require('../server.js').pool;

var fs = require("fs");
var dir = "/../sql/queries/members/";
var query_get_member_by_email = fs.readFileSync(__dirname + dir + 'get_by_email.sql', 'utf8').toString();
var query_login = fs.readFileSync(__dirname + dir + 'login.sql', 'utf8').toString();
var query_increase_fails = fs.readFileSync(__dirname + dir + 'increase_fails.sql', 'utf8').toString();
var query_reset_fails = fs.readFileSync(__dirname + dir + 'reset_fails.sql', 'utf8').toString();


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
            client.query(query_get_member_by_email, [
                req.body.username
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
            if(member.former){
                callback(new Error("You are requesting with an inactive account"), 403);
            } else {
                callback(null, client, done, member);
            }
        },
        function(client, done, member, callback) {
            // Database query
            client.query(query_login, [
                member.member_id,
                req.body.password
            ], function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    // Check if password was correct
                    if (result.rows.length === 0) {
                        callback(null, client, done, member, false);
                    } else {
                        // Check if member has been tried to access fewer than 5 times
                        var fails = result.rows[0].fails;
                        if(fails <= 5){
                            callback(null, client, done, member, true);
                        } else {
                            callback(new Error("Your account has been locked"), 403);
                        }
                    }
                }
            });
        },
        function(client, done, member, loginStatus, callback) {
            if(loginStatus){
                // Database query
                client.query(query_reset_fails, [
                    member.member_id,
                ], function(err, result) {
                    done();
                    if (err) {
                        callback(err, 500);
                    } else {
                        // Create payload
                        payload = {
                            iss: process.env.SERVER_URL,
                            sub: 'Login by email-address and password',
                            member_id: member.member_id,
                            title: member.title,
                            first_name: member.first_name,
                            last_name: member.last_name,
                            email_address: member.email_address,
                            user: false,
                            member: true,
                            admin: member.admin,
                            iat: moment().unix(),
                            exp: moment().add(1, 'days').unix()
                        };

                        // Create JWT
                        member.token = jwt.sign(payload, process.env.JWTSECRET);
                        callback(null, 200, member);
                    }
                });
            } else {
                // Database query
                client.query(query_increase_fails, [
                    member.member_id,
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
