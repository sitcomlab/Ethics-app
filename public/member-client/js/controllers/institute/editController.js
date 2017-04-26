var app = angular.module("ethics-app");


// Institute edit controller
app.controller("instituteEditController", function($scope, $rootScope, $routeParams, $filter, $translate, $location, config, $window, $authenticationService, $instituteService) {

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
            $scope.$parent.loading = { status: true, message: "Saving institute" };

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

    /*************************************************
        INIT
     *************************************************/
    $scope.$parent.loading = { status: true, message: "Loading institute" };

    // Load Institute
    $instituteService.retrieve($routeParams.institute_id)
    .then(function onSuccess(response) {
        $scope.institute = response.data;
        $scope.updated_institute = $instituteService.copy($scope.institute);
        $scope.$parent.loading = { status: false, message: "" };
    })
    .catch(function onError(response) {
        $window.alert(response.data);
    });

});
