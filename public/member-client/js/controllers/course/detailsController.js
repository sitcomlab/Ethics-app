var app = angular.module("ethics-app");


// Course details controller
app.controller("courseDetailsController", function($scope, $rootScope, $routeParams, $filter, $translate, $location, config, $window, $authenticationService, $courseService, $memberService, $documentsService) {

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
            limit: 50
        };

        switch (related_data) {
            case 'documents': {
                $scope.filter.orderby = 'created.desc';
                $scope.filter.former = status;
                break;
            }
            case 'members': {
                $scope.filter.orderby = 'name.asc';
                $scope.filter.former = status;
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
                $documentsService.listByCourse($scope.course.course_id, $scope.filter)
                .then(function onSuccess(response) {
                    $scope.course.documents = response.data;

                    // Prepare pagination
                    if($scope.course.documents.length > 0){
                        // Set count
                        $scope.full_count = $scope.course.documents[0].full_count;
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
            case 'members': {
                $scope.$parent.loading = { status: true, message: "Loading related members" };

                // Load related members
                $memberService.listByCourse($scope.course.course_id, $scope.filter)
                .then(function onSuccess(response) {
                    $scope.course.members = response.data;

                    // Prepare pagination
                    if($scope.course.members.length > 0){
                        // Set count
                        $scope.full_count = $scope.course.members[0].full_count;
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
    $scope.$parent.loading = { status: true, message: "Loading course" };
    $scope.authenticated_member = $authenticationService.get();

    // Filter
    $scope.filter = {
        tab: 'documents',
        offset: 0,
        limit: 50,
        orderby: 'created.desc',
        former: false
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
