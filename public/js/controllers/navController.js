var app = angular.module("ethics-app");


app.controller("NavController", function($scope, $translate, $location, $log, setup) {

	$scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };

	$scope.language = setup.standardLanguage;

	// CHANGE Language
    $scope.updateLanguage = function(language) {
		$scope.language = language;
        $translate.use($scope.language);
        $log.debug("* Changed Language to: " + $scope.language);
    };

});
