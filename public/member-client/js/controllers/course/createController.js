var app = angular.module("ethics-app");


// Course create controller
app.controller("courseCreateController", function($scope, $rootScope, $routeParams, $filter, $translate, $location, config, $window, $timeout, $authenticationService, $memberService, $courseService, $instituteService, $universityService) {

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
     * [send description]
     * @return {[type]} [description]
     */
    $scope.send = function(){
        // Validate input
        if($scope.createCourseForm.$invalid) {
            // Update UI
            $scope.createCourseForm.course_name.$pristine = false;
            $scope.createCourseForm.year.$pristine = false;
            $scope.createCourseForm.term.$pristine = false;
            $scope.createCourseForm.lecturer.$pristine = false;
            $scope.createCourseForm.institute_id.$pristine = false;
        } else {
            $scope.$parent.loading = { status: true, message: $filter('translate')('CREATING_NEW_COURSE') };

            // Create new course
            $courseService.create($scope.new_course)
            .then(function onSuccess(response) {
                var course = response.data;

                // Redirect
                $scope.redirect("/courses/" + course.course_id);
            })
            .catch(function onError(response) {
                $window.alert(response.data);
            });
        }
    };

    /**
     * [addMember description]
     */
    $scope.addMember = function(){
        if($scope.selectedMember.originalObject){
            $scope.new_course.responsibilities.push({
                member_id: $scope.selectedMember.originalObject.member_id
            });
            $scope.$broadcast('angucomplete-alt:clearInput', 'members');
        }
        $scope.new_course.responsibilities = _.uniq($scope.new_course.responsibilities, 'member_id');
        $scope.updateMemberList();
    };

    /**
     * [deleteMember description]
     * @param  {[type]} index [description]
     * @return {[type]}       [description]
     */
    $scope.deleteMember = function(index){
        $scope.new_course.responsibilities.splice(index, 1);
        $scope.updateMemberList();
    };

    /**
     * [updateMemberList description]
     * @return {[type]} [description]
     */
    $scope.updateMemberList = function(){
        $scope.responsible_members = [];
        $scope.selectedMember = {};

        // Load amount of members
        angular.forEach($scope.new_course.responsibilities, function(responsibility , key){
            var result = _.findWhere($scope.members, { member_id: responsibility.member_id });
            if(result){
                $scope.responsible_members.push(result);
            }
        });

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
            case 'institutes': {
                if($scope.university_id){
                    if($scope.university_id !== null){
                        $scope.$parent.loading = { status: true, message: $filter('translate')('LOADING_INSTITUTES') };

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
                        $scope.new_course.institute_id = null;

                        // Reset members
                        $scope.members = [];
                        $scope.new_course.responsibilities = [];
                        $scope.updateMemberList();
                    }
                } else {
                    // Reset institutes
                    $scope.institutes = [];
                    $scope.new_course.institute_id = null;

                    // Reset members
                    $scope.members = [];
                    $scope.new_course.responsibilities = [];
                    $scope.updateMemberList();
                }
                break;
            }
            case 'members': {
                if($scope.new_course.institute_id){
                    if($scope.new_course.institute_id !== null){
                        $scope.$parent.loading = { status: true, message: $filter('translate')('LOADING_MEMBERS') };

                        // Load related members
                        $memberService.listByInstitute($scope.new_course.institute_id, {
                            orderby: 'name.asc',
                            limit: null,
                            offset: null,
                            former: false
                        })
                        .then(function onSuccess(response) {
                            $scope.members = response.data;
                            $scope.$parent.loading = { status: false, message: "" };
                        })
                        .catch(function onError(response) {
                            $window.alert(response.data);
                        });
                    } else {
                        // Reset members
                        $scope.members = [];
                        $scope.new_course.responsibilities = [];
                        $scope.updateMemberList();
                    }
                } else {
                    // Reset members
                    $scope.members = [];
                    $scope.new_course.responsibilities = [];
                    $scope.updateMemberList();
                }
                break;
            }
        }

    };


    /*************************************************
        INIT
     *************************************************/
    $scope.new_course = $courseService.init();
    $scope.selectedMember = {};
    $scope.responsible_members = [];
    $scope.authenticated_member = $authenticationService.get();

    // Load universities
    $scope.load('universities');

    // Set default values by member
    $scope.university_id = $scope.authenticated_member.university_id;
    $scope.new_course.institute_id = $scope.authenticated_member.institute_id;

    // Load related institutes
    $scope.load('institutes');

    // Load related members
    $scope.load('members');

});
