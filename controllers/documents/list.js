var async = require('async');
var colors = require('colors');
var pg = require('pg');
var types = require('pg').types;
types.setTypeParser(1700, 'text', parseFloat);
var _ = require('underscore');
var pool = require('../../server.js').pool;

var fs = require("fs");
var dir = "/../../sql/queries/documents/";
var query_list_documents_with_author = fs.readFileSync(__dirname + dir + 'list_with_author.sql', 'utf8').toString();
var query_list_documents_filter_by_status = fs.readFileSync(__dirname + dir + 'list_filter_by_status.sql', 'utf8').toString();


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
            // TODO: Authentication
            callback(null, client, done);
        },
        function(client, done, callback) {
            var query;
            var params = [];
            // Check filters
            switch(req.query.status){
                case '0': {
                    query = query_list_documents_filter_by_status;
                    params.push(0);
                    break;
                }
                case '1': {
                    query = query_list_documents_filter_by_status;
                    params.push(1);
                    break;
                }
                case '2': {
                    query = query_list_documents_filter_by_status;
                    params.push(2);
                    break;
                }
                case '3': {
                    query = query_list_documents_filter_by_status;
                    params.push(3);
                    break;
                }
                case '4': {
                    query = query_list_documents_filter_by_status;
                    params.push(4);
                    break;
                }
                case '5': {
                    query = query_list_documents_filter_by_status;
                    params.push(5);
                    break;
                }
                case '6': {
                    query = query_list_documents_filter_by_status;
                    params.push(6);
                    break;
                }
                case '7': {
                    query = query_list_documents_filter_by_status;
                    params.push(7);
                    break;
                }
                default: {
                    query = query_list_documents_with_author;
                }
            }
            callback(null, client, done, query, params);
        },
        function(client, done, query, params, callback) {
            // Database query
            client.query(query, params, function(err, result) {
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
