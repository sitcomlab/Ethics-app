var async = require('async');
var colors = require('colors');
var pg = require('pg');
var types = require('pg').types;
types.setTypeParser(1700, 'text', parseFloat);
var _ = require('underscore');
var pool = require('../../server.js').pool;

var fs = require("fs");
var dir = "/../../sql/queries/institutes/";
var query_list_institutes = fs.readFileSync(__dirname + dir + 'list.sql', 'utf8').toString();


// LIST
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

            // Preparing parameters
            var params = [];

            // Pagination parameters
            params.push(Number(req.query.offset));
            params.push(Number(req.query.limit));

            // Filter by former status
            params.push(req.query.former);

            callback(null, client, done, params);
        },
        function(client, done, params, callback) {
            // Database query
            client.query(query_list_institutes, params, function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
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
