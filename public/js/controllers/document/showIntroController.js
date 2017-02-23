var app = angular.module("ethics-app");


// Document show intro controller
app.controller("documentShowIntroController", function($scope, $rootScope, $translate, $location, config, $window, $authenticationService, $documentService) {

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
     * [send description]
     * @return {[type]} [description]
     */
    $scope.send = function(){
        $scope.changeTab(0);

        if($documentService.getStatus()===0){
            // Confirm intro
            $documentService.confirmIntro($documentService.getId())
            .success(function(response) {
                $documentService.set(response);

                // Update navbar
                $rootScope.$broadcast('updateNavbar');

                $scope.redirect("/documents/" + $documentService.getId());
            })
            .error(function(response) {
                console.log(response);
            });
        } else {
            $scope.redirect("/documents/" + $documentService.getId() + "/status/" + $documentService.getStatus());
        }
    };


    /*************************************************
        INIT
     *************************************************/
    $scope.changeTab(0);
    $scope.document = $documentService.get();
    $scope.changeTab(1);


});
