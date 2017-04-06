var app = angular.module("courseService", []);


// Course service
app.factory('$courseService', function($http, $log, config, _) {

    var courses;

    return {
        get: function(){
            return courses;
        },
        getByInstitute: function(institute_id){
            return _.where(courses, {institute_id: institute_id});
        },
        getInstituteId: function(course_id){
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
        list: function() {
            return $http.get(config.apiURL + "/courses");
        },
        retrieve: function(course_id) {
            return $http.get(config.apiURL + "/courses/" + course_id);
        }
    };

});
