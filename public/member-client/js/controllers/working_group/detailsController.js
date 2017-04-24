var app = angular.module("ethics-app");


// Working group details controller
app.controller("workingGroupDetailsController", function($scope, $rootScope, $routeParams, $translate, $location, config, $window, $authenticationService, $memberService, $workingGroupService) {

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
     * [description]
     * @param  {[type]} related_data [description]
     * @param  {[type]} status       [description]
     * @return {[type]}              [description]
     */
    $scope.changeTab = function(related_data, status){
        $scope.filter = {
            tab: related_data,
            former: status,
            blocked: status
        };
        $scope.load(related_data);
    };

    /**
     * [description]
     * @param  {[type]} related_data [description]
     * @return {[type]}              [description]
     */
    $scope.load = function(related_data){

        // Check which kind of related data needs to be requested
        switch (related_data) {
            case 'members': {
                $scope.$parent.loading = { status: true, message: "Loading related members" };

                // Load related members
                $memberService.listByWorkingGroup($scope.working_group.working_group_id, $scope.filter)
                .then(function onSuccess(response) {
                    $scope.working_group.members = response.data;
                    $scope.$parent.loading = { status: false, message: "" };
                })
                .catch(function onError(response) {
                    $window.alert(response.data);
                });
                break;
            }
        }
    };


    /*************************************************
        INIT
     *************************************************/
    $scope.$parent.loading = { status: true, message: "Loading working group" };

    // Filter
    $scope.filter = {
        tab: 'members',
        former: false,
        blocked: false
    };

    // Load working group
    $workingGroupService.retrieve($routeParams.working_group_id)
    .then(function onSuccess(response) {
        $scope.working_group = response.data;

        // Load related members
        $scope.load('members');
    })
    .catch(function onError(response) {
        $window.alert(response.data);
    });

});
