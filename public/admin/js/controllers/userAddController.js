var app = angular.module("ethics-app");

// User add controller
app.controller("userAddController", function($scope, $rootScope, $translate, $location, config, $window, $userService) {

    /**
     * [load description]
     * @return {[type]} [description]
     */
    $scope.load = function(){
        $scope.new_user = $userService.init();

        // Redirect
        $scope.tab = 1;
    };

    // Init
    $scope.tab = 0;
    $scope.load();

});
