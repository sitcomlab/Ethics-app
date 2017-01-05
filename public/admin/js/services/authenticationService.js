var app = angular.module("authenticationService", []);


// Authentication service
app.factory('$authenticationService', function($http, $log, config) {

    var user;

    return {
        init: function(){
            return {
                username: "n.schiestel@uni-muenster.de", // TEST
                password: "123456" // TEST
            };
        },
        get: function(){
            return user;
        },
        set: function(data){
            user = data;
        },
        authenticated: function(){
            if(user === undefined){
                return false;
            } else if(user.token === undefined){
                return false;
            } else {
                return true;
            }
        },
        getToken: function(){
            if(user === undefined){
                return undefined;
            } else if(user.token === undefined){
                return undefined;
            } else {
                return user.token;
            }
        },
        login: function(data) {
            return $http.post(config.apiURL + "/login", data);
        }
    };

});
