var app = angular.module("ethics-app");


// University list controller
app.controller("universityListController", function($scope, $rootScope, $translate, $location, config, $window, $authenticationService, $universityService) {

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
        $scope.$parent.loading = { status: true, message: "Loading universities" };

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
    };

    /**
     * [applyFilter description]
     * @return {[type]} [description]
     */
    $scope.applyFilter = function(){
        $universityService.set();
        $universityService.setFilter($scope.filter);
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
        $universityService.setFilter($scope.filter);
        $scope.universities = $universityService.get();
        $scope.load();
    };


    /*************************************************
        INIT
     *************************************************/

    // Load universities
    $scope.filter = $universityService.getFilter();
    $scope.applyFilter();

});
