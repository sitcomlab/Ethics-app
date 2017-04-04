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
        getDocuments: function(){
            if(user === undefined){
                return undefined;
            } else if(user.documents === undefined){
                return undefined;
            } else {
                return user.documents;
            }
        },
        set: function(data){
            user = data;
        },
        setDocuments: function(data){
            user.documents = data;
        },
        copy: function(){
            return {
                email_address: user.email_address,
                title: user.title,
                first_name: user.first_name,
                last_name: user.last_name
            };
        },
        retrieve: function(user_id){
            return $http.get(config.apiURL + "/users/" + user_id);
        },
        edit: function(user_id, data){
            return $http.put(config.apiURL + "/users/" + user_id, data, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken(),
                    'Content-Type': 'application/json'
                }
            });
        },
        delete: function(user_id){
            return $http.delete(config.apiURL + "/users/" + user_id, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        create: function(data){
            return $http.post(config.apiURL + "/users", data, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken(),
                    'Content-Type': 'application/json'
                }
            });
        },
        listDocuments: function(user_id){
            return $http.get(config.apiURL + "/users/" + user_id + "/documents", {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken(),
                    'Content-Type': 'application/json'
                }
            });
        }
    };

});
