var app = angular.module("ethics-app");


// PUT
app.controller("DocEditController", function($scope, $rootScope, $routeParams, $location, $docService, $window, $ngBootbox) {

    /**
     * Open url in new window
     */
    $scope.openInNewWindow = function(path) {
        $window.open(path);
    };

    /**
     * Request Document by its Id
     */
    $scope.loadData = function() {
        $docService.get($routeParams.doc_id).success(function(response) {
            $scope.doc = response;
            $rootScope.doc = response;
            $rootScope.$broadcast('updateNavbar');

            // Check if Document was already submitted
            if (!$scope.doc.editable) {
                $location.url("/docs/" + $scope.doc._id);
            } else {
                $scope.doc.general.english.q02 = angular.copy($scope.doc.first_name + " " + $scope.doc.last_name);
                $scope.doc.general.german.q02 = angular.copy($scope.doc.first_name + " " + $scope.doc.last_name);
            }
        });
    };


    /**
     * Init
     */
    $scope.page = 1;
    $scope.loadData();


    /**
     * Next page
     */
    $scope.next = function() {
        if ($scope.page === 2) {
            $scope.$broadcast('show-errors-check-validity-eng');
            $scope.$broadcast('show-errors-check-validity-ger');
            if ($scope.descriptionFormEng.$invalid) {
                $window.scrollTo(0, 0);
                return;
            }
            if ($scope.descriptionFormGer.$invalid) {
                $window.scrollTo(0, 0);
                return;
            }
        }
        console.log("Form valid");
        $docService.edit($scope.doc._id, $scope.doc)
            .success(function(response) {
                $scope.doc = response;
                $scope.page = $scope.page + 1;
                $window.scrollTo(0, 0);
            })
            .error(function(response) {
                alert("An error occured!");
            });
    };


    /**
     * Previous page
     */
    $scope.previous = function() {
        $docService.edit($scope.doc._id, $scope.doc)
            .success(function(response) {
                $scope.doc = response;
                $scope.page = $scope.page - 1;
                $window.scrollTo(0, 0);
            })
            .error(function(response) {
                alert("An error occured!");
            });
    };


    /**
     * Save document
     */
    $rootScope.$on('saveDocument', function() {
        if ($scope.doc.editable) {
            $docService.edit($scope.doc._id, $scope.doc)
                .success(function(response) {
                    $scope.doc = response;
                    $rootScope.doc = response;
                    $rootScope.$broadcast('updateNavbar');
                })
                .error(function(response) {
                    alert("An error occured!");
                });
        }
    });

    /**
     * Final submit
     */
    $scope.submit = function() {
        $scope.$broadcast('show-errors-check-validity-ethics');
        if ($scope.ethicsForm.$invalid) {
            $window.scrollTo(0, 0);
            return;
        }
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

        // Create Final Submit-Dialog
        var message;
        if ($scope.doc.confirmed) {
            message = '<h4 class="text-success"><i class="fa fa-thumbs-up"></i>&nbsp;&nbsp;The ethical clearance can be automatically granted.</h4>' +
                'After submitting the form you will no longer be allowed to edit it. Please make sure you have correctly filled in the form. You will now be able to download the Informed Consent Forms and other required documents.';
        } else {
            message = '<h4 class="text-danger"><i class="fa fa-exclamation-triangle"></i>&nbsp;&nbsp;You have one or more ethical concerns!</h4>' +
                'After submitting the form you will no longer be allowed to edit it. Your data will be send to the Ethic-Committe. You will be notified by an Email as soon as the Ethic-Committe confirmed your request. After that you will be able to download the Informed Consent Forms and other required documents. Please make sure you have correctly filled in the form.';
        }

        $ngBootbox.customDialog({
            message: message,
            title: '<i class="fa fa-info-circle"></i>&nbsp;&nbsp;Attention',
            buttons: {
                warning: {
                    label: 'Cancel',
                    className: "btn-secondary",
                    callback: function() {}
                },
                success: {
                    label: '<i class="fa fa-hand-o-right"></i>&nbsp;&nbsp;Submit',
                    className: "btn-warning",
                    callback: function() {
                        $scope.doc.editable = false;
                        $docService.edit($scope.doc._id, $scope.doc)
                            .success(function(response) {
                                $scope.doc = response;
                                $rootScope.doc = response;
                                $rootScope.$broadcast('updateNavbar');
                                $location.url("/docs/" + $scope.doc._id);
                                $window.scrollTo(0, 0);
                            })
                            .error(function(response) {
                                alert("An error occured!");
                            });
                    }
                }
            }
        });
    };
});
