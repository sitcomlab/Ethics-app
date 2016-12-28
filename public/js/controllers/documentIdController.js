var app = angular.module("ethics-app");


// Document ID controller
app.controller("documentIdController", function($scope, $rootScope, $routeParams, $translate, $location, config, $window) {


    // Init
    $scope.document_id = $routeParams.document_id;


    /**
     * [cancel description]
     * @return {[type]} [description]
     */
    $scope.cancel = function(){
        // Redirect
        $location.url("/documents/" + $routeParams.document_id);
    };


    /**
     * [copyToClipboard description]
     * @return {[type]} [description]
     */
    $scope.copyToClipboard = function(){
        // TODO:
        // Show dialog
        $window.alert("Document-ID copied to clipboard");
    };


});
