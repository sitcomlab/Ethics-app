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
        validate: [validator.isEmail, 'invalid email']
    },
    projectName: {
        type: String,
        required: true
    },
    //Toggle editable boolean according to project status
    editable: {
        type: Boolean,
        required: true
    },
    //Part1 study description - English
    part1english: {
        q01: String, //Title of project = projectName; prefill with projectName; edit if experimenter makes changes
        q02: String, //Name of the lead researcher, position and lab
        q03: String, //Time scale of data collection (range)
        q04: String, //theme and purpose of the study
        q05: String, //procedure
        q06: String, //duration
        q07: String, //all risks
        q08: String //benefits
    },
    //Part1 study description - German
    part1german: {
        q01: String, //Title of project = projectName; maybe not required
        q02: String, //Name of the lead researcher, position and lab
        q03: String, //Time scale of data collection (range)
        q04: String, //theme and purpose of the study
        q05: String, //procedure
        q06: String, //duration
        q07: String, //all risks
        q08: String //benefits
    },
    //Part2 ethics checklist
    part2ethics: {
        q01: { //
            checkbox: String, //[yes,no]
            comment: String, //comment if checked yes
            review: String //reviewers comment on experimenters answer
        },
        q02: { //
            checkbox: String, //[yes,no]
            comment: String, //comment if checked yes
            review: String //reviewers comment on experimenters answer
        },
        q03: { //
            checkbox: String, //[yes,no]
            comment: String, //comment if checked yes
            review: String //reviewers comment on experimenters answer
        },
        q04: { //
            checkbox: String, //[yes,no]
            comment: String, //comment if checked yes
            review: String //reviewers comment on experimenters answer
        },
        q05: { //
            checkbox: String, //[yes,no]
            comment: String, //comment if checked yes
            review: String //reviewers comment on experimenters answer
        },
        q06: { //
            checkbox: String, //[yes,no]
            comment: String, //comment if checked yes
            review: String //reviewers comment on experimenters answer
        },
        q07: { //
            checkbox: String, //[yes,no]
            comment: String, //comment if checked yes
            review: String //reviewers comment on experimenters answer
        },
        q08: { //
            checkbox: String, //[yes,no]
            comment: String, //comment if checked yes
            review: String //reviewers comment on experimenters answer
        },
        q09: { //
            checkbox: String, //[yes,no]
            comment: String, //comment if checked yes
            review: String //reviewers comment on experimenters answer
        },
        q10: { //
            checkbox: String, //[yes,no]
            comment: String, //comment if checked yes
            review: String //reviewers comment on experimenters answer
        },
        q11: { //
            checkbox: String, //[yes,no]
            q11_1: {
                checkbox: String, //[yes,no]
                comment: String, //comment if checked yes
            },
            review: String //reviewers comment on experimenters answer
        },
        q12: { //
            checkbox: String, //[yes,no]
            comment: String, //comment if checked yes
            review: String //reviewers comment on experimenters answer
        },
        q13: { //
            checkbox: String, //[yes,no]
            comment: String, //comment if checked yes
            review: String //reviewers comment on experimenters answer
        },
        generalComment: String
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
