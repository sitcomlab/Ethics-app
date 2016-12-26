require('../../models/member');

var mongoose = require('mongoose');
var _ = require('underscore');
var Member = mongoose.model('Member');


// PUT
exports.request = function(req, res){
	Member.load(req.params.member_id, function(err, member){
		member = _.extend(member, req.body);
		member.set("updated", Date.now());
		member.save(function(err) {
			if (err) {
	        	res.send(err);
		    } else {
		        res.jsonp(member);
	        }
    	});
	});
};
