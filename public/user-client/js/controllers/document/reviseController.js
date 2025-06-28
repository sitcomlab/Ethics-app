var app = angular.module("ethics-app");


// Document revise controller
app.controller("documentReviseController", function($scope, $rootScope, $filter, $translate, $location, config, $window, $q, $authenticationService, $documentService, $descriptionService, $concernService, upload) {

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
     * []
     */
    $scope.resetFile = function(){
        $scope.uploadstatus = "fail";
        $scope.latest_revision.concerns.q14_filename = null;
    };

    /**
     * [upload file]
     * @return {[type]} [file]
     */
    $scope.doUpload = function (files) {
        $scope.uploadstatus = "uploading";
        upload({
          url: config.getUploadEndpoint() + $scope.latest_revision.concerns.concern_id,
          method: 'POST',
          headers: {
              'Authorization': 'Bearer ' + $authenticationService.getToken(),
              'X-DocumentId' : $documentService.getId()
            },
          data: {
            filename: files[0], // a jqLite type="file" element, upload() will extract all the files from the input and put them into the FormData object before sending.
          }
        }).then(
          function (response) {
            $scope.uploadstatus = "success";
            $scope.latest_revision.concerns.q14_file = true;
            $scope.latest_revision.concerns.q14_filename = files[0].name;
            $scope.latest_revision.concerns.q14_filepath = response.data;
          },
          function (response) {
            $scope.uploadstatus = "fail";
            $window.alert($filter('translate')('ALERT_UPLOAD_FILE_FAILED'));
          }
        );
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
     * [saveDocument description]
     * @return {[type]} [description]
     */
    $scope.saveDocument = function(tab){
        $scope.$parent.loading = { status: true, message: $filter('translate')('AUTO_SAVING') };

        var save_descriptions = $q.defer();
        var save_concerns = $q.defer();

        // Save description
        $descriptionService.save($scope.latest_revision.descriptions.description_id, $scope.latest_revision.descriptions)
        .then(function onSuccess(response) {
            save_descriptions.resolve();
        })
        .catch(function onError(response) {
            $window.alert(response.data);
        });

        // Save concern
        $concernService.save($scope.latest_revision.concerns.concern_id, $scope.latest_revision.concerns)
        .then(function onSuccess(response) {
            save_concerns.resolve();
        })
        .catch(function onError(response) {
            $window.alert(response.data);
        });

        // Promises
        save_descriptions.promise.then(function(){
            return;
        });
        save_concerns.promise.then(function() {
            return;
        });

        // Start parallel requests
        $q.all([
            save_descriptions.promise,
            save_concerns.promise
        ]).then(function(){
            $scope.$parent.loading = { status: false, message: ""};

            // Redirect
            if(tab !== null){;
                $scope.tab = tab;
            } else {
                $scope.redirect("/documents/" + $documentService.getId() + "/status/" + $documentService.getStatus());
            }
        });
    };

    /**
     * [submit description]
     * @return {[type]} [description]
     */
    $scope.submit = function() {
        // Validate input
        if($scope.editDocumentForm.$invalid || ($scope.latest_revision.concerns.q14_filename == null && $scope.editDocumentForm.q14_value.$modelValue)) {
            // Update UI

            // Descriptions (en)
            $scope.editDocumentForm.en_title.$pristine = false;
            $scope.editDocumentForm.en_researcher.$pristine = false;
            $scope.editDocumentForm.en_study_time.$pristine = false;
            $scope.editDocumentForm.en_purpose_and_procedure.$pristine = false;
            $scope.editDocumentForm.en_purpose.$pristine = false;
            $scope.editDocumentForm.en_procedure.$pristine = false;
            $scope.editDocumentForm.en_duration.$pristine = false;
            $scope.editDocumentForm.en_risks.$pristine = false;
            $scope.editDocumentForm.en_benefits.$pristine = false;

            // Descriptions (de)
            $scope.editDocumentForm.de_title.$pristine = false;
            $scope.editDocumentForm.de_researcher.$pristine = false;
            $scope.editDocumentForm.de_study_time.$pristine = false;
            $scope.editDocumentForm.de_purpose_and_procedure.$pristine = false;
            $scope.editDocumentForm.de_purpose.$pristine = false;
            $scope.editDocumentForm.de_procedure.$pristine = false;
            $scope.editDocumentForm.de_duration.$pristine = false;
            $scope.editDocumentForm.de_risks.$pristine = false;
            $scope.editDocumentForm.de_benefits.$pristine = false;

            // Descriptions (pt)
            $scope.editDocumentForm.pt_title.$pristine = false;
            $scope.editDocumentForm.pt_researcher.$pristine = false;
            $scope.editDocumentForm.pt_study_time.$pristine = false;
            $scope.editDocumentForm.pt_purpose_and_procedure.$pristine = false;
            $scope.editDocumentForm.pt_purpose.$pristine = false;
            $scope.editDocumentForm.pt_procedure.$pristine = false;
            $scope.editDocumentForm.pt_duration.$pristine = false;
            $scope.editDocumentForm.pt_risks.$pristine = false;
            $scope.editDocumentForm.pt_benefits.$pristine = false;

            // Conerns (values)
            $scope.editDocumentForm.q01_value.$pristine = false;
            $scope.editDocumentForm.q02_value.$pristine = false;
            $scope.editDocumentForm.q03_value.$pristine = false;
            $scope.editDocumentForm.q04_value.$pristine = false;
            $scope.editDocumentForm.q05_value.$pristine = false;
            $scope.editDocumentForm.q06_value.$pristine = false;
            $scope.editDocumentForm.q07_value.$pristine = false;
            $scope.editDocumentForm.q08_value.$pristine = false;
            $scope.editDocumentForm.q09_1_value.$pristine = false;
            $scope.editDocumentForm.q09_2_value.$pristine = false;
            $scope.editDocumentForm.q10_value.$pristine = false;
            $scope.editDocumentForm.q11_1_value.$pristine = false;
            $scope.editDocumentForm.q11_2_value.$pristine = false;
            $scope.editDocumentForm.q12_value.$pristine = false;
            $scope.editDocumentForm.q13_value.$pristine = false;
            $scope.editDocumentForm.q14_value.$pristine = false;
            $scope.editDocumentForm.q15_1_value.$pristine = false;
            $scope.editDocumentForm.q15_2_value.$pristine = false;
            $scope.editDocumentForm.q15_3_value.$pristine = false;

            // Conerns (explanations)
            if($scope.editDocumentForm.q01_explanation){
                $scope.editDocumentForm.q01_explanation.$pristine = false;
            }
            if($scope.editDocumentForm.q02_explanation){
                $scope.editDocumentForm.q02_explanation.$pristine = false;
            }
            if($scope.editDocumentForm.q03_explanation){
                $scope.editDocumentForm.q03_explanation.$pristine = false;
            }
            if($scope.editDocumentForm.q04_explanation){
                $scope.editDocumentForm.q04_explanation.$pristine = false;
            }
            if($scope.editDocumentForm.q05_explanation){
                $scope.editDocumentForm.q05_explanation.$pristine = false;
            }
            if($scope.editDocumentForm.q06_explanation){
                $scope.editDocumentForm.q06_explanation.$pristine = false;
            }
            if($scope.editDocumentForm.q07_explanation){
                $scope.editDocumentForm.q07_explanation.$pristine = false;
            }
            if($scope.editDocumentForm.q08_explanation){
                $scope.editDocumentForm.q08_explanation.$pristine = false;
            }
            if($scope.editDocumentForm.q09_1_explanation){
                $scope.editDocumentForm.q09_1_explanation.$pristine = false;
            }
            if($scope.editDocumentForm.q09_2_explanation){
                $scope.editDocumentForm.q09_2_explanation.$pristine = false;
            }
            if($scope.editDocumentForm.q10_explanation){
                $scope.editDocumentForm.q10_explanation.$pristine = false;
            }
            if($scope.editDocumentForm.q11_1_explanation){
                $scope.editDocumentForm.q11_1_explanation.$pristine = false;
            }
            if($scope.editDocumentForm.q11_2_explanation){
                $scope.editDocumentForm.q11_2_explanation.$pristine = false;
            }
            if($scope.editDocumentForm.q12_explanation){
                $scope.editDocumentForm.q12_explanation.$pristine = false;
            }
            if($scope.editDocumentForm.q13_explanation){
                $scope.editDocumentForm.q13_explanation.$pristine = false;
            }
            if($scope.editDocumentForm.q14_explanation){
                $scope.editDocumentForm.q14_explanation.$pristine = false;
            }
            if($scope.editDocumentForm.q15_1_explanation){
                $scope.editDocumentForm.q15_1_explanation.$pristine = false;
            }
            if($scope.editDocumentForm.q15_2_explanation){
                $scope.editDocumentForm.q15_2_explanation.$pristine = false;
            }
            if($scope.editDocumentForm.q15_3_explanation){
                $scope.editDocumentForm.q15_3_explanation.$pristine = false;
            }

            $window.alert($filter('translate')('ALERT_SUBMIT_DOCUMENT_FAILED'));
        } else {
            $scope.$parent.loading = { status: true, message: $filter('translate')('SUBMITTING_DOCUMENT') };

            // Submit document
            $documentService.submit($documentService.getId())
            .then(function onSuccess(response) {
                $scope.redirect("/documents/" + $documentService.getId());
            })
            .catch(function onError(response) {
                $window.alert(response.data);
            });
        }
    };


    /*************************************************
        INIT
     *************************************************/
    $scope.$parent.loading = { status: true, message: $scope.$parent.loading.message };
    $scope.document = $documentService.get();
    $scope.latest_revision = $documentService.getLatestRevision();
    $scope.tab = 0;

    // Check status
    if($documentService.getStatus()>1 && $documentService.getStatus()!=5){
        // Redirect
        $scope.redirect("/documents/" + $documentService.getId() + "/status/" + $documentService.getStatus());
    }

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
    if($scope.latest_revision.descriptions.de_used){
        $scope.toggle('descriptions', 'history', 'de');
    } else {
        $scope.toggle('descriptions', 'language', 'de');
    }
    if($scope.latest_revision.descriptions.pt_used){
        $scope.toggle('descriptions', 'history', 'pt');
    } else {
        $scope.toggle('descriptions', 'language', 'de');
    }
    $scope.toggle('concerns', 'history');

    if ($scope.latest_revision.concerns.q14_filename !== null) {
        $scope.uploadstatus= 'success';
    }

    $scope.$parent.loading = { status: false, message: "" };
});
