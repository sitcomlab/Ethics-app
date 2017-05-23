var app = angular.module("ethics-app");


// Institute list controller
app.controller("instituteListController", function($scope, $rootScope, $filter, $translate, $location, config, $window, $authenticationService, $instituteService) {

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
        // Check for a search-text
        if($scope.filter.search_text !== ""){
            // Search institutes
            $instituteService.search($scope.filter)
            .then(function onSuccess(response) {
                $instituteService.set(response.data);
                $scope.institutes = $instituteService.get();

                // Prepare pagination
                if($scope.institutes.length > 0){
                    // Set count
                    $instituteService.setCount($scope.institutes[0].full_count);
                } else {
                    // Reset count
                    $instituteService.setCount(0);

                    // Reset pagination
                    $scope.pages = [];
                    $scope.filter.offset = 0;
                }

                // Set pagination
                $scope.pages = [];
                for(var i=0; i<Math.ceil($instituteService.getCount() / $scope.filter.limit); i++){
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
            // Load institutes
            $instituteService.list($scope.filter)
            .then(function onSuccess(response) {
                $instituteService.set(response.data);
                $scope.institutes = $instituteService.get();

                // Prepare pagination
                if($scope.institutes.length > 0){
                    // Set count
                    $instituteService.setCount($scope.institutes[0].full_count);
                } else {
                    // Reset count
                    $instituteService.setCount(0);

                    // Reset pagination
                    $scope.pages = [];
                    $scope.filter.offset = 0;
                }

                // Set pagination
                $scope.pages = [];
                for(var i=0; i<Math.ceil($instituteService.getCount() / $scope.filter.limit); i++){
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
        $instituteService.set();
        $instituteService.setCachedFilter($scope.filter);
        $scope.institutes = $instituteService.get();
        $scope.load();
    };

    /**
     * [description]
     * @param  {[type]} offset [description]
     * @return {[type]}        [description]
     */
    $scope.changeOffset = function(offset){
        $scope.filter.offset = offset;
        $instituteService.set();
        $instituteService.setCachedFilter($scope.filter);
        $scope.institutes = $instituteService.get();
        $scope.load();
    };


    /*************************************************
        INIT
     *************************************************/
    $scope.$parent.loading = { status: true, message: $filter('translate')('LOADING_INSTITUTES') };

    // Load institutes
    $scope.filter = $instituteService.getCachedFilter();
    $scope.applyFilter();

});
