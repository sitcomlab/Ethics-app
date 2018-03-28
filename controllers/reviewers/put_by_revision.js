var async = require('async');
var colors = require('colors');
var pg = require('pg');
var types = require('pg').types;
types.setTypeParser(1700, 'text', parseFloat);
var _ = require('underscore');
var jwt = require('jsonwebtoken');
var pool = require('../../server.js').pool;
var transporter = require('../../server.js').transporter;
var mustache = require('mustache');
var moment = require('moment');
var domain = process.env.SERVER_URL + ":" + process.env.SERVER_PORT;
var member_client_path = process.env.MEMBER_CLIENT_PATH;

var fs = require("fs");
var dir_1 = "/../../sql/queries/revisions/";
var dir_2 = "/../../sql/queries/members/";
var dir_3 = "/../../sql/queries/reviewers/";
var dir_4 = "/../../sql/queries/courses/";
var dir_5 = "/../../sql/queries/descriptions/";
var dir_8 = "/../../sql/queries/members/";

var query_get_revision = fs.readFileSync(__dirname + dir_1 + 'get.sql', 'utf8').toString();
var query_get_member = fs.readFileSync(__dirname + dir_2 + 'get.sql', 'utf8').toString();
var query_get_reviewer_by_revision = fs.readFileSync(__dirname + dir_3 + 'get_by_revision.sql', 'utf8').toString();
var query_delete_reviewer_by_revision = fs.readFileSync(__dirname + dir_3 + 'delete_by_revision.sql', 'utf8').toString();
var query_create_reviewer = fs.readFileSync(__dirname + dir_3 + 'create.sql', 'utf8').toString();
var query_get_reviewer_by_revision = fs.readFileSync(__dirname + dir_3 + 'get_by_revision.sql', 'utf8').toString();
var query_get_description_by_revision = fs.readFileSync(__dirname + dir_5 + 'get_by_revision.sql', 'utf8').toString();

var query_get_course_by_document = fs.readFileSync(__dirname + dir_4 + 'get_by_document.sql', 'utf8').toString();
var query_list_members_by_subscription = fs.readFileSync(__dirname + dir_8 + 'list_by_subscription.sql', 'utf8').toString();
var query_list_members_by_course = fs.readFileSync(__dirname + dir_8 + 'list_by_course_internal.sql', 'utf8').toString();

var template_review_claimed = fs.readFileSync(__dirname + '/../../templates/emails/member_review_claimed.html', 'utf8').toString();


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
                        callback(null, client, result.rows[0], done);
                    }
                }
            });
        },
        function(client, revision, done, callback) {
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
                        callback(null, client, result.rows[0], revision, done);
                    }
                }
            });
        },
        function(client, member, revision, done, callback) {
            // Database query
            client.query(query_get_course_by_document, [
                revision.document_id
            ], function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    // Check if Course exists
                    if (result.rows.length === 0) {
                        callback(null, client, member, revision, false, done);
                    } else {
                        callback(null, client, member, revision, result.rows[0], done);
                    }
                }
            });
        },
        function(client, member, revision, course, done, callback) {
            // Find responsible members, when document was referenced to a course
            if(course){
                // Database query
                client.query(query_list_members_by_course, [
                    course.course_id
                ], function(err, result) {
                    done();
                    if (err) {
                        callback(err, 500);
                    } else {
                        // Check if Members exists
                        if (result.rows.length === 0) {
                            callback(null, client, member, revision, [], done);
                        } else {
                            callback(null, client, member, revision, result.rows, done);
                        }
                    }
                });
            } else {
                callback(null, client, member, revision, [], done);
            }
        },
        function(client, member, revision, members, done, callback) {
            // Find responsible members, when document was not referenced to a course, or course didn't had responsible members
            if(members.length > 0){
                callback(null, client, member, revision, members, done);
            } else {
                // Database query
                client.query(query_list_members_by_subscription, function(err, result) {
                    done();
                    if (err) {
                        callback(err, 500);
                    } else {
                        callback(null, client, member, revision, result.rows, done);
                    }
                });
            }
        },
        function(client, member, revision, members, done, callback) {
            // Database query
            client.query(query_get_description_by_revision, [
                req.params.revision_id
            ], function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    // Check if Description exists
                    if (result.rows.length === 0) {
                        callback(new Error("Description not found"), 404);
                    } else {
                        callback(null, client, member, revision, members, result.rows[0], done);
                    }
                }
            });
        },
        function(client, newmember, revision, members, description, done, callback) {
            // Database query
            // Check if there is an old reviewer - if not send email that it is already taken.
            client.query(query_get_reviewer_by_revision, [
                req.params.revision_id
            ], function(err, result) {
                if (err) {
                    callback(err, 500);
                } else {
                    // Check if Member exists
                    if (result.rows.length === 0) {
                        // Notify each committee member
                        async.eachOfSeries(members, function (member, key, callback) {
                            // Render HTML content
                            var output = mustache.render(template_review_claimed, {
                                member: member,
                                newmember: newmember,
                                year: moment().format("YYYY"),
                                revision: revision,
                                description: description,
                                domain: domain,
                                member_client_path: member_client_path,
                            });

                            // Render text for emails without HTML support
                            var text = "The Review has been claimed";

                            // Send email
                            transporter.sendMail({
                                from: {
                                    name: process.env.SENDER_NAME,
                                    address: process.env.SENDER_EMAIL_ADDRESS
                                },
                                to: member.email_address,
                                inReplyTo: revision.document_id + "_review_reminder@giv-ethics-app.uni-muenster.de",
                                references: revision.document_id + "_review_reminder@giv-ethics-app.uni-muenster.de",
                                subject: "RE: [Ethics-App] A document needs your review - Study Title: " + description.en_title,
                                text: text,
                                html: output,
                            }, function(err, info) {
                                if (err) {
                                    callback(err ,500);
                                } else {
                                    callback();
                                }
                            });
                        });
                        callback(null, client, done)
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
