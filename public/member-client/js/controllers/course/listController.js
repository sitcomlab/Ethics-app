var app = angular.module("ethics-app");


// Course list controller
app.controller("courseListController", function($scope, $rootScope, $filter, $translate, $location, config, $window, $authenticationService, $courseService, _) {

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
            // Search courses
            $courseService.search($scope.filter)
            .then(function onSuccess(response) {
                $courseService.set(response.data);
                $scope.courses = $courseService.get();

                // Prepare pagination
                if($scope.courses.length > 0){
                    // Set count
                    $courseService.setCount($scope.courses[0].full_count);
                } else {
                    // Reset count
                    $courseService.setCount(0);

                    // Reset pagination
                    $scope.pages = [];
                    $scope.filter.offset = 0;
                }

                // Set pagination
                $scope.pages = [];
                for(var i=0; i<Math.ceil($courseService.getCount() / $scope.filter.limit); i++){
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
            // Load courses
            $courseService.list($scope.filter)
            .then(function onSuccess(response) {
                $courseService.set(response.data);
                $scope.courses = $courseService.get();

                // Prepare pagination
                if($scope.courses.length > 0){
                    // Set count
                    $courseService.setCount($scope.courses[0].full_count);
                } else {
                    // Reset count
                    $courseService.setCount(0);

                    // Reset pagination
                    $scope.pages = [];
                    $scope.filter.offset = 0;
                }

                // Set pagination
                $scope.pages = [];
                for(var i=0; i<Math.ceil($courseService.getCount() / $scope.filter.limit); i++){
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
        $courseService.set();
        $courseService.setCachedFilter($scope.filter);
        $scope.courses = $courseService.get();
        $scope.load();
    };

    /**
     * [description]
     * @param  {[type]} offset [description]
     * @return {[type]}        [description]
     */
    $scope.changeOffset = function(offset){
        $scope.filter.offset = offset;
        $courseService.set();
        $courseService.setCachedFilter($scope.filter);
        $scope.courses = $courseService.get();
        $scope.load();
    };


    /*************************************************
        INIT
     *************************************************/
    $scope.$parent.loading = { status: true, message: $filter('translate')('LOADING_COURSES') };
    
    // Load courses
    $scope.filter = $courseService.getCachedFilter();
    $scope.applyFilter();

});
