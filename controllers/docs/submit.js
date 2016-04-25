require('../../models/doc');

var mongoose = require('mongoose');
var _ = require('underscore');
var Doc = mongoose.model('Doc');


// GET
exports.request = function(req, res){
	Doc.load(req.params.doc_id, function(err, doc){
		doc.set("updated", Date.now());
		doc.set("submitted", Date.now());
		doc.set("editable", false);
		doc.save(function(err) {
			if (err) {
	        	res.send(err);
		    } else {
		        //res.jsonp(doc);
		        console.log("Document " +  doc._id + " was successfully submitted");
	        }
    	});
	});
};
