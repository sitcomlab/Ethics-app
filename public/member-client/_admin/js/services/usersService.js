var app = angular.module("usersService", []);


// Users service
app.factory('$usersService', function($http, $log, config, $authenticationService) {

    var users;

    return {
        get: function() {
            return users;
        },
        set: function(data) {
            users = data;
        },
        list: function() {
            return $http.get(config.apiURL + "/users", {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        }

    };

});
