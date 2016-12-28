var app = angular.module("ethics-app");


// Document controller
app.controller("documentController", function($scope, $rootScope, $routeParams, $translate, $location, config, $window, $documentService, $revisionService, $userService) {


    // Init
    $scope.tab = 0;
    $scope.page = 0;
    $scope.en = true;
    $scope.de = false;
    $scope.document_id = $routeParams.document_id;
    $documentService.retrieve($routeParams.document_id)
    .success(function(response) {
        $documentService.set(response);
        $scope.document = $documentService.get();
        $scope.updated_document = $documentService.copy();

        // Load revisions
        $revisionService.listByDocument($documentService.getId())
        .success(function(response) {
            $documentService.setRevisions(response);

            // Update navbar
            $rootScope.$broadcast('updateNavbar');
        })
        .error(function(response) {
            console.log(response);
        });

        // Load user
        $userService.retrieve($scope.document.user_id)
        .success(function(response) {
            $userService.set(response);
            $scope.user = $userService.get();
            $scope.updated_user = $userService.copy();

            // Update navbar
            $rootScope.$broadcast('updateNavbar');
        })
        .error(function(response) {
            console.log(response);
        });

    })
    .error(function(response) {
        // Show dialog
        $window.alert(response);
        // Redirect
        $location.url("/");
    });


    /**
     * [cancel description]
     * @return {[type]} [description]
     */
    $scope.cancel = function(){
        // Reset
        $scope.updated_document = $documentService.copy();
        $scope.updated_user = $userService.copy();
        // Redirect
        $scope.tab = 0;
    };


    /**
     * [nextPage description]
     * @return {[type]} [description]
     */
    $scope.nextPage = function(){
        $scope.page = $scope.page+1;
    };


    /**
     * [previousPage description]
     * @return {[type]} [description]
     */
    $scope.previousPage = function(){
        $scope.page = $scope.page-1;
    };


    /**
     * [changeTab description]
     * @param  {[type]} tab [description]
     * @return {[type]}     [description]
     */
    $scope.changeTab = function(tab){
        $scope.tab = tab;
    };


    /**
     * [confirmIntro description]
     * @return {[type]} [description]
     */
    $scope.confirmIntro = function(){
        // TODO: Add intro status, to show it only the 1st time
        // Redirect
        $scope.tab = 0;
    };


    /**
     *
     */
    $rootScope.$on('changeTab', function(event, data) {
        $scope.tab = data.tab;
    });


    /**
     * [saveDocument description]
     * @return {[type]} [description]
     */
    $scope.saveDocument = function(){
        $documentService.edit($documentService.getId(), $scope.updated_document)
        .success(function(response) {
            var _revisions = $documentService.getRivisions();
            $documentService.set(response);
            $documentService.setRevisions(_revisions);
            $scope.document = $documentService.get();
            $scope.updated_document = $documentService.copy();
            // Redirect
            $scope.tab = 0;
            // Update navbar
            $rootScope.$broadcast('updateNavbar');
        })
        .error(function(response) {
            console.log(response);
        });
    };


    /**
     * [saveDocument description]
     * @return {[type]} [description]
     */
    $scope.saveUser = function(){
        $userService.edit($userService.getId(), $scope.updated_user)
        .success(function(response) {
            $userService.set(response);
            $scope.user = $userService.get();
            $scope.updated_user = $userService.copy();
            // Redirect
            $scope.tab = 0;
            // Update navbar
            $rootScope.$broadcast('updateNavbar');
        })
        .error(function(response) {
            console.log(response);
        });
    };

    /**
     * [copyToClipboard description]
     * @return {[type]} [description]
     */
    $scope.copyToClipboard = function(){
        // TODO:
        // Show dialog
        $window.alert("Document-ID copied to clipboard");
    };

});
