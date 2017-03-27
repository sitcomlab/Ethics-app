var app = angular.module("ethics-app");


// Document edit title controller
app.controller("documentEditTitleController", function($scope, $rootScope, $translate, $location, config, $window, $authenticationService, $documentService) {

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
        if($authenticationService.get()){
            $scope.redirect("/documents/" + $documentService.getId() + "/status/" + $documentService.getStatus());
        } else {
            $scope.redirectl("/");
        }
    };

    /**
     * [saveDocument description]
     * @return {[type]} [description]
     */
    $scope.saveDocument = function(){
        $scope.$parent.loading = { status: true, message: "Saving document" };

        $documentService.edit($documentService.getId(), $scope.updated_document)
        .then(function onSuccess(response) {
            $documentService.set(response.data);
            $scope.updated_document = $documentService.copy();

            // Update navbar
            $rootScope.$broadcast('updateNavbar');

            $scope.redirect("/documents/" + $documentService.getId());
        })
        .catch(function onError(response) {
            $window.alert(response.data);
        });
    };


    /*************************************************
        INIT
     *************************************************/
    $scope.$parent.loading = { status: true, message: "Loading document" };
    $scope.document = $documentService.get();
    $scope.updated_document = $documentService.copy();
    $scope.$parent.loading = { status: false, message: "" };

});
