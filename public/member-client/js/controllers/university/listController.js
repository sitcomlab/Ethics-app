var app = angular.module("ethics-app");


// University list controller
app.controller("universityListController", function($scope, $rootScope, $filter, $translate, $location, config, $window, $authenticationService, $universityService) {

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
    $scope.load = function(){
        // Check for a search-text
        if($scope.filter.search_text !== ""){
            // Search universities
            $universityService.search($scope.filter)
            .then(function onSuccess(response) {
                $universityService.set(response.data);
                $scope.universities = $universityService.get();

                // Prepare pagination
                if($scope.universities.length > 0){
                    // Set count
                    $universityService.setCount($scope.universities[0].full_count);
                } else {
                    // Reset count
                    $universityService.setCount(0);

                    // Reset pagination
                    $scope.pages = [];
                    $scope.filter.offset = 0;
                }

                // Set pagination
                $scope.pages = [];
                for(var i=0; i<Math.ceil($universityService.getCount() / $scope.filter.limit); i++){
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
            // Load universities
            $universityService.list($scope.filter)
            .then(function onSuccess(response) {
                $universityService.set(response.data);
                $scope.universities = $universityService.get();

                // Prepare pagination
                if($scope.universities.length > 0){
                    // Set count
                    $universityService.setCount($scope.universities[0].full_count);
                } else {
                    // Reset count
                    $universityService.setCount(0);

                    // Reset pagination
                    $scope.pages = [];
                    $scope.filter.offset = 0;
                }

                // Set pagination
                $scope.pages = [];
                for(var i=0; i<Math.ceil($universityService.getCount() / $scope.filter.limit); i++){
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
        $universityService.set();
        $universityService.setCachedFilter($scope.filter);
        $scope.universities = $universityService.get();
        $scope.load();
    };

    /**
     * [description]
     * @param  {[type]} offset [description]
     * @return {[type]}        [description]
     */
    $scope.changeOffset = function(offset){
        $scope.filter.offset = offset;
        $universityService.set();
        $universityService.setCachedFilter($scope.filter);
        $scope.universities = $universityService.get();
        $scope.load();
    };


    /*************************************************
        INIT
     *************************************************/
    $scope.$parent.loading = { status: true, message: "Loading universities" };
    
    // Load universities
    $scope.filter = $universityService.getCachedFilter();
    $scope.applyFilter();

});
