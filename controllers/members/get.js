require('../../models/member');

var mongoose = require('mongoose');
var _ = require('underscore');
var Member = mongoose.model('Member');


// GET
exports.request = function(req, res){
	Member.load(req.params.member_id, function(err, member){
		res.jsonp(member);
	});
};
