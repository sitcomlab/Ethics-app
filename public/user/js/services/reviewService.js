var app = angular.module("reviewService", []);


// Review service
app.factory('$reviewService', function($http, $log, config, $authenticationService) {

    return {
        getByRevision: function(revision_id, language) {
            return $http.get(config.apiURL + "/revisions/" + revision_id + "/reviews", {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        }
    };

});
