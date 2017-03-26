var app = angular.module("ethics-app");


// Member details controller
app.controller("memberDetailsController", function($scope, $rootScope, $routeParams, $translate, $location, config, $window, $authenticationService, $documentService, $membersService) {

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
            $scope.redirect("/");
        }
    };


    /*************************************************
        INIT
     *************************************************/
    $scope.$parent.loading = { status: true, message: "Loading committee member" };

    $membersService.retrieve($routeParams.member_id)
    .then(function onSuccess(response) {
        $scope.member = response.data;
        $scope.$parent.loading = { status: false, message: "" };
    })
    .catch(function onError(response) {
        $window.alert(response.data);
    });


});
