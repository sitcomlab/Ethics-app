var app = angular.module("ethics-app");


// Course delete controller
app.controller("workingGroupDeleteController", function($scope, $rootScope, $routeParams, $translate, $location, config, $window, $authenticationService, $workingGroupService) {

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
        $scope.$parent.loading = { status: true, message: "Deleting Working Group" };

        // Delete workingGroup
        $workingGroupService.remove($scope.working_groups.working_group_id)
        .then(function onSuccess(response) {
            $scope.redirect("/working_groups");
        })
        .catch(function onError(response) {
            $window.alert(response.data);
        });
    };

    /*************************************************
        INIT
     *************************************************/
    $scope.$parent.loading = { status: true, message: "Loading Working Group" };
    $scope.input = "";

    // Load university
    $workingGroupService.retrieve($routeParams.working_group_id)
    .then(function onSuccess(response) {
        $scope.working_groups = response.data;
        $scope.$parent.loading = { status: false, message: "" };
    })
    .catch(function onError(response) {
        $window.alert(response.data);
    });

});
