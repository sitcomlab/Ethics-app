var app = angular.module("descriptionService", []);


// Description service
app.factory('$descriptionService', function($http, $log, config, $authenticationService) {

    return {
        getByRevision: function(revision_id) {
            return $http.get(config.getApiEndpoint() + "/revisions/" + revision_id + "/descriptions", {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        }
    };

});
