var app = angular.module("ethics-app");


// Member list controller
app.controller("memberListController", function($scope, $rootScope, $translate, $location, config, $window, $authenticationService, $memberService, _) {

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


    /*************************************************
        INIT
     *************************************************/
    $scope.$parent.loading = { status: true, message: "Loading committee members" };
    $scope.authenticated_member = $authenticationService.get();
    
    // Load members
    $memberService.list()
    .then(function onSuccess(response) {
        $memberService.set(response.data);

        // Current members
        $scope.current_members = $memberService.getByStatus(false);

        // Former members
        $scope.former_members = $memberService.getByStatus(true);

        $scope.$parent.loading = { status: false, message: "" };
    })
    .catch(function onError(response) {
        $window.alert(response.data);
    });


});
