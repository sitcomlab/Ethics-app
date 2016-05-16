var app = angular.module("ethics-app");


// PUT
app.controller("DocEditController", function($scope, $routeParams, $location, $docService, $window) {

    // API
    $scope.loadData = function() {
        $docService.get($routeParams.doc_id).success(function(response) {
            $scope.doc = response;
            $scope.doc.general.english.q02 = angular.copy($scope.doc.first_name + " " + $scope.doc.last_name);
            $scope.doc.general.german.q02 = angular.copy($scope.doc.first_name + " " + $scope.doc.last_name);
        });
    };

    // INIT
    $scope.loadData();
    $scope.isShown = function() {
      return false
    };

    // API-REQUEST
    $scope.next = function() {
        $docService.edit($scope.doc._id, $scope.doc)
        .success(function(response) {
            $scope.doc = response;
            //$location.url("/docs/" + $scope.doc._id + "/ethics");
            $scope.isShown = function() {
              return true
            };
            $window.scrollTo(0, 0);
        })
        .error(function(response) {
            alert("An error occured!");
        });
    };

    // BACK
    $scope.previous = function() {
      $scope.isShown = function() {
        return false
      };
      $window.scrollTo(0, 0);
    };

    // SUBMIT
    $scope.submit = function() {
        $docService.edit($scope.doc._id, $scope.doc)
        .success(function(response) {
            $scope.doc = response;
            $location.url("/docs/" + $scope.doc._id);
            $window.scrollTo(0, 0);
        })
        .error(function(response) {
            alert("An error occured!");
        });
    };

});
