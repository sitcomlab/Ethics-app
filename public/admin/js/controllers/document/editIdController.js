var app = angular.module("ethics-app");


// Document ID controller
app.controller("documentEditIdController", function($scope, $rootScope, $translate, $location, config, $window, $documentService) {


    /**
     * [load description]
     * @return {[type]} [description]
     */
    $scope.load = function(){
        $scope.document = $documentService.get();
        // Redirect
        $scope.tab = 1;
    };


    // Init
    $scope.tab = 0;
    $scope.load();


    /**
     * [cancel description]
     * @return {[type]} [description]
     */
    $scope.close = function(){
        // Redirect
        $location.url("/documents/" + $documentService.getId() + "/status/" + $documentService.getStatus());
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
