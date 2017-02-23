var app = angular.module("ethics-app");


// Document shwo ID controller
app.controller("documentShowIdController", function($scope, $rootScope, $translate, $location, config, $window, $authenticationService, $documentService) {

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
            $scope.redirect("/");
        }
     };

    /**
     * [copyToClipboard description]
     * @return {[type]} [description]
     */
    $scope.copyToClipboard = function(){
        // TODO: implement function
        $window.alert("Document-ID copied to clipboard");
    };


    /*************************************************
        INIT
     *************************************************/
    $scope.changeTab(0);
    $scope.document = $documentService.get();
    $scope.changeTab(1);
});
