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
var query_get_user_by_email = fs.readFileSync(__dirname + dir_2 + 'get_by_email.sql', 'utf8').toString();
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
            // Database query
            client.query(query_list_documents_by_user, [
                user.user_id
            ], function(err, result) {
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
                        documents[i].label = "badge-default";
                        documents[i].status_description = "initialised";
                        break;
                    }
                    case 1: {
                        documents[i].label = "badge-default";
                        documents[i].status_description = "unsubmitted";
                        break;
                    }
                    case 2: {
                        documents[i].label = "badge-success";
                        documents[i].status_description = "submitted";
                        break;
                    }
                    case 3: {
                        documents[i].label = "badge-primary";
                        documents[i].status_description = "review pending";
                        break;
                    }
                    case 4: {
                        documents[i].label = "badge-info";
                        documents[i].status_description = "under review";
                        break;
                    }
                    case 5: {
                        documents[i].label = "badge-warning";
                        documents[i].status_description = "partly accepted";
                        break;
                    }
                    case 6: {
                        documents[i].label = "badge-success";
                        documents[i].status_description = "reviewed";
                        break;
                    }
                    case 7: {
                        documents[i].label = "badge-danger";
                        documents[i].status_description = "rejected";
                        break;
                    }
                }
            }

            // Formatting
            for(var j=0; j<documents.length; j++){
                documents[j].link = server_url + ":" + httpPort + "/user-client/documents/" + documents[j].document_id;
            }

            // Formatting
            var length;
            if(documents.length === 0){
                length = documents.length + " documents were found";
            } else if(documents.length === 1){
                length = documents.length + " document was found";
            } else {
                length = documents.length+ " documents were found";
            }


            // Render HTML content
            var output = mustache.render(template, {
                user: user,
                documents: documents,
                length: length,
                year: moment().format("YYYY")
            });

            // Render text for emails without HTML support
            var text = '';

            // Send email
            transporter.sendMail({
                from: mail_options,
                to: user.email_address,
                subject: '[Ethics-App] You asked for your Document-IDs',
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
