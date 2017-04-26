var app = angular.module("ethics-app");


// Document edit settings controller
app.controller("documentEditSettingsController", function($scope, $rootScope, $filter, $translate, $location, config, $window, $authenticationService, $documentService, $instituteService, $courseService) {

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
        $scope.$parent.loading = { status: true, message: "Saving document" };

        $documentService.edit($documentService.getId(), $scope.updated_document)
        .then(function onSuccess(response) {
            $documentService.set(response.data);

            // Update navbar
            $scope.$parent.document = $documentService.get();
            $scope.$parent.loading = { status: false, message: "" };

            // Redirect
            $scope.redirect("/documents/" + $documentService.getId());
        })
        .catch(function onError(response) {
            $window.alert(response.data);
        });
    };

    /**
     * [updateCourses description]
     * @return {[type]} [description]
     */
    $scope.updateCourses = function(){
        $scope.courses = $courseService.getByInstitute($scope.institute_id);
        $scope.updated_document.course_id = null;
    };


    /*************************************************
        INIT
     *************************************************/
    $scope.$parent.loading = { status: true, message: "Loading document" };
    $scope.document = $documentService.get();
    $scope.updated_document = $documentService.copy();

    // Load institutes
    $instituteService.list()
    .then(function onSuccess(response) {
        $instituteService.set(response.data);
        $scope.institutes = $instituteService.get();

        // Load courses
        $courseService.list()
        .then(function onSuccess(response) {
            $courseService.set(response.data);
            $scope.courses = $courseService.get();
            $scope.institute_id = $courseService.getInstituteId($scope.document.course_id);
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
