var app = angular.module("ethics-app");


app.controller("RecoverController", function($scope, $translate, $location, $log, config, $docService) {

    // Init
    $scope.email = "";

    // Login with DocumentId
    $scope.send = function() {

        // Validate
        if($scope.email_address === "") {
            // TODO: Email-validation
            alert("Please enter a valid Email-Address!");
        } else {

            // Send request
            $docService.recover($scope.email_address)
    			.success(function(response) {
    	            $location.url("/");
    	        })
    			.error(function(response) {
    				alert("Email-Address ot found!");
    			});
        }

    };

});
