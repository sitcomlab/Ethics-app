var app = angular.module("ethics-app");


// Member delete controller
app.controller("memberDeleteController", function($scope, $rootScope, $routeParams, $filter, $translate, $location, config, $window, $authenticationService, $memberService) {

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
     * [description]
     * @return {[type]} [description]
     */
    $scope.delete = function(){
        $scope.$parent.loading = { status: true, message: "Deleting committee member" };

        // Delete member
        $memberService.remove($scope.member.member_id)
        .then(function onSuccess(response) {
            $scope.redirect("/members");
        })
        .catch(function onError(response) {
            $window.alert(response.data);
        });
    };

    /*************************************************
        INIT
     *************************************************/
    $scope.$parent.loading = { status: true, message: "Loading committee member" };
    $scope.input = "";

    // Load member
    $memberService.retrieve($routeParams.member_id)
    .then(function onSuccess(response) {
        $scope.member = response.data;

        // Create full name
        if($scope.member.title !== null){
            $scope.member.fullname = $scope.member.title + " " + $scope.member.first_name + " " + $scope.member.last_name;
        } else {
            $scope.member.fullname = $scope.member.first_name + " " + $scope.member.last_name;
        }

        $scope.$parent.loading = { status: false, message: "" };
    })
    .catch(function onError(response) {
        $window.alert(response.data);
    });
});
