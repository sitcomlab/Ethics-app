var app = angular.module("ethics-app");


// Working group edit controller
app.controller("workingGroupEditController", function($scope, $rootScope, $routeParams, $filter, $translate, $location, config, $window, $authenticationService, $workingGroupService) {

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
     * [send description]
     * @return {[type]} [description]
     */
    $scope.save = function(){
        // Validate input
        if($scope.editWorkingGroupForm.$invalid) {
            // Update UI
            $scope.editWorkingGroupForm.working_group_name.$pristine = false;
        } else {
            $scope.$parent.loading = { status: true, message: "Saving working group" };

            // Updating working group
            $workingGroupService.edit($routeParams.working_group_id, $scope.updated_working_group)
            .then(function onSuccess(response) {
                // Redirect
                $scope.redirect("/working_groups/" + $routeParams.working_group_id);
            })
            .catch(function onError(response) {
                $window.alert(response.data);
            });
        }
    };

    /*************************************************
        INIT
     *************************************************/
    $scope.$parent.loading = { status: true, message: "Loading working group" };

    // Load working group
    $workingGroupService.retrieve($routeParams.working_group_id)
    .then(function onSuccess(response) {
        $scope.working_group = response.data;
        $scope.updated_working_group = $workingGroupService.copy($scope.working_group);
        $scope.$parent.loading = { status: false, message: "" };
    })
    .catch(function onError(response) {
        $window.alert(response.data);
    });

});
