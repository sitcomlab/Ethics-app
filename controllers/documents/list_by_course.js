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
var dir_1 = "/../../sql/queries/courses/";
var dir_2 = "/../../sql/queries/documents/";
var query_get_course = fs.readFileSync(__dirname + dir_1 + 'get.sql', 'utf8').toString();
var query_list_documents_by_course = fs.readFileSync(__dirname + dir_2 + 'list_by_course.sql', 'utf8').toString();


// LIST BY COURSE
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
            client.query(query_get_course, [
                req.params.course_id
            ], function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    // Check if Course exists
                    if (result.rows.length === 0) {
                        callback(new Error("Course not found"), 404);
                    } else {
                        callback(null, client, done);
                    }
                }
            });
        },
        function(client, done, member, callback) {
            // Preparing parameters
            var params = [];

            // Pagination parameters
            params.push(Number(req.query.offset));
            params.push(Number(req.query.limit));

            // Sorting
            params.push(req.query.orderby || 'created.desc');

            // Filter by course
            params.push(req.params.course_id);

            callback(null, client, done, params);
        },
        function(client, done, params, callback) {
            // Database query
            client.query(query_list_documents_by_course, params, function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    callback(null, 200, result.rows);
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
