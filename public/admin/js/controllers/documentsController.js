var app = angular.module("ethics-app");

// Documents controller
app.controller("documentsController", function($scope, $rootScope, $translate, $location, config, $window, $authenticationService, $documentsService) {

    // Init
    $scope.load = function(){
        // Loading screen
        $scope.tab = 0;

        // Check authentication
        if($authenticationService.authenticated()){

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
        } else {
            // Redirect
            $location.url("/");
        }
    };

    // Init
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

        // Check authentication
        if($authenticationService.authenticated()){
            $documentsService.list($scope.filter)
            .success(function(response) {
                $documentsService.set(response);
                $scope.documents = $documentsService.get();
            })
            .error(function(response) {
                $window.alert(response);
            });
        } else {
            // Redirect
            $location.url("/");
        }
    };


    /**
     * [showDetails description]
     * @return {[type]} [description]
     */
    $scope.showDetails = function(document_id){
        // Redirect
        $location.url("/documents/" + document_id);
    };

});
