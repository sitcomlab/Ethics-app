var app = angular.module("ethics-app");


// University list controller
app.controller("universityListController", function($scope, $rootScope, $translate, $location, config, $window, $authenticationService, $universityService, _) {

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
    $scope.$parent.loading = { status: true, message: "Loading universities" };

    // Load universities
    $universityService.list()
    .then(function onSuccess(response) {
        $universityService.set(response.data);
        $scope.universities = $universityService.get();
        $scope.$parent.loading = { status: false, message: "" };
    })
    .catch(function onError(response) {
        $window.alert(response.data);
    });


});
