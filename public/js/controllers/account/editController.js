var app = angular.module("ethics-app");


// Account edit controller
app.controller("accountEditController", function($scope, $rootScope, $translate, $location, config, $window, $authenticationService, $documentService, $userService) {

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
            $scope.redirect("/documents/" + $documentService.getId());
        } else {
            $scope.redirect("/");
        }
    };

    /**
     * [saveDocument description]
     * @return {[type]} [description]
     */
    $scope.save = function(){
        $scope.changeTab(0);

        $userService.edit($authenticationService.getId(), $scope.updated_user)
        .then(function onSuccess(response) {
            $authenticationService.set(response.data);

            // Update navbar
            $rootScope.$broadcast('updateNavbar');

            $scope.redirect("/documents/" + $documentService.getId() + "/status/" + $documentService.getStatus());
        })
        .catch(function onError(response) {
            $window.alert(response.data);
        });
    };

    /*************************************************
        INIT
     *************************************************/
    $scope.changeTab(0);
    $scope.authenticated_user = $authenticationService.get();
    $scope.updated_user = $authenticationService.copy();
    $scope.changeTab(1);

});
