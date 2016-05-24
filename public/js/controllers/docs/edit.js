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
    $scope.next = function(isValid) {
      if(isValid) {
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
      } else {
        alert("Please fill all fields");
      }
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
        if ($scope.doc.ethics.q01.checkbox) $scope.doc.confirmed = false;
        else if ($scope.doc.ethics.q02.checkbox) $scope.doc.confirmed = false;
        else if ($scope.doc.ethics.q03.checkbox) $scope.doc.confirmed = false;
        else if ($scope.doc.ethics.q04.checkbox) $scope.doc.confirmed = false;
        else if ($scope.doc.ethics.q05.checkbox) $scope.doc.confirmed = false;
        else if ($scope.doc.ethics.q06.checkbox) $scope.doc.confirmed = false;
        else if ($scope.doc.ethics.q07.checkbox) $scope.doc.confirmed = false;
        else if ($scope.doc.ethics.q08.checkbox) $scope.doc.confirmed = false;
        else if ($scope.doc.ethics.q09.checkbox) $scope.doc.confirmed = false;
        else if ($scope.doc.ethics.q10.checkbox) $scope.doc.confirmed = false;
        else if ($scope.doc.ethics.q12.checkbox) $scope.doc.confirmed = false;
        else if ($scope.doc.ethics.q13.checkbox) $scope.doc.confirmed = false;
        else if ($scope.doc.ethics.q11.checkbox_1) {
            if ($scope.doc.ethics.q11.checkbox_2) $scope.doc.confirmed = false;
            else $scope.doc.confirmed = true;
        } else $scope.doc.confirmed = true;
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
