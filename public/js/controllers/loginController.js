var app = angular.module("ethics-app");

// Login controller
app.controller("loginController", function($scope, $rootScope, $translate, $location, config, $loginService, $documentService, $userService, $fileService, $recoveryService, $window) {

    // Reset
    $rootScope.$broadcast('resetNavbar');
    $userService.set();
    $documentService.set();
    $fileService.set();
    delete $scope.user;
    delete $scope.document;

    // Init
    $scope.tab = 1;
    $scope.login_document = $loginService.init();
    $scope.new_document = $documentService.init();
    $scope.new_user = $userService.init();
    $scope.recovery_user = $recoveryService.init();

    /**
     * [changeTab description]
     * @param  {[type]} tab [description]
     * @return {[type]}     [description]
     */
    $scope.changeTab = function(tab){
        $scope.tab = tab;
    };


    /**
     * [login description]
     * @return {[type]} [description]
     */
    $scope.login = function(){
        // Check input
        if($scope.loginForm.$invalid) {
            // Update UI
            $scope.loginForm.login_document_id.$pristine = false;
        } else {
            // Find document
            $documentService.retrieve($scope.login_document.document_id)
            .success(function(response) {
                $documentService.set(response);
                // Redirect
                $location.url("/documents/" + $documentService.getId());
            })
            .error(function(response) {
                $window.alert(response);
            });
        }
    };

    /**
     * [createDoc description]
     * @return {[type]} [description]
     */
    $scope.createDocument = function(){

        // Check input
        if($scope.createForm.$invalid) {
            // Update UI
            $scope.createForm.new_document_title.$pristine = false;
            $scope.createForm.new_document_email_address.$pristine = false;
        } else {

            // Loading screen
            $scope.tab = 0;

            // Check if user_id is known
            if($userService.get()) {

                // Create new document for known user
                $documentService.create($userService.getId(), $scope.new_document)
                .success(function(response) {
                    $documentService.set(response);

                    // Redirect
                    $scope.tab = 1;
                    $location.url("/documents/" + $documentService.getId());
                })
                .error(function(response) {
                    console.log(response);
                    // Redirect
                    $scope.tab = 1;
                });
            } else {
                // Find user by email
                $userService.findByEmail($scope.new_document.email_address)
                .success(function(response) {
                    $userService.set(response);
                    $scope.createDocument();
                })
                .error(function(response) {
                    console.log(response);
                    // Redirect: User not found
                    $scope.tab = 4;
                });
            }
        }
    };

    /**
     * [createUser description]
     * @return {[type]} [description]
     */
    $scope.createUser = function(){
        // Check input
        if($scope.userForm.$invalid) {
            // Update UI
            $scope.userForm.new_user_title.$pristine = false;
            $scope.userForm.new_user_first_name.$pristine = false;
            $scope.userForm.new_user_last_name.$pristine = false;
        } else {
            $scope.new_user.email_address = $scope.new_document.email_address;
            $userService.create($scope.new_user)
            .success(function(response) {
                $userService.set(response);
                $scope.createDocument();
            })
            .error(function(response) {
                $window.alert(response);
            });
        }
    };


    /**
     * [recovery description]
     * @return {[type]} [description]
     */
    $scope.recovery = function(){
        // Check input
        if($scope.recoveryForm.$invalid) {
            // Update UI
            $scope.recoveryForm.recovery_email_address.$pristine = false;
        } else {
            // Loading screen
            $scope.tab = 0;

            $recoveryService.findByEmail($scope.recovery_user.email_address)
            .success(function(response) {
                // Reset
                $scope.recovery_user = $recoveryService.init();
                // Show dialog
                $window.alert("An email with your document-IDs was sent!");
                // Redirect
                $scope.tab = 1;
            })
            .error(function(response) {
                console.log(response);
                // Redirect
                $scope.tab = 3;
                // TODO: Show dialog
                $window.alert("This email-address could not be found!");
                //$window.alert("No documents could be found with this email-address!");
            });
        }
    };


});
