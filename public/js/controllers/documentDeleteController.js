var app = angular.module("ethics-app");


// Document delete controller
app.controller("documentDeleteController", function($scope, $rootScope, $routeParams, $translate, $location, config, $window, $documentService) {


    // Init
    if($documentService.get()){
        $scope.document = $documentService.get();
        $scope.input = "";
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
     * [deleteDocument description]
     * @return {[type]} [description]
     */
    $scope.deleteDocument = function(){
        $documentService.delete($documentService.getId())
        .success(function(response) {
            // Update navbar
            $rootScope.$broadcast('resetNavbar');
            // Redirect
            $location.url("/");
        })
        .error(function(response) {
            console.log(response);
        });
    };

});
