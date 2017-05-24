var app = angular.module("instituteService", []);


// Institute service
app.factory('$instituteService', function($http, $log, config, $authenticationService) {

    var institutes;
    var cached_filter = {
        offset: 0,
        limit: 50,
        former: false,
        orderby: "name.asc",
        search_text: ""
    };
    var full_count = 0;

    return {
        init: function(){
            return {
                institute_name: "",
                university_id: null,
                former: false
            };
        },
        copy: function(institute){
            return {
                institute_id: institute.institute_id,
                institute_name: institute.institute_name,
                university_id: institute.university_id,
                former: institute.former
            };
        },
        get: function(){
            return institutes;
        },
        getCachedFilter: function(){
            return cached_filter;
        },
        getCount: function(){
            return full_count;
        },
        set: function(data){
            institutes = data;
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
            if(filter.former !== null){
                query = query + "former=" + filter.former + "&";
            }

            query = query.slice(0, -1);

            return $http.get(config.getApiEndpoint() + "/institutes" + query, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        listByUniversity: function(university_id, filter) {
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

            return $http.get(config.getApiEndpoint() + "/universities/" + university_id + "/institutes" + query, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        create: function(data){
            return $http.post(config.getApiEndpoint() + "/institutes" , data, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        retrieve: function(institute_id){
            return $http.get(config.getApiEndpoint() + "/institutes/" + institute_id, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        edit: function(institute_id, data){
            return $http.put(config.getApiEndpoint() + "/institutes/" + institute_id, data, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        remove: function(institute_id){
            return $http.delete(config.getApiEndpoint() + "/institutes/" + institute_id, {
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
            if(filter.former !== null){
                query = query + "former=" + filter.former + "&";
            }

            query = query.slice(0, -1);

            return $http.post(config.getApiEndpoint() + "/search/institutes" + query, {
                search_text: filter.search_text
            }, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        searchByUniversity: function(university_id, filter) {
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

            return $http.post(config.getApiEndpoint() + "/search/universities/" + university_id + "/institutes" + query, {
                search_text: filter.search_text
            }, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        }
    };

});
