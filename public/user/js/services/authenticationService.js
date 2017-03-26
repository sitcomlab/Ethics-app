var app = angular.module("authenticationService", []);


// User service
app.factory('$authenticationService', function($http, $log, config) {

    var authenticated_user;

    return {
        init: function(){
            return {
                document_id: "5a311230-d9a7-11e6-84c3-edb4774b1ab7" // TEST
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
                email_address: authenticated_user.email_address
            };
        },
        authenticated: function(){
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
