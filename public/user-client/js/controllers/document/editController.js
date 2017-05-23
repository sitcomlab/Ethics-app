var app = angular.module("ethics-app");


// Document edit controller
app.controller("documentEditController", function($scope, $rootScope, $filter, $translate, $location, config, $window, $q, $authenticationService, $documentService, $descriptionService, $concernService) {

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
        $scope.redirect("/documents/" + $documentService.getId() + "/status/" + $documentService.getStatus());
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
            if(tab > 0){
                $scope.$parent.loading = { status: false, message: ""};
                $scope.changeTab(tab);
                $window.scrollTo(0, 0);
            } else {
                $scope.redirect("/documents/" + $scope.document.document_id + "/intro");
            }
        });
    };

    /**
     * [submit description]
     * @return {[type]} [description]
     */
    $scope.submit = function() {
        // Validate input
        if($scope.editDocumentForm.$invalid) {
            // Update UI

            // Descriptions (en)
            $scope.editDocumentForm.en_title.$pristine = false;
            $scope.editDocumentForm.en_researcher.$pristine = false;
            $scope.editDocumentForm.en_study_time.$pristine = false;
            $scope.editDocumentForm.en_purpose.$pristine = false;
            $scope.editDocumentForm.en_procedure.$pristine = false;
            $scope.editDocumentForm.en_duration.$pristine = false;
            $scope.editDocumentForm.en_risks.$pristine = false;
            $scope.editDocumentForm.en_benefits.$pristine = false;

            // Descriptions (de)
            $scope.editDocumentForm.de_title.$pristine = false;
            $scope.editDocumentForm.de_researcher.$pristine = false;
            $scope.editDocumentForm.de_study_time.$pristine = false;
            $scope.editDocumentForm.de_purpose.$pristine = false;
            $scope.editDocumentForm.de_procedure.$pristine = false;
            $scope.editDocumentForm.de_duration.$pristine = false;
            $scope.editDocumentForm.de_risks.$pristine = false;
            $scope.editDocumentForm.de_benefits.$pristine = false;

            // Descriptions (pt)
            $scope.editDocumentForm.pt_title.$pristine = false;
            $scope.editDocumentForm.pt_researcher.$pristine = false;
            $scope.editDocumentForm.pt_study_time.$pristine = false;
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
            $scope.editDocumentForm.q09_value.$pristine = false;
            $scope.editDocumentForm.q10_value.$pristine = false;
            $scope.editDocumentForm.q11_1_value.$pristine = false;
            $scope.editDocumentForm.q11_2_value.$pristine = false;
            $scope.editDocumentForm.q12_value.$pristine = false;
            $scope.editDocumentForm.q13_value.$pristine = false;

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
            if($scope.editDocumentForm.q09_explanation){
                $scope.editDocumentForm.q09_explanation.$pristine = false;
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
    $scope.latest_revision = $documentService.getLatestRevision();

    // Check status
    if($documentService.getStatus()>1 && $documentService.getStatus()!=5){
        // Redirect
        $scope.redirect("/documents/" + $documentService.getId() + "/status/" + $documentService.getStatus());
    } else {
        $scope.$parent.loading = { status: false, message: "" };
        $scope.changeTab(1);
    }

});
