var app = angular.module("ethics-app");

// Login controller
app.controller("recoveryController", function($scope, $rootScope, $translate, $location, config, $window, $authenticationService, $recoveryService, $documentService){

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
     * [send description]
     * @return {[type]} [description]
     */
    $scope.send = function(){
        // Validate input
        if($scope.recoveryForm.$invalid) {
            // Update UI
            $scope.recoveryForm.email_address.$pristine = false;
        } else {
            $scope.$parent.loading = { status: true, message: "Searching for Email-address" };

            $recoveryService.findByEmail($scope.recovery.email_address)
            .then(function onSuccess(response) {
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
            .catch(function onError(response) {
                $window.alert("This email-address could not be found!");

                // Reset
                $scope.recoveryForm.email_address.$pristine = false;
                $scope.$parent.loading = { status: false, message: "" };
            });
        }
    };


    /*************************************************
        INIT
     *************************************************/
    $scope.recovery = {
        email_address: $authenticationService.getEmailAddress() || ""
    };
    $scope.$parent.loading = { status: false, message: "" };

});
