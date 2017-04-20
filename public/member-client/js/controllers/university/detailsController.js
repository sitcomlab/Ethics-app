var app = angular.module("ethics-app");


// University details controller
app.controller("universityDetailsController", function($scope, $rootScope, $routeParams, $translate, $location, config, $window, $authenticationService, $universityService, $instituteService) {

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
    $scope.$parent.loading = { status: true, message: "Loading university" };

    // Load university
    $universityService.retrieve($routeParams.university_id)
    .then(function onSuccess(response) {
        $scope.university = response.data;

        $scope.$parent.loading = { status: true, message: "Loading related institutes" };

        // Load institutes
        $instituteService.list()
        .then(function onSuccess(response) {
            $instituteService.set(response.data);

            // Filter by university
            $instituteService.set($instituteService.getByUniversity($scope.university.university_id));

            // Current institutes
            $scope.university.current_institutes = $instituteService.getByStatus(false);

            // Former institutes
            $scope.university.former_institutes = $instituteService.getByStatus(true);

            $scope.$parent.loading = { status: false, message: "" };
        })
        .catch(function onError(response) {
            $window.alert(response.data);
        });
        $scope.$parent.loading = { status: false, message: "" };
    })
    .catch(function onError(response) {
        $window.alert(response.data);
    });


});
