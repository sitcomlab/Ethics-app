var app = angular.module("ethics-app");


app.controller("LoginController", function($scope, $translate, $location, $log, setup) {

    // INIT
    $scope.doc = $docService.getDefaultDoc();

    // Create new Document
    $scope.create = function() {
        $docService.create($scope.doc)
            .success(function(response) {
                //$scope.doc = response;
                $location.url("/docs/" + $scope.doc._id + "/edit");
            })
            .error(function(response) {
				alert("An error occured!");
            });
    };

    // Login with DocumentId
    $scope.login = function() {
        $docService.get($scope.docId)
			.success(function(response) {
	            $location.url("/docs/" + $scope.doc._id + "/edit");
	        })
			.error(function(response) {
				alert("An error occured!");
			});
    };

});
