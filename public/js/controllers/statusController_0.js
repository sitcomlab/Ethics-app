var app = angular.module("ethics-app");


// Document status 0 controller
app.controller("statusController_0", function($scope, $rootScope, $routeParams, $translate, $location, config, $window, $documentService) {


    // Init
    if($documentService.get()){
        $scope.document = $documentService.get();
        $scope.updated_document = $documentService.copy();
        // Check status
        if($scope.document.status !== 0){
            // Redirect
            $location.url("/documents/" + $documentService.getId());
        }
    } else {
        // Redirect
        $location.url("/");
    }

    /**
     * [confirmIntro description]
     * @return {[type]} [description]
     */
    $scope.confirmIntro = function(){
        console.log($documentService.getId());
        $documentService.confirmIntro($documentService.getId())
        .success(function(response) {
            $documentService.set(response);
            $scope.document = $documentService.get();
            $scope.updated_document = $documentService.copy();

            // Update navbar
            $rootScope.$broadcast('updateNavbar');

            // Redirect
            $location.url("/documents/" + $documentService.getId());
        })
        .error(function(response) {
            console.log(response);
        });
    };
});
