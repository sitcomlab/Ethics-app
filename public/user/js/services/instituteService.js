var app = angular.module("instituteService", []);


// Institute service
app.factory('$instituteService', function($http, $log, config, _) {

    var institutes;

    return {
        get: function(){
            return institutes;
        },
        getByUniversity: function(university_id){
            return _.where(institutes, {university_id: university_id});
        },
        set: function(data){
            institutes = data;
        },
        list: function() {
            return $http.get(config.apiURL + "/institutes");
        },
        retrieve: function(institute_id) {
            return $http.get(config.apiURL + "/institutes/" + institute_id);
        }
    };

});
