var app = angular.module("ethics-app");


// Course list controller
app.controller("courseListController", function($scope, $rootScope, $translate, $location, config, $window, $authenticationService, $courseService, _) {

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
    $scope.$parent.loading = { status: true, message: "Loading courses" };

    // Load courses
    $courseService.list()
    .then(function onSuccess(response) {
        $courseService.set(response.data);
        $scope.courses = $courseService.get();

        $scope.$parent.loading = { status: false, message: "" };
    })
    .catch(function onError(response) {
        $window.alert(response.data);
    });


});
