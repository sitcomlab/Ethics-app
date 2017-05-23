var app = angular.module("ethics-app");


// Working group details controller
app.controller("workingGroupDetailsController", function($scope, $rootScope, $routeParams, $filter, $translate, $location, config, $window, $authenticationService, $memberService, $workingGroupService) {

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
     * @param  {[type]} related_data [description]
     * @param  {[type]} status       [description]
     * @return {[type]}              [description]
     */
    $scope.changeTab = function(related_data, status){
        // Set filter
        $scope.filter = {
            tab: related_data,
            offset: 0,
            limit: 50
        };

        switch (related_data) {
            case 'members': {
                $scope.filter.orderby = 'name.asc';
                $scope.filter.former = status;
                $scope.filter.blocked = status;
                break;
            }
        }
        $scope.load(related_data);
    };

    /**
     * [description]
     * @param  {[type]} related_data [description]
     * @return {[type]}              [description]
     */
    $scope.load = function(related_data){

        // Check which kind of related data needs to be requested
        switch (related_data) {
            case 'members': {
                $scope.$parent.loading = { status: true, message: $filter('translate')('LOADING_RELATED_MEMBERS') };

                // Load related members
                $memberService.listByWorkingGroup($scope.working_group.working_group_id, $scope.filter)
                .then(function onSuccess(response) {
                    $scope.working_group.members = response.data;

                    // Prepare pagination
                    if($scope.working_group.members.length > 0){
                        // Set count
                        $scope.full_count = $scope.working_group.members[0].full_count;
                    } else {
                        // Reset count
                        $scope.full_count = 0;

                        // Reset pagination
                        $scope.pages = [];
                        $scope.filter.offset = 0;
                    }

                    // Set pagination
                    $scope.pages = [];
                    for(var i=0; i<Math.ceil($scope.full_count / $scope.filter.limit); i++){
                        $scope.pages.push({
                            offset: i * $scope.filter.limit
                        });
                    }

                    $scope.$parent.loading = { status: false, message: "" };
                })
                .catch(function onError(response) {
                    $window.alert(response.data);
                });
                break;
            }
        }
    };

    /**
     * [description]
     * @param  {[type]} offset [description]
     * @return {[type]}        [description]
     */
    $scope.changeOffset = function(offset){
        $scope.filter.offset = offset;
        $scope.load($scope.filter.tab);
    };


    /*************************************************
        INIT
     *************************************************/
    $scope.$parent.loading = { status: true, message: $filter('translate')('LOADING_WORKING_GROUP') };

    // Filter
    $scope.filter = {
        tab: 'members',
        offset: 0,
        limit: 50,
        orderby: 'name.asc',
        former: false,
        blocked: false
    };

    // Load working group
    $workingGroupService.retrieve($routeParams.working_group_id)
    .then(function onSuccess(response) {
        $scope.working_group = response.data;

        // Load related members
        $scope.load('members');
    })
    .catch(function onError(response) {
        $window.alert(response.data);
    });

});
