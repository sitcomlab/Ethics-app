var app = angular.module("universityService", []);


// University service
app.factory('$universityService', function($http, $log, config, $authenticationService) {

    var universities;
    var cached_filter = {
        offset: 0,
        limit: null,
        former: null,
        orderby: 'name.asc'
    };
    var full_count = 0;

    return {
        get: function(){
            return universities;
        },
        getCachedFilter: function(){
            return cached_filter;
        },
        set: function(data){
            universities = data;
        },
        setCachedFilter: function(data){
            cached_filter = data;
        },
        list: function(filter) {
            var query = "?orderby=" + filter.orderby + "&";

            if(filter.offset && filter.offset !== null){
                query = query + "offset=" + filter.offset + "&";
            }
            if(filter.limit && filter.limit !== null){
                query = query + "limit=" + filter.limit + "&";
            }
            if(filter.former !== null){
                query = query + "former=" + filter.former + "&";
            }

            query = query.slice(0, -1);

            // Check if token exists
            if($authenticationService.getToken()){
                return $http.get(config.apiURL + "/universities" + query, {
                    headers: {
                        'Authorization': 'Bearer ' + $authenticationService.getToken()
                    }
                });
            } else {
                return $http.get(config.apiURL + "/universities" + query);
            }
        },
        retrieve: function(university_id) {
            return $http.get(config.apiURL + "/universities/" + university_id);
        }
    };

});
