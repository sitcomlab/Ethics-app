var async = require('async');
var colors = require('colors');
var pg = require('pg');
var types = require('pg').types;
types.setTypeParser(1700, 'text', parseFloat);
var _ = require('underscore');
var mustache = require('mustache');
var moment = require('moment');
var httpPort = require('../../server.js').httpPort;
var jwt = require('jsonwebtoken');
var pool = require('../../server.js').pool;
var server_url = require('../../server.js').server_url;
var jwtSecret = require('../../server.js').jwtSecret;
var transporter = require('../../server.js').transporter;
var mail_options = require('../../server.js').mail_options;

var fs = require("fs");
var dir_1 = "/../../templates/emails/";
var dir_2 = "/../../sql/queries/members/";
var template_user_account_created = fs.readFileSync(__dirname + dir_1 + 'member_account_created.html', 'utf8').toString();
var query_create_member = fs.readFileSync(__dirname + dir_2 + 'create.sql', 'utf8').toString();


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
            // Authorization
            if(req.headers.authorization) {
                var token = req.headers.authorization.substring(7);

                // Verify token
                jwt.verify(token, jwtSecret, function(err, decoded) {
                    if(err){
                        callback(new Error("Authorization failed"), 401);
                    } else {
                        if(decoded.member){
                            if(decoded.admin){
                                callback(null, client, done);
                            } else {
                                callback(new Error("Authorization failed"), 401);
                            }
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
            // TODO: Add object/schema validation
            var object = {
                email_address: req.body.email_address,
                password: req.body.password,
                title: req.body.title,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                working_group_id: req.body.working_group_id,
                office_room_number: req.body.office_room_number,
                office_phone_number: req.body.office_phone_number,
                office_email_address: req.body.office_email_address,
                subscribed: req.body.subscribed,
                former: req.body.former,
                admin: req.body.admin
            };
            var params = _.values(object);
            callback(null, client, done, params);
        },
        function(client, done, params, callback){
            // Database query
            client.query(query_create_member, params, function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    var member = result.rows[0];

                    // Prepare HTML content
                    var output = mustache.render(template_member_account_created, {
                        member: member,
                        server_url: server_url,
                        year: moment().format("YYYY")
                    });

                    // Send email
                    transporter.sendMail({
                        from: mail_options,
                        to: member.email_address,
                        subject: "[Ethics-App] Your member account has been created",
                        text: "Your member account has been created",
                        html: output
                    }, function(err, info) {
                        if (err) {
                            callback(err);
                        } else {
                            callback(null, 201, member);
                        }
                    });
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
