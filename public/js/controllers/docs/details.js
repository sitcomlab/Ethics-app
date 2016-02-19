var app = angular.module("ethics-app");


// PUT
app.controller("DocDetailController", function($scope, $routeParams, $location, $docService) {

    // API
    $scope.loadData = function() {
        $docService.get($routeParams.doc_id).success(function(response) {
            $scope.doc = response;
        });
    };

    // INIT
    $scope.loadData();

});
