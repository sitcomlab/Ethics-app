var async = require('async');
var colors = require('colors');
var pg = require('pg');
var types = require('pg').types;
types.setTypeParser(1700, 'text', parseFloat);
var _ = require('underscore');
var uuid = require('uuid');
var mustache = require('mustache');
var moment = require('moment');
var httpPort = require('../../server.js').httpPort;
var server_url = require('../../server.js').server_url;
var domain = server_url + ":" + httpPort;
var pool = require('../../server.js').pool;
var transporter = require('../../server.js').transporter;
var mail_options = require('../../server.js').mail_options;

var fs = require("fs");
var dir_1 = "/../../templates/emails/";
var dir_2 = "/../../sql/queries/users/";
var dir_3 = "/../../sql/queries/documents/";
var dir_4 = "/../../sql/queries/courses/";
var dir_5 = "/../../sql/queries/affiliations/";
var dir_6 = "/../../sql/queries/revisions/";
var dir_7 = "/../../sql/queries/descriptions/";
var dir_8 = "/../../sql/queries/concerns/";
var dir_9 = "/../../sql/queries/comments/";
var dir_10 = "/../../sql/queries/notes/";

var template_document_created = fs.readFileSync(__dirname + dir_1 + 'document_created.html', 'utf8').toString();
var query_get_user_by_email = fs.readFileSync(__dirname + dir_2 + 'get_by_email.sql', 'utf8').toString();
var query_create_document = fs.readFileSync(__dirname + dir_3 + 'create.sql', 'utf8').toString();
var query_get_course = fs.readFileSync(__dirname + dir_4 + 'get.sql', 'utf8').toString();
var query_create_affiliation = fs.readFileSync(__dirname + dir_5 + 'create.sql', 'utf8').toString();
var query_create_revision = fs.readFileSync(__dirname + dir_6 + 'create.sql', 'utf8').toString();
var query_create_description = fs.readFileSync(__dirname + dir_7 + 'create.sql', 'utf8').toString();
var query_create_concern = fs.readFileSync(__dirname + dir_8 + 'create.sql', 'utf8').toString();
var query_create_comment = fs.readFileSync(__dirname + dir_9 + 'create.sql', 'utf8').toString();
var query_create_note = fs.readFileSync(__dirname + dir_10 + 'create.sql', 'utf8').toString();


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
            // Database query
            client.query(query_get_user_by_email, [
                req.body.email_address
            ], function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    // Check if User exists
                    if (result.rows.length === 0) {
                        callback(new Error("User not found"), 404);
                    } else {
                        callback(null, client, done, result.rows[0]);
                    }
                }
            });
        },
        function(client, done, user, callback) {
            if(req.body.course_id !== null){
                // Database query
                client.query(query_get_course, [
                    req.body.course_id
                ], function(err, result) {
                    done();
                    if (err) {
                        callback(err, 500);
                    } else {
                        // Check if Course exists
                        if (result.rows.length === 0) {
                            callback(new Error("Course not found"), 404);
                        } else {
                            callback(null, client, done, user, result.rows[0]);
                        }
                    }
                });
            } else {
                callback(null, client, done, user, undefined);
            }
        },
        function(client, done, user, course, callback) {
            // TODO: Add object/schema validation
            var object = {
                document_id: uuid.v1(),
                document_title: req.body.document_title,
                user_id: user.user_id
            };
            var params = _.values(object);
            callback(null, client, done, user, course, params);
        },
        function(client, done, user, course, params, callback){
            // Database query
            client.query(query_create_document, params, function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    callback(null, client, done, user, result.rows[0], course);
                }
            });
        },
        function(client, done, user, document, course, callback){
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
                        callback(null, client, done, user, document);
                    }
                });
            } else {
                callback(null, client, done, user, document);
            }
        },
        function(client, done, user, document, callback){
            // Database query
            client.query(query_create_revision, [
                document.document_id,
                1
            ], function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    callback(null, client, done, user, document, result.rows[0]);
                }
            });
        },
        function(client, done, user, document, revision, callback){
            // Database query
            client.query(query_create_description, [
                revision.revision_id,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                false,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                false,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ], function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    callback(null, client, done, user, document, revision);
                }
            });
        },
        function(client, done, user, document, revision, callback){
            // Database query
            client.query(query_create_concern, [
                revision.revision_id,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ], function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    callback(null, client, done, user, document, revision);
                }
            });
        },
        function(client, done, user, document, revision, callback){
            // Database query
            client.query(query_create_comment, [
                revision.revision_id
            ], function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    callback(null, client, done, user, document);
                }
            });
        },
        function(client, done, user, document, callback){
            // Database query
            client.query(query_create_note, [
                document.document_id
            ], function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    callback(null, client, done, user, document);
                }
            });
        },
        function(client, done, user, document, callback){

            // Render HTML content
            var output = mustache.render(template_document_created, {
                user: user,
                document: document,
                domain: domain,
                year: moment().format("YYYY")
            });

            // Render text for emails without HTML support
            var text = "Your new document has been created";

            // Send email
            transporter.sendMail({
                from: mail_options,
                to: user.email_address,
                subject: "[Ethics-App] Your new document has been created",
                text: text,
                html: output
            }, function(err, info) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, 201, document);
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
