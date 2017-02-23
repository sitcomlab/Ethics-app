var app = angular.module("ethics-app");


// Document delete controller
app.controller("documentDeleteController", function($scope, $rootScope, $translate, $location, config, $window, $documentService) {


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
    $scope.input = "";
    $scope.load();


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
            // Reset
            $documentService.set();

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
