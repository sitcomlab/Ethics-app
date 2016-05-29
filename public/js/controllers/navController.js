var app = angular.module("ethics-app");


app.controller("NavController", function($scope, $rootScope, $ngBootbox, $translate, $location, $log, config, $docService) {


    /**
     * Highlight active menu button
     */
    $scope.isActive = function(viewLocation) {
        return viewLocation === $location.path();
    };


    /**
     * Init
     */
    $scope.config = config;


    /**
     * Update Navbar, if user logged in
     */
    $rootScope.$on('updateNavbar', function() {
        $scope.doc = $rootScope.doc;
    });


    /**
     * Reset Navbar
     */
    $rootScope.$on('resetNavbar', function() {
        delete $scope.doc;
        delete $rootScope.doc;
    });


    /**
     * Save Document
     */
    $scope.save = function() {
        if ($rootScope.doc.editable) {
            $rootScope.$broadcast('saveDocument');
		}
    };


    /**
     * Delete Document
     */
    $scope.delete = function(doc) {
        if (doc.editable) {
            var message = 'Are you sure you want to delete your Document <kbd>' + doc.project_name + '</kbd>?';

            $ngBootbox.customDialog({
                message: message,
                title: '<i class="fa fa-exclamation-triangle"></i>&nbsp;Attention',
                buttons: {
                    warning: {
                        label: 'Cancel',
                        className: "btn-secondary",
                        callback: function() {}
                    },
                    success: {
                        label: '<i class="fa fa-trash"></i>&nbsp;&nbsp;Delete',
                        className: "btn-danger",
                        callback: function() {
                            $docService.delete($scope.doc._id)
                                .success(function(response) {
                                    delete $scope.doc;
                                    delete $rootScope.doc;
                                    $location.url("/");
                                })
                                .error(function(response) {
                                    alert("An error occured!");
                                });
                        }
                    }
                }
            });
        }
    };


    /**
     * Logout
     */
    $scope.logout = function() {
        if ($rootScope.doc.editable) {
            $rootScope.$broadcast('saveDocument');
		}
        delete $rootScope.doc;
        $rootScope.$broadcast('updateNavbar');
        $location.url("/");
    };


    /**
	 * Update Language
	 *
    $scope.updateLanguage = function(language) {
		$scope.language = language;
        $translate.use($scope.language);
        $log.debug("* Changed Language to: " + $scope.language);
    };*/


});
