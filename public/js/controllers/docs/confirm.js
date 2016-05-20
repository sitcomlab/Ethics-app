var app = angular.module("ethics-app");


// PUT
app.controller("DocConfirmController", function($scope, $routeParams, $location, $docService, $window) {

    // API
    $scope.loadData = function() {
        $docService.get($routeParams.doc_id).success(function(response) {
            $scope.doc = response;
            $scope.generatePDF();
        });
    };

    $scope.generatePDF = function() {
        $docService.pdf($routeParams.doc_id).success(function(response) {
            $scope.icf_eng = angular.copy($scope.doc._id + "_eng.pdf");
            $scope.icf_ger = angular.copy($scope.doc._id + "_ger.pdf");
        });
    }

    // INIT
    $scope.loadData();
    $scope.validateEthics = function() {
        return false
    };

});
