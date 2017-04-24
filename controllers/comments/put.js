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
var dir = "/../../sql/queries/comments/";
var query_get_comment = fs.readFileSync(__dirname + dir + 'get.sql', 'utf8').toString();
var query_edit_comment = fs.readFileSync(__dirname + dir + 'edit.sql', 'utf8').toString();


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
                        callback(new Error("Authorization failed", 401));
                    } else {
                        if(decoded.member){
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
            client.query(query_get_comment, [
                req.params.comment_id
            ], function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    // Check if Comment exists
                    if (result.rows.length === 0) {
                        callback(new Error("Comment not found"), 404);
                    } else {
                        callback(null, client, done);
                    }
                }
            });
        },
        function(client, done, callback) {
            // Database query
            client.query(query_edit_comment, [
                req.params.comment_id,
                req.body.published,
                req.body.general_comment,

                req.body.en_title_comment,
                req.body.en_researcher_comment,
                req.body.en_study_time_comment,
                req.body.en_purpose_comment,
                req.body.en_procedure_comment,
                req.body.en_duration_comment,
                req.body.en_risks_comment,
                req.body.en_benefits_comment,

                req.body.de_title_comment,
                req.body.de_researcher_comment,
                req.body.de_study_time_comment,
                req.body.de_purpose_comment,
                req.body.de_procedure_comment,
                req.body.de_duration_comment,
                req.body.de_risks_comment,
                req.body.de_benefits_comment,

                req.body.pt_title_comment,
                req.body.pt_researcher_comment,
                req.body.pt_study_time_comment,
                req.body.pt_purpose_comment,
                req.body.pt_procedure_comment,
                req.body.pt_duration_comment,
                req.body.pt_risks_comment,
                req.body.pt_benefits_comment,

                req.body.q01_comment,
                req.body.q02_comment,
                req.body.q03_comment,
                req.body.q04_comment,
                req.body.q05_comment,
                req.body.q06_comment,
                req.body.q07_comment,
                req.body.q08_comment,
                req.body.q09_comment,
                req.body.q10_comment,
                req.body.q11_1_comment,
                req.body.q11_2_comment,
                req.body.q12_comment,
                req.body.q13_comment
            ], function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    // Check if Comment exists
                    if (result.rows.length === 0) {
                        callback(new Error("Comment not found"), 404);
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
