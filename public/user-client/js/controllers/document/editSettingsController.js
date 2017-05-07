var app = angular.module("ethics-app");


// Document edit settings controller
app.controller("documentEditSettingsController", function($scope, $rootScope, $filter, $translate, $location, config, $window, $authenticationService, $documentService, $universityService, $instituteService, $courseService) {

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
                            offset: null
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
                        $scope.updated_document.course_id = null;
                    }
                } else {
                    // Reset institutes
                    $scope.institutes = [];
                    $scope.institute_id = null;
                    $scope.updated_document.course_id = null;
                }
                break;
            }
            case 'courses': {
                if($scope.institute_id){
                    if($scope.institute_id !== null){
                        $scope.$parent.loading = { status: true, message: "Loading courses" };

                        // Load related courses
                        $courseService.listByInstitute($scope.institute_id, {
                            orderby: 'year.desc',
                            limit: null,
                            offset: null
                        })
                        .then(function onSuccess(response) {
                            $scope.courses = response.data;
                            $scope.$parent.loading = { status: false, message: "" };
                        })
                        .catch(function onError(response) {
                            $window.alert(response.data);
                        });
                    } else {
                        // Reset courses
                        $scope.courses = [];
                        $scope.updated_document.course_id = null;
                    }
                } else {
                    // Reset courses
                    $scope.courses = [];
                    $scope.updated_document.course_id = null;
                }
                break;
            }
        }

    };

    /**
     * [description]
     * @return {[type]} [description]
     */
    $scope.updateCourse = function(course_id) {
        if(course_id !== null){
            $courseService.retrieve(course_id)
            .then(function onSuccess(response) {
                $scope.course = response.data;
            })
            .catch(function onError(response) {
                $scope.course = nulll;
            });
        } else {
            $scope.course = null;
        }
    };


    /*************************************************
        INIT
     *************************************************/
    $scope.$parent.loading = { status: true, message: "Loading document" };
    $scope.document = $documentService.get();
    $scope.updated_document = $documentService.copy();


    // Load universities
    $scope.load('universities');
    $scope.university_id = $scope.authenticated_user.university_id;

    // Load institutes
    $scope.load('institutes');
    $scope.institute_id = $scope.authenticated_user.institute_id;

    // Load courses
    $scope.load('courses');
    console.log($scope.updated_document);
    $scope.updateCourse($scope.updated_document.course_id);

    $scope.$parent.loading = { status: false, message: "" };

});
