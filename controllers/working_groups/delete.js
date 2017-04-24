var async = require('async');
var colors = require('colors');
var pg = require('pg');
var types = require('pg').types;
types.setTypeParser(1700, 'text', parseFloat);
var _ = require('underscore');
var jwt = require('jsonwebtoken');
var pool = require('../../server.js').pool;
var server_url = require('../../server.js').server_url;
var jwtSecret = require('../../server.js').jwtSecret;

var fs = require("fs");
var dir = "/../../sql/queries/working_groups/";
var query_get_group = fs.readFileSync(__dirname + dir + 'get.sql', 'utf8').toString();
var query_delete_group = fs.readFileSync(__dirname + dir + 'delete.sql', 'utf8').toString();


// DELETE
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
                        callback(new Error("Authorization failed", 401));
                    } else {
                        if(decoded.member && decoded.admin){
                            callback(null, client, done);
                        } else {
                            callback(new Error("Authorization failed", 401));
                        }
                    }
                });
            } else {
                callback(new Error("Authorization failed", 401));
            }
        },
        function(client, done, callback) {
            // Database query
            client.query(query_get_group, [
                req.params.working_group_id
            ], function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    // Check if Working group exists
                    if (result.rows.length === 0) {
                        callback(new Error("Working group not found"), 404);
                    } else {
                        callback(null, client, done, result.rows[0]);
                    }
                }
            });
        },
        function(client, done, group, callback) {
            // Database query
            client.query(query_delete_group, [
                req.params.working_group_id
            ], function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
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
