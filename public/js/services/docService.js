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
                general: { // Part 1
                    english: { // study description - English
                        q01: " ", // Title of project = projectName; prefill with projectName; edit if experimenter makes changes
                        q02: " ", // Name of the lead researcher, position and lab
                        q03: " ", // Time scale of data collection (range)
                        q04: " ", // theme and purpose of the study
                        q05: " ", // procedure
                        q06: " ", // duration
                        q07: " ", // all risks
                        q08: " " // benefits
                    },
                    german: { // study description - German
                        q01: " ", // Title of project = projectName; maybe not required
                        q02: " ", // Name of the lead researcher, position and lab
                        q03: " ", // Time scale of data collection (range)
                        q04: " ", // theme and purpose of the study
                        q05: " ", // procedure
                        q06: " ", // duration
                        q07: " ", // all risks
                        q08: " " // benefits
                    }
                },
                ethics: { // Part 2
                    q01: {
                        checkbox: null, // yes (true), no (false)
                        comment: " ", // comment if checked yes
                        review: " " // reviewers comment on experimenters answer
                    },
                    q02: {
                        checkbox: null, // yes (true), no (false)
                        comment: " ", // comment if checked yes
                        review: " " // reviewers comment on experimenters answer
                    },
                    q03: {
                        checkbox: null, // yes (true), no (false)
                        comment: " ", // comment if checked yes
                        review: " " // reviewers comment on experimenters answer
                    },
                    q04: {
                        checkbox: null, // yes (true), no (false)
                        comment: " ", // comment if checked yes
                        review: " " // reviewers comment on experimenters answer
                    },
                    q05: {
                        checkbox: null, // yes (true), no (false)
                        comment: " ", // comment if checked yes
                        review: " " // reviewers comment on experimenters answer
                    },
                    q06: {
                        checkbox: null, // yes (true), no (false)
                        comment: " ", // comment if checked yes
                        review: " " // reviewers comment on experimenters answer
                    },
                    q07: {
                        checkbox: null, // yes (true), no (false)
                        comment: " ", // comment if checked yes
                        review: " " // reviewers comment on experimenters answer
                    },
                    q08: {
                        checkbox: null, // yes (true), no (false)
                        comment: " ", // comment if checked yes
                        review: " " // reviewers comment on experimenters answer
                    },
                    q09: {
                        checkbox: null, // yes (true), no (false)
                        comment: " ", // comment if checked yes
                        review: " " // reviewers comment on experimenters answer
                    },
                    q10: {
                        checkbox: null, // yes (true), no (false)
                        comment: " ", // comment if checked yes
                        review: " " // reviewers comment on experimenters answer
                    },
                    q11: {
                        checkbox_1: null, // yes (true), no (false)
                        checkbox_2: null, // yes (true), no (false)
                        comment: " ", // comment if checked yes
                        review: " " // reviewers comment on experimenters answer
                    },
                    q12: {
                        checkbox: null, // yes (true), no (false)
                        comment: " ", // comment if checked yes
                        review: " " // reviewers comment on experimenters answer
                    },
                    q13: {
                        checkbox: null, // yes (true), no (false)
                        comment: " ", // comment if checked yes
                        review: " " // reviewers comment on experimenters answer
                    },
                    general_comment: " "
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
