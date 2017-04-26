var app = angular.module("ethics-app");


// User edit controller
app.controller("userEditController", function($scope, $rootScope, $routeParams, $filter, $translate, $location, config, $window, $authenticationService, $userService, $universityService, $instituteService) {

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
        if($scope.editUserForm.$invalid) {
            // Update UI
            $scope.editUserForm.email_address.$pristine = false;
            $scope.editUserForm.title.$pristine = false;
            $scope.editUserForm.first_name.$pristine = false;
            $scope.editUserForm.last_name.$pristine = false;
            $scope.editUserForm.institute_id.$pristine = false;
            $scope.editUserForm.blocked.$pristine = false;
        } else {
            $scope.$parent.loading = { status: true, message: "Saving user" };

            // Updating user
            $userService.edit($routeParams.user_id, $scope.updated_user)
            .then(function onSuccess(response) {

                // Redirect
                $scope.redirect("/users/" + $routeParams.user_id);
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
                $scope.$parent.loading = { status: true, message: "Loading universities" };

                // Load universities
                $universityService.list($scope.filter)
                .then(function onSuccess(response) {
                    $scope.universities = response.data;
                    $scope.$parent.loading = { status: false, message: "" };
                })
                .catch(function onError(response) {
                    $window.alert(response.data);
                });
                break;
            }
            case 'institutes': {
                if($scope.university_id){
                    if($scope.university_id !== null){
                        $scope.$parent.loading = { status: true, message: "Loading institutes" };

                        // Load related institutes
                        $instituteService.listByUniversity($scope.university_id, $scope.filter)
                        .then(function onSuccess(response) {
                            $scope.institutes = response.data;
                            $scope.$parent.loading = { status: false, message: "" };
                        })
                        .catch(function onError(response) {
                            $window.alert(response.data);
                        });
                    } else {
                        // Reset institutes
                        $scope.institutes = [];
                        $scope.updated_user.institute_id = null;
                    }
                } else {
                    // Reset institutes
                    $scope.institutes = [];
                    $scope.updated_user.institute_id = null;
                }
                break;
            }
        }

    };


    /*************************************************
        INIT
     *************************************************/
    $scope.$parent.loading = { status: true, message: "Loading user" };

    // Filter
    $scope.filter = { former: false };

    // Load user
    $userService.retrieve($routeParams.user_id)
    .then(function onSuccess(response) {
        $scope.user = response.data;
        $scope.updated_user = $userService.copy($scope.user);

        // Load universities
        $scope.load('universities');

        // Set default value by user
        $scope.university_id = $scope.user.university_id;

        // Load related institutes
        $scope.load('institutes');

        // Set default value by user
        $scope.updated_user.institute_id = $scope.user.institute_id;
    })
    .catch(function onError(response) {
        $window.alert(response.data);
    });


});
