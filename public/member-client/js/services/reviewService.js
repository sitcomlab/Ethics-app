var app = angular.module("reviewService", []);


// Review service
app.factory('$reviewService', function($http, $log, config) {

    var review;

    return {
        get: function() {
            return review;
        },
        set: function(data){
            review = data;
        }
    };

});
