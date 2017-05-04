var app = angular.module("ethics-app");


// Document create controller
app.controller("documentCreateController", function($scope, $rootScope, $filter, $translate, $location, config, $window, $timeout, $authenticationService, $documentService, $userService, $universityService, $instituteService, $courseService) {

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
     * [changeTab description]
     * @param  {[type]} tab [description]
     * @return {[type]}     [description]
     */
    $scope.changeTab = function(tab){
      $scope.tab = tab;
    };

    /**
     * [cancel description]
     * @return {[type]} [description]
     */
    $scope.cancel = function(){
        $scope.redirect("/documents/" + $documentService.getId() + "/status/" + $documentService.getStatus());
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
            $scope.createDocumentForm.course_id.$pristine = false;
        } else {
            $scope.$parent.loading = { status: true, message: "Searching for user" };

            $timeout(function () {
                // Check if user exists
                $userService.findByEmail($scope.new_document.email_address)
                .then(function onSuccess(response) {
                    // Check if user was found
                    if(JSON.parse(response.data)){
                        $timeout(function() {
                            $scope.$parent.loading = { status: true, message: "Creating new document" };

                            // Create new document
                            $documentService.create($scope.new_document)
                            .then(function onSuccess(response) {
                                $window.alert("Your new document has been created and an email with the document-ID has been sent to you!");

                                // Redirect
                                $scope.redirect("/");
                            })
                            .catch(function onError(response) {
                                $window.alert(response.data);
                            });
                        }, 1000);
                    } else {
                        $scope.new_user.email_address = $scope.new_document.email_address || "";
                        $scope.$parent.loading = { status: false, message: "" };

                        // Change tab for registration
                        $scope.changeTab(2);
                    }
                })
                .catch(function onError(response) {
                    $window.alert(response.data);
                });
            }, 1000);
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

            // Create new user
            $userService.create($scope.new_user)
            .then(function onSuccess(response) {
                $window.alert("You have successfully signed up, you can now create your document!");

                // Change tab to send the new document again
                $scope.new_document.email_address = $scope.new_user.email_address || "";
                $scope.$parent.loading = { status: false, message: "" };
                $scope.changeTab(1);
            })
            .catch(function onError(response) {
                $window.alert(response.data);

                // Redirect
                $scope.redirect("/");
            });
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
                            former: false,
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
                        $scope.new_user.institute_id = null;
                    }
                } else {
                    // Reset institutes
                    $scope.institutes = [];
                    $scope.new_user.institute_id = null;
                }
                break;
            }
        }
    };

    /*************************************************
        INIT
     *************************************************/
    $scope.$parent.loading = { status: true, message: "Initialising new document" };
    $scope.new_document = $documentService.init();
    $scope.new_user = $userService.init();

    // App agreement
    $scope.agreement = {
        data: false,
        deletion: false
    };

    // Load universities
    $scope.load('universities');

    // Change tab to create a new document
    $scope.changeTab(1);
    $scope.$parent.loading = { status: false, message: "" };
});
