var app = angular.module("courseService", []);


// Course service
app.factory('$courseService', function($http, $log, config, $authenticationService, _) {

    var courses;
    var filter = {
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

            if($authenticationService.getToken()){
                return $http.get(config.apiURL + "/courses" + query, {
                    headers: {
                        'Authorization': 'Bearer ' + $authenticationService.getToken()
                    }
                });
            } else {
                return $http.get(config.apiURL + "/courses" + query);
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
            if(filter.former && filter.former !== null){
                query = query + "former=" + filter.former + "&";
            }

            if($authenticationService.getToken()){
                return $http.get(config.apiURL + "/institutes/" + institute_id+ "/courses" + query, {
                    headers: {
                        'Authorization': 'Bearer ' + $authenticationService.getToken()
                    }
                });
            } else {
                return $http.get(config.apiURL + "/institutes/" + institute_id+ "/courses" + query);
            }
        },
        retrieve: function(course_id) {
            return $http.get(config.apiURL + "/courses/" + course_id);
        }
    };

});
