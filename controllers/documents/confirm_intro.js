var async = require('async');
var colors = require('colors');
var pg = require('pg');
var types = require('pg').types;
types.setTypeParser(1700, 'text', parseFloat);
var _ = require('underscore');
var pool = require('../../server.js').pool;

var fs = require("fs");
var dir = "/../../sql/queries/documents/";
var query_get_document = fs.readFileSync(__dirname + dir + 'get.sql', 'utf8').toString();
var query_change_status = fs.readFileSync(__dirname + dir + 'change_status.sql', 'utf8').toString();


// CONFIRM INTRO
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
            // TODO: Add object/schema validation
            var object = {
                document_id: req.params.document_id,
                status: 1
            };
            var params = _.values(object);
            callback(null, client, done, document, params);
        },
        function(client, done, document, params, callback){
            if(document.status > 0){
                callback(null, 200, document);
            } else {
                // Database query
                client.query(query_change_status, params, function(err, result) {
                    done();
                    if (err) {
                        callback(err, 500);
                    } else {
                        callback(null, 200, result.rows[0]);
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
