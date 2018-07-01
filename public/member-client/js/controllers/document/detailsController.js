var app = angular.module("ethics-app");


// Document details controller
app.controller("documentDetailsController", function($scope, $rootScope, $routeParams, $filter, $translate, $location, config, $window, $q, $timeout, $authenticationService, $documentService, $documentsService, $revisionService, $descriptionService, $concernService, $commentService, $reviewerService, $fileService, $noteService) {

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
        INIT
     *************************************************/
    $scope.$parent.loading = { status: true, message: $filter('translate')('LOADING_DOCUMENT') };

    // Reset
    $documentService.set();

    // Reset navbar
    $scope.$parent.document = false;

    // Load document v2
    $documentService.retrieve_v2($routeParams.document_id)
    .then(function onSuccess(response) {
        $documentService.set(response.data);
        $scope.$parent.loading = { status: false, message: "" };

        // Redirect
        $scope.redirect("/documents/" + $routeParams.document_id + "/overview");
    })
    .catch(function onError(response) {
        $window.alert(response.data);
        $scope.redirect("/documents");
    });
});
