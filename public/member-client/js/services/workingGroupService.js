var app = angular.module("workingGroupService", []);


// Working group service
app.factory('$workingGroupService', function($http, $log, config, $authenticationService) {

    var working_groups;

    return {
        get: function(){
            return working_groups;
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
        remove: function(){
            return $http.delete(config.apiURL + "/working_groups/" + working_group_id, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        }
    };

});
