var app = angular.module("ethics-app");


// Document status controller
app.controller("statusController", function($scope, $rootScope, $translate, $location, config, $window, $authenticationService, $documentService, $revisionService, $descriptionService, $concernService, $fileService) {


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

    /**
     * [showReview description]
     * @return {[type]} [description]
     */
    $scope.showReview = function(){
        $scope.redirect("/documents/" + $documentService.getId() + "/review");
    };

    /**
     * [editDocument description]
     * @return {[type]} [description]
     */
    $scope.editDocument = function(){
        $scope.redirect("/documents/" + $documentService.getId() + "/edit");
    };

    /**
     * [logout description]
     * @return {[type]} [description]
     */
    $scope.logout = function(){
        $scope.redirect("/");
    };


    /*************************************************
        INIT
     *************************************************/
    $scope.$parent.loading = { status: true, message: "Loading document" };
    $scope.latest_revision = $documentService.getLatestRevision();
    $scope.files = $fileService.get();
    $scope.$parent.loading = { status: false, message: "" };

});
