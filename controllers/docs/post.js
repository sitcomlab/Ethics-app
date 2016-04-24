var _ = require('underscore');
var mongoose = require('mongoose');
require('../../models/doc');
var Doc = mongoose.model('Doc');

var transporter = require('./config/email.js').transporter;
var mailOptions = require('./config/email.js').mailOptions;


// POST
exports.request = function(req, res){
	var doc = new Doc(_.extend(_doc, req.body));
	doc.save(function(err) {
		if (err) {
	       	res.send(err);
	    } else {

			// Send Email with new Document-ID
			mailOptions.to = doc.email;
			mailOptions.subject = '[IFGI-Ethics-App] Your new Document has been created';
			mailOptions.text = 'Ethics-App Document-ID';
			mailOptions.html = '<h1>Ethics-App</h1>' +
				'<b>' + doc.project_title + '</b>: ' + '<pre><code>' + doc._id + '</code></pre>';

			// send mail with defined transport object
			transporter.sendMail(mailOptions, function(error, info){
			    if(error){
			        return console.log(error);
			    } else {
			        console.log('Message sent: ' + info.response);
			    }
			});

			// Send results
	        res.jsonp(doc);
	        console.log(doc);
	    }
    });
};
