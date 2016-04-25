require('../../models/member');

var mongoose = require('mongoose');
var _ = require('underscore');
var Member = mongoose.model('Member');


// LIST
exports.request = function(req, res){
	Member.find().exec(function(err, members) {
		res.jsonp(members);
	});
};
