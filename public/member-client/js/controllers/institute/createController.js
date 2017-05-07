var app = angular.module("ethics-app");


// Institute create controller
app.controller("instituteCreateController", function($scope, $rootScope, $routeParams, $filter, $translate, $location, config, $window, $timeout, $authenticationService, $instituteService, $universityService) {

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
    $scope.send = function(){
        // Validate input
        if($scope.createInstituteForm.$invalid) {
            // Update UI
            $scope.createInstituteForm.institute_name.$pristine = false;
            $scope.createInstituteForm.university_id.$pristine = false;
        } else {
            $scope.$parent.loading = { status: true, message: "Creating new institute" };

            // Create new Institute
            $instituteService.create($scope.new_institute)
            .then(function onSuccess(response) {
                var institute = response.data;

                // Redirect
                $scope.redirect("/institutes/" + institute.institute_id);
            })
            .catch(function onError(response) {
                $window.alert(response);
            });
        }
    };


    /**
     * [description]
     * @param  {[type]} related_data [description]
     * @return {[type]}              [description]
     */
    $scope.load = function(related_data){
        // Check which kind of related data needs to be requested
        switch (related_data) {
            case 'universities': {
                $scope.$parent.loading = { status: true, message: "Loading universities" };

                // Load universities
                $universityService.list({
                    orderby: 'name.asc',
                    limit: null,
                    offset: null
                })
                .then(function onSuccess(response) {
                    $scope.universities = response.data;
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
    $scope.new_institute = $instituteService.init();
    $scope.authenticated_member = $authenticationService.get();

    // Load universities
    $scope.load('universities');

    // Set default value by member
    $scope.new_institute.university_id = $scope.authenticated_member.university_id;

});
