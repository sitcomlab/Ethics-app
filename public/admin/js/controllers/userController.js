var app = angular.module("ethics-app");

// User controller
app.controller("userController", function($scope, $rootScope, $translate, $location, config, $window, $userService) {

    /**
     * [load description]
     * @return {[type]} [description]
     */
    $scope.load = function(){
        $scope.user = $userService.get();

        // Redirect
        $scope.tab = 1;
    };

    // Init
    $scope.tab = 0;
    $scope.load();

});
