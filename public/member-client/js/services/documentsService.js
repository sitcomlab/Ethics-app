var app = angular.module("documentsService", []);


// Documents service
app.factory('$documentsService', function($http, $log, config, $authenticationService) {

    var documents;
    var cached_filter = {
        offset: 0,
        limit: 50,
        orderby: "created.desc",
        course: "false",
        status: "3",
        search_text: ""
    };
    var full_count = 0;

    return {
        get: function() {
            return documents;
        },
        getCachedFilter: function(){
            return cached_filter;
        },
        getCount: function(){
            return full_count;
        },
        set: function(data) {
            documents = data;
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
            if(filter.course !== null){
                query = query + "course=" + filter.course + "&";
            }
            if(filter.status !== null){
                query = query + "status=" + filter.status + "&";
            }

            query = query.slice(0, -1);

            return $http.get(config.getApiEndpoint() + "/documents" + query, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        listByCourse: function(course_id, filter){
            var query = "?orderby=" + filter.orderby + "&";

            if(filter.offset && filter.offset !== null){
                query = query + "offset=" + filter.offset + "&";
            }
            if(filter.limit && filter.limit !== null){
                query = query + "limit=" + filter.limit + "&";
            }

            query = query.slice(0, -1);

            return $http.get(config.getApiEndpoint() + "/courses/" + course_id + "/documents" + query, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        listByUser: function(user_id, filter){
            var query = "?orderby=" + filter.orderby + "&";

            if(filter.offset && filter.offset !== null){
                query = query + "offset=" + filter.offset + "&";
            }
            if(filter.limit && filter.limit !== null){
                query = query + "limit=" + filter.limit + "&";
            }

            query = query.slice(0, -1);

            return $http.get(config.getApiEndpoint() + "/users/" + user_id + "/documents" + query, {
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
            if(filter.course !== null){
                query = query + "course=" + filter.course + "&";
            }
            if(filter.status !== null){
                query = query + "status=" + filter.status + "&";
            }

            query = query.slice(0, -1);

            return $http.post(config.getApiEndpoint() + "/search/documents" + query, {
                search_text: filter.search_text
            }, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        searchByCourse: function(course_id, filter){
            var query = "?orderby=" + filter.orderby + "&";

            if(filter.offset && filter.offset !== null){
                query = query + "offset=" + filter.offset + "&";
            }
            if(filter.limit && filter.limit !== null){
                query = query + "limit=" + filter.limit + "&";
            }

            query = query.slice(0, -1);

            return $http.post(config.getApiEndpoint() + "/search/courses/" + course_id + "/documents" + query, {
                search_text: filter.search_text
            }, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        searchByUser: function(user_id, filter){
            var query = "?orderby=" + filter.orderby + "&";

            if(filter.offset && filter.offset !== null){
                query = query + "offset=" + filter.offset + "&";
            }
            if(filter.limit && filter.limit !== null){
                query = query + "limit=" + filter.limit + "&";
            }

            query = query.slice(0, -1);

            return $http.post(config.getApiEndpoint() + "/search/users/" + user_id + "/documents" + query, {
                search_text: filter.search_text
            }, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        }
    };

});
