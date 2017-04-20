var app = angular.module("ethics-app");


// Member delete controller
app.controller("memberDeleteController", function($scope, $rootScope, $routeParams, $translate, $location, config, $window, $authenticationService, $memberService) {

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
    

});
