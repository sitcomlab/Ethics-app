require('../../models/member');

var mongoose = require('mongoose');
var _ = require('underscore');
var Member = mongoose.model('Member');


// DELETE
exports.request = function(req, res){
	Member.load(req.params.member_id, function(err, member){
		member.remove(function(err) {
		    res.jsonp({});
    	});
	});
};
