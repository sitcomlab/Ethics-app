var app = angular.module("ethics-app");


// CREATE
app.controller("DocCreateController", function($scope, $location, $docService) {

    // INIT
    $scope.doc = $docService.getDefaultDoc();

    // API-Request
    $scope.create = function() {
        $docService.create($scope.doc).success(function(response) {
            $scope.doc = response;
            $location.url("/docs/" + $scope.doc._id + "/edit");
        });
    };

});
