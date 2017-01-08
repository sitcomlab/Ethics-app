var app = angular.module("ethics-app");


app.controller("navController", function($scope, $rootScope, $ngBootbox, $translate, $location, $log, config, $authenticationService, $documentService) {

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
     * [closeDocument description]
     * @return {[type]} [description]
     */
    $scope.closeDocument = function(){
        delete $scope.document;
        $documentService.set();
        // Redirect
        $location.url("/documents");
    };


    /**
     * [showUsers description]
     * @return {[type]} [description]
     */
    $scope.showUsers = function(){
        // Redirect
        $location.url("/users");
    };


    /**
     * [addUser description]
     */
    $scope.addUser = function(){
        // Redirect
        $location.url("/new/user");
    };


    /**
     * [showMembers description]
     * @return {[type]} [description]
     */
    $scope.showMembers = function(){
        // Redirect
        $location.url("/members");
    };


    /**
     * [addMember description]
     */
    $scope.addMember = function(){
        // Redirect
        $location.url("/new/member");
    };


    /**
     * Update Navbar, if user logged in
     * @type {[type]}
     */
    $rootScope.$on('updateNavbar', function() {
        $scope.user = $authenticationService.get();
        $scope.document = $documentService.get();
    });


    /**
     * Reset Navbar
     */
    $rootScope.$on('resetNavbar', function() {
        delete $scope.user;
        delete $scope.document;
    });


});
