var app = angular.module("ethics-app");

// Login by document controller
app.controller("loginByDocumentController", function($scope, $rootScope, $routeParams, $filter, $translate, $location, config, $authenticationService, $documentService, $window) {

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
        if($scope.loginForm.$invalid) {
            // Update UI
            $scope.loginForm.username.$pristine = false;
            $scope.loginForm.password.$pristine = false;
        } else {
            $scope.$parent.loading = { status: true, message: "Logging in" };

            $authenticationService.login($scope.login_member)
            .then(function onSuccess(response) {
                $authenticationService.set(response.data);

                // Reset navbar
                $scope.$parent.authenticated_member = $authenticationService.get();
                $scope.$parent.loading = { status: false, message: "" };

                // Redirect
                $location.url("/documents/" + $routeParams.document_id);
            })
            .catch(function onError(response) {
                $window.alert(response.data);

                // Reset
                $scope.login_member = $authenticationService.init();
                $scope.$parent.loading = { status: false, message: "" };
            });
        }
    };

    /*************************************************
        INIT
     *************************************************/
    $scope.$parent.loading = { status: true, message: "Loading application" };

    // Reset all services
    $authenticationService.set();
    $documentService.set();

    // Reset navbar
    $scope.$parent.authenticated_member = $authenticationService.get();
    $scope.$parent.document = $documentService.get();

    // Reset login
    $scope.login_member = $authenticationService.init();
    $scope.$parent.loading = { status: false, message: "" };

});
