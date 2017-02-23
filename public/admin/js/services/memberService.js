var app = angular.module("memberService", []);


// Member service
app.factory('$memberService', function($http, $log, config, $rootScope, $authenticationService) {

    var member;

    return {
        init: function(){
            return {
                email_address: "",
                password: "",
                title: "",
                first_name: "",
                last_name: "",
                institute: "",
                research_lab: "",
                office_room_number: "",
                office_phone_number: "",
                office_email_address: "",
                subscribed: true
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
            return $http.get(config.apiURL + "/members/" + member_id, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        edit: function(member_id){
            return $http.put(config.apiURL + "/members/" + member_id, data, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken(),
                    'Content-Type': 'application/json'
                }
            });
        },
        delete: function(member_id){
            return $http.delete(config.apiURL + "/members/" + member_id, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        create: function(data){
            return $http.post(config.apiURL + "/members", data, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken(),
                    'Content-Type': 'application/json'
                }
            });
        }
    };

});
