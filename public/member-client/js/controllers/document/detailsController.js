var app = angular.module("ethics-app");


// Document details controller
app.controller("documentDetailsController", function($scope, $rootScope, $routeParams, $filter, $translate, $location, config, $window, $q, $timeout, $authenticationService, $documentService, $documentsService, $revisionService, $descriptionService, $concernService, $commentService, $reviewerService, $fileService, $noteService) {

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
    $scope.$parent.loading = { status: true, message: "Loading document" };

    // Reset
    $documentService.set();

    // Reset navbar
    $scope.$parent.document = false;

    $timeout(function(){
        // Load document
        $documentService.retrieve($routeParams.document_id)
        .then(function onSuccess(response) {
            $documentService.set(response.data);
            $scope.$parent.loading = { status: true, message: "Loading revisions" };

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
                            $documentService.setReviewers(revision.revision_id, response.data || null);
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
                        $scope.$parent.loading = { status: false, message: "" };

                        // Redirect
                        $scope.redirect("/documents/" + $routeParams.document_id + "/overview");

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

});
