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
var dir_1 = "/../../sql/queries/documents/";
var dir_2 = "/../../sql/queries/courses/";
var query_get_document = fs.readFileSync(__dirname + dir_1 + 'get.sql', 'utf8').toString();
var query_get_document_with_user = fs.readFileSync(__dirname + dir_1 + 'get_with_user.sql', 'utf8').toString();
var query_get_course_by_document = fs.readFileSync(__dirname + dir_2 + 'get_by_document.sql', 'utf8').toString();

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
                jwt.verify(token, jwtSecret, function(err, decoded) {
                    if(err){
                        callback(new Error("Authorization failed", 401));
                    } else {
                        if(decoded.member){
                            callback(null, client, done, query_get_document_with_user);
                        } else {
                            callback(null, client, done, query_get_document);
                        }
                    }
                });
            } else {
                callback(new Error("Authorization failed", 401));
            }
        },
        function(client, done, query, callback) {
            // Database query
            client.query(query, [
                req.params.document_id
            ], function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    // Check if Document exists
                    if (result.rows.length === 0) {
                        callback(new Error("Document not found"), 404);
                    } else {
                        callback(null, client, done, result.rows[0]);
                    }
                }
            });
        },
        function(client, done, document, callback) {
            // Database query
            client.query(query_get_course_by_document, [
                req.params.document_id
            ], function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    // Check if Course exists
                    if (result.rows.length === 0) {
                        document = _.extend(document, {
                            affiliation_id: null,
                            course_id: null
                        });
                    } else {
                        document = _.extend(document, result.rows[0]);
                    }
                    callback(null, 200, document);
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
