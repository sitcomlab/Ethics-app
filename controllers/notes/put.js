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
var dir = "/../../sql/queries/notes/";
var query_get_note = fs.readFileSync(__dirname + dir + 'get.sql', 'utf8').toString();
var query_edit_note = fs.readFileSync(__dirname + dir + 'edit.sql', 'utf8').toString();


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
                            callback(null, client, done);
                        } else {
                            callback(new Error("Authorization failed"), 401);
                        }
                    }
                });
            } else {
                callback(new Error("Authorization failed"), 401);
            }
        },
        function(client, done, callback) {
            // Database query
            client.query(query_get_note, [
                req.params.note_id
            ], function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    // Check if Note exists
                    if (result.rows.length === 0) {
                        callback(new Error("Note not found"), 404);
                    } else {
                        callback(null, client, done);
                    }
                }
            });
        },
        function(client, done, callback) {
            // Preparing parameters
            var params = [];
            params.push(Number(req.params.note_id));
            params.push(req.body.note || null );

            callback(null, client, done, params);
        },
        function(client, done, params, callback) {
            // Database query
            client.query(query_edit_note, params, function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    // Check if Note exists
                    if (result.rows.length === 0) {
                        callback(new Error("Note not found"), 404);
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
