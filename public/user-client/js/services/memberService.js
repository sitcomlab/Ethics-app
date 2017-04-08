var app = angular.module("memberService", []);


// Member service
app.factory('$memberService', function($http, $log, config, $authenticationService) {

    var members;

    return {
        get: function(){
            return members;
        },
        getByStatus: function(status){
            return _.where(members, { deleted: status });
        },
        set: function(data){
            members = data;
        },
        list: function() {
            return $http.get(config.apiURL + "/members", {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        retrieve: function(member_id) {
            return $http.get(config.apiURL + "/members/" + member_id, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        }
    };

});
