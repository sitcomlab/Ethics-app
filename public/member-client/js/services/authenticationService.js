var app = angular.module("authenticationService", []);


// User service
app.factory('$authenticationService', function($http, $log, config) {

    var authenticated_member;

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
            if(authenticated_member === undefined){
                return undefined;
            } else {
                return authenticated_member.user_id;
            }
        },
        getToken: function(){
            if(authenticated_member === undefined){
                return undefined;
            } else {
                return authenticated_member.token;
            }
        },
        set: function(data){
            authenticated_member = data;
        },
        copy: function(){
            return {
                member_id: authenticated_member.user_id,
                title: authenticated_member.title,
                first_name: authenticated_member.first_name,
                last_name: authenticated_member.last_name,
                email_address: authenticated_member.email_address,
                university_id: authenticated_member.university_id,
                institute_id: authenticated_member.institute_id,
                research_group_id: authenticated_member.research_group_id
            };
        },
        isAuthenticated: function(){
            if(authenticated_member !== undefined){
                return true;
            } else {
                return false;
            }
        },
        login: function(data){
            return $http.post(config.apiURL + "/login", data);
        }

    };

});
