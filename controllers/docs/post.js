require('../../models/doc');

var mongoose = require('mongoose');
var _ = require('underscore');
var Doc = mongoose.model('Doc');


// POST
exports.request = function(req, res){
	var doc = new Doc(req.body);
	doc.save(function(err) {
		if (err) {
	       	res.send(err);
	    } else {
	        res.jsonp(doc);
	        console.log(doc);
	    }
    });
};
