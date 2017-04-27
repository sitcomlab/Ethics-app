var app = angular.module("instituteService", []);


// Institute service
app.factory('$instituteService', function($http, $log, config, $authenticationService) {

    var institutes;
    var filter = {
        offset: 0,
        limit: 50,
        former: false,
        orderby: "name.asc"
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
                former: institute.former
            };
        },
        get: function(){
            return institutes;
        },
        getFilter: function(){
            return filter;
        },
        getCount: function(){
            return full_count;
        },
        set: function(data){
            institutes = data;
        },
        setFilter: function(data) {
            filter = data;
        },
        setCount: function(data) {
            full_count = data;
        },
        list: function(filter) {
            var query = "?orderby=" + filter.orderby + "&";

            if(filter.offset && filter.offset !== null){
                query = query + "&offset=" + filter.offset + "&";
            }
            if(filter.limit && filter.limit !== null){
                query = query + "&limit=" + filter.limit + "&";
            }
            if(filter.former && filter.former !== null){
                query = query + "&former=" + filter.former + "&";
            }

            query = query.slice(0, -1);

            return $http.get(config.apiURL + "/institutes" + query, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        listByUniversity: function(university_id, filter) {
            var query = "?orderby=" + filter.orderby + "&";

            if(filter.offset && filter.offset !== null){
                query = query + "&offset=" + filter.offset + "&";
            }
            if(filter.limit && filter.limit !== null){
                query = query + "&limit=" + filter.limit + "&";
            }
            if(filter.former && filter.former !== null){
                query = query + "&former=" + filter.former + "&";
            }

            query = query.slice(0, -1);

            return $http.get(config.apiURL + "/universities/" + university_id + "/institutes" + query, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        create: function(data){
            return $http.post(config.apiURL + "/institutes" , data, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        retrieve: function(institute_id){
            return $http.get(config.apiURL + "/institutes/" + institute_id, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        edit: function(institute_id, data){
            return $http.put(config.apiURL + "/institutes/" + institute_id, data, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        remove: function(institute_id){
            return $http.delete(config.apiURL + "/institutes/" + institute_id, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        }
    };

});
