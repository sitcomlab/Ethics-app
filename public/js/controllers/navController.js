var app = angular.module("ethics-app");


app.controller("NavController", function($scope, $rootScope, $translate, $location, $log, setup) {

	/**
	 * Highlight active menu button
	 */
	$scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };


	/**
	 * Init
	 */
	$scope.language = setup.standardLanguage;


	/**
	 * Update Navbar, if user logged in
	 */
	$rootScope.$on('updateNavbar', function(){
		$scope.doc = $rootScope.doc;
	});


	$rootScope.$on('resetNavbar', function(){
		delete $scope.doc;
		delete $rootScope.doc;
	});


	/**
	 * Update Language
	 *
    $scope.updateLanguage = function(language) {
		$scope.language = language;
        $translate.use($scope.language);
        $log.debug("* Changed Language to: " + $scope.language);
    };*/


});
