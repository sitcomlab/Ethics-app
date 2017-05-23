var async = require('async');
var colors = require('colors');
var pg = require('pg');
var types = require('pg').types;
types.setTypeParser(1700, 'text', parseFloat);
var _ = require('underscore');
var pool = require('../../server.js').pool;

var fs = require("fs");
var dir = "/../../sql/queries/descriptions/";
var query_get_description = fs.readFileSync(__dirname + dir + 'get.sql', 'utf8').toString();
var query_edit_description = fs.readFileSync(__dirname + dir + 'edit.sql', 'utf8').toString();


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
            client.query(query_get_description, [
                req.params.description_id
            ], function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    // Check if Description exists
                    if (result.rows.length === 0) {
                        callback(new Error("Description not found"), 404);
                    } else {
                        callback(null, client, done);
                    }
                }
            });
        },
        function(client, done, callback) {
            // TODO: Add object/schema validation
            var object = {
                description_id: req.params.description_id,
                en_title: req.body.en_title,
                en_researcher: req.body.en_researcher,
                en_study_time: req.body.en_study_time,
                en_purpose: req.body.en_purpose,
                en_procedure: req.body.en_procedure,
                en_duration: req.body.en_duration,
                en_risks: req.body.en_risks,
                en_benefits: req.body.en_benefits,
                de_used: req.body.de_used,
                de_title: req.body.de_title,
                de_researcher: req.body.de_researcher,
                de_study_time: req.body.de_study_time,
                de_purpose: req.body.de_purpose,
                de_procedure: req.body.de_procedure,
                de_duration: req.body.de_duration,
                de_risks: req.body.de_risks,
                de_benefits: req.body.de_benefits,
                pt_used: req.body.pt_used,
                pt_title: req.body.pt_title,
                pt_researcher: req.body.pt_researcher,
                pt_study_time: req.body.pt_study_time,
                pt_purpose: req.body.pt_purpose,
                pt_procedure: req.body.pt_procedure,
                pt_duration: req.body.pt_duration,
                pt_risks: req.body.pt_risks,
                pt_benefits: req.body.pt_benefits
            };
            var params = _.values(object);
            callback(null, client, done, params);
        },
        function(client, done, params, callback){
            // Database query
            client.query(query_edit_description, params, function(err, result) {
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
