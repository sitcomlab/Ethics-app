require('../../models/doc');

var mongoose = require('mongoose');
var _ = require('underscore');
var Doc = mongoose.model('Doc');


// GET
exports.request = function(req, res){
	Doc.load(req.params.docId, function(err, doc){
		res.jsonp(doc);
	});
};
