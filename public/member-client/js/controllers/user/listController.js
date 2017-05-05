var app = angular.module("ethics-app");


// User list controller
app.controller("userListController", function($scope, $rootScope, $filter, $translate, $location, config, $window, $authenticationService, $userService) {

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
    $scope.changeTab = function(status){
        $scope.filter.blocked = status;
        $scope.filter.offset = 0;
        $scope.applyFilter();
    };

    /**
     * [description]
     * @return {[type]} [description]
     */
    $scope.load = function(){
        $scope.$parent.loading = { status: true, message: "Loading users" };

        // Check for a search-text
        if($scope.filter.search_text !== ""){
            // Search users
            $userService.search($scope.filter)
            .then(function onSuccess(response) {
                $userService.set(response.data);
                $scope.users = $userService.get();

                // Prepare pagination
                if($scope.users.length > 0){
                    // Set count
                    $userService.setCount($scope.users[0].full_count);
                } else {
                    // Reset count
                    $userService.setCount(0);

                    // Reset pagination
                    $scope.pages = [];
                    $scope.filter.offset = 0;
                }

                // Set pagination
                $scope.pages = [];
                for(var i=0; i<Math.ceil($userService.getCount() / $scope.filter.limit); i++){
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
            // Load users
            $userService.list($scope.filter)
            .then(function onSuccess(response) {
                $userService.set(response.data);
                $scope.users = $userService.get();

                // Prepare pagination
                if($scope.users.length > 0){
                    // Set count
                    $userService.setCount($scope.users[0].full_count);
                } else {
                    // Reset count
                    $userService.setCount(0);

                    // Reset pagination
                    $scope.pages = [];
                    $scope.filter.offset = 0;
                }

                // Set pagination
                $scope.pages = [];
                for(var i=0; i<Math.ceil($userService.getCount() / $scope.filter.limit); i++){
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
     * [resetSearch description]
     */
    $scope.resetSearch = function(){
        $scope.filter.search_text = "";
        $scope.applyFilter();
    };

    /**
     * [applyFilter description]
     * @return {[type]} [description]
     */
    $scope.applyFilter = function(){
        $userService.set();
        $userService.setCachedFilter($scope.filter);
        $scope.users = $userService.get();
        $scope.load();
    };

    /**
     * [description]
     * @param  {[type]} offset [description]
     * @return {[type]}        [description]
     */
    $scope.changeOffset = function(offset){
        $scope.filter.offset = offset;
        $userService.set();
        $userService.setCachedFilter($scope.filter);
        $scope.users = $userService.get();
        $scope.load();
    };


    /*************************************************
        INIT
     *************************************************/

    // Load users
    $scope.filter = $userService.getCachedFilter();
    $scope.applyFilter();
});
