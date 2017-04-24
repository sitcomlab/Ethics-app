var app = angular.module("ethics-app");


// University edit controller
app.controller("universityEditController", function($scope, $rootScope, $routeParams, $translate, $location, config, $window, $authenticationService, $universityService) {

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
        if($scope.editUniversityForm.$invalid) {
            // Update UI
            $scope.editUniversityForm.university_name.$pristine = false;
        } else {
            $scope.$parent.loading = { status: true, message: "Saving university" };

            // Updating University
            $universityService.edit($routeParams.university_id, $scope.updated_university)
            .then(function onSuccess(response) {
                // Redirect
                $scope.redirect("/universities/" + $routeParams.university_id);
            })
            .catch(function onError(response) {
                $window.alert(response.data);
            });
        }
    };

    /*************************************************
        INIT
     *************************************************/
    $scope.$parent.loading = { status: true, message: "Loading university" };

    // Load University
    $universityService.retrieve($routeParams.university_id)
    .then(function onSuccess(response) {
        $scope.university = response.data;
        $scope.updated_university = $universityService.copy($scope.university);
        $scope.$parent.loading = { status: false, message: "" };
    })
    .catch(function onError(response) {
        $window.alert(response.data);
    });

});
