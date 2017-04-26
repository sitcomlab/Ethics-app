var app = angular.module("ethics-app");


// Institute details controller
app.controller("instituteDetailsController", function($scope, $rootScope, $routeParams, $filter, $translate, $location, config, $window, $authenticationService, $memberService, $userService, $instituteService, $workingGroupService, $courseService) {

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
            case 'working_groups': {
                $scope.$parent.loading = { status: true, message: "Loading related working groups" };

                // Load related working groups
                $workingGroupService.listByInstitute($scope.institute.institute_id, $scope.filter)
                .then(function onSuccess(response) {
                    $scope.institute.working_groups = response.data;
                    $scope.$parent.loading = { status: false, message: "" };
                })
                .catch(function onError(response) {
                    $window.alert(response.data);
                });
                break;
            }
            case 'members': {
                $scope.$parent.loading = { status: true, message: "Loading related members" };

                // Load related members
                $memberService.listByInstitute($scope.institute.institute_id, $scope.filter)
                .then(function onSuccess(response) {
                    $scope.institute.members = response.data;
                    $scope.$parent.loading = { status: false, message: "" };
                })
                .catch(function onError(response) {
                    $window.alert(response.data);
                });
                break;
            }
            case 'users': {
                $scope.$parent.loading = { status: true, message: "Loading related users" };

                // Load related users
                $userService.listByInstitute($scope.institute.institute_id, $scope.filter)
                .then(function onSuccess(response) {
                    $scope.institute.users = response.data;
                    $scope.$parent.loading = { status: false, message: "" };
                })
                .catch(function onError(response) {
                    $window.alert(response.data);
                });
                break;
            }
            case 'courses': {
                $scope.$parent.loading = { status: true, message: "Loading related courses" };

                // Load related courses
                $courseService.listByInstitute($scope.institute.institute_id, $scope.filter)
                .then(function onSuccess(response) {
                    $scope.institute.courses = response.data;
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
    $scope.$parent.loading = { status: true, message: "Loading institute" };

    // Filter
    $scope.filter = {
        tab: 'working_groups',
        former: false,
        blocked: false,
        offset: null,
        limit: null
    };

    // Load institute
    $instituteService.retrieve($routeParams.institute_id)
    .then(function onSuccess(response) {
        $scope.institute = response.data;

        // Load related working groups
        $scope.load('working_groups');
    })
    .catch(function onError(response) {
        $window.alert(response.data);
    });

});
