var app = angular.module("ethics-app");

// User add controller
app.controller("userCreateController", function($scope, $rootScope, $translate, $location, config, $window, $userService) {

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
    $scope.createUser = function(){
        // TODO: Check input
        /*if($scope.userCreateForm.$invalid) {
            // Update UI
            $scope.userCreateForm.new_user_title.$pristine = false;
            $scope.userCreateForm.new_user_first_name.$pristine = false;
            $scope.userCreateForm.new_user_last_name.$pristine = false;
        } else {*/
            $userService.create($scope.new_user)
            .success(function(response) {
                $userService.set(response);

                // Redirect
                $location.url("/users/" + $userService.getId());
            })
            .error(function(response) {
                $window.alert(response);
            });
        // }
    };

});
