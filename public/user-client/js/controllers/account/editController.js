var app = angular.module("ethics-app");


// Account edit controller
app.controller("accountEditController", function($scope, $rootScope, $translate, $location, config, $window, $authenticationService, $documentService, $userService, $universityService, $instituteService) {

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
     * [cancel description]
     * @return {[type]} [description]
     */
    $scope.cancel = function(){
        $scope.redirect("/documents/" + $documentService.getId() + "/status/" + $documentService.getStatus());
    };

    /**
     * [saveDocument description]
     * @return {[type]} [description]
     */
    $scope.save = function(){
        // Validate input
        if($scope.editAccountForm.$invalid) {
            // Update UI
            $scope.editAccountForm.user_email_address.$pristine = false;
            $scope.editAccountForm.title.$pristine = false;
            $scope.editAccountForm.first_name.$pristine = false;
            $scope.editAccountForm.last_name.$pristine = false;
            $scope.editAccountForm.university_id.$pristine = false;
            $scope.editAccountForm.institute_id.$pristine = false;
        } else {
            $scope.$parent.loading = { status: true, message: "Saving account settings" };

            $userService.edit($authenticationService.getId(), $scope.updated_user)
            .then(function onSuccess(response) {
                // Attach token
                var updated_user = response.data;
                updated_user.token = $authenticationService.getToken();
                $authenticationService.set(updated_user);

                // Update navbar
                $rootScope.$broadcast('updateNavbar');

                $scope.redirect("/documents/" + $documentService.getId() + "/status/" + $documentService.getStatus());
            })
            .catch(function onError(response) {
                $window.alert(response.data);
            });
        }
    };

    /**
     * [updateInstitutes description]
     * @return {[type]} [description]
     */
    $scope.updateInstitutes = function(){
        $scope.updated_user.institute_id = null;
        $scope.institutes = $instituteService.getByUniversity($scope.updated_user.university_id);
    };

    /*************************************************
        INIT
     *************************************************/
    $scope.$parent.loading = { status: true, message: "Loading account settings" };
    $scope.authenticated_user = $authenticationService.get();
    $scope.updated_user = $authenticationService.copy();

    // Load universities
    $universityService.list()
    .then(function onSuccess(response) {
        $universityService.set(response.data);
        $scope.universities = $universityService.get();

        // Load institutes
        $instituteService.list()
        .then(function onSuccess(response) {
            $instituteService.set(response.data);
            $scope.institutes = $instituteService.get();

            $scope.institute_id = $scope.updated_user.institute_id;
            $scope.$parent.loading = { status: false, message: "" };
        })
        .catch(function onError(response) {
            $window.alert(response.data);
        });
    })
    .catch(function onError(response) {
        $window.alert(response.data);
    });

});
