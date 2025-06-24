var async = require('async');
var colors = require('colors');
var pg = require('pg');
var types = require('pg').types;
types.setTypeParser(1700, 'text', parseFloat);
var _ = require('underscore');
var mustache = require('mustache');
var moment = require('moment');
var pool = require('../../server.js').pool;
var pdf = require('html-pdf');
var uuid = require("uuid");
var crypto = require('crypto'); 

var fs = require("fs");
var dir_1 = "/../../templates/pdfs/";
var dir_2 = "/../../sql/queries/documents/";
var dir_3 = "/../../sql/queries/revisions/";
var dir_4 = "/../../sql/queries/descriptions/";
var dir_5 = "/../../sql/queries/concerns/";
var template_cover_sheet = fs.readFileSync(__dirname + dir_1 + 'cover_sheet.html', 'utf8').toString();
var template_debriefing_information = fs.readFileSync(__dirname + dir_1 + 'debriefing_information.html', 'utf8').toString();
var template_statement_of_researcher = fs.readFileSync(__dirname + dir_1 + 'statement_of_researcher.html', 'utf8').toString();
var template_consent_form_en = fs.readFileSync(__dirname + dir_1 + 'consent_form_en.html', 'utf8').toString();
var template_consent_form_de = fs.readFileSync(__dirname + dir_1 + 'consent_form_de.html', 'utf8').toString();
var template_consent_form_pt = fs.readFileSync(__dirname + dir_1 + 'consent_form_pt.html', 'utf8').toString();
var template_data_protection_en = fs.readFileSync(__dirname + dir_1 + 'data_protection_en.html', 'utf8').toString();
var template_data_protection_de = fs.readFileSync(__dirname + dir_1 + 'data_protection_de.html', 'utf8').toString();
var template_data_protection_pt = fs.readFileSync(__dirname + dir_1 + 'data_protection_pt.html', 'utf8').toString();
var query_get_document_with_user = fs.readFileSync(__dirname + dir_2 + 'get_with_user.sql', 'utf8').toString();
var query_get_latest_revision = fs.readFileSync(__dirname + dir_3 + 'get_latest_by_document.sql', 'utf8').toString();
var query_get_description = fs.readFileSync(__dirname + dir_4 + 'get_by_revision.sql', 'utf8').toString();
var query_get_concern = fs.readFileSync(__dirname + dir_5 + 'get_by_revision.sql', 'utf8').toString();


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
            client.query(query_get_document_with_user, [
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
            if(document.status === 2 || document.status === 6){
                callback(null, client, done, document);
            } else {
                callback(new Error("Files can not be generated, please submit your document first", 423));
            }
        },
        function(client, done, document, callback) {
            // Database query
            client.query(query_get_latest_revision, [
                document.document_id
            ], function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    // Check if Revision exists
                    if (result.rows.length === 0) {
                        callback(new Error("Revision not found"), 404);
                    } else {
                        callback(null, client, done, document, result.rows[0]);
                    }
                }
            });
        },
        function(client, done, document, revision, callback) {
            // Database query
            client.query(query_get_description, [
                revision.revision_id
            ], function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    // Check if Description exists
                    if (result.rows.length === 0) {
                        callback(new Error("Description not found"), 404);
                    } else {
                        callback(null, client, done, document, revision, result.rows[0]);
                    }
                }
            });
        },
        function(client, done, document, revision, description, callback) {
            // Database query
            client.query(query_get_concern, [
                revision.revision_id
            ], function(err, result) {
                done();
                if (err) {
                    callback(err, 500);
                } else {
                    // Check if Description exists
                    if (result.rows.length === 0) {
                        callback(new Error("Description not found"), 404);
                    } else {
                        callback(null, client, done, document, revision, description, result.rows[0]);
                    }
                }
            });
        },
        function(client, done, document, revision, description, concern, callback) {

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


            // Create files
            async.parallel([
                function(callback) { // Generate Cover Sheet
                    
                    // create distinguishable password
                    var psw = crypto.randomBytes(32)
                            .toString('base64')
                            .replace("1","R")
                            .replace("I","A")
                            .replace("0","M")
                            .replace("O","P")
                            .replace("U","F")
                            .replace("V","Z")
                            .replace("Q","X");
                    // Render HTML-content
                    var html = mustache.render(template_cover_sheet, {
                        document: document,
                        description: description,
                        revision: revision,
                        veracryptpassword: psw,
                        year: moment().format("YYYY")
                    });

                    // Create file
                    var file = fs.createWriteStream(folders.pathFilesFolder + '/cover_sheet.pdf');

                    // Write content into file
                    pdf.create(html, options).toStream(function(err, stream){
                        stream.pipe(file);
                    });
                    file.on('finish', function() {
                        callback();
                    });
                },
                function(callback) { // Generate debriefing information
                    // Render HTML-content
                    var html = mustache.render(template_debriefing_information, {
                        document: document,
                        year: moment().format("YYYY")
                    });

                    // Create file
                    var file = fs.createWriteStream(folders.pathFilesFolder + '/debriefing_information.pdf');

                    // Write content into file
                    pdf.create(html, options).toStream(function(err, stream){
                        stream.pipe(file);
                    });
                    file.on('finish', function() {
                        callback();
                    });
                },
                function(callback) { // Generate statement of researcher
                    // Render HTML-content
                    var html = mustache.render(template_statement_of_researcher, {
                        document: document,
                        year: moment().format("YYYY")
                    });

                    // Create file
                    var file = fs.createWriteStream(folders.pathFilesFolder + '/statement_of_researcher.pdf');

                    // Write content into file
                    pdf.create(html, options).toStream(function(err, stream){
                        stream.pipe(file);
                    });
                    file.on('finish', function() {
                        callback();
                    });
                },
                function(callback) { // Generate consent form (English)
                    // Check if an english description was used
                    if(description.en_used){

                        // Render HTML-content
                        var html = mustache.render(template_consent_form_en, {
                            document: document,
                            description: description,
                            concern: concern,
                            revision: revision,
                            support_email_address: process.env.SUPPORT_EMAIL_ADDRESS,
                            year: moment().format("YYYY")
                        });

                        // Create file
                        var file = fs.createWriteStream(folders.pathFilesFolder + '/consent_form_en.pdf');

                        // Write content into file
                        pdf.create(html, options).toStream(function(err, stream){
                            stream.pipe(file);
                        });
                        file.on('finish', function() {
                            callback();
                        });
                    } else {
                        callback();
                    }
                },
                function(callback) { // Generate consent form (German)
                    // Check if a German description was used
                    if(description.de_used){

                        // Render HTML-content
                        var html = mustache.render(template_consent_form_de, {
                            document: document,
                            description: description,
                            concern: concern,
                            revision: revision,
                            support_email_address: process.env.SUPPORT_EMAIL_ADDRESS,
                            year: moment().format("YYYY")
                        });

                        // Create file
                        var file = fs.createWriteStream(folders.pathFilesFolder + '/consent_form_de.pdf');

                        // Write content into file
                        pdf.create(html, options).toStream(function(err, stream){
                            stream.pipe(file);
                        });
                        file.on('finish', function() {
                            callback();
                        });
                    } else {
                        callback();
                    }
                },
                function(callback) { // Generate consent form (Portuguese)
                    // Check if a Portuguese description was used
                    if(description.pt_used){

                        // Render HTML-content
                        var html = mustache.render(template_consent_form_pt, {
                            document: document,
                            description: description,
                            concern: concern,
                            revision: revision,
                            support_email_address: process.env.SUPPORT_EMAIL_ADDRESS,
                            year: moment().format("YYYY")
                        });

                        // Create file
                        var file = fs.createWriteStream(folders.pathFilesFolder + '/consent_form_pt.pdf');

                        // Write content into file
                        pdf.create(html, options).toStream(function(err, stream){
                            stream.pipe(file);
                        });
                        file.on('finish', function() {
                            callback();
                        });
                    } else {
                        callback();
                    }
                },
                function(callback) { // Generate data protection form (English)
                    // Check if an english description was used
                    if(description.en_used){

                        // Render HTML-content
                        var html = mustache.render(template_data_protection_en, {
                            document: document,
                            description: description,
                            concern: concern,
                            revision: revision,
                            support_email_address: process.env.SUPPORT_EMAIL_ADDRESS,
                            year: moment().format("YYYY")
                        });

                        // Create file
                        var file = fs.createWriteStream(folders.pathFilesFolder + '/data_protection_en.pdf');

                        // Write content into file
                        pdf.create(html, options).toStream(function(err, stream){
                            stream.pipe(file);
                        });
                        file.on('finish', function() {
                            callback();
                        });
                    } else {
                        callback();
                    }
                },
                function(callback) { // Generate data protection form (german)
                    // Check if a german description was used
                    if(description.de_used){

                        // Render HTML-content
                        var html = mustache.render(template_data_protection_de, {
                            document: document,
                            description: description,
                            concern: concern,
                            revision: revision,
                            support_email_address: process.env.SUPPORT_EMAIL_ADDRESS,
                            year: moment().format("YYYY")
                        });

                        // Create file
                        var file = fs.createWriteStream(folders.pathFilesFolder + '/data_protection_de.pdf');

                        // Write content into file
                        pdf.create(html, options).toStream(function(err, stream){
                            stream.pipe(file);
                        });
                        file.on('finish', function() {
                            callback();
                        });
                    } else {
                        callback();
                    }
                },
                function(callback) { // Generate data protection form (portuguese)
                    // Check if a portuguese description was used
                    if(description.pt_used){

                        // Render HTML-content
                        var html = mustache.render(template_data_protection_pt, {
                            document: document,
                            description: description,
                            concern: concern,
                            revision: revision,
                            support_email_address: process.env.SUPPORT_EMAIL_ADDRESS,
                            year: moment().format("YYYY")
                        });

                        // Create file
                        var file = fs.createWriteStream(folders.pathFilesFolder + '/data_protection_pt.pdf');

                        // Write content into file
                        pdf.create(html, options).toStream(function(err, stream){
                            stream.pipe(file);
                        });
                        file.on('finish', function() {
                            callback();
                        });
                    } else {
                        callback();
                    }
                }
            ],
            function(err, results) {
                callback(null, 201, result);
            });

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
