var app = angular.module("ethics-app");


// Document status 2 controller
app.controller("statusController_2", function($scope, $rootScope, $routeParams, $translate, $location, config, $window, $documentService, $fileService) {


    // Init
    if($documentService.get()){

        // Show loading screen
        $scope.page = 0;

        // Check if files have been already generated
        if($fileService.get()){
            // Redirect
            $scope.page = 1;
            $scope.files = $fileService.get();
        } else {
            // Generate documents
            $documentService.generateFiles($documentService.getId())
            .success(function(response) {
                $fileService.set(response);
                $scope.files = $fileService.get();
                // Redirect
                $scope.page = 1;
            })
            .error(function(response) {
                $window.alert(response);
            });
        }

    } else {
        // Redirect
        $location.url("/");
    }


});
