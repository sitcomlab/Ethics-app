var app = angular.module("routes", []);


app.config(function($routeProvider, $locationProvider, config) {
	$routeProvider

		// Home
		.when("/", {
			templateUrl: "js/templates/login.html",
			controller: "loginController"
		})
		/*.when("/recovery", {
			templateUrl: "js/templates/recovery.html",
			controller: "recoveryController"
		})

		// Account
		.when("/account/edit", {
			templateUrl: "js/templates/account/edit.html",
			controller: "accountEditController",
			resolve: {
                factory: checkAuthentication
            }
		})

		// New Document
		.when("/new/document", {
			templateUrl: "js/templates/document/create.html",
			controller: "documentCreateController"
		})*/

		// Documents
		.when("/documents", {
			templateUrl: "js/templates/document/list.html",
			controller: "documentListController",
			resolve: {
                factory: checkAuthentication
            }
		})
		/*.when("/documents/:document_id", {
			// (main entry point to login by document-ID)
			templateUrl: "js/templates/document/details.html",
			controller: "documentDetailsController",
		})
		.when("/documents/:document_id/edit", {
			templateUrl: "js/templates/document/edit.html",
			controller: "documentEditController",
			resolve: {
                factory: checkAuthentication
            }
		})
		.when("/documents/:document_id/settings", {
			templateUrl: "js/templates/document/edit_settings.html",
			controller: "documentEditSettingsController",
			resolve: {
                factory: checkAuthentication
            }
		})
		.when("/documents/:document_id/delete", {
			templateUrl: "js/templates/document/delete.html",
			controller: "documentDeleteController",
			resolve: {
                factory: checkAuthentication
            }
		})
		.when("/documents/:document_id/id", {
			templateUrl: "js/templates/document/show_id.html",
			controller: "documentShowIdController",
			resolve: {
                factory: checkAuthentication
            }
		})
		.when("/documents/:document_id/intro", {
			templateUrl: "js/templates/document/show_intro.html",
			controller: "documentShowIntroController",
			resolve: {
                factory: checkAuthentication
            }
		})
		.when("/documents/:document_id/submission", {
			templateUrl: "js/templates/document/submission.html",
			controller: "documentShowSubmissionController",
			resolve: {
                factory: checkAuthentication
            }
		})


		// Status
		.when("/documents/:document_id/status/0", {
			redirectTo: "/documents/:document_id/intro"
		})
		.when("/documents/:document_id/status/1", {
			redirectTo: "/documents/:document_id/edit"
		})
		.when("/documents/:document_id/status/2", {
			templateUrl: "js/templates/status/2.html",
			controller: "statusController",
			resolve: {
                factory: checkAuthentication
            }
		})
		.when("/documents/:document_id/status/3", {
			templateUrl: "js/templates/status/3.html",
			controller: "statusController",
			resolve: {
                factory: checkAuthentication
            }
		})
		.when("/documents/:document_id/status/4", {
			templateUrl: "js/templates/status/4.html",
			controller: "statusController",
			resolve: {
                factory: checkAuthentication
            }
		})
		.when("/documents/:document_id/status/5", {
			templateUrl: "js/templates/status/5.html",
			controller: "statusController",
			resolve: {
                factory: checkAuthentication
            }
		})
		.when("/documents/:document_id/status/6", {
			templateUrl: "js/templates/status/6.html",
			controller: "statusController",
			resolve: {
                factory: checkAuthentication
            }
		})
		.when("/documents/:document_id/status/7", {
			templateUrl: "js/templates/status/7.html",
			controller: "statusController",
			resolve: {
                factory: checkAuthentication
            }
		})

		// Committee members
		.when("/members", {
			templateUrl: "js/templates/member/list.html",
			controller: "memberListController",
			resolve: {
                factory: checkAuthentication
            }
		})
		.when("/members/:member_id", {
			templateUrl: "js/templates/member/details.html",
			controller: "memberDetailsController",
			resolve: {
                factory: checkAuthentication
            }
		})*/

		// Help
		.when("/help", {
			templateUrl: "js/templates/help.html",
			controller: "helpController"
		})


		// Unknown route
		.otherwise({
			redirectTo: "/"
		});


	// Enable HTML-5-mode
	$locationProvider.html5Mode(config.html5Mode);
});


/**
 * [checkAuthentication description]
 * @param  {[type]} $q                     [description]
 * @param  {[type]} $location              [description]
 * @param  {[type]} $authenticationService [description]
 * @return {[type]}                        [description]
 */
var checkAuthentication = function ($q, $location, $authenticationService) {
	if($authenticationService.isAuthenticated()) {
		return true;
	} else {
		return $location.url("/");
	}
};
