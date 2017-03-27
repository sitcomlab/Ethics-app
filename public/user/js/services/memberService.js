var app = angular.module("memberService", []);


// Member service
app.factory('$memberService', function($http, $log, config) {

    return {
        list: function() {
            return $http.get(config.apiURL + "/members/active");
        },
        retrieve: function(member_id) {
            return $http.get(config.apiURL + "/members/" + member_id);
        }
    };

});
