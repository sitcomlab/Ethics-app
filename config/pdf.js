var mongoose = require('mongoose');
var _ = require('underscore');
var Doc = mongoose.model('Doc');
var path = require('path');
var fs = require('fs');
var mustache = require('mustache');
var conversion = require("phantom-html-to-pdf")();


/**
 * Generate PDF
 */
exports.generate = function(req, res) {
    Doc.load(req.params.doc_id, function(err, doc) {

        // Create english pdf
        fs.readFile(path.join(__dirname, '../templates/pdf/informed_consent_form_eng.html'), function(err, data) {
            if (err) throw err;

            // Render HTML-content
            var output = mustache.render(data.toString(), doc);

            conversion({
                html: output,
            }, function(err, pdf) {
                pdf.stream.pipe(fs.createWriteStream('public/files/tmp/' + doc._id + '_eng.pdf'));
            });
        });

        // Create german pdf
        fs.readFile(path.join(__dirname, '../templates/pdf/informed_consent_form_ger.html'), function(err, data) {
            if (err) throw err;

            // Render HTML-content
            var output = mustache.render(data.toString(), doc);

            conversion({
                html: output,
            }, function(err, pdf) {
                pdf.stream.pipe(fs.createWriteStream('public/files/tmp/' + doc._id + '_ger.pdf'));
            });
        });

        res.end('{"success" : "PDFs generated successful", "status" : 200}');
    });
};
