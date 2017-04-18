var app = angular.module("universityService", []);


// University service
app.factory('$universityService', function($http, $log, config, $authenticationService) {

    var universities;

    return {
        get: function(){
            return universities;
        },
        set: function(data){
            universities = data;
        },
        list: function(){
            return $http.get(config.apiURL + "/universities", {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        create: function(data){
            return $http.post(config.apiURL + "/universities" , data, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        retrieve: function(university_id){
            return $http.get(config.apiURL + "/universities/" + university_id, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        edit: function(university_id, data){
            return $http.put(config.apiURL + "/universities/" + university_id, data, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        remove: function(university_id){
            return $http.delete(config.apiURL + "/universities/" + university_id, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        }
    };

});
