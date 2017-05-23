var app = angular.module("ethics-app");


// Document shwo files controller
app.controller("documentShowFilesController", function($scope, $rootScope, $routeParams, $filter, $translate, $location, config, $window, $authenticationService, $documentService) {

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
    $scope.$parent.loading = { status: true, message: $filter('translate')('LOADING_DOCUMENT') };

    // Update navbar
    $scope.$parent.document = $documentService.get();

    // Check status of document to generate files
    if($documentService.getStatus()===2 || $documentService.getStatus()===6){
        $scope.$parent.loading = { status: true, message: $filter('translate')('GENERATING_FILES') };

        // Generate files on server
        $documentService.generateFiles($routeParams.document_id)
        .then(function onSuccess(response) {
            $documentService.setFiles(response.data);
            $scope.document = $documentService.get();
            $scope.latest_revision = $documentService.getLatestRevision();
            $scope.$parent.loading = { status: false, message: "" };
        })
        .catch(function onError(response) {
            $window.alert(response.data);

            // Redirect
            $scope.redirect("/documents/" + $routeParams.document_id + "/overview");
        });
    } else {
        $window.alert($filter('translate')('ALERT_FILE_GENERATION_FAILED'));

        // Redirect
        $scope.redirect("/documents/" + $routeParams.document_id + "/overview");
    }

});
