var app = angular.module("courseService", []);


// Course service
app.factory('$courseService', function($http, $log, config, $authenticationService, _) {

    var courses;
    var cached_filter = {
        offset: 0,
        limit: null,
        former: null,
        orderby: 'year.desc'
    };
    var full_count = 0;

    return {
        get: function(){
            return courses;
        },
        getCachedFilter: function(){
            return cached_filter;
        },
        getByInstitute: function(institute_id){ // DEPRECATED
            return _.where(courses, {institute_id: institute_id});
        },
        getInstituteId: function(course_id){ // DEPRECATED!?
            var result = _.findWhere(courses, {course_id: course_id});
            if(result){
                return result.institute_id;
            } else {
                return null;
            }
        },
        set: function(data){
            courses = data;
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

            if($authenticationService.getToken()){
                return $http.get(config.getApiEndpoint() + "/courses" + query, {
                    headers: {
                        'Authorization': 'Bearer ' + $authenticationService.getToken()
                    }
                });
            } else {
                return $http.get(config.getApiEndpoint() + "/courses" + query);
            }
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

            if($authenticationService.getToken()){
                return $http.get(config.getApiEndpoint() + "/institutes/" + institute_id+ "/courses" + query, {
                    headers: {
                        'Authorization': 'Bearer ' + $authenticationService.getToken()
                    }
                });
            } else {
                return $http.get(config.getApiEndpoint() + "/institutes/" + institute_id+ "/courses" + query);
            }
        },
        retrieve: function(course_id) {
            return $http.get(config.getApiEndpoint() + "/courses/" + course_id);
        }
    };

});
