var app = angular.module("ethics-app");

// User delete controller
app.controller("userDeleteController", function($scope, $rootScope, $translate, $location, config, $window, $userService) {

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
    $scope.input = "";
    $scope.load();


    /**
     * [close description]
     * @return {[type]} [description]
     */
    $scope.cancel = function(){
        // Redirect
        $location.url("/users/" + $userService.getId());
    };


    /**
     * [deleteUser description]
     * @return {[type]} [description]
     */
    $scope.deleteUser = function(){
        $userService.delete($userService.getId())
        .success(function(response) {
            // Reset
            $userService.set();

            // Update users
            $usersService.list()
            .success(function(response) {
                $usersService.set(response);

                // Redirect
                $location.url("/users");
            })
            .error(function(response) {
                $window.alert(response);
            });

        })
        .error(function(response) {
            console.log(response);
        });
    };


});
