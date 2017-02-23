var app = angular.module("ethics-app");

// Member controller
app.controller("memberDetailsController", function($scope, $rootScope, $routeParams, $translate, $location, config, $window, $memberService, $authenticationService) {

    /**
     * [load description]
     * @return {[type]} [description]
     */
    $scope.load = function(){
        $memberService.retrieve($routeParams.member_id)
        .success(function(response) {
            $memberService.set(response);
            $scope.member = $memberService.get();
        })
        .error(function(response) {
            $window.alert(response);
        });

        // Redirect
        $scope.tab = 1;
    };

    // Init
    $scope.tab = 0;
    $scope.authenticated_member = $authenticationService.get();
    $scope.load();


    /**
     * [close description]
     * @return {[type]} [description]
     */
    $scope.close = function(){
        // Redirect
        $location.url("/members");
    };


    /**
     * [editMember description]
     * @return {[type]} [description]
     */
    $scope.editMember = function(){
        if($scope.member.member_id === $authenticationService.getId()){
            // Redirect
            $location.url("/account");
        } else {
            // Redirect
            $location.url("/members/" + $scope.member.member_id + "/edit");
        }
    };

});
