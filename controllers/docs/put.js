require('../../models/doc');

var mongoose = require('mongoose');
var _ = require('underscore');
var Doc = mongoose.model('Doc');


// PUT
exports.request = function(req, res){
	Doc.load(req.params.docId, function(err, doc){
		doc = _.extend(doc, req.body);
		doc.set("updated", Date.now());
		doc.save(function(err) {
			if (err) {
	        	res.send(err);
		    } else {
		        res.jsonp(doc);
		        console.log(doc);
	        }
    	});
	});
};
