var app = angular.module("ethics-app");


// Document status 7 controller
app.controller("statusController_7", function($scope, $rootScope, $routeParams, $translate, $location, config, $window, $documentService) {


    // Init
    if($documentService.get()){
        $scope.document = $documentService.get();
    } else {
        // Redirect
        $location.url("/");
    }

    /**
     * [logout description]
     * @return {[type]} [description]
     */
    $scope.logout = function(){
        // Redirect
        $location.url("/");
    };

});
