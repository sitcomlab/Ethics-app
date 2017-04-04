var app = angular.module("ethics-app");

// Account controller
app.controller("accountDeleteController", function($scope, $rootScope, $translate, $location, config, $window, $authenticationService, $membersService) {

    /**
     * [load description]
     * @return {[type]} [description]
     */
    $scope.load = function(){
        $scope.authenticated_member = $authenticationService.get();
        $scope.updated_authenticated_member = $authenticationService.copy();

        // Redirect
        $scope.tab = 1;
    };

    // Init
    $scope.tab = 0;
    $scope.passwordRepeat = "";
    $scope.load();


    /**
     * [cancel description]
     * @return {[type]} [description]
     */
    $scope.cancel = function(){
        // Redirect
        $location.url("/members/" + $authenticationService.getId());
    };


    /**
     * [saveAccount description]
     * @return {[type]} [description]
     */
    $scope.saveAccount = function(){
        console.log($authenticationService.get());

        // Loading screen
        $scope.tab = 0;

        // Update member
        $authenticationService.editAccount($authenticationService.getId(), $scope.updated_authenticated_member)
        .success(function(response) {
            $authenticationService.set(response);

            // Update members
            $membersService.list()
            .success(function(response) {
                $membersService.set(response);

                // Redirect
                $location.url("/members/" + $authenticationService.getId());
            })
            .error(function(response) {
                $window.alert(response);
            });
        })
        .error(function(response) {
            $window.alert(response);
        });
    };


});
