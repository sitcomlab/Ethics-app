var app = angular.module("ethics-app");


// Document ID controller
app.controller("documentIdController", function($scope, $rootScope, $routeParams, $translate, $location, config, $window, $documentService) {


    // Init
    if($documentService.get()){
        $scope.document = $documentService.get();
    } else {
        // Redirect
        $location.url("/");
    }


    /**
     * [cancel description]
     * @return {[type]} [description]
     */
    $scope.cancel = function(){
        // Redirect
        $location.url("/documents/" + $documentService.getId());
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
