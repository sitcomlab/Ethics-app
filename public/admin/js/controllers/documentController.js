var app = angular.module("ethics-app");

// Document controller
app.controller("documentController", function($scope, $rootScope, $translate, $location, config, $window, $authenticationService, $documentService) {

    /**
     * [load description]
     * @return {[type]} [description]
     */
    $scope.load = function(){
        $scope.document = $documentService.get();

        // Redirect
        $scope.tab = 1;
    };

    // Init
    $scope.tab = 0;
    $scope.load();
    
});
