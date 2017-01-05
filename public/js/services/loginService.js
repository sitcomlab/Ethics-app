var app = angular.module("loginService", []);


// Login service
app.factory('$loginService', function($http, $log, config) {

    return {
        init: function(){
            return {
                document_id: "52739db0-d2ae-11e6-a692-e5cf38195f04" // TEST
            };
        }

    };

});
