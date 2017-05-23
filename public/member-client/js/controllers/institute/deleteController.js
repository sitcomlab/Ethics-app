var app = angular.module("ethics-app");


// Institute delete controller
app.controller("instituteDeleteController", function($scope, $rootScope, $routeParams, $filter, $translate, $location, config, $window, $authenticationService, $instituteService) {

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
        $scope.$parent.loading = { status: true, message: $filter('translate')('DELETING_INSTITUTE') };

        // Delete institute
        $instituteService.remove($scope.institute.institute_id)
        .then(function onSuccess(response) {
            $scope.redirect("/institutes");
        })
        .catch(function onError(response) {
            $window.alert(response.data);
        });
    };

    /*************************************************
        INIT
     *************************************************/
    $scope.$parent.loading = { status: true, message: $filter('translate')('LOADING_INSTITUTE') };
    $scope.input = "";

    // Load institute
    $instituteService.retrieve($routeParams.institute_id)
    .then(function onSuccess(response) {
        $scope.institute = response.data;
        $scope.$parent.loading = { status: false, message: "" };
    })
    .catch(function onError(response) {
        $window.alert(response.data);
    });

});
