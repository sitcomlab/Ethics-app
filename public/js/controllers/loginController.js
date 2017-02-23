var app = angular.module("ethics-app");

// Login controller
app.controller("loginController", function($scope, $rootScope, $translate, $location, config, $authenticationService, $userService, $documentService, $fileService, $window) {

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
     * [send description]
     * @return {[type]} [description]
     */
    $scope.send = function(){
        // Validate input
        if($scope.loginForm.$invalid) {
            // Update UI
            $scope.loginForm.document_id.$pristine = false;
        } else {
            $scope.changeTab(0);
            $scope.redirect("/documents/" + $scope.login.document_id);
        }
    };


    /**
     * [createDoc description]
     * @return {[type]} [description]
     */
    $scope.createDocument = function(){
        $scope.redirect("/new/document");
    };


    /**
     * [recovery description]
     * @return {[type]} [description]
     */
    $scope.recovery = function(){
        $scope.redirect("/recovery");
    };


    /*************************************************
        INIT
     *************************************************/
    $scope.changeTab(0);

    // Reset all services
    $authenticationService.set();
    $documentService.set();
    $userService.set();
    $fileService.set();

    // Reset navbar
    $rootScope.$broadcast('resetNavbar');

    // Reset login
    $scope.login = $authenticationService.init();
    $scope.changeTab(1);
});
