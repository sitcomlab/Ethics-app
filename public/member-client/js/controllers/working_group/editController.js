var app = angular.module("ethics-app");


// Working group edit controller
app.controller("workingGroupEditController", function($scope, $rootScope, $routeParams, $filter, $translate, $location, config, $window, $authenticationService, $workingGroupService, $universityService, $instituteService) {

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
     * @param  {[type]} former_status [description]
     * @return {[type]}               [description]
     */
    $scope.getGroupName = function(former_status){
        if(former_status){
            return $filter('translate')('FORMER_INSTITUTES');
        } else {
            return $filter('translate')('INSTITUTES');
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
                            limit: null,
                            offset: null,
                            former: false
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
                        $scope.updated_working_group.institute_id = null;
                    }
                } else {
                    // Reset institutes
                    $scope.institutes = [];
                    $scope.updated_working_group.institute_id = null;
                }
                break;
            }
        }

    };


    /**
     * [send description]
     * @return {[type]} [description]
     */
    $scope.save = function(){
        // Validate input
        if($scope.editWorkingGroupForm.$invalid) {
            // Update UI
            $scope.editWorkingGroupForm.working_group_name.$pristine = false;
        } else {
            $scope.$parent.loading = { status: true, message: "Saving working group" };

            // Updating working group
            $workingGroupService.edit($routeParams.working_group_id, $scope.updated_working_group)
            .then(function onSuccess(response) {
                // Redirect
                $scope.redirect("/working_groups/" + $routeParams.working_group_id);
            })
            .catch(function onError(response) {
                $window.alert(response.data);
            });
        }
    };

    /*************************************************
        INIT
     *************************************************/
    $scope.$parent.loading = { status: true, message: "Loading working group" };

    // Load working group
    $workingGroupService.retrieve($routeParams.working_group_id)
    .then(function onSuccess(response) {
        $scope.working_group = response.data;
        $scope.updated_working_group = $workingGroupService.copy($scope.working_group);

        // Load universities
        $scope.load('universities');

        // Set default value by working group
        $scope.university_id = $scope.working_group.university_id;

        // Load related institutes
        $scope.load('institutes');

        // Set default value by working group
        $scope.updated_working_group.institute_id = $scope.working_group.institute_id;
    })
    .catch(function onError(response) {
        $window.alert(response.data);
    });

});
