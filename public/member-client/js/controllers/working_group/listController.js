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
    $scope.$parent.loading = { status: true, message: "Loading research groups" };

    // Load research groups
    $workingGroupService.list()
    .then(function onSuccess(response) {
        $workingGroupService.set(response.data);
        $scope.working_groups = $workingGroupService.get();
        $scope.$parent.loading = { status: false, message: "" };
    })
    .catch(function onError(response) {
        $window.alert(response.data);
    });


});
