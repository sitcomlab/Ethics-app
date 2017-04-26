var app = angular.module("ethics-app");


// User details controller
app.controller("userDetailsController", function($scope, $rootScope, $routeParams, $filter, $translate, $location, config, $window, $authenticationService, $userService, $documentsService) {

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
     * [description]
     * @param  {[type]} related_data [description]
     * @param  {[type]} status       [description]
     * @return {[type]}              [description]
     */
    $scope.changeTab = function(related_data, status){
        $scope.filter = {
            tab: related_data
        };
        $scope.load(related_data);
    };

    /**
     * [description]
     * @param  {[type]} related_data [description]
     * @return {[type]}              [description]
     */
    $scope.load = function(related_data){

        // Check which kind of related data needs to be requested
        switch (related_data) {
            case 'documents': {
                $scope.$parent.loading = { status: true, message: "Loading related documents" };

                // Load related documents
                $documentsService.listByUser($scope.user.user_id, $scope.filter)
                .then(function onSuccess(response) {
                    $scope.user.documents = response.data;
                    $scope.$parent.loading = { status: false, message: "" };
                })
                .catch(function onError(response) {
                    $window.alert(response.data);
                });
                break;
            }
        }
    };


    /*************************************************
        INIT
     *************************************************/
    $scope.$parent.loading = { status: true, message: "Loading user" };

    // Filter
    $scope.filter = {
        tab: 'documents'
    };

    // Load user
    $userService.retrieve($routeParams.user_id)
    .then(function onSuccess(response) {
        $scope.user = response.data;

        // Load related documents
        $scope.load('documents');
    })
    .catch(function onError(response) {
        $window.alert(response.data);
    });

});
