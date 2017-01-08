var app = angular.module("memberService", []);


// Member service
app.factory('$memberService', function($http, $log, config, $rootScope, $authenticationService) {

    var member;

    return {
        init: function(){
            return {
                title: "",
                first_name: "",
                last_name: "",
            };
        },
        get: function(){
            return member;
        },
        getId: function(){
            if(member === undefined){
                return undefined;
            } else {
                return member.member_id;
            }
        },
        set: function(data){
            member = data;
        },

        copy: function(){
            return {

            };
        },
        retrieve: function(member_id){
            return $http.get(config.apiURL + "/admin/members/" + member_id);
        },
        edit: function(member_id){
            return $http.put(config.apiURL + "/admin/members/" + member_id, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        delete: function(member_id){
            return $http.delete(config.apiURL + "/admin/members/" + member_id, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        create: function(data){
            return $http.post(config.apiURL + "/admin/members", {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                },
                body: data
            });
        }
    };

});
