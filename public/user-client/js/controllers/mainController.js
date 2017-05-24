var app = angular.module("ethics-app");

// Main controller
app.controller("mainController", function($scope, $rootScope, $filter, $translate, $location, config, $documentService, $authenticationService) {

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
        INIT
     *************************************************/
	$scope.config = config;
	$scope.memberClient = config.getURL('member');
	$scope.userClient = config.getURL('user');
	
	$scope.authenticated_user = $authenticationService.get();
	$scope.document = $documentService.get();
	$scope.loading = {
		status: false,
		message: ""
	};

});
