var app = angular.module("courseService", []);


// Course service
app.factory('$courseService', function($http, $log, config, $authenticationService, _) {

    var courses;
    var filter = {
        offset: 0,
        limit: 50
    };
    var full_count = 0;

    return {
        init: function(){
            return {
                course_name: "",
                year: Number(moment().format("YYYY")),
                term: true,
                lecturer: "",
                institute_id: null,
                responsibilities: []
            };
        },
        copy: function(course){
            return {
                course_id: course.course_id,
                course_name: course.course_name,
                year: course.year,
                term: course.term,
                lecturer: course.lecturer,
                institute_id: course.institute_id,
                responsibilities: course.responsibilities
            };
        },
        get: function(){
            return courses;
        },
        getFilter: function(){
            return filter;
        },
        getCount: function(){
            return full_count;
        },
        set: function(data){
            courses = data;
        },
        setFilter: function(data) {
            filter = data;
        },
        setCount: function(data) {
            full_count = data;
        },
        list: function(filter) {
            var query = "?offset=" + filter.offset + "&limit=" + filter.limit + "&";

            // TODO: Add orderby

            query = query.slice(0, -1);

            return $http.get(config.apiURL + "/courses" + query, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        listByInstitute: function(institute_id) {
            return $http.get(config.apiURL + "/institutes/" + institute_id + "/courses", {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        create: function(data){
            return $http.post(config.apiURL + "/courses", data, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        retrieve: function(course_id) {
            return $http.get(config.apiURL + "/courses/" + course_id, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        edit: function(course_id, data){
            return $http.put(config.apiURL + "/courses/" + course_id, data, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        remove: function(course_id){
            return $http.delete(config.apiURL + "/courses/" + course_id, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        }

    };

});
