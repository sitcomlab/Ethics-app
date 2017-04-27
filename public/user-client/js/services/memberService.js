var app = angular.module("memberService", []);


// Member service
app.factory('$memberService', function($http, $log, config, $authenticationService) {

    var members;
    var filter = {
        offset: 0,
        limit: 50,
        former: false
    };
    var full_count = 0;

    return {
        get: function(){
            return members;
        },
        getFilter: function(){
            return filter;
        },
        getCount: function(){
            return full_count;
        },
        set: function(data){
            members = data;
        },
        setFilter: function(data) {
            filter = data;
        },
        setCount: function(data) {
            full_count = data;
        },
        list: function(filter) {
            var query = "?offset=" + filter.offset + "&limit=" + filter.limit + "&former=" + filter.former + "&";

            query = query.slice(0, -1);

            return $http.get(config.apiURL + "/members" + query, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        listByUniversity: function(university_id, filter) {
            var query = "?former=" + filter.former + "&";

            query = query.slice(0, -1);

            return $http.get(config.apiURL + "/universities/" + university_id + "/members" + query, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        listByInstitute: function(institute_id, filter) {
            var query = "?former=" + filter.former + "&";

            query = query.slice(0, -1);

            return $http.get(config.apiURL + "/institutes/" + institute_id + "/members" + query, {
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
