var app = angular.module("ethics-app");

// Document list controller
app.controller("documentListController", function($scope, $rootScope, $translate, $location, config, $window, $authenticationService, $documentsService, $universityService, $instituteService, $courseService) {

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
     * [load description]
     * @return {[type]} [description]
     */
    $scope.load = function(){
        $scope.$parent.loading = { status: true, message: "Loading documents" };

        $documentsService.list($scope.filter)
        .then(function onSuccess(response) {
            $documentsService.set(response.data);
            $scope.documents = $documentsService.get();
            $scope.$parent.loading = { status: false, message: "" };
        })
        .catch(function onError(response) {
            $window.alert(response.data);
        });
    };

    /**
     * [resetSearch description]
     */
    $scope.resetSearch = function(){
        $scope.searchText = "";
    };

    /**
     * [filterDocuments description]
     * @return {[type]} [description]
     */
    $scope.filterDocuments = function(){
        $documentsService.set();
        $scope.documents = $documentsService.get();
        $scope.load();
    };

    /**
     * [updateInstitutes description]
     * @return {[type]} [description]
     */
    /*$scope.updateInstitutes = function(){
        $scope.filter.institute_id = null;
        $scope.institutes = $instituteService.getByUniversity($scope.filter.university_id);
        $scope.filterDocuments();
    };*/

    /**
     * [updateCourses description]
     * @return {[type]} [description]
     */
    /*$scope.updateCourses = function(){
        $scope.filter.course_id = null;
        $scope.courses = $courseService.getByInstitute($scope.filter.institute_id);
        $scope.filterDocuments();
    };*/


    /*************************************************
        INIT
     *************************************************/

    // Load member
    $scope.authenticated_member = $authenticationService.get();

    // Filter
    $scope.filter = {
        document_status: "3",
        //university_id: $scope.authenticated_member.university_id || null,
        //institute_id: $scope.authenticated_member.institute_id || null,
        course_id: null
    };

    // Load universities
    /*$universityService.list()
    .then(function onSuccess(response) {
        $universityService.set(response.data);
        $scope.universities = $universityService.get();

        // Load institutes
        $instituteService.list()
        .then(function onSuccess(response) {
            $instituteService.set(response.data);
            $scope.institutes = $instituteService.get();*/

            // Load courses
            $courseService.list()
            .then(function onSuccess(response) {
                $courseService.set(response.data);
                $scope.courses = $courseService.get();

                // Load documents
                $scope.load();
            })
            .catch(function onError(response) {
                $window.alert(response.data);
            });
        /*})
        .catch(function onError(response) {
            $window.alert(response.data);
        });
    })
    .catch(function onError(response) {
        $window.alert(response.data);
    });*/

});
