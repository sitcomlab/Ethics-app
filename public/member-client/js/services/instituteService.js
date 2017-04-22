var app = angular.module("instituteService", []);


// Institute service
app.factory('$instituteService', function($http, $log, config, $authenticationService) {

    var institutes;

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
        getByUniversity: function(university_id){
            return _.where(institutes, {university_id: university_id});
        },
        getByStatus: function(status){
            return _.where(institutes, { former: status });
        },
        set: function(data){
            institutes = data;
        },
        list: function(){
            return $http.get(config.apiURL + "/institutes", {
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
