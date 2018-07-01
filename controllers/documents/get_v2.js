var async = require('async');
var colors = require('colors');
var pg = require('pg');
var types = require('pg').types;
types.setTypeParser(1700, 'text', parseFloat);
var _ = require('underscore');
var jsdiff = require('diff');
var jwt = require('jsonwebtoken');
var pool = require('../../server.js').pool;

var fs = require("fs");
var dir_1 = "/../../sql/queries/documents/";
var dir_2 = "/../../sql/queries/courses/";
var dir_3 = "/../../sql/queries/revisions/";
var dir_4 = "/../../sql/queries/descriptions/";
var dir_5 = "/../../sql/queries/concerns/";
var dir_6 = "/../../sql/queries/comments/";
var dir_7 = "/../../sql/queries/reviewers/";

var query_get_document = fs.readFileSync(__dirname + dir_1 + 'get.sql', 'utf8').toString();
var query_get_document_with_user = fs.readFileSync(__dirname + dir_1 + 'get_with_user.sql', 'utf8').toString();
var query_get_course_by_document = fs.readFileSync(__dirname + dir_2 + 'get_by_document.sql', 'utf8').toString();
var query_list_revisions_by_document = fs.readFileSync(__dirname + dir_3 + 'list_by_document.sql', 'utf8').toString();
var query_get_descriptions_by_revision = fs.readFileSync(__dirname + dir_4 + 'get_by_revision.sql', 'utf8').toString();
var query_get_concerns_by_revision = fs.readFileSync(__dirname + dir_5 + 'get_by_revision.sql', 'utf8').toString();
var query_get_comments_by_revision = fs.readFileSync(__dirname + dir_6 + 'get_by_revision.sql', 'utf8').toString();
var query_get_reviewer_by_revision = fs.readFileSync(__dirname + dir_7 + 'get_by_revision.sql', 'utf8').toString();


// GET v2
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
                            callback(null, client, done, query_get_document_with_user);
                        } else {
                            callback(null, client, done, query_get_document);
                        }
                    }
                });
            } else {
                callback(new Error("Authorization failed"), 401);
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
                    callback(null, client, done, document);
                }
            });
        },
        function(client, done, document, callback) {
            // Database query
            client.query(query_list_revisions_by_document, [
                req.params.document_id
            ], function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    document.revisions = result.rows;
                    callback(null, client, done, document);
                }
            });
        },
        function(client, done, document, callback) {
            async.eachOfSeries(document.revisions, function (revision, key, callback) {
                async.parallel([
                    function(callback){
                        // Database query
                        client.query(query_get_descriptions_by_revision, [
                            revision.revision_id
                        ], function(err, result) {
                            done();
                            if (err) {
                                callback(err, 500);
                            } else {
                                revision.descriptions = result.rows[0];
                                callback(null);
                            }
                        });
                    },
                    function(callback){
                        // Database query
                        client.query(query_get_concerns_by_revision, [
                            revision.revision_id
                        ], function(err, result) {
                            done();
                            if (err) {
                                callback(err, 500);
                            } else {
                                revision.concerns = result.rows[0];
                                callback(null);
                            }
                        });
                    },
                    function(callback){
                        // Database query
                        client.query(query_get_comments_by_revision, [
                            revision.revision_id
                        ], function(err, result) {
                            done();
                            if (err) {
                                callback(err, 500);
                            } else {
                                revision.comments = result.rows[0];
                                callback(null);
                            }
                        });
                    },
                    function(callback){
                        // Database query
                        client.query(query_get_reviewer_by_revision, [
                            revision.revision_id
                        ], function(err, result) {
                            done();
                            if (err) {
                                callback(err, 500);
                            } else {
                                revision.reviewer = result.rows.length > 0 ? result.rows[0]: null;
                                callback(null);
                            }
                        });
                    }
                ], function(err){
                    if (err) {
                        callback(err);
                    } else {
                        callback(null);
                    }
                });
            }, function(err) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, document);
                }
            });
        },
        function(document, callback) {
            // Create diff
            async.eachOfSeries(document.revisions, function (revision, key, callback) {
                revision.descriptions.en_title_diff = [];
                revision.descriptions.en_researcher_diff = [];
                revision.descriptions.en_study_time_diff = [];
                revision.descriptions.en_purpose_diff = [];
                revision.descriptions.en_procedure_diff = [];
                revision.descriptions.en_duration_diff = [];
                revision.descriptions.en_risks_diff = [];
                revision.descriptions.en_benefits_diff = [];

                revision.descriptions.de_title_diff = [];
                revision.descriptions.de_researcher_diff = [];
                revision.descriptions.de_study_time_diff = [];
                revision.descriptions.de_purpose_diff = [];
                revision.descriptions.de_procedure_diff = [];
                revision.descriptions.de_duration_diff = [];
                revision.descriptions.de_risks_diff = [];
                revision.descriptions.de_benefits_diff = [];

                revision.descriptions.pt_title_diff = [];
                revision.descriptions.pt_researcher_diff = [];
                revision.descriptions.pt_study_time_diff = [];
                revision.descriptions.pt_purpose_diff = [];
                revision.descriptions.pt_procedure_diff = [];
                revision.descriptions.pt_duration_diff = [];
                revision.descriptions.pt_risks_diff = [];
                revision.descriptions.pt_benefits_diff = [];

                revision.concerns.q01_explanation_diff = [];
                revision.concerns.q02_explanation_diff = [];
                revision.concerns.q03_explanation_diff = [];
                revision.concerns.q04_explanation_diff = [];
                revision.concerns.q05_explanation_diff = [];
                revision.concerns.q06_explanation_diff = [];
                revision.concerns.q07_explanation_diff = [];
                revision.concerns.q08_explanation_diff = [];
                revision.concerns.q09_explanation_diff = [];
                revision.concerns.q10_explanation_diff = [];
                revision.concerns.q11_1_explanation_diff = [];
                revision.concerns.q11_2_explanation_diff = [];
                revision.concerns.q12_explanation_diff = [];
                revision.concerns.q13_explanation_diff = [];
                revision.concerns.q14_explanation_diff = [];

                // Study descriptions (en)
                revision.descriptions.en_title_diff = jsdiff.diffSentences(
                    (document.revisions[key+1] ? (document.revisions[key+1].descriptions.en_title != null ? document.revisions[key+1].descriptions.en_title : "") : ""),
                    (revision.descriptions.en_title != null ? revision.descriptions.en_title: ""),
                );
                revision.descriptions.en_researcher_diff = jsdiff.diffSentences(
                    (document.revisions[key+1] ? (document.revisions[key+1].descriptions.en_researcher != null ? document.revisions[key+1].descriptions.en_researcher : "") : ""),
                    (revision.descriptions.en_researcher != null ? revision.descriptions.en_researcher : "")
                );
                revision.descriptions.en_study_time_diff = jsdiff.diffSentences(
                    (document.revisions[key+1] ? (document.revisions[key+1].descriptions.en_study_time != null ? document.revisions[key+1].descriptions.en_study_time : "") : ""),
                    (revision.descriptions.en_study_time != null ? revision.descriptions.en_study_time : "")
                );
                revision.descriptions.en_purpose_diff = jsdiff.diffSentences(
                    (document.revisions[key+1] ? (document.revisions[key+1].descriptions.en_purpose != null ? document.revisions[key+1].descriptions.en_purpose : "") : ""),
                    (revision.descriptions.en_purpose != null ? revision.descriptions.en_purpose : "")
                );
                revision.descriptions.en_procedure_diff = jsdiff.diffSentences(
                    (document.revisions[key+1] ? (document.revisions[key+1].descriptions.en_procedure != null ? document.revisions[key+1].descriptions.en_procedure : "") : ""),
                    (revision.descriptions.en_procedure != null ? revision.descriptions.en_procedure : "")
                );
                revision.descriptions.en_duration_diff = jsdiff.diffSentences(
                    (document.revisions[key+1] ? (document.revisions[key+1].descriptions.en_duration != null ? document.revisions[key+1].descriptions.en_duration : "") : ""),
                    (revision.descriptions.en_duration != null ? revision.descriptions.en_duration : "")
                );
                revision.descriptions.en_risks_diff = jsdiff.diffSentences(
                    (document.revisions[key+1] ? (document.revisions[key+1].descriptions.en_risks != null ? document.revisions[key+1].descriptions.en_risks : "") : ""),
                    (revision.descriptions.en_risks != null ? revision.descriptions.en_risks : "")
                );
                revision.descriptions.en_benefits_diff = jsdiff.diffSentences(
                    (document.revisions[key+1] ? (document.revisions[key+1].descriptions.en_benefits != null ? document.revisions[key+1].descriptions.en_benefits : "") : ""),
                    (revision.descriptions.en_benefits != null ? revision.descriptions.en_benefits : "")
                );

                // Study descriptions (de)
                revision.descriptions.de_title_diff = jsdiff.diffSentences(
                    (document.revisions[key+1] ? (document.revisions[key+1].descriptions.de_title != null ? document.revisions[key+1].descriptions.de_title : "") : ""),
                    (revision.descriptions.de_title != null ? revision.descriptions.de_title : "")
                );
                revision.descriptions.de_researcher_diff = jsdiff.diffSentences(
                    (document.revisions[key+1] ? (document.revisions[key+1].descriptions.de_researcher != null ? document.revisions[key+1].descriptions.de_researcher : "") : ""),
                    (revision.descriptions.de_researcher != null ? revision.descriptions.de_researcher : "")
                );
                revision.descriptions.de_study_time_diff = jsdiff.diffSentences(
                    (document.revisions[key+1] ? (document.revisions[key+1].descriptions.de_study_time != null ? document.revisions[key+1].descriptions.de_study_time : "") : ""),
                    (revision.descriptions.de_study_time != null ? revision.descriptions.de_study_time : "")
                );
                revision.descriptions.de_purpose_diff = jsdiff.diffSentences(
                    (document.revisions[key+1] ? (document.revisions[key+1].descriptions.de_purpose != null ? document.revisions[key+1].descriptions.de_purpose : "") : ""),
                    (revision.descriptions.de_purpose != null ? revision.descriptions.de_purpose : "")
                );
                revision.descriptions.de_procedure_diff = jsdiff.diffSentences(
                    (document.revisions[key+1] ? (document.revisions[key+1].descriptions.de_procedure != null ? document.revisions[key+1].descriptions.de_procedure : "") : ""),
                    (revision.descriptions.de_procedure != null ? revision.descriptions.de_procedure : "")
                );
                revision.descriptions.de_duration_diff = jsdiff.diffSentences(
                    (document.revisions[key+1] ? (document.revisions[key+1].descriptions.de_duration != null ? document.revisions[key+1].descriptions.de_duration : "") : ""),
                    (revision.descriptions.de_duration != null ? revision.descriptions.de_duration : "")
                );
                revision.descriptions.de_risks_diff = jsdiff.diffSentences(
                    (document.revisions[key+1] ? (document.revisions[key+1].descriptions.de_risks != null ? document.revisions[key+1].descriptions.de_risks : "") : ""),
                    (revision.descriptions.de_risks != null ? revision.descriptions.de_risks : "")
                );
                revision.descriptions.de_benefits_diff = jsdiff.diffSentences(
                    (document.revisions[key+1] ? (document.revisions[key+1].descriptions.de_benefits != null ? document.revisions[key+1].descriptions.de_benefits : "") : ""),
                    (revision.descriptions.de_benefits != null ? revision.descriptions.de_benefits : "")
                );

                // Study descriptions (pt)
                revision.descriptions.pt_title_diff = jsdiff.diffSentences(
                    (document.revisions[key+1] ? (document.revisions[key+1].descriptions.pt_title != null ? document.revisions[key+1].descriptions.pt_title : "") : ""),
                    (revision.descriptions.pt_title != null ? revision.descriptions.pt_title : "")
                );
                revision.descriptions.pt_researcher_diff = jsdiff.diffSentences(
                    (document.revisions[key+1] ? (document.revisions[key+1].descriptions.pt_researcher != null ? document.revisions[key+1].descriptions.pt_researcher : "") : ""),
                    (revision.descriptions.pt_researcher != null ? revision.descriptions.pt_researcher : "")
                );
                revision.descriptions.pt_study_time_diff = jsdiff.diffSentences(
                    (document.revisions[key+1] ? (document.revisions[key+1].descriptions.pt_study_time != null ? document.revisions[key+1].descriptions.pt_study_time : "") : ""),
                    (revision.descriptions.pt_study_time != null ? revision.descriptions.pt_study_time : "")
                );
                revision.descriptions.pt_purpose_diff = jsdiff.diffSentences(
                    (document.revisions[key+1] ? (document.revisions[key+1].descriptions.pt_purpose != null ? document.revisions[key+1].descriptions.pt_purpose : "") : ""),
                    (revision.descriptions.pt_purpose != null ? revision.descriptions.pt_purpose : "")
                );
                revision.descriptions.pt_procedure_diff = jsdiff.diffSentences(
                    (document.revisions[key+1] ? (document.revisions[key+1].descriptions.pt_procedure != null ? document.revisions[key+1].descriptions.pt_procedure : "") : ""),
                    (revision.descriptions.pt_procedure != null ? revision.descriptions.pt_procedure : "")
                );
                revision.descriptions.pt_duration_diff = jsdiff.diffSentences(
                    (document.revisions[key+1] ? (document.revisions[key+1].descriptions.pt_duration != null ? document.revisions[key+1].descriptions.pt_duration : "") : ""),
                    (revision.descriptions.pt_duration != null ? revision.descriptions.pt_duration : "")
                );
                revision.descriptions.pt_risks_diff = jsdiff.diffSentences(
                    (document.revisions[key+1] ? (document.revisions[key+1].descriptions.pt_risks != null ? document.revisions[key+1].descriptions.pt_risks : "") : ""),
                    (revision.descriptions.pt_risks != null ? revision.descriptions.pt_risks : "")
                );
                revision.descriptions.pt_benefits_diff = jsdiff.diffSentences(
                    (document.revisions[key+1] ? (document.revisions[key+1].descriptions.pt_benefits != null ? document.revisions[key+1].descriptions.pt_benefits : "") : ""),
                    (revision.descriptions.pt_benefits != null ? revision.descriptions.pt_benefits : "")
                );

                // Study concerns
                revision.concerns.q01_explanation_diff = jsdiff.diffSentences(
                    (document.revisions[key+1] ? (document.revisions[key+1].concerns.q01_explanation != null ? document.revisions[key+1].concerns.q01_explanation : "") : ""),
                    (revision.concerns.q01_explanation != null ? revision.concerns.q01_explanation : "")
                );
                revision.concerns.q02_explanation_diff = jsdiff.diffSentences(
                    (document.revisions[key+1] ? (document.revisions[key+1].concerns.q02_explanation != null ? document.revisions[key+1].concerns.q02_explanation : "") : ""),
                    (revision.concerns.q02_explanation != null ? revision.concerns.q02_explanation : "")
                );
                revision.concerns.q03_explanation_diff = jsdiff.diffSentences(
                    (document.revisions[key+1] ? (document.revisions[key+1].concerns.q03_explanation != null ? document.revisions[key+1].concerns.q03_explanation : "") : ""),
                    (revision.concerns.q03_explanation != null ? revision.concerns.q03_explanation : "")
                );
                revision.concerns.q04_explanation_diff = jsdiff.diffSentences(
                    (document.revisions[key+1] ? (document.revisions[key+1].concerns.q04_explanation != null ? document.revisions[key+1].concerns.q04_explanation : "") : ""),
                    (revision.concerns.q04_explanation != null ? revision.concerns.q04_explanation : "")
                );
                revision.concerns.q05_explanation_diff = jsdiff.diffSentences(
                    (document.revisions[key+1] ? (document.revisions[key+1].concerns.q05_explanation != null ? document.revisions[key+1].concerns.q05_explanation : "") : ""),
                    (revision.concerns.q05_explanation != null ? revision.concerns.q05_explanation : "")
                );
                revision.concerns.q06_explanation_diff = jsdiff.diffSentences(
                    (document.revisions[key+1] ? (document.revisions[key+1].concerns.q06_explanation != null ? document.revisions[key+1].concerns.q06_explanation : "") : ""),
                    (revision.concerns.q06_explanation != null ? revision.concerns.q06_explanation : "")
                );
                revision.concerns.q07_explanation_diff = jsdiff.diffSentences(
                    (document.revisions[key+1] ? (document.revisions[key+1].concerns.q07_explanation != null ? document.revisions[key+1].concerns.q07_explanation : "") : ""),
                    (revision.concerns.q07_explanation != null ? revision.concerns.q07_explanation : "")
                );
                revision.concerns.q08_explanation_diff = jsdiff.diffSentences(
                    (document.revisions[key+1] ? (document.revisions[key+1].concerns.q08_explanation != null ? document.revisions[key+1].concerns.q08_explanation : "") : ""),
                    (revision.concerns.q08_explanation != null ? revision.concerns.q08_explanation : "")
                );
                revision.concerns.q09_explanation_diff = jsdiff.diffSentences(
                    (document.revisions[key+1] ? (document.revisions[key+1].concerns.q09_explanation != null ? document.revisions[key+1].concerns.q09_explanation : "") : ""),
                    (revision.concerns.q09_explanation != null ? revision.concerns.q09_explanation : "")
                );
                revision.concerns.q10_explanation_diff = jsdiff.diffSentences(
                    (document.revisions[key+1] ? (document.revisions[key+1].concerns.q10_explanation != null ? document.revisions[key+1].concerns.q10_explanation : "") : ""),
                    (revision.concerns.q10_explanation != null ? revision.concerns.q10_explanation : "")
                );
                revision.concerns.q11_1_explanation_diff = jsdiff.diffSentences(
                    (document.revisions[key+1] ? (document.revisions[key+1].concerns.q11_1_explanation != null ? document.revisions[key+1].concerns.q11_1_explanation : "") : ""),
                    (revision.concerns.q11_1_explanation != null ? revision.concerns.q11_1_explanation : "")
                );
                revision.concerns.q11_2_explanation_diff = jsdiff.diffSentences(
                    (document.revisions[key+1] ? (document.revisions[key+1].concerns.q11_2_explanation != null ? document.revisions[key+1].concerns.q11_2_explanation : "") : ""),
                    (revision.concerns.q11_2_explanation != null ? revision.concerns.q11_2_explanation : "")
                );
                revision.concerns.q12_explanation_diff = jsdiff.diffSentences(
                    (document.revisions[key+1] ? (document.revisions[key+1].concerns.q12_explanation != null ? document.revisions[key+1].concerns.q12_explanation : "") : ""),
                    (revision.concerns.q12_explanation != null ? revision.concerns.q12_explanation : "")
                );
                revision.concerns.q13_explanation_diff = jsdiff.diffSentences(
                    (document.revisions[key+1] ? (document.revisions[key+1].concerns.q13_explanation != null ? document.revisions[key+1].concerns.q13_explanation : "") : ""),
                    (revision.concerns.q13_explanation != null ? revision.concerns.q13_explanation : "")
                );
                revision.concerns.q14_explanation_diff = jsdiff.diffSentences(
                    (document.revisions[key+1] ? (document.revisions[key+1].concerns.q14_explanation != null ? document.revisions[key+1].concerns.q14_explanation : "") : ""),
                    (revision.concerns.q14_explanation != null ? revision.concerns.q14_explanation : "")
                );

                callback(null);
            }, function(err) {
                callback(null, 200, document);
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
