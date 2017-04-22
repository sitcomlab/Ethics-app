var app = angular.module("courseService", []);


// Course service
app.factory('$courseService', function($http, $log, config, $authenticationService, _) {

    var courses;

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
        getByInstitute: function(institute_id){
            return _.where(courses, {institute_id: institute_id});
        },
        set: function(data){
            courses = data;
        },
        list: function() {
            return $http.get(config.apiURL + "/courses", {
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
