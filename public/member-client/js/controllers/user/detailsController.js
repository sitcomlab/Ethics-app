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
        // Set filter
        $scope.filter = {
            tab: related_data,
            offset: 0,
            limit: 2
        };

        switch (related_data) {
            case 'documents': {
                    $scope.filter.orderby ='updated.desc';
                break;
            }
        }
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

                    // Prepare pagination
                    if($scope.user.documents.length > 0){
                        // Set count
                        $scope.full_count = $scope.user.documents[0].full_count;
                    } else {
                        // Reset count
                        $scope.full_count = 0;

                        // Reset pagination
                        $scope.pages = [];
                        $scope.filter.offset = 0;
                    }

                    // Set pagination
                    $scope.pages = [];
                    for(var i=0; i<Math.ceil($scope.full_count / $scope.filter.limit); i++){
                        $scope.pages.push({
                            offset: i * $scope.filter.limit
                        });
                    }

                    $scope.$parent.loading = { status: false, message: "" };
                })
                .catch(function onError(response) {
                    $window.alert(response.data);
                });
                break;
            }
        }
    };

    /**
     * [description]
     * @param  {[type]} offset [description]
     * @return {[type]}        [description]
     */
    $scope.changeOffset = function(offset){
        $scope.filter.offset = offset;
        $scope.load($scope.filter.tab);
    };

    /*************************************************
        INIT
     *************************************************/
    $scope.$parent.loading = { status: true, message: "Loading user" };

    // Filter
    $scope.filter = {
        tab: 'documents',
        offset: 0,
        limit: 2,
        orderby: 'updated.desc'
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
