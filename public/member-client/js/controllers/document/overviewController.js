var app = angular.module("ethics-app");


// Document overview controller
app.controller("documentOverviewController", function($scope, $rootScope, $routeParams, $filter, $translate, $location, config, $window, $q, $timeout, $authenticationService, $documentService, $revisionService,  $descriptionService, $concernService, $commentService, $reviewerService, $noteService) {

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
     * @return {[type]} [description]
     */
    $scope.closeOverview = function(){
        $scope.$parent.loading = { status: true, message: $filter('translate')('SAVING_NOTES') };

        // Save notes
        $noteService.save($scope.document.note_id, { "note": $scope.document.note })
        .then(function onSuccess(response) {

            // Redirect
            $location.url("/documents");
        })
        .catch(function onError(response) {
            $window.alert(response.data);
            $scope.redirect("/documents");
        });

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
     * [reviewDocument description]
     * @return {[type]} [description]
     */
    $scope.reviewDocument = function(){
        $scope.$parent.loading = { status: true, message: $filter('translate')('UPDATING_REVIEWER') };

        // Update reviewer
        var revision = $documentService.getLatestRevision();
        $reviewerService.editByRevision(revision.revision_id, {
            member_id: $scope.authenticated_member.member_id
        })
        .then(function onSuccess(response) {

            // Update status
            $documentService.changeStatus($routeParams.document_id, {
                status: 4
            })
            .then(function onSuccess(response) {
                $scope.$parent.loading = { status: true, message: $filter('translate')('SAVING_NOTES') };

                $timeout(function(){
                    // Save notes
                    $noteService.save($scope.document.note_id, { "note": $scope.document.note })
                    .then(function onSuccess(response) {

                        $scope.$parent.loading = { status: true, message: $filter('translate')('LOADING_DOCUMENT') };

                        $timeout(function(){
                            // Load document
                            $documentService.retrieve($routeParams.document_id)
                            .then(function onSuccess(response) {
                                $documentService.set(response.data);
                                $scope.$parent.loading = { status: true, message: $filter('translate')('LOADING_REVISIONS') };

                                $timeout(function(){

                                    // Load revisions
                                    $revisionService.listByDocument($routeParams.document_id)
                                    .then(function onSuccess(response) {
                                        $documentService.setRevisions(response.data);

                                        // Prepare main-promises
                                        var checkout_revisions_deferred = $q.defer();
                                        var revision_promises = [];

                                        // Checkout description, concerns, comments and reviewers for each revision
                                        angular.forEach($documentService.getRevisions(), function(revision, key){

                                            // Prepare sub-promises
                                            var checkout_descriptions_deferred = $q.defer();
                                            var checkout_concerns_deferred = $q.defer();
                                            var checkout_comments_deferred = $q.defer();
                                            var checkout_reviewers_deferred = $q.defer();

                                            // Checkout descriptions
                                            $descriptionService.getByRevision(revision.revision_id)
                                            .then(function onSuccess(response) {
                                                $documentService.setDescriptions(revision.revision_id, response.data);
                                                // Resolve sub-promise
                                                checkout_descriptions_deferred.resolve();
                                            })
                                            .catch(function onError(response) {
                                                $window.alert(response.data);
                                                $scope.redirect("/documents");
                                            });

                                            // Checkout concerns
                                            $concernService.getByRevision(revision.revision_id)
                                            .then(function onSuccess(response) {
                                                $documentService.setConcerns(revision.revision_id, response.data);
                                                // Resolve sub-promise
                                                checkout_concerns_deferred.resolve();
                                            })
                                            .catch(function onError(response) {
                                                $window.alert(response.data);
                                                $scope.redirect("/documents");
                                            });

                                            // Checkout comments
                                            $commentService.getByRevision(revision.revision_id)
                                            .then(function onSuccess(response) {
                                                $documentService.setComments(revision.revision_id, response.data);
                                                // Resolve sub-promise
                                                checkout_comments_deferred.resolve();
                                            })
                                            .catch(function onError(response) {
                                                $window.alert(response.data);
                                                $scope.redirect("/documents");
                                            });

                                            // Checkout reviewers
                                            $reviewerService.getByRevision(revision.revision_id)
                                            .then(function onSuccess(response) {
                                                $documentService.setReviewers(revision.revision_id, response.data);
                                                // Resolve sub-promise
                                                checkout_reviewers_deferred.resolve();
                                            })
                                            .catch(function onError(response) {
                                                $window.alert(response.data);
                                                $scope.redirect("/documents");
                                            });

                                            // Sub-promises
                                            checkout_descriptions_deferred.promise.then(function(){
                                                return;
                                            });
                                            checkout_concerns_deferred.promise.then(function() {
                                                return;
                                            });
                                            checkout_comments_deferred.promise.then(function() {
                                                return;
                                            });
                                            checkout_reviewers_deferred.promise.then(function() {
                                                return;
                                            });

                                            // Start parallel sub-requests
                                            $q.all([
                                                checkout_descriptions_deferred.promise,
                                                checkout_concerns_deferred.promise,
                                                checkout_comments_deferred.promise,
                                                checkout_reviewers_deferred.promise
                                            ]).then(function(){
                                                // Resolve main-promises
                                                revision_promises.push(checkout_revisions_deferred.resolve());
                                            });

                                        });

                                        // Start parallel requests for each revision
                                        $q.all(revision_promises).then(function(){

                                            // Update navbar
                                            $scope.$parent.document = $documentService.get();
                                            $scope.$parent.loading = { status: false, message: "" };

                                            // Redirect
                                            $scope.redirect("/documents/" + $routeParams.document_id + "/review");

                                        });
                                    })
                                    .catch(function onError(response) {
                                        $window.alert(response.data);
                                        $scope.redirect("/documents");
                                    });
                                }, 400);
                            })
                            .catch(function onError(response) {
                                $window.alert(response.data);
                                $scope.redirect("/documents");
                            });
                        }, 400);
                    })
                    .catch(function onError(response) {
                        $window.alert(response.data);
                        $scope.redirect("/documents");
                    });
                }, 400);
            })
            .catch(function onError(response) {
                $scope.redirect("/documents");
            });
        })
        .catch(function onError(response) {
            $scope.redirect("/documents");
        });
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
    $scope.$parent.loading = { status: true, message: $filter('translate')('LOADING_OVERVIEW') };
    $scope.document = $documentService.get();
    $scope.latest_revision = $documentService.getLatestRevision();
    $scope.authenticated_member = $authenticationService.get();
    
    switch($scope.document.status) {
        case 0:
            $scope.document.statusText = "initialized"
            break;
        case 1:
            $scope.document.statusText = "unsubmitted (in progress)"
            break;
        case 2:
            $scope.document.statusText = "auto-accepted (submitted without concerns)"
            break;
        case 3:
            $scope.document.statusText = "review required (submitted with concerns)"
            break;
        case 4:
            $scope.document.statusText = "under review (review in progress)"
            break;
        case 5:
            $scope.document.statusText = "reviewed & partly accepted"
            break;
        case 6:
            $scope.document.statusText = "reviewed & accepted"
            break;
        case 7:
            $scope.document.statusText = "reviewed & rejected"
            break;
    }

    // Update navbar
    $scope.$parent.document = $documentService.get();

    // Overwrite status
    $scope.overwrite = false;

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

    // Show all comments and history
    $scope.toggle('general', 'history');
    $scope.toggle('descriptions', 'history', 'en');
    $scope.toggle('descriptions', 'history', 'de');
    $scope.toggle('descriptions', 'history', 'pt');
    $scope.toggle('concerns', 'history');

    $scope.$parent.loading = { status: false, message: "" };

});
