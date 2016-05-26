var app = angular.module("ethics-app");

// Custom Directive
app.directive('showErrors', function() {
    return {
        restrict: 'A',
        require: '^form',
        link: function(scope, el, attrs, formCtrl) {
            // find the text box element, which has the 'name' attribute
            var inputEl = el[0].querySelector("[name]");
            // convert the native text box element to an angular element
            var inputNgEl = angular.element(inputEl);
            // get the name on the text box
            var inputName = inputNgEl.attr('name');
            // only apply the has-error class after the user leaves the text box
            inputNgEl.bind('blur', function() {
                el.toggleClass('has-danger', formCtrl[inputName].$invalid);
            });
            // inside the directive's link function from the previous example
            scope.$on('show-errors-check-validity-eng', function() {
                if (formCtrl.$name === 'descriptionFormEng') {
                    el.toggleClass('has-danger', formCtrl[inputName].$invalid);
                }
            });
            scope.$on('show-errors-check-validity-ger', function() {
                if (formCtrl.$name === 'descriptionFormGer') {
                    el.toggleClass('has-danger', formCtrl[inputName].$invalid);
                }
            });
            scope.$on('show-errors-check-validity-ethics', function() {
                if (formCtrl.$name === 'ethicsForm') {
                    el.toggleClass('has-danger', formCtrl[inputName].$invalid);
                }
            });

        }
    }
});

app.directive('showWrong', function() {
    return {
        restrict: 'A',
        require: '^form',
        link: function(scope, el, attrs, formCtrl) {
            // find the text box element, which has the 'name' attribute
            var inputEls = el[0].querySelectorAll("[name]");
            var inputEl1 = inputEls[0];
            var inputEl2 = inputEls[1];
            var inputEl3 = inputEls[2];
            // convert the native text box element to an angular element
            var inputNgEl1 = angular.element(inputEl1);
            var inputNgEl2 = angular.element(inputEl2);
            var inputNgEl3 = angular.element(inputEl3);
            // get the name on the text box
            var inputName1 = inputNgEl1.attr('name');
            var inputName2 = inputNgEl2.attr('name');
            var inputName3 = inputNgEl3.attr('name');
            // only apply the has-error class after the user leaves the text box
            inputNgEl1.bind('blur', function() {
                el.toggleClass('has-danger', formCtrl[inputName1].$invalid);
            });
            inputNgEl2.bind('blur', function() {
                el.toggleClass('has-danger', formCtrl[inputName2].$invalid);
            });
            inputNgEl3.bind('blur', function() {
                el.toggleClass('has-danger', formCtrl[inputName3].$invalid);
            });
            // inside the directive's link function from the previous example
            scope.$on('show-errors-check-validity-ethics', function() {
                if (formCtrl.$name === 'ethicsForm') {
                    el.toggleClass('has-danger', formCtrl[inputName1].$invalid);
                    el.toggleClass('has-danger', formCtrl[inputName2].$invalid);
                    el.toggleClass('has-danger', formCtrl[inputName3].$invalid);
                }
            });

        }
    }
});

// PUT
app.controller("DocEditController", function($scope, $rootScope, $routeParams, $location, $docService, $window, $ngBootbox) {


    /**
     * Request Document by its Id
     */
    $scope.loadData = function() {
        $docService.get($routeParams.doc_id).success(function(response) {
            console.log(response);
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
                return;
            }
            if ($scope.descriptionFormGer.$invalid) {
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
     * Final submit
     */
    $scope.submit = function() {
        $scope.$broadcast('show-errors-check-validity-ethics');
        if ($scope.ethicsForm.$invalid) {
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
            message = '<h4 class="text-success"><i class="fa fa-thumbs-up"></i>&nbsp;&nbsp;You have no ethical concerns!</h4>' +
                'After you submit your Document, you are no longer able to edit your Document, but you can download your consent-forms. Please make sure, that you correctly filled out the formular before submitting it!';
        } else {
            message = '<h4 class="text-danger"><i class="fa fa-exclamation-triangle"></i>&nbsp;&nbsp;You have one or more ethical concerns!</h4>' +
                'After you submit your Document, you are no longer able to edit your Document and your data will be send to the Ethic-Committe. You will be notified by an Email as soon as the Ethic-Committe confirmed your request. After that you can download your consent-forms. Please make sure, that you correctly filled out the formular before submitting it!';
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
