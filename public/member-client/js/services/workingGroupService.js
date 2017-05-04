var app = angular.module("workingGroupService", []);


// Working group service
app.factory('$workingGroupService', function($http, $log, config, $authenticationService) {

    var working_groups;
    var cached_filter = {
        offset: 0,
        limit: 50,
        former: false,
        orderby: "name.asc"
    };
    var full_count = 0;

    return {
        init: function(){
            return {
                working_group_name: "",
                institute_id: null,
                former: fals
            };
        },
        copy: function(working_group){
            return {
                working_group_id: working_group.working_group_id,
                working_group_name: working_group.working_group_name,
                institute_id: working_group.institute_id,
                former: working_group.former
            };
        },
        get: function(){
            return working_groups;
        },
        getCachedFilter: function(){
            return cached_filter;
        },
        getCount: function(){
            return full_count;
        },
        set: function(data){
            working_groups = data;
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

            return $http.get(config.apiURL + "/working_groups" + query, {
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

            return $http.get(config.apiURL + "/institutes/" + institute_id + "/working_groups" + query, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        create: function(data){
            return $http.post(config.apiURL + "/working_groups" , data, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        retrieve: function(working_group_id){
            return $http.get(config.apiURL + "/working_groups/" + working_group_id, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        edit: function(working_group_id, data){
            return $http.put(config.apiURL + "/working_groups/" + working_group_id, data, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        remove: function(working_group_id){
            return $http.delete(config.apiURL + "/working_groups/" + working_group_id, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        }
    };

});
