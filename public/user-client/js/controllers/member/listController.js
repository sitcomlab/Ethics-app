var app = angular.module("ethics-app");


// Member list controller
app.controller("memberListController", function($scope, $rootScope, $filter, $translate, $location, config, $window, $authenticationService, $documentService, $memberService) {

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

    /**
     * [description]
     * @return {[type]} [description]
     */
    $scope.changeTab = function(status){
        $scope.filter.former = status;
        $scope.filter.offset = 0;
        $scope.applyFilter();
    };

    /**
     * [description]
     * @return {[type]} [description]
     */
    $scope.load = function(){
        // Check for a search-text
        if($scope.filter.search_text !== ""){
            // Load members
            $memberService.search($scope.filter)
            .then(function onSuccess(response) {
                $memberService.set(response.data);
                $scope.members = $memberService.get();

                // Prepare pagination
                if($scope.members.length > 0){
                    // Set count
                    $memberService.setCount($scope.members[0].full_count);
                } else {
                    // Reset count
                    $memberService.setCount(0);

                    // Reset pagination
                    $scope.pages = [];
                    $scope.filter.offset = 0;
                }

                // Set pagination
                $scope.pages = [];
                for(var i=0; i<Math.ceil($memberService.getCount() / $scope.filter.limit); i++){
                    $scope.pages.push({
                        offset: i * $scope.filter.limit
                    });
                }

                $scope.$parent.loading = { status: false, message: "" };
            })
            .catch(function onError(response) {
                $window.alert(response.data);
            });
        } else {
            // Load members
            $memberService.list($scope.filter)
            .then(function onSuccess(response) {
                $memberService.set(response.data);
                $scope.members = $memberService.get();

                // Prepare pagination
                if($scope.members.length > 0){
                    // Set count
                    $memberService.setCount($scope.members[0].full_count);
                } else {
                    // Reset count
                    $memberService.setCount(0);

                    // Reset pagination
                    $scope.pages = [];
                    $scope.filter.offset = 0;
                }

                // Set pagination
                $scope.pages = [];
                for(var i=0; i<Math.ceil($memberService.getCount() / $scope.filter.limit); i++){
                    $scope.pages.push({
                        offset: i * $scope.filter.limit
                    });
                }

                $scope.$parent.loading = { status: false, message: "" };
            })
            .catch(function onError(response) {
                $window.alert(response.data);
            });
        }
    };

    /**
     * [applyFilter description]
     * @return {[type]} [description]
     */
    $scope.applyFilter = function(){
        $memberService.set();
        $memberService.setCachedFilter($scope.filter);
        $scope.members = $memberService.get();
        $scope.load();
    };

    /**
     * [description]
     * @param  {[type]} offset [description]
     * @return {[type]}        [description]
     */
    $scope.changeOffset = function(offset){
        $scope.filter.offset = offset;
        $memberService.set();
        $memberService.setCachedFilter($scope.filter);
        $scope.members = $memberService.get();
        $scope.load();
    };


    /*************************************************
        INIT
     *************************************************/
    $scope.$parent.loading = { status: true, message: $filter('translate')('LOADING_MEMBERS') };
    $scope.authenticated_user = $authenticationService.get();

    // Load members
    $scope.filter = $memberService.getCachedFilter();
    $scope.applyFilter();

});
