var app = angular.module("userService", []);


// User service
app.factory('$userService', function($http, $log, config, $authenticationService) {

    var user;

    return {
        init: function(){
            return {
                title: "",
                first_name: "",
                last_name: "",
                institute_id: null
            };
        },
        get: function(){
            return user;
        },
        set: function(data){
            user = data;
        },
        create: function(data) {
            return $http.post(config.getApiEndpoint() + "/users", data);
        },
        retrieve: function(user_id) {
            return $http.get(config.getApiEndpoint() + "/users/" + user_id, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        edit: function(user_id, data) {
            return $http.put(config.getApiEndpoint() + "/users/" + user_id, data, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        delete: function(user_id) {
            return $http.delete(config.getApiEndpoint() + "/users/" + user_id, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        findByEmail: function(email_address) {
            return $http.get(config.getApiEndpoint() + "/user/" + email_address);
        }
    };

});
