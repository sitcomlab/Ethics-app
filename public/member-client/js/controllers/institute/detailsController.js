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
        // Set filter
        $scope.filter = {
            tab: related_data,
            offset: 0,
            limit: 50
        };

        switch (related_data) {
            case 'working_groups': {
                $scope.filter.orderby = 'name.asc';
                $scope.filter.former = status;
                $scope.filter.blocked = status;
                break;
            }
            case 'members': {
                $scope.filter.orderby = 'name.asc';
                $scope.filter.former = status;
                $scope.filter.blocked = status;
                break;
            }
            case 'users': {
                $scope.filter.orderby = 'name.asc';
                $scope.filter.former = status;
                $scope.filter.blocked = status;
                break;
            }
            case 'courses': {
                $scope.filter.orderby = 'year.desc';
                $scope.filter.former = status;
                $scope.filter.blocked = status;
                break;
            }
        }
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

                    // Prepare pagination
                    if($scope.institute.working_groups.length > 0){
                        // Set count
                        $scope.full_count = $scope.institute.working_groups[0].full_count;
                    } else {
                        // Reset count
                        $scope.full_count = 0;

                        // Reset pagination
                        $scope.pages = [];
                        $scope.filter.offset = 0;
                    }

                    // Set pagination
                    $scope.pages = [];
                    for(var i=0; i<Math.ceil($scope.full_count / $scope.filter.limit); i++){
                        $scope.pages.push({
                            offset: i * $scope.filter.limit
                        });
                    }

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

                    // Prepare pagination
                    if($scope.institute.members.length > 0){
                        // Set count
                        $scope.full_count = $scope.institute.members[0].full_count;
                    } else {
                        // Reset count
                        $scope.full_count = 0;

                        // Reset pagination
                        $scope.pages = [];
                        $scope.filter.offset = 0;
                    }

                    // Set pagination
                    $scope.pages = [];
                    for(var i=0; i<Math.ceil($scope.full_count / $scope.filter.limit); i++){
                        $scope.pages.push({
                            offset: i * $scope.filter.limit
                        });
                    }

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

                    // Prepare pagination
                    if($scope.institute.users.length > 0){
                        // Set count
                        $scope.full_count = $scope.institute.users[0].full_count;
                    } else {
                        // Reset count
                        $scope.full_count = 0;

                        // Reset pagination
                        $scope.pages = [];
                        $scope.filter.offset = 0;
                    }

                    // Set pagination
                    $scope.pages = [];
                    for(var i=0; i<Math.ceil($scope.full_count / $scope.filter.limit); i++){
                        $scope.pages.push({
                            offset: i * $scope.filter.limit
                        });
                    }

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

                    // Prepare pagination
                    if($scope.institute.courses.length > 0){
                        // Set count
                        $scope.full_count = $scope.institute.courses[0].full_count;
                    } else {
                        // Reset count
                        $scope.full_count = 0;

                        // Reset pagination
                        $scope.pages = [];
                        $scope.filter.offset = 0;
                    }

                    // Set pagination
                    $scope.pages = [];
                    for(var i=0; i<Math.ceil($scope.full_count / $scope.filter.limit); i++){
                        $scope.pages.push({
                            offset: i * $scope.filter.limit
                        });
                    }

                    $scope.$parent.loading = { status: false, message: "" };
                })
                .catch(function onError(response) {
                    $window.alert(response.data);
                });
                break;
            }
        }

    };

    /**
     * [description]
     * @param  {[type]} offset [description]
     * @return {[type]}        [description]
     */
    $scope.changeOffset = function(offset){
        $scope.filter.offset = offset;
        $scope.load($scope.filter.tab);
    };


    /*************************************************
        INIT
     *************************************************/
    $scope.$parent.loading = { status: true, message: "Loading institute" };

    // Filter
    $scope.filter = {
        tab: 'working_groups',
        offset: 0,
        limit: 50,
        orderby: 'name.asc',
        former: false,
        blocked: false
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
