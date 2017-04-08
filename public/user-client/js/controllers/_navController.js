var app = angular.module("ethics-app");


app.controller("navController", function($scope, $rootScope, $ngBootbox, $translate, $location, $log, config, $documentService, $authenticationService) {

    /*************************************************
        FUNCTIONS
     *************************************************/

    /**
     * [isActive description]
     * @param  {[type]}  viewLocation [description]
     * @return {Boolean}              [description]
     */
    $scope.isActive = function(viewLocation){
        var path = $location.path();
        if(path && viewLocation){
            if(path.indexOf(viewLocation) !== -1){
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    };


    /**
     * [redirect description]
     * @param  {[type]} path [description]
     * @return {[type]}      [description]
     */
    $scope.redirect = function(path){
        $location.url(path);
    };


    /*************************************************
        EVENT LISTENERS
     *************************************************/

    /**
     * [document description]
     * @type {[type]}
     */
    $rootScope.$on('updateNavbar', function() {
        $scope.document = $documentService.get();
        $scope.authenticated_user = $authenticationService.get();
    });

    /**
     *
     */
    $rootScope.$on('resetNavbar', function() {
        delete $scope.document;
        delete $scope.authenticated_user;
    });

    /**
     * [loading description]
     * @type {Boolean}
     */
    $rootScope.$on('loading', function() {
        $scope.loading = true;
    });

    /**
     * [loading description]
     * @type {Boolean}
     */
    $rootScope.$on('finished', function() {
        $scope.loading = false;
    });

    /*************************************************
        INIT
     *************************************************/
    $scope.config = config;
    $scope.loading = false;

});
