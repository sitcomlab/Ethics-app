var app = angular.module("descriptionService", []);


// Description service
app.factory('$descriptionService', function($http, $log, config) {

    return {
        getByRevision: function(revision_id, language) {
            return $http.get(config.apiURL + "/revisions/" + revision_id + "/" + language + "/description");
        },
        save: function(description_id, data) {
            return $http.put(config.apiURL + "/descriptions/" + description_id, data);
        }
    };

});