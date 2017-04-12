var app = angular.module("ethics-app");


// Document title controller
app.controller("documentEditTitleController", function($scope, $rootScope, $translate, $location, config, $window, $documentService) {


    /**
     * [load description]
     * @return {[type]} [description]
     */
    $scope.load = function(){
        $scope.document = $documentService.get();
        $scope.updated_document = $documentService.copy();
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
    $scope.cancel = function(){
        // Reset
        $scope.updated_document = $documentService.copy();
        // Redirect
        $location.url("/documents/" + $documentService.getId() + "/status/" + $documentService.getStatus());
    };


    /**
     * [saveDocument description]
     * @return {[type]} [description]
     */
    $scope.saveDocument = function(){
        $documentService.edit($documentService.getId(), $scope.updated_document)
        .success(function(response) {
            $documentService.set(response);
            $scope.updated_document = $documentService.copy();

            // Update navbar
            $rootScope.$broadcast('updateNavbar');

            // Redirect
            $location.url("/documents/" + $documentService.getId() + "/status/" + $documentService.getStatus());
        })
        .error(function(response) {
            console.log(response);
        });
    };



});
