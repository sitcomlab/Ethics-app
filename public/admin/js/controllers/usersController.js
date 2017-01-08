var app = angular.module("ethics-app");

// Users controller
app.controller("usersController", function($scope, $rootScope, $translate, $location, config, $window, $usersService, $userService) {

    // Init
    $scope.load = function(){
        $usersService.list()
        .success(function(response) {
            $usersService.set(response);
            $scope.users = $usersService.get();

            // Redirect
            $scope.tab = 1;
        })
        .error(function(response) {
            $window.alert(response);
        });
    };

    // Init
    $scope.tab = 0;
    $scope.load();
    $scope.searchText = "";


    /**
     * [resetSearch description]
     */
    $scope.resetSearch = function(){
        $scope.searchText = "";
    };


    /**
     * [showDetails description]
     * @return {[type]} [description]
     */
    $scope.showDetails = function(user){
        $userService.set(user);
        // Redirect
        $location.url("/users/" + $userService.getId());
    };

});
