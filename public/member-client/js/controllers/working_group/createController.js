var app = angular.module("ethics-app");


// Working group create controller
app.controller("workingGroupCreateController", function($scope, $rootScope, $routeParams, $translate, $location, config, $window, $timeout, $authenticationService, $workingGroupService, $instituteService, $universityService) {

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
        if($scope.createWorkingGroupForm.$invalid) {
            // Update UI
            $scope.createWorkingGroupForm.working_group_name.$pristine = false;
            $scope.createWorkingGroupForm.institute_id.$pristine = false;
            $scope.createWorkingGroupForm.university_id.$pristine = false;
        } else {
            $scope.$parent.loading = { status: true, message: "Creating new working group" };

            // Create new working group
            $workingGroupService.create($scope.new_working_group)
            .then(function onSuccess(response) {
                var working_group = response.data;

                // Redirect
                $scope.redirect("/working_groups/" + working_group.working_group_id);
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
                        $scope.new_working_group.institute_id = null;
                    }
                } else {
                    // Reset institutes
                    $scope.institutes = [];
                    $scope.new_working_group.institute_id = null;
                }
                break;
            }
        }

    };


    /*************************************************
        INIT
     *************************************************/
    $scope.new_working_group = $workingGroupService.init();
    $scope.authenticated_member = $authenticationService.get();

    // Filter
    $scope.filter = { former: false };

    // Load universities
    $scope.load('universities');

    // Load related institutes
    $scope.load('institutes');
});
