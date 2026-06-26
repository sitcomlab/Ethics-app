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
var query_edit_concern = fs.readFileSync(__dirname + dir + 'edit.sql', 'utf8').toString();


// EDIT
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
                q01_value: req.body.q01_value,
                q01_explanation: req.body.q01_explanation,
                q02_value: req.body.q02_value,
                q02_explanation: req.body.q02_explanation,
                q03_value: req.body.q03_value,
                q03_explanation: req.body.q03_explanation,
                q04_value: req.body.q04_value,
                q04_explanation: req.body.q04_explanation,
                q05_value: req.body.q05_value,
                q05_explanation: req.body.q05_explanation,
                q06_value: req.body.q06_value,
                q06_explanation: req.body.q06_explanation,
                q07_value: req.body.q07_value,
                q07_explanation: req.body.q07_explanation,
                q08_value: req.body.q08_value,
                q08_explanation: req.body.q08_explanation,
                q09_1_value: req.body.q09_1_value,
                q09_1_explanation: req.body.q09_1_explanation,
                q09_2_value: req.body.q09_2_value,
                q09_2_explanation: req.body.q09_2_explanation,
                q10_value: req.body.q10_value,
                q10_explanation: req.body.q10_explanation,
                q11_1_value: req.body.q11_1_value,
                q11_1_explanation: req.body.q11_1_explanation,
                q11_2_value: req.body.q11_2_value,
                q11_2_explanation: req.body.q11_2_explanation,
                q12_value: req.body.q12_value,
                q12_explanation: req.body.q12_explanation,
                q13_value: req.body.q13_value,
                q13_explanation: req.body.q13_explanation,
                q14_value: req.body.q14_value,
                q14_explanation: req.body.q14_explanation,
                q15_1_value: req.body.q15_1_value,
                q15_1_explanation: req.body.q15_1_explanation,
                q15_2_value: req.body.q15_2_value,
                q15_2_explanation: req.body.q15_2_explanation,
                q15_3_value: req.body.q15_3_value,
                q15_3_explanation: req.body.q15_3_explanation
            };
            var params = _.values(object);
            callback(null, client, done, params);
        },
        function(client, done, params, callback){
            // Database query
            client.query(query_edit_concern, params, function(err, result) {
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
