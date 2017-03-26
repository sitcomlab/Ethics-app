var app = angular.module("membersService", []);


// Members service
app.factory('$membersService', function($http, $log, config) {

    return {
        list: function() {
            return $http.get(config.apiURL + "/members/active");
        },
        retrieve: function(member_id) {
            return $http.get(config.apiURL + "/members/" + member_id);
        }
    };

});
