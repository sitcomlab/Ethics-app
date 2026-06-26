var async = require('async');
var colors = require('colors');
var pg = require('pg');
var types = require('pg').types;
types.setTypeParser(1700, 'text', parseFloat);
var _ = require('underscore');
var pool = require('../../server.js').pool;

var fs = require("fs");
var dir = "/../../sql/queries/concerns/";
var query_get_concern = fs.readFileSync(__dirname + dir + 'get.sql', 'utf8').toString();
var query_add_file = fs.readFileSync(__dirname + dir + 'set_uploaded_file.sql', 'utf8').toString();


// EDIT
exports.upload = function(req, res) {

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
            client.query(query_get_concern, [
                req.params.concern_id
            ], function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    // Check if Concern exists
                    if (result.rows.length === 0) {
                        callback(new Error("Concern not found"), 404);
                    } else {
                        callback(null, client, done);
                    }
                }
            });
        },
        function(client, done, callback) {
            // TODO: Add object/schema validation
            var object = {
                concern_id: req.params.concern_id,
                q14_filename: req.file.originalname,
                q14_filepath: '/app/files/custom/' + req.headers['x-documentid'] + "/" + req.file.filename
            };
            var params = _.values(object);
            callback(null, client, done, params);
        },
        function(client, done, params, callback){
            // Database query
            client.query(query_add_file, params, function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    callback(null, 200, params[2], result.rows[0]);
                }
            });
        }
    ], function(err, code, destination, result) {
        if(err){
            console.error(colors.red(err));
            res.status(code).send(err.message);
        } else {
            res.status(code).send(destination);
        }
    });
};
