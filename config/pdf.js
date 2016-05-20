var mongoose = require('mongoose');
var _ = require('underscore');
var Doc = mongoose.model('Doc');

/**
 * Generate PDF
 */
exports.generate = function(req, res) {
    console.log("Generate PDF");
    Doc.load(req.params.doc_id, function(err, doc){
  		console.log(doc);
      //TODO generate pdf here
  	});
};
