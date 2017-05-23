var app = angular.module("ethics-app");


// User delete controller
app.controller("userDeleteController", function($scope, $rootScope, $routeParams, $filter, $translate, $location, config, $window, $authenticationService, $userService) {

    /*************************************************
        FUNCTIONS
     *************************************************/

    /**
     * [redirect description]
     * @param  {[type]} path [description]
     * @return {[type]}      [description]
     */
    $scope.redirect = function(path){
        $location.url(path);
    };

    /**
     * [description]
     * @return {[type]} [description]
     */
    $scope.delete = function(){
        $scope.$parent.loading = { status: true, message: $filter('translate')('DELETING_USER') };

        // Delete user
        $userService.remove($scope.user.user_id)
        .then(function onSuccess(response) {
            $scope.redirect("/users");
        })
        .catch(function onError(response) {
            $window.alert(response.data);
        });
    };

    /*************************************************
        INIT
     *************************************************/
    $scope.$parent.loading = { status: true, message: $filter('translate')('LOADING_USER') };
    $scope.input = "";

    // Load user
    $userService.retrieve($routeParams.user_id)
    .then(function onSuccess(response) {
        $scope.user = response.data;

        // Create full name
        if($scope.user.title !== null){
            $scope.user.fullname = $scope.user.title + " " + $scope.user.first_name + " " + $scope.user.last_name;
        } else {
            $scope.user.fullname = $scope.user.first_name + " " + $scope.user.last_name;
        }

        $scope.$parent.loading = { status: false, message: "" };
    })
    .catch(function onError(response) {
        $window.alert(response.data);
    });
});
