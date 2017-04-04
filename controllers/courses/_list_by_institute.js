var async = require('async');
var colors = require('colors');
var pg = require('pg');
var types = require('pg').types;
types.setTypeParser(1700, 'text', parseFloat);
var _ = require('underscore');
var pool = require('../../server.js').pool;

var fs = require("fs");
var dir_1 = "/../../sql/queries/institutes/";
var dir_2 = "/../../sql/queries/courses/";
var query_get_institute = fs.readFileSync(__dirname + dir_1 + 'get.sql', 'utf8').toString();
var query_list_courses_by_institute = fs.readFileSync(__dirname + dir_2 + 'list_by_insitute.sql', 'utf8').toString();


// LIST
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
            client.query(query_get_institute, [
                req.params.institute_id
            ], function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    // Check if Institute exists
                    if (result.rows.length === 0) {
                        callback(new Error("Institute not found"), 404);
                    } else {
                        callback(null, client, done, result.rows[0]);
                    }
                }
            });
        },
        function(institute, client, done, callback) {
            // Database query
            client.query(query_list_courses_by_institute, [
                institute.institute_id
            ],function(err, result) {
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
