var app = angular.module("workingGroupService", []);


// Working group service
app.factory('$workingGroupService', function($http, $log, config, $authenticationService) {

    var working_groups;

    return {
        init: function(){
            return {
                working_group_name: "",
                institute_id: null,
                former: false
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
        getByInstitute: function(institute_id){
            return _.where(working_groups, {institute_id: institute_id});
        },
        getByStatus: function(status){
            return _.where(working_groups, { former: status });
        },
        set: function(data){
            working_groups = data;
        },
        list: function(){
            return $http.get(config.apiURL + "/working_groups", {
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
