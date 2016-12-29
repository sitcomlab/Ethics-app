var app = angular.module("ethics-app");


// User controller
app.controller("userController", function($scope, $rootScope, $routeParams, $translate, $location, config, $window, $userService) {


    // Init
    if($userService.get()){
        $scope.user = $userService.get();
        $scope.updated_user = $userService.copy();
    } else {
        // Redirect
        $location.url("/");
    }


    /**
     * [cancel description]
     * @return {[type]} [description]
     */
    $scope.cancel = function(){
        $scope.updated_user = $userService.copy();
        // Redirect
        $location.url("/documents/" + $routeParams.document_id);
    };


    /**
     * [saveDocument description]
     * @return {[type]} [description]
     */
    $scope.saveUser = function(){
        $userService.edit($userService.getId(), $scope.updated_user)
        .success(function(response) {
            $userService.set(response);
            $scope.user = $userService.get();
            $scope.updated_user = $userService.copy();

            // Update navbar
            $rootScope.$broadcast('updateNavbar');

            // Redirect
            $location.url("/documents/" + $routeParams.document_id);
        })
        .error(function(response) {
            console.log(response);
        });
    };


});
