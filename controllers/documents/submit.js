var async = require('async');
var colors = require('colors');
var pg = require('pg');
var types = require('pg').types;
types.setTypeParser(1700, 'text', parseFloat);
var _ = require('underscore');
var mustache = require('mustache');
var moment = require('moment');
var domain = process.env.SERVER_URL + ":" + process.env.SERVER_PORT;
var member_client_path = process.env.MEMBER_CLIENT_PATH;
var pool = require('../../server.js').pool;
var transporter = require('../../server.js').transporter;

var fs = require("fs");
var dir_1 = "/../../templates/emails/";
var dir_2 = "/../../sql/queries/documents/";
var dir_3 = "/../../sql/queries/courses/";
var dir_4 = "/../../sql/queries/revisions/";
var dir_5 = "/../../sql/queries/descriptions/";
var dir_6 = "/../../sql/queries/concerns/";
var dir_7 = "/../../sql/queries/users/";
var dir_8 = "/../../sql/queries/members/";
var template_status_changed = fs.readFileSync(__dirname + dir_1 + 'document_status_changed.html', 'utf8').toString();
var template_member_review_required = fs.readFileSync(__dirname + dir_1 + 'member_review_required.html', 'utf8').toString();
var query_get_document = fs.readFileSync(__dirname + dir_2 + 'get.sql', 'utf8').toString();
var query_change_status = fs.readFileSync(__dirname + dir_2 + 'change_status.sql', 'utf8').toString();
var query_get_course_by_document = fs.readFileSync(__dirname + dir_3 + 'get_by_document.sql', 'utf8').toString();
var query_get_latest_revision_by_document = fs.readFileSync(__dirname + dir_4 + 'get_latest_by_document.sql', 'utf8').toString();
var query_get_description_by_revision = fs.readFileSync(__dirname + dir_5 + 'get_by_revision.sql', 'utf8').toString();
var query_get_concern_by_revision = fs.readFileSync(__dirname + dir_6 + 'get_by_revision.sql', 'utf8').toString();
var query_get_user = fs.readFileSync(__dirname + dir_7 + 'get.sql', 'utf8').toString();
var query_list_members_by_subscription = fs.readFileSync(__dirname + dir_8 + 'list_by_subscription.sql', 'utf8').toString();
var query_list_members_by_course = fs.readFileSync(__dirname + dir_8 + 'list_by_course_internal.sql', 'utf8').toString();


// SUBMIT
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
                        callback(null, client, done, result.rows[0]);
                    }
                }
            });
        },
        function(client, done, document, callback) {
            // Database query
            client.query(query_get_course_by_document, [
                document.document_id
            ], function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    // Check if Course exists
                    if (result.rows.length === 0) {
                        callback(null, client, done, document, false);
                    } else {
                        callback(null, client, done, document, result.rows[0]);
                    }
                }
            });
        },
        function(client, done, document, course, callback) {
            // Database query
            client.query(query_get_latest_revision_by_document, [
                req.params.document_id
            ], function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    // Check if Revision exists
                    if (result.rows.length === 0) {
                        callback(new Error("Revision not found"), 404);
                    } else {
                        callback(null, client, done, document, course, result.rows[0]);
                    }
                }
            });
        },
        function(client, done, document, course, revision, callback){
            // Database query
            client.query(query_get_description_by_revision, [
                revision.revision_id
            ],function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    // Check if Description exists
                    if (result.rows.length === 0) {
                        callback(new Error("Description not found"), 404);
                    } else {
                        callback(null, client, done, document, course, revision, result.rows[0]);
                    }
                }
            });
        },
        function(client, done, document, course, revision, description, callback) {
            // Database query
            client.query(query_get_concern_by_revision, [
                revision.revision_id
            ], function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    // Check if Concern exists
                    if (result.rows.length === 0) {
                        callback(new Error("Concern not found"), 404);
                    } else {
                        callback(null, client, done, document, course, revision, description, result.rows[0]);
                    }
                }
            });
        },
        function(client, done, document, course, revision, description, concern, callback) {

            // Auto-confirmation
            if(concern.q01_value){
                callback(null, client, done, document, course, revision, description, concern, 3);
            } else if(concern.q01_value){
                callback(null, client, done, document, course, revision, description, concern, 3);
            } else if(concern.q02_value){
                callback(null, client, done, document, course, revision, description, concern, 3);
            } else if(concern.q03_value){
                callback(null, client, done, document, course, revision, description, concern, 3);
            } else if(concern.q04_value){
                callback(null, client, done, document, course, revision, description, concern, 3);
            } else if(concern.q05_value){
                callback(null, client, done, document, course, revision, description, concern, 3);
            } else if(concern.q06_value){
                callback(null, client, done, document, course, revision, description, concern, 3);
            } else if(concern.q07_value){
                callback(null, client, done, document, course, revision, description, concern, 3);
            } else if(concern.q08_value){
                callback(null, client, done, document, course, revision, description, concern, 3);
            } else if(concern.q09_value){
                callback(null, client, done, document, course, revision, description, concern, 3);
            } else if(concern.q10_value){
                callback(null, client, done, document, course, revision, description, concern, 3);
            } else if(concern.q11_1_value){
                callback(null, client, done, document, course, revision, description, concern, 3);
            } else if(concern.q11_2_value){
                callback(null, client, done, document, course, revision, description, concern, 3);
            } else if(concern.q12_value){
                callback(null, client, done, document, course, revision, description, concern, 3);
            } else if(concern.q13_value){
                callback(null, client, done, document, course, revision, description, concern, 3);
            } else if(concern.q14_value){
                callback(null, client, done, document, course, revision, description, concern, 3);
            } else {
                // Check if document has already been in review
                if(document.status === 5){
                    callback(null, client, done, document, course, revision, description, concern, 3);
                } else {
                    callback(null, client, done, document, course, revision, description, concern, 2);
                }
            }
        },
        function(client, done, document, course, revision, description, concern, status, callback) {
            var object = {
                document_id: req.params.document_id,
                status: status
            };
            var params = _.values(object);
            callback(null, client, done, document, course, revision, description, concern, params);
        },
        function(client, done, document, course, revision, description, concern, params, callback){
            // Database query
            client.query(query_change_status, params, function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    callback(null, client, done, result.rows[0], course, revision, description, concern);
                }
            });
        },
        function(client, done, document, course, revision, description, concern, callback){
            // Database query
            client.query(query_get_user, [
                document.user_id
            ], function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    // Check if User exists
                    if (result.rows.length === 0) {
                        callback(new Error("User not found"), 404);
                    } else {
                        callback(null, client, done, document, course, revision, description, concern, result.rows[0]);
                    }
                }
            });
        },
        function(client, done, document, course, revision, description, concern, author, callback) {
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
                            callback(null, client, done, document, course, revision, description, concern, author, []);
                        } else {
                            callback(null, client, done, document, course, revision, description, concern, author, result.rows);
                        }
                    }
                });
            } else {
                callback(null, client, done, document, course, revision, description, concern, author, []);
            }
        },
        function(client, done, document, course, revision, description, concern, author, members, callback) {
            // Find responsible members, when document was not referenced to a course, or course didn't had responsible members
            if(members.length > 0){
                callback(null, client, done, document, course, revision, description, concern, author, members);
            } else {
                // Database query
                client.query(query_list_members_by_subscription, function(err, result) {
                    done();
                    if (err) {
                        callback(err, 500);
                    } else {
                        callback(null, client, done, document, course, revision, description, concern, author, result.rows);
                    }
                });
            }
        },
        function(client, done, document, course, revision, description, concern, author, members, callback){

            // Check status to notify members, in case of a review
            if(document.status === 2){
                callback(null, 204, null);
            } else {

                // Formatting
                if(concern.q01_value){
                    concern.q01_label = "badge-warning";
                    concern.q01_sign = "yes";
                } else {
                    concern.q01_label = "badge-default";
                    concern.q01_sign = "no";
                }

                if(concern.q02_value){
                    concern.q02_label = "badge-warning";
                    concern.q02_sign = "yes";
                } else {
                    concern.q02_label = "badge-default";
                    concern.q02_sign = "no";
                }

                if(concern.q03_value){
                    concern.q03_label = "badge-warning";
                    concern.q03_sign = "yes";
                } else {
                    concern.q03_label = "badge-default";
                    concern.q03_sign = "no";
                }

                if(concern.q04_value){
                    concern.q04_label = "badge-warning";
                    concern.q04_sign = "yes";
                } else {
                    concern.q04_label = "badge-default";
                    concern.q04_sign = "no";
                }

                if(concern.q05_value){
                    concern.q05_label = "badge-warning";
                    concern.q05_sign = "yes";
                } else {
                    concern.q05_label = "badge-default";
                    concern.q05_sign = "no";
                }

                if(concern.q06_value){
                    concern.q06_label = "badge-warning";
                    concern.q06_sign = "yes";
                } else {
                    concern.q06_label = "badge-default";
                    concern.q06_sign = "no";
                }

                if(concern.q07_value){
                    concern.q07_label = "badge-warning";
                    concern.q07_sign = "yes";
                } else {
                    concern.q07_label = "badge-default";
                    concern.q07_sign = "no";
                }

                if(concern.q08_value){
                    concern.q08_label = "badge-warning";
                    concern.q08_sign = "yes";
                } else {
                    concern.q08_label = "badge-default";
                    concern.q08_sign = "no";
                }

                if(concern.q09_value){
                    concern.q09_label = "badge-warning";
                    concern.q09_sign = "yes";
                } else {
                    concern.q09_label = "badge-default";
                    concern.q09_sign = "no";
                }

                if(concern.q10_value){
                    concern.q10_label = "badge-warning";
                    concern.q10_sign = "yes";
                } else {
                    concern.q10_label = "badge-default";
                    concern.q10_sign = "no";
                }

                if(concern.q11_1_value){
                    concern.q11_1_label = "badge-warning";
                    concern.q11_1_sign = "yes";
                } else {
                    concern.q11_1_label = "badge-default";
                    concern.q11_1_sign = "no";
                }

                if(concern.q11_2_value){
                    concern.q11_2_label = "badge-warning";
                    concern.q11_2_sign = "yes";
                } else {
                    concern.q11_2_label = "badge-default";
                    concern.q11_2_sign = "no";
                }

                if(concern.q12_value){
                    concern.q12_label = "badge-warning";
                    concern.q12_sign = "yes";
                } else {
                    concern.q12_label = "badge-default";
                    concern.q12_sign = "no";
                }

                if(concern.q13_value){
                    concern.q13_label = "badge-warning";
                    concern.q13_sign = "yes";
                } else {
                    concern.q13_label = "badge-default";
                    concern.q13_sign = "no";
                }

                if(concern.q14_value){
                    concern.q14_label = "badge-warning";
                    concern.q14_sign = "yes";
                } else {
                    concern.q14_label = "badge-default";
                    concern.q14_sign = "no";
                }

                // Notify each committee member
                async.eachOfSeries(members, function (member, key, callback) {

                    // Render HTML content
                    var output = mustache.render(template_member_review_required, {
                        member: member,
                        author: author,
                        document: document,
                        revision: revision,
                        description: description,
                        concern: concern,
                        course: course,
                        domain: domain,
                        member_client_path: member_client_path,
                        year: moment().format("YYYY")
                    });

                    // Render text for emails without HTML support
                    var text = "A document needs your review";

                    // Send email
                    transporter.sendMail({
                        from: {
                            name: process.env.SENDER_NAME,
                            address: process.env.SENDER_EMAIL_ADDRESS
                        },
                        to: member.email_address,
                        subject: "[Ethics-App] A document needs your review - Study title: " + description.en_title,
                        text: text,
                        html: output,
                        messageId: document.document_id + "_review_reminder@giv-ethics-app.uni-muenster.de"
                    }, function(err, info) {
                        if (err) {
                            callback(err);
                        } else {
                            callback(null);
                        }
                    });
                    callback(null);

                }, function(err){
                    callback(null, 204, null);
                });

            }
        },
    ], function(err, code, result) {
        if(err){
            console.error(colors.red(err));
            res.status(code).send(err.message);
        } else {
            res.status(code).send();
        }
    });
};
