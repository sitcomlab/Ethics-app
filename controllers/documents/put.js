var async = require('async');
var colors = require('colors');
var pg = require('pg');
var types = require('pg').types;
types.setTypeParser(1700, 'text', parseFloat);
var _ = require('underscore');
var pool = require('../../server.js').pool;

var fs = require("fs");
var dir_1 = "/../../sql/queries/documents/";
var dir_2 = "/../../sql/queries/courses/";
var dir_3 = "/../../sql/queries/affiliations/";
var query_get_document = fs.readFileSync(__dirname + dir_1 + 'get.sql', 'utf8').toString();
var query_edit_document = fs.readFileSync(__dirname + dir_1 + 'edit.sql', 'utf8').toString();
var query_get_course = fs.readFileSync(__dirname + dir_2 + 'get.sql', 'utf8').toString();
var query_get_course_by_document = fs.readFileSync(__dirname + dir_2 + 'get_by_document.sql', 'utf8').toString();
var query_get_affiliation = fs.readFileSync(__dirname + dir_3 + 'get.sql', 'utf8').toString();
var query_delete_affiliation = fs.readFileSync(__dirname + dir_3 + 'delete.sql', 'utf8').toString();
var query_create_affiliation = fs.readFileSync(__dirname + dir_3 + 'create.sql', 'utf8').toString();


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
            // TODO: Authentication
            callback(null, client, done);
        },
        function(client, done, callback) {
            // Database query
            client.query(query_get_document, [
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
                        callback(null, client, done);
                    }
                }
            });
        },
        function(client, done, callback) {
            if(req.params.course_id !== null){
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
                            callback(null, client, done, course);
                        }
                    }
                });
            } else {
                callback(null, client, done, undefined);
            }
        },
        function(client, done, course, callback) {
            if(course){
                // Database query
                client.query(query_get_affiliation, [
                    req.params.course_id
                ], function(err, result) {
                    done();
                    if (err) {
                        callback(err, 500);
                    } else {
                        // Check if Affiliation exists
                        if (result.rows.length === 0) {
                            callback(new Error("Affiliation not found"), 404);
                        } else {
                            callback(null, client, done, course, result.rows[0]);
                        }
                    }
                });
            } else {
                callback(null, client, done, course, undefined);
            }
        },
        function(client, done, course, affiliation, callback) {
            // Clean-up database for a new or updated affiliation
            if(affiliation){
                // Database query
                client.query(query_delete_affiliation, [
                    affiliation.affiliation_id
                ], function(err, result) {
                    done();
                    if (err) {
                        callback(err, 500);
                    } else {
                        callback(null, client, done, course);
                    }
                });
            } else {
                callback(null, client, done, course);
            }
        },
        function(client, done, course, callback) {
            // TODO: Add object/schema validation
            var object = {
                document_id: req.params.document_id,
                document_title: req.body.document_title,
                // TODO: notes: req.body.notes
            };
            var params = _.values(object);
            callback(null, client, done, params);
        },
        function(client, done, course, params, callback){
            // Database query
            client.query(query_edit_document, params, function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    callback(null, client, done, course, result.rows[0]);
                }
            });
        },
        function(client, done, course, document, callback){
            if(course){
                // Database query
                client.query(query_create_affiliation, [
                    document.document_id,
                    course.course_id
                ], function(err, result) {
                    done();
                    if (err) {
                        callback(err, 500);
                    } else {
                        document = _.extend(document, {
                            affiliation_id: affiliation.affiliation_id,
                            course_id: affiliation.course_id
                        });
                        callback(null, 200, document);
                    }
                });
            } else {
                document = _.extend(document, {
                    affiliation_id: null,
                    course_id: null
                });
                callback(null, 200, document);
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
