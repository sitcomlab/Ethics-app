var async = require('async');
var colors = require('colors');
var pg = require('pg');
var types = require('pg').types;
types.setTypeParser(1700, 'text', parseFloat);
var _ = require('underscore');
var pool = require('../../server.js').pool;

var fs = require("fs");
var dir = "/../../sql/queries/working_groups/";
var query_search_working_groups = fs.readFileSync(__dirname + dir + 'search.sql', 'utf8').toString();


// SEARCH
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
            params.push(Number(req.query.offset) || null);
            params.push(Number(req.query.limit) || null);

            // Sorting
            params.push(req.query.orderby || 'name.asc');

            // Filter by former status
            params.push(String(req.query.former));

            // Prepare search-query
            if(!req.body.search_text || req.body.search_text === ""){
                callback(new Error("No search text found"), 400);
            } else {
                var search_text = req.body.search_text;
                var search_array = search_text.split(' ');
                var search_query_text = "";

                for(var i=0; i<search_array.length; i++){
                    if(i !== search_array.length-1){
                        search_query_text = search_query_text + search_array[i] + ":*|";
                    } else {
                        search_query_text = search_query_text + search_array[i] + ":*";
                    }
                }

                params.push(search_query_text);

                callback(null, client, done, params);
            }

        },
        function(client, done, params, callback) {
            // Database query
            client.query(query_search_working_groups, params, function(err, result) {
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
