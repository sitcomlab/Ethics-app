var async = require('async');
var colors = require('colors');
var pg = require('pg');
var types = require('pg').types;
types.setTypeParser(1700, 'text', parseFloat);
var _ = require('underscore');
var jwt = require('jsonwebtoken');
var pool = require('../../server.js').pool;

var fs = require("fs");
var dir_1 = "/../../sql/queries/revisions/";
var dir_2 = "/../../sql/queries/members/";
var dir_3 = "/../../sql/queries/reviewers/";
var query_get_revision = fs.readFileSync(__dirname + dir_1 + 'get.sql', 'utf8').toString();
var query_get_member = fs.readFileSync(__dirname + dir_2 + 'get.sql', 'utf8').toString();
var query_delete_reviewer_by_revision = fs.readFileSync(__dirname + dir_3 + 'delete_by_revision.sql', 'utf8').toString();
var query_create_reviewer = fs.readFileSync(__dirname + dir_3 + 'create.sql', 'utf8').toString();
var query_get_reviewer_by_revision = fs.readFileSync(__dirname + dir_3 + 'get_by_revision.sql', 'utf8').toString();


// PUT BY REVISION
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
            client.query(query_get_revision, [
                req.params.revision_id
            ], function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    // Check if Revision exists
                    if (result.rows.length === 0) {
                        callback(new Error("Revision not found"), 404);
                    } else {
                        callback(null, client, done);
                    }
                }
            });
        },
        function(client, done, callback) {
            // Database query
            client.query(query_get_member, [
                req.body.member_id
            ], function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    // Check if Member exists
                    if (result.rows.length === 0) {
                        callback(new Error("Member not found"), 404);
                    } else {
                        callback(null, client, done);
                    }
                }
            });
        },
        function(client, done, callback) {
            // Database query
            client.query(query_delete_reviewer_by_revision, [
                req.params.revision_id
            ], function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    callback(null, client, done);
                }
            });
        },
        function(client, done, callback) {
            // Database query
            client.query(query_create_reviewer, [
                req.params.revision_id,
                req.body.member_id
            ], function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    // Check if Reviewer exists
                    if (result.rows.length === 0) {
                        callback(new Error("Reviewer not found"), 404);
                    } else {
                        callback(null, client, done);
                    }
                }
            });
        },
        function(client, done, callback) {
            // Database query
            client.query(query_get_reviewer_by_revision, [
                req.params.revision_id
            ], function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    // Check if Reviewer exists
                    if (result.rows.length === 0) {
                        callback(null, 200, null);
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
