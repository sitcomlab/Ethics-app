var app = angular.module("ethics-app");


// Course create controller
app.controller("courseCreateController", function($scope, $rootScope, $routeParams, $translate, $location, config, $window, $authenticationService, $courseService, $instituteService) {

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
    $scope.$parent.loading = { status: true, message: "Loading institutes" };
    $scope.course = $courseService.init();
    $scope.authenticated_member = $authenticationService.get();

    // Load institutes
    $instituteService.list()
    .then(function onSuccess(response) {
        $instituteService.set(response.data);
        $scope.institutes = $instituteService.get();
        $scope.course.institute_id = $scope.authenticated_member.institute_id;
        $scope.$parent.loading = { status: false, message: "" };
    })
    .catch(function onError(response) {
        $window.alert(response.data);
    });


});
