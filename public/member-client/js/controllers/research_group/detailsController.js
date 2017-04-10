var app = angular.module("ethics-app");


// Reseach group details controller
app.controller("researchGroupDetailsController", function($scope, $rootScope, $routeParams, $translate, $location, config, $window, $authenticationService, $researchGroupService) {

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
    $scope.$parent.loading = { status: true, message: "Loading research group" };

    // Load research group
    $researchGroupService.retrieve($routeParams.research_group_id)
    .then(function onSuccess(response) {
        $scope.research_group = response.data;
        $scope.$parent.loading = { status: false, message: "" };
    })
    .catch(function onError(response) {
        $window.alert(response.data);
    });


});
