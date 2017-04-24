var app = angular.module("ethics-app");


// Course details controller
app.controller("courseDetailsController", function($scope, $rootScope, $routeParams, $translate, $location, config, $window, $authenticationService, $courseService, $memberService, $documentsService) {

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
            tab: related_data,
            former: status,
            blocked: status
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
                $documentsService.listByCourse($scope.course.course_id, $scope.filter)
                .then(function onSuccess(response) {
                    $scope.course.documents = response.data;
                    $scope.$parent.loading = { status: false, message: "" };
                })
                .catch(function onError(response) {
                    $window.alert(response.data);
                });
                break;
            }
            case 'members': {
                $scope.$parent.loading = { status: true, message: "Loading related members" };

                // Load related members
                $memberService.listByCourse($scope.course.course_id, $scope.filter)
                .then(function onSuccess(response) {
                    $scope.course.members = response.data;
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
    $scope.$parent.loading = { status: true, message: "Loading course" };
    $scope.authenticated_member = $authenticationService.get();

    // Filter
    $scope.filter = {
        tab: 'documents',
        former: false,
        blocked: false
    };

    // Load course
    $courseService.retrieve($routeParams.course_id)
    .then(function onSuccess(response) {
        $scope.course = response.data;

        // Load related documents
        $scope.load('documents');
    })
    .catch(function onError(response) {
        $window.alert(response.data);
    });

});
