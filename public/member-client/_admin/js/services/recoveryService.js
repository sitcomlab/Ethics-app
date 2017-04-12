var app = angular.module("recoveryService", []);


// Recovery service
app.factory('$recoveryService', function($http, $log, config) {

    return {
        init: function(){
            return {
                email_address: "n.schiestel@uni-muenster.de" // TEST
            };
        },
        findByEmail: function(email_address) {
            return $http.get(config.apiURL + "/recovery/member/" + email_address);
        }
    };

});
