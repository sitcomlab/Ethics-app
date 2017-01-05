var app = angular.module("documentsService", []);


// Documents service
app.factory('$documentsService', function($http, $log, config, $authenticationService) {

    var documents;

    return {
        get: function() {
            return documents;
        },
        set: function(data) {
            documents = data;
        },
        list: function(attribute, value) {
            var query = "?";
            if(attribute){
                query = attribute + "=" + value;
            } else {
                query = "";
            }
            return $http.get(config.apiURL + "/documents" + query, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        }
        
    };

});
