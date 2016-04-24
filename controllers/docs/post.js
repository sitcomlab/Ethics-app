require('../../models/doc');
var mongoose = require('mongoose');
var Doc = mongoose.model('Doc');

var transporter = require('../../config/email.js').transporter;
var _mailOptions = require('../../config/email.js').mailOptions;

var path = require('path');
var fs = require('fs');
var mustache = require('mustache');


// POST
exports.request = function(req, res){

	var doc = new Doc(req.body);
	doc.save(function(err, result){
		if (err) {
			res.send(err);
		} else {

			var _doc = result.toObject();
			_doc.first_name = "Nicho"; // TODO: _doc.first_name
			_doc.last_name = "S."; // TODO: _doc.last_name

		    // Read Template
		    fs.readFile(path.join(__dirname, '../../templates/reminder.html'), function (err, data) {
		        if (err) throw err;

				// Render HTML-content
		        var output = mustache.render(data.toString(), _doc);

				// Create Text for Email-Previews and Email without HTML-support
				var text =
					'Hello ' + _doc.first_name.toString() + ' ' + _doc.last_name.toString() + ',\n' +
					'Your new Document has been created!\n\n' +
					_doc.project_name.toString() + ': ' + _doc._id.toString() + '\n\n\n' +
					'Ethics-App by Institute for Geoinformatics (Heisenbergstraße 2, 48149 Münster, Germany';

				// Set Mail options
				var mailOptions = {
					from: _mailOptions.from,
				    to: _doc.email_address.toString(),
				    subject: 'Your new Document has been created',
				    text: text,
				    html: output
				};

				// Send Email
				transporter.sendMail(mailOptions, function(error, info){
					if(error){
						return console.log(error);
					} else {
						console.log('Message sent: ' + info.response);
					}
				});
		    });

			// Send result
			res.jsonp(result);
		}
	});

};
