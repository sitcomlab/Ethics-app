var app = angular.module("ethics-app");


// University details controller
app.controller("universityDetailsController", function($scope, $rootScope, $routeParams, $filter, $translate, $location, config, $window, $authenticationService, $memberService, $userService, $universityService, $instituteService) {

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
            case 'institutes': {
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
            case 'institutes': {
                $scope.$parent.loading = { status: true, message: $filter('translate')('LOADING_RELATED_INSTITUTES') };

                // Load related institutes
                $instituteService.listByUniversity($scope.university.university_id, $scope.filter)
                .then(function onSuccess(response) {
                    $scope.university.institutes = response.data;

                    // Prepare pagination
                    if($scope.university.institutes.length > 0){
                        // Set count
                        $scope.full_count = $scope.university.institutes[0].full_count;
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
                $scope.$parent.loading = { status: true, message: $filter('translate')('LOADING_RELATED_MEMBERS') };

                // Load related members
                $memberService.listByInstitute($scope.university.university_id, $scope.filter)
                .then(function onSuccess(response) {
                    $scope.university.members = response.data;

                    // Prepare pagination
                    if($scope.university.members.length > 0){
                        // Set count
                        $scope.full_count = $scope.university.members[0].full_count;
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
                $scope.$parent.loading = { status: true, message: $filter('translate')('LOADING_RELATED_USERS') };

                // Load related users
                $userService.listByInstitute($scope.university.university_id, $scope.filter)
                .then(function onSuccess(response) {
                    $scope.university.users = response.data;

                    // Prepare pagination
                    if($scope.university.users.length > 0){
                        // Set count
                        $scope.full_count = $scope.university.users[0].full_count;
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
    $scope.$parent.loading = { status: true, message: $filter('translate')('LOADING_UNIVERSITY') };

    // Filter
    $scope.filter = {
        tab: 'institutes',
        offset: 0,
        limit: 50,
        orderby: 'name.asc',
        former: false,
        blocked: false
    };

    // Load university
    $universityService.retrieve($routeParams.university_id)
    .then(function onSuccess(response) {
        $scope.university = response.data;

        // Load related institutes
        $scope.load('institutes');
    })
    .catch(function onError(response) {
        $window.alert(response.data);
    });


});
