var app = angular.module("ethics-app");


// Course delete controller
app.controller("courseDeleteController", function($scope, $rootScope, $routeParams, $filter, $translate, $location, config, $window, $authenticationService, $courseService) {

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
        $scope.$parent.loading = { status: true, message: $filter('translate')('DELETING_COURSE') };

        // Delete course
        $courseService.remove($scope.course.course_id)
        .then(function onSuccess(response) {
            $scope.redirect("/courses");
        })
        .catch(function onError(response) {
            $window.alert(response.data);
        });
    };

    /*************************************************
        INIT
     *************************************************/
    $scope.$parent.loading = { status: true, message: $filter('translate')('LOADING_COURSE') };
    $scope.input = "";

    // Load course
    $courseService.retrieve($routeParams.course_id)
    .then(function onSuccess(response) {
        $scope.course = response.data;
        $scope.$parent.loading = { status: false, message: "" };
    })
    .catch(function onError(response) {
        $window.alert(response.data);
    });

});
