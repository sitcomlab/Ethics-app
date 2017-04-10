var app = angular.module("researchGroupService", []);


// Research group service
app.factory('$researchGroupService', function($http, $log, config, $authenticationService) {

    var research_groups;

    return {
        get: function(){
            return research_groups;
        },
        set: function(data){
            research_groups = data;
        },
        list: function(){
            return $http.get(config.apiURL + "/research_groups", {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        create: function(data){
            return $http.post(config.apiURL + "/research_groups" , data, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        retrieve: function(research_group_id){
            return $http.get(config.apiURL + "/research_groups/" + research_group_id, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        edit: function(research_group_id, data){
            return $http.put(config.apiURL + "/research_groups/" + research_group_id, data, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        remove: function(){
            return $http.delete(config.apiURL + "/research_groups/" + research_group_id, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        }
    };

});
