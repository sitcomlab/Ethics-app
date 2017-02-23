var async = require('async');
var colors = require('colors');
var pg = require('pg');
var types = require('pg').types;
types.setTypeParser(1700, 'text', parseFloat);
var _ = require('underscore');
var pool = require('../../server.js').pool;

var fs = require("fs");
var dir_1 = "/../../sql/queries/users/";
var dir_2 = "/../../sql/queries/documents/";
var query_get_user = fs.readFileSync(__dirname + dir_1 + 'get.sql', 'utf8').toString();
var query_list_documents_filter_by_user = fs.readFileSync(__dirname + dir_2 + 'list_filter_by_user.sql', 'utf8').toString();


// LIST BY USER
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
            // Database query
            client.query(query_list_documents_filter_by_user, [
                req.params.user_id
            ], function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    console.log(result.rows);
                    callback(null, 200, result.rows);
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