var app = angular.module("ethics-app");


// Document status 1 controller
app.controller("statusController_1", function($scope, $rootScope, $routeParams, $translate, $location, config, $window, $documentService, $revisionService) {


    // Init
    if($documentService.get()){
        $scope.document = $documentService.get();
        $scope.updated_document = $documentService.copy();

        // Load revision
        $revisionService.listByDocument($documentService.getId())
        .success(function(response) {
            $documentService.setRevisions(response);
            $scope.document = $documentService.get();
            $scope.updated_document = $documentService.copy();

            $scope.page = 0;
            $scope.en = true;

            /* Load description
            $descriptionService.get($documentService.getId(), $documentService.getLatestRevisionId())
            .success(function(response) {
                $documentService.setDescriptions(response);

                // Load languages of descriptions
                $scope.en = true;
                $scope.de = $documentService.getGermanSupport();
            })
            .error(function(response) {
                console.log(response);
            });*/

        })
        .error(function(response) {
            console.log(response);
        });
    } else {
        // Redirect
        $location.url("/");
    }


    /**
     * [nextPage description]
     * @return {[type]} [description]
     */
    $scope.nextPage = function(){
        $scope.page = $scope.page+1;
    };


    /**
     * [previousPage description]
     * @return {[type]} [description]
     */
    $scope.previousPage = function(){
        $scope.page = $scope.page-1;
    };


});
