var app = angular.module("ethics-app");

// Document list controller
app.controller("documentListController", function($scope, $rootScope, $translate, $location, config, $window, $authenticationService, $documentsService, $universityService, $instituteService, $courseService) {

    /*************************************************
        FUNCTIONS
     *************************************************/

    /**
     * [redirect description]
     * @param  {[type]} path [description]
     * @return {[type]}      [description]
     */
    $scope.redirect = function(path){
        $location.url(path);
    };

    /**
     * [load description]
     * @return {[type]} [description]
     */
    $scope.load = function(){
        $scope.$parent.loading = { status: true, message: "Loading documents" };

        $documentsService.list($scope.filter)
        .then(function onSuccess(response) {
            $documentsService.set(response.data);
            $scope.documents = $documentsService.get();
            $scope.$parent.loading = { status: false, message: "" };
        })
        .catch(function onError(response) {
            $window.alert(response.data);
        });
    };

    /**
     * [resetSearch description]
     */
    $scope.resetSearch = function(){
        $scope.searchText = "";
    };

    /**
     * [filterDocuments description]
     * @return {[type]} [description]
     */
    $scope.filterDocuments = function(){
        $documentsService.set();
        $documentsService.setFilter($scope.filter);
        $scope.documents = $documentsService.get();
        $scope.load();
    };


    /*************************************************
        INIT
     *************************************************/
    $scope.authenticated_member = $authenticationService.get();

    // Filter all documents, which need to be reviewed
    $scope.filter = $documentsService.getFilter();

    // Load courses
    $courseService.list()
    .then(function onSuccess(response) {
        $courseService.set(response.data);
        $scope.courses = $courseService.get();

        // Load documents with applied filter
        $scope.load();
    })
    .catch(function onError(response) {
        $window.alert(response.data);
    });

});
