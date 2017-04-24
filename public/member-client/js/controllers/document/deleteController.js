var app = angular.module("ethics-app");


// Document delete controller
app.controller("documentDeleteController", function($scope, $rootScope, $routeParams, $translate, $location, config, $window, $q, $timeout, $authenticationService, $documentService) {

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
    $scope.$parent.loading = { status: true, message: "Loading document" };
    $scope.document = $documentService.get();
    $scope.authenticated_member = $authenticationService.get();
    $scope.$parent.loading = { status: false, message: "" };
    
});
