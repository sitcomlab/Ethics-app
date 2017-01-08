var app = angular.module("ethics-app");

// Members controller
app.controller("membersController", function($scope, $rootScope, $translate, $location, config, $window, $membersService, $memberService) {

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
    $scope.load();
    $scope.searchText = "";


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
