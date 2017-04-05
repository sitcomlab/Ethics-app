var app = angular.module("ethics-app");


// Document review controller
app.controller("documentShowReviewController", function($scope, $rootScope, $routeParams, $translate, $location, config, $window, $authenticationService, $documentService) {

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
     * [cancel description]
     * @return {[type]} [description]
     */
    $scope.cancel = function(){
        $scope.redirect("/documents/" + $documentService.getId() + "/status/" + $documentService.getStatus());
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
                                    $scope.status.descriptions.limit = $scope.document.revisions.length;
                                } else {
                                    $scope.status.descriptions.limit = 1;
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

    /*************************************************
        INIT
     *************************************************/
    $scope.$parent.loading = { status: true, message: "Loading review" };
    $scope.document = $documentService.get();
    console.log($scope.document);
    $scope.latest_revision = $documentService.getLatestRevision();

    $scope.status = {
        general: {
            display: true,
            history: false,
            limit: 1
        },
        descriptions: {
            language: {
                en: true,
                de: $scope.latest_revision.description.de_used,
                pt: $scope.latest_revision.description.pt_used
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
                de: $scope.latest_revision.description.de_used,
                pt: $scope.latest_revision.description.pt_used
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
