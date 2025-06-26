var async = require('async');
var colors = require('colors');
var pg = require('pg');
var types = require('pg').types;
types.setTypeParser(1700, 'text', parseFloat);
var _ = require('underscore');
var pool = require('../../server.js').pool;

var fs = require("fs");
var dir_1 = "/../../sql/queries/revisions/";
var dir_2 = "/../../sql/queries/comments/";
var query_get_revision = fs.readFileSync(__dirname + dir_1 + 'get.sql', 'utf8').toString();
var query_get_comment_by_revision = fs.readFileSync(__dirname + dir_2 + 'get_by_revision.sql', 'utf8').toString();


// GET BY REVISION
exports.request = function(req, res) {

  console.log(req, res);

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
            client.query(query_get_revision, [
                req.params.revision_id
            ], function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    // Check if Revision exists
                    if (result.rows.length === 0) {
                        callback(new Error("Revision not found, comments"), 404);
                    } else {
                        callback(null, client, done);
                    }
                }
            });
        },
        function(client, done, callback) {
            // Database query
            client.query(query_get_comment_by_revision, [
                req.params.revision_id
            ], function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    // Check if Comment exists
                    if (result.rows.length === 0) {
                        callback(new Error("Comment not found, comments"), 404);
                    } else {
                        callback(null, 200, result.rows[0]);
                    }
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
