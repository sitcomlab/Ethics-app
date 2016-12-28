var app = angular.module("ethics-app");


// Document controller
app.controller("documentController", function($scope, $rootScope, $routeParams, $translate, $location, config, $window, $documentService, $userService) {


    // Init
    $documentService.retrieve($routeParams.document_id)
    .success(function(response) {
        $documentService.set(response);
        $scope.document = $documentService.get();

        // Load user
        $userService.retrieve($scope.document.user_id)
        .success(function(response) {
            $userService.set(response);
            $scope.user = $userService.get();

            // Update navbar
            $rootScope.$broadcast('updateNavbar');

            // Redirect
            $location.url("/documents/" + $scope.document.document_id + "/status/" + $scope.document.status);
        })
        .error(function(response) {
            console.log(response);
        });

    })
    .error(function(response) {
        // Show dialog
        $window.alert(response);
        // Redirect
        $location.url("/");
    });


});
