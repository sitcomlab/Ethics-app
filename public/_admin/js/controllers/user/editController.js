var app = angular.module("ethics-app");

// User edit controller
app.controller("userEditController", function($scope, $rootScope, $translate, $location, config, $window, $userService, $usersService) {

    /**
     * [load description]
     * @return {[type]} [description]
     */
    $scope.load = function(){
        $scope.updated_user = $userService.copy();

        // Redirect
        $scope.tab = 1;
    };

    // Init
    $scope.tab = 0;
    $scope.load();


    /**
     * [cancel description]
     * @return {[type]} [description]
     */
    $scope.cancel = function(){
        // Redirect
        $location.url("/users");
    };


    /**
     * [createUser description]
     * @return {[type]} [description]
     */
    $scope.saveUser = function(){
        // TODO: Check input
        /*if($scope.userCreateForm.$invalid) {
            // Update UI
            $scope.userCreateForm.new_user_title.$pristine = false;
            $scope.userCreateForm.new_user_first_name.$pristine = false;
            $scope.userCreateForm.new_user_last_name.$pristine = false;
        } else {*/
            $userService.edit($userService.getId(), $scope.updated_user)
            .success(function(response) {
                $userService.set(response);

                // Update users
                $usersService.list()
                .success(function(response) {
                    $usersService.set(response);

                    // Redirect
                    $location.url("/users/" + $userService.getId());
                })
                .error(function(response) {
                    $window.alert(response);
                });
            })
            .error(function(response) {
                $window.alert(response);
            });
        // }
    };

});
