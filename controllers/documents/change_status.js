var async = require('async');
var colors = require('colors');
var pg = require('pg');
var types = require('pg').types;
types.setTypeParser(1700, 'text', parseFloat);
var _ = require('underscore');
var jwt = require('jsonwebtoken');
var jwtSecret = require('../../server.js').jwtSecret;
var mustache = require('mustache');
var moment = require('moment');
var httpPort = require('../../server.js').httpPort;
var server_url = require('../../server.js').server_url;
var pool = require('../../server.js').pool;
var transporter = require('../../server.js').transporter;
var mail_options = require('../../server.js').mail_options;

var fs = require("fs");
var dir_1 = "/../../templates/emails/";
var dir_2 = "/../../sql/queries/documents/";
var dir_3 = "/../../sql/queries/revisions/";
var dir_4 = "/../../sql/queries/descriptions/";
var dir_5 = "/../../sql/queries/concerns/";
var dir_6 = "/../../sql/queries/comments/";
var dir_7 = "/../../sql/queries/users/";

var template_status_4 = fs.readFileSync(__dirname + dir_1 + 'document_under_review.html', 'utf8').toString();
var template_status_5 = fs.readFileSync(__dirname + dir_1 + 'document_partly_accepted.html', 'utf8').toString();
var template_status_6 = fs.readFileSync(__dirname + dir_1 + 'document_accepted.html', 'utf8').toString();
var template_status_7 = fs.readFileSync(__dirname + dir_1 + 'document_rejected.html', 'utf8').toString();

var query_get_document = fs.readFileSync(__dirname + dir_2 + 'get.sql', 'utf8').toString();
var query_change_status = fs.readFileSync(__dirname + dir_2 + 'change_status.sql', 'utf8').toString();
var query_get_latest_revision_by_document = fs.readFileSync(__dirname + dir_3 + 'get_latest_by_document.sql', 'utf8').toString();
var query_create_revision = fs.readFileSync(__dirname + dir_3 + 'create.sql', 'utf8').toString();
var query_get_description_by_revision = fs.readFileSync(__dirname + dir_4 + 'get_by_revision.sql', 'utf8').toString();
var query_create_description = fs.readFileSync(__dirname + dir_4 + 'create.sql', 'utf8').toString();
var query_get_concern_by_revision = fs.readFileSync(__dirname + dir_5 + 'get_by_revision.sql', 'utf8').toString();
var query_create_concern = fs.readFileSync(__dirname + dir_5 + 'create.sql', 'utf8').toString();
var query_get_comment_by_revision = fs.readFileSync(__dirname + dir_6 + 'get_by_revision.sql', 'utf8').toString();
var query_create_comment = fs.readFileSync(__dirname + dir_6 + 'create.sql', 'utf8').toString();
var query_get_user = fs.readFileSync(__dirname + dir_7 + 'get.sql', 'utf8').toString();


// CHANGE STATUS
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
                        res.status(401).send("Authorization failed!");
                    } else {
                        if(decoded.member){
                            callback(null, client, done);
                        } else {
                            res.status(401).send("Authorization failed!");
                        }
                    }
                });
            } else {
                res.status(401).send("Authorization failed!");
            }
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
        function(client, done, document, callback){
            // Database query
            client.query(query_get_latest_revision_by_document, [
                document.document_id
            ], function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    callback(null, client, done, document, result.rows[0]);
                }
            });
        },
        function(client, done, document, revision, callback){
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
                        callback(null, client, done, document, revision, result.rows[0]);
                    }
                }
            });
        },
        function(client, done, document, revision, description, callback) {
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
                        callback(null, client, done, document, revision, description, result.rows[0]);
                    }
                }
            });
        },
        function(client, done, document, revision, description, concern, callback) {
            // Database query
            client.query(query_get_comment_by_revision, [
                revision.revision_id
            ], function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    // Check if Comment exists
                    if (result.rows.length === 0) {
                        callback(new Error("Comment not found"), 404);
                    } else {
                        callback(null, client, done, document, revision, description, concern, result.rows[0]);
                    }
                }
            });
        },
        function(client, done, document, revision, description, concern, comment, callback){
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
                        callback(null, client, done, document, revision, description, concern, comment, result.rows[0]);
                    }
                }
            });
        },
        function(client, done, document, revision, description, concern, comment, user, callback){
            // TODO: Add object/schema validation
            var object = {
                document_id: req.params.document_id,
                status: req.body.status
            };
            var params = _.values(object);
            callback(null, client, done, document, revision, description, concern, comment, user, params);
        },
        function(client, done, document, revision, description, concern, comment, user, params, callback){
            // Database query
            client.query(query_change_status, params, function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    // Check if Document exists
                    if (result.rows.length === 0) {
                        callback(new Error("Document not found"), 404);
                    } else {
                        callback(null, client, done, document, revision, description, concern, comment, user, result.rows[0]);
                    }
                }
            });
        },
        function(client, done, document, revision, description, concern, comment, user, updated_document, callback){
            // Check if new revision is needed
            if((document.status !== updated_document.status) && updated_document.status == 5){
                // Database query
                client.query(query_create_revision, [
                    document.document_id,
                    revision.version + 1
                ], function(err, result) {
                    done();
                    if (err) {
                        callback(err, 500);
                    } else {
                        callback(null, client, done, document, revision, description, concern, comment, user, updated_document, result.rows[0]);
                    }
                });
            } else {
                callback(null, client, done, document, revision, description, concern, comment, user, updated_document, undefined);
            }
        },
        function(client, done, document, revision, description, concern, comment, user, updated_document, new_revision, callback){
            // Check if new revision exists
            if(new_revision){
                // Database query
                client.query(query_create_description, [
                    new_revision.revision_id,
                    description.en_title,
                    description.en_researcher,
                    description.en_study_time,
                    description.en_purpose,
                    description.en_procedure,
                    description.en_duration,
                    description.en_risks,
                    description.en_benefits,
                    description.de_used,
                    description.de_title,
                    description.de_researcher,
                    description.de_study_time,
                    description.de_purpose,
                    description.de_procedure,
                    description.de_duration,
                    description.de_risks,
                    description.de_benefits,
                    description.pt_used,
                    description.pt_title,
                    description.pt_researcher,
                    description.pt_study_time,
                    description.pt_purpose,
                    description.pt_procedure,
                    description.pt_duration,
                    description.pt_risks,
                    description.pt_benefits
                ], function(err, result) {
                    done();
                    if (err) {
                        callback(err, 500);
                    } else {
                        callback(null, client, done, document, revision, description, concern, comment, user, updated_document, new_revision);
                    }
                });
            } else {
                callback(null, client, done, document, revision, description, concern, comment, user, updated_document, new_revision);
            }
        },
        function(client, done, document, revision, description, concern, comment, user, updated_document, new_revision, callback){
            // Check if new revision exists
            if(new_revision){
                // Database query
                client.query(query_create_concern, [
                    new_revision.revision_id,
                    concern.q01_value,
                    concern.q01_explanation,
                    concern.q02_value,
                    concern.q02_explanation,
                    concern.q03_value,
                    concern.q03_explanation,
                    concern.q04_value,
                    concern.q04_explanation,
                    concern.q05_value,
                    concern.q05_explanation,
                    concern.q06_value,
                    concern.q06_explanation,
                    concern.q07_value,
                    concern.q07_explanation,
                    concern.q08_value,
                    concern.q08_explanation,
                    concern.q09_value,
                    concern.q09_explanation,
                    concern.q10_value,
                    concern.q10_explanation,
                    concern.q11_1_value,
                    concern.q11_1_explanation,
                    concern.q11_2_value,
                    concern.q11_2_explanation,
                    concern.q12_value,
                    concern.q12_explanation,
                    concern.q13_value,
                    concern.q13_explanation
                ], function(err, result) {
                    done();
                    if (err) {
                        callback(err, 500);
                    } else {
                        callback(null, client, done, document, revision, description, concern, comment, user, updated_document, new_revision);
                    }
                });
            } else {
                callback(null, client, done, document, revision, description, concern, comment, user, updated_document, new_revision);
            }
        },
        function(client, done, document, revision, description, concern, comment, user, updated_document, new_revision, callback){
            // Check if new revision exists
            if(new_revision){
                // Database query
                client.query(query_create_comment, [
                    new_revision.revision_id
                ], function(err, result) {
                    done();
                    if (err) {
                        callback(err, 500);
                    } else {
                        callback(null, client, done, document, revision, description, concern, comment, user, updated_document, new_revision);
                    }
                });
            } else {
                callback(null, client, done, document, revision, description, concern, comment, user, updated_document, new_revision);
            }
        },
        function(client, done, document, revision, description, concern, comment, user, updated_document, new_revision, callback){

            // Notify user, when status has been changed
            if(document.status !== updated_document.status){
                // Formatting
                document.link = server_url + ":" + httpPort + "/user-client/documents/" + document.document_id + "/login";

                var link = server_url + ":" + httpPort + "/user-client/";

                var template;
                switch (updated_document.status) {
                    case 4: {
                        template = template_status_4;
                        break;
                    }
                    case 5: {
                        template = template_status_5;
                        break;
                    }
                    case 6: {
                        template = template_status_6;
                        break;
                    }
                    case 7: {
                        template = template_status_7;
                        break;
                    }
                }

                // Render HTML content
                var output = mustache.render(template, {
                    user: user,
                    document: updated_document,
                    link: link,
                    year: moment().format("YYYY")
                });

                // Render text for emails without HTML support
                var text = '';

                // Send email
                transporter.sendMail({
                    from: mail_options,
                    to: user.email_address,
                    subject: 'The status of your document has been changed',
                    text: '',
                    html: output
                }, function(err, info) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, 200, updated_document);
                    }
                });
            } else {
                callback(null, 200, updated_document);
            }
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