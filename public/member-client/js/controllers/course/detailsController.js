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


    /*************************************************
        INIT
     *************************************************/
    $scope.$parent.loading = { status: true, message: "Loading course" };

    // Load course
    $courseService.retrieve($routeParams.course_id)
    .then(function onSuccess(response) {
        $scope.course = response.data;

        // Load responsible members
        $memberService.listByCourse($routeParams.course_id)
        .then(function onSuccess(response) {
            $scope.course.members = response.data;

            // Load related documents
            $documentsService.listByCourse($routeParams.course_id)
            .then(function onSuccess(response) {
                $scope.course.documents = response.data;

                $scope.$parent.loading = { status: false, message: "" };
            })
            .catch(function onError(response) {
                $window.alert(response.data);
            });
        })
        .catch(function onError(response) {
            $window.alert(response.data);
        });
    })
    .catch(function onError(response) {
        $window.alert(response.data);
    });

});
