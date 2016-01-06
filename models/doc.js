var mongoose = require('mongoose');
var validator = require('validator');

var Schema = mongoose.Schema;


var DocSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String,
        required: true,
        validate: [ validator.isEmail, 'invalid email' ]
    }
});


DocSchema.statics = {
    load: function(id, cb) {
        this.findOne({
            _id: id
        }).exec(cb);
    }
};

mongoose.model('Doc', DocSchema);
