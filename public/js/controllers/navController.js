var app = angular.module("ethics-app");


app.controller("navController", function($scope, $rootScope, $ngBootbox, $translate, $location, $log, config, $documentService, $userService) {

    // Init
    $scope.config = config;


    /**
     * Highlight active menu button
     *
    $scope.isActive = function(viewLocation) {
        return viewLocation === $location.path();
    }; */


    /**
     * [changeTab description]
     * @param  {[type]} tab [description]
     * @return {[type]}     [description]
     */
    $scope.changeTab = function(tab){
        $rootScope.$broadcast('changeTab', {
            tab: tab
        });
    };


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
        $scope.document = $documentService.get();
        $scope.user = $userService.get();
    });


    /**
     * Reset Navbar
     */
    $rootScope.$on('resetNavbar', function() {
        delete $scope.document;
        delete $scope.user;
    });


});
