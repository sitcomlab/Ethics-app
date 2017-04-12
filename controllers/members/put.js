var async = require('async');
var colors = require('colors');
var pg = require('pg');
var types = require('pg').types;
types.setTypeParser(1700, 'text', parseFloat);
var _ = require('underscore');
var jwt = require('jsonwebtoken');
var pool = require('../../server.js').pool;
var server_url = require('../../server.js').server_url;
var jwtSecret = require('../../server.js').jwtSecret;

var fs = require("fs");
var dir = "/../../sql/queries/members/";
var query_get_member = fs.readFileSync(__dirname + dir + 'get.sql', 'utf8').toString();
var query_edit_member = fs.readFileSync(__dirname + dir + 'edit.sql', 'utf8').toString();


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

                        // TODO: Update query to support former members for admins
                        if(decoded.admin){
                            // callback(null, client, done, query);
                        } else {
                            // callback(null, client, done, query);
                        }
                    }
                });
            } else {
                res.status(401).send("Authorization failed!");
            }
        },
        function(client, done, callback) {
            // Database query
            client.query(query_get_member, [
                req.params.member_id
            ], function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    // Check if Member exists
                    if (result.rows.length === 0) {
                        callback(new Error("Member not found"), 404);
                    } else {
                        callback(null, client, done, result.rows[0]);
                    }
                }
            });
        },
        function(client, done, member, callback) {
            // TODO: Add object/schema validation
            var object = {
                member_id: req.params.member_id,
                email_address: req.body.email_address,
                title: req.body.title,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                working_group_id: req.body.working_group_id,
                office_room_number: req.body.office_room_number,
                office_phone_number: req.body.office_phone_number,
                office_email_address: req.body.office_email_address,
                subscribed: req.body.subscribed,
                former: req.body.former
            };
            var params = _.values(object);
            callback(null, client, done, member, params);
        },
        function(client, done, member, params, callback){
            // Database query
            client.query(query_edit_member, params, function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    callback(null, 200, result.rows[0]);
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
