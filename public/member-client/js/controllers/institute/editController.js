var app = angular.module("ethics-app");


// Institute edit controller
app.controller("instituteEditController", function($scope, $rootScope, $routeParams, $filter, $translate, $location, config, $window, $authenticationService, $universityService, $instituteService) {

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
    $scope.save = function(){
        // Validate input
        if($scope.editInstituteForm.$invalid) {
            // Update UI
            $scope.editInstituteForm.institute_name.$pristine = false;
        } else {
            $scope.$parent.loading = { status: true, message: $filter('translate')('SAVING_INSTITUTE') };

            // Updating Institute
            $instituteService.edit($routeParams.institute_id, $scope.updated_institute)
            .then(function onSuccess(response) {
                // Redirect
                $scope.redirect("/institutes/" + $routeParams.institute_id);
            })
            .catch(function onError(response) {
                $window.alert(response.data);
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
                $scope.$parent.loading = { status: true, message: $filter('translate')('LOADING_UNIVERSITIES') };

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
    $scope.$parent.loading = { status: true, message: $filter('translate')('LOADING_INSTITUTE') };

    // Load Institute
    $instituteService.retrieve($routeParams.institute_id)
    .then(function onSuccess(response) {
        $scope.institute = response.data;
        $scope.updated_institute = $instituteService.copy($scope.institute);

        // Load universities
        $scope.load('universities');

    })
    .catch(function onError(response) {
        $window.alert(response.data);
    });

});
