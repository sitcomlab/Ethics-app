var app = angular.module("ethics-app");


// University details controller
app.controller("universityDetailsController", function($scope, $rootScope, $routeParams, $translate, $location, config, $window, $authenticationService, $memberService, $userService, $universityService, $instituteService) {

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
            case 'institutes': {
                $scope.$parent.loading = { status: true, message: "Loading related institutes" };

                // Load related institutes
                $instituteService.listByUniversity($scope.university.university_id, $scope.filter)
                .then(function onSuccess(response) {
                    $scope.university.institutes = response.data;
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
                $memberService.listByInstitute($scope.university.university_id, $scope.filter)
                .then(function onSuccess(response) {
                    $scope.university.members = response.data;
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
                $userService.listByInstitute($scope.university.university_id, $scope.filter)
                .then(function onSuccess(response) {
                    $scope.university.users = response.data;
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
    $scope.$parent.loading = { status: true, message: "Loading university" };

    // Filter
    $scope.filter = {
        tab: 'institutes',
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
