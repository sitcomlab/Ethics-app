var app = angular.module("ethics-app");


// Document status 5 controller
app.controller("statusController_5", function($scope, $rootScope, $routeParams, $translate, $location, config, $window, $q, $documentService, $revisionService, $descriptionService, $concernService) {

    /**
     * [load description]
     * @return {[type]} [description]
     */
    $scope.load = function(page){

        // Show loading screen
        $scope.page = 0;

        if($documentService.get()){
            $scope.document = $documentService.get();

            // Load revisions
            $revisionService.listByDocument($documentService.getId())
            .success(function(response) {
                $documentService.setRevisions(response);
                $scope.document = $documentService.get();

                // Checkout descriptions for each revision
                angular.forEach($documentService.getRevisions(), function(revision, key) {

                    // Prepare promises
                    var checkout_descriptions_en = $q.defer();
                    var checkout_descriptions_en_comments = $q.defer();
                    var checkout_descriptions_de = $q.defer();
                    var checkout_descriptions_de_comments = $q.defer();
                    var checkout_concerns = $q.defer();
                    var checkout_concern_comments = $q.defer();

                    // Checkout descriptions (English)
                    $descriptionService.getByRevision(revision.revision_id, 'en')
                    .success(function(response) {
                        $documentService.setDescription(revision.revision_id, 'en', response);
                        // Resolve promise
                        checkout_descriptions_en.resolve();
                    })
                    .error(function(response) {
                        $window.alert(response);
                    });

                    // Checkout descriptions (German)
                    $descriptionService.getByRevision(revision.revision_id, 'de')
                    .success(function(response) {
                        $documentService.setDescription(revision.revision_id, 'de', response);
                        // Resolve promise
                        checkout_descriptions_de.resolve();
                    })
                    .error(function(response) {
                        $window.alert(response);
                    });

                    // TODO: Checkout description_comments (English)
                    checkout_descriptions_en_comments.resolve();

                    // TODO: Checkout description_comments (German)
                    checkout_descriptions_de_comments.resolve();

                    // Checkout concerns
                    $concernService.getByRevision(revision.revision_id)
                    .success(function(response) {
                        $documentService.setConcerns(revision.revision_id, response);
                        // Resolve promise
                        checkout_concerns.resolve();
                    })
                    .error(function(response) {
                        $window.alert(response);
                    });


                    // TODO: Checkout concern_comments
                    checkout_concern_comments.resolve();


                    // Promises
                    checkout_descriptions_en.promise.then(function(){
                        return;
                    });
                    checkout_descriptions_en_comments.promise.then(function() {
                        return;
                    });
                    checkout_descriptions_de.promise.then(function() {
                        return;
                    });
                    checkout_descriptions_de_comments.promise.then(function() {
                        return;
                    });
                    checkout_concerns.promise.then(function() {
                        return;
                    });
                    checkout_concern_comments.promise.then(function() {
                        return;
                    });


                    // Start parallel requests
                    var all = $q.all([
                        checkout_descriptions_en.promise,
                        checkout_descriptions_en_comments.promise,
                        checkout_descriptions_de.promise,
                        checkout_descriptions_de_comments.promise,
                        checkout_concerns.promise,
                        checkout_concern_comments.promise
                    ]);

                    // Final task after requests
                    all.then(function(){
                        // Load latest revision
                        $scope.latest_revision = $documentService.getLatestRevision();

                        // Redirect
                        if($documentService.getStatus() > 0){
                            $scope.page = page;
                        } else {
                            // Show intro
                            $scope.page = 1;
                        }

                    });

                });
            })
            .error(function(response) {
                console.log(response);
            });
        } else {
            // Redirect
            $location.url("/");
        }
    };


    // Init
    $scope.load(1);


    /**
     * [nextPage description]
     * @return {[type]} [description]
     */
    $scope.nextPage = function(){
        $scope.save(false);
        $scope.page = $scope.page+1;
        $window.scrollTo(0, 0);
    };


    /**
     * [previousPage description]
     * @return {[type]} [description]
     */
    $scope.previousPage = function(){
        $scope.save(false);
        $scope.page = $scope.page-1;
        $window.scrollTo(0, 0);
    };



    $scope.sendComment = function(comment){
        // TODO:
    };


    /**
     * [save description]
     * @return {[type]} [description]
     */
    $scope.save = function(finalSubmit){

        var save_description_en = $q.defer();
        var save_description_de = $q.defer();
        var save_concerns = $q.defer();

        // Save descriptions (English)
        $descriptionService.save($scope.latest_revision.en.description_id, $scope.latest_revision.en)
        .success(function(response) {
            save_description_en.resolve();
        })
        .error(function(response) {
            $window.alert(response);
        });

        // Save descriptions (German)
        $descriptionService.save($scope.latest_revision.de.description_id, $scope.latest_revision.de)
        .success(function(response) {
            save_description_de.resolve();
        })
        .error(function(response) {
            $window.alert(response);
        });

        // Save concerns
        $concernService.save($scope.latest_revision.concerns.concern_id, $scope.latest_revision.concerns)
        .success(function(response) {
            save_concerns.resolve();
        })
        .error(function(response) {
            $window.alert(response);
        });

        // Promises
        save_description_en.promise.then(function(){
            return;
        });
        save_description_de.promise.then(function() {
            return;
        });
        save_concerns.promise.then(function() {
            return;
        });

        // Start parallel requests
        var all = $q.all([
            save_description_en.promise,
            save_description_de.promise,
            save_concerns.promise
        ]);

        // Final task after requests
        all.then(function(){
            if(finalSubmit){
                $scope.load(0);
                $documentService.submit($documentService.getId())
                .success(function(response) {
                    $window.alert("Your document has been submitted successfully!");
                    // Redirect
                    $location.url("/documents/" + $documentService.getId());
                })
                .error(function(response) {
                    $window.alert(response);
                });
            } else {
                $scope.load($scope.page);
            }
        });

    };


});
