var async = require('async');
var colors = require('colors');
var pg = require('pg');
var types = require('pg').types;
types.setTypeParser(1700, 'text', parseFloat);
var _ = require('underscore');
var pool = require('../../server.js').pool;

var fs = require("fs");
var dir_1 = "/../../sql/queries/courses/";
var dir_2 = "/../../sql/queries/responsibilities/";
var query_get_course = fs.readFileSync(__dirname + dir_1 + 'get.sql', 'utf8').toString();
var query_get_responsibilities_by_course = fs.readFileSync(__dirname + dir_2 + 'get_by_course.sql', 'utf8').toString();


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
                        callback(null, client, done, result.rows[0]);
                    }
                }
            });
        },
        function(client, done, course, callback) {
            // Database query
            client.query(query_get_responsibilities_by_course, [
                req.params.course_id
            ], function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    course.responsibilities = result.rows;
                    callback(null, 200, course);
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
