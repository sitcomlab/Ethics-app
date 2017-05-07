var app = angular.module("ethics-app");


// Account edit controller
app.controller("accountEditController", function($scope, $rootScope, $filter, $translate, $location, config, $window, $authenticationService, $documentService, $userService,  $universityService, $instituteService) {

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
            //$scope.editAccountForm.user_email_address.$pristine = false;
            $scope.editAccountForm.title.$pristine = false;
            $scope.editAccountForm.first_name.$pristine = false;
            $scope.editAccountForm.last_name.$pristine = false;
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
                $scope.$parent.authenticated_user = $authenticationService.get();

                // Redirect
                $scope.redirect("/documents/" + $documentService.getId() + "/status/" + $documentService.getStatus());
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
            case 'institutes': {
                if($scope.university_id){
                    if($scope.university_id !== null){
                        $scope.$parent.loading = { status: true, message: "Loading institutes" };

                        // Load related institutes
                        $instituteService.listByUniversity($scope.university_id, {
                            orderby: 'name.asc',
                            former: null,
                            limit: null,
                            offset: null
                        })
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
                        $scope.new_user.institute_id = null;
                    }
                } else {
                    // Reset institutes
                    $scope.institutes = [];
                    $scope.new_user.institute_id = null;
                }
                break;
            }
        }
    };


    /*************************************************
        INIT
     *************************************************/
    $scope.$parent.loading = { status: true, message: "Loading account settings" };
    $scope.authenticated_user = $authenticationService.get();
    $scope.updated_user = $authenticationService.copy();

    // Load universities
    $scope.load('universities');
    $scope.university_id = $scope.authenticated_user.university_id;

    // Load institutes
    $scope.load('institutes');

});
