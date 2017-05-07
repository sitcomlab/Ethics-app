var app = angular.module("ethics-app");


// Manual controller
app.controller("manualController", function($scope, $rootScope, $filter, $translate, $location, config, $window, $authenticationService) {

    /*************************************************
        FUNCTIONS
     *************************************************/

    /**
     * [redirect description]
     * @param  {[type]} path [description]
     * @return {[type]}      [description]
     */
    $scope.redirect = function(path){
        $location.url(path);
    };


    /*************************************************
        INIT
     *************************************************/
    $scope.$parent.loading = { status: false, message: "" };

});
