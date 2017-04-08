var app = angular.module("ethics-app");


// Document details controller
app.controller("documentDetailsController", function($scope, $rootScope, $routeParams, $translate, $location, config, $window, $q, $timeout, $authenticationService, $documentService, $revisionService, $descriptionService, $concernService, $commentService, $reviewerService, $fileService) {

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

    $timeout(function(){
        $scope.$parent.loading = { status: true, message: "Check authentication" };

        $timeout(function(){
            // Authentication
            $authenticationService.loginByDocumentId($routeParams.document_id)
            .then(function onSuccess(response) {
                $authenticationService.set(response.data);
                $scope.$parent.loading = { status: true, message: "Loading document" };

                $timeout(function(){
                    // Load document
                    $documentService.retrieve($routeParams.document_id)
                    .then(function onSuccess(response) {
                        $documentService.set(response.data);
                        $scope.$parent.loading = { status: true, message: "Loading revisions" };

                        $timeout(function(){
                            // Load revisions
                            $revisionService.listByDocument($documentService.getId())
                            .then(function onSuccess(response) {
                                $documentService.setRevisions(response.data);

                                // Load descriptions, concerns and comments for each revision
                                angular.forEach($documentService.getRevisions(), function(revision, key) {

                                    // Prepare promises
                                    var checkout_descriptions = $q.defer();
                                    var checkout_concerns = $q.defer();
                                    var checkout_comments = $q.defer();
                                    var checkout_reviewers = $q.defer();

                                    // Checkout descriptions
                                    $descriptionService.getByRevision(revision.revision_id)
                                    .then(function onSuccess(response) {
                                        $documentService.setDescriptions(revision.revision_id, response.data);
                                        // Resolve promise
                                        checkout_descriptions.resolve();
                                    })
                                    .catch(function onError(response) {
                                        $window.alert(response.data);
                                    });

                                    // Checkout concerns
                                    $concernService.getByRevision(revision.revision_id)
                                    .then(function onSuccess(response) {
                                        $documentService.setConcerns(revision.revision_id, response.data);
                                        // Resolve promise
                                        checkout_concerns.resolve();
                                    })
                                    .catch(function onError(response) {
                                        $window.alert(response.data);
                                    });

                                    // Checkout comments
                                    $commentService.getByRevision(revision.revision_id)
                                    .then(function onSuccess(response) {
                                        $documentService.setComments(revision.revision_id, response.data);
                                        // Resolve promise
                                        checkout_comments.resolve();
                                    })
                                    .catch(function onError(response) {
                                        $window.alert(response.data);
                                    });

                                    // Checkout reviewers
                                    $reviewerService.getByRevision(revision.revision_id)
                                    .then(function onSuccess(response) {
                                        $documentService.setReviewers(revision.revision_id, response.data);
                                        // Resolve promise
                                        checkout_reviewers.resolve();
                                    })
                                    .catch(function onError(response) {
                                        $window.alert(response.data);
                                    });


                                    // Promises
                                    checkout_descriptions.promise.then(function(){
                                        return;
                                    });
                                    checkout_concerns.promise.then(function() {
                                        return;
                                    });
                                    checkout_comments.promise.then(function() {
                                        return;
                                    });
                                    checkout_reviewers.promise.then(function() {
                                        return;
                                    });


                                    // Start parallel requests
                                    var all = $q.all([
                                        checkout_descriptions.promise,
                                        checkout_concerns.promise,
                                        checkout_comments.promise,
                                        checkout_reviewers.promise
                                    ]);

                                    // Final task after requests
                                    all.then(function(){
                                        // Update navbar
                                        $rootScope.$broadcast('updateNavbar');

                                        // Check status for files
                                        if($documentService.getStatus()===2 || $documentService.getStatus()===6){

                                            // Check if files were cached
                                            if($fileService.get()){
                                                $documentService.setFiles($fileService.get());
                                                $scope.redirect("/documents/" + $documentService.getId() + "/status/" + $documentService.getStatus());
                                            } else {
                                                $scope.$parent.loading = { status: true, message: "Generating files" };

                                                // Generate files on server
                                                $documentService.generateFiles($documentService.getId())
                                                .then(function onSuccess(response) {
                                                    $fileService.set(response.data);
                                                    $documentService.setFiles($fileService.get());

                                                    // Redirect
                                                    $scope.redirect("/documents/" + $documentService.getId() + "/status/" + $documentService.getStatus());

                                                })
                                                .catch(function onError(response) {
                                                    $window.alert(response.data);
                                                });
                                            }
                                        } else {

                                            // Redirect
                                            $scope.redirect("/documents/" + $documentService.getId() + "/status/" + $documentService.getStatus());
                                        }
                                    });
                                });
                            })
                            .catch(function onError(response) {
                                $window.alert(response.data);
                                $scope.redirect("/");
                            });
                        }, 400);
                    })
                    .catch(function onError(response) {
                        $window.alert(response.data);
                        $scope.redirect("/");
                    });
                }, 400);
            })
            .catch(function onError(response) {
                $window.alert(response.data);
                $scope.redirect("/");
            });
        }, 400);
    }, 1000);

});
