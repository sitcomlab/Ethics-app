var app = angular.module("instituteService", []);


// Institute service
app.factory('$instituteService', function($http, $log, config, $authenticationService, _) {

    var institutes;
    var filter = {
        offset: 0,
        limit: null,
        former: null,
        orderby: 'name.asc'
    };
    var full_count = 0;

    return {
        get: function(){
            return institutes;
        },
        getByUniversity: function(university_id){ // DEPRECATED
            return _.where(institutes, {university_id: university_id});
        },
        set: function(data){
            institutes = data;
        },
        list: function(filter) {
            var query = "?orderby=" + filter.orderby + "&";

            if(filter.offset && filter.offset !== null){
                query = query + "offset=" + filter.offset + "&";
            }
            if(filter.limit && filter.limit !== null){
                query = query + "limit=" + filter.limit + "&";
            }
            if(filter.former && filter.former !== null){
                query = query + "former=" + filter.former + "&";
            }

            // Check if token exists
            if($authenticationService.getToken()){
                return $http.get(config.apiURL + "/institutes" + query, {
                    headers: {
                        'Authorization': 'Bearer ' + $authenticationService.getToken()
                    }
                });
            } else {
                return $http.get(config.apiURL + "/institutes" + query);
            }
        },
        listByUniversity: function(university_id, filter){ // DEPRECATED
            var query = "?orderby=" + filter.orderby + "&";

            if(filter.offset && filter.offset !== null){
                query = query + "offset=" + filter.offset + "&";
            }
            if(filter.limit && filter.limit !== null){
                query = query + "limit=" + filter.limit + "&";
            }
            if(filter.former && filter.former !== null){
                query = query + "former=" + filter.former + "&";
            }

            query = query.slice(0, -1);

            // Check if token exists
            if($authenticationService.getToken()){
                return $http.get(config.apiURL + "/universities/" + university_id + "/institutes" + query, {
                    headers: {
                        'Authorization': 'Bearer ' + $authenticationService.getToken()
                    }
                });
            } else {
                return $http.get(config.apiURL + "/universities/" + university_id + "/institutes" + query);
            }
        },
        retrieve: function(institute_id) {
            return $http.get(config.apiURL + "/institutes/" + institute_id);
        }
    };

});
