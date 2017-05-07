var app = angular.module("authenticationService", []);


// User service
app.factory('$authenticationService', function($http, $log, config) {

    var authenticated_user;

    return {
        init: function(){
            return {
                document_id: "1dd60ea6-5717-4c1d-8182-44c558617a3d",
            };
        },
        get: function(){
            return authenticated_user;
        },
        getId: function(){
            if(authenticated_user === undefined){
                return undefined;
            } else {
                return authenticated_user.user_id;
            }
        },
        getToken: function(){
            if(authenticated_user === undefined){
                return undefined;
            } else {
                return authenticated_user.token;
            }
        },
        getEmailAddress: function(){
            if(authenticated_user === undefined){
                return undefined;
            } else if(authenticated_user.email_address === undefined){
                return undefined;
            } else {
                return authenticated_user.email_address;
            }
        },
        set: function(data){
            authenticated_user = data;
        },
        copy: function(){
            return {
                user_id: authenticated_user.user_id,
                title: authenticated_user.title,
                first_name: authenticated_user.first_name,
                last_name: authenticated_user.last_name,
                email_address: authenticated_user.email_address,
                university_id: authenticated_user.university_id,
                institute_id: authenticated_user.institute_id
            };
        },
        isAuthenticated: function(){
            if(authenticated_user !== undefined){
                return true;
            } else {
                return false;
            }
        },
        loginByDocumentId: function(document_id){
            return $http.get(config.apiURL + "/login/" + document_id);
        }

    };

});
