var app = angular.module("ethics-app");

// Login controller
app.controller("loginController", function($scope, $rootScope, $translate, $location, config, $window, $authenticationService, $recoveryService, $documentsService, $documentService, $membersService, $memberService, $usersService, $userService) {

    // Reset
    $rootScope.$broadcast('resetNavbar');
    $authenticationService.set();
    $authenticationService.setToken();
    $documentsService.set();
    $documentService.set();
    $membersService.set();
    $memberService.set();
    $usersService.set();
    $userService.set();

    // Init
    $scope.tab = 1;
    $scope.login_user = $authenticationService.init();
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
    $scope.submitLogin = function(){
        $authenticationService.login($scope.login_user)
        .success(function(response) {
            $authenticationService.set(response);
            $authenticated_member = $authenticationService.get();
            $authenticationService.setToken($authenticated_member.token);
            // Redirect
            $location.url("/documents");
        })
        .error(function(response) {
            $window.alert(response);
        });
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
                $window.alert("An email was sent to you!");
                // Redirect
                $scope.tab = 1;
            })
            .error(function(response) {
                // Show dialog
                $window.alert(response);
                // Redirect
                $scope.tab = 2;
            });
        }
    };


});
