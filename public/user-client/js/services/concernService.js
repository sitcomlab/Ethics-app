var app = angular.module("concernService", []);


// Concern service
app.factory('$concernService', function($http, $log, config, $authenticationService) {

    return {
        getByRevision: function(revision_id) {
            return $http.get(config.getApiEndpoint() + "/revisions/" + revision_id + "/concerns", {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        save: function(concern_id, data) {
            return $http.put(config.getApiEndpoint() + "/concerns/" + concern_id, data, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        }
    };
});
