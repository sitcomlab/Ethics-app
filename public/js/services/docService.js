var app = angular.module("docService", []);

// DOC-SERVICE
app.factory('$docService', function($http, $log, setup) {

    return {
        getDefaultDoc: function() {
            return {
                "first_name": "",
                "last_name": "",
                "email": "",
                "title": ""
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
        reset: function(email) {
            return $http.get(setup.apiURL + "/reset/" + email);
        }
    };
});
