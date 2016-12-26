require('../../models/member');
var mongoose = require('mongoose');
var Member = mongoose.model('Member');


// POST
exports.request = function(req, res){

	var _member = new Member(req.body);
	_member.save(function(err, member){
		if (err) {
			res.send(err);
		} else {
			// Send result
			res.jsonp(member);
		}
	});

};
