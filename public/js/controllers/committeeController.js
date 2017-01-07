var app = angular.module("ethics-app");


// Committee controller
app.controller("committeeController", function($scope, $rootScope, $routeParams, $translate, $location, config, $window, $documentService, $committeeService) {


    // Init
    if($documentService.get()){
        $scope.document = $documentService.get();

        // Request members
        $committeeService.list()
        .success(function(response) {
            $scope.members = response;
        })
        .error(function(response) {
            $window.alert(response);
        });
    } else {
        // Redirect
        $location.url("/");
    }


    /**
     * [cancel description]
     * @return {[type]} [description]
     */
    $scope.close = function(){
        // Redirect
        $location.url("/documents/" + $documentService.getId());
    };



});
