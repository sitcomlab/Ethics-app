var app = angular.module("ethics-app");


// Document shwo ID controller
app.controller("documentShowIdController", function($scope, $rootScope, $translate, $location, config, $window, $authenticationService, $documentService) {

    /*************************************************
        FUNCTIONS
     *************************************************/

    /**
     * [redirect description]
     * @param  {[type]} path [description]
     * @return {[type]}      [description]
     */
    $scope.redirect = function(path){
        $location.url(path);
    };

    /**
     * [cancel description]
     * @return {[type]} [description]
     */
     $scope.cancel = function(){
        $scope.redirect("/documents/" + $documentService.getId() + "/status/" + $documentService.getStatus());
     };

    /**
     * [copyToClipboard description]
     * @return {[type]} [description]
     */
    $scope.copyToClipboard = function(){
        // TODO: implement function
        $window.alert("Document-ID copied to clipboard");
    };


    /*************************************************
        INIT
     *************************************************/
    $scope.$parent.loading = { status: true, message: "Loading document" };
    $scope.document = $documentService.get();
    $scope.$parent.loading = { status: false, message: "" };
});
