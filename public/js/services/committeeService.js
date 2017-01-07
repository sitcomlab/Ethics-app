var app = angular.module("committeeService", []);


// Committee service
app.factory('$committeeService', function($http, $log, config) {

    return {
        list: function() {
            return $http.get(config.apiURL + "/committee");
        }
    };

});
