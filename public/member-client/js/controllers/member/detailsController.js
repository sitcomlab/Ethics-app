var app = angular.module("ethics-app");


// Member details controller
app.controller("memberDetailsController", function($scope, $rootScope, $routeParams, $filter, $translate, $location, config, $window, $authenticationService, $memberService) {

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
    $scope.editMember = function(){
        if($scope.authenticated_member.admin && $scope.authenticated_member.member_id !== $scope.member.member_id){
            $scope.redirect("/members/" + $scope.member.member_id + "/edit");
        } else {
            $scope.redirect("/account/edit");
        }
    };

    /*************************************************
        INIT
     *************************************************/
    $scope.$parent.loading = { status: true, message: $filter('translate')('LOADING_MEMBER') };
    $scope.authenticated_member = $authenticationService.get();

    // Load member
    $memberService.retrieve($routeParams.member_id)
    .then(function onSuccess(response) {
        $scope.member = response.data;
        $scope.$parent.loading = { status: false, message: "" };
    })
    .catch(function onError(response) {
        $window.alert(response.data);
    });


});
