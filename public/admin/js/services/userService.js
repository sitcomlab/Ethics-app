var app = angular.module("userService", []);


// User service
app.factory('$userService', function($http, $log, config, $rootScope, $authenticationService) {

    var user;

    return {
        init: function(){
            return {
                title: "",
                first_name: "",
                last_name: "",
            };
        },
        get: function(){
            return user;
        },
        getId: function(){
            if(user === undefined){
                return undefined;
            } else {
                return user.user_id;
            }
        },
        set: function(data){
            user = data;
        },

        copy: function(){
            return {

            };
        },
        retrieve: function(user_id){
            return $http.get(config.apiURL + "/admin/users/" + user_id);
        },
        edit: function(user_id){
            return $http.put(config.apiURL + "/admin/users/" + user_id, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        delete: function(user_id){
            return $http.delete(config.apiURL + "/admin/users/" + user_id, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        create: function(data){
            return $http.post(config.apiURL + "/admin/users", {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                },
                body: data
            });
        }
    };

});
