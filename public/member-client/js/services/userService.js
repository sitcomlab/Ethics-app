var app = angular.module("userService", []);


// User service
app.factory('$userService', function($http, $log, config, $authenticationService) {

    var users;
    var cached_filter = {
        offset: 0,
        limit: 50,
        blocked: false,
        orderby: "name.asc",
        search_text: ""
    };
    var full_count = 0;

    return {
        init: function(){
            return {
                email_address: "",
                title: null,
                first_name: "",
                last_name: "",
                institute_id: null,
                blocked: false
            };
        },
        copy: function(user){
            return {
                user_id: user.user_id,
                email_address: user.email_address,
                title: user.title,
                first_name: user.first_name,
                last_name: user.last_name,
                institute_id: user.institute_id,
                blocked: user.blocked
            };
        },
        get: function(){
            return users;
        },
        getCachedFilter: function(){
            return cached_filter;
        },
        getCount: function(){
            return full_count;
        },
        set: function(data){
            users = data;
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
            if(filter.blocked !== null){
                query = query + "blocked=" + filter.blocked + "&";
            }

            query = query.slice(0, -1);

            return $http.get(config.getApiEndpoint() + "/users" + query, {
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
            if(filter.blocked !== null){
                query = query + "blocked=" + filter.blocked + "&";
            }

            query = query.slice(0, -1);

            return $http.get(config.getApiEndpoint() + "/universities/" + university_id + "/users" + query, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        listByInstitute: function(institute_id, filter) {

            var query = "?orderby=" + filter.orderby + "&";

            if(filter.offset && filter.offset !== null){
                query = query + "offset=" + filter.offset + "&";
            }
            if(filter.limit && filter.limit !== null){
                query = query + "limit=" + filter.limit + "&";
            }
            if(filter.blocked !== null){
                query = query + "blocked=" + filter.blocked + "&";
            }

            query = query.slice(0, -1);

            return $http.get(config.getApiEndpoint() + "/institutes/" + institute_id + "/users" + query, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        create: function(data){
            return $http.post(config.getApiEndpoint() + "/users" , data, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        retrieve: function(user_id){
            return $http.get(config.getApiEndpoint() + "/users/" + user_id, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        edit: function(user_id, data){
            return $http.put(config.getApiEndpoint() + "/users/" + user_id, data, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        remove: function(user_id){
            return $http.delete(config.getApiEndpoint() + "/users/" + user_id, {
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
            if(filter.blocked !== null){
                query = query + "blocked=" + filter.blocked + "&";
            }

            query = query.slice(0, -1);

            return $http.post(config.getApiEndpoint() + "/search/users" + query, {
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
            if(filter.blocked !== null){
                query = query + "blocked=" + filter.blocked + "&";
            }

            query = query.slice(0, -1);

            return $http.post(config.getApiEndpoint() + "/search/universities/" + university_id + "/users" + query, {
                search_text: filter.search_text
            }, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        searchByInstitute: function(institute_id, filter) {

            var query = "?orderby=" + filter.orderby + "&";

            if(filter.offset && filter.offset !== null){
                query = query + "offset=" + filter.offset + "&";
            }
            if(filter.limit && filter.limit !== null){
                query = query + "limit=" + filter.limit + "&";
            }
            if(filter.blocked !== null){
                query = query + "blocked=" + filter.blocked + "&";
            }

            query = query.slice(0, -1);

            return $http.post(config.getApiEndpoint() + "/search/institutes/" + institute_id + "/users" + query, {
                search_text: filter.search_text
            }, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        }
    };

});
