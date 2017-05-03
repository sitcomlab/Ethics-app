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
var server_port = require('../../server.js').server_port;
var domain = server_url + ":" + server_port;
var pool = require('../../server.js').pool;
var transporter = require('../../server.js').transporter;
var mail_options = require('../../server.js').mail_options;

var fs = require("fs");
var dir_1 = "/../../templates/emails/";
var dir_2 = "/../../sql/queries/users/";
var dir_3 = "/../../sql/queries/documents/";
var template_document_recovery = fs.readFileSync(__dirname + dir_1 + 'document_recovery.html', 'utf8').toString();
var query_get_user_by_email = fs.readFileSync(__dirname + dir_2 + 'get_by_email.sql', 'utf8').toString();
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
            client.query(query_get_user_by_email, [
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
            // Preparing parameters
            var params = [];

            // Pagination parameters
            params.push(Number(req.query.offset) || null );
            params.push(Number(req.query.limit) || null );

            // Sorting
            params.push(req.query.orderby || 'created.desc');

            // Filter by user
            params.push(user.user_id);

            callback(null, client, done, user, params);
        },
        function(client, done, user, params, callback) {
            // Database query
            client.query(query_list_documents_by_user, params, function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    callback(null, client, done, user, result.rows);
                }
            });
        },
        function(client, done, user, documents, callback) {

            // Formatting
            for(var i=0; i<documents.length; i++){
                switch(documents[i].status){
                    case 0: {
                        documents[i]._status_label = "badge-default";
                        documents[i]._status_description = "initialised";
                        break;
                    }
                    case 1: {
                        documents[i]._status_label = "badge-default";
                        documents[i]._status_description = "unsubmitted (in progress)";
                        break;
                    }
                    case 2: {
                        documents[i]._status_label = "badge-success";
                        documents[i]._status_description = "reviewed (accepted)";
                        break;
                    }
                    case 3: {
                        documents[i]._status_label = "badge-primary";
                        documents[i]._status_description = "review requested";
                        break;
                    }
                    case 4: {
                        documents[i]._status_label = "badge-info";
                        documents[i]._status_description = "under review";
                        break;
                    }
                    case 5: {
                        documents[i]._status_label = "badge-warning";
                        documents[i]._status_description = "reviewed (partly accepted)";
                        break;
                    }
                    case 6: {
                        documents[i]._status_label = "badge-success";
                        documents[i]._status_description = "reviewed (accepted)";
                        break;
                    }
                    case 7: {
                        documents[i]._status_label = "badge-danger";
                        documents[i]._status_description = "reviewed (rejected)";
                        break;
                    }
                }
            }

            // Formatting
            var amount = documents.length;
            var amount_description = "";
            if(amount === 1){
                amount_description = "document has been found";
            } else {
                amount_description = "documents have been found";
            }

            // Render HTML content
            var output = mustache.render(template_document_recovery, {
                user: user,
                documents: documents,
                amount: amount,
                amount_description: amount_description,
                domain: domain,
                year: moment().format("YYYY")
            });

            // Render text for emails without HTML support
            var text = "You asked for your Document-IDs";

            // Send email
            transporter.sendMail({
                from: mail_options,
                to: user.email_address,
                subject: "[Ethics-App] You asked for your Document-IDs",
                text: text,
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
