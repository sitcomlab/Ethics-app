var app = angular.module("ethics-app");


// Working group list controller
app.controller("workingGroupListController", function($scope, $rootScope, $filter, $translate, $location, config, $window, $authenticationService, $workingGroupService) {

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
        $scope.filter.former = status;
        $scope.filter.offset = 0;
        $scope.applyFilter();
    };

    /**
     * [description]
     * @return {[type]} [description]
     */
    $scope.load = function(){
        $scope.$parent.loading = { status: true, message: "Loading working groups" };

        // Load working groups
        $workingGroupService.list($scope.filter)
        .then(function onSuccess(response) {
            $workingGroupService.set(response.data);
            $scope.working_groups = $workingGroupService.get();

            // Prepare pagination
            if($scope.working_groups.length > 0){
                // Set count
                $workingGroupService.setCount($scope.working_groups[0].full_count);
            } else {
                // Reset count
                $workingGroupService.setCount(0);

                // Reset pagination
                $scope.pages = [];
                $scope.filter.offset = 0;
            }

            // Set pagination
            $scope.pages = [];
            for(var i=0; i<Math.ceil($workingGroupService.getCount() / $scope.filter.limit); i++){
                $scope.pages.push({
                    offset: i * $scope.filter.limit
                });
            }

            $scope.$parent.loading = { status: false, message: "" };
        })
        .catch(function onError(response) {
        $window.alert(response.data);
        });

    };

    /**
     * [description]
     * @return {[type]} [description]
     */
    $scope.applyFilter = function(){
        $workingGroupService.set();
        $workingGroupService.setCachedFilter($scope.filter);
        $scope.working_groups = $workingGroupService.get();
        $scope.load();
    };

    /**
     * [description]
     * @param  {[type]} offset [description]
     * @return {[type]}        [description]
     */
    $scope.changeOffset = function(offset){
        $scope.filter.offset = offset;
        $workingGroupService.set();
        $workingGroupService.setCachedFilter($scope.filter);
        $scope.working_groups = $workingGroupService.get();
        $scope.load();
    };

    /*************************************************
        INIT
     *************************************************/

    // Load working groups
    $scope.filter = $workingGroupService.getCachedFilter();
    $scope.applyFilter();

});
