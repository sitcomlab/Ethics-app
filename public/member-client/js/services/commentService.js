var app = angular.module("commentService", []);


// Comment service
app.factory('$commentService', function($http, $log, config, $authenticationService) {

    return {
        getByRevision: function(revision_id, language) {
            return $http.get(config.getApiEndpoint() + "/revisions/" + revision_id + "/comments", {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        edit: function(comment_id, data) {
            return $http.put(config.getApiEndpoint() + "/comments/" + comment_id, data, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        }
    };

});
