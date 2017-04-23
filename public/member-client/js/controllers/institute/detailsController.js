var app = angular.module("ethics-app");


// University details controller
app.controller("instituteDetailsController", function($scope, $rootScope, $routeParams, $translate, $location, config, $window, $authenticationService, $instituteService, $workingGroupService) {

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
    $scope.$parent.loading = { status: true, message: "Loading institute" };

    // Load institute
    $instituteService.retrieve($routeParams.institute_id)
    .then(function onSuccess(response) {
        $scope.institute = response.data;

        /* TODO: Note(nicho): Currently not working, implementation is in progress
        $scope.$parent.loading = { status: true, message: "Loading related working groups" };

        // Load working groups
        $workingGroupService.list()
        .then(function onSuccess(response) {
            $workingGroupService.set(response.data);

            // Filter by institute
            $workingGroupService.set($workingGroupService.getByInstitute($scope.institute.institute_id));

            // Current working groups
            $scope.institute.current_working_groups = $workingGroupService.getByStatus(false);

            // Former working groups
            $scope.institute.former_working_groups = $workingGroupService.getByStatus(true);

            $scope.$parent.loading = { status: false, message: "" };
        })
        .catch(function onError(response) {
            $window.alert(response.data);
        });*/
        $scope.$parent.loading = { status: false, message: "" };
    })
    .catch(function onError(response) {
        $window.alert(response.data);
    });


});
