var app = angular.module("ethics-app");


app.controller("navController", function($scope, $rootScope, $ngBootbox, $translate, $location, $log, config, $documentService, $userService) {

    // Init
    $scope.config = config;

    /**
     * [editUser description]
     * @param  {[type]} document_id [description]
     * @return {[type]}             [description]
     */
    $scope.editUser = function(document_id){
        // Redirect
        $location.url("/documents/" + document_id + "/user");
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
