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
var pool = require('../../server.js').pool;
var transporter = require('../../server.js').transporter;
var mail_options = require('../../server.js').mail_options;

var fs = require("fs");
var dir_1 = "/../../templates/emails/";
var dir_2 = "/../../sql/queries/users/";
var dir_3 = "/../../sql/queries/documents/";
var dir_4 = "/../../sql/queries/revisions/";
var template = fs.readFileSync(__dirname + dir_1 + 'document_created.html', 'utf8').toString();
var query_get_user = fs.readFileSync(__dirname + dir_2 + 'get.sql', 'utf8').toString();
var query_create_document = fs.readFileSync(__dirname + dir_3 + 'create.sql', 'utf8').toString();
var query_create_revision = fs.readFileSync(__dirname + dir_4 + 'create.sql', 'utf8').toString();


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
            client.query(query_get_user, [
                req.params.user_id
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
            // TODO: Add object/schema validation
            var object = {
                document_id: uuid.v1(),
                user_id: req.params.user_id,
                document_title: req.body.document_title,
            };
            var params = _.values(object);
            callback(null, client, done, user, params);
        },
        function(client, done, user, params, callback){
            // Database query
            client.query(query_create_document, params, function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    callback(null, client, done, user, result.rows[0]);
                }
            });
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
            var _document = document;

            // Formatting
            switch(_document.status){
                case 0: {
                    _document.label = "tag-default";
                    _document.status_description = "initialised";
                    break;
                }
                case 1: {
                    _document.label = "tag-default";
                    _document.status_description = "unsubmitted";
                    break;
                }
                case 2: {
                    _document.label = "tag-success";
                    _document.status_description = "submitted";
                    break;
                }
                case 3: {
                    _document.label = "tag-primary";
                    _document.status_description = "review pending";
                    break;
                }
                case 4: {
                    _document.label = "tag-info";
                    _document.status_description = "under review";
                    break;
                }
                case 5: {
                    _document.label = "tag-warning";
                    _document.status_description = "partly accepted";
                    break;
                }
                case 6: {
                    _document.label = "tag-success";
                    _document.status_description = "reviewed";
                    break;
                }
                case 7: {
                    _document.label = "tag-danger";
                    _document.status_description = "rejected";
                    break;
                }
            }

            // Formatting
            _document.link = server_url + ":" + httpPort + "/documents/" + _document.document_id;

            // Render HTML content
            var output = mustache.render(template, {
                user: user,
                documents: _document,
                year: moment().format("YYYY")
            });

            // Render text for emails without HTML support
            var text = '';

            // Send email
            transporter.sendMail({
                from: mail_options.from,
                to: user.email_address,
                subject: 'Your new document has been created',
                text: '',
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
