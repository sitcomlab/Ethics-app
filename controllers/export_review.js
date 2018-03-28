var async = require('async');
var colors = require('colors');
var pg = require('pg');
var types = require('pg').types;
types.setTypeParser(1700, 'text', parseFloat);
var _ = require('underscore');
var mustache = require('mustache');
var moment = require('moment');
var pool = require('../server.js').pool;
var pdf = require('html-pdf');
var uuid = require("uuid");

var fs = require("fs");
var dir_1 = "/../templates/pdfs/";
var dir_2 = "/../sql/queries/documents/";
var dir_3 = "/../sql/queries/revisions/";
var dir_4 = "/../sql/queries/descriptions/";
var dir_5 = "/../sql/queries/concerns/";

var template_review_process = fs.readFileSync(__dirname + dir_1 + 'review_process.html', 'utf8').toString();

var query_export_review = fs.readFileSync(__dirname + "/../sql/queries/" + 'export_review.sql', 'utf8').toString();

// GENERATE FILES
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
            client.query(query_export_review, [
                req.params.document_id
            ], function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    callback(null, client, done, result.rows);
                }
            });
        },
        function(client, done, data, callback) {

            // Prepare working folders
            var folders = {
                dateFolderName: moment().format("YYYY-MM-DD"),
                filesFolderName: uuid.v1()
            };
            folders.pathDateFolder = process.cwd() + '/public/files/temp/' + folders.dateFolderName;
            folders.pathFilesFolder = process.cwd() + '/public/files/temp/' + folders.dateFolderName + "/" + folders.filesFolderName;

            // Prepare result
            var result = {
                path: '/files/temp/' + folders.dateFolderName + "/" + folders.filesFolderName
            };

            // Create temp folder, if doesn't exist
            if (!fs.existsSync(process.cwd() + '/public/files/temp/')){
                fs.mkdirSync(process.cwd() + '/public/files/temp/');
            }

            // Create temporary folders
            if (!fs.existsSync(folders.pathDateFolder)){
                fs.mkdirSync(folders.pathDateFolder);
            }
            fs.mkdirSync(folders.pathFilesFolder);

            // Prepare PDF-options
            var options = {
                format: 'A4',
                border: {
                    top: "1.5cm",
                    left: "2cm",
                    right: "2cm",
                    bottom: "1.5cm"
                },
                base: "file://" + __dirname + "/../../templates/pdfs/",
            };

            // Render HTML-content
            var html = mustache.render(template_review_process, {
                data: data,
                year: moment().format("YYYY")
            });
                        
            // Create Overview pdf
            var file = fs.createWriteStream(folders.pathFilesFolder + '/template_review_process.pdf');

            // Write content into file
            pdf.create(html, options).toStream(function(err, stream){
                stream.pipe(file);
            });
            file.on('finish', function() {
                callback();
            });
                        
            // Create ZIP Archive
            
            // Add q14 Files

            callback(null, 201, result);
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
