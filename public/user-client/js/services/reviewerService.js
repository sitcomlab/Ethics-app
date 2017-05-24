var app = angular.module("reviewerService", []);


// Reviewer service
app.factory('$reviewerService', function($http, $log, config, $authenticationService) {

    return {
        getByRevision: function(revision_id, language) {
            return $http.get(config.getApiEndpoint() + "/revisions/" + revision_id + "/reviewer", {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        }
    };

});
