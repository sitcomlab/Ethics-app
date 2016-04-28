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
    submitted: {
        type: Date,
        default: Date.now,
    },
    email_address: {
        type: String,
        required: true,
        validate: [validator.isEmail, 'invalid email']
    },
    project_name: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    editable: { // Toggle editable boolean according to project status
        type: Boolean,
        required: true,
        default: true
    },
    general: { // PART 1
        english: { // study description - English
            q02: { //Name of the lead researcher, position and lab
                type: String,
                required: false
            },
            q03: { // Time scale of data collection (range)
                type: String,
                required: false
            },
            q04: { // Theme and purpose of the study
                type: String,
                required: false
            },
            q05: { // Procedure
                type: String,
                required: false
            },
            q06: { // Duration
                type: String,
                required: false
            },
            q07: { // All risks
                type: String,
                required: false
            },
            q08: { // Benefits
                type: String,
                required: false
            }
        },
        german: { // study description - German
            q02: { //Name of the lead researcher, position and lab
                type: String,
                required: false
            },
            q03: { // Time scale of data collection (range)
                type: String,
                required: false
            },
            q04: { // Theme and purpose of the study
                type: String,
                required: false
            },
            q05: { // Procedure
                type: String,
                required: false
            },
            q06: { // Duration
                type: String,
                required: false
            },
            q07: { // All risks
                type: String,
                required: false
            },
            q08: { // Benefits
                type: String,
                required: false
            }
        }
    },
    ethics: { // PART 2
        q01: {
            checkbox: { // yes (true), no (false)
                type: Boolean,
                required: false
            },
            comment: { // comment if checked yes
                type: String,
                required: false
            },
            review: { // reviewers comment on experimenters answer
                type: String,
                required: false
            }
        },
        q02: {
            checkbox: { // yes (true), no (false)
                type: Boolean,
                required: false
            },
            comment: { // comment if checked yes
                type: String,
                required: false
            },
            review: { // reviewers comment on experimenters answer
                type: String,
                required: false
            }
        },
        q03: {
            checkbox: { // yes (true), no (false)
                type: Boolean,
                required: false
            },
            comment: { // comment if checked yes
                type: String,
                required: false
            },
            review: { // reviewers comment on experimenters answer
                type: String,
                required: false
            }
        },
        q04: {
            checkbox: { // yes (true), no (false)
                type: Boolean,
                required: false
            },
            comment: { // comment if checked yes
                type: String,
                required: false
            },
            review: { // reviewers comment on experimenters answer
                type: String,
                required: false
            }
        },
        q05: {
            checkbox: { // yes (true), no (false)
                type: Boolean,
                required: false
            },
            comment: { // comment if checked yes
                type: String,
                required: false
            },
            review: { // reviewers comment on experimenters answer
                type: String,
                required: false
            }
        },
        q06: {
            checkbox: { // yes (true), no (false)
                type: Boolean,
                required: false
            },
            comment: { // comment if checked yes
                type: String,
                required: false
            },
            review: { // reviewers comment on experimenters answer
                type: String,
                required: false
            }
        },
        q07: {
            checkbox: { // yes (true), no (false)
                type: Boolean,
                required: false
            },
            comment: { // comment if checked yes
                type: String,
                required: false
            },
            review: { // reviewers comment on experimenters answer
                type: String,
                required: false
            }
        },
        q08: {
            checkbox: { // yes (true), no (false)
                type: Boolean,
                required: false
            },
            comment: { // comment if checked yes
                type: String,
                required: false
            },
            review: { // reviewers comment on experimenters answer
                type: String,
                required: false
            }
        },
        q09: {
            checkbox: { // yes (true), no (false)
                type: Boolean,
                required: false
            },
            comment: { // comment if checked yes
                type: String,
                required: false
            },
            review: { // reviewers comment on experimenters answer
                type: String,
                required: false
            }
        },
        q10: {
            checkbox: { // yes (true), no (false)
                type: Boolean,
                required: false
            },
            comment: { // comment if checked yes
                type: String,
                required: false
            },
            review: { // reviewers comment on experimenters answer
                type: String,
                required: false
            }
        },
        q11: {
            checkbox_1: { // yes (true), no (false)
                type: Boolean,
                required: false
            },
            checkbox_2: { // yes (true), no (false)
                type: Boolean,
                required: false
            },
            comment: { // comment if checked yes
                type: String,
                required: false
            },
            review: { // reviewers comment on experimenters answer
                type: String,
                required: false
            }
        },
        q12: {
            checkbox: { // yes (true), no (false)
                type: Boolean,
                required: false
            },
            comment: { // comment if checked yes
                type: String,
                required: false
            },
            review: { // reviewers comment on experimenters answer
                type: String,
                required: false
            }
        },
        q13: {
            checkbox: { // yes (true), no (false)
                type: Boolean,
                required: false
            },
            comment: { // comment if checked yes
                type: String,
                required: false
            },
            review: { // reviewers comment on experimenters answer
                type: String,
                required: false
            }
        },
        general_comment: {
            type: String,
            required: false
        }
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
