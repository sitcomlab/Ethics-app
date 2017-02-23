var app = angular.module("ethics-app");

// Document controller
app.controller("documentEditController", function($scope, $rootScope, $translate, $location, config, $window, $q, $authenticationService, $documentService, $revisionService, $descriptionService, $concernService) {


    /**
     * [load description]
     * @return {[type]} [description]
     */
    $scope.load = function(tab){

        // Show loading screen
        $scope.tab = 0;

        // Get document
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
                        $scope.tab = tab;
                    } else {
                        // Show intro
                        $scope.tab = 1;
                    }

                });

            });
        })
        .error(function(response) {
            console.log(response);
        });
    };


    // Init
    $scope.load(2);


    /**
     * [nextTab description]
     * @return {[type]} [description]
     */
    $scope.nextTab = function(){
        $scope.tab = $scope.tab+1;
        $window.scrollTo(0, 0);
    };


    /**
     * [previousTab description]
     * @return {[type]} [description]
     */
    $scope.previousTab = function(){
        $scope.tab = $scope.tab-1;
        $window.scrollTo(0, 0);
    };


});
