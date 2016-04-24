var app = angular.module("ethics-app");


app.controller("LoginController", function($scope, $translate, $location, $log, setup) {

    // Init
    $scope.email = "";

    // Login with DocumentId
    $scope.send = function() {

        // Validate
        if($scope.email === "") {
            // TODO: Real Email-validation
            alert("Please enter a valid Email-Address!");
        } else {

            // Send request
            $docService.reset($scope.email)
    			.success(function(response) {
    	            $location.url("/");
    	        })
    			.error(function(response) {
    				alert("Email-Address ot found!");
    			});
        }

    };

});
