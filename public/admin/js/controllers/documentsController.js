var app = angular.module("ethics-app");

// Documents controller
app.controller("documentsController", function($scope, $rootScope, $translate, $location, config, $window, $authenticationService, $documentsService, $documentService) {

    // Init
    $scope.load = function(){
        $documentsService.list($scope.filter)
        .success(function(response) {
            $documentsService.set(response);
            $scope.documents = $documentsService.get();

            // Redirect
            $scope.tab = 1;
        })
        .error(function(response) {
            $window.alert(response);
        });
    };

    // Init
    $scope.tab = 0;
    $scope.load();
    $scope.filter = "";
    $scope.searchText = "";


    /**
     * [resetSearch description]
     */
    $scope.resetSearch = function(){
        $scope.searchText = "";
    };


    /**
     * [filterDocuments description]
     * @return {[type]} [description]
     */
    $scope.filterDocuments = function(){
        $documentsService.set();
        $scope.documents = $documentsService.get();
        $scope.load();
    };


    /**
     * [showDetails description]
     * @return {[type]} [description]
     */
    $scope.showDetails = function(document){
        $documentService.set(document);
        // Redirect
        $location.url("/documents/" + $documentService.getId());
    };

});
