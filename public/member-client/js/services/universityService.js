var app = angular.module("universityService", []);


// University service
app.factory('$universityService', function($http, $log, config, $authenticationService) {

    var universities;
    var cached_filter = {
        offset: 0,
        limit: 50,
        orderby: "name.asc",
        search_text: ""
    };
    var full_count = 0;

    return {
        init: function(){
            return {
                university_name: ""
            };
        },
        copy: function(university){
            return {
                university_id: university.university_id,
                university_name: university.university_name
            };
        },
        get: function(){
            return universities;
        },
        getCachedFilter: function(){
            return cached_filter;
        },
        getCount: function(){
            return full_count;
        },
        set: function(data){
            universities = data;
        },
        setCachedFilter: function(data) {
            cached_filter = data;
        },
        setCount: function(data) {
            full_count = data;
        },
        list: function(filter) {
            var query = "?orderby=" + filter.orderby + "&";

            if(filter.offset && filter.offset !== null){
                query = query + "offset=" + filter.offset + "&";
            }
            if(filter.limit && filter.limit !== null){
                query = query + "limit=" + filter.limit + "&";
            }

            query = query.slice(0, -1);

            return $http.get(config.getApiEndpoint() + "/universities" + query, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        create: function(data){
            return $http.post(config.getApiEndpoint() + "/universities" , data, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        retrieve: function(university_id){
            return $http.get(config.getApiEndpoint() + "/universities/" + university_id, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        edit: function(university_id, data){
            return $http.put(config.getApiEndpoint() + "/universities/" + university_id, data, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        remove: function(university_id){
            return $http.delete(config.getApiEndpoint() + "/universities/" + university_id, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        search: function(filter) {
            var query = "?orderby=" + filter.orderby + "&";

            if(filter.offset && filter.offset !== null){
                query = query + "offset=" + filter.offset + "&";
            }
            if(filter.limit && filter.limit !== null){
                query = query + "limit=" + filter.limit + "&";
            }

            query = query.slice(0, -1);

            return $http.post(config.getApiEndpoint() + "/search/universities" + query, {
                search_text: filter.search_text
            }, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        }
    };

});
