var app = angular.module("ethics-app");

// Member add controller
app.controller("memberCreateController", function($scope, $rootScope, $translate, $location, config, $window, $memberService) {

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
    $scope.passwordRepeat = "";
    $scope.load();


    /**
     * [cancel description]
     * @return {[type]} [description]
     */
    $scope.cancel = function(){
        $scope.new_member = $memberService.init();
        // Redirect
        $location.url("/members");
    };


    /**
     * [createMember description]
     * @return {[type]} [description]
     */
    $scope.createMember = function(){
        // TODO: Check input
        /*if($scope.memberCreateForm.$invalid) {
            // Update UI
            $scope.memberCreateForm.new_member_title.$pristine = false;
            $scope.memberCreateForm.new_member_first_name.$pristine = false;
            $scope.memberCreateForm.new_member_last_name.$pristine = false;
        } else {*/
            $memberService.create($scope.new_member)
            .success(function(response) {
                $memberService.set(response);

                // Redirect
                $location.url("/members/" + $memberService.getId());
            })
            .error(function(response) {
                $window.alert(response);
            });
        // }
    };

});
