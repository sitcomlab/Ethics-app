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
var dir_2 = "/../../sql/queries/users/";
var dir_3 = "/../../sql/queries/documents/";
var template = fs.readFileSync(__dirname + dir_1 + 'recovery.html', 'utf8').toString();
var query_find_user_by_email = fs.readFileSync(__dirname + dir_2 + 'find_by_email.sql', 'utf8').toString();
var query_list_documents_by_user = fs.readFileSync(__dirname + dir_3 + 'list_by_user.sql', 'utf8').toString();
var query_list_documents_by_user = fs.readFileSync(__dirname + dir_3 + 'list_by_user.sql', 'utf8').toString();


// FIND BY EMAIL
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
            client.query(query_find_user_by_email, [
                req.params.email_address
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
            // Database query
            client.query(query_list_documents_by_user, [
                user.user_id
            ], function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    // Check if Documents exist
                    if (result.rows.length === 0) {
                        callback(new Error("No Documents found"), 404);
                    } else {
                        callback(null, client, done, user, result.rows);
                    }
                }
            });
        },
        function(client, done, user, documents, callback) {

            // Formatting
            for(var i=0; i<documents.length; i++){
                switch(documents[i].status){
                    case 0: {
                        documents[i].label = "tag-default";
                        documents[i].status_description = "initialised";
                        break;
                    }
                    case 1: {
                        documents[i].label = "tag-default";
                        documents[i].status_description = "unsubmitted";
                        break;
                    }
                    case 2: {
                        documents[i].label = "tag-success";
                        documents[i].status_description = "submitted";
                        break;
                    }
                    case 3: {
                        documents[i].label = "tag-primary";
                        documents[i].status_description = "review pending";
                        break;
                    }
                    case 4: {
                        documents[i].label = "tag-info";
                        documents[i].status_description = "under review";
                        break;
                    }
                    case 5: {
                        documents[i].label = "tag-warning";
                        documents[i].status_description = "partly accepted";
                        break;
                    }
                    case 6: {
                        documents[i].label = "tag-success";
                        documents[i].status_description = "reviewed";
                        break;
                    }
                    case 7: {
                        documents[i].label = "tag-danger";
                        documents[i].status_description = "rejected";
                        break;
                    }
                }
            }

            // Formatting
            for(var j=0; j<documents.length; j++){
                documents[j].link = server_url + ":" + httpPort + "/documents/" + documents[j].document_id;
            }

            // Render HTML content
            var output = mustache.render(template, {
                user: user,
                documents: documents,
                year: moment().format("YYYY")
            });

            // Render text for emails without HTML support
            var text = '';

            // Send email
            transporter.sendMail({
                from: mail_options.from,
                to: user.email_address,
                subject: 'You asked for your Document-IDs',
                text: '',
                html: output
            }, function(err, info) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, 204, null);
                }
            });

        }
    ], function(err, code, result) {
        if(err){
            console.error(colors.red(err));
            res.status(code).send(err.message);
        } else {
            res.status(code).send();
        }
    });
};
