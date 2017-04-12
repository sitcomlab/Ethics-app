var app = angular.module("authenticationService", []);


// Authentication service
app.factory('$authenticationService', function($http, $log, config, $rootScope) {

    var authenticated_member;
    var token;

    return {
        init: function(){
            return {
                username: "n.schiestel@uni-muenster.de", // TEST
                password: "123456" // TEST
            };
        },
        get: function(){
            return authenticated_member;
        },
        getId: function(){
            return authenticated_member.member_id;
        },
        set: function(data){
            authenticated_member = data;
            // Update navbar
            $rootScope.$broadcast('updateNavbar');
        },
        copy: function(){
            return {
                member_id: authenticated_member.member_id,
                email_address: authenticated_member.email_address,
                title: authenticated_member.title,
                first_name: authenticated_member.first_name,
                last_name: authenticated_member.last_name,
                institute: authenticated_member.institute,
                research_lab: authenticated_member.research_lab,
                office_room_number: authenticated_member.office_room_number,
                office_phone_number: authenticated_member.office_phone_number,
                office_email_address: authenticated_member.office_email_address,
                subscribed: authenticated_member.subscribed
            };
        },
        authenticated: function(){
            if(token === undefined){
                return false;
            } else {
                return true;
            }
        },
        setToken: function(data){
            token = data;
        },
        getToken: function(){
            if(token === undefined){
                return undefined;
            } else {
                return token;
            }
        },
        login: function(data) {
            return $http.post(config.apiURL + "/login", data);
        },
        editAccount: function(member_id, data){
            return $http.put(config.apiURL + "/members/" + member_id, data, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            });
        }

    };

});
