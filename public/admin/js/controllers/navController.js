var app = angular.module("ethics-app");


app.controller("navController", function($scope, $rootScope, $ngBootbox, $translate, $location, $log, config, $authenticationService) {

    // Init
    $scope.config = config;


    /**
     * [logout description]
     * @return {[type]} [description]
     */
    $scope.logout = function(){
        delete $scope.document;
        delete $scope.user;
        // Redirect
        $location.url("/");
    };


    /**
     * Update Navbar, if user logged in
     * @type {[type]}
     */
    $rootScope.$on('updateNavbar', function() {
        $scope.user = $authenticationService.get();
    });


    /**
     * Reset Navbar
     */
    $rootScope.$on('resetNavbar', function() {
        delete $scope.user;
    });


});
