var app = angular.module("membersService", []);


// Members service
app.factory('$membersService', function($http, $log, config, $authenticationService) {

    var members;

    return {
        get: function() {
            return members;
        },
        set: function(data) {
            members = data;
        },
        list: function() {
            return $http.get(config.apiURL + "/admin/members", {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        }

    };

});
