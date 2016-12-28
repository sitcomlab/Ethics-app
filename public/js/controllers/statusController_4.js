var app = angular.module("ethics-app");


// Document status 4 controller
app.controller("statusController_4", function($scope, $rootScope, $routeParams, $translate, $location, config, $window, $documentService) {


    // Init
    if($documentService.get()){
        $scope.document = $documentService.get();
        $scope.updated_document = $documentService.copy();
    } else {
        // Redirect
        $location.url("/");
    }


});
