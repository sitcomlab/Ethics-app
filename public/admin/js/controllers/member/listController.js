var app = angular.module("ethics-app");

// Members controller
app.controller("memberListController", function($scope, $rootScope, $translate, $location, config, $window, $membersService, $memberService, $authenticationService) {

    // Init
    $scope.load = function(){
        $membersService.list()
        .success(function(response) {
            $membersService.set(response);
            $scope.members = $membersService.get();

            // Redirect
            $scope.tab = 1;
        })
        .error(function(response) {
            $window.alert(response);
        });
    };

    // Init
    $scope.tab = 0;
    $scope.searchText = "";
    $scope.authenticated_member = $authenticationService.get();
    $scope.load();


    /**
     * [resetSearch description]
     */
    $scope.resetSearch = function(){
        $scope.searchText = "";
    };


    /**
     * [showDetails description]
     * @return {[type]} [description]
     */
    $scope.showDetails = function(member){
        $memberService.set(member);
        // Redirect
        $location.url("/members/" + $memberService.getId());
    };

});
