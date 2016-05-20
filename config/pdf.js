var mongoose = require('mongoose');
var _ = require('underscore');
var Doc = mongoose.model('Doc');
var pdf = require('pdfkit');
var fs = require('fs');


/**
 * Generate PDF
 */
exports.generate = function(req, res) {
  console.log("Generate PDF");
  Doc.load(req.params.doc_id, function(err, doc) {
    console.log(doc);
    var docEng = new pdf();
    docEng.pipe(fs.createWriteStream('./public/files/tmp/' + doc._id + '_eng.pdf'));

    //Write PDF Englisch
    //ID field
    docEng.text("ID: ______", {
      align: 'right',
    });

    //Title
    docEng.fontSize(16).text("Consent from", {});

    //Content
    docEng.fontSize(12).moveDown().text("Experiment:", {
      continued: true,
      underline: true,
    }).text(' ' + doc.project_name, {
      underline: false,
    });

    docEng.moveDown().text("Executed by:", {
      continued: true,
      underline: true,
    }).text(' ' + doc.general.english.q02, {
      underline: false,
    });

    docEng.moveDown(2).text("Purpose of the study:", {
      continued: true,
      underline: true,
    }).text(' ' + doc.general.english.q04, {
      underline: false,
    });

    docEng.moveDown().text("Duration:", {
      continued: true,
      underline: true,
    }).text(' ' + doc.general.english.q03, {
      underline: false,
    });

    docEng.end();


    var docGer = new pdf();
    docGer.pipe(fs.createWriteStream('./public/files/tmp/' + doc._id + '_ger.pdf'));
    //Write PDF German
    //ID field
    docGer.text("ID: ______", {
      align: 'right',
    });

    //Title
    docGer.fontSize(16).text("Einverständniserklärung", {});

    //Content
    docGer.fontSize(12).moveDown().text("Experiment:", {
      continued: true,
      underline: true,
    }).text(' ' + doc.project_name, {
      underline: false,
    });

    docGer.moveDown().text("Durchgeführt von:", {
      continued: true,
      underline: true,
    }).text(' ' + doc.general.german.q02, {
      underline: false,
    });

    docGer.moveDown(2).text("Zweck der Studie:", {
      continued: true,
      underline: true,
    }).text(' ' + doc.general.german.q04, {
      underline: false,
    });

    docGer.moveDown().text("Dauer:", {
      continued: true,
      underline: true,
    }).text(' ' + doc.general.german.q03, {
      underline: false,
    });


    docGer.end();
  });
};
