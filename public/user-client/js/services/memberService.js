var app = angular.module("memberService", []);


// Member service
app.factory('$memberService', function($http, $log, config, $authenticationService) {

    var members;
    var cached_filter = {
        offset: 0,
        limit: 50,
        former: false,
        orderby: 'name.asc',
        search_text: ""
    };
    var full_count = 0;

    return {
        get: function(){
            return members;
        },
        getCachedFilter: function(){
            return cached_filter;
        },
        getCount: function(){
            return full_count;
        },
        set: function(data){
            members = data;
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

            return $http.get(config.getApiEndpoint() + "/members" + query, {
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

            return $http.get(config.getApiEndpoint() + "/universities/" + university_id + "/members" + query, {
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
            if(filter.former !== null){
                query = query + "former=" + filter.former + "&";
            }

            query = query.slice(0, -1);

            return $http.get(config.getApiEndpoint() + "/institutes/" + institute_id + "/members" + query, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        retrieve: function(member_id) {
            return $http.get(config.getApiEndpoint() + "/members/" + member_id, {
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

            return $http.post(config.getApiEndpoint() + "/search/members" + query, {
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

            return $http.post(config.getApiEndpoint() + "/search/universities/" + university_id + "/members" + query, {
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
            if(filter.former !== null){
                query = query + "former=" + filter.former + "&";
            }

            query = query.slice(0, -1);

            return $http.post(config.getApiEndpoint() + "/search/institutes/" + institute_id + "/members" + query, {
                search_text: filter.search_text
            }, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        }
    };

});
