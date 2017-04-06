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

    /*************************************************
        INIT
     *************************************************/
    $scope.$parent.loading = { status: true, message: "Loading document" };
    $scope.document = $documentService.get();
    $scope.latest_revision = $documentService.getLatestRevision();
    $scope.files = $fileService.get();
    $scope.$parent.loading = { status: false, message: "" };

});
