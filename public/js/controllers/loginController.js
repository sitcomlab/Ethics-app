var app = angular.module("ethics-app");

// Login controller
app.controller("loginController", function($scope, $rootScope, $translate, $location, config, $loginService, $documentService, $userService, $recoveryService, $window) {

    // Reset
    $rootScope.$broadcast('resetNavbar');
    $userService.set();
    $documentService.set();
    delete $scope.user;
    delete $scope.document;

    // Init
    $scope.tab = 0;
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

        // Find document
        $documentService.retrieve($scope.login_document.document_id)
        .success(function(response) {
            // Redirect
            $location.url("/documents/" + $scope.document.document_id);
        })
        .error(function(response) {
            console.log(response);
        });
    };

    /**
     * [createDoc description]
     * @return {[type]} [description]
     */
    $scope.createDocument = function(){
        // Loading screen
        $scope.tab = 4;

        // Check if user_id is known
        if($userService.get()) {

            // Create new document for known user
            $documentService.create($userService.getId(), $scope.new_document)
            .success(function(response) {
                $documentService.set(response);
                // Redirect
                $location.url("/documents/" + $documentService.getId());
                $scope.tab = 0;
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
                $scope.tab = 3;
            });
        }

    };

    /**
     * [createUser description]
     * @return {[type]} [description]
     */
    $scope.createUser = function(){
        $scope.new_user.email_address = $scope.new_document.email_address;
        $userService.create($scope.new_user)
        .success(function(response) {
            $userService.set(response);
            $scope.createDocument();
        })
        .error(function(response) {
            console.log(response);
        });
    };


    /**
     * [recovery description]
     * @return {[type]} [description]
     */
    $scope.recovery = function(){
        // Loading screen
        $scope.tab = 4;

        $recoveryService.findByEmail($scope.recovery_user.email_address)
        .success(function(response) {
            // Reset
            $scope.recovery_user = $recoveryService.init();
            // Show dialog
            $window.alert("An email with your documents was sent!");
            // Redirect
            $scope.tab = 0;
        })
        .error(function(response) {
            console.log(response);
            // Redirect
            $scope.tab = 2;
            // TODO: Show dialog
            $window.alert("This email-address could not be found!");
            //$window.alert("No documents could be found with this email-address!");
        });
    };


});
