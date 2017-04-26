var app = angular.module("ethics-app");


// Course delete controller
app.controller("universityDeleteController", function($scope, $rootScope, $routeParams, $filter, $translate, $location, config, $window, $authenticationService, $universityService) {

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
     * [delete description]
     * @return {[type]} [description]
     */
    $scope.delete = function(){
        $scope.$parent.loading = { status: true, message: "Deleting university" };

        // Delete university
        $universityService.remove($scope.university.university_id)
        .then(function onSuccess(response) {
            $scope.redirect("/universities");
        })
        .catch(function onError(response) {
            $window.alert(response.data);
        });
    };

    /*************************************************
        INIT
     *************************************************/
    $scope.$parent.loading = { status: true, message: "Loading university" };
    $scope.input = "";

    // Load university
    $universityService.retrieve($routeParams.university_id)
    .then(function onSuccess(response) {
        $scope.university = response.data;
        $scope.$parent.loading = { status: false, message: "" };
    })
    .catch(function onError(response) {
        $window.alert(response.data);
    });

});
