var app = angular.module("ethics-app");


// Course edit controller
app.controller("courseEditController", function($scope, $rootScope, $routeParams, $translate, $location, config, $window, $authenticationService, $courseService, $instituteService, $memberService) {

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
            $courseService.edit($scope.course.course_id, $scope.updated_course)
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
            $scope.updated_course.responsibilities.push({
                member_id: $scope.selectedMember.originalObject.member_id
            });
            $scope.$broadcast('angucomplete-alt:clearInput', 'members');
            $scope.selectedMember = {};
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

        // Load amount of members
        angular.forEach($scope.updated_course.responsibilities, function(responsibility , key){
            var result = _.findWhere($scope.members, { member_id: responsibility.member_id });
            if(result){
                $scope.responsible_members.push(result);
            }
        });

    };


    /*************************************************
        INIT
     *************************************************/
    $scope.$parent.loading = { status: true, message: "Loading course" };

    $scope.selectedMember = {};
    $scope.responsible_members = [];
    $scope.authenticated_member = $authenticationService.get();

    // Load course
    $courseService.retrieve($routeParams.course_id)
    .then(function onSuccess(response) {
        $scope.course = response.data;
        $scope.updated_course = $courseService.copy($scope.course);

        $scope.$parent.loading = { status: true, message: "Loading institutes" };

        // Load institutes
        $instituteService.list()
        .then(function onSuccess(response) {
            $instituteService.set(response.data);
            $scope.institutes = $instituteService.get();

            $scope.$parent.loading = { status: true, message: "Loading members" };

            // Load members
            $memberService.list()
            .then(function onSuccess(response) {
                $memberService.set(response.data);
                $scope.members = $memberService.getByStatus(false);

                // Update responsible members
                $scope.updateMemberList();

                $scope.$parent.loading = { status: false, message: "" };
            })
            .catch(function onError(response) {
                $window.alert(response.data);
            });
        })
        .catch(function onError(response) {
            $window.alert(response.data);
        });
    })
    .catch(function onError(response) {
        $window.alert(response.data);
    });

});
