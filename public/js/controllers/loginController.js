var app = angular.module("ethics-app");


app.controller("LoginController", function($scope, $translate, $location, $log, setup, $docService) {

    // INIT
    $scope.doc = $docService.getDefaultDoc();

    // Create new Document
    $scope.submit = function() {
        console.log($scope.doc);
        $docService.create($scope.doc)
        .success(function(response) {
            $scope.doc = response;
            $location.url("/docs/" + $scope.doc._id + "/edit");
        })
        .error(function(response) {
            alert("An error occured!");
        });
    };

    // Login with DocumentId
    $scope.login = function() {
        $docService.get($scope.doc._id)
        .success(function(response) {
            $location.url("/docs/" + $scope.doc._id + "/edit");
        })
        .error(function(response) {
            alert("An error occured!");
        });
    };
});
