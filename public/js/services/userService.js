var app = angular.module("userService", []);


// User service
app.factory('$userService', function($http, $log, config) {

    var user;

    return {
        init: function(){
            return {
                title: "",
                first_name: "",
                last_name: ""
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
                user_id: user.user_id,
                title: user.title,
                first_name: user.first_name,
                last_name: user.last_name,
                email_address: user.email_address
            };
        },
        create: function(data) {
            return $http.post(config.apiURL + "/users", data);
        },
        retrieve: function(user_id) {
            return $http.get(config.apiURL + "/users/" + user_id);
        },
        edit: function(user_id, data) {
            return $http.put(config.apiURL + "/users/" + user_id, data);
        },
        findByEmail: function(email_address) {
            return $http.get(config.apiURL + "/user/" + email_address);
        }
    };

});
