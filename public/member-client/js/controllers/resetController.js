var app = angular.module("ethics-app");


// Reset password controller
app.controller("resetController", function($scope, $rootScope, $routeParams, $filter, $translate, $location, config, $window, $recoveryService) {

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
     * [save description]
     * @return {[type]} [description]
     */
    $scope.save = function(){
        // Validate input
        if($scope.resetForm.$invalid) {
            // Update UI
            $scope.resetForm.password.$pristine = false;
            $scope.resetForm.repeated_password.$pristine = false;
        } else {

            // Reset password
            $recoveryService.resetPassword($scope.updated_member)
            .then(function onSuccess(response) {

                // Redirect
                $scope.redirect("/");
            })
            .catch(function onError(response) {
                $window.alert(response.data);
            });
        }
    };


    /*************************************************
        INIT
     *************************************************/

    // Check if token was sent
    if(!$routeParams.token || $routeParams.token === ""){
        $scope.redirect("/");
    } else {
        $scope.updated_member = {
            token: $routeParams.token,
            password: ""
        };
        $scope.repeated_password = "";
    }

});
