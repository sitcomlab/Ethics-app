var app = angular.module("ethics-app");


// Document submission controller
app.controller("documentShowSubmissionController", function($scope, $rootScope, $routeParams, $filter, $translate, $location, config, $window, $authenticationService, $documentService) {

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
     * [push back Document to Status 1]
     * @return {[type]} [description]
     */
    $scope.changeStatusToOne = function(){
        $documentService.changeStatusTo1($documentService.getId());
        $scope.redirect("/");
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

    /*************************************************
        INIT
     *************************************************/
    $scope.$parent.loading = { status: true, message: $filter('translate')('LOADING_SUBMISSION') };
    $scope.document = $documentService.get();
    $scope.latest_revision = $documentService.getLatestRevision();

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
                de: false,
                pt: false
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
