var app = angular.module("ethics-app");


// Course create controller
app.controller("courseCreateController", function($scope, $rootScope, $routeParams, $translate, $location, config, $window, $authenticationService, $courseService, $instituteService, $memberService) {

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
        if($scope.createCourseForm.$invalid) {
            // Update UI
            $scope.createCourseForm.course_name.$pristine = false;
            $scope.createCourseForm.year.$pristine = false;
            $scope.createCourseForm.term.$pristine = false;
            $scope.createCourseForm.lecturer.$pristine = false;
            $scope.createCourseForm.institute_id.$pristine = false;
        } else {
            $scope.$parent.loading = { status: true, message: "Creating new course" };

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
            $scope.responsibilities.push({
                member_id: $scope.selectedMember.originalObject.member_id,
                course_id: null
            });
            $scope.$broadcast('angucomplete-alt:clearInput', 'members');
            $scope.selectedMember = {};
        }
        $scope.responsibilities = _.uniq($scope.responsibilities, 'member_id');
        $scope.updateMemberList();
    };

    /**
     * [deleteMember description]
     * @param  {[type]} index [description]
     * @return {[type]}       [description]
     */
    $scope.deleteMember = function(index){
        $scope.responsibilities.splice(index, 1);
        $scope.updateMemberList();
    };

    /**
     * [updateMemberList description]
     * @return {[type]} [description]
     */
    $scope.updateMemberList = function(){
        $scope.responsible_members = [];

        // Load amount of members
        angular.forEach($scope.responsibilities, function(member , key){
            var result = _.findWhere($scope.members, { member_id: member.member_id });
            if(result){
                $scope.responsible_members.push(result);
            }
        });

    };


    /*************************************************
        INIT
     *************************************************/
    $scope.$parent.loading = { status: true, message: "Loading institutes" };
    $scope.new_course = $courseService.init();
    $scope.selectedMember = {};
    $scope.responsibilities = [];
    $scope.responsible_members = [];
    $scope.authenticated_member = $authenticationService.get();

    // Load institutes
    $instituteService.list()
    .then(function onSuccess(response) {
        $instituteService.set(response.data);
        $scope.institutes = $instituteService.get();
        $scope.new_course.institute_id = $scope.authenticated_member.institute_id;

        $scope.$parent.loading = { status: true, message: "Loading members" };

        // Load members
        $memberService.list()
        .then(function onSuccess(response) {
            $memberService.set(response.data);
            $scope.members = $memberService.getByStatus(false);
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
