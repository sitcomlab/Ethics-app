var app = angular.module("ethics-app");


app.controller("LoginController", function($scope, $rootScope, $translate, $location, $log, config, $docService) {


    /**
     * Init
     */
    if($rootScope.doc){
        $location.url("/docs/" + $scope.doc._id + "/edit");
    } else {
        $scope.doc = $docService.getDefaultDoc();
        $rootScope.$broadcast('resetNavbar');
    }


    /**
     * Create a new Document
     */
    $scope.submit = function() {
        $docService.create($scope.doc)
        .success(function(response) {
            $scope.doc = response;
            $location.url("/docs/" + $scope.doc._id + "/edit");
        })
        .error(function(response) {
            alert("An error occured!");
        });
    };


    /**
     * Login with existing Document by its Id
     */
    $scope.login = function() {
        $docService.get($scope.doc._id)
        .success(function(response) {
            if($scope.doc._id !== null){
                $location.url("/docs/" + $scope.doc._id + "/edit");
            } else {
                alert("Document not found!");
            }
        })
        .error(function(response) {
            alert("An error occured!");
        });
    };
});
