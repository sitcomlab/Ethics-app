var app = angular.module("ethics-app");

// Recovery controller
app.controller("recoveryController", function($scope, $rootScope, $filter, $translate, $location, config, $window, $recoveryService){

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
            $scope.$parent.loading = { status: true, message: $filter('translate')('SEARCHING_FOR_EMAIL_ADDRESS') };

            $recoveryService.findByEmail($scope.recovery.email_address)
            .then(function onSuccess(response) {
                // Reset
                $scope.recovery.email_address = "";

                // Show info
                $window.alert($filter('translate')('ALERT_RESET_EMAIL_SENT'));

                // Redirect
                $scope.redirect("/");
            })
            .catch(function onError(response) {
                $window.alert($filter('translate')('ALERT_EMAIL_ADDRESS_NOT_FOUND'));

                // Reset
                $scope.recoveryForm.email_address.$pristine = false;
                $scope.$parent.loading = { status: false, message: "" };
            });
        }
    };


    /*************************************************
        INIT
     *************************************************/
    $scope.recovery = { email_address: "" };
    $scope.$parent.loading = { status: false, message: "" };

});
