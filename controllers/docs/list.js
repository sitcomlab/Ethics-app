require('../../models/doc');

var mongoose = require('mongoose');
var _ = require('underscore');
var Doc = mongoose.model('Doc');


// LIST
exports.request = function(req, res){
	Doc.find().exec(function(err, docs) {
		res.jsonp(docs);
	});
};
