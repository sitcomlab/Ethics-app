var app = angular.module("ethics-app");


// Course edit controller
app.controller("courseEditController", function($scope, $rootScope, $routeParams, $filter, $translate, $location, config, $window, $timeout, $authenticationService, $memberService, $courseService, $instituteService, $universityService) {

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
     * [save description]
     * @return {[type]} [description]
     */
    $scope.save = function(){
        // Validate input
        if($scope.editCourseForm.$invalid) {
            // Update UI
            $scope.editCourseForm.course_name.$pristine = false;
            $scope.editCourseForm.year.$pristine = false;
            $scope.editCourseForm.term.$pristine = false;
            $scope.editCourseForm.lecturer.$pristine = false;
            $scope.editCourseForm.institute_id.$pristine = false;
        } else {
            $scope.$parent.loading = { status: true, message: "Saving course" };

            // Updating course
            $courseService.edit($routeParams.course_id, $scope.updated_course)
            .then(function onSuccess(response) {

                // Redirect
                $scope.redirect("/courses/" + $routeParams.course_id);
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
            $scope.updated_course.responsibilities.push({
                member_id: $scope.selectedMember.originalObject.member_id
            });
            $scope.$broadcast('angucomplete-alt:clearInput', 'members');
        }
        $scope.updated_course.responsibilities = _.uniq($scope.updated_course.responsibilities, 'member_id');
        $scope.updateMemberList();
    };

    /**
     * [deleteMember description]
     * @param  {[type]} index [description]
     * @return {[type]}       [description]
     */
    $scope.deleteMember = function(index){
        $scope.updated_course.responsibilities.splice(index, 1);
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
        angular.forEach($scope.updated_course.responsibilities, function(responsibility , key){
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
                $scope.$parent.loading = { status: true, message: "Loading universities" };

                // Load universities
                $universityService.list({
                    orderby: 'name.asc'
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
                            orderby: 'name.asc'
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
                        $scope.updated_course.institute_id = null;

                        // Reset members
                        $scope.members = [];
                        $scope.updated_course.responsibilities = [];
                        $scope.updateMemberList();
                    }
                } else {
                    // Reset institutes
                    $scope.institutes = [];
                    $scope.updated_course.institute_id = null;

                    // Reset members
                    $scope.members = [];
                    $scope.updated_course.responsibilities = [];
                    $scope.updateMemberList();
                }
                break;
            }
            case 'members': {
                if($scope.updated_course.institute_id){
                    if($scope.updated_course.institute_id !== null){
                        $scope.$parent.loading = { status: true, message: "Loading members" };

                        // Load related members
                        $memberService.listByInstitute($scope.updated_course.institute_id, {
                            orderby: 'name.asc',
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
                        $scope.updated_course.responsibilities = [];
                        $scope.updateMemberList();
                    }
                } else {
                    // Reset members
                    $scope.members = [];
                    $scope.updated_course.responsibilities = [];
                    $scope.updateMemberList();
                }
                break;
            }
        }

    };


    /*************************************************
        INIT
     *************************************************/
    $scope.$parent.loading = { status: true, message: "Loading course" };
    $scope.selectedMember = {};
    $scope.responsible_members = [];


    // Load course
    $courseService.retrieve($routeParams.course_id)
    .then(function onSuccess(response) {
        $scope.course = response.data;
        $scope.updated_course = $courseService.copy($scope.course);

        // Load universities
        $scope.university_id = $scope.course.university_id;
        $scope.load('universities');

        // Load related institutes
        $instituteService.listByUniversity($scope.university_id, {
            orderby: 'name.asc',
            former: false
        })
        .then(function onSuccess(response) {
            $scope.institutes = response.data;
            $scope.$parent.loading = { status: false, message: "" };

            // Load related members
            $memberService.listByInstitute($scope.updated_course.institute_id, {
                orderby: 'name.asc'
            })
            .then(function onSuccess(response) {
                $scope.members = response.data;
                $scope.$parent.loading = { status: false, message: "" };

                // Update UI
                $scope.updateMemberList();
            })
            .catch(function onError(response) {
                $window.alert(response.data);
            });
        })
        .catch(function onError(response) {
            $window.alert(response.data);
        });

    });

});
