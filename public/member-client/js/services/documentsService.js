var app = angular.module("documentsService", []);


// Documents service
app.factory('$documentsService', function($http, $log, config, $authenticationService) {

    var documents;

    return {
        get: function() {
            return documents;
        },
        getByUser: function() { // ALTERNATIVE
            return _.where(documents, { user_id: user_id });
        },
        set: function(data) {
            documents = data;
        },
        list: function(filter) {
            var query = "";

            if(filter.document_status !== null){
                query = query + "?status=" + filter.document_status;
            }

            return $http.get(config.apiURL + "/documents" + query, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        listByCourse: function(course_id){
            return $http.get(config.apiURL + "/courses/" + course_id + "/documents", {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        listByUser: function(user_id){
            return $http.get(config.apiURL + "/users/" + user_id + "/documents", {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        }

    };

});
