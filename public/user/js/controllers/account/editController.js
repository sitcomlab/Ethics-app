var app = angular.module("ethics-app");


// Account edit controller
app.controller("accountEditController", function($scope, $rootScope, $translate, $location, config, $window, $authenticationService, $documentService, $userService) {

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
     * [saveDocument description]
     * @return {[type]} [description]
     */
    $scope.save = function(){
        $scope.$parent.loading = { status: true, message: "Saving account settings" };

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
    $scope.$parent.loading = { status: true, message: "Loading account settings" };
    $scope.authenticated_user = $authenticationService.get();
    $scope.updated_user = $authenticationService.copy();
    $scope.$parent.loading = { status: false, message: "" };

});
