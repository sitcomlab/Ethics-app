var app = angular.module("authenticationService", []);


// Authentication service
app.factory('$authenticationService', function($http, $log, config, $rootScope) {

    var authenticated_user;

    return {
        init: function(){
            return {
                username: "n.schiestel@uni-muenster.de", // TEST
                password: "123456" // TEST
            };
        },
        get: function(){
            return authenticated_user;
        },
        set: function(data){
            authenticated_user = data;
            // Update navbar
            $rootScope.$broadcast('updateNavbar');
        },
        authenticated: function(){
            if(authenticated_user === undefined){
                return false;
            } else if(authenticated_user.token === undefined){
                return false;
            } else {
                return true;
            }
        },
        getToken: function(){
            if(authenticated_user === undefined){
                return undefined;
            } else if(authenticated_user.token === undefined){
                return undefined;
            } else {
                return authenticated_user.token;
            }
        },
        login: function(data) {
            return $http.post(config.apiURL + "/login", data);
        }
    };

});
