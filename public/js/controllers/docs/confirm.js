var app = angular.module("ethics-app");


// PUT
app.controller("DocConfirmController", function($scope, $routeParams, $location, $docService, $window) {

    // API
    $scope.loadData = function() {
        $docService.get($routeParams.doc_id).success(function(response) {
            $scope.doc = response;
        });
        // Call pdf generation function
        $docService.pdf($routeParams.doc_id).success(function(response) {
            console.log("Trigger pdf");
        });
    };

    // INIT
    $scope.loadData();
    $scope.validateEthics = function() {
      return false
    };

});
