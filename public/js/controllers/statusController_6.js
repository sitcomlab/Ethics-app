var app = angular.module("ethics-app");


// Document status 6 controller
app.controller("statusController_6", function($scope, $rootScope, $routeParams, $translate, $location, config, $window, $documentService) {


    // Init
    if($documentService.get()){
        $scope.document = $documentService.get();
        $scope.updated_document = $documentService.copy();
    } else {
        // Redirect
        $location.url("/");
    }


});
