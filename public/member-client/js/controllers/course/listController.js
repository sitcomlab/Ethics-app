var app = angular.module("ethics-app");


// Course list controller
app.controller("courseListController", function($scope, $rootScope, $translate, $location, config, $window, $authenticationService, $courseService, _) {

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
        $scope.$parent.loading = { status: true, message: "Loading courses" };

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
    };

    /**
     * [applyFilter description]
     * @return {[type]} [description]
     */
    $scope.applyFilter = function(){
        $courseService.set();
        $courseService.setFilter($scope.filter);
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
        $courseService.setFilter($scope.filter);
        $scope.courses = $courseService.get();
        $scope.load();
    };


    /*************************************************
        INIT
     *************************************************/

    // Load courses
    $scope.filter = $courseService.getFilter();
    $scope.applyFilter();

});
