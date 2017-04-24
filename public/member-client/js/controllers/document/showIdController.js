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
     * [copyToClipboard description]
     * @return {[type]} [description]
     */
    $scope.copyToClipboard = function(){
        var copyTextarea = document.getElementById("documentId");
        copyTextarea.select();
        try {
            var successful = document.execCommand('copy');
            if(!successful){
                throw err;
            }
        } catch (err) {
            $window.alert('Unable to copy to Clipboard');
        }
        window.getSelection().removeAllRanges();
    };


    /*************************************************
        EVENTS
     *************************************************/
    $scope.$on("$destroy", function() {
        // Reset navbar
        delete $scope.document;
        delete $scope.$parent.document;
    });


    /*************************************************
        INIT
     *************************************************/
    $scope.$parent.loading = { status: true, message: "Loading document" };
    $scope.document = $documentService.get();

    // Update navbar
    $scope.$parent.document = $documentService.get();

    $scope.$parent.loading = { status: false, message: "" };

});
