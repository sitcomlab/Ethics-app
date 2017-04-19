var app = angular.module("ethics-app");


// Working group list controller
app.controller("workingGroupListController", function($scope, $rootScope, $translate, $location, config, $window, $authenticationService, $workingGroupService, _) {

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
    $scope.$parent.loading = { status: true, message: "Loading working groups" };

    // Load working groups
    $workingGroupService.list()
    .then(function onSuccess(response) {
        $workingGroupService.set(response.data);

        // Current working groups
        $scope.current_working_groups = $workingGroupService.getByStatus(false);

        // Former working groups
        $scope.former_working_groups = $workingGroupService.getByStatus(true);

        $scope.$parent.loading = { status: false, message: "" };
    })
    .catch(function onError(response) {
        $window.alert(response.data);
    });


});
