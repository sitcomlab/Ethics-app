var app = angular.module("ethics-app");


// User list controller
app.controller("userListController", function($scope, $rootScope, $translate, $location, config, $window, $authenticationService, $userService, _) {

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


    /*************************************************
        INIT
     *************************************************/
    $scope.$parent.loading = { status: true, message: "Loading users" };

    // Load users
    $userService.list()
    .then(function onSuccess(response) {
        $userService.set(response.data);
        $scope.users = $userService.get();
        $scope.$parent.loading = { status: false, message: "" };
    })
    .catch(function onError(response) {
        $window.alert(response.data);
    });


});
