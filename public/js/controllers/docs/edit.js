var app = angular.module("ethics-app");


// PUT
app.controller("DocEditController", function($scope, $routeParams, $location, $docService) {

    // API
    $scope.loadData = function() {
        $docService.get($routeParams.doc_id).success(function(response) {
            $scope.doc = response;
        });
    };

    // INIT
    $scope.loadData();


    // API-REQUEST
    $scope.save = function() {
        $docService.edit($scope.doc._id, $scope.doc)
            .success(function(response) {
                $scope.doc = response;
                $location.url("/docs/" + $scope.doc._id);
            });
    };

});
