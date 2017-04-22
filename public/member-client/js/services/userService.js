var app = angular.module("userService", []);


// User service
app.factory('$userService', function($http, $log, config, $authenticationService) {

    var users;

    return {
        init: function(){
            return {
                email_address: "",
                title: null,
                first_name: "",
                last_name: "",
                institute_id: null,
                blocked: false
            };
        },
        copy: function(user){
            return {
                user_id: user.user_id,
                email_address: user.email_address,
                title: user.title,
                first_name: user.first_name,
                last_name: user.last_name,
                institute_id: user.institute_id,
                blocked: user.blocked
            };
        },
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
