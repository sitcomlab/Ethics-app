var app = angular.module("userService", []);


// User service
app.factory('$userService', function($http, $log, config, $authenticationService) {

    var users;

    return {
        get: function(){
            return users;
        },
        getByStatus: function(status){
            return _.where(users, { blocked: status });
        },
        set: function(data){
            users = data;
        },
        list: function(){
            return $http.get(config.apiURL + "/users", {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        create: function(data){
            return $http.post(config.apiURL + "/users" , data, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        retrieve: function(user_id){
            return $http.get(config.apiURL + "/users/" + user_id, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        edit: function(user_id, data){
            return $http.put(config.apiURL + "/users/" + user_id, data, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        remove: function(user_id){
            return $http.delete(config.apiURL + "/users/" + user_id, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        }
    };

});
