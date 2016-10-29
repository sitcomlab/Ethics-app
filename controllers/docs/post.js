require('../../models/doc');
require('../../models/member');
var mongoose = require('mongoose');
var Doc = mongoose.model('Doc');
var Member = mongoose.model('Member');

var transporter = require('../../config/email.js').transporter;
var _mailOptions = require('../../config/email.js').mailOptions;

var async = require('async');
var path = require('path');
var fs = require('fs');
var mustache = require('mustache');


// POST
exports.request = function(req, res) {

    var doc = new Doc(req.body);
    doc.save(function(err, result) {
        if (err) {
            res.send(err);
        } else {

            var _doc = result.toObject();

            // Read Template
            fs.readFile(path.join(__dirname, '../../templates/email/reminder.html'), function(err, data) {
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
                transporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        return console.log(error);
                    } else {
                        console.log('Message sent: ' + info.response);
                    }
                });
            });

            // TODO: Work needed, the following is a temporary workaround
            // Read Template
            fs.readFile(path.join(__dirname, '../../templates/email/notification.html'), function(err, data) {
                if (err) throw err;

                // Request committee members
                Member.find({"subscription_status": true}).exec(function(err, members) {

                    console.log(members);
                    var _members = members;

                    // Send Email to each member
                    async.forEachOf(_members, function (member, key, callback) {

                        // Prepare doc
                        _doc.member_title = member.title.toString();
                        _doc.member_first_name = member.first_name.toString();
                        _doc.member_last_name = member.last_name.toString();
                        _doc.member_email_address = member.email_address.toString();

                        console.log(_doc);

                        // Render HTML-content
                        var output = mustache.render(data.toString(), _doc);

                        // Create Text for Email-Previews and Email without HTML-support
                        var text =
                            'Hello ' + _doc.member_title + ' ' + _doc.member_first_name + ' ' + _doc.member_last_name + ',\n' +
                            'The user ' + _doc.first_name + ' ' + _doc.last_name + 'has created a new Document!\n\n' +
                            _doc.project_name.toString() + ': ' + _doc._id.toString() + '\n\n\n' +
                            'Ethics-App by Institute for Geoinformatics (Heisenbergstraße 2, 48149 Münster, Germany';

                        // Set Mail options
                        var mailOptions = {
                            from: _mailOptions.from,
                            to: _doc.member_email_address,
                            subject: 'A user created a new Document',
                            text: text,
                            html: output
                        };

                        // Send Email
                        transporter.sendMail(mailOptions, function(error, info) {
                            if (error) {

                                callback(error);
                            } else {
                                console.log('Message sent: ' + info.response);
                                callback();
                            }
                        });

                    }, function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('Notifications has been sent!');
                        }
                    });
                });
            });

            // Send result
            res.jsonp(result);
        }
    });

};
