var app = angular.module("ethics-app");


// Member details controller
app.controller("memberDetailsController", function($scope, $rootScope, $routeParams, $translate, $location, config, $window, $authenticationService, $documentService, $membersService) {

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


    /*************************************************
        INIT
     *************************************************/
    $scope.changeTab(0);

    $membersService.retrieve($routeParams.member_id)
    .success(function(response) {
        $scope.changeTab(1);
        $scope.member = response;
    })
    .error(function(response) {
        $window.alert(response);
    });


});
