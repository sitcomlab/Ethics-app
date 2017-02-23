var app = angular.module("ethics-app");


// Document details controller
app.controller("documentDetailsController", function($scope, $rootScope, $routeParams, $translate, $location, config, $window, $q, $timeout, $authenticationService, $documentService, $revisionService, $descriptionService, $concernService, $reviewService, $fileService) {

    /*************************************************
        FUNCTIONS
     *************************************************/

    /**
     * [changeTab description]
     * @param  {[type]} tab [description]
     * @return {[type]}     [description]
     */
    $scope.changeTab = function(tab){
        $scope.tab = tab;
    };

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
    $scope.changeTab(0);
    $scope.loading_message = "Loading document";

    $timeout(function(){
        // Authentication
        $authenticationService.loginByDocumentId($routeParams.document_id)
        .success(function(response) {
            $authenticationService.set(response);

            // Load document
            $documentService.retrieve($routeParams.document_id)
            .success(function(response) {
                $documentService.set(response);

                // Load revisions
                $revisionService.listByDocument($documentService.getId())
                .success(function(response) {
                    $documentService.setRevisions(response);

                    // Load descriptions, concerns and reviews for each revision
                    angular.forEach($documentService.getRevisions(), function(revision, key) {

                        // Prepare promises
                        var checkout_description = $q.defer();
                        var checkout_concern = $q.defer();
                        var checkout_review = $q.defer();

                        // Checkout descriptions
                        $descriptionService.getByRevision(revision.revision_id)
                        .success(function(response) {
                            $documentService.setDescription(revision.revision_id, response);
                            // Resolve promise
                            checkout_description.resolve();
                        })
                        .error(function(response) {
                            $window.alert(response);
                        });

                        // Checkout concerns
                        $concernService.getByRevision(revision.revision_id)
                        .success(function(response) {
                            $documentService.setConcern(revision.revision_id, response);
                            // Resolve promise
                            checkout_concern.resolve();
                        })
                        .error(function(response) {
                            $window.alert(response);
                        });

                        // Checkout reviews
                        $reviewService.getByRevision(revision.revision_id)
                        .success(function(response) {
                            $documentService.setReview(revision.revision_id, response);
                            // Resolve promise
                            checkout_review.resolve();
                        })
                        .error(function(response) {
                            $window.alert(response);
                        });


                        // Promises
                        checkout_description.promise.then(function(){
                            return;
                        });
                        checkout_concern.promise.then(function() {
                            return;
                        });
                        checkout_review.promise.then(function() {
                            return;
                        });


                        // Start parallel requests
                        var all = $q.all([
                            checkout_description.promise,
                            checkout_concern.promise,
                            checkout_review.promise
                        ]);

                        // Final task after requests
                        all.then(function(){
                            // Update navbar
                            $rootScope.$broadcast('updateNavbar');

                            // Prepare path
                            var path = "/documents/" + $documentService.getId() + "/status/" + $documentService.getStatus();

                            // Check status
                            if($documentService.getStatus()===2 || $documentService.getStatus()===6){

                                if($fileService.get()){
                                    $documentService.setFiles($fileService.get());
                                    $scope.redirect(path);
                                } else {
                                    $scope.loading_message = "Generating files";

                                    $documentService.generateFiles($documentService.getId())
                                    .success(function(response) {
                                        $fileService.set(response);
                                        $documentService.setFiles($fileService.get());
                                        $scope.redirect(path);
                                    })
                                    .error(function(response) {
                                        $window.alert(response);
                                    });
                                }
                            } else {
                                $scope.redirect(path);
                            }
                        });
                    });
                })
                .error(function(response) {
                    $window.alert(response);
                    $scope.redirect("/");
                });
            })
            .error(function(response) {
                $window.alert(response);
                $scope.redirect("/");
            });
        })
        .error(function(response) {
            $window.alert(response);
            $scope.redirect("/");
        });
    }, 1000);

});
