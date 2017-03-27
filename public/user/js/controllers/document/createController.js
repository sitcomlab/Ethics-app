var app = angular.module("ethics-app");


// Document create controller
app.controller("documentCreateController", function($scope, $rootScope, $translate, $location, config, $window, $authenticationService, $documentService, $userService, $instituteService, $courseService) {

    /*************************************************
        FUNCTIONS
     *************************************************/

    /**
     * [changeTab description]
     * @param  {[type]} tab [description]
     * @return {[type]}     [description]
     */
    $scope.changeTab = function(tab){
        $scope.tab = tab;
    };

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
        if($authenticationService.get()){
            $scope.redirect("/documents/" + $documentService.getId() + "/status/" + $documentService.getStatus());
        } else {
            $scope.redirect("/");
        }
    };

    /**
     * [send description]
     * @return {[type]} [description]
     */
    $scope.send = function(){
        // Validate input
        if($scope.createDocumentForm.$invalid) {
            // Update UI
            $scope.createDocumentForm.document_title.$pristine = false;
            $scope.createDocumentForm.document_email_address.$pristine = false;
        } else {
            $scope.$parent.loading = { status: true, message: "Creating new document" };

            // Check if user exists
            $userService.findByEmail($scope.new_document.email_address)
            .then(function onSuccess(response) {
                // Check if user was found
                if(JSON.parse(response.data)){
                    $documentService.create($scope.new_document)
                    .then(function onSuccess(response) {
                        $window.alert("Your new document has been created and an email with the document-ID has been sent to you!");
                        $scope.redirect("/");
                    })
                    .catch(function onError(response) {
                        $window.alert(response.data);
                    });
                } else {
                    $scope.new_user.email_address = $scope.new_document.email_address || "";
                    $scope.changeTab(2);
                }
            })
            .catch(function onError(response) {
                $window.alert(response.data);
            });
        }
    };

    /**
     * [signup description]
     * @return {[type]} [description]
     */
    $scope.signup = function(){

        // Validate input
        if($scope.createUserForm.$invalid) {
            // Update UI
            $scope.createUserForm.user_email_address.$pristine = false;
            $scope.createUserForm.title.$pristine = false;
            $scope.createUserForm.first_name.$pristine = false;
            $scope.createUserForm.last_name.$pristine = false;
            $scope.createUserForm.university_id.$pristine = false;
            $scope.createUserForm.institute_id.$pristine = false;
        } else {
            $scope.$parent.loading = { status: true, message: "Creating new user" };

            $userService.create($scope.new_user)
            .then(function onSuccess(response) {
                $window.alert("You have successfully signed up, you can now create your document!");

                // Retry creating new document
                $scope.new_document.email_address = $scope.new_user.email_address || "";

                $scope.changeTab(1);
            })
            .catch(function onError(response) {
                $window.alert(response.data);
                $scope.redirect("/");
            });
        }
    };

    /**
     * [updateCourses description]
     * @return {[type]} [description]
     */
    $scope.updateCourses = function(){
        $scope.courses = $courseService.getByInstitute($scope.institute_id);
        $scope.new_document.course_id = null;
    };

    /*************************************************
        INIT
     *************************************************/
    $scope.$parent.loading = { status: true, message: "Initialising new document" };
    $scope.new_document = $documentService.init();
    $scope.new_user = $userService.init();


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
            $scope.institute_id = null;

            $scope.$parent.loading = { status: false, message: "" };
            $scope.changeTab(1);
        })
        .catch(function onError(response) {
            $window.alert(response.data);
        });
    })
    .catch(function onError(response) {
        $window.alert(response.data);
    });

});
