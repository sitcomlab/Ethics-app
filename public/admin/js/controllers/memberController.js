var app = angular.module("ethics-app");

// Member controller
app.controller("memberController", function($scope, $rootScope, $translate, $location, config, $window, $memberService) {

    /**
     * [load description]
     * @return {[type]} [description]
     */
    $scope.load = function(){
        $scope.member = $memberService.get();

        // Redirect
        $scope.tab = 1;
    };

    // Init
    $scope.tab = 0;
    $scope.load();

});
