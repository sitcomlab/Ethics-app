var app = angular.module("ethics-app");


app.controller("RecoverController", function($scope, $rootScope, $timeout, $translate, $location, $log, config, $ngBootbox, $docService) {

    /**
     * Init
     */
    $scope.email_address = "";


    /**
     * Submit request
     */
    $scope.send = function() {

        // Validate Email-Address
        if($scope.email_address === "") {

            $ngBootbox.customDialog({
                message: '<span class="text-warning">Please input a valid Email-address!</span>',
                title: '<i class="fa fa-exclamation-triangle"></i>&nbsp;&nbsp;Attention',
                buttons: {
                    success: {
                        label: 'Okay',
                        className: "btn-primary",
                        callback: function() {}
                    }
                }
            });

        } else {

            // Send request
            $docService.recover($scope.email_address)
    		.success(function(response) {
                $ngBootbox.customDialog({
                    message: '<span class="text-success">An Email was sent to your address!</span>',
                    title: '<i class="fa fa-info-circle"></i>&nbsp;&nbsp;Information',
                    buttons: {
                        success: {
                            label: 'Okay',
                            className: "btn-primary",
                            callback: function() {
                                $timeout(function(){
                                    $location.url("/");
                                },1);
                            }
                        }
                    }
                });
    	    })
    		.error(function(response) {
                $ngBootbox.customDialog({
                    message: '<span class="text-danger">No Document could be found with this Email-address!</span>',
                    title: '<i class="fa fa-exclamation-triangle"></i>&nbsp;&nbsp;Attention',
                    buttons: {
                        success: {
                            label: 'Okay',
                            className: "btn-primary",
                            callback: function() {}
                        }
                    }
                });
            });
        }

    };

});
