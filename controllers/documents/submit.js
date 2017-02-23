var async = require('async');
var colors = require('colors');
var pg = require('pg');
var types = require('pg').types;
types.setTypeParser(1700, 'text', parseFloat);
var _ = require('underscore');
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
var dir_6 = "/../../sql/queries/users/";
var dir_7 = "/../../sql/queries/members/";
var template = fs.readFileSync(__dirname + dir_1 + 'review_required.html', 'utf8').toString();
var query_get_document = fs.readFileSync(__dirname + dir_2 + 'get.sql', 'utf8').toString();
var query_change_status = fs.readFileSync(__dirname + dir_2 + 'change_status.sql', 'utf8').toString();
var query_get_latest_revision_by_document = fs.readFileSync(__dirname + dir_3 + 'get_latest_by_document.sql', 'utf8').toString();
var query_get_description_by_revision = fs.readFileSync(__dirname + dir_4 + 'get_by_revision.sql', 'utf8').toString();
var query_get_concern_by_revision = fs.readFileSync(__dirname + dir_5 + 'get_by_revision.sql', 'utf8').toString();
var query_get_user = fs.readFileSync(__dirname + dir_6 + 'get.sql', 'utf8').toString();
var query_list_members_by_subscription = fs.readFileSync(__dirname + dir_7 + 'list_by_subscription.sql', 'utf8').toString();


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
                        callback(null, client, done, result.rows[0]);
                    }
                }
            });
        },
        function(client, done, document, callback) {
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
                        callback(null, client, done, document, result.rows[0]);
                    }
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
            if(concern.q01_value){
                callback(null, client, done, document, revision, description, concern, 3);
            } else if(concern.q01_value){
                callback(null, client, done, document, revision, description, concern, 3);
            } else if(concern.q02_value){
                callback(null, client, done, document, revision, description, concern, 3);
            } else if(concern.q03_value){
                callback(null, client, done, document, revision, description, concern, 3);
            } else if(concern.q04_value){
                callback(null, client, done, document, revision, description, concern, 3);
            } else if(concern.q05_value){
                callback(null, client, done, document, revision, description, concern, 3);
            } else if(concern.q06_value){
                callback(null, client, done, document, revision, description, concern, 3);
            } else if(concern.q07_value){
                callback(null, client, done, document, revision, description, concern, 3);
            } else if(concern.q08_value){
                callback(null, client, done, document, revision, description, concern, 3);
            } else if(concern.q09_value){
                callback(null, client, done, document, revision, description, concern, 3);
            } else if(concern.q10_value){
                callback(null, client, done, document, revision, description, concern, 3);
            } else if(concern.q11_1_value){
                callback(null, client, done, document, revision, description, concern, 3);
            } else if(concern.q11_2_value){
                callback(null, client, done, document, revision, description, concern, 3);
            } else if(concern.q12_value){
                callback(null, client, done, document, revision, description, concern, 3);
            } else if(concern.q13_value){
                callback(null, client, done, document, revision, description, concern, 3);
            } else {
                callback(null, client, done, document, revision, description, concern, 2);
            }
        },
        function(client, done, document, revision, description, concern, status, callback) {
            var object = {
                document_id: req.params.document_id,
                status: status
            };
            var params = _.values(object);
            callback(null, client, done, document, revision, description, concern, params);
        },
        function(client, done, document, revision, description, concern, params, callback){
            // Database query
            client.query(query_change_status, params, function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    callback(null, client, done, result.rows[0], revision, description, concern);
                }
            });
        },
        function(client, done, document, revision, description, concern, callback){
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
                        callback(null, client, done, document, revision, description, concern, result.rows[0]);
                    }
                }
            });
        },
        function(client, done, document, revision, description, concern, author, callback){
            // Database query
            client.query(query_list_members_by_subscription, function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    callback(null, client, done, document, revision, description, concern, author, result.rows);
                }
            });
        },
        function(client, done, document, revision, description, concern, author, members, callback){
            if(document.status === 2){
                callback(null, 204, null);
            } else {

                // Formatting
                if(concern.q01_value){
                    concern.q01_label = "badge-danger";
                    concern.q01_sign = "yes";
                } else {
                    concern.q01_label = "badge-success";
                    concern.q01_sign = "no";
                }
                if(concern.q02_value){
                    concern.q02_label = "badge-danger";
                    concern.q02_sign = "yes";
                } else {
                    concern.q02_label = "badge-success";
                    concern.q02_sign = "no";
                }
                if(concern.q03_value){
                    concern.q03_label = "badge-danger";
                    concern.q03_sign = "yes";
                } else {
                    concern.q03_label = "badge-success";
                    concern.q03_sign = "no";
                }
                if(concern.q04_value){
                    concern.q04_label = "badge-danger";
                    concern.q04_sign = "yes";
                } else {
                    concern.q04_label = "badge-success";
                    concern.q04_sign = "no";
                }
                if(concern.q05_value){
                    concern.q05_label = "badge-danger";
                    concern.q05_sign = "yes";
                } else {
                    concern.q05_label = "badge-success";
                    concern.q05_sign = "no";
                }
                if(concern.q06_value){
                    concern.q06_label = "badge-danger";
                    concern.q06_sign = "yes";
                } else {
                    concern.q06_label = "badge-success";
                    concern.q06_sign = "no";
                }
                if(concern.q07_value){
                    concern.q07_label = "badge-danger";
                    concern.q07_sign = "yes";
                } else {
                    concern.q07_label = "badge-success";
                    concern.q07_sign = "no";
                }
                if(concern.q08_value){
                    concern.q08_label = "badge-danger";
                    concern.q08_sign = "yes";
                } else {
                    concern.q08_label = "badge-success";
                    concern.q08_sign = "no";
                }
                if(concern.q09_value){
                    concern.q09_label = "badge-danger";
                    concern.q09_sign = "yes";
                } else {
                    concern.q09_label = "badge-success";
                    concern.q09_sign = "no";
                }
                if(concern.q10_value){
                    concern.q10_label = "badge-danger";
                    concern.q10_sign = "yes";
                } else {
                    concern.q10_label = "badge-success";
                    concern.q10_sign = "no";
                }
                if(concern.q11_1_value){
                    concern.q11_1_label = "badge-danger";
                    concern.q11_1_sign = "yes";
                } else {
                    concern.q11_1_label = "badge-success";
                    concern.q11_1_sign = "no";
                }
                if(concern.q11_2_value){
                    concern.q11_2_label = "badge-danger";
                    concern.q11_2_sign = "yes";
                } else {
                    concern.q11_2_label = "badge-success";
                    concern.q11_2_sign = "no";
                }
                if(concern.q12_value){
                    concern.q12_label = "badge-danger";
                    concern.q12_sign = "yes";
                } else {
                    concern.q12_label = "badge-success";
                    concern.q12_sign = "no";
                }
                if(concern.q13_value){
                    concern.q13_label = "badge-danger";
                    concern.q13_sign = "yes";
                } else {
                    concern.q13_label = "badge-success";
                    concern.q13_sign = "no";
                }

                // Formatting
                document.link = server_url + ":" + httpPort + "/admin/documents/" + document.document_id + "/review";

                var link = server_url + ":" + httpPort + "/admin/";

                // Notify each committee members
                async.eachOfSeries(members, function (member, key, callback) {

                    // Render HTML content
                    var output = mustache.render(template, {
                        user: member,
                        author: author,
                        document: document,
                        revision: revision,
                        description: description,
                        concern: concern,
                        link: link,
                        year: moment().format("YYYY")
                    });

                    // Render text for emails without HTML support
                    var text = '';

                    // Send email
                    transporter.sendMail({
                        from: mail_options,
                        to: member.email_address,
                        subject: 'A document needs your review',
                        text: '',
                        html: output
                    }, function(err, info) {
                        if (err) {
                            callback(err);
                        } else {
                            callback();
                        }
                    });

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
