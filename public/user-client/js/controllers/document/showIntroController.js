var app = angular.module("ethics-app");


// Document show intro controller
app.controller("documentShowIntroController", function($scope, $rootScope, $filter, $translate, $location, config, $window, $authenticationService, $documentService) {

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

    /**
     * [cancel description]
     * @return {[type]} [description]
     */
    $scope.cancel = function(){
        $scope.redirect("/documents/" + $documentService.getId() + "/status/" + $documentService.getStatus());
    };

    /**
     * [send description]
     * @return {[type]} [description]
     */
    $scope.send = function(){
        $scope.$parent.loading = { status: true, message: "Auto saving" };

        if($documentService.getStatus()===0){
            // Confirm intro
            $documentService.confirmIntro($documentService.getId())
            .then(function onSuccess(response) {
                $documentService.set(response.data);

                // Update navbar
                $rootScope.$broadcast('updateNavbar');

                $scope.redirect("/documents/" + $documentService.getId());
            })
            .catch(function onError(response) {
                $window.alert(response.data);
            });
        } else {
            $scope.redirect("/documents/" + $documentService.getId() + "/status/" + $documentService.getStatus());
        }
    };


    /*************************************************
        INIT
     *************************************************/
    $scope.$parent.loading = { status: true, message: "Loading document" };
    $scope.document = $documentService.get();
    $scope.$parent.loading = { status: false, message: "" };


});
