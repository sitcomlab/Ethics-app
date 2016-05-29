var app = angular.module("docService", []);

// DOC-SERVICE
app.factory('$docService', function($http, $log, config) {

    return {
        getDefaultDoc: function() {
            return {
                email_address: "",
                project_name: "",
                first_name: "",
                last_name: "",
                editable: true,
                confirmed: false,
                general: {
                    english: {
                        q02: " "
                    },
                    german: {
                        q02: " "
                    }
                }
            };
        },
        list: function() {
            return $http.get(config.apiURL + "/docs");
        },
        create: function(data) {
            return $http.post(config.apiURL + "/docs", data);
        },
        get: function(id) {
            return $http.get(config.apiURL + "/docs/" + id);
        },
        edit: function(id, data) {
            return $http.put(config.apiURL + "/docs/" + id, data);
        },
        delete: function(id, data) {
            return $http.delete(config.apiURL + "/docs/" + id);
        },
        recover: function(email) {
            return $http.get(config.apiURL + "/recover/" + email);
        },
        pdf: function(id) {
            return $http.post(config.apiURL + "/pdf/" + id);
        }
    };
});
