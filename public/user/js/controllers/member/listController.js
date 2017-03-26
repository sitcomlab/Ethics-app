var app = angular.module("ethics-app");


// Member list controller
app.controller("memberListController", function($scope, $rootScope, $translate, $location, config, $window, $authenticationService, $documentService, $membersService) {

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
    $scope.$parent.loading = { status: true, message: "Loading committee members" };

    $membersService.list()
    .then(function onSuccess(response) {
        $scope.$parent.loading = { status: false, message: "" };
        $scope.members = response.data;

        // TODO: Implement former_members
        //$scope.former_members = [$scope.members[2]];
    })
    .catch(function onError(response) {
        $window.alert(response.data);
    });


});
