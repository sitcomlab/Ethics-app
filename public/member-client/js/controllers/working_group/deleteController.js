var app = angular.module("ethics-app");


// Working group delete controller
app.controller("workingGroupDeleteController", function($scope, $rootScope, $routeParams, $filter, $translate, $location, config, $window, $authenticationService, $workingGroupService) {

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
        $scope.$parent.loading = { status: true, message: "Deleting working group" };

        // Delete working group
        $workingGroupService.remove($scope.working_group.working_group_id)
        .then(function onSuccess(response) {
            // Redirect
            $scope.redirect("/working_groups");
        })
        .catch(function onError(response) {
            $window.alert(response.data);
        });
    };

    /*************************************************
        INIT
     *************************************************/
    $scope.$parent.loading = { status: true, message: "Loading working group" };
    $scope.input = "";

    // Load university
    $workingGroupService.retrieve($routeParams.working_group_id)
    .then(function onSuccess(response) {
        $scope.working_group = response.data;
        $scope.$parent.loading = { status: false, message: "" };
    })
    .catch(function onError(response) {
        $window.alert(response.data);
    });

});
