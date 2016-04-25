var app = angular.module("docService", []);

// DOC-SERVICE
app.factory('$docService', function($http, $log, setup) {

    return {
        getDefaultDoc: function() {
            return {
                email_address: "",
                project_name: "",
                first_name: "",
                last_name: "",
                editable: true,

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
                }
            };
        },
        list: function() {
            return $http.get(setup.apiURL + "/docs");
        },
        create: function(data) {
            return $http.post(setup.apiURL + "/docs", data);
        },
        get: function(id) {
            return $http.get(setup.apiURL + "/docs/" + id);
        },
        edit: function(id, data) {
            return $http.put(setup.apiURL + "/docs/" + id, data);
        },
        delete: function(id, data) {
            return $http.delete(setup.apiURL + "/docs/" + id);
        },
        recover: function(email) {
            return $http.get(setup.apiURL + "/recover/" + email);
        }
    };
});
