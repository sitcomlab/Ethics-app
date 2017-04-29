var app = angular.module("recoveryService", []);


// Recovery service
app.factory('$recoveryService', function($http, $log, config) {

    return {
        findByEmail: function(email_address) {
            return $http.get(config.apiURL + "/recovery/member/" + email_address);
        },
        resetPassword: function(data) {
            return $http.post(config.apiURL + "/reset" , data, {
                headers: {
                    'Authorization': 'Bearer ' + data.token
                }
            });
        }
    };

});
