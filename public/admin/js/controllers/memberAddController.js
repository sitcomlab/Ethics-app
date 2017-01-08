var app = angular.module("ethics-app");

// Member add controller
app.controller("userAddController", function($scope, $rootScope, $translate, $location, config, $window, $memberService) {

    /**
     * [load description]
     * @return {[type]} [description]
     */
    $scope.load = function(){
        $scope.new_member = $memberService.init();

        // Redirect
        $scope.tab = 1;
    };

    // Init
    $scope.tab = 0;
    $scope.load();

});
