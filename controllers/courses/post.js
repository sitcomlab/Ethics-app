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
var dir_2 = "/../../sql/queries/members/";
var dir_3 = "/../../sql/queries/responsibilities/";
var query_create_course = fs.readFileSync(__dirname + dir_1 + 'create.sql', 'utf8').toString();
var query_get_member = fs.readFileSync(__dirname + dir_2 + 'get.sql', 'utf8').toString();
var query_create_responsibility = fs.readFileSync(__dirname + dir_3 + 'create.sql', 'utf8').toString();
var query_get_responsibilities_by_course = fs.readFileSync(__dirname + dir_3 + 'get_by_course.sql', 'utf8').toString();


// POST
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
            // TODO: Add object/schema validation
            var object = {
                course_name: req.body.course_name,
                year: req.body.year,
                term: req.body.term,
                lecturer: req.body.lecturer,
                institute_id: req.body.institute_id
            };
            var params = _.values(object);
            callback(null, client, done, params);
        },
        function(client, done, params, callback){
            // Database query
            client.query(query_create_course, params, function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    callback(null, client, done, result.rows[0]);
                }
            });
        },
        function(client, done, course, callback){

            // Create responsibilities
            async.eachOfSeries(req.body.responsibilities, function (responsibility, key, callback) {

                // Database query
                client.query(query_get_member, [
                    responsibility.member_id
                ], function(err, result) {
                    done();
                    if (err) {
                        callback(err, 500);
                    } else {
                        // Check if Member exists
                        if (result.rows.length === 0) {
                            callback(new Error("Member not found"), 404);
                        } else {

                            // Database query
                            client.query(query_create_responsibility, [
                                course.course_id,
                                responsibility.member_id
                            ], function(err, result) {
                                done();
                                if (err) {
                                    callback(err, 500);
                                } else {
                                    callback(null);
                                }
                            });

                        }
                    }
                });

            }, function(err){
                if(err){
                    callback(err, 500);
                } else {
                    callback(null, client, done, course);
                }
            });
        },
        function(client, done, course, callback){
            // Database query
            client.query(query_get_responsibilities_by_course, [
                course.course_id
            ], function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    course.responsibilities = result.rows;
                    callback(null, 201, course);
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
