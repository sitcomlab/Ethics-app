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
    editable: { // Toggle editable boolean according to project status
        type: Boolean,
        required: true,
        default: true
    },
    general: { // PART 1
        english: { // study description - English
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
            q04: { // Theme and purpose of the study
                type: String,
                required: true
            },
            q05: { // Procedure
                type: String,
                required: true
            },
            q06: { // Duration
                type: String,
                required: true
            },
            q07: { // All risks
                type: String,
                required: true
            },
            q08: { // Benefits
                type: String,
                required: true
            }
        },
        german: { // study description - German
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
          q04: { // Theme and purpose of the study
              type: String,
              required: true
          },
          q05: { // Procedure
              type: String,
              required: true
          },
          q06: { // Duration
              type: String,
              required: true
          },
          q07: { // All risks
              type: String,
              required: true
          },
          q08: { // Benefits
              type: String,
              required: true
          }
        }
    },
    ethics: { // PART 2
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
