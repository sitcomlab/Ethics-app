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
var template = fs.readFileSync(__dirname + dir_1 + 'email_address_changed.html', 'utf8').toString();
var query_get_user = fs.readFileSync(__dirname + dir_2 + 'get.sql', 'utf8').toString();
var query_edit_user = fs.readFileSync(__dirname + dir_2 + 'edit.sql', 'utf8').toString();


// PUT
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
                user_id: req.params.user_id,
                email_address: req.body.email_address,
                title: req.body.title,
                first_name: req.body.first_name,
                last_name: req.body.last_name
            };
            var params = _.values(object);
            callback(null, client, done, user, params);
        },
        function(client, done, user, params, callback){
            // Database query
            client.query(query_edit_user, params, function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    callback(null, client, done, user, result.rows[0]);
                }
            });
        },
        function(client, done, user, new_user, callback) {
            if(user.email_address === req.body.email_address){
                callback(null, 200, new_user);
            } else {
                // Render HTML content
                var output = mustache.render(template, {
                    user: user,
                    new_user: new_user,
                    year: moment().format("YYYY")
                });

                // Render text for emails without HTML support
                var text = '';

                // Send email
                transporter.sendMail({
                    from: mail_options,
                    to: user.email_address,
                    subject: 'Your email-address has been changed',
                    text: '',
                    html: output
                }, function(err, info) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, 200, new_user);
                    }
                });
            }
        },
    ], function(err, code, result) {
        if(err){
            console.error(colors.red(err));
            res.status(code).send(err.message);
        } else {
            res.status(code).send(result);
        }
    });
};
