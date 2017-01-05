var app = angular.module("ethics-app");

// Login controller
app.controller("loginController", function($scope, $rootScope, $translate, $location, config, $window) {

    // Reset
    //$rootScope.$broadcast('resetNavbar');
    //$userService.set();
    //delete $scope.user;

    // Init
    $scope.tab = 1;
    //$scope.login_document = $loginService.init();
    //$scope.recovery_user = $recoveryService.init();

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

    };


    /**
     * [recovery description]
     * @return {[type]} [description]
     *
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
    };*/


});
