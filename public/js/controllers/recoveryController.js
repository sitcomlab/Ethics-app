var app = angular.module("ethics-app");

// Login controller
app.controller("recoveryController", function($scope, $rootScope, $translate, $location, config, $window, $authenticationService, $recoveryService, $documentService){

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
     * [changeTab description]
     * @param  {[type]} tab [description]
     * @return {[type]}     [description]
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
        if($scope.recoveryForm.$invalid) {
            // Update UI
            $scope.recoveryForm.email_address.$pristine = false;
        } else {
            $scope.changeTab(0);

            $recoveryService.findByEmail($scope.recovery.email_address)
            .success(function(response) {
                // Reset
                $scope.recovery.email_address = $authenticationService.getEmailAddress() || "";

                // Show info
                $window.alert("An email with your document-IDs was sent!");

                // Redirect
                if($authenticationService.get()){
                    $scope.redirect("/documents/" + $documentService.getId() + "/status/" + $documentService.getStatus());
                } else {
                    $scope.redirect("/");
                }

            })
            .error(function(response) {
                $window.alert("This email-address could not be found!");
            });
        }
    };


    /*************************************************
        INIT
     *************************************************/
    $scope.changeTab(0);
    $scope.recovery = {
        email_address: $authenticationService.getEmailAddress() || ""
    };
    $scope.changeTab(1);

});
