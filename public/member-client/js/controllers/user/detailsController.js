var app = angular.module("ethics-app");


// User details controller
app.controller("userDetailsController", function($scope, $rootScope, $routeParams, $translate, $location, config, $window, $authenticationService, $userService, $documentsService) {

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
    $scope.$parent.loading = { status: true, message: "Loading user" };

    // Load user
    $userService.retrieve($routeParams.user_id)
    .then(function onSuccess(response) {
        $scope.user = response.data;
        $scope.$parent.loading = { status: true, message: "Loading related documents" };

        // Load related documents
        $documentsService.listByUser($routeParams.user_id)
        .then(function onSuccess(response) {
            $scope.user.documents = response.data;
            $scope.$parent.loading = { status: false, message: "" };
        })
        .catch(function onError(response) {
            $window.alert(response.data);
        });
    })
    .catch(function onError(response) {
        $window.alert(response.data);
    });


});
