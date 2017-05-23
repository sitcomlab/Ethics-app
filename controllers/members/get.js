var async = require('async');
var colors = require('colors');
var pg = require('pg');
var types = require('pg').types;
types.setTypeParser(1700, 'text', parseFloat);
var _ = require('underscore');
var jwt = require('jsonwebtoken');
var pool = require('../../server.js').pool;

var fs = require("fs");
var dir = "/../../sql/queries/members/";
var query_get_member = fs.readFileSync(__dirname + dir + 'get.sql', 'utf8').toString();
var query_get_member_by_member = fs.readFileSync(__dirname + dir + 'get_by_member.sql', 'utf8').toString();


// GET
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
                        callback(new Error("Authorization failed"), 401);
                    } else {
                        if(decoded.member){
                            if(decoded.admin){
                                callback(null, client, done, query_get_member_by_member);
                            } else {
                                callback(null, client, done, query_get_member_by_member);
                            }
                        } else {
                            callback(null, client, done, query_get_member);
                        }
                    }
                });
            } else {
                callback(null, client, done, query_get_member);
            }
        },
        function(client, done, query, callback) {
            // Database query
            client.query(query, [
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
                        callback(null, 200, result.rows[0]);
                    }
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
