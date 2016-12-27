var app = angular.module("loginService", []);


// Login service
app.factory('$loginService', function($http, $log, config) {

    return {
        init: function(){
            return {
                document_id: ""
            };
        }

    };

});
