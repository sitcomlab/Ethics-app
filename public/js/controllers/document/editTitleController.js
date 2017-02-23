var app = angular.module("ethics-app");


// Document edit title controller
app.controller("documentEditTitleController", function($scope, $rootScope, $translate, $location, config, $window, $authenticationService, $documentService) {

    /*************************************************
        FUNCTIONS
     *************************************************/

    /**
     * [changeTab description]
     * @param  {[type]} tab [description]
     * @return {[type]}     [description]
     */
    $scope.changeTab = function(tab){
        $scope.tab = tab;
    };

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
        $scope.changeTab(0);

        $documentService.edit($documentService.getId(), $scope.updated_document)
        .success(function(response) {
            $documentService.set(response);
            $scope.updated_document = $documentService.copy();

            // Update navbar
            $rootScope.$broadcast('updateNavbar');

            $scope.redirect("/documents/" + $documentService.getId());
        })
        .error(function(response) {
            $window.alert(response);
        });
    };


    /*************************************************
        INIT
     *************************************************/
    $scope.changeTab(0);
    $scope.document = $documentService.get();
    $scope.updated_document = $documentService.copy();
    $scope.changeTab(1);

});
