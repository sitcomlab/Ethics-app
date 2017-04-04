var app = angular.module("ethics-app");

// User controller
app.controller("userDetailsController", function($scope, $rootScope, $translate, $location, config, $window, $userService) {

    /**
     * [load description]
     * @return {[type]} [description]
     */
    $scope.load = function(){
        $scope.user = $userService.get();
        $scope.user.documents = [];

        // Load documents
        $userService.listDocuments($userService.getId())
        .success(function(response) {
            console.log(response);
            $userService.setDocuments(response);
            $scope.user.documents = $userService.getDocuments();
        })
        .error(function(response) {
            $window.alert(response);
        });

        // Redirect
        $scope.tab = 1;
    };

    // Init
    $scope.tab = 0;
    $scope.load();


    /**
     * [close description]
     * @return {[type]} [description]
     */
    $scope.close = function(){
        // Redirect
        $location.url("/users");
    };


    /**
     * [showDetails description]
     * @param  {[type]} document [description]
     * @return {[type]}          [description]
     */
    $scope.showDetails = function(document){
        // Redirect
        $location.url("/documents/" + document.document_id);
    };


    /**
     * [editUser description]
     * @return {[type]} [description]
     */
    $scope.editUser = function(){
        // Redirect
        $location.url("/users/" + $userService.getId() + "/edit");
    };


    /**
     * [deleteUser description]
     * @return {[type]} [description]
     */
    $scope.deleteUser = function(){
        // Redirect
        $location.url("/users/" + $userService.getId() + "/delete");
    };

});
