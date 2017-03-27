var app = angular.module("universityService", []);


// Universities service
app.factory('$universityService', function($http, $log, config) {

    var universities;

    return {
        get: function(){
            return universities;
        },
        set: function(data){
            universities = data;
        },
        list: function() {
            return $http.get(config.apiURL + "/universities");
        },
        retrieve: function(university_id) {
            return $http.get(config.apiURL + "/universities/" + university_id);
        }
    };

});
