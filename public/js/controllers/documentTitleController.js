var app = angular.module("ethics-app");


// Document title controller
app.controller("documentTitleController", function($scope, $rootScope, $routeParams, $translate, $location, config, $window, $documentService) {


    // Init
    if($documentService.get()){
        $scope.document = $documentService.get();
        $scope.updated_document = $documentService.copy();
    } else {
        // Redirect
        $location.url("/");
    }


    /**
     * [cancel description]
     * @return {[type]} [description]
     */
    $scope.cancel = function(){
        // Reset
        $scope.updated_document = $documentService.copy();
        // Redirect
        $location.url("/documents/" + $routeParams.document_id);
    };


    /**
     * [saveDocument description]
     * @return {[type]} [description]
     */
    $scope.saveDocument = function(){
        $documentService.edit($documentService.getId(), $scope.updated_document)
        .success(function(response) {
            var _revisions = $documentService.getRivisions();
            $documentService.set(response);
            $documentService.setRevisions(_revisions);
            $scope.document = $documentService.get();
            $scope.updated_document = $documentService.copy();

            // Redirect
            $location.url("/documents/" + $routeParams.document_id);

            // Update navbar
            $rootScope.$broadcast('updateNavbar');

        })
        .error(function(response) {
            console.log(response);
        });
    };



});
