var app = angular.module("ethics-app");


// Document review controller
app.controller("documentShowReviewController", function($scope, $rootScope, $routeParams, $translate, $location, config, $window, $authenticationService, $documentService) {

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

    /**
     * [cancel description]
     * @return {[type]} [description]
     */
    $scope.cancel = function(){
        if($authenticationService.get()){
            $scope.redirect("/documents/" + $documentService.getId() + "/status/" + $documentService.getStatus());
        } else {
            $scope.redirect("/");
        }
    };

    /**
     * [showIntro description]
     * @return {[type]} [description]
     */
    $scope.showIntro = function(){
        $scope.redirect("/documents/" + $documentService.getId() + "/intro");
    };

    /**
     * [closeReview description]
     * @return {[type]} [description]
     */
    $scope.closeReview = function(){
        $scope.redirect("/documents/" + $documentService.getId() + "/status/" + $documentService.getStatus());
    };

    /**
     * [toggleGeneralHistory description]
     * @return {[type]} [description]
     */
    $scope.toggleGeneralHistory = function(){
        $scope.generalHistory = !$scope.generalHistory;
    };

    /**
     * [toggleDescriptionHistory description]
     * @param  {[type]} language [description]
     * @return {[type]}          [description]
     */
    $scope.toggleDescriptionHistory = function(language){
        switch (language) {
            case 'en': {
                $scope.descriptionHistoryEn = !$scope.descriptionHistoryEn;
                break;
            }
            case 'de': {
                $scope.descriptionHistoryDe = !$scope.descriptionHistoryDe;
                break;
            }
        }
    };

    /**
     * [toggleDescriptionComments description]
     * @param  {[type]} language [description]
     * @return {[type]}          [description]
     */
    $scope.toggleDescriptionComments = function(language){
        switch (language) {
            case 'en': {
                $scope.descriptionCommentsEn= !$scope.descriptionCommentsEn;
                break;
            }
            case 'de': {
                $scope.descriptionCommentsDe = !$scope.descriptionCommentsDe;
                break;
            }
        }
    };

    /**
     * [toggleConcernHistory description]
     * @param  {[type]} language [description]
     * @return {[type]}          [description]
     */
    $scope.toggleConcernHistory = function(language){
        $scope.concernHistory = !$scope.concernHistory;
    };

    /**
     * [toggleConcernComments description]
     * @param  {[type]} language [description]
     * @return {[type]}          [description]
     */
    $scope.toggleConcernComments = function(language){
        $scope.concernComments = !$scope.concernComments;
    };


    /*************************************************
        INIT
     *************************************************/
    $scope.changeTab(0);
    $scope.document = $documentService.get();
    $scope.latest_revision = $documentService.getLatestRevision();
    $scope.generalHistory = false;
    $scope.descriptionHistoryEn = false;
    $scope.descriptionCommentsEn = false;
    $scope.descriptionHistoryDe = false;
    $scope.descriptionCommentsDe = false;
    $scope.concernHistory = false;
    $scope.concernComments = false;
    $scope.changeTab(1);
});
