var app = angular.module("ethics-app");


// PUT
app.controller("DocEthicsController", function($scope, $routeParams, $location, $docService) {

    // API
    $scope.loadData = function() {
        $docService.get($routeParams.doc_id).success(function(response) {
            $scope.doc = response;
        });
    };

    // INIT
    $scope.loadData();

    $scope.doc = {"asdf":null};
    $scope.changed = function() {
      console.log($scope.doc);
    };

    // API-REQUEST
    $scope.save = function() {
        $docService.edit($scope.doc._id, $scope.doc)
            .success(function(response) {
                $scope.doc = response;
                $location.url("/doc");
            });
    };

});
