var app = angular.module("ethics-app");

// Documents controller
app.controller("documentsController", function($scope, $rootScope, $translate, $location, config, $window, $authenticationService, $documentsService) {

    // Init
    $scope.load = function(){
        // Loading screen
        $scope.tab = 0;

        // Check authentication
        if($authenticationService.authenticated()){
            $documentsService.list()
            .success(function(response) {
                $documentsService.set(response);
                $scope.documents = $documentsService.get();

                // Redirect
                $scope.tab = 1;
            })
            .error(function(response) {
                $window.alert(response);
            });
        } else {
            // Redirect
            $location.url("/");
        }
    };

    // Init
    $scope.load();

});
