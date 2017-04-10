var app = angular.module("ethics-app");


// Research group list controller
app.controller("researchGroupListController", function($scope, $rootScope, $translate, $location, config, $window, $authenticationService, $researchGroupService, _) {

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


    /*************************************************
        INIT
     *************************************************/
    $scope.$parent.loading = { status: true, message: "Loading research groups" };

    // Load research groups
    $researchGroupService.list()
    .then(function onSuccess(response) {
        $researchGroupService.set(response.data);
        $scope.research_groups = $researchGroupService.get();
        $scope.$parent.loading = { status: false, message: "" };
    })
    .catch(function onError(response) {
        $window.alert(response.data);
    });


});
