require('../../models/doc');
var mongoose = require('mongoose');
var Doc = mongoose.model('Doc');

var transporter = require('../../config/email.js').transporter;
var _mailOptions = require('../../config/email.js').mailOptions;

var path = require('path');
var fs = require('fs');
var mustache = require('mustache');


// LIST
exports.request = function(req, res) {

    // Find all documents
    Doc.find({
        email_address: req.params.email_address
    }).exec(function(err, docs) {

        // Check if a document was found with this email-address
        if(docs.length > 0){

            // Send result
            res.status(200).send({
                email_found: true
            });


            // Prepare Email-templating
            var _doc = {};
            _doc.docs = docs;

            // Read Template
            fs.readFile(path.join(__dirname, '../../templates/email/recover.html'), function(err, data) {
                if (err) throw err;

                // Render HTML-content
                var output = mustache.render(data.toString(), _doc);

                // Create Text for Email-Previews and Email without HTML-support
                var lines = "";
                for (var i = 0; i < docs.length; i++) {
                    lines = lines + "* " + docs[i].project_name.toString() + ": " + docs[i]._id.toString() + "\n";
                }

                var text =
                    'Hello ' + docs[0].first_name.toString() + ' ' + docs[0].last_name.toString() + ',\n' +
                    'You asked for your Document-IDs. Please find a list below with all of your Projects related to this Email-Address.\n\n' +
                    lines + '\n\n\n' +
                    'Ethics-App by Institute for Geoinformatics (Heisenbergstraße 2, 48149 Münster, Germany';

                // Set Mail options
                var mailOptions = {
                    from: _mailOptions.from,
                    to: req.params.email_address,
                    subject: 'You asked for your Document-IDs',
                    text: text,
                    html: output
                };

                // Send Email
                transporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        return console.log(error);
                    } else {
                        console.log('Message sent: ' + info.response);
                    }
                });
            });

        } else {
            res.status(404).send({
                email_found: false
            });
        }

    });
};
