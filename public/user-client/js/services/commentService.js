var app = angular.module("commentService", []);


// Comment service
app.factory('$commentService', function($http, $log, config, $authenticationService) {

    return {
        getByRevision: function(revision_id, language) {
            return $http.get(config.apiURL + "/revisions/" + revision_id + "/comments", {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        }
    };

});
