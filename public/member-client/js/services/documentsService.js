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
        list: function(value) {
            if(value){
                query = "?status=" + value;
            } else {
                query = "";
            }
            console.log($authenticationService.getToken());
            return $http.get(config.apiURL + "/documents" + query, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        }

    };

});
