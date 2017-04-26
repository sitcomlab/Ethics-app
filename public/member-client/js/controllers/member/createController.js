var app = angular.module("ethics-app");


// Member create controller
app.controller("memberCreateController", function($scope, $rootScope, $routeParams, $filter, $translate, $location, config, $window, $authenticationService, $memberService, $universityService, $instituteService, $workingGroupService) {

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
        if($scope.createMemberForm.$invalid) {
            // Update UI
            $scope.createMemberForm.email_address.$pristine = false;
            $scope.createMemberForm.password.$pristine = false;
            $scope.createMemberForm.repeated_password.$pristine = false;
            $scope.createMemberForm.title.$pristine = false;
            $scope.createMemberForm.first_name.$pristine = false;
            $scope.createMemberForm.last_name.$pristine = false;
            $scope.createMemberForm.university_id.$pristine = false;
            $scope.createMemberForm.institute_id.$pristine = false;
            $scope.createMemberForm.working_group_id.$pristine = false;
            $scope.createMemberForm.office_room_number.$pristine = false;
            $scope.createMemberForm.office_phone_number.$pristine = false;
            $scope.createMemberForm.office_email_address.$pristine = false;
            $scope.createMemberForm.admin.$pristine = false;
            $scope.createMemberForm.former.$pristine = false;
            $scope.createMemberForm.subscribed.$pristine = false;
        } else {
            if($scope.new_member.password === $scope.repeated_password){
                $scope.$parent.loading = { status: true, message: "Creating new member" };

                // Create new member
                $memberService.create($scope.new_member)
                .then(function onSuccess(response) {
                    var member = response.data;

                    // Redirect
                    $scope.redirect("/members/" + member.member_id);
                })
                .catch(function onError(response) {
                    $window.alert(response.data);
                });
            } else {
                $window.alert("Your passwords are not equal!");
            }
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
                        $scope.institute_id = null;
                        $scope.new_member.working_group_id = null;
                    }
                } else {
                    // Reset institutes
                    $scope.institutes = [];
                    $scope.institute_id = null;
                    $scope.new_member.working_group_id = null;
                }
                break;
            }
            case 'working_groups': {
                if($scope.institute_id){
                    if($scope.institute_id !== null){
                        $scope.$parent.loading = { status: true, message: "Loading working groups" };

                        // Load related working groups
                        $workingGroupService.listByInstitute($scope.institute_id, $scope.filter)
                        .then(function onSuccess(response) {
                            $scope.working_groups = response.data;
                            $scope.$parent.loading = { status: false, message: "" };
                        })
                        .catch(function onError(response) {
                            $window.alert(response.data);
                        });
                    } else {
                        // Reset working groups
                        $scope.working_groups = [];
                        $scope.new_member.working_group_id = null;
                    }
                } else {
                    // Reset working groups
                    $scope.working_groups = [];
                    $scope.new_member.working_group_id = null;
                }
                break;
            }
        }

    };


    /*************************************************
        INIT
     *************************************************/
    $scope.new_member = $memberService.init();
    $scope.repeated_password = "";
    $scope.authenticated_member = $authenticationService.get();

    // Filter
    $scope.filter = { former: false };

    // Load universities
    $scope.load('universities');

    // Set default value by member
    $scope.university_id = $scope.authenticated_member.university_id;

    // Load related institutes
    $scope.load('institutes');

    // Set default value by member
    $scope.institute_id = $scope.authenticated_member.institute_id;

    // Load related working groups
    $scope.load('working_groups');

});
