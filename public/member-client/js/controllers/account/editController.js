var app = angular.module("ethics-app");


// Account edit controller
app.controller("accountEditController", function($scope, $rootScope, $routeParams, $filter, $translate, $location, config, $window, $authenticationService, $memberService, $universityService, $instituteService, $workingGroupService) {

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
    $scope.getGroupName = function(data, former_status){
        switch (data) {
            case 'institutes': {
                if(former_status){
                    return $filter('translate')('FORMER_INSTITUTES');
                } else {
                    return $filter('translate')('INSTITUTES');
                }
                break;
            }
            case 'working_groups': {
                if(former_status){
                    return $filter('translate')('FORMER_INSTITUTES');
                } else {
                    return $filter('translate')('INSTITUTES');
                }
                break;
            }
            default: {
                return "";
            }
        }
    };

    /**
     * [description]
     * @return {[type]} [description]
     */
    $scope.changePassword = function(){
        $scope.updated_member.new_password = !$scope.updated_member.new_password;
    };

    /**
     * [save description]
     * @return {[type]} [description]
     */
    $scope.save = function(){
        // Validate input
        if($scope.editMemberForm.$invalid) {
            // Update UI
            $scope.editMemberForm.email_address.$pristine = false;
            $scope.editMemberForm.old_password.$pristine = false;
            $scope.editMemberForm.password.$pristine = false;
            $scope.editMemberForm.repeated_password.$pristine = false;
            $scope.editMemberForm.title.$pristine = false;
            $scope.editMemberForm.first_name.$pristine = false;
            $scope.editMemberForm.last_name.$pristine = false;
            $scope.editMemberForm.university_id.$pristine = false;
            $scope.editMemberForm.institute_id.$pristine = false;
            $scope.editMemberForm.working_group_id.$pristine = false;
            $scope.editMemberForm.office_room_number.$pristine = false;
            $scope.editMemberForm.office_phone_number.$pristine = false;
            $scope.editMemberForm.office_email_address.$pristine = false;
            $scope.editMemberForm.admin.$pristine = false;
            $scope.editMemberForm.former.$pristine = false;
            $scope.editMemberForm.subscribed.$pristine = false;
        } else {
            // Cache token
            var token = $authenticationService.getToken();

            // Check if passwords are equal, if it has been changed
            if($scope.updated_member.new_password){
                if($scope.updated_member.password === $scope.repeated_password){
                    $scope.$parent.loading = { status: true, message: $filter('translate')('SAVING_MEMBER') };

                    // Update member
                    $memberService.edit($scope.authenticated_member.member_id, $scope.updated_member)
                    .then(function onSuccess(response) {
                        var authenticated_member = response.data;
                        authenticated_member.token = token;
                        $authenticationService.set(authenticated_member);

                        // Redirect
                        $scope.redirect("/members/" + $scope.authenticated_member.member_id);
                    })
                    .catch(function onError(response) {
                        $window.alert(response.data);
                    });
                } else {
                    $window.alert("Your passwords are not equal!");
                }
            } else {
                $scope.$parent.loading = { status: true, message: $filter('translate')('SAVING_MEMBER') };

                // Update member
                $memberService.edit($scope.authenticated_member.member_id, $scope.updated_member)
                .then(function onSuccess(response) {
                    var authenticated_member = response.data;
                    authenticated_member.token = token;
                    $authenticationService.set(authenticated_member);

                    // Reset navbar
                    $scope.$parent.authenticated_member = $authenticationService.get();
                    $scope.$parent.loading = { status: false, message: "" };

                    // Redirect
                    $scope.redirect("/members/" + $scope.authenticated_member.member_id);
                })
                .catch(function onError(response) {
                    $window.alert(response.data);
                });
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
                            former: null
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
                        $scope.institute_id = null;
                        $scope.updated_member.working_group_id = null;
                    }
                } else {
                    // Reset institutes
                    $scope.institutes = [];
                    $scope.institute_id = null;
                    $scope.updated_member.working_group_id = null;
                }
                break;
            }
            case 'working_groups': {
                if($scope.institute_id){
                    if($scope.institute_id !== null){
                        $scope.$parent.loading = { status: true, message: "Loading working groups" };

                        // Load related working groups
                        $workingGroupService.listByInstitute($scope.institute_id, {
                            orderby: 'name.asc',
                            limit: null,
                            offset: null,
                            former: null
                        })
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
                        $scope.updated_member.working_group_id = null;
                    }
                } else {
                    // Reset working groups
                    $scope.working_groups = [];
                    $scope.updated_member.working_group_id = null;
                }
                break;
            }
        }

    };


    /*************************************************
        INIT
     *************************************************/
    $scope.authenticated_member = $authenticationService.get();
    $scope.repeated_password = "";

    // Load member
    $memberService.retrieve($scope.authenticated_member.member_id)
    .then(function onSuccess(response) {
        $scope.member = response.data;
        $scope.updated_member = $memberService.copy($scope.member);

        // Load universities
        $scope.load('universities');

        // Set default value by member
        $scope.university_id = $scope.member.university_id;

        // Load related institutes
        $scope.load('institutes');

        // Set default value by member
        $scope.institute_id = $scope.member.institute_id;

        // Load related working groups
        $scope.load('working_groups');

        // Set default by member
        $scope.working_group_id = $scope.member.working_group_id;

        $scope.$parent.loading = { status: false, message: "" };
    })
    .catch(function onError(response) {
        $window.alert(response.data);
    });

});
