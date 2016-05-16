var app = angular.module("ethics-app");


// PUT
app.controller("DocSummaryController", function($scope, $routeParams, $location, $docService, $window) {

    // API
    $scope.loadData = function() {
        $docService.get($routeParams.doc_id).success(function(response) {
            $scope.doc = response;
        });
    };

});
