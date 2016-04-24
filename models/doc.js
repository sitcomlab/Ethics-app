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
    email_address: {
        type: String,
        required: true,
        validate: [validator.isEmail, 'invalid email']
    },
    project_name: {
        type: String,
        required: true
    }/*,
    // Toggle editable boolean according to project status
    editable: {
        type: Boolean,
        required: true
    },
    // Part 1 study description - English
    part1_english: {
        q01: { //Title of project = projectName; prefill with projectName; edit if experimenter makes changes
            type: String,
            required: true
        },
        q02: { //Name of the lead researcher, position and lab
            type: String,
            required: true
        },
        q03: { // Time scale of data collection (range)
            type: String,
            required: true
        },
        q04: { // theme and purpose of the study
            type: String,
            required: true
        },
        q05: { // procedure
            type: String,
            required: true
        },
        q06: { // duration
            type: String,
            required: true
        },
        q07: { // all risks
            type: String,
            required: true
        },
        q08: { // benefits
            type: String,
            required: true
        }
    },
    // Part 1 study description - German
    part1_german: {
        q01: { // Title of project = projectName; maybe not required
            type: String,
            required: true
        },
        q02: { // Name of the lead researcher, position and lab
            type: String,
            required: true
        },
        q03: { // Time scale of data collection (range)
            type: String,
            required: true
        },
        q04: { // theme and purpose of the study
            type: String,
            required: true
        },
        q05: { // procedure
            type: String,
            required: true
        },
        q06: { // duration
            type: String,
            required: true
        },
        q07: { // all risks
            type: String,
            required: true
        },
        q08: { // benefits
            type: String,
            required: true
        }
    },
    //Part 2 ethics checklist
    part2_ethics: {
        q01: {
            checkbox: { // yes (true), no (false)
                type: Boolean,
                required: true
            },
            comment: { // comment if checked yes
                type: String,
                required: true,
                default: ""
            },
            review: { // reviewers comment on experimenters answer
                type: String,
                required: false
            }
        },
        q02: {
            checkbox: { // yes (true), no (false)
                type: Boolean,
                required: true
            },
            comment: { // comment if checked yes
                type: String,
                required: true,
                default: ""
            },
            review: { // reviewers comment on experimenters answer
                type: String,
                required: false
            }
        },
        q03: {
            checkbox: { // yes (true), no (false)
                type: Boolean,
                required: true
            },
            comment: { // comment if checked yes
                type: String,
                required: true,
                default: ""
            },
            review: { // reviewers comment on experimenters answer
                type: String,
                required: false
            }
        },
        q04: {
            checkbox: { // yes (true), no (false)
                type: Boolean,
                required: true
            },
            comment: { // comment if checked yes
                type: String,
                required: true,
                default: ""
            },
            review: { // reviewers comment on experimenters answer
                type: String,
                required: false
            }
        },
        q05: {
            checkbox: { // yes (true), no (false)
                type: Boolean,
                required: true
            },
            comment: { // comment if checked yes
                type: String,
                required: true,
                default: ""
            },
            review: { // reviewers comment on experimenters answer
                type: String,
                required: false
            }
        },
        q06: {
            checkbox: { // yes (true), no (false)
                type: Boolean,
                required: true
            },
            comment: { // comment if checked yes
                type: String,
                required: true,
                default: ""
            },
            review: { // reviewers comment on experimenters answer
                type: String,
                required: false
            }
        },
        q07: {
            checkbox: { // yes (true), no (false)
                type: Boolean,
                required: true
            },
            comment: { // comment if checked yes
                type: String,
                required: true,
                default: ""
            },
            review: { // reviewers comment on experimenters answer
                type: String,
                required: false
            }
        },
        q08: {
            checkbox: { // yes (true), no (false)
                type: Boolean,
                required: true
            },
            comment: { // comment if checked yes
                type: String,
                required: true,
                default: ""
            },
            review: { // reviewers comment on experimenters answer
                type: String,
                required: false
            }
        },
        q09: {
            checkbox: { // yes (true), no (false)
                type: Boolean,
                required: true
            },
            comment: { // comment if checked yes
                type: String,
                required: true,
                default: ""
            },
            review: { // reviewers comment on experimenters answer
                type: String,
                required: false
            }
        },
        q10: {
            checkbox: { // yes (true), no (false)
                type: Boolean,
                required: true
            },
            comment: { // comment if checked yes
                type: String,
                required: true,
                default: ""
            },
            review: { // reviewers comment on experimenters answer
                type: String,
                required: false
            }
        },
        q11: {
            checkbox_1: { // yes (true), no (false)
                type: Boolean,
                required: true
            },
            checkbox_2: { // yes (true), no (false)
                type: Boolean,
                required: false
            },
            comment: { // comment if checked yes
                type: String,
                required: true,
                default: ""
            },
            review: { // reviewers comment on experimenters answer
                type: String,
                required: false
            }
        },
        q12: {
            checkbox: { // yes (true), no (false)
                type: Boolean,
                required: true
            },
            comment: { // comment if checked yes
                type: String,
                required: true,
                default: ""
            },
            review: { // reviewers comment on experimenters answer
                type: String,
                required: false
            }
        },
        q13: {
            checkbox: { // yes (true), no (false)
                type: Boolean,
                required: true
            },
            comment: { // comment if checked yes
                type: String,
                required: true,
                default: ""
            },
            review: { // reviewers comment on experimenters answer
                type: String,
                required: false
            }
        },
        general_comment: {
            type: String,
            required: true,
            default: ""
        }
    }*/
});


DocSchema.statics = {
    load: function(id, cb) {
        this.findOne({
            _id: id
        }).exec(cb);
    }
};

mongoose.model('Doc', DocSchema);
