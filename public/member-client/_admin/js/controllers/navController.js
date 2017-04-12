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
        delete $scope.authenticated_member;
        // Redirect
        $location.url("/");
    };

    /**
     * [showDocumentId description]
     * @param  {[type]} document_id [description]
     * @return {[type]}             [description]
     */
    $scope.showDocumentId = function(document_id){
        // Redirect
        $location.url("/documents/" + document_id + "/id");
    };

    /**
     * [changeDocumentTitle description]
     * @param  {[type]} document_id [description]
     * @return {[type]}             [description]
     */
    $scope.changeDocumentTitle = function(document_id){
        // Redirect
        $location.url("/documents/" + document_id + "/title");
    };


    /**
     * [deleteDocument description]
     * @param  {[type]} document_id [description]
     * @return {[type]}             [description]
     */
    $scope.deleteDocument = function(document_id){
        // Redirect
        $location.url("/documents/" + document_id + "/delete");
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
     * [showDocuments description]
     * @return {[type]} [description]
     */
    $scope.showAccount = function(){
        // Redirect
        $location.url("/account");
    };


    /**
     * [showDocuments description]
     * @return {[type]} [description]
     */
    $scope.showDocuments = function(){
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
        $scope.authenticated_member = $authenticationService.get();
        $scope.document = $documentService.get();
    });


    /**
     * Reset Navbar
     */
    $rootScope.$on('resetNavbar', function() {
        delete $scope.authenticated_member;
        delete $scope.document;
    });


});
