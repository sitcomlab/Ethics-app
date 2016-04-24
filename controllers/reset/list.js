require('../../models/doc');

var mongoose = require('mongoose');
var _ = require('underscore');
var Doc = mongoose.model('Doc');


// LIST
exports.request = function(req, res){

    // Find all documents
	Doc.find( { email: req.params.email } ).exec(function(err, docs) {

        // TODO: Send email with DocumentIds & Titles

	});
};
