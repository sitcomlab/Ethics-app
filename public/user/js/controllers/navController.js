var app = angular.module("ethics-app");


app.controller("navController", function($scope, $rootScope, $ngBootbox, $translate, $location, $log, config, $documentService, $authenticationService) {

    /*************************************************
        FUNCTIONS
     *************************************************/

    /**
     * [editUser description]
     * @param  {[type]} document_id [description]
     * @return {[type]}             [description]
     */
    $scope.editAccount = function(){
        $scope.redirect("/account/edit");
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
     * [showDocumentIntro description]
     * @param  {[type]} document_id [description]
     * @return {[type]}             [description]
     */
    $scope.showDocumentIntro = function(document_id){
        $scope.redirect("/documents/" + document_id + "/intro");
    };


    /**
     * [showDocumentId description]
     * @param  {[type]} document_id [description]
     * @return {[type]}             [description]
     */
    $scope.showDocumentId = function(document_id){
        $scope.redirect("/documents/" + document_id + "/id");
    };

    /**
     * [editDocumentTitle description]
     * @param  {[type]} document_id [description]
     * @return {[type]}             [description]
     */
    $scope.editDocumentTitle = function(document_id){
        $scope.redirect("/documents/" + document_id + "/title");
    };


    /**
     * [deleteDocument description]
     * @param  {[type]} document_id [description]
     * @return {[type]}             [description]
     */
    $scope.deleteDocument = function(document_id){
        $scope.redirect("/documents/" + document_id + "/delete");
    };


    /**
     * [showMembers description]
     * @return {[type]} [description]
     */
    $scope.showMembers = function(){
        $scope.redirect("/members");
    };


    /**
     * [logout description]
     * @return {[type]} [description]
     */
    $scope.logout = function(){
        delete $scope.document;
        delete $scope.authenticated_user;
        $scope.redirect("/");
    };


    /*************************************************
        EVENT LISTENERS
     *************************************************/

    /**
     * [document description]
     * @type {[type]}
     */
    $rootScope.$on('updateNavbar', function() {
        $scope.document = $documentService.get();
        $scope.authenticated_user = $authenticationService.get();
    });


    /**
     *
     */
    $rootScope.$on('resetNavbar', function() {
        delete $scope.document;
        delete $scope.authenticated_user;
    });


    /*************************************************
        INIT
     *************************************************/
    $scope.config = config;
});
