var app = angular.module("ethics-app");


// Document edit controller
app.controller("documentEditController", function($scope, $rootScope, $translate, $location, config, $window, $q, $authenticationService, $documentService, $descriptionService, $concernService) {

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
     * [closeEditing description]
     * @return {[type]} [description]
     */
    $scope.closeEditing = function(){
        $scope.redirect("/documents/" + $documentService.getId() + "/status/" + $documentService.getStatus());
    };

    /**
     * [saveDocument description]
     * @return {[type]} [description]
     */
    $scope.saveDocument = function(tab){
        $scope.changeTab(0);

        var save_description = $q.defer();
        var save_concern = $q.defer();

        // Save description
        $descriptionService.save($scope.latest_revision.description.description_id, $scope.latest_revision.description)
        .then(function onSuccess(response) {
            save_description.resolve();
        })
        .catch(function onError(response) {
            $window.alert(response.data);
        });

        // Save concern
        $concernService.save($scope.latest_revision.concern.concern_id, $scope.latest_revision.concern)
        .then(function onSuccess(response) {
            save_concern.resolve();
        })
        .catch(function onError(response) {
            $window.alert(response.data);
        });

        // Promises
        save_description.promise.then(function(){
            return;
        });
        save_concern.promise.then(function() {
            return;
        });

        // Start parallel requests
        var all = $q.all([
            save_description.promise,
            save_concern.promise
        ]);

        // Final task after requests
        all.then(function(){
            if(tab){
                $scope.changeTab(tab);
                $window.scrollTo(0, 0);
            } else {
                $scope.showIntro();
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

            $window.alert("Your document can not be submitted, please fill out all required fields");
        } else {
            $scope.changeTab(0);

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
    $scope.changeTab(0);
    $scope.latest_revision = $documentService.getLatestRevision();
    $scope.changeTab(1);

    // Check status
    if($documentService.getStatus()>1 && $documentService.getStatus()!=5){
        $scope.redirect("/documents/" + $documentService.getId() + "/status/" + $documentService.getStatus());
    }

});
