var app = angular.module("concernService", []);


// Concern service
app.factory('$concernService', function($http, $log, config) {

    return {
        getByRevision: function(revision_id) {
            return $http.get(config.apiURL + "/revisions/" + revision_id + "/concerns");
        },
        save: function(concern_id, data) {
            return $http.put(config.apiURL + "/concerns/" + concern_id, data);
        }
    };

});
