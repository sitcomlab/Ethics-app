var app = angular.module("fileService", []);


// File service
app.factory('$fileService', function($http, $log, config) {

    var files;

    return {
        get: function(){
            return files;
        },
        set: function(data){
            files = data;
        }
    };

});
