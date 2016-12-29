var app = angular.module("revisionService", []);


// Revision service
app.factory('$revisionService', function($http, $log, config) {

    return {
        listByDocument: function(document_id) {
            return $http.get(config.apiURL + "/documents/" + document_id + "/revisions");
        },
    };

});
