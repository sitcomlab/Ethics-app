var app = angular.module("recoveryService", []);


// Recovery service
app.factory('$recoveryService', function($http, $log, config) {

    return {
        init: function(){
            return {
                email_address: "nicho90@live.de" // TEST
            };
        },
        findByEmail: function(email_address) {
            return $http.get(config.apiURL + "/recovery/user/" + email_address);
        }
    };

});
