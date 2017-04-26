var app = angular.module("ethics-app");


// Document review controller
app.controller("documentReviewController", function($scope, $rootScope, $routeParams, $filter, $translate, $location, config, $window, $q, $timeout, $authenticationService, $documentService, $commentService) {

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
     * [toggleConcernHistory description]
     * @param  {[type]} language [description]
     * @return {[type]}          [description]
     */
    $scope.toggle = function(category, property, language){
        switch (category) {
            case 'general': {
                switch (property){
                    case 'display': {
                        $scope.status.general.display = !$scope.status.general.display;
                        break;
                    }
                    case 'history': {
                        $scope.status.general.history = !$scope.status.general.history;
                        if($scope.status.general.history){
                            $scope.status.general.limit = $scope.document.revisions.length;
                        } else {
                            $scope.status.general.limit = 1;
                        }
                        break;
                    }
                }
                break;
            }
            case 'descriptions': {
                switch (property) {
                    case 'language': {
                        switch (language) {
                            case 'en': {
                                $scope.status.descriptions.language.en = !$scope.status.descriptions.language.en;
                                break;
                            }
                            case 'de': {
                                $scope.status.descriptions.language.de = !$scope.status.descriptions.language.de;
                                break;
                            }
                            case 'pt': {
                                $scope.status.descriptions.language.pt = !$scope.status.descriptions.language.pt;
                                break;
                            }
                        }
                        break;
                    }
                    case 'history': {
                        switch (language) {
                            case 'en': {
                                $scope.status.descriptions.history.en.display = !$scope.status.descriptions.history.en.display;

                                if($scope.status.descriptions.history.en.display){
                                    $scope.status.descriptions.history.en.limit = $scope.document.revisions.length;
                                } else {
                                    $scope.status.descriptions.history.en.limit = 1;
                                }
                                break;
                            }
                            case 'de': {
                                $scope.status.descriptions.history.de.display = !$scope.status.descriptions.history.de.display;

                                if($scope.status.descriptions.history.de.display){
                                    $scope.status.descriptions.history.de.limit = $scope.document.revisions.length;
                                } else {
                                    $scope.status.descriptions.history.de.limit = 1;
                                }
                                break;
                            }
                            case 'pt': {
                                $scope.status.descriptions.history.pt.display = !$scope.status.descriptions.history.pt.display;

                                if($scope.status.descriptions.history.pt.display){
                                    $scope.status.descriptions.history.pt.limit = $scope.document.revisions.length;
                                } else {
                                    $scope.status.descriptions.history.pt.limit = 1;
                                }
                                break;
                            }
                        }
                        break;
                    }
                    case 'comments': {
                        switch (language) {
                            case 'en': {
                                $scope.status.descriptions.comments.en = !$scope.status.descriptions.comments.en;
                                break;
                            }
                            case 'de': {
                                $scope.status.descriptions.comments.de = !$scope.status.descriptions.comments.de;
                                break;
                            }
                            case 'pt': {
                                $scope.status.descriptions.comments.pt = !$scope.status.descriptions.comments.pt;
                                break;
                            }
                        }
                    }
                }
                break;
            }
            case 'concerns': {
                switch (property) {
                    case 'display': {
                        $scope.status.concerns.display = !$scope.status.concerns.display;
                        break;
                    }
                    case 'history': {
                        $scope.status.concerns.history = !$scope.status.concerns.history;

                        if($scope.status.concerns.history){
                            $scope.status.concerns.limit = $scope.document.revisions.length;
                        } else {
                            $scope.status.concerns.limit = 1;
                        }

                        break;
                    }
                    case 'comments': {
                        $scope.status.concerns.comments = !$scope.status.concerns.comments;
                        break;
                    }
                }
                break;
            }
        }
    };

    /**
     * [submitReview description]
     * @return {[type]} [description]
     */
    $scope.saveReview = function(){
        $scope.$parent.loading = { status: true, message: "Saving review" };

        // Save comments
        $commentService.edit($scope.latest_revision.comments.comment_id, $scope.latest_revision.comments)
        .then(function onSuccess(response) {
            $scope.$parent.loading = { status: false, message: "" };

            // Reset navbar
            $scope.$parent.document = false;

            // Redirect
            $scope.redirect("/documents/" + $routeParams.document_id);
        })
        .catch(function onError(response) {
            $window.alert(response.data);

            // Reset navbar
            $scope.$parent.document = false;

            // Redirect
            $scope.redirect("/documents");
        });
    };

    /**
     * [submitReview description]
     * @return {[type]} [description]
     */
    $scope.publish = function(){
        if($scope.review_status !== null){
            $scope.$parent.loading = { status: true, message: "Saving review" };

            // Publish comments for user
            $scope.latest_revision.comments.published = true;

            // Save comments
            $commentService.edit($scope.latest_revision.comments.comment_id, $scope.latest_revision.comments)
            .then(function onSuccess(response) {
                $scope.$parent.loading = { status: true, message: "Publishing review" };

                // Change status of document
                $documentService.changeStatus($routeParams.document_id, {
                    status: $scope.review_status
                })
                .then(function onSuccess(response) {
                    $scope.$parent.loading = { status: false, message: "" };

                    // Redirect
                    $scope.redirect("/documents/" + $routeParams.document_id);
                })
                .catch(function onError(response) {
                    $window.alert(response.data);

                    // Reset navbar
                    $scope.$parent.document = false;

                    // Redirect
                    $scope.redirect("/documents");
                });
            })
            .catch(function onError(response) {
                $window.alert(response.data);

                // Reset navbar
                $scope.$parent.document = false;

                // Redirect
                $scope.redirect("/documents");
            });
        }
    };


    /*************************************************
        EVENTS
     *************************************************/
    $scope.$on("$destroy", function() {
        // Reset navbar
        delete $scope.document;
        delete $scope.$parent.document;
    });


    /*************************************************
        INIT
     *************************************************/
    $scope.$parent.loading = { status: true, message: "Loading review" };
    $scope.review_status = null;
    $scope.authenticated_member = $authenticationService.get();
    $scope.document = $documentService.get();
    $scope.latest_revision = $documentService.getLatestRevision();

    // Update navbar
    $scope.$parent.document = $documentService.get();

    // Show/hide comments and history
    $scope.status = {
        general: {
            display: true,
            history: false,
            limit: 1
        },
        descriptions: {
            language: {
                en: true,
                de: true,
                pt: true
            },
            history: {
                en: {
                    display: false,
                    limit: 1
                },
                de: {
                    display: false,
                    limit: 1
                },
                pt: {
                    display: false,
                    limit: 1
                }
            },
            comments: {
                en: true,
                de: true,
                pt: true
            }
        },
        concerns: {
            display: true,
            history: false,
            limit: 1,
            comments: true
        }
    };

    $scope.$parent.loading = { status: false, message: "" };
});
